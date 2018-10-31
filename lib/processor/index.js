'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable max-len, no-use-before-define */

var _utils = require('../utils');

var _beforeHook = require('./beforeHook');

var _beforeHook2 = _interopRequireDefault(_beforeHook);

var _afterHook = require('./afterHook');

var _afterHook2 = _interopRequireDefault(_afterHook);

var _normalizeProps = require('./normalizeProps');

var _normalizeProps2 = _interopRequireDefault(_normalizeProps);

var _execute = require('./execute');

var _execute2 = _interopRequireDefault(_execute);

var _resolveExports = require('./resolveExports');

var _resolveExports2 = _interopRequireDefault(_resolveExports);

var _attemptToProcessChildren = require('./attemptToProcessChildren');

var _attemptToProcessChildren2 = _interopRequireDefault(_attemptToProcessChildren);

var _defineChildrenProp = require('./defineChildrenProp');

var _defineChildrenProp2 = _interopRequireDefault(_defineChildrenProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEBUG_ENABLED = false;

function identifyTheError(error, sourceElement) {
  if (error.toString().match(/children is not a function/)) {
    return new Error('You are trying to use "children" prop as a function in <' + sourceElement + '> but it is not. Did you forget to wrap its children in round brackets. Like for example <' + sourceElement + '>(<Child />)</' + sourceElement + '>?');
  }
  return error;
}

var Processor = function () {
  function Processor(done) {
    _classCallCheck(this, Processor);

    this.ids = 0;
    this.onFinish = done;
    this.queue = {};
  }

  _createClass(Processor, [{
    key: 'exit',
    value: function exit(error, result) {
      this.debug('(|) exit | error: ' + (error ? 'yes' : 'no'));
      this.queue = [];
      this.onFinish(error, result);
      this.onFinish = function () {};
    }
  }, {
    key: 'debug',
    value: function debug(whatHappened, element) {
      if (DEBUG_ENABLED) {
        var _console;

        for (var _len = arguments.length, reset = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          reset[_key - 2] = arguments[_key];
        }

        (_console = console).log.apply(_console, ['\n        ' + whatHappened + ' ' + (element ? element.name : '') + ' | queue: ' + Object.keys(this.queue).length + '\n      '].concat(reset));
      }
    }
  }, {
    key: 'elementProcessed',
    value: function elementProcessed(task) {
      var id = task.id;


      if (this.queue[id]) {
        delete this.queue[id];
      } else {
        throw new Error('The processor just finished queue an element but it is already removed from the list.');
      }

      this.debug('<-', task.element);

      if (task.done) {
        task.done(task.result);
      }

      // exit if we don't have any more elements to process
      if (Object.keys(this.queue).length === 0) {
        this.exit(null, task.result);
      }
    }
  }, {
    key: 'createProcessorErrorHandler',
    value: function createProcessorErrorHandler(element) {
      var _this = this;

      return function (error, continueFlow, stopFlow) {
        _this.debug('!', element, error.message);

        var Handler = element.handleError(error);

        if (Handler) {
          _this.add(Handler, element, continueFlow);
        } else {
          stopFlow(identifyTheError(error, element.name));
        }
      };
    }
  }, {
    key: 'add',
    value: function add(element, parent, done) {
      var _this2 = this;

      var task = {
        id: this.ids++,
        element: element.initialize(parent),
        parent: parent,
        done: done,
        result: undefined,
        processor: this
      };
      var onProcessingFinished = function onProcessingFinished(error) {
        return error ? _this2.exit(error) : _this2.elementProcessed(task, task);
      };

      this.queue[task.id] = task;
      this.debug('->', element);

      (0, _utils.flow)([_beforeHook2.default, _normalizeProps2.default, _defineChildrenProp2.default, _execute2.default, _resolveExports2.default, _attemptToProcessChildren2.default, _afterHook2.default], task, onProcessingFinished, this.createProcessorErrorHandler(element));
    }
  }]);

  return Processor;
}();

exports.default = Processor;