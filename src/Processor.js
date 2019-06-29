import ActElement from './ActElement';
import isActMLElement from './utils/isActMLElement';
import { createTree, processTree, diagnose, resetTree, getNumOfElements } from './Tree';
import Tree from './Tree';
import prepareProps from './utils/prepareProps';

export default function createProcessor() {
  var tree = Tree();
  const create = (func, props, children) => {
    return ActElement(func, props, children);
  };
  const run = async (elementPrimitive, branch = tree.get()) => {
    const { element, createBranch } = tree.process(branch, elementPrimitive);
    let result = element.func(prepareProps(element));
    let genResult, toGenValue;

    // handling a promise
    if (result && result.then) {
      result = await result;

    // handling a generator
    } else if (result && typeof result.next === 'function') {
      genResult = result.next();
      while (!genResult.done) {
        if (isActMLElement(genResult.value)) {
          toGenValue = await run(genResult.value, createBranch(branch));
        }
        genResult = result.next(toGenValue);
      }
      if (isActMLElement(genResult.value)) {
        result = await run(genResult.value, createBranch(branch));
      } else {
        result = genResult.value;
      }

    // handling another ActML element
    } else if (isActMLElement(result)) {
      result = await run(result, createBranch(branch));
    }

    // TODO! handling children
    const childrenResult = [];
    const { children } = element;

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        if (isActMLElement(children[i])) {
          childrenResult.push(await run(children[i], createBranch(branch)));
        } else if (typeof children[i] === 'function') {
          const funcResult = await children[i]();

          if (isActMLElement(funcResult)) {
            childrenResult.push(await run(funcResult, createBranch(branch)));
          } else {
            childrenResult.push(funcResult);
          }
        }
      }
    }

    return result;
  };
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
