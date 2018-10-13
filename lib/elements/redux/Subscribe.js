'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

var _execute = require('../../middlewares/execute');

var _execute2 = _interopRequireDefault(_execute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function Subscribe(_ref) {
  var children = _ref.children,
      type = _ref.type;
  var exports = this.props.exports;


  if (type) {
    _Integration2.default.addListener(function (action) {
      if (action.type === type) {
        if (exports && typeof exports === 'string') {
          children(_defineProperty({}, exports, action));
        } else {
          children({ action: action });
        }
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}
Subscribe.processor = [_execute2.default];

exports.default = Subscribe;