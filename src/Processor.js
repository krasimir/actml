/* eslint-disable no-use-before-define */
import isActMLElement from './utils/isActMLElement';
import Tree from './Tree';
import createUsePubSubHook from './hooks/usePubSub';
import createUseStateHook from './hooks/useState';
// import initializeHooks from './hooks';

export default function createProcessor() {
  const tree = Tree();
  let currentNode = null;

  const processNode = async (node) => {
    currentNode = node;
    node.enter();
    node.rerun = () => processNode(node);
    node.callChildren = async (...additionalProps) => {
      const childrenResult = [];
      const { children } = node.element;

      if (children && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          if (isActMLElement(children[i])) {
            children[i].mergeProps(...additionalProps);
            childrenResult.push(await processNode(node.addChildNode(children[i])));
          } else if (typeof children[i] === 'function') {
            const funcResult = await children[i](...additionalProps);

            if (isActMLElement(funcResult)) {
              childrenResult.push(await processNode(node.addChildNode(funcResult)));
            } else {
              childrenResult.push(funcResult);
            }
          }
        }
      }

      return childrenResult;
    };

    // actual call of the ActML element
    let result = node.element.enter();
    let genResult, toGenValue;

    // handling a promise
    if (result && result.then) {
      result = await result;

    // handling a generator
    } else if (result && typeof result.next === 'function') {
      genResult = result.next();
      while (!genResult.done) {
        if (isActMLElement(genResult.value)) {
          toGenValue = await processNode(node.addChildNode(genResult.value));
        }
        genResult = result.next(toGenValue);
      }
      if (isActMLElement(genResult.value)) {
        result = await processNode(node.addChildNode(genResult.value));
      } else {
        result = genResult.value;
      }

    // handling another ActML element
    } else if (isActMLElement(result)) {
      result = await processNode(node.addChildNode(result));
    }

    // handling children
    if (node.element.shouldProcessChildrenAutomatically()) {
      await node.callChildren();
    }

    node.element.out();
    node.out();
    currentNode = null;

    return result;
  };

  return {
    node() {
      return currentNode;
    },
    run(element) {
      const resolvedRootNode = tree.resolveRoot(element);

      return processNode(resolvedRootNode, []);
    },
    onNodeEnter(callback) {
      tree.addNodeEnterCallback(callback);
    },
    onNodeOut(callback) {
      tree.addNodeOutCallback(callback);
    },
    onNodeRemove(callback) {
      tree.onNodeRemove(callback);
    },
    system() {
      return {
        tree,
        reset() {
          tree.reset();
          createUsePubSubHook.clear();
          createUseStateHook.clear();
        }
      };
    }
  };
};
