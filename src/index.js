import * as ReduxMethods from './elements/redux';
import Element from './Element';
import { isItAnElement } from './utils';
import AElement from './elements/A';
import createRootElement from './elements/createRootElement';

function create(func, props, ...children) {
  return func === create ?
    Element(AElement, { ...props, scope: '*' }, children) :
    Element(func, props, children);
}

async function run(element, context = {}) {
  if (isItAnElement(element)) {
    return await element.run(createRootElement(context));
  }
  throw new Error('`run` should be called with an ActML element. You are passing:', element);
}

const Redux = { ...ReduxMethods };
const A = create;

export {
  A,
  run,
  Redux
};
