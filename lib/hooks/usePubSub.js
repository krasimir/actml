"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUsePubSubHook;
var subscribers = {};

var _subscribe = function _subscribe(element, type, callback) {
  if (!subscribers[type]) subscribers[type] = {};
  if (!subscribers[type][element.__actml]) subscribers[type][element.__actml] = callback;
  return function () {
    delete subscribers[type][element.__actml];
  };
};
var _publish = function _publish(element, type, payload) {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(function (id) {
    subscribers[type][id](payload, element);
  });
};

function createUsePubSubHook(element) {
  return function () {
    return {
      subscribe: function subscribe() {
        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        return _subscribe.apply(undefined, [element].concat(params));
      },
      publish: function publish() {
        for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          params[_key2] = arguments[_key2];
        }

        return _publish.apply(undefined, [element].concat(params));
      },
      subscribers: subscribers,
      clear: function clear() {
        subscribers = {};
      }
    };
  };
}