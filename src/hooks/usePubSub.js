import isValidHookContext from './utils/isValidHookContext';

var subscribers = {};

const subscribe = (element, type, callback) => {
  if (!subscribers[type]) subscribers[type] = {};
  subscribers[type][element.id] = callback;
  return () => {
    delete subscribers[type][element.id];
  };
};
const publish = (type, payload) => {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(id => {
    subscribers[type][id](payload);
  });
};

export default function createUsePubSubHook(processor) {
  processor.onNodeRemove(node => {
    Object.keys(subscribers).forEach(type => {
      if (subscribers[type][node.element.id]) {
        delete subscribers[type][node.element.id];
      }
    });
  });
  return (scopedElement) => {
    isValidHookContext(processor);

    const node = processor.node();

    return {
      subscribe: (...params) => subscribe(scopedElement || node.element, ...params),
      publish: (...params) => publish(...params),
      subscribers
    };
  };
}

createUsePubSubHook.clear = () => {
  subscribers = {};
};
