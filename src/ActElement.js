export const isActMLElement = (element) => {
  return element && element.__actML;
};

export default function (func, props, children) {
  async function run() {
    const result = func(props);

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        if (isActMLElement(children[i])) {
          await children[i].run();
        }
      }
    }

    if (isActMLElement(result)) {
      return result.run();
    }
    return result;
  }

  return {
    __actML: true,
    __children: children,
    run
  };
};
