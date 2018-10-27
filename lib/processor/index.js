'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processor;

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

var _processChildren = require('./processChildren');

var _processChildren2 = _interopRequireDefault(_processChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identifyTheError(error, sourceElement) {
  if (error.toString().match(/children is not a function/)) {
    return new Error('You are trying to use "children" prop as a function in <' + sourceElement + '> but it is not. Did you forget to wrap its children in round brackets. Like for example <' + sourceElement + '>(<Child />)</' + sourceElement + '>?');
  }
  return error;
} /* eslint-disable max-len */

function processor(element, done) {
  var execContext = { element: element };

  (0, _utils.flow)().withContext(execContext).done(function () {
    return done(execContext.result);
  }).withErrorHandler(function (error, continueProcessing) {
    var props = element.props;

    var identifiedError = identifyTheError(error, element.name);

    if (props && props.onError) {
      props.onError.mergeToProps({ error: error });
      props.onError.run(element, continueProcessing);
    } else {
      throw identifiedError;
    }
  }).run([_beforeHook2.default, _normalizeProps2.default, _execute2.default, _resolveExports2.default, function (execContext, done) {
    return execContext.normalizedProps.children ? done() : (0, _processChildren2.default)(execContext, done);
  }, _afterHook2.default]);

  return execContext.result;
}