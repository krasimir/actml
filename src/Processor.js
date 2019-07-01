/* eslint-disable no-use-before-define */
import isActMLElement from './utils/isActMLElement';
import Tree from './Tree';
import createUsePubSubHook from './hooks/usePubSub';
import createUseStateHook from './hooks/useState';
import initializeHooks from './hooks';

const process = async (branch, stack = []) => {
  branch.initialize();

  const hooksProps = initializeHooks(branch, callChildren, stack, process);
  let result = await branch.element.run(hooksProps);
  let genResult, toGenValue;

  // updating the stack
  stack.push(branch.element);

  // handling a promise
  if (result && result.then) {
    result = await result;

  // handling a generator
  } else if (result && typeof result.next === 'function') {
    genResult = result.next();
    while (!genResult.done) {
      if (isActMLElement(genResult.value)) {
        toGenValue = await process(branch.addSubBranch(genResult.value), stack);
      }
      genResult = result.next(toGenValue);
    }
    if (isActMLElement(genResult.value)) {
      result = await process(branch.addSubBranch(genResult.value), stack);
    } else {
      result = genResult.value;
    }

  // handling another ActML element
  } else if (isActMLElement(result)) {
    result = await process(branch.addSubBranch(result), stack);
  }

  // handling children
  async function callChildren(...additionalProps) {
    const childrenResult = [];
    const { children } = branch.element;

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        if (isActMLElement(children[i])) {
          children[i].mergeProps(...additionalProps);
          childrenResult.push(await process(branch.addSubBranch(children[i]), stack));
        } else if (typeof children[i] === 'function') {
          const funcResult = await children[i](...additionalProps);

          if (isActMLElement(funcResult)) {
            childrenResult.push(await process(branch.addSubBranch(funcResult), stack));
          } else {
            childrenResult.push(funcResult);
          }
        }
      }
    }

    return childrenResult;
  }

  if (branch.element.shouldProcessChildrenAutomatically()) {
    await callChildren();
  }

  branch.cleanUp();

  return result;
};

export default function createProcessor() {
  const tree = Tree();

  return {
    run(elementPrimitive) {
      return process(tree.resolveRoot(elementPrimitive));
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
