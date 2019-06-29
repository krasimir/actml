import createUseElementHook from '../hooks/useElement';

function parseProps(props) {
  const propNames = props ? Object.keys(props) : [];
  const result = {
    dependencies: [],
    exportsKeyword: undefined
  };

  propNames.forEach(propName => {
    if (propName.charAt(0) === '$') {
      result.dependencies.push(propName.substr(1, propName.length));
    } else if (propName === 'exports') {
      result.exportsKeyword = props.exports;
    } else {
      result[propName] = props[propName];
    }
  });

  return result;
};

export default function prepareProps(element) {
  const { props } = element;
  const useElement = createUseElementHook(element);

  return {
    ...props,
    ...parseProps(props),
    // ...resolveProduct(element),
    // useChildren,
    useElement,
    // useProduct,
    // usePubSub,
    // useState,
    // useElements: createUseElementsHook(element)
  };
};
