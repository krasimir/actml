"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUsePubSubHook;
var subscribers = {};

var subscribe = function subscribe(element, type, callback) {
  if (!subscribers[type]) subscribers[type] = {};
  subscribers[type][element.id] = callback;
  return function () {
    delete subscribers[type][element.id];
  };
};
var publish = function publish(element, type, payload) {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(function (id) {
    subscribers[type][id](payload, element);
  });
};

function createUsePubSubHook(element) {
  return function (scopedElement) {
    return [
    // subscribe
    function () {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return subscribe.apply(undefined, [scopedElement || element].concat(params));
    },
    // publish
    function () {
      for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return publish.apply(undefined, [scopedElement || element].concat(params));
    },
    // list of all subscribers
    subscribers];
  };
}

createUsePubSubHook.clear = function () {
  subscribers = {};
};