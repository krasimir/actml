'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = actMLReduxMiddleware;

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function actMLReduxMiddleware(_ref) {
  var getState = _ref.getState,
      dispatch = _ref.dispatch;

  _Integration2.default.getState = getState;
  _Integration2.default.dispatch = dispatch;
  return function (next) {
    return function (action) {
      var result = next(action);

      _Integration2.default.actionDetected(action);
      return result;
    };
  };
}