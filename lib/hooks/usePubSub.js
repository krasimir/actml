'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUsePubSubHook;

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subscribers = {};

function createSubscribeElement(subscribe) {
  return function (_ref) {
    var type = _ref.type,
        children = _ref.children;

    subscribe(type, function (payload) {
      return children({ payload: payload });
    });
  };
};
function createPublishElement(publish) {
  return function (_ref2) {
    var type = _ref2.type,
        payload = _ref2.payload;

    publish(type, payload);
  };
}

var subscribe = function subscribe(element, type, callback) {
  if (!subscribers[type]) subscribers[type] = {};
  subscribers[type][element.id] = callback;
  return function () {
    delete subscribers[type][element.id];
  };
};
var publish = function publish(type, payload) {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(function (id) {
    subscribers[type][id](payload);
  });
};

function createUsePubSubHook(processor) {
  processor.onNodeRemove(function (node) {
    Object.keys(subscribers).forEach(function (type) {
      if (subscribers[type][node.element.id]) {
        delete subscribers[type][node.element.id];
      }
    });
  });
  return function (scopedElement) {
    (0, _isValidHookContext2.default)(processor);

    var node = processor.node();
    var el = scopedElement || node.element;
    var subscribeFunc = function subscribeFunc() {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return subscribe.apply(undefined, [el].concat(params));
    };
    var publishFunc = function publishFunc() {
      return publish.apply(undefined, arguments);
    };

    return {
      subscribe: subscribeFunc,
      publish: publishFunc,
      subscribers: subscribers,
      Subscribe: createSubscribeElement(subscribeFunc),
      Publish: createPublishElement(publishFunc)
    };
  };
}

createUsePubSubHook.clear = function () {
  subscribers = {};
};