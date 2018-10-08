async function exportsMiddleware (element) {
  const { result, props, scope } = element;

  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      const exportedProps = props.exports(result);

      Object
        .keys(exportedProps)
        .forEach(key => {
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

export default exportsMiddleware;