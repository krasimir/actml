import isActMLElement from '../utils/isActMLElement';

export default function createUseChildrenHook(element, children) {
  let processChildrenAutomatically = { process: true };

  async function callChildren(newProps) {
    const result = [];

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        if (isActMLElement(children[i])) {
          result.push(await children[i].run(element, newProps));
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
