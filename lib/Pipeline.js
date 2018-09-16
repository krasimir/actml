'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Pipeline;
exports.createDefaultPipeline = createDefaultPipeline;

var _Word = require('./Word');

var _Word2 = _interopRequireDefault(_Word);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// helpers
var handleWordError = async function handleWordError(error, props, context) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error: error });

    var onErrorStrategy = await props.onError.say(context);

    if (onErrorStrategy === false) {
      throw new Error(_Word2.default.errors.STOP_PROCESSING);
    } else if (onErrorStrategy === true) {
      throw new Error(_Word2.default.errors.CONTINUE_PROCESSING);
    } else {
      // swallowing the error
    }
  } else {
    throw error;
  }
};

// middlewares
async function execute(word) {
  var func = word.func,
      props = word.props,
      context = word.context;

  var normalizedProps = props;

  if (props) {
    normalizedProps = _extends({}, props);
    Object.keys(props).forEach(function (propName) {
      if (propName.charAt(0) === '$') {
        var prop = propName.substr(1, propName.length);
        var value = context.get(prop);

        if (typeof value !== 'undefined') {
          normalizedProps[typeof props[propName] === 'string' ? props[propName] : prop] = value;
          delete normalizedProps[propName];
        }
      }
    });
  }

  try {
    word.result = await func.call(word, normalizedProps);
  } catch (error) {
    await handleWordError(error, normalizedProps, context);
  }
}
async function processResult(word) {
  var result = word.result,
      context = word.context,
      props = word.props;


  if (props && props.exports) {
    context.set(props.exports, result);
  }

  if (result) {
    if (_Word2.default.isItAWord(result)) {
      await result.say(context);
    }
    // Generator
    if (typeof result.next === 'function') {
      var gen = result;
      var genRes = { value: undefined, done: false };

      while (!genRes.done) {
        genRes = gen.next(genRes.value);
        if (_Word2.default.isItAWord(genRes.value)) {
          genRes.value = await genRes.value.say(context);
        }
      }
      word.result = genRes.value;
    }
  }
}
async function processChildren(word) {
  var func = word.func,
      children = word.children,
      result = word.result,
      context = word.context;

  // FACC pattern

  if (children && children.length === 1 && !_Word2.default.isItAWord(children[0])) {
    var resultOfFACC = await children[0].call(word, result);
    if (_Word2.default.isItAWord(resultOfFACC)) {
      await resultOfFACC.say(context);
    }

    // nested tags
  } else if (children && children.length > 0) {
    var pointer = 0;
    var parallelProcessing = !!func.processChildrenInParallel;

    while (pointer < children.length) {
      var w = children[pointer];

      try {
        if (parallelProcessing) {
          w.say(context);
        } else {
          await w.say(context);
        }
      } catch (error) {
        if (error.message === _Word2.default.errors.STOP_PROCESSING) {
          break;
        } else if (!(error.message === _Word2.default.errors.CONTINUE_PROCESSING)) {
          throw error;
        }
      }
      pointer++;
    }
  }
}

function Pipeline() {
  var entries = [];
  var API = function API(entryName, result) {
    var entry = API.find(entryName);

    entry.enabled = false;
    return entry.func(_extends({}, API.scopeWord, { result: result }));
  };

  API.add = function add(func, name) {
    entries.push({ name: name, func: func, enabled: true });
  };
  API.find = function (n) {
    var entry = entries.find(function (_ref) {
      var name = _ref.name;
      return name === n;
    });

    if (entry) {
      return entry;
    } else {
      throw new Error('Sorry, there is no pipeline entry with name "' + n + '"');
    }
  };
  API.disable = function (name) {
    this.find(name).enabled = false;
  };
  API.enable = function (name) {
    this.find(name).enabled = true;
  };
  API.run = async function () {
    var entry = void 0;
    var pointer = 0;

    while (entry = entries[pointer]) {
      if (entry.enabled) {
        await entry.func(API.scopeWord);
      }
      pointer += 1;
    }
  };
  API.setScope = function (scopeWord) {
    API.scopeWord = scopeWord;
  };

  return API;
}

Pipeline.execute = execute;
Pipeline.processResult = processResult;
Pipeline.processChildren = processChildren;

function createDefaultPipeline() {
  var pipeline = Pipeline();

  pipeline.add(execute);
  pipeline.add(processResult, 'result');
  pipeline.add(processChildren, 'children');

  return pipeline;
}