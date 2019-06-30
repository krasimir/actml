const createUseChildrenHook = (element, callChildren) => () => {
  element.shouldProcessChildrenAutomatically(false);
  return [ callChildren, element.children ];
};

export default createUseChildrenHook;
