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
var handleElementError = async function handleElementError(error, props, element) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error: error });

    var onErrorStrategy = await props.onError.run(element);

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
      props = element.props;

  var normalizedProps = _extends({}, props);

  // normalizing props
  if (props) {
    normalizedProps = _extends({}, props);
    Object.keys(props).forEach(function (propName) {
      if (propName.charAt(0) === '$') {
        var prop = propName.substr(1, propName.length);
        var value = element.readFromScope(prop);

        if (typeof value !== 'undefined') {
          if (typeof props[propName] === 'string') {
            normalizedProps[props[propName]] = value;
          } else if (typeof props[propName] === 'function') {
            normalizedProps = _extends({}, normalizedProps, props[propName](value));
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
  var result = element.result,
      props = element.props,
      scope = element.scope;


  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      var exportedProps = props.exports(result);

      Object.keys(exportedProps).forEach(function (key) {
        scope[key] = exportedProps[key];
        element.dispatch(key, exportedProps[key]);
      });
    } else {
      scope[props.exports] = result;
      element.dispatch(props.exports, result);
    }
  }

  if (result) {
    if (_Element2.default.isItAnElement(result)) {
      await result.run(element);
    }
    // Generator
    if (typeof result.next === 'function') {
      var gen = result;
      var genRes = { value: undefined, done: false };

      while (!genRes.done) {
        genRes = gen.next(genRes.value);
        if (_Element2.default.isItAnElement(genRes.value)) {
          genRes.value = await genRes.value.run(element);
        }
      }
      element.result = genRes.value;
    }
  }
}

async function processChildren(element) {
  var func = element.func,
      children = element.children,
      result = element.result;

  // FACC pattern

  if (children && children.length === 1 && !_Element2.default.isItAnElement(children[0])) {
    var resultOfFACC = await children[0].call(element, result);
    if (_Element2.default.isItAnElement(resultOfFACC)) {
      await resultOfFACC.run(element);
    }

    // nested tags
  } else if (children && children.length > 0) {
    var pointer = 0;
    var parallelProcessing = !!func.processChildrenInParallel;

    while (pointer < children.length) {
      var w = children[pointer];

      try {
        if (parallelProcessing) {
          w.run(element);
        } else {
          await w.run(element);
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

function Pipeline(element) {
  if (!element) {
    throw new Error('A Pipeline can not be created with no Element.');
  }
  var middlewares = [];
  var pipeline = function pipeline(middleware, result) {
    var entry = pipeline.find(middleware);

    entry.enabled = false;
    return entry.func(_extends({}, element, { result: result }));
  };

  pipeline.add = function add(func, name) {
    middlewares.push({ name: name, func: func, enabled: true });
  };
  pipeline.find = function (n) {
    var entry = middlewares.find(function (_ref) {
      var name = _ref.name;
      return name === n;
    });

    if (entry) {
      return entry;
    } else {
      throw new Error('Sorry, there is no pipeline entry with name "' + n + '"');
    }
  };
  pipeline.disable = function (name) {
    this.find(name).enabled = false;
  };
  pipeline.enable = function (name) {
    this.find(name).enabled = true;
  };
  pipeline.process = async function () {
    var entry = void 0;
    var pointer = 0;

    while (entry = middlewares[pointer]) {
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

function createDefaultPipeline(element) {
  var pipeline = Pipeline(element);

  pipeline.add(execute);
  pipeline.add(processResult, 'result');
  pipeline.add(processChildren, 'children');

  return pipeline;
}