'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveExports;
function resolveExports(execContext, done) {
  var element = execContext.element,
      result = execContext.result;
  var props = element.props,
      scope = element.scope;


  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      var exportedProps = props.exports(result);

      if (exportedProps) {
        Object.keys(exportedProps).forEach(function (key) {
          scope[key] = exportedProps[key];
          element.dispatch(key, exportedProps[key]);
        });
      }
    } else {
      scope[props.exports] = result;
      element.dispatch(props.exports, result);
    }
  }
  done();
}