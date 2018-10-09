'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

var _execute = require('../../middlewares/execute');

var _execute2 = _interopRequireDefault(_execute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function Subscribe(_ref) {
  var children = _ref.children,
      type = _ref.type;

  if (type) {
    _Integration2.default.addListener(function (action) {
      if (action.type === type) {
        children(action);
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}
Subscribe.processor = [_execute2.default];

exports.default = Subscribe;