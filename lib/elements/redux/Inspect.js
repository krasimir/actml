'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Inspect;

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Inspect(props) {
  var inspection = {
    numOfSubscribes: _Integration2.default._listeners.length
  };
  this.pipeline('children', inspection);
}