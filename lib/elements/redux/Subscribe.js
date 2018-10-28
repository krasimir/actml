'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function Subscribe(_ref) {
  var children = _ref.children,
      type = _ref.type;

  if (type) {
    _Integration2.default.addListener(function (action) {
      if (action.type === type) {
        children({ action: action });
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}

exports.default = Subscribe;