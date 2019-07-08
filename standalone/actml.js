(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.actml = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getFuncName(func) {
  if (func.name) return func.name;
  var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};

var createElement = function createElement(func, props, children) {
  if (typeof func !== 'function') {
    throw new Error('ActML element expects a function. "' + func + '" given instead.');
  }
  return {
    __actml: true,
    __used: 0,
    __running: false,
    __processChildrenAutomatically: true,
    id: null,
    props: props,
    name: getFuncName(func),
    children: children,
    initialize: function initialize(id) {
      var used = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this.id = id;
      this.__used = used;
      this.__running = false;
      this.__processChildrenAutomatically = true;
    },
    mergeProps: function mergeProps(newProps) {
      this.props = Object.assign({}, this.props, newProps);
    },
    used: function used() {
      return this.__used;
    },
    isRunning: function isRunning() {
      return this.__running;
    },
    shouldProcessChildrenAutomatically: function shouldProcessChildrenAutomatically(value) {
      if (typeof value === 'undefined') {
        return this.__processChildrenAutomatically;
      }
      this.__processChildrenAutomatically = value;
      return value;
    },
    enter: function enter() {
      this.__running = true;
      this.__processChildrenAutomatically = true;

      return func(this.props);
    },
    out: function out() {
      this.__used += 1;
      this.__running = false;
    }
  };
};

exports.default = createElement;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createProcessor;

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _usePubSub = require('./hooks/usePubSub');

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = require('./hooks/useState');

var _useState2 = _interopRequireDefault(_useState);

var _useEffect = require('./hooks/useEffect');

var _useEffect2 = _interopRequireDefault(_useEffect);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }return step("next");
    });
  };
} /* eslint-disable no-use-before-define */

function createProcessor() {
  var _this = this;

  var tree = (0, _Tree2.default)();
  var currentNode = null;

  var processNode = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(node) {
      var result, genResult, toGenValue;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              currentNode = node;
              node.enter();
              node.rerun = function () {
                return processNode(node);
              };
              node.callChildren = function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var childrenResult,
                      children,
                      i,
                      _children$i,
                      funcResult,
                      _args = arguments;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          childrenResult = [];
                          children = node.element.children;

                          if (!(children && children.length > 0)) {
                            _context.next = 30;
                            break;
                          }

                          i = 0;

                        case 4:
                          if (!(i < children.length)) {
                            _context.next = 30;
                            break;
                          }

                          if (!(0, _isActMLElement2.default)(children[i])) {
                            _context.next = 14;
                            break;
                          }

                          (_children$i = children[i]).mergeProps.apply(_children$i, _args);
                          _context.t0 = childrenResult;
                          _context.next = 10;
                          return processNode(node.addChildNode(children[i]));

                        case 10:
                          _context.t1 = _context.sent;

                          _context.t0.push.call(_context.t0, _context.t1);

                          _context.next = 27;
                          break;

                        case 14:
                          if (!(typeof children[i] === 'function')) {
                            _context.next = 27;
                            break;
                          }

                          _context.next = 17;
                          return children[i].apply(children, _args);

                        case 17:
                          funcResult = _context.sent;

                          if (!(0, _isActMLElement2.default)(funcResult)) {
                            _context.next = 26;
                            break;
                          }

                          _context.t2 = childrenResult;
                          _context.next = 22;
                          return processNode(node.addChildNode(funcResult));

                        case 22:
                          _context.t3 = _context.sent;

                          _context.t2.push.call(_context.t2, _context.t3);

                          _context.next = 27;
                          break;

                        case 26:
                          childrenResult.push(funcResult);

                        case 27:
                          i++;
                          _context.next = 4;
                          break;

                        case 30:
                          return _context.abrupt('return', childrenResult);

                        case 31:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function () {
                  return _ref2.apply(this, arguments);
                };
              }();

              // actual call of the ActML element
              result = node.element.enter();
              genResult = void 0, toGenValue = void 0;

              // handling a promise

              if (!(result && result.then)) {
                _context2.next = 12;
                break;
              }

              _context2.next = 9;
              return result;

            case 9:
              result = _context2.sent;
              _context2.next = 35;
              break;

            case 12:
              if (!(result && typeof result.next === 'function')) {
                _context2.next = 31;
                break;
              }

              genResult = result.next();

            case 14:
              if (genResult.done) {
                _context2.next = 22;
                break;
              }

              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 19;
                break;
              }

              _context2.next = 18;
              return processNode(node.addChildNode(genResult.value));

            case 18:
              toGenValue = _context2.sent;

            case 19:
              genResult = result.next(toGenValue);
              _context2.next = 14;
              break;

            case 22:
              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 28;
                break;
              }

              _context2.next = 25;
              return processNode(node.addChildNode(genResult.value));

            case 25:
              result = _context2.sent;
              _context2.next = 29;
              break;

            case 28:
              result = genResult.value;

            case 29:
              _context2.next = 35;
              break;

            case 31:
              if (!(0, _isActMLElement2.default)(result)) {
                _context2.next = 35;
                break;
              }

              _context2.next = 34;
              return processNode(node.addChildNode(result));

            case 34:
              result = _context2.sent;

            case 35:
              if (!node.element.shouldProcessChildrenAutomatically()) {
                _context2.next = 38;
                break;
              }

              _context2.next = 38;
              return node.callChildren();

            case 38:

              node.element.out();
              node.out();
              currentNode = null;

              return _context2.abrupt('return', result);

            case 42:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function processNode(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    node: function node() {
      return currentNode;
    },
    run: function run(element) {
      var resolvedRootNode = tree.resolveRoot(element);

      return processNode(resolvedRootNode, []);
    },
    onNodeEnter: function onNodeEnter(callback) {
      tree.addNodeEnterCallback(callback);
    },
    onNodeOut: function onNodeOut(callback) {
      tree.addNodeOutCallback(callback);
    },
    onNodeRemove: function onNodeRemove(callback) {
      tree.onNodeRemove(callback);
    },
    system: function system() {
      return {
        tree: tree,
        reset: function reset() {
          tree.reset();
          _usePubSub2.default.clear();
          _useState2.default.clear();
          _useEffect2.default.clear();
        }
      };
    }
  };
};

},{"./Tree":3,"./hooks/useEffect":5,"./hooks/usePubSub":8,"./hooks/useState":10,"./utils/isActMLElement":13}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;
/* eslint-disable no-use-before-define, no-return-assign, max-len */

function Tree() {
  var onNodeEnter = [];
  var onNodeOut = [];
  var _onNodeRemove = [];
  var root = createNewNode();
  var ids = 0;

  function getId() {
    return 'a' + ++ids;
  };
  function useSameNode(node, newElement) {
    newElement.initialize(node.element.id, node.element.used());
    node.element = newElement;
    return node;
  }
  function treeDiff(oldElement, newElement) {
    if (oldElement && oldElement.name === newElement.name) {
      if (oldElement.props && newElement.props) {
        return oldElement.props.key === newElement.props.key;
      }
      return true;
    }
    return false;
  }
  function createNewNode(element, parent) {
    if (element) {
      element.initialize(getId());
    }
    return {
      element: element,
      children: [],
      parent: parent,
      cursor: 0,
      enter: function enter() {
        var _this = this;

        onNodeEnter.forEach(function (c) {
          return c(_this);
        });
      },
      out: function out() {
        var _this2 = this;

        // If there're more nodes in the tree than what was processed
        if (this.cursor < this.children.length) {
          this.children.splice(this.cursor, this.children.length - this.cursor).forEach(function (removedNode) {
            return _onNodeRemove.forEach(function (c) {
              return c(removedNode);
            });
          });
        }
        this.cursor = 0;
        onNodeOut.forEach(function (c) {
          return c(_this2);
        });
      },
      addChildNode: function addChildNode(newElement) {
        var _this3 = this;

        var childNode = this.children[this.cursor];

        // using the same node
        if (childNode && treeDiff(childNode.element, newElement)) {
          this.cursor += 1;
          return useSameNode(childNode, newElement);
        }

        // creating a new node
        var newChildNode = createNewNode(newElement, this);

        if (this.children[this.cursor]) {
          _onNodeRemove.forEach(function (c) {
            return c(_this3.children[_this3.cursor]);
          });
        }
        this.children[this.cursor] = newChildNode;
        this.cursor += 1;
        return newChildNode;
      }
    };
  }

  return {
    resolveRoot: function resolveRoot(element) {
      return root = treeDiff(root.element, element) ? useSameNode(root, element) : createNewNode(element);
    },
    reset: function reset() {
      root = createNewNode();
      ids = 0;
    },
    getNumOfElements: function getNumOfElements() {
      return ids;
    },
    diagnose: function diagnose() {
      return function loopOver(node) {
        var ind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        // console.log(node.element.name, node.children.length);
        return {
          ind: ind,
          name: node.element.name,
          used: node.element.used(),
          id: node.element.id,
          children: node.children.map(function (child) {
            return loopOver(child, ind + 1);
          })
        };
      }(root);
    },
    addNodeEnterCallback: function addNodeEnterCallback(callback) {
      onNodeEnter.push(callback);
    },
    addNodeOutCallback: function addNodeOutCallback(callback) {
      onNodeOut.push(callback);
    },
    onNodeRemove: function onNodeRemove(callback) {
      _onNodeRemove.push(callback);
    }
  };
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var createUseChildrenHook = function createUseChildrenHook(processor) {
  return function () {
    (0, _isValidHookContext2.default)(processor);

    var node = processor.node();

    node.element.shouldProcessChildrenAutomatically(false);
    return [node.callChildren, node.element.children];
  };
};

exports.default = createUseChildrenHook;

},{"./utils/isValidHookContext":11}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fastDeepEqual = require('fast-deep-equal');

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint-disable no-return-assign */
var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }
    return this.elements[element.id] = { effects: [], consumer: 0 };
  },
  cleanUp: function cleanUp(id) {
    if (this.elements[id]) {
      delete this.elements[id];
    }
  }
};

var createEffect = function createEffect(callback, deps) {
  return {
    callback: callback,
    deps: deps
  };
};
var updateEffect = function updateEffect(effect, callback, deps) {
  effect.callback = callback;
  effect.oldDeps = effect.deps;
  effect.deps = deps;
  return effect;
};

function depsEqual(oldDeps, newDeps) {
  if (!oldDeps) return false;
  if (oldDeps.length !== newDeps.length) return false;
  return (0, _fastDeepEqual2.default)(oldDeps, newDeps);
}
function resolveEffect(node, effect) {
  var deps = effect.deps,
      oldDeps = effect.oldDeps,
      callback = effect.callback;

  if (typeof deps === 'undefined') {
    effect.cleanUp = callback();
  } else if (deps.length === 0) {
    if (node.element.used() === 1) {
      effect.cleanUp = callback();
    }
  } else {
    var areEqual = depsEqual(oldDeps, deps);

    if (!areEqual) {
      effect.cleanUp = callback();
    }
  }
}

var createUseEffectHook = function createUseEffectHook(processor) {
  processor.onNodeRemove(function (node) {
    var element = node.element;

    var storage = Storage.get(element);

    storage.effects.forEach(function (effect) {
      if (effect.cleanUp) effect.cleanUp();
    });
    Storage.cleanUp(node.element.id);
  });
  processor.onNodeOut(function (node) {
    var element = node.element;

    var storage = Storage.get(element);

    if (storage.effects.length > 0) {
      storage.effects.forEach(function (effect) {
        return resolveEffect(node, effect);
      });
    }
  });
  return function (callback, deps) {
    (0, _isValidHookContext2.default)(processor);

    var node = processor.node();
    var element = node.element;

    var storage = Storage.get(element);

    // first run
    if (element.used() === 0) {
      storage.effects.push(createEffect(callback, deps));

      // other runs
    } else {
      var index = storage.consumer;

      storage.consumer = index < storage.effects.length - 1 ? storage.consumer + 1 : 0;
      updateEffect(storage.effects[index], callback, deps);
    }
  };
};

exports.default = createUseEffectHook;

createUseEffectHook.clear = function () {
  Storage.elements = {};
};

},{"./utils/isValidHookContext":11,"fast-deep-equal":14}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var createUseElementHook = function createUseElementHook(processor) {
  return function () {
    (0, _isValidHookContext2.default)(processor);

    return processor.node().element;
  };
};

exports.default = createUseElementHook;

},{"./utils/isValidHookContext":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
} /* eslint-disable no-return-assign */

var bridgeMethodName = function bridgeMethodName(keyword) {
  return '__request__' + keyword;
};

var resolveProduct = function resolveProduct(bridgeMethod, node, getError) {
  if (!node) {
    throw getError();
  }
  var source = void 0;

  if (node[bridgeMethod]) {
    source = node;
  } else {
    source = node.children.find(function (child) {
      return !!child[bridgeMethod];
    });
  }
  var product = source ? source[bridgeMethod]() : null;

  if (product !== null) {
    return product.value;
  }
  return resolveProduct(bridgeMethod, node.parent, getError);
};

var getNotFoundError = function getNotFoundError(keyword, node) {
  var getStack = function getStack(node) {
    var stack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    stack.push(node.element.name);
    if (node.parent) {
      return getStack(node.parent, stack);
    }
    return stack;
  };

  return new Error('"' + keyword + '" prop requested by "' + node.element.name + '" can not be found.\n\nStack:\n' + getStack(node).reverse().map(function (name) {
    return '  <' + name + '>';
  }).join('\n'));
};

var createUseProductHook = function createUseProductHook(processor) {
  processor.onNodeEnter(function (node) {
    var element = node.element;
    var props = element.props;

    var propNames = props ? Object.keys(props) : [];

    propNames.forEach(function (propName) {
      if (propName.charAt(0) === '$') {
        var keyword = propName.substr(1, propName.length);
        var productValue = resolveProduct(bridgeMethodName(keyword), node.parent, function () {
          return getNotFoundError(keyword, node);
        });

        element.mergeProps(_defineProperty({}, keyword, productValue));
      } else if (propName === 'exports') {
        node[bridgeMethodName(props[propName])] = function () {
          return { value: node.__product };
        };
      }
    });
  });

  return function (value) {
    (0, _isValidHookContext2.default)(processor);
    var node = processor.node();

    node.__product = value;
    return [function (newValue) {
      return node.__product = newValue;
    }];
  };
};

exports.default = createUseProductHook;

},{"./utils/isValidHookContext":11}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

exports.default = createUsePubSubHook;

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var subscribers = {};

function createSubscribeElement(subscribe, useChildren) {
  return function (_ref) {
    var type = _ref.type;

    var _useChildren = useChildren(),
        _useChildren2 = _slicedToArray(_useChildren, 1),
        children = _useChildren2[0];

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

function createUsePubSubHook(processor, useChildren) {
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
      Subscribe: createSubscribeElement(subscribeFunc, useChildren),
      Publish: createPublishElement(publishFunc)
    };
  };
}

createUsePubSubHook.clear = function () {
  subscribers = {};
};

},{"./utils/isValidHookContext":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

exports.default = createUseReducerHook;

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function createDispatchElement(dispatch) {
  return function (_ref) {
    var action = _ref.action,
        propsToAction = _ref.propsToAction,
        rest = _objectWithoutProperties(_ref, ['action', 'propsToAction']);

    if (action) {
      dispatch(action);
    } else if (propsToAction) {
      dispatch(propsToAction(rest));
    } else {
      throw new Error('<Dispatch> expects "action" or "propsToAction" prop.');
    }
  };
}

function createUseReducerHook(useState) {
  return function (reducer, initialState) {
    var _useState = useState(initialState),
        _useState2 = _slicedToArray(_useState, 3),
        state = _useState2[0],
        setState = _useState2[1],
        getState = _useState2[2];

    var dispatch = function dispatch(action) {
      return setState(reducer(getState(), action));
    };

    return [state, dispatch, createDispatchElement(dispatch), // <Dispatch>
    function () {
      return getState();
    } // <GetState>
    ];
  };
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseStateHook;

var _isValidHookContext = require('./utils/isValidHookContext');

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }
    return this.elements[element.id] = { states: [], consumer: 0 };
  },
  cleanUp: function cleanUp(id) {
    if (this.elements[id]) {
      delete this.elements[id];
    }
  }
}; /* eslint-disable no-return-assign */
function createUseStateHook(processor) {
  processor.onNodeRemove(function (node) {
    return Storage.cleanUp(node.element.id);
  });
  return function (initialState) {
    (0, _isValidHookContext2.default)(processor);

    var node = processor.node();
    var element = node.element;

    var storage = Storage.get(element);

    var index = void 0;

    // first run
    if (element.used() === 0) {
      storage.states.push(initialState);
      index = storage.states.length - 1;

      // other runs
    } else {
      index = storage.consumer;
      storage.consumer = index < storage.states.length - 1 ? storage.consumer + 1 : 0;
    }

    return [storage.states[index], function (newState) {
      storage.states[index] = newState;
      if (!element.isRunning()) {
        node.rerun();
      }
      return newState;
    }, function () {
      return storage.states[index];
    }];
  };
}

