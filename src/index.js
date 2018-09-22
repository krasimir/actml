import Parallel from './elements/Parallel';
import * as ReduxMethods from './elements/redux';
import Pipeline from './Pipeline';
import Element from './Element';
import { createStorage } from './Storage';

function create(func, props, ...children) {
  // using A as a dymmy component
  if (func === create) return Element(function A() { return this.context.dump(); }, props, children);
  return Element(func, props, children);
}
async function run(element, contextData) {
  const context = createStorage(contextData);
  const rootElement = Element.createRootElement(context);

  if (Element.isItAnElement(element)) {
    if (Element.isItAnElement(element.func)) {
      element.func.mergeToProps(element.props);
      return await element.func.run(rootElement);
    }
    return await element.run(rootElement);
  }
  return await create(element, null).run(rootElement);
}

const Redux = { ...ReduxMethods };
const A = create;

export {
  A,
  run,
  Parallel,
  Pipeline,
  Redux
};
