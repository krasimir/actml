import ActElement from './ActElement';

function create(func, props, ...children) {
  return ActElement(func, props, children);
}
function run(element) {
  return element.run();
}

const A = create;

export {
  A,
  run
};
