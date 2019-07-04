/* eslint-disable no-use-before-define */
import isActMLElement from './utils/isActMLElement';
import Tree from './Tree';
import createUsePubSubHook from './hooks/usePubSub';
import createUseStateHook from './hooks/useState';
// import initializeHooks from './hooks';

export default function createProcessor() {
  const tree = Tree();
  let currentNode = null;

  const process = async (node, stack = []) => {
    currentNode = node;
    node.enter(stack);
    node.callChildren = async (...additionalProps) => {
      const childrenResult = [];
      const { children } = node.element;

      if (children && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          if (isActMLElement(children[i])) {
            children[i].mergeProps(...additionalProps);
            childrenResult.push(await process(node.addChildNode(children[i]), stack));
          } else if (typeof children[i] === 'function') {
            const funcResult = await children[i](...additionalProps);

            if (isActMLElement(funcResult)) {
              childrenResult.push(await process(node.addChildNode(funcResult), stack));
            } else {
              childrenResult.push(funcResult);
            }
          }
        }
      }

      return childrenResult;
    };

    // const hooksProps = initializeHooks(branch, callChildren, stack, process);
    // actual run of the ActML element
    let result = await node.element.run();
    let genResult, toGenValue;

    // updating the stack
    stack.push(node.element);

    // handling a promise
    if (result && result.then) {
      result = await result;

    // handling a generator
    } else if (result && typeof result.next === 'function') {
      genResult = result.next();
      while (!genResult.done) {
        if (isActMLElement(genResult.value)) {
          toGenValue = await process(node.addChildNode(genResult.value), stack);
        }
        genResult = result.next(toGenValue);
      }
      if (isActMLElement(genResult.value)) {
        result = await process(node.addChildNode(genResult.value), stack);
      } else {
        result = genResult.value;
      }

    // handling another ActML element
    } else if (isActMLElement(result)) {
      result = await process(node.addChildNode(result), stack);
    }

    // handling children
    if (node.element.shouldProcessChildrenAutomatically()) {
      await node.callChildren();
    }

    node.out();
    currentNode = null;

    return result;
  };

  return {
    node() {
      return currentNode;
    },
    run(elementPrimitive) {
      return process(tree.resolveRoot(elementPrimitive));
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
