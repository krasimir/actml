/* eslint-disable no-use-before-define, consistent-return */

import isActMLElement from './utils/isActMLElement';
import createUseChildrenHook from './hooks/useChildren';
import createUseElementHook from './hooks/useElement';
import createUseProductHook from './hooks/useProduct';
import createUsePubSubHook from './hooks/usePubSub';
import createUseStateHook from './hooks/useState';
import createUseElementsHook from './hooks/useElements';

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

function getFuncName(func) {
  if (func.name) return func.name;
  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[ 1 ] : 'unknown';
};

export default function createElement(func, props, children) {
  const element = {
    __actml: true,
    id: null,
    props: parseProps(props),
    name: getFuncName(func),
    func,
    children,
    initialize: function (id) {
      this.id = id;
    },
    reUse: function (newElement) {
      this.children = [ ...newElement.children ];
    },
    mergeProps(newProps) {
      this.props = Object.assign({}, this.props, newProps);
    },
    toString() {
      return this.name;
    }
    // parent: null,
    // run,
    // requestProduct,
    // isUsed: false,
    // isRunning: false
  };
  /*
  const product = createProduct(element);
  const {
    hook: useChildren,
    callChildren,
    processChildrenAutomatically
  } = createUseChildrenHook(element, children);
  const useElement = createUseElementHook(element);
  const useProduct = createUseProductHook(product);
  const usePubSub = createUsePubSubHook(element);
  const useState = createUseStateHook(element);

  function requestProduct(propName) {
    const { exportsKeyword } = element.meta;

    if (exportsKeyword && exportsKeyword === propName) {
      return { value: product.get() };
    }
  }

  async function run(parent, additionalProps = {}) {
    element.parent = parent;
    element.isRunning = true;
    processChildrenAutomatically.process = true;

    let result = func({
      ...props,
      ...additionalProps,
      ...resolveProduct(element),
      useChildren,
      useElement,
      useProduct,
      usePubSub,
      useState,
      useElements: createUseElementsHook(element)
    });
    let genResult, toGenValue;

    element.isRunning = false;
    element.isUsed = true;

    // handling a promise
    if (result && result.then) {
      result = await result;

    // handling a generator
    } else if (result && typeof result.next === 'function') {
      genResult = result.next();
      while (!genResult.done) {
        if (isActMLElement(genResult.value)) {
          toGenValue = await genResult.value.run(element);
        }
        genResult = result.next(toGenValue);
      }
      if (isActMLElement(genResult.value)) {
        result = await genResult.value.run(element);
      } else {
        result = genResult.value;
      }

    // handling another ActML element
    } else if (isActMLElement(result)) {
      result = await result.run(element);
    }

    // handling children
    if (processChildrenAutomatically.process) {
      await callChildren();
    }

    return result;
  }*/

  return element;
};
