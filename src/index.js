import Parallel from './elements/Parallel';
import * as ReduxMethods from './elements/redux';
import Pipeline from './Pipeline';
import Element from './Element';
import { createContext } from './Context';

function create(func, props, ...children) {
  // using D as a dymmy component
  if (func === create) return Element(function() { return this.context.dump(); }, props, children);
  return Element(func, props, children);
}
async function run(element, contextData) {
  const context = createContext(contextData);

  if (Element.isItAnElement(element)) {
    if (Element.isItAnElement(element.func)) {
      element.func.mergeToProps(element.props);
      return await element.func.run(context);
    }
    return await element.run(context);
  }
  return await create(element, null).run(context);
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
