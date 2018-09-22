import Element from './Element';

// helpers
const handleElementError = async function (error, props, element) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error });

    const onErrorStrategy = await props.onError.run(element);

    if (onErrorStrategy === false) {
      throw new Error(Element.errors.STOP_PROCESSING);
    } else if (onErrorStrategy === true) {
      throw new Error(Element.errors.CONTINUE_PROCESSING);
    } else {
      // swallowing the error
    }      
  } else {
    throw error;
  }
}

// middlewares

async function execute(element) {
  const { func, props, lookUp } = element;
  var normalizedProps = { ...props };

  if (props) {
    normalizedProps = { ...props };
    Object.keys(props).forEach(propName => {
      if (propName.charAt(0) === '$') {
        const prop = propName.substr(1, propName.length);
        const value = lookUp.call(element, prop);

        if (typeof value !== 'undefined') {
          if (typeof props[propName] === 'string') {
            normalizedProps[props[propName]] = value;  
          } else if (typeof props[propName] === 'function') {
            normalizedProps = {
              ...normalizedProps,
              ...props[propName](value)
            }
          } else {
            normalizedProps[prop] = value;
          }
          delete normalizedProps[propName];
        }
      }
    });
  }

  try {
    element.result = await func.call(element, normalizedProps);
  } catch (error) {
    await handleElementError(error, normalizedProps, element);
  }
}

async function processResult(element) {
  const { result, props, scope, parent } = element;

  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      const exportedProps = props.exports(result);

      Object
        .keys(exportedProps)
        .forEach(key => {
          scope.set(key, exportedProps[key]);
          parent.scope.set(key, exportedProps[key]);
        });
    } else {
      scope.set(props.exports, result);
      parent.scope.set(props.exports, result);
    }
  }

  if (result) {
    if (Element.isItAnElement(result)) {
      await result.run(element);
    }
    // Generator
    if (typeof result.next === 'function') {
      const gen = result;
      let genRes = { value: undefined, done: false };

      while(!genRes.done) {
        genRes = gen.next(genRes.value);
        if (Element.isItAnElement(genRes.value)) {
          genRes.value = await genRes.value.run(element);
        }
      }
      element.result = genRes.value;
    }
  }
}

async function processChildren(element) {
  const { func, children, result } = element;

  // FACC pattern
  if (children && children.length === 1 && !Element.isItAnElement(children[0])) {
    const resultOfFACC = await children[0].call(element, result);
    if (Element.isItAnElement(resultOfFACC)) {
      await resultOfFACC.run(element);
    }
  
  // nested tags
  } else if (children && children.length > 0) {
    let pointer = 0;
    let parallelProcessing = !!func.processChildrenInParallel;

    while(pointer < children.length) {
      const w = children[pointer];

      try {
        if (parallelProcessing) {
          w.run(element);
        } else {
          await w.run(element);
        }
      } catch (error) {
        if (error.message === Element.errors.STOP_PROCESSING) {
          break;
        } else if(!(error.message === Element.errors.CONTINUE_PROCESSING)) {
          throw error;
        }
      }
      pointer++;
    }
  }
}

export default function Pipeline() {
  const entries = [];
  const API = function(entryName, result) {
    const entry = API.find(entryName);

    entry.enabled = false;
    return entry.func({ ...API.scopeElement, result });
  }

  API.add = function add(func, name) {
    entries.push({ name, func, enabled: true });
  }
  API.find = function (n) {
    const entry = entries.find(({ name }) => name === n);

    if (entry) {
      return entry;
    } else {
      throw new Error(`Sorry, there is no pipeline entry with name "${ n }"`);
    }
  };
  API.disable = function (name) {
    this.find(name).enabled = false;
  };
  API.enable = function (name) {
    this.find(name).enabled = true;
  };
  API.run = async function () {
    let entry;
    let pointer = 0;

    while(entry = entries[pointer]) {
      if (entry.enabled) {
        await entry.func(API.scopeElement);
      }
      pointer += 1;
    }
  };
  API.setScope = function (scopeElement) {
    API.scopeElement = scopeElement;
  }

  return API;
}

Pipeline.execute = execute;
Pipeline.processResult = processResult;
Pipeline.processChildren = processChildren;

export function createDefaultPipeline() {
  const pipeline = Pipeline();

  pipeline.add(execute);
  pipeline.add(processResult, 'result');
  pipeline.add(processChildren, 'children');

  return pipeline;
}