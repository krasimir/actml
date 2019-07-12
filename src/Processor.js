/* eslint-disable no-use-before-define */
import isActMLElement from './utils/isActMLElement';
import Tree from './Tree';
import createUsePubSubHook from './hooks/usePubSub';
import createUseStateHook from './hooks/useState';
import createUseEffectHook from './hooks/useEffect';
import createQueue from './Queue';

const isPromise = obj => obj && typeof obj['then'] === 'function';
const isGenerator = obj => obj && typeof obj['next'] === 'function';

export default function createProcessor() {
  const tree = Tree();
  let stack = [];
  let currentNode = () => stack[stack.length - 1];

  const processNode = function (node) {
    stack.push(node);
    currentNode().enter();

    const queue = createQueue(node);
    const { CONSUME, PROCESS_RESULT, RETURNED_ELEMENT, HANDLE_CHILDREN, CHILD } = queue;

    queue.add(CONSUME, () => node.element.consume());
    queue.add(PROCESS_RESULT, () => {
      const consumption = queue.get(CONSUME).result;

      if (isActMLElement(consumption)) {
        queue.add(RETURNED_ELEMENT, () => processNode(node.addChildNode(consumption)));
      }
    });
    queue.add(HANDLE_CHILDREN, () => {
      const { children } = node.element;
      const additionalProps = {}; // <--- TODO

      if (children && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          if (isActMLElement(children[i])) {
            children[i].mergeProps(...additionalProps);
            queue.add(CHILD, () => processNode(node.addChildNode(children[i])));
          } else if (typeof children[i] === 'function') {
            queue.add(CHILD, () => children[i](...additionalProps));
            const funcResult = children[i](...additionalProps);

            if (isActMLElement(funcResult)) {
              queue.add(CHILD, () => processNode(node.addChildNode(funcResult)));
            }
          }
        }
      }
    });
    queue.process(() => {
      currentNode().out();
      stack.pop();
    });
    return queue.result();
  };

  return {
    node() {
      return currentNode();
    },
    run(element) {
      const rootNode = tree.resolveRoot(element);

      return processNode(rootNode);
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
          createUseEffectHook.clear();
        }
      };
    }
  };
};
