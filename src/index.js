import ActElement, { isActMLElement } from './ActElement';

function create(func, props, ...children) {
  return ActElement(func, props, children);
}
function run(element) {
  if (!isActMLElement(element)) {
    throw new Error(`ActML element expected. Instead ${ element.toString() } passed.`);
  }
  return element.run();
}

const A = create;

export {
  A,
  run
};
