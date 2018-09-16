import Word from './Word';

// helpers
const handleWordError = async function (error, props, context) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error });

    const onErrorStrategy = await props.onError.say(context);

    if (onErrorStrategy === false) {
      throw new Error(Word.errors.STOP_PROCESSING);
    } else if (onErrorStrategy === true) {
      throw new Error(Word.errors.CONTINUE_PROCESSING);
    } else {
      throw error;
    }      
  } else {
    throw error;
  }
}

// middlewares
function init({ props, context }) {
  // normalizing the props
  props && Object.keys(props).forEach(propName => {
    if (propName.charAt(0) === '$') {
      const prop = propName.substr(1, propName.length);
      const value = context.get(prop);

      if (typeof value !== 'undefined') {
        props[typeof props[propName] === 'string' ? props[propName] : prop] = value;
        delete props[propName];
      }
    }
  });
};
async function execute(word) {
  const { func, props, context } = word;

  try {
    word.result = await func.call(word, props);
  } catch (error) {
    await handleWordError(error, props, context);
  }
}
async function processResult(word) {
  const { result, context, props } = word;

  if (props && props.exports) {
    context.set(props.exports, result);
  }

  if (result) {
    if (Word.isItAWord(result)) {
      await result.say(context);
    }
    // Generator
    if (typeof result.next === 'function') {
      const gen = result;
      let genRes = { value: undefined, done: false };

      while(!genRes.done) {
        genRes = gen.next(genRes.value);
        if (Word.isItAWord(genRes.value)) {
          genRes.value = await genRes.value.say(context);
        }
      }
      word.result = genRes.value;
    }
  }
}
async function processChildren({ func, children, result, context }) {
  // FACC pattern
  if (children && children.length === 1 && !Word.isItAWord(children[0])) {
    await Word(children[0], result).say(context);
  
  // nested tags
  } else if (children && children.length > 0) {
    let pointer = 0;
    let parallelProcessing = !!func.processChildrenInParallel;

    while(pointer < children.length) {
      const w = children[pointer];

      try {
        if (parallelProcessing) {
          w.say(context);
        } else {
          await w.say(context);
        }
      } catch (error) {
        if (error.message === Word.errors.STOP_PROCESSING) {
          break;
        } else if(!(error.message === Word.errors.CONTINUE_PROCESSING)) {
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
    return entry.func({ ...API.scopeWord, result });
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
        await entry.func(API.scopeWord);
      }
      pointer += 1;
    }
  };
  API.setScope = function (scopeWord) {
    API.scopeWord = scopeWord;
  }

  return API;
}

Pipeline.init = init;
Pipeline.execute = execute;
Pipeline.processResult = processResult;
Pipeline.processChildren = processChildren;

export function createDefaultPipeline() {
  const pipeline = Pipeline();

  pipeline.add(init);
  pipeline.add(execute);
  pipeline.add(processResult, 'result');
  pipeline.add(processChildren, 'children');

  return pipeline;
}