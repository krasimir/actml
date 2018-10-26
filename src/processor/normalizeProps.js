/* eslint-disable consistent-return */

export default function normalizeProps(execContext, done) {
  const { element } = execContext;
  const { props, name } = element;
  let normalizedProps = { ...props };

  if (!props) return done();

  Object.keys(props).forEach(propName => {
    if (propName.charAt(0) === '$') {
      const prop = propName.substr(1, propName.length);
      const value = element.readFromScope(prop, name);

      if (typeof value !== 'undefined') {
        if (typeof props[propName] === 'string') {
          normalizedProps[props[propName]] = value;
        } else if (typeof props[propName] === 'function') {
          normalizedProps = {
            ...normalizedProps,
            ...props[propName](value)
          };
        } else {
          normalizedProps[prop] = value;
        }
        delete normalizedProps[propName];
      }
    }
  });

  execContext.normalizedProps = normalizedProps;
  done();
}
