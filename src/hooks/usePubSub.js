import isValidHookContext from './utils/isValidHookContext';

var subscribers = {};

const subscribe = (node, element, type, callback) => {
  if (!subscribers[type]) subscribers[type] = {};
  if (__DEV__) {
    if (!subscribers[type][element.id]) {
      node.log('usePubSub:subscribe', type);
    }
  }
  subscribers[type][element.id] = callback;
  return () => {
    if (__DEV__) {
      node.log('usePubSub:unsubscribe', type);
    }
    delete subscribers[type][element.id];
  };
};
const publish = (node, type, payload) => {
  if (!subscribers[type]) return;
  if (__DEV__) {
    node.log('usePubSub:publish:' + type, payload);
  }
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
    const el = scopedElement || node.element;
    const subscribeFunc = (...params) => subscribe(node, el, ...params);
    const publishFunc = (...params) => publish(node, ...params);

    return {
      subscribe: subscribeFunc,
      publish: publishFunc,
      subscribers
    };
  };
}

createUsePubSubHook.clear = () => {
  subscribers = {};
};
