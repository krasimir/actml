'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
async function exportsMiddleware(element) {
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
}

exportsMiddleware._name = 'EXPORTS';

exports.default = exportsMiddleware;