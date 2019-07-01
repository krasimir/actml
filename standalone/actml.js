(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.actml = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

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
}

function parseProps(props) {
  var propNames = props ? Object.keys(props) : [];
  var result = {
    dependencies: [],
    exportsKeyword: undefined
  };

  propNames.forEach(function (propName) {
    if (propName.charAt(0) === '$') {
      result.dependencies.push(propName.substr(1, propName.length));
    } else if (propName === 'exports') {
      result.exportsKeyword = props.exports;
    } else {
      result[propName] = props[propName];
    }
  });

  return result;
};

function getFuncName(func) {
  if (func.name) return func.name;
  var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};

var createElement = function createElement(func, props, children) {
  return {
    __actml: true,
    __used: 0,
    __running: false,
    __processChildrenAutomatically: true,
    id: null,
    props: parseProps(props),
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
    toString: function toString() {
      return this.name;
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
    run: function run(otherProps) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.__running = true;
                _this.__processChildrenAutomatically = true;

                _context.next = 4;
                return func(_extends({}, _this.props, otherProps));

              case 4:
                result = _context.sent;

                _this.__used += 1;
                _this.__running = false;
                return _context.abrupt('return', result);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
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

var _hooks = require('./hooks');

var _hooks2 = _interopRequireDefault(_hooks);

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

var process = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(branch) {

    // handling children
    var callChildren = function () {
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
                children = branch.element.children;

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
                return process(branch.addSubBranch(children[i]), stack);

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
                return process(branch.addSubBranch(funcResult), stack);

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
        }, _callee, this);
      }));

      return function callChildren() {
        return _ref2.apply(this, arguments);
      };
    }();

    var stack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var hooksProps, result, genResult, toGenValue;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            branch.initialize();

            hooksProps = (0, _hooks2.default)(branch, callChildren, stack, process);
            _context2.next = 4;
            return branch.element.run(hooksProps);

          case 4:
            result = _context2.sent;
            genResult = void 0, toGenValue = void 0;

            // updating the stack

            stack.push(branch.element);

            // handling a promise

            if (!(result && result.then)) {
              _context2.next = 13;
              break;
            }

            _context2.next = 10;
            return result;

          case 10:
            result = _context2.sent;
            _context2.next = 36;
            break;

          case 13:
            if (!(result && typeof result.next === 'function')) {
              _context2.next = 32;
              break;
            }

            genResult = result.next();

          case 15:
            if (genResult.done) {
              _context2.next = 23;
              break;
            }

            if (!(0, _isActMLElement2.default)(genResult.value)) {
              _context2.next = 20;
              break;
            }

            _context2.next = 19;
            return process(branch.addSubBranch(genResult.value), stack);

          case 19:
            toGenValue = _context2.sent;

          case 20:
            genResult = result.next(toGenValue);
            _context2.next = 15;
            break;

          case 23:
            if (!(0, _isActMLElement2.default)(genResult.value)) {
              _context2.next = 29;
              break;
            }

            _context2.next = 26;
            return process(branch.addSubBranch(genResult.value), stack);

          case 26:
            result = _context2.sent;
            _context2.next = 30;
            break;

          case 29:
            result = genResult.value;

          case 30:
            _context2.next = 36;
            break;

          case 32:
            if (!(0, _isActMLElement2.default)(result)) {
              _context2.next = 36;
              break;
            }

            _context2.next = 35;
            return process(branch.addSubBranch(result), stack);

          case 35:
            result = _context2.sent;

          case 36:
            if (!branch.element.shouldProcessChildrenAutomatically()) {
              _context2.next = 39;
              break;
            }

            _context2.next = 39;
            return callChildren();

          case 39:

            branch.cleanUp();

            return _context2.abrupt('return', result);

          case 41:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function process(_x) {
    return _ref.apply(this, arguments);
  };
}();

function createProcessor() {
  var tree = (0, _Tree2.default)();

  return {
    run: function run(elementPrimitive) {
      return process(tree.resolveRoot(elementPrimitive));
    },
    system: function system() {
      return {
        tree: tree,
        reset: function reset() {
          tree.reset();
          _usePubSub2.default.clear();
          _useState2.default.clear();
        }
      };
    }
  };
};

},{"./Tree":3,"./hooks":7,"./hooks/usePubSub":11,"./hooks/useState":12,"./utils/isActMLElement":14}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;

var _fastDeepEqual = require('fast-deep-equal');

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function Tree() {
  var root = createNewBranch();
  var ids = 0;

  function getId() {
    return 'a' + ++ids;
  };
  function useSameBranch(branch, newElement) {
    newElement.initialize(branch.element.id, branch.element.used());
    branch.element = newElement;
    return branch;
  }
  function treeDiff(oldElement, newElement) {
    if (oldElement && oldElement.name === newElement.name) {
      return (0, _fastDeepEqual2.default)(oldElement.props, newElement.props);
    }
    return false;
  }
  function createNewBranch(element) {
    if (element) {
      element.initialize(getId());
    }
    return {
      element: element,
      children: [],
      cursor: 0,
      initialize: function initialize() {
        this.cursor = 0;
      },
      addSubBranch: function addSubBranch(newElement) {
        var subBranch = this.children[this.cursor];

        // using the same branch
        if (subBranch && treeDiff(subBranch.element, newElement)) {
          this.cursor += 1;
          return useSameBranch(subBranch, newElement);
        }

        // creating a new branch
        var newSubBranch = createNewBranch(newElement);

        this.children[this.cursor] = newSubBranch;
        this.cursor += 1;
        return newSubBranch;
      },
      cleanUp: function cleanUp() {
        // If there're more branches in the tree then what was processed
        if (this.cursor < this.children.length) {
          this.children.splice(this.cursor, this.children.length - this.cursor);
        }
      }
    };
  }

  return {
    resolveRoot: function resolveRoot(element) {
      return root = treeDiff(root.element, element) ? useSameBranch(root, element) : createNewBranch(element);
    },
    reset: function reset() {
      root = createNewBranch();
      ids = 0;
    },
    getNumOfElements: function getNumOfElements() {
      return ids;
    },
    diagnose: function diagnose() {
      return function loopOver(branch) {
        var ind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var arr = [];

        arr.push({ ind: ind, name: branch.element.name, used: branch.element.used(), id: branch.element.id });
        if (branch.children.length > 0) {
          branch.children.forEach(function (child) {
            arr.push(loopOver(child, ind + 1));
          });
        }
        return arr;
      }(root);
    }
  };
} /* eslint-disable no-use-before-define, no-return-assign, max-len */
;

},{"fast-deep-equal":15}],4:[function(require,module,exports){
"use strict";

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

exports.default = createPublishElement;
function createPublishElement(hostElement) {
  return function (_ref) {
    var type = _ref.type,
        payload = _ref.payload,
        usePubSub = _ref.usePubSub;

    var _usePubSub = usePubSub(hostElement),
        _usePubSub2 = _slicedToArray(_usePubSub, 2),
        publish = _usePubSub2[1];

    publish(type, payload);
  };
}

},{}],5:[function(require,module,exports){
"use strict";

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

exports.default = createSubscribeElement;
function createSubscribeElement(hostElement) {
    return function (_ref) {
        var type = _ref.type,
            useChildren = _ref.useChildren,
            usePubSub = _ref.usePubSub;

        var _useChildren = useChildren(),
            _useChildren2 = _slicedToArray(_useChildren, 1),
            children = _useChildren2[0];

        var _usePubSub = usePubSub(hostElement),
            _usePubSub2 = _slicedToArray(_usePubSub, 1),
            subscribe = _usePubSub2[0];

        subscribe(type, children);
    };
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseElementsHook;

var _Publish = require('./Publish');

var _Publish2 = _interopRequireDefault(_Publish);

var _Subscribe = require('./Subscribe');

var _Subscribe2 = _interopRequireDefault(_Subscribe);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function createUseElementsHook(element) {
  return {
    Publish: (0, _Publish2.default)(element),
    Subscribe: (0, _Subscribe2.default)(element)
  };
}

},{"./Publish":4,"./Subscribe":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

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

exports.default = initializeHooks;

var _useElement = require('./useElement');

var _useElement2 = _interopRequireDefault(_useElement);

var _useChildren = require('./useChildren');

var _useChildren2 = _interopRequireDefault(_useChildren);

var _useProduct = require('./useProduct');

var _useProduct2 = _interopRequireDefault(_useProduct);

var _usePubSub = require('./usePubSub');

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = require('./useState');

var _useState2 = _interopRequireDefault(_useState);

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function initializeHooks(branch, callChildren, stack, process) {
  var element = branch.element;

  var useElement = (0, _useElement2.default)(element);
  var useChildren = (0, _useChildren2.default)(element, callChildren);

  var _createUseProductHook = (0, _useProduct2.default)(element, stack),
      _createUseProductHook2 = _slicedToArray(_createUseProductHook, 2),
      useProduct = _createUseProductHook2[0],
      resolvedProductProps = _createUseProductHook2[1];

  var usePubSub = (0, _usePubSub2.default)(element);
  var useState = (0, _useState2.default)(element, function () {
    return process(branch, stack);
  });

  return _extends({}, resolvedProductProps, {
    useChildren: useChildren,
    useElement: useElement,
    useProduct: useProduct,
    usePubSub: usePubSub,
    useState: useState,
    useElements: function useElements() {
      return (0, _elements2.default)(element);
    }
  });
};

},{"./elements":6,"./useChildren":8,"./useElement":9,"./useProduct":10,"./usePubSub":11,"./useState":12}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createUseChildrenHook = function createUseChildrenHook(element, callChildren) {
  return function () {
    element.shouldProcessChildrenAutomatically(false);
    return [callChildren, element.children];
  };
};

exports.default = createUseChildrenHook;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseElementHook;
function createUseElementHook(element) {
  return function () {
    return [element];
  };
}

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseProductHook;

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

/* eslint-disable no-return-assign */

var resolveProp = function resolveProp(prop, stackIndex, stack, error) {
  if (stackIndex < 0) {
    throw error;
  }
  var parent = stack[stackIndex];
  var product = parent.requestProduct ? parent.requestProduct(prop) : null;

  if (product !== null) {
    return product.value;
  }
  return resolveProp(prop, stackIndex - 1, stack, error);
};

function resolveProduct(element, stack) {
  var dependencies = element.props.dependencies;

  var data = {};

  if (dependencies.length === 0) {
    return {};
  }

  dependencies.forEach(function (propName) {
    data[propName] = resolveProp(propName, stack.length - 1, stack, new Error('"' + propName + '" prop requested by "' + element.name + '" can not be found.\n\nStack:\n' + [].concat(_toConsumableArray(stack), [element]).map(function (_ref) {
      var name = _ref.name;
      return '  <' + name + '>';
    }).join('\n')));
  });
  return data;
};

function createUseProductHook(element, stack) {
  var product = void 0;
  var resolvedProductProps = resolveProduct(element, stack);

  element.requestProduct = function (propName) {
    if (element.props.exportsKeyword && element.props.exportsKeyword === propName) {
      return { value: product };
    }
    return null;
  };

  return [function (initialValue) {
    if (typeof initialValue !== 'undefined') {
      product = initialValue;
    }
    return [function (newValue) {
      product = newValue;
    }];
  }, resolvedProductProps];
};

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseStateHook;
/* eslint-disable no-return-assign */

var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }
    return this.elements[element.id] = { states: [], consumer: 0 };
  }
};

function createUseStateHook(element, rerun) {
  var storage = Storage.get(element);

  return function (initialState) {
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
        rerun();
      }
      return newState;
    }];
  };
}

createUseStateHook.clear = function () {
  Storage.elements = {};
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processor = exports.Fragment = exports.run = exports.A = undefined;

var _Processor = require('./Processor');

var _Processor2 = _interopRequireDefault(_Processor);

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _ActElement = require('./ActElement');

var _ActElement2 = _interopRequireDefault(_ActElement);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

exports.A = A;
exports.run = run;
exports.Fragment = Fragment;
exports.processor = processor;

},{"./ActElement":1,"./Processor":2,"./utils/isActMLElement":14}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isActMLElement;
function isActMLElement(element) {
  return element && element.__actml === true;
};

},{}],15:[function(require,module,exports){
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

},{}]},{},[13])(13)
});
