export default function resolveExports(execContext, done) {
  const { element, result } = execContext;
  const { props, scope } = element;

  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      const exportedProps = props.exports(result);

      if (exportedProps) {
        Object
          .keys(exportedProps)
          .forEach(key => {
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
