/* eslint-disable no-return-assign */
import isValidHookContext from './utils/isValidHookContext';

const resolveProduct = (prop, stackIndex, stack, error) => {
  if (stackIndex < 0) {
    throw error;
  }
  const parent = stack[ stackIndex ];
  const product = parent.requestProduct ? parent.requestProduct(prop) : null;

  if (product !== null) {
    return product.value;
  }
  return resolveProduct(prop, stackIndex - 1, stack, error);
};

const createUseProductHook = (processor) => {
  processor.onNodeEnter(node => {
    const { element, stack } = node;
    const { props } = element;
    const propNames = props ? Object.keys(props) : [];

    propNames.forEach(propName => {
      if (propName.charAt(0) === '$') {
        const keyword = propName.substr(1, propName.length);
        const productValue = resolveProduct(
          keyword,
          0,
          node.stack,
          new Error(
            `"${ keyword }" prop requested by "${ element.name }" can not be found.\n\nStack:\n` +
            [ ...stack, element ].map(({ name }) => `  <${ name }>`).join('\n')
          )
        );

        element.mergeProps({ [ keyword ]: productValue });
      } else if (propName === 'exports') {
        element.requestProduct = (keyword) => {
          if (props && props.exports && props.exports === keyword) {
            return { value: node.product };
          }
          return null;
        };
      }
    });
  });

  return () => {
    isValidHookContext(processor);

    const node = processor.node();

    return [
      (initialValue) => {
        if (typeof initialValue !== 'undefined') {
          node.product = initialValue;
        }
        return [ newValue => (node.product = newValue) ];
      }
    ];
  };
};

export default createUseProductHook;
