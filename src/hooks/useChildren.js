import isActMLElement from '../utils/isActMLElement';

export default function createUseChildrenHook(element, children) {
  let processChildrenAutomatically = { process: true };

  async function callChildren(newProps, ...rest) {
    const result = [];

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        if (isActMLElement(children[i])) {
          result.push(await children[i].run(element, newProps));
        } else if (typeof children[i] === 'function') {
          const funcResult = await children[i](newProps, ...rest);

          if (isActMLElement(funcResult)) {
            result.push(await funcResult.run(element, newProps));
          } else {
            result.push(funcResult);
          }
        }
      }
    }
    return result;
  }

  return {
    hook: () => {
      processChildrenAutomatically.process = false;
      return [ callChildren, children ];
    },
    callChildren,
    processChildrenAutomatically
  };
};
