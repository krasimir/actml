/* eslint-disable no-use-before-define */
import isActMLElement from './utils/isActMLElement';
import Tree from './Tree';
import createUseElementHook from './hooks/useElement';
import createUseChildrenHook from './hooks/useChildren';
import createUseProductHook from './hooks/useProduct';
import createUsePubSubHook from './hooks/usePubSub';
import createUseStateHook from './hooks/useState';

function initializeHooks(element, callChildren, stack, rerun) {
  const useElement = createUseElementHook(element);
  const {
    hook: useChildren,
    processChildrenAutomatically
  } = createUseChildrenHook(element, callChildren);
  const {
    hook: useProduct,
    resolvedProductProps
  } = createUseProductHook(element, stack);
  const usePubSub = createUsePubSubHook(element);
  const useState = createUseStateHook(element, rerun);

  return [
    {
      ...resolvedProductProps,
      useChildren,
      useElement,
      useProduct,
      usePubSub,
      useState,
      // useElements: createUseElementsHook(element)
    },
    processChildrenAutomatically
  ];
};

export default function createProcessor() {
  var tree = Tree();
  const process = async (branch, stack = []) => {
    const { element } = branch;
    const [ createChildBranch, cleanUpTree ] = tree.createChildBranchFactory(branch);
    const rerun = () => process(branch, stack);
    const [ hooksProps, processChildrenAutomatically ] = initializeHooks(element, callChildren, stack, rerun);
    let result = await element.run(hooksProps);
    let genResult, toGenValue;

    // updating the stack
    stack.push(element);

    // handling a promise
    if (result && result.then) {
      result = await result;

    // handling a generator
    } else if (result && typeof result.next === 'function') {
      genResult = result.next();
      while (!genResult.done) {
        if (isActMLElement(genResult.value)) {
          toGenValue = await process(createChildBranch(genResult.value), stack);
        }
        genResult = result.next(toGenValue);
      }
      if (isActMLElement(genResult.value)) {
        result = await process(createChildBranch(genResult.value), stack);
      } else {
        result = genResult.value;
      }

    // handling another ActML element
    } else if (isActMLElement(result)) {
      result = await process(createChildBranch(result), stack);
    }

    // handling children
    async function callChildren(additionalProps) {
      const childrenResult = [];
      const { children } = element;

      if (children && children.length > 0) {
        for (let i = 0; i < children.length; i++) {
          if (isActMLElement(children[i])) {
            children[i].mergeProps(additionalProps);
            childrenResult.push(await process(createChildBranch(children[i]), stack));
          } else if (typeof children[i] === 'function') {
            const funcResult = await children[i](additionalProps);

            if (isActMLElement(funcResult)) {
              childrenResult.push(await process(createChildBranch(funcResult), stack));
            } else {
              childrenResult.push(funcResult);
            }
          }
        }
      }

      return childrenResult;
    }
    if (processChildrenAutomatically.process) {
      await callChildren();
    }

    cleanUpTree();

    return result;
  };
  const run = (elementPrimitive) => process(tree.resolveRoot(elementPrimitive));
  const system = () => ({
    tree,
    reset() {
      tree.reset();
      createUsePubSubHook.clear();
      createUseStateHook.clear();
    }
  });

  return {
    run,
    system
  };
};
