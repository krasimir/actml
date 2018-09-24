'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Element = require('../Element');

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function processResult(element) {
  var result = element.result,
      props = element.props,
      scope = element.scope;


  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      var exportedProps = props.exports(result);

      Object.keys(exportedProps).forEach(function (key) {
        scope[key] = exportedProps[key];
        element.dispatch(key, exportedProps[key]);
      });
    } else {
      scope[props.exports] = result;
      element.dispatch(props.exports, result);
    }
  }

  if (result) {
    if (_Element2.default.isItAnElement(result)) {
      await result.run(element);
    }
    // Generator
    if (typeof result.next === 'function') {
      var gen = result;
      var genRes = { value: undefined, done: false };

      while (!genRes.done) {
        genRes = gen.next(genRes.value);
        if (_Element2.default.isItAnElement(genRes.value)) {
          genRes.value = await genRes.value.run(element);
        }
      }
      element.result = genRes.value;
    }
  }
};