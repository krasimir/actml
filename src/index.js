import * as ReduxMethods from './elements/redux';
import execute from './middlewares/execute';
import childrenMiddleware from './middlewares/children';
import Element from './Element';
import { isItAnElement } from './utils';
import AElement from './elements/A';
import Root from './elements/Root';

function create(func, props, ...children) {
  // using A as a dymmy component
  if (func === create) {
    return Element(
      AElement,
      { ...props, scope: '*' },
      children
    );
  }
  return Element(func, props, children);
}

async function run(element, context = {}) {
  if (isItAnElement(element)) {
    return await element.run(Root(context));
  }
  throw new Error('`run` should be called with an ActML element.');
}

const Redux = { ...ReduxMethods };
const Processor = { execute, children: childrenMiddleware };
const A = create;

export {
  A,
  run,
  Processor,
  Redux
};