createUseStateHook.clear = function () {
  Storage.elements = {};
};

},{"./utils/isValidHookContext":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidHookContext;
function isValidHookContext(processor) {
  if (!processor) {
    throw new Error('Something terribly wrong happened. The hook factory function is called without a processor.');
  }
  if (!processor.node()) {
    throw new Error('Hooks must be called in the context of an ActML element.');
  }
};

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUniverse = createUniverse;

var _Processor = require('./Processor');

var _Processor2 = _interopRequireDefault(_Processor);

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _ActElement = require('./ActElement');

var _ActElement2 = _interopRequireDefault(_ActElement);

var _useChildren = require('./hooks/useChildren');

var _useChildren2 = _interopRequireDefault(_useChildren);

var _useElement = require('./hooks/useElement');

var _useElement2 = _interopRequireDefault(_useElement);

var _useProduct = require('./hooks/useProduct');

var _useProduct2 = _interopRequireDefault(_useProduct);

var _usePubSub = require('./hooks/usePubSub');

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = require('./hooks/useState');

var _useState2 = _interopRequireDefault(_useState);

var _useReducer = require('./hooks/useReducer');

var _useReducer2 = _interopRequireDefault(_useReducer);

var _useEffect = require('./hooks/useEffect');

var _useEffect2 = _interopRequireDefault(_useEffect);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createUniverse() {
  var processor = (0, _Processor2.default)();

  function A(func, props) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return (0, _ActElement2.default)(func, props, children);
  }
  function run(element) {
    if (!(0, _isActMLElement2.default)(element)) {
      throw new Error('ActML element expected. Instead ' + element.toString() + ' passed.');
    }
    return processor.run(element);
  }
  var Fragment = function Fragment() {};
  var useChildren = (0, _useChildren2.default)(processor);
  var useElement = (0, _useElement2.default)(processor);
  var useState = (0, _useState2.default)(processor);
  var useProduct = (0, _useProduct2.default)(processor, useState);
  var usePubSub = (0, _usePubSub2.default)(processor, useChildren);
  var useReducer = (0, _useReducer2.default)(useState);
  var useEffect = (0, _useEffect2.default)(processor);

  return {
    A: A,
    run: run,
    Fragment: Fragment,
    processor: processor,
    useChildren: useChildren,
    useElement: useElement,
    useProduct: useProduct,
    usePubSub: usePubSub,
    useState: useState,
    useReducer: useReducer,
    useEffect: useEffect
  };
}

var universe = createUniverse();

module.exports = universe;
module.exports.createUniverse = createUniverse();

},{"./ActElement":1,"./Processor":2,"./hooks/useChildren":4,"./hooks/useEffect":5,"./hooks/useElement":6,"./hooks/useProduct":7,"./hooks/usePubSub":8,"./hooks/useReducer":9,"./hooks/useState":10,"./utils/isActMLElement":13}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isActMLElement;
function isActMLElement(element) {
  return element && element.__actml === true;
};

},{}],14:[function(require,module,exports){
'use strict';

var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a!==a && b!==b;
};

},{}]},{},[12])(12)
});
