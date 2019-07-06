/* eslint-disable no-return-assign */
import isValidHookContext from './utils/isValidHookContext';

const bridgeMethodName = keyword => `__request__${ keyword }`;

const resolveProduct = (bridgeMethod, node, getError) => {
  if (!node) {
    throw getError();
  }
  let source;

  if (node[bridgeMethod]) {
    source = node;
  } else {
    source = node.children.find((child) => !!child[bridgeMethod]);
  }
  const product = source ? source[bridgeMethod]() : null;

  if (product !== null) {
    return product.value;
  }
  return resolveProduct(bridgeMethod, node.parent, getError);
};

const getNotFoundError = (keyword, node) => {
  const getStack = (node, stack = []) => {
    stack.push(node.element.name);
    if (node.parent) {
      return getStack(node.parent, stack);
    }
    return stack;
  };

  return new Error(
    `"${ keyword }" prop requested by "${ node.element.name }" can not be found.\n\nStack:\n` +
    getStack(node).reverse().map(name => `  <${ name }>`).join('\n')
  );
};

const createUseProductHook = (processor) => {
  processor.onNodeEnter(node => {
    const { element } = node;
    const { props } = element;
    const propNames = props ? Object.keys(props) : [];

    propNames.forEach(propName => {
      if (propName.charAt(0) === '$') {
        const keyword = propName.substr(1, propName.length);
        const productValue = resolveProduct(
          bridgeMethodName(keyword),
          node.parent,
          () => getNotFoundError(keyword, node)
        );

        element.mergeProps({ [ keyword ]: productValue });
      } else if (propName === 'exports') {
        node[bridgeMethodName(props[propName])] = () => {
          return { value: node.__product };
        };
      }
    });
  });

  return (value) => {
    isValidHookContext(processor);
    const node = processor.node();

    node.__product = value;
    return [
      (newValue) => (node.__product = newValue)
    ];
  };
};

export default createUseProductHook;
