'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SubscribeOnce;

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SubscribeOnce(props) {
  var _this = this;

  this.pipeline.disable('result');
  this.pipeline.disable('children');
  if (props && props.type) {
    var removeListener = _Integration2.default.addListener(function (action) {
      if (action.type === props.type) {
        _this.pipeline('result', action);
        _this.pipeline('children', action);
        removeListener();
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}