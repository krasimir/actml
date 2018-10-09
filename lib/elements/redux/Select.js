'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function Select(props) {
  if (props && (0, _utils.isItAnElement)(props.selector)) {
    var s = await props.selector.run(this);
    return s(_Integration2.default.getState());
  }
  return props.selector(_Integration2.default.getState());
};