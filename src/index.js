import createProcessor from './Processor';
import isActMLElement from './utils/isActMLElement';

const processor = createProcessor();

function create(func, props, ...children) {
  return processor.create(func, props, children);
}
function run(element) {
  if (!isActMLElement(element)) {
    throw new Error(`ActML element expected. Instead ${ element.toString() } passed.`);
  }
  return processor.run(element);
}

const A = create;
const Fragment = () => {};

export {
  A,
  run,
  Fragment,
  processor
};
