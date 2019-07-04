import isValidHookContext from './utils/isValidHookContext';

var subscribers = {};

const subscribe = (element, type, callback) => {
  if (!subscribers[type]) subscribers[type] = {};
  subscribers[type][element.id] = callback;
  return () => {
    delete subscribers[type][element.id];
  };
};
const publish = (element, type, payload) => {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(id => {
    subscribers[type][id](payload, element);
  });
};

export default function createUsePubSubHook(processor) {
  return (scopedElement) => {
    isValidHookContext(processor);

    const node = processor.node();

    return {
      subscribe: (...params) => subscribe(scopedElement || node.element, ...params),
      publish: (...params) => publish(scopedElement || node.element, ...params),
      subscribers
    };
  };
}

createUsePubSubHook.clear = () => {
  subscribers = {};
};
