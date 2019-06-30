/* eslint-disable no-return-assign */

const resolveProp = (prop, stackIndex, stack, error) => {
  if (stackIndex < 0) {
    throw error;
  }
  const parent = stack[ stackIndex ];
  const product = parent.requestProduct ? parent.requestProduct(prop) : null;

  if (product !== null) {
    return product.value;
  }
  return resolveProp(prop, stackIndex - 1, stack, error);
};

function resolveProduct(element, stack) {
  const { dependencies } = element.props;
  const data = {};

  if (dependencies.length === 0) {
    return {};
  }

  dependencies.forEach(propName => {
    data[propName] = resolveProp(
      propName,
      stack.length - 1,
      stack,
      new Error(
        `"${ propName }" prop requested by "${ element.name }" can not be found.\n\nStack:\n` +
        [ ...stack, element ].map(({ name }) => `  <${ name }>`).join('\n')
      )
    );
  });
  return data;
};

export default function createUseProductHook(element, stack) {
  let product;
  const resolvedProductProps = resolveProduct(element, stack);

  element.requestProduct = (propName) => {
    if (element.props.exportsKeyword && element.props.exportsKeyword === propName) {
      return { value: product };
    }
    return null;
  };

  return {
    hook: (initialValue) => {
      if (typeof initialValue !== 'undefined') {
        product = initialValue;
      }
      return [
        newValue => {
          product = newValue;
        }
      ];
    },
    resolvedProductProps
  };
};
