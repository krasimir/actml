'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Action;

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Action(props) {
  _Integration2.default.dispatch(props);
}