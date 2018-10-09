'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = Processor;

var _middlewares = require('./middlewares');

var _deburger = require('./deburger');

var _deburger2 = _interopRequireDefault(_deburger);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MIDDLEWARES = [_middlewares.execute, _middlewares.exports, _middlewares.result, _middlewares.children];

var setDebugger = function setDebugger(element, d, level) {
  if ((0, _utils.isItAnElement)(element) && !element.debug) {
    element.debug = d(element, level);
    if (element.children && element.children.length > 0) {
      element.children.forEach(function (e) {
        return setDebugger(e, d, level + 1);
      });
    }
  }
};

function Processor(element) {
  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MIDDLEWARES;

  if (!element) {
    throw new Error('The processor requires an element as first argument.');
  }

  var props = element.props;

  // debugging

  var debugMode = element.debug;
  if (props && props.debug) {
    var debug = props.debug;


    if (debug === true) {
      debugMode = true;
      setDebugger(element, (0, _deburger2.default)(), 1);
    } else if (debug && (typeof debug === 'undefined' ? 'undefined' : _typeof(debug)) === 'object') {
      debugMode = true;
      setDebugger(element, (0, _deburger2.default)(debug), 1);
    }
  }

  // running the middlewares
  return async function () {
    var entry = void 0;
    var index = 0;

    try {
      debugMode && element.debug('IN');
      while (entry = middlewares[index]) {
        debugMode && element.debug(entry._name + '_IN');
        await entry(element);
        index++;
        debugMode && element.debug(entry._name + '_OUT');
      }
      debugMode && element.debug('OUT');
    } catch (error) {
      if (props && props.onError) {
        props.onError.mergeToProps({ error: error });
        if (!(await props.onError.run(element))) {
          index = middlewares.length + 1;
        };
      } else {
        throw error;
      }
    }

    return element.result;
  };
}