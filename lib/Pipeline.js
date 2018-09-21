'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Pipeline;
exports.createDefaultPipeline = createDefaultPipeline;

var _Element = require('./Element');

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// helpers
var handleElementError = async function handleElementError(error, props, context) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error: error });

    var onErrorStrategy = await props.onError.run(context);

    if (onErrorStrategy === false) {
      throw new Error(_Element2.default.errors.STOP_PROCESSING);
    } else if (onErrorStrategy === true) {
      throw new Error(_Element2.default.errors.CONTINUE_PROCESSING);
    } else {
      // swallowing the error
    }
  } else {
    throw error;
  }
};

// middlewares
async function execute(element) {
  var func = element.func,
      props = element.props,
      context = element.context;

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
    element.result = await func.call(element, normalizedProps);
  } catch (error) {
    await handleElementError(error, normalizedProps, context);
  }
}
async function processResult(element) {
  var result = element.result,
      context = element.context,
      props = element.props;


  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      var exportedProps = props.exports(result);

      Object.keys(exportedProps).forEach(function (key) {
        return context.set(key, exportedProps[key]);
      });
    } else {
      context.set(props.exports, result);
    }
  }

  if (result) {
    if (_Element2.default.isItAnElement(result)) {
      await result.run(context);
    }
    // Generator
    if (typeof result.next === 'function') {
      var gen = result;
      var genRes = { value: undefined, done: false };

      while (!genRes.done) {
        genRes = gen.next(genRes.value);
        if (_Element2.default.isItAnElement(genRes.value)) {
          genRes.value = await genRes.value.run(context);
        }
      }
      element.result = genRes.value;
    }
  }
}
async function processChildren(element) {
  var func = element.func,
      children = element.children,
      result = element.result,
      context = element.context;

  // FACC pattern

  if (children && children.length === 1 && !_Element2.default.isItAnElement(children[0])) {
    var resultOfFACC = await children[0].call(element, result);
    if (_Element2.default.isItAnElement(resultOfFACC)) {
      await resultOfFACC.run(context);
    }

    // nested tags
  } else if (children && children.length > 0) {
    var pointer = 0;
    var parallelProcessing = !!func.processChildrenInParallel;

    while (pointer < children.length) {
      var w = children[pointer];

      try {
        if (parallelProcessing) {
          w.run(context);
        } else {
          await w.run(context);
        }
      } catch (error) {
        if (error.message === _Element2.default.errors.STOP_PROCESSING) {
          break;
        } else if (!(error.message === _Element2.default.errors.CONTINUE_PROCESSING)) {
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
    return entry.func(_extends({}, API.scopeElement, { result: result }));
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
        await entry.func(API.scopeElement);
      }
      pointer += 1;
    }
  };
  API.setScope = function (scopeElement) {
    API.scopeElement = scopeElement;
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