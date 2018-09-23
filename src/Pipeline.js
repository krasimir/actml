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
  const { func, props } = element;
  var normalizedProps = { ...props };

  // normalizing props
  if (props) {
    normalizedProps = { ...props };
    Object.keys(props).forEach(propName => {
      if (propName.charAt(0) === '$') {
        const prop = propName.substr(1, propName.length);
        const value = element.readFromScope(prop);

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

  // actual running of the function
  try {
    element.result = await func.call(element, normalizedProps);
  } catch (error) {
    await handleElementError(error, normalizedProps, element);
  }
}

async function processResult(element) {
  const { result, props, scope } = element;

  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      const exportedProps = props.exports(result);

      Object
        .keys(exportedProps)
        .forEach(key => {
          scope[key] = exportedProps[key];
          element.dispatch(key, exportedProps[key]);
        });
    } else {
      scope[props.exports] = result;
      element.dispatch(props.exports, result);
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

export default function Pipeline(element) {
  if (!element) {
    throw new Error('A Pipeline can not be created with no Element.');
  }
  const middlewares = [];
  const pipeline = function(middleware, result) {
    const entry = pipeline.find(middleware);

    entry.enabled = false;
    return entry.func({ ...element, result });
  }

  pipeline.add = function add(func, name) {
    middlewares.push({ name, func, enabled: true });
  }
  pipeline.find = function (n) {
    const entry = middlewares.find(({ name }) => name === n);

    if (entry) {
      return entry;
    } else {
      throw new Error(`Sorry, there is no pipeline entry with name "${ n }"`);
    }
  };
  pipeline.disable = function (name) {
    this.find(name).enabled = false;
  };
  pipeline.enable = function (name) {
    this.find(name).enabled = true;
  };
  pipeline.process = async function () {
    let entry;
    let pointer = 0;

    while(entry = middlewares[pointer]) {
      if (entry.enabled) {
        await entry.func(element);
      }
      pointer += 1;
    }
    return element.result;
  };

  return pipeline;
}

Pipeline.execute = execute;
Pipeline.processResult = processResult;
Pipeline.processChildren = processChildren;

export function createDefaultPipeline(element) {
  const pipeline = Pipeline(element);

  pipeline.add(execute);
  pipeline.add(processResult, 'result');
  pipeline.add(processChildren, 'children');

  return pipeline;
}