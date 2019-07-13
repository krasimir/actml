/* eslint-disable no-use-before-define, consistent-return */
import isActMLElement from './utils/isActMLElement';
import Tree from './Tree';
import createUsePubSubHook from './hooks/usePubSub';
import createUseStateHook from './hooks/useState';
import createUseEffectHook from './hooks/useEffect';
import createQueue from './Queue';

const CHILDREN = '__ACTML_CHILDREN__';

const CONSUME = 'CONSUME';
const PROCESS_RESULT = 'PROCESS_RESULT';
const RETURNED_ELEMENT = 'RETURNED_ELEMENT';
const CHILD = 'CHILD';

const isGenerator = obj => obj && typeof obj['next'] === 'function';
const isPromise = obj => obj && typeof obj['then'] === 'function';

function createChildrenFunc(node, processNode) {
  const f = (...additionalProps) => {
    const { children } = node.element;

    if (children && children.length > 0) {
      const queueItemsToAdd = [];
      const results = [];
      const childrenQueue = createQueue(`  ${ node.element.name }:children`);

      for (let i = 0; i < children.length; i++) {
        if (isActMLElement(children[i])) {
          children[i].mergeProps(...additionalProps);
          queueItemsToAdd.push(() => processNode(node.addChildNode(children[i])));
        } else if (typeof children[i] === 'function') {
          const funcResult = children[i](...additionalProps);

          if (isActMLElement(funcResult)) {
            queueItemsToAdd.push(() => processNode(node.addChildNode(funcResult)));
          } else {
            results.push(funcResult);
          }
        } else {
          results.push(children[i]);
        }
      }
      queueItemsToAdd.reverse().forEach(func => {
        childrenQueue.prependItem(CHILD, func, (r) => results.push(r));
      });
      childrenQueue.process();
      return childrenQueue.onDone(() => results);
    }
  };

  f[CHILDREN] = true;
  return f;
}

export default function createProcessor() {
  const tree = Tree();
  let currentNode = null;

  const processNode = function (node) {
    currentNode = node;
    node.enter();
    node.rerun = () => processNode(node);
    node.element.mergeProps({
      children: createChildrenFunc(node, processNode)
    });

    let results = {};
    const queue = createQueue(` ${ node.element.name }`);

    // CONSUME
    queue.add(
      CONSUME,
      () => node.element.consume(),
      (result) => (results[CONSUME] = result)
    );

    // PROCESS_RESULT
    queue.add(PROCESS_RESULT, () => {
      const consumption = results[CONSUME];

      // ActML element
      if (isActMLElement(consumption)) {
        queue.prependItem(
          RETURNED_ELEMENT,
          () => processNode(node.addChildNode(consumption)),
          (result) => (results[RETURNED_ELEMENT] = result)
        );

      // generator
      } else if (isGenerator(consumption)) {
        const generator = consumption;

        queue.prependItem(
          RETURNED_ELEMENT,
          () => new Promise(generatorDone => {
            let genResult;

            (function iterate(value) {
              genResult = generator.next(value);
              if (!genResult.done) {
                if (isActMLElement(genResult.value)) {
                  let res = processNode(node.addChildNode(genResult.value));

                  if (isPromise(res)) {
                    res.then(r => iterate(r));
                  } else {
                    iterate(res);
                  }
                }
              } else {
                if (isActMLElement(genResult.value)) {
                  let res = processNode(node.addChildNode(genResult.value));

                  if (isPromise(res)) {
                    res.then(r => generatorDone(r));
                  } else {
                    generatorDone(res);
                  }
                } else {
                  generatorDone(genResult.value);
                }
              }
            })();
          }),
          (result) => (results[RETURNED_ELEMENT] = result)
        );

      // children
      } else if (consumption && consumption[CHILDREN]) {
        queue.prependItem(
          RETURNED_ELEMENT,
          () => consumption(),
          (result) => {
            results[RETURNED_ELEMENT] = result && result.length === 1 ?
              result[0] :
              result;
          }
        );
      }
    });

    // Running the queue
    queue.process();

    // Getting the result. It is either a promise if there is
    // something asynchronous or a value
    return queue.onDone(() => {
      node.out();
      return RETURNED_ELEMENT in results ? results[RETURNED_ELEMENT] : results[CONSUME];
    });
  };

  return {
    node() {
      return currentNode;
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
          currentNode = null;
          tree.reset();
          createUsePubSubHook.clear();
          createUseStateHook.clear();
          createUseEffectHook.clear();
        }
      };
    }
  };
};
