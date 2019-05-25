const isActMLElement = (element) => {
  return element && element.__actML;
};

export default function (func, props, children) {
  function run() {
    const result = func(props);

    if (children && children.length > 0) {
      children.forEach(element => element.run());
    }

    if (isActMLElement(result)) {
      return result.run();
    }
    return result;
  }

  return {
    __actML: true,
    run
  };
};
