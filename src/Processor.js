import ActElement from './ActElement';
import isActMLElement from './utils/isActMLElement';

export default function createProcessor() {
  var ids = 0;

  function getId() {
    return 'a' + (++ids);
  };
  const create = (func, props, children) => {
    const el = ActElement(getId(), func, props, children);

    console.log(el.name);
    return el;
  };
  const run = async (element, parent = null) => {
    let result = element.func(element.props);
    let genResult, toGenValue;

    // handling a promise
    if (result && result.then) {
      result = await result;

    // handling a generator
    } else if (result && typeof result.next === 'function') {
      genResult = result.next();
      while (!genResult.done) {
        if (isActMLElement(genResult.value)) {
          toGenValue = await genResult.value.run(element);
        }
        genResult = result.next(toGenValue);
      }
      if (isActMLElement(genResult.value)) {
        result = await genResult.value.run(element);
      } else {
        result = genResult.value;
      }

    // handling another ActML element
    } else if (isActMLElement(result)) {
      result = await run(result, element);
    }

    // TODO! handling children

    return result;
  };
  const system = () => ({
    elements: ids,
    reset: () => {
      ids = 0;
    }
  });

  return {
    run,
    create,
    system
  };
};
