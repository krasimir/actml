import Parallel from './actors/Parallel';
import * as ReduxMethods from './actors/redux';
import Pipeline from './Pipeline';
import Actor from './Actor';
import { createContext } from './Context';

function create(func, props, ...children) {
  // using D as a dymmy component
  if (func === create) return Actor(function() { return this.context.dump(); }, props, children);
  return Actor(func, props, children);
}
async function run(actor, contextData) {
  const context = createContext(contextData);

  if (Actor.isItAnActor(actor)) {
    if (Actor.isItAnActor(actor.func)) {
      actor.func.mergeToProps(actor.props);
      return await actor.func.run(context);
    }
    return await actor.run(context);
  }
  return await create(actor, null).run(context);
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
