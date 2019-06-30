/* eslint-disable no-use-before-define */
import ActElement from './ActElement';
import isActMLElement from './utils/isActMLElement';
import Tree from './Tree';
import enhanceProps from './utils/enhanceProps';

export default function createProcessor() {
  var tree = Tree();
  const create = (func, props, children) => {
    return ActElement(func, props, children);
  };
  const process = async (branch, stack = []) => {
    const { element } = branch;
    const { props, processChildrenAutomatically } = enhanceProps(element, callChildren, stack);
    const createChildBranch = tree.createChildBranchFactory(branch);
    let result = element.func(props);
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

    // TODO! handling children
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

    return result;
  };
  const run = (elementPrimitive) => process(tree.resolveRoot(elementPrimitive));
  const system = () => ({
    tree,
    reset() {
      tree.reset();
    }
  });

  return {
    run,
    create,
    system
  };
};
