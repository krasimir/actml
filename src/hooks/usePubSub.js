var subscribers = {};

const subscribe = (element, type, callback) => {
  if (!subscribers[type]) subscribers[type] = {};
  if (!subscribers[type][element.__actml]) subscribers[type][element.__actml] = callback;
  return () => {
    delete subscribers[type][element.__actml];
  };
};
const publish = (element, type, payload) => {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(id => {
    subscribers[type][id](payload, element);
  });
};

export default function createUsePubSubHook(element) {
  return () => ([
    // subscribe
    (...params) => subscribe(element, ...params),
    // publish
    (...params) => publish(element, ...params),
    // clear
    () => {
      subscribers = {};
    },
    // list of all subscribers
    subscribers
  ]);
}
