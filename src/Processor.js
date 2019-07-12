/* eslint-disable no-use-before-define */
import isActMLElement from './utils/isActMLElement';
import Tree from './Tree';
import createUsePubSubHook from './hooks/usePubSub';
import createUseStateHook from './hooks/useState';
import createUseEffectHook from './hooks/useEffect';
import createQueue from './Queue';

const CONSUME = 'CONSUME';
const PROCESS_RESULT = 'PROCESS_RESULT';
const RETURNED_ELEMENT = 'RETURNED_ELEMENT';
const HANDLE_CHILDREN = 'HANDLE_CHILDREN';
const CHILD = 'CHILD';

const isGenerator = obj => obj && typeof obj['next'] === 'function';
const queueExtractResult = function (queue) {
  console.log('extract');
  const returnedElement = queue.get(RETURNED_ELEMENT);

  if (returnedElement) return returnedElement.result;
  return queue.get(CONSUME).result;
};

export default function createProcessor() {
  const tree = Tree();
  let stack = [];
  let currentNode = () => stack[stack.length - 1];

  const processNode = function (node, processingDone = () => {}) {
    stack.push(node);
    node.enter();
    node.callChildren = () => {
      const { children } = node.element;
      const additionalProps = {}; // <--- TODO
      const queueItemsToAdd = [];

      if (children && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          if (isActMLElement(children[i])) {
            children[i].mergeProps(...additionalProps);
            queueItemsToAdd.push(() => processNode(node.addChildNode(children[i])));
          } else if (typeof children[i] === 'function') {
            queueItemsToAdd.push(() => children[i](...additionalProps));
            const funcResult = children[i](...additionalProps);

            if (isActMLElement(funcResult)) {
              queueItemsToAdd.push(() => processNode(node.addChildNode(funcResult)));
            }
          }
        }
        queue.prependItems(CHILD, ...queueItemsToAdd);
      }
    };

    const queue = createQueue(node, queueExtractResult);

    queue.add(CONSUME, () => node.element.consume());
    queue.add(PROCESS_RESULT, () => {
      const consumption = queue.get(CONSUME).result;

      if (isActMLElement(consumption)) {
        queue.prependItems(
          RETURNED_ELEMENT,
          () => processNode(node.addChildNode(consumption))
        );
      } else if (isGenerator(consumption)) {
        const generator = consumption;

        queue.prependItems(
          RETURNED_ELEMENT,
          () => new Promise(generatorDone => {
            let genResult;

            (function iterate(value) {
              genResult = generator.next(value);
              if (!genResult.done) {
                if (isActMLElement(genResult.value)) {
                  processNode(node.addChildNode(genResult.value), (r) => {
                    iterate(r);
                  });
                }
              } else {
                if (isActMLElement(genResult.value)) {
                  processNode(node.addChildNode(genResult.value), (r) => {
                    generatorDone(r);
                  });
                } else {
                  generatorDone(genResult.value);
                }
              }
            })();
          })
        );
      };
    });
    queue.add(HANDLE_CHILDREN, () => {
      if (node.element.shouldProcessChildrenAutomatically()) {
        node.callChildren();
      }
    });
    queue.process(() => {
      currentNode().out();
      stack.pop();
      processingDone(queue.result());
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
