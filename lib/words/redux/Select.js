'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

var _Word = require('../../Word');

var _Word2 = _interopRequireDefault(_Word);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function Select(props) {
  if (props && _Word2.default.isItAWord(props.selector)) {
    var s = await props.selector.say(this.context);
    return s(_Integration2.default.getState());
  }
  return props.selector(_Integration2.default.getState());
};