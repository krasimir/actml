import Element from './Element';

// helpers
const handleElementError = async function (error, props, context) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error });

    const onErrorStrategy = await props.onError.run(context);

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
  const { func, props, context } = element;
  var normalizedProps = props;

  if (props) {
    normalizedProps = { ...props };
    Object.keys(props).forEach(propName => {
      if (propName.charAt(0) === '$') {
        const prop = propName.substr(1, propName.length);
        const value = context.get(prop);

        if (typeof value !== 'undefined') {
          normalizedProps[
            typeof props[propName] === 'string' ? props[propName] : prop
          ] = value;
          delete normalizedProps[propName];
        }
      }
    });
  }

  try {
    element.result = await func.call(element, normalizedProps);
  } catch (error) {
    await handleElementError(error, normalizedProps, context);
  }
}
async function processResult(element) {
  const { result, context, props } = element;

  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      const exportedProps = props.exports(result);

      Object
        .keys(exportedProps)
        .forEach(key => context.set(key, exportedProps[key]));
    } else {
      context.set(props.exports, result);
    }
  }

  if (result) {
    if (Element.isItAnElement(result)) {
      await result.run(context);
    }
    // Generator
    if (typeof result.next === 'function') {
      const gen = result;
      let genRes = { value: undefined, done: false };

      while(!genRes.done) {
        genRes = gen.next(genRes.value);
        if (Element.isItAnElement(genRes.value)) {
          genRes.value = await genRes.value.run(context);
        }
      }
      element.result = genRes.value;
    }
  }
}
async function processChildren(element) {
  const { func, children, result, context } = element;

  // FACC pattern
  if (children && children.length === 1 && !Element.isItAnElement(children[0])) {
    const resultOfFACC = await children[0].call(element, result);
    if (Element.isItAnElement(resultOfFACC)) {
      await resultOfFACC.run(context);
    }
  
  // nested tags
  } else if (children && children.length > 0) {
    let pointer = 0;
    let parallelProcessing = !!func.processChildrenInParallel;

    while(pointer < children.length) {
      const w = children[pointer];

      try {
        if (parallelProcessing) {
          w.run(context);
        } else {
          await w.run(context);
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