import * as ReduxMethods from './elements/redux';
import execute from './middlewares/execute';
import result from './middlewares/result';
import childrenMiddleware from './middlewares/children';
import Element from './Element';
import { isItAnElement } from './utils';

function create(func, props, ...children) {
  // using A as a dymmy component
  if (func === create) {
    return Element(
      function A() {
        return {
          scope: this.scope,
          context: this.context
        }
      },
      { ...props, scope: '*' },
      children
    );
  }
  return Element(func, props, children);
}

async function run(element, context = {}) {
  const rootElement = Element.createRootElement(context);

  if (isItAnElement(element)) {
    if (isItAnElement(element.func)) {
      element.func.mergeToProps(element.props);
      return await element.func.run(rootElement);
    }
    return await element.run(rootElement);
  }
  return await create(element, null).run(rootElement);
}

const Redux = { ...ReduxMethods };
const Processor = { execute, result, children: childrenMiddleware };
const A = create;

export {
  A,
  run,
  Processor,
  Redux
};
