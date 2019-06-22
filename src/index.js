import ActElement from './ActElement';
import isActMLElement from './utils/isActMLElement';

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
const Fragment = () => {};

export {
  A,
  run,
  Fragment
};
