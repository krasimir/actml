export const isActMLElement = (element) => {
  return element && element.__actML;
};

export default function (func, props, children) {
  async function run() {
    let result = func(props);
    let genResult, toGenValue;

    // handling a generator
    if (result && typeof result.next === 'function') {
      genResult = result.next();
      while (!genResult.done) {
        if (isActMLElement(genResult.value)) {
          toGenValue = await genResult.value.run();
        }
        genResult = result.next(toGenValue);
      }
      result = genResult.value;
    }

    // handling children
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
