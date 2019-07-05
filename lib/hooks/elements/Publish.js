"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createPublishElement;
function createPublishElement(hostElement, useChildren, usePubSub) {
  return function (_ref) {
    var type = _ref.type,
        payload = _ref.payload;

    var _usePubSub = usePubSub(hostElement),
        publish = _usePubSub.publish;

    publish(type, payload);
  };
}