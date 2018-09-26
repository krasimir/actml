import Element from '../Element';

const handleElementError = async function (error, props, element) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error });

    const onErrorStrategy = await props.onError.run(element);

    if (onErrorStrategy === true) {
      throw new Error(Element.errors.CONTINUE_PROCESSING);
    }
    throw new Error(Element.errors.STOP_PROCESSING);    
  } else {
    throw error;
  }
}

export default async function execute(element) {
  const { func, props } = element;
  var normalizedProps = { ...props };

  // normalizing props
  if (props) {
    normalizedProps = { ...props };
    Object.keys(props).forEach(propName => {
      if (propName.charAt(0) === '$') {
        const prop = propName.substr(1, propName.length);
        const value = element.readFromScope(prop);

        if (typeof value !== 'undefined') {
          if (typeof props[propName] === 'string') {
            normalizedProps[props[propName]] = value;  
          } else if (typeof props[propName] === 'function') {
            normalizedProps = {
              ...normalizedProps,
              ...props[propName](value)
            }
          } else {
            normalizedProps[prop] = value;
          }
          delete normalizedProps[propName];
        }
      }
    });
  }

  // actual running of the function
  try {
    element.result = await func.call(element, normalizedProps);
  } catch (error) {
    await handleElementError(error, normalizedProps, element);
  }
}