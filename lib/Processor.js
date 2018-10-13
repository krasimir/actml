'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Processor;

var _execute = require('./middlewares/execute');

var _execute2 = _interopRequireDefault(_execute);

var _children = require('./middlewares/children');

var _children2 = _interopRequireDefault(_children);

var _deburger = require('./deburger');

var _deburger2 = _interopRequireDefault(_deburger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_MIDDLEWARES = [_execute2.default, _children2.default];

function Processor(element) {
  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MIDDLEWARES;

  if (!element) {
    throw new Error('The processor requires an element as first argument.');
  }

  var debug = element.debug,
      props = element.props;

  // running the middlewares

  return async function () {
    debug && (0, _deburger2.default)(element, 'IN');
    for (var index = 0; index < middlewares.length; index++) {
      var entry = middlewares[index];

      if (!entry) {
        throw new Error('Falsy middleware at index ' + index + '!');
      }

      try {
        await entry(element);
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
    }
    debug && (0, _deburger2.default)(element, 'OUT');

    return element.result;
  };
}