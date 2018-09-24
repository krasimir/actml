'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Pipeline;
exports.createDefaultPipeline = createDefaultPipeline;

var _execute = require('./middlewares/execute');

var _execute2 = _interopRequireDefault(_execute);

var _processResult = require('./middlewares/processResult');

var _processResult2 = _interopRequireDefault(_processResult);

var _processChildren = require('./middlewares/processChildren');

var _processChildren2 = _interopRequireDefault(_processChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

Pipeline.execute = _execute2.default;
Pipeline.processResult = _processResult2.default;
Pipeline.processChildren = _processChildren2.default;

function createDefaultPipeline(element) {
  var pipeline = Pipeline(element);

  pipeline.add(_execute2.default);
  pipeline.add(_processResult2.default, 'result');
  pipeline.add(_processChildren2.default, 'children');

  return pipeline;
}