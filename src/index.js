import createProcessor from './Processor';
import isActMLElement from './utils/isActMLElement';
import ActElement from './ActElement';

const processor = createProcessor();

function A(func, props, ...children) {
  return ActElement(func, props, children);
}
function run(element) {
  if (!isActMLElement(element)) {
    throw new Error(`ActML element expected. Instead ${ element.toString() } passed.`);
  }
  return processor.run(element);
}
const Fragment = () => {};

export {
  A,
  run,
  Fragment,
  processor
};
