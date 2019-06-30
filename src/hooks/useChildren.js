export default function createUseChildrenHook(element, callChildren) {
  let processChildrenAutomatically = { process: true };

  return {
    hook: () => {
      processChildrenAutomatically.process = false;
      return [ callChildren, element.children ];
    },
    processChildrenAutomatically
  };
};
