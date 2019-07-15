/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../lib/ActElement.js":
/*!*************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/ActElement.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getFuncName(func) {
  if (func.name) return func.name;
  var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());
  return result ? result[1] : 'unknown';
}

;

var createElement = function createElement(func, props, children) {
  if (typeof func !== 'function') {
    throw new Error('ActML element expects a function. "' + func + '" given instead.');
  }

  return {
    __actml: true,
    __used: 0,
    __running: false,
    id: null,
    props: props,
    name: getFuncName(func),
    children: children,
    initialize: function initialize(id) {
      var used = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.id = id;
      this.__used = used;
      this.__running = false;
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
    enter: function enter() {
      this.__running = true;
    },
    consume: function consume() {
      return func(this.props);
    },
    out: function out() {
      this.__used += 1;
      this.__running = false;
    }
  };
};

exports.default = createElement;

/***/ }),

/***/ "../../lib/Context.js":
/*!**********************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/Context.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createContextFactory;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
/* eslint-disable consistent-return */


var CONTEXT_KEY = '__CONTEXT_KEY__';
var PUBLIC_CONTEXT_KEY = exports.PUBLIC_CONTEXT_KEY = '__PUBLIC_CONTEXT_KEY__';
var ids = 0;

function getId() {
  return 'c' + ++ids;
}

;

function resolveContext(node, id) {
  var stack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  stack.push(node.element.name);

  if (node[CONTEXT_KEY] && id in node[CONTEXT_KEY]) {
    return node[CONTEXT_KEY][id];
  } else if (node.parent) {
    return resolveContext(node.parent, id, stack);
  }

  console.warn('A context consumer is used with no provider.\n  Stack:\n' + stack.map(function (name) {
    return '    <' + name + '>';
  }).join('\n'));
}

function createContextFactory(processor) {
  return function createContext(initialValue) {
    var _ref3;

    var id = getId();

    var Provider = function Provider(_ref) {
      var value = _ref.value,
          children = _ref.children;
      var node = processor.node();

      if (!node[CONTEXT_KEY]) {
        node[CONTEXT_KEY] = {};
      }

      node[CONTEXT_KEY][id] = value;
      return children;
    };

    var Consumer = function Consumer(_ref2) {
      var children = _ref2.children;
      var node = processor.node();
      children(resolveContext(node, id) || initialValue);
    };

    return _ref3 = {}, _defineProperty(_ref3, PUBLIC_CONTEXT_KEY, function () {
      var node = processor.node();
      return resolveContext(node, id) || initialValue;
    }), _defineProperty(_ref3, 'Provider', Provider), _defineProperty(_ref3, 'Consumer', Consumer), _ref3;
  };
}

;

/***/ }),

/***/ "../../lib/Processor.js":
/*!************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/Processor.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createProcessor;

var _isActMLElement = __webpack_require__(/*! ./utils/isActMLElement */ "../../lib/utils/isActMLElement.js");

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _Tree = __webpack_require__(/*! ./Tree */ "../../lib/Tree.js");

var _Tree2 = _interopRequireDefault(_Tree);

var _usePubSub = __webpack_require__(/*! ./hooks/usePubSub */ "../../lib/hooks/usePubSub.js");

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = __webpack_require__(/*! ./hooks/useState */ "../../lib/hooks/useState.js");

var _useState2 = _interopRequireDefault(_useState);

var _useEffect = __webpack_require__(/*! ./hooks/useEffect */ "../../lib/hooks/useEffect.js");

var _useEffect2 = _interopRequireDefault(_useEffect);

var _Queue = __webpack_require__(/*! ./Queue */ "../../lib/Queue.js");

var _Queue2 = _interopRequireDefault(_Queue);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* eslint-disable no-use-before-define, consistent-return */


var CHILDREN = '__ACTML_CHILDREN__';
var CONSUME = 'CONSUME';
var PROCESS_RESULT = 'PROCESS_RESULT';
var RETURNED_ELEMENT = 'RETURNED_ELEMENT';
var CHILD = 'CHILD';

var isGenerator = function isGenerator(obj) {
  return obj && typeof obj['next'] === 'function';
};

var isPromise = function isPromise(obj) {
  return obj && typeof obj['then'] === 'function';
};

function createChildrenFunc(node, processNode) {
  var f = function f() {
    var _arguments = arguments;
    var children = node.element.children;

    if (children && children.length > 0) {
      var queueItemsToAdd = [];
      var results = [];
      var childrenQueue = (0, _Queue2.default)('  ' + node.element.name + ':children');

      var _loop = function _loop(i) {
        if ((0, _isActMLElement2.default)(children[i])) {
          var _children$i;

          (_children$i = children[i]).mergeProps.apply(_children$i, _arguments);

          queueItemsToAdd.push(function () {
            return processNode(node.addChildNode(children[i]));
          });
        } else if (typeof children[i] === 'function') {
          var funcResult = children[i].apply(children, _arguments);

          if ((0, _isActMLElement2.default)(funcResult)) {
            queueItemsToAdd.push(function () {
              return processNode(node.addChildNode(funcResult));
            });
          } else {
            results.push(funcResult);
          }
        } else {
          results.push(children[i]);
        }
      };

      for (var i = 0; i < children.length; i++) {
        _loop(i);
      }

      queueItemsToAdd.reverse().forEach(function (func) {
        childrenQueue.prependItem(CHILD, func, function (r) {
          return results.push(r);
        });
      });
      childrenQueue.process();
      return childrenQueue.onDone(function () {
        return results;
      });
    }
  };

  f[CHILDREN] = true;
  return f;
}

function createProcessor() {
  var tree = (0, _Tree2.default)();
  var currentNode = null;

  var processNode = function processNode(node) {
    currentNode = node;
    node.enter();

    node.rerun = function () {
      return processNode(node);
    };

    node.element.mergeProps({
      children: createChildrenFunc(node, processNode)
    });
    var results = {};
    var queue = (0, _Queue2.default)(' ' + node.element.name); // CONSUME

    queue.add(CONSUME, function () {
      return node.element.consume();
    }, function (result) {
      return results[CONSUME] = result;
    }); // PROCESS_RESULT

    queue.add(PROCESS_RESULT, function () {
      var consumption = results[CONSUME]; // ActML element

      if ((0, _isActMLElement2.default)(consumption)) {
        queue.prependItem(RETURNED_ELEMENT, function () {
          return processNode(node.addChildNode(consumption));
        }, function (result) {
          return results[RETURNED_ELEMENT] = result;
        }); // generator
      } else if (isGenerator(consumption)) {
        var generator = consumption;
        queue.prependItem(RETURNED_ELEMENT, function () {
          return new Promise(function (generatorDone) {
            var genResult = void 0;

            (function iterate(value) {
              genResult = generator.next(value);

              if (!genResult.done) {
                if ((0, _isActMLElement2.default)(genResult.value)) {
                  var res = processNode(node.addChildNode(genResult.value));

                  if (isPromise(res)) {
                    res.then(function (r) {
                      return iterate(r);
                    });
                  } else {
                    iterate(res);
                  }
                }
              } else {
                if ((0, _isActMLElement2.default)(genResult.value)) {
                  var _res = processNode(node.addChildNode(genResult.value));

                  if (isPromise(_res)) {
                    _res.then(function (r) {
                      return generatorDone(r);
                    });
                  } else {
                    generatorDone(_res);
                  }
                } else {
                  generatorDone(genResult.value);
                }
              }
            })();
          });
        }, function (result) {
          return results[RETURNED_ELEMENT] = result;
        }); // children
      } else if (consumption && consumption[CHILDREN]) {
        queue.prependItem(RETURNED_ELEMENT, function () {
          return consumption();
        }, function (result) {
          results[RETURNED_ELEMENT] = result && result.length === 1 ? result[0] : result;
        });
      }
    }); // Running the queue

    queue.process(); // Getting the result. It is either a promise if there is
    // something asynchronous or a value

    return queue.onDone(function () {
      node.out();
      return RETURNED_ELEMENT in results ? results[RETURNED_ELEMENT] : results[CONSUME];
    });
  };

  return {
    node: function node() {
      return currentNode;
    },
    run: function run(element) {
      var rootNode = tree.resolveRoot(element);
      return processNode(rootNode);
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
          currentNode = null;
          tree.reset();

          _usePubSub2.default.clear();

          _useState2.default.clear();

          _useEffect2.default.clear();
        }
      };
    }
  };
}

;

/***/ }),

/***/ "../../lib/Queue.js":
/*!********************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/Queue.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createQueue;

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
}
/* eslint-disable no-return-assign */


var LOGS = false;

var log = function log() {
  var _console;

  return LOGS ? (_console = console).log.apply(_console, arguments) : null;
};

var isPromise = function isPromise(obj) {
  return obj && typeof obj['then'] === 'function';
};

var createItem = function createItem(type, func) {
  var onDone = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
  return {
    type: type,
    func: func,
    onDone: onDone
  };
};

function createQueue(context) {
  var items = [];
  var async = false;
  var running = false;

  var release = function release() {};

  return {
    add: function add(type, func, onDone) {
      log(context + ':Q: [...' + type + '] (' + (items.length + 1) + ' total)');
      items.push(createItem(type, func, onDone));
    },
    prependItem: function prependItem(type, func, onDone) {
      log(context + ':Q: [' + type + '...] (' + (items.length + 1) + ' total)');
      items = [createItem(type, func, onDone)].concat(_toConsumableArray(items));
    },
    process: function process(lastResult) {
      var _this = this;

      running = true;

      if (items.length === 0) {
        log(context + ':Q:done');
        running = false;
        release();
        return;
      }

      var item = items.shift();
      log(context + ':Q: ' + item.type + '() (' + items.length + ' left)');
      var result = item.func(lastResult);

      if (isPromise(result)) {
        async = true;
        result.then(function (asyncResult) {
          item.onDone(asyncResult);

          _this.process(asyncResult);
        }).catch(function (error) {
          release(error);
        });
      } else {
        item.onDone(result);
        this.process(result);
      }
    },
    onDone: function onDone(getResult) {
      if (async) {
        return new Promise(function (done, reject) {
          release = function release(error) {
            if (error) {
              reject(error);
            } else {
              done(getResult());
            }
          };
        });
      }

      return getResult();
    },
    isRunning: function isRunning() {
      return running;
    }
  };
}

;

/***/ }),

/***/ "../../lib/Tree.js":
/*!*******************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/Tree.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports.default = Tree;

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}
/* eslint-disable no-use-before-define, no-return-assign, max-len */


var LOGS = false;

var log = function log() {
  var _console;

  return LOGS ? (_console = console).log.apply(_console, arguments) : null;
};

function Tree() {
  var onNodeEnter = [];
  var onNodeOut = [];
  var _onNodeRemove = [];
  var root = createNewNode();
  var ids = 0;

  function getId() {
    return 'a' + ++ids;
  }

  ;

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

        log('-> ' + this.element.name);
        this.element.enter();
        onNodeEnter.forEach(function (c) {
          return c(_this);
        });
      },
      out: function out() {
        var _this2 = this;

        log('<- ' + this.element.name);
        this.element.out(); // If there're more nodes in the tree than what was processed

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

        var childNode = this.children[this.cursor]; // using the same node

        if (childNode && treeDiff(childNode.element, newElement)) {
          this.cursor += 1;
          return useSameNode(childNode, newElement);
        } // creating a new node


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

        var _ref = node.element.props ? node.element.props : {},
            children = _ref.children,
            rest = _objectWithoutProperties(_ref, ['children']); // eslint-disable-line no-unused-vars


        return {
          ind: ind,
          name: node.element.name,
          props: _extends({
            children: '<function children>'
          }, rest),
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
}

;

/***/ }),

/***/ "../../lib/hooks/useContext.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useContext.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

var _Context = __webpack_require__(/*! ../Context */ "../../lib/Context.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var createUseElementHook = function createUseElementHook(processor) {
  return function (Context) {
    (0, _isValidHookContext2.default)(processor);
    return Context[_Context.PUBLIC_CONTEXT_KEY]();
  };
};

exports.default = createUseElementHook;

/***/ }),

/***/ "../../lib/hooks/useEffect.js":
/*!******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useEffect.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fastDeepEqual = __webpack_require__(/*! fast-deep-equal */ "../../node_modules/fast-deep-equal/index.js");

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/* eslint-disable no-return-assign */


var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }

    return this.elements[element.id] = {
      effects: [],
      consumer: 0
    };
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
    var storage = Storage.get(element); // first run

    if (element.used() === 0) {
      storage.effects.push(createEffect(callback, deps)); // other runs
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

/***/ }),

/***/ "../../lib/hooks/useElement.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useElement.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var createUseElementHook = function createUseElementHook(processor) {
  return function () {
    (0, _isValidHookContext2.default)(processor);
    return processor.node().element;
  };
};

exports.default = createUseElementHook;

/***/ }),

/***/ "../../lib/hooks/usePubSub.js":
/*!******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/usePubSub.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUsePubSubHook;

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var subscribers = {};

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
      subscribers: subscribers
    };
  };
}

createUsePubSubHook.clear = function () {
  subscribers = {};
};

/***/ }),

/***/ "../../lib/hooks/useReducer.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useReducer.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
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
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
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
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    var dispatch = function dispatch(action) {
      return setState(reducer(state(), action));
    };

    return [state, dispatch, createDispatchElement(dispatch), // <Dispatch>
    function () {
      return state();
    } // <GetState>
    ];
  };
}

/***/ }),

/***/ "../../lib/hooks/useState.js":
/*!*****************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useState.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseStateHook;

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var Storage = {
  elements: {},
  get: function get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }

    return this.elements[element.id] = {
      states: [],
      consumer: 0
    };
  },
  cleanUp: function cleanUp(id) {
    if (this.elements[id]) {
      delete this.elements[id];
    }
  }
};
/* eslint-disable no-return-assign */

function createUseStateHook(processor) {
  processor.onNodeRemove(function (node) {
    return Storage.cleanUp(node.element.id);
  });
  return function (initialState) {
    (0, _isValidHookContext2.default)(processor);
    if (false) {}
    var node = processor.node();
    var element = node.element;
    var storage = Storage.get(element);
    var index = void 0; // first run

    if (element.used() === 0) {
      storage.states.push(initialState);
      index = storage.states.length - 1; // other runs
    } else {
      index = storage.consumer;
      storage.consumer = index < storage.states.length - 1 ? storage.consumer + 1 : 0;
    }

    return [function () {
      return storage.states[index];
    }, function (newState) {
      storage.states[index] = newState;

      if (!element.isRunning()) {
        node.rerun();
      }

      return newState;
    }];
  };
}

createUseStateHook.clear = function () {
  Storage.elements = {};
};

/***/ }),

/***/ "../../lib/hooks/utils/isValidHookContext.js":
/*!*********************************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/utils/isValidHookContext.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
}

;

/***/ }),

/***/ "../../lib/index.js":
/*!********************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRuntime = createRuntime;

var _Processor = __webpack_require__(/*! ./Processor */ "../../lib/Processor.js");

var _Processor2 = _interopRequireDefault(_Processor);

var _isActMLElement = __webpack_require__(/*! ./utils/isActMLElement */ "../../lib/utils/isActMLElement.js");

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _ActElement = __webpack_require__(/*! ./ActElement */ "../../lib/ActElement.js");

var _ActElement2 = _interopRequireDefault(_ActElement);

var _useElement = __webpack_require__(/*! ./hooks/useElement */ "../../lib/hooks/useElement.js");

var _useElement2 = _interopRequireDefault(_useElement);

var _usePubSub = __webpack_require__(/*! ./hooks/usePubSub */ "../../lib/hooks/usePubSub.js");

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = __webpack_require__(/*! ./hooks/useState */ "../../lib/hooks/useState.js");

var _useState2 = _interopRequireDefault(_useState);

var _useReducer = __webpack_require__(/*! ./hooks/useReducer */ "../../lib/hooks/useReducer.js");

var _useReducer2 = _interopRequireDefault(_useReducer);

var _useEffect = __webpack_require__(/*! ./hooks/useEffect */ "../../lib/hooks/useEffect.js");

var _useEffect2 = _interopRequireDefault(_useEffect);

var _useContext = __webpack_require__(/*! ./hooks/useContext */ "../../lib/hooks/useContext.js");

var _useContext2 = _interopRequireDefault(_useContext);

var _Context = __webpack_require__(/*! ./Context */ "../../lib/Context.js");

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function createRuntime() {
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

  var Fragment = function Fragment(_ref) {
    var children = _ref.children;
    return children;
  };

  var useElement = (0, _useElement2.default)(processor);
  var useState = (0, _useState2.default)(processor);
  var usePubSub = (0, _usePubSub2.default)(processor);
  var useReducer = (0, _useReducer2.default)(useState);
  var useEffect = (0, _useEffect2.default)(processor);
  var useContext = (0, _useContext2.default)(processor);
  var createContext = (0, _Context2.default)(processor);
  return {
    A: A,
    run: run,
    Fragment: Fragment,
    processor: processor,
    useElement: useElement,
    usePubSub: usePubSub,
    useState: useState,
    useReducer: useReducer,
    useEffect: useEffect,
    useContext: useContext,
    createContext: createContext
  };
}

var runtime = createRuntime();
module.exports = runtime;
module.exports.createRuntime = createRuntime();

/***/ }),

/***/ "../../lib/utils/isActMLElement.js":
/*!***********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/utils/isActMLElement.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isActMLElement;

function isActMLElement(element) {
  return element && element.__actml === true;
}

;

/***/ }),

/***/ "../../node_modules/fast-deep-equal/index.js":
/*!*********************************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/node_modules/fast-deep-equal/index.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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


/***/ }),

/***/ "../../packages/inspector/helpers/sanitize.js":
/*!**********************************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/packages/inspector/helpers/sanitize.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sanitize; });
/* harmony import */ var _vendor_CircularJSON__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vendor/CircularJSON */ "../../packages/inspector/helpers/vendor/CircularJSON.js");
/* harmony import */ var _vendor_SerializeError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vendor/SerializeError */ "../../packages/inspector/helpers/vendor/SerializeError.js");
/* harmony import */ var _vendor_SerializeError__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vendor_SerializeError__WEBPACK_IMPORTED_MODULE_1__);


const {
  stringify
} = _vendor_CircularJSON__WEBPACK_IMPORTED_MODULE_0__["default"];
function sanitize(something, showErrorInConsole = false) {
  var result;

  try {
    result = JSON.parse(stringify(something, function (key, value) {
      if (typeof value === 'function') {
        return value.name === '' ? '<anonymous>' : `function ${value.name}()`;
      }

      if (value instanceof Error) {
        return _vendor_SerializeError__WEBPACK_IMPORTED_MODULE_1___default()(value);
      }

      return value;
    }, undefined, true));
  } catch (error) {
    if (showErrorInConsole) {
      console.log(error);
    }

    result = null;
  }

  return result;
}

/***/ }),

/***/ "../../packages/inspector/helpers/vendor/CircularJSON.js":
/*!*********************************************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/packages/inspector/helpers/vendor/CircularJSON.js ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* eslint-disable */

/*!
Copyright (C) 2013-2017 by Andrea Giammarchi - @WebReflection

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
var // should be a not so common char
// possibly one JSON does not encode
// possibly one encodeURIComponent does not encode
// right now this char is '~' but this might change in the future
specialChar = '~',
    safeSpecialChar = '\\x' + ('0' + specialChar.charCodeAt(0).toString(16)).slice(-2),
    escapedSafeSpecialChar = '\\' + safeSpecialChar,
    specialCharRG = new RegExp(safeSpecialChar, 'g'),
    safeSpecialCharRG = new RegExp(escapedSafeSpecialChar, 'g'),
    safeStartWithSpecialCharRG = new RegExp('(?:^|([^\\\\]))' + escapedSafeSpecialChar),
    indexOf = [].indexOf || function (v) {
  for (var i = this.length; i-- && this[i] !== v;);

  return i;
},
    $String = String // there's no way to drop warnings in JSHint
// about new String ... well, I need that here!
// faked, and happy linter!
;

function generateReplacer(value, replacer, resolve) {
  var inspect = !!replacer,
      path = [],
      all = [value],
      seen = [value],
      mapp = [resolve ? specialChar : '<circular>'],
      last = value,
      lvl = 1,
      i,
      fn;

  if (inspect) {
    fn = typeof replacer === 'object' ? function (key, value) {
      return key !== '' && replacer.indexOf(key) < 0 ? void 0 : value;
    } : replacer;
  }

  return function (key, value) {
    // the replacer has rights to decide
    // if a new object should be returned
    // or if there's some key to drop
    // let's call it here rather than "too late"
    if (inspect) value = fn.call(this, key, value); // did you know ? Safari passes keys as integers for arrays
    // which means if (key) when key === 0 won't pass the check

    if (key !== '') {
      if (last !== this) {
        i = lvl - indexOf.call(all, this) - 1;
        lvl -= i;
        all.splice(lvl, all.length);
        path.splice(lvl - 1, path.length);
        last = this;
      } // console.log(lvl, key, path);


      if (typeof value === 'object' && value) {
        // if object isn't referring to parent object, add to the
        // object path stack. Otherwise it is already there.
        if (indexOf.call(all, value) < 0) {
          all.push(last = value);
        }

        lvl = all.length;
        i = indexOf.call(seen, value);

        if (i < 0) {
          i = seen.push(value) - 1;

          if (resolve) {
            // key cannot contain specialChar but could be not a string
            path.push(('' + key).replace(specialCharRG, safeSpecialChar));
            mapp[i] = specialChar + path.join(specialChar);
          } else {
            mapp[i] = mapp[0];
          }
        } else {
          value = mapp[i];
        }
      } else {
        if (typeof value === 'string' && resolve) {
          // ensure no special char involved on deserialization
          // in this case only first char is important
          // no need to replace all value (better performance)
          value = value.replace(safeSpecialChar, escapedSafeSpecialChar).replace(specialChar, safeSpecialChar);
        }
      }
    }

    return value;
  };
}

function retrieveFromPath(current, keys) {
  for (var i = 0, length = keys.length; i < length; current = current[// keys should be normalized back here
  keys[i++].replace(safeSpecialCharRG, specialChar)]);

  return current;
}

function generateReviver(reviver) {
  return function (key, value) {
    var isString = typeof value === 'string';

    if (isString && value.charAt(0) === specialChar) {
      return new $String(value.slice(1));
    }

    if (key === '') value = regenerate(value, value, {}); // again, only one needed, do not use the RegExp for this replacement
    // only keys need the RegExp

    if (isString) value = value.replace(safeStartWithSpecialCharRG, '$1' + specialChar).replace(escapedSafeSpecialChar, safeSpecialChar);
    return reviver ? reviver.call(this, key, value) : value;
  };
}

function regenerateArray(root, current, retrieve) {
  for (var i = 0, length = current.length; i < length; i++) {
    current[i] = regenerate(root, current[i], retrieve);
  }

  return current;
}

function regenerateObject(root, current, retrieve) {
  for (var key in current) {
    if (current.hasOwnProperty(key)) {
      current[key] = regenerate(root, current[key], retrieve);
    }
  }

  return current;
}

function regenerate(root, current, retrieve) {
  return current instanceof Array ? // fast Array reconstruction
  regenerateArray(root, current, retrieve) : current instanceof $String ? // root is an empty string
  current.length ? retrieve.hasOwnProperty(current) ? retrieve[current] : retrieve[current] = retrieveFromPath(root, current.split(specialChar)) : root : current instanceof Object ? // dedicated Object parser
  regenerateObject(root, current, retrieve) : // value as it is
  current;
}

function stringifyRecursion(value, replacer, space, doNotResolve) {
  return JSON.stringify(value, generateReplacer(value, replacer, !doNotResolve), space);
}

function parseRecursion(text, reviver) {
  return JSON.parse(text, generateReviver(reviver));
}

/* harmony default export */ __webpack_exports__["default"] = ({
  stringify: stringifyRecursion,
  parse: parseRecursion
});

/***/ }),

/***/ "../../packages/inspector/helpers/vendor/SerializeError.js":
/*!***********************************************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/packages/inspector/helpers/vendor/SerializeError.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable */
// Credits: https://github.com/sindresorhus/serialize-error


module.exports = value => {
  if (typeof value === 'object') {
    return destroyCircular(value, []);
  } // People sometimes throw things besides Error objects, so…


  if (typeof value === 'function') {
    // JSON.stringify discards functions. We do too, unless a function is thrown directly.
    return `[Function: ${value.name || 'anonymous'}]`;
  }

  return value;
}; // https://www.npmjs.com/package/destroy-circular


function destroyCircular(from, seen) {
  const to = Array.isArray(from) ? [] : {};
  seen.push(from);

  for (const key of Object.keys(from)) {
    const value = from[key];

    if (typeof value === 'function') {
      continue;
    }

    if (!value || typeof value !== 'object') {
      to[key] = value;
      continue;
    }

    if (seen.indexOf(from[key]) === -1) {
      to[key] = destroyCircular(from[key], seen.slice(0));
      continue;
    }

    to[key] = '[Circular]';
  }

  if (typeof from.name === 'string') {
    to.name = from.name;
  }

  if (typeof from.message === 'string') {
    to.message = from.message;
  }

  if (typeof from.stack === 'string') {
    to.stack = from.stack;
  }

  return to;
}

/***/ }),

/***/ "../../packages/inspector/index.js":
/*!***********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/packages/inspector/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return inspector; });
/* harmony import */ var _helpers_sanitize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/sanitize */ "../../packages/inspector/helpers/sanitize.js");
const ENTER = 'ENTER';
const OUT = 'OUT';
const REMOVE = 'REMOVE';


function printSnapshotToConsole(snapshot) {
  let str = '';

  let addInd = ind => {
    let s = '',
        i = 0;

    for (; i < ind; i++) s += '  ';

    return s;
  };

  (function loop({
    ind,
    name,
    used,
    children
  }) {
    if (children.length === 0) {
      str += `${addInd(ind)}<${name} /> (${used})\n`;
      return;
    }

    str += addInd(ind);
    str += `<${name}> (${used})\n`;

    if (children.length > 0) {
      children.forEach(child => loop(child));
    }

    str += addInd(ind);
    str += `</${name}>\n`;
  })(snapshot.tree);

  console.clear();
  console.log(str);
}

function inspector(processor) {
  const snapshots = [];

  function snapshot(type, node) {
    const {
      children,
      ...rest
    } = node.element.props ? node.element.props : {}; // eslint-disable-line no-unused-vars

    snapshots.push(Object(_helpers_sanitize__WEBPACK_IMPORTED_MODULE_0__["default"])({
      type,
      element: {
        name: node.element.name,
        props: {
          children: '<function children>',
          ...rest
        },
        used: node.element.used(),
        id: node.element.id
      },
      tree: processor.system().tree.diagnose()
    }));
    printSnapshotToConsole(snapshots[snapshots.length - 1]);
  }

  processor.onNodeEnter(node => snapshot(ENTER, node));
  processor.onNodeOut(node => snapshot(OUT, node));
  processor.onNodeRemove(node => snapshot(REMOVE, node));
}
;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectSpread2.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread2.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    if (i % 2) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    } else {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(arguments[i]));
    }
  }

  return target;
}

module.exports = _objectSpread2;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./src/CheckForEditField.js":
/*!**********************************!*\
  !*** ./src/CheckForEditField.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CheckForEditField; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* eslint-disable react/prop-types */

/** @jsx A */


function CheckForEditField(_ref) {
  var todos = _ref.todos;
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["FocusField"], {
    index: todos.findIndex(function (_ref2) {
      var editing = _ref2.editing;
      return editing;
    })
  });
}

/***/ }),

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/*! exports provided: FillContainer, Container, FocusField, ProgressChecker, Footer, FilterOptionsTabs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FillContainer", function() { return FillContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusField", function() { return FocusField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressChecker", function() { return ProgressChecker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterOptionsTabs", function() { return FilterOptionsTabs; });
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ "./src/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_2__);




var $ = function $(selector) {
  return document.querySelector(selector);
};

var list = $('.todo-list');
var header = $('.header');
var ENTER = 13;
var ESC = 27;
function FillContainer(_ref) {
  var children = _ref.children;
  list.innerHTML = children();
}
function Container(_ref2) {
  var onUserAction = _ref2.onUserAction;
  Object(_lib__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    list.addEventListener('click', function (e) {
      var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

      if (e.target.hasAttribute('data-toggle')) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["TOGGLE"], todoIndex);
      } else if (e.target.hasAttribute('data-delete')) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["DELETE"], todoIndex);
      }
    });
    list.addEventListener('dblclick', function (e) {
      var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

      if (e.target.hasAttribute('data-label')) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["EDIT"], todoIndex);
      }
    });
    list.addEventListener('focusout', function (e) {
      var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

      if (e.target.hasAttribute('data-edit')) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["EDIT_TODO"], {
          index: todoIndex,
          label: e.target.value
        });
      }
    });
    list.addEventListener('keyup', function (e) {
      var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

      if (e.target.hasAttribute('data-edit') && e.keyCode === ENTER) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["EDIT_TODO"], {
          index: todoIndex,
          label: e.target.value
        });
      } else if (e.target.hasAttribute('data-edit') && e.keyCode === ESC) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["EDIT"], todoIndex);
      }
    });
    header.addEventListener('keyup', function (e) {
      if (e.target.hasAttribute('data-new') && e.keyCode === ENTER) {
        onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["NEW_TODO"], e.target.value);
        e.target.value = '';
      }
    });
  }, []);
}
function FocusField(_ref3) {
  var index = _ref3.index;
  var el = $(".edit[data-index=\"".concat(index, "\"]"));

  if (el) {
    el.focus();
    el.selectionStart = el.selectionEnd = el.value.length;
  }
}
;
function ProgressChecker(_ref4) {
  var todos = _ref4.todos;
  var completed = todos.filter(function (_ref5) {
    var completed = _ref5.completed;
    return completed;
  }).length;
  var itemsLeft = todos.length - completed;
  $('[data-count]').innerHTML = "\n    <strong>".concat(itemsLeft, "</strong> ").concat(itemsLeft > 1 || itemsLeft === 0 ? 'items' : 'item', " left\n  ");
}
;
function Footer(_ref6) {
  var onUserAction = _ref6.onUserAction;
  Object(_lib__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    $('[data-filter]').addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-all')) {
        onUserAction(___WEBPACK_IMPORTED_MODULE_1__["FILTER_ALL"]);
      } else if (e.target.hasAttribute('data-active')) {
        onUserAction(___WEBPACK_IMPORTED_MODULE_1__["FILTER_ACTIVE"]);
      } else if (e.target.hasAttribute('data-completed')) {
        onUserAction(___WEBPACK_IMPORTED_MODULE_1__["FILTER_COMPLETED"]);
      }
    });
    $('[data-clear-completed]').addEventListener('click', function () {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_0__["CLEAR_COMPLETED"]);
    });
  }, []);
}
;
function FilterOptionsTabs(_ref7) {
  var filter = _ref7.filter;
  Object(_lib__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    $('[data-all]').setAttribute('class', filter === ___WEBPACK_IMPORTED_MODULE_1__["FILTER_ALL"] ? 'selected' : '');
    $('[data-active]').setAttribute('class', filter === ___WEBPACK_IMPORTED_MODULE_1__["FILTER_ACTIVE"] ? 'selected' : '');
    $('[data-completed]').setAttribute('class', filter === ___WEBPACK_IMPORTED_MODULE_1__["FILTER_COMPLETED"] ? 'selected' : '');
  }, [filter]);
}

/***/ }),

/***/ "./src/Persist.js":
/*!************************!*\
  !*** ./src/Persist.js ***!
  \************************/
/*! exports provided: useLocalStorage, Persist */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocalStorage", function() { return useLocalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Persist", function() { return Persist; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Store */ "./src/Store.js");



var initialValue = JSON.stringify([Object(_Store__WEBPACK_IMPORTED_MODULE_2__["ToDo"])({
  label: 'ActML is using JSX'
}), Object(_Store__WEBPACK_IMPORTED_MODULE_2__["ToDo"])({
  label: 'It is like React but not for rendering'
})]);
var useLocalStorage = function useLocalStorage() {
  var _useState = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useState"])(JSON.parse(localStorage.getItem('todos') || initialValue)),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 1),
      getData = _useState2[0];

  return getData();
};
var Persist = function Persist(_ref) {
  var todos = _ref.todos;
  localStorage.setItem('todos', JSON.stringify(todos));
};

/***/ }),

/***/ "./src/Renderer.js":
/*!*************************!*\
  !*** ./src/Renderer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Renderer; });
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "./src/index.js");
/* eslint-disable react/prop-types */

/** @jsx A */



function Renderer(_ref) {
  var todos = _ref.todos,
      filter = _ref.filter;
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["FillContainer"], null, function () {
    return todos.filter(function (_ref2) {
      var completed = _ref2.completed;
      if (filter === ___WEBPACK_IMPORTED_MODULE_2__["FILTER_ALL"]) return true;
      if (filter === ___WEBPACK_IMPORTED_MODULE_2__["FILTER_ACTIVE"]) return !completed;
      if (filter === ___WEBPACK_IMPORTED_MODULE_2__["FILTER_COMPLETED"]) return completed;
      return false;
    }).map(function (todo, i) {
      var liClass = todo.editing ? 'editing' : todo.completed ? 'completed' : '';
      return "\n            <li class='".concat(liClass, "'>\n              <div class=\"view\">\n                <input \n                  class=\"toggle\"\n                  type=\"checkbox\"\n                  data-index=\"").concat(i, "\"\n                  data-toggle\n                  ").concat(todo.completed ? 'checked' : '', ">\n                <label data-index=\"").concat(i, "\" data-label>").concat(todo.label, "</label>\n                <button\n                  class=\"destroy\"\n                  data-index=\"").concat(i, "\"\n                  data-delete></button>\n              </div>\n              <input class=\"edit\" value=\"").concat(todo.label, "\" data-index=\"").concat(i, "\" data-edit>\n            </li>\n          ");
    }).join('');
  });
}
;

/***/ }),

/***/ "./src/Store.js":
/*!**********************!*\
  !*** ./src/Store.js ***!
  \**********************/
/*! exports provided: TOGGLE, NEW_TODO, DELETE, EDIT, EDIT_TODO, CLEAR_COMPLETED, ToDo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOGGLE", function() { return TOGGLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NEW_TODO", function() { return NEW_TODO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE", function() { return DELETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT", function() { return EDIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_TODO", function() { return EDIT_TODO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLEAR_COMPLETED", function() { return CLEAR_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToDo", function() { return ToDo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread2 */ "./node_modules/@babel/runtime/helpers/objectSpread2.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_3__);




/* eslint-disable react/prop-types */

/** @jsx A */

var TOGGLE = 'TOGGLE';
var NEW_TODO = 'NEW_TODO';
var DELETE = 'DELETE';
var EDIT = 'EDIT';
var EDIT_TODO = 'EDIT_TODO';
var CLEAR_COMPLETED = 'CLEAR_COMPLETED';

var toggle = function toggle(todoIndex) {
  return {
    type: TOGGLE,
    todoIndex: todoIndex
  };
};

var deleteTodo = function deleteTodo(todoIndex) {
  return {
    type: DELETE,
    todoIndex: todoIndex
  };
};

var newTodo = function newTodo(label) {
  return {
    type: NEW_TODO,
    label: label
  };
};

var edit = function edit(todoIndex) {
  return {
    type: EDIT,
    todoIndex: todoIndex
  };
};

var editToDo = function editToDo(_ref) {
  var index = _ref.index,
      label = _ref.label;
  return {
    type: EDIT_TODO,
    index: index,
    label: label
  };
};

var clearCompleted = function clearCompleted() {
  return {
    type: CLEAR_COMPLETED
  };
};

var ToDo = function ToDo(_ref2) {
  var label = _ref2.label;
  return {
    label: label,
    completed: false,
    editing: false
  };
};

var reducer = function reducer(todos, action) {
  switch (action.type) {
    case TOGGLE:
      return todos.map(function (todo, index) {
        if (index === action.todoIndex) {
          return _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default()({}, todo, {
            completed: !todo.completed
          });
        }

        return todo;
      });

    case EDIT:
      return todos.map(function (todo, index) {
        if (index === action.todoIndex) {
          return _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default()({}, todo, {
            editing: !todo.editing
          });
        }

        return _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default()({}, todo, {
          editing: false
        });
      });

    case EDIT_TODO:
      return todos.map(function (todo, index) {
        if (index === action.index) {
          return _babel_runtime_helpers_objectSpread2__WEBPACK_IMPORTED_MODULE_2___default()({}, todo, {
            label: action.label,
            editing: false
          });
        }

        return todo;
      });

    case NEW_TODO:
      return [].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(todos), [ToDo({
        label: action.label
      })]);

    case DELETE:
      return todos.filter(function (todo, index) {
        return index !== action.todoIndex;
      });

    case CLEAR_COMPLETED:
      return todos.filter(function (todo) {
        return !todo.completed;
      });

    default:
      return todos;
  }
};

function Store(_ref3) {
  var initialValue = _ref3.initialValue,
      children = _ref3.children;

  var _useReducer = Object(_lib__WEBPACK_IMPORTED_MODULE_3__["useReducer"])(reducer, initialValue),
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useReducer, 2),
      todos = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_3__["usePubSub"])(),
      subscribe = _usePubSub.subscribe;

  Object(_lib__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    subscribe(TOGGLE, function (todoIndex) {
      return dispatch(toggle(todoIndex));
    });
    subscribe(NEW_TODO, function (label) {
      return dispatch(newTodo(label));
    });
    subscribe(DELETE, function (todoIndex) {
      return dispatch(deleteTodo(todoIndex));
    });
    subscribe(EDIT, function (label) {
      return dispatch(edit(label));
    });
    subscribe(EDIT_TODO, function (payload) {
      return dispatch(editToDo(payload));
    });
    subscribe(CLEAR_COMPLETED, function () {
      return dispatch(clearCompleted());
    });
  }, []);
  children({
    todos: todos()
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_ALL", function() { return FILTER_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_ACTIVE", function() { return FILTER_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_COMPLETED", function() { return FILTER_COMPLETED; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _packages_inspector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../packages/inspector */ "../../packages/inspector/index.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Renderer */ "./src/Renderer.js");
/* harmony import */ var _CheckForEditField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CheckForEditField */ "./src/CheckForEditField.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _Persist__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Persist */ "./src/Persist.js");


/** @jsx A */


Object(_packages_inspector__WEBPACK_IMPORTED_MODULE_2__["default"])(_lib__WEBPACK_IMPORTED_MODULE_1__["processor"]);





var FILTER_ALL = 'FILTER_ALL';
var FILTER_ACTIVE = 'FILTER_ACTIVE';
var FILTER_COMPLETED = 'FILTER_COMPLETED';

function App() {
  var initialValue = Object(_Persist__WEBPACK_IMPORTED_MODULE_7__["useLocalStorage"])();

  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["usePubSub"])(),
      publish = _usePubSub.publish,
      subscribe = _usePubSub.subscribe;

  var _useState = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useState"])(FILTER_ALL),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    subscribe(FILTER_ALL, function () {
      return setFilter(FILTER_ALL);
    });
    subscribe(FILTER_ACTIVE, function () {
      return setFilter(FILTER_ACTIVE);
    });
    subscribe(FILTER_COMPLETED, function () {
      return setFilter(FILTER_COMPLETED);
    });
  }, []);
  return Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_lib__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_6__["Container"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_6__["Footer"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_Store__WEBPACK_IMPORTED_MODULE_3__["default"], {
    initialValue: initialValue
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_6__["FilterOptionsTabs"], {
    filter: filter()
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_Renderer__WEBPACK_IMPORTED_MODULE_4__["default"], {
    filter: filter()
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_CheckForEditField__WEBPACK_IMPORTED_MODULE_5__["default"], null), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_6__["ProgressChecker"], null), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_Persist__WEBPACK_IMPORTED_MODULE_7__["Persist"], null)));
}

;
Object(_lib__WEBPACK_IMPORTED_MODULE_1__["run"])(Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(App, null));

/***/ }),

/***/ 0:
/*!********************************************************!*\
  !*** multi regenerator-runtime/runtime ./src/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! regenerator-runtime/runtime */"./node_modules/regenerator-runtime/runtime.js");
module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1F1ZXVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUHViU3ViLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVN0YXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi91dGlscy9pc0FjdE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2hlbHBlcnMvc2FuaXRpemUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9DaXJjdWxhckpTT04uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9TZXJpYWxpemVFcnJvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BlcnNpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJnZXRGdW5jTmFtZSIsImZ1bmMiLCJuYW1lIiwicmVzdWx0IiwiZXhlYyIsInRvU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJFcnJvciIsIl9fYWN0bWwiLCJfX3VzZWQiLCJfX3J1bm5pbmciLCJpZCIsImluaXRpYWxpemUiLCJ1c2VkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibWVyZ2VQcm9wcyIsIm5ld1Byb3BzIiwiYXNzaWduIiwiaXNSdW5uaW5nIiwiZW50ZXIiLCJjb25zdW1lIiwib3V0IiwiZGVmYXVsdCIsImNyZWF0ZUNvbnRleHRGYWN0b3J5IiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwia2V5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiQ09OVEVYVF9LRVkiLCJQVUJMSUNfQ09OVEVYVF9LRVkiLCJpZHMiLCJnZXRJZCIsInJlc29sdmVDb250ZXh0Iiwibm9kZSIsInN0YWNrIiwicHVzaCIsImVsZW1lbnQiLCJwYXJlbnQiLCJjb25zb2xlIiwid2FybiIsIm1hcCIsImpvaW4iLCJwcm9jZXNzb3IiLCJjcmVhdGVDb250ZXh0IiwiaW5pdGlhbFZhbHVlIiwiX3JlZjMiLCJQcm92aWRlciIsIl9yZWYiLCJDb25zdW1lciIsIl9yZWYyIiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3VzZUVmZmVjdCIsIl91c2VFZmZlY3QyIiwiX1F1ZXVlIiwiX1F1ZXVlMiIsIl9fZXNNb2R1bGUiLCJDSElMRFJFTiIsIkNPTlNVTUUiLCJQUk9DRVNTX1JFU1VMVCIsIlJFVFVSTkVEX0VMRU1FTlQiLCJDSElMRCIsImlzR2VuZXJhdG9yIiwiaXNQcm9taXNlIiwiY3JlYXRlQ2hpbGRyZW5GdW5jIiwicHJvY2Vzc05vZGUiLCJmIiwiX2FyZ3VtZW50cyIsInF1ZXVlSXRlbXNUb0FkZCIsInJlc3VsdHMiLCJjaGlsZHJlblF1ZXVlIiwiX2xvb3AiLCJpIiwiX2NoaWxkcmVuJGkiLCJhcHBseSIsImFkZENoaWxkTm9kZSIsImZ1bmNSZXN1bHQiLCJyZXZlcnNlIiwiZm9yRWFjaCIsInByZXBlbmRJdGVtIiwiciIsInByb2Nlc3MiLCJvbkRvbmUiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJyZXJ1biIsInF1ZXVlIiwiYWRkIiwiY29uc3VtcHRpb24iLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwiZ2VuZXJhdG9yRG9uZSIsImdlblJlc3VsdCIsIml0ZXJhdGUiLCJuZXh0IiwiZG9uZSIsInJlcyIsInRoZW4iLCJfcmVzIiwicnVuIiwicm9vdE5vZGUiLCJyZXNvbHZlUm9vdCIsIm9uTm9kZUVudGVyIiwiY2FsbGJhY2siLCJhZGROb2RlRW50ZXJDYWxsYmFjayIsIm9uTm9kZU91dCIsImFkZE5vZGVPdXRDYWxsYmFjayIsIm9uTm9kZVJlbW92ZSIsInN5c3RlbSIsInJlc2V0IiwiY2xlYXIiLCJjcmVhdGVRdWV1ZSIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImFycjIiLCJmcm9tIiwiTE9HUyIsImxvZyIsIl9jb25zb2xlIiwiY3JlYXRlSXRlbSIsInR5cGUiLCJjb250ZXh0IiwiaXRlbXMiLCJhc3luYyIsInJ1bm5pbmciLCJyZWxlYXNlIiwiY29uY2F0IiwibGFzdFJlc3VsdCIsIl90aGlzIiwiaXRlbSIsInNoaWZ0IiwiYXN5bmNSZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZ2V0UmVzdWx0IiwicmVqZWN0IiwiX2V4dGVuZHMiLCJ0YXJnZXQiLCJzb3VyY2UiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJUcmVlIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwia2V5cyIsImluZGV4T2YiLCJfb25Ob2RlUmVtb3ZlIiwicm9vdCIsImNyZWF0ZU5ld05vZGUiLCJ1c2VTYW1lTm9kZSIsIm5ld0VsZW1lbnQiLCJ0cmVlRGlmZiIsIm9sZEVsZW1lbnQiLCJjdXJzb3IiLCJjIiwiX3RoaXMyIiwic3BsaWNlIiwicmVtb3ZlZE5vZGUiLCJfdGhpczMiLCJjaGlsZE5vZGUiLCJuZXdDaGlsZE5vZGUiLCJnZXROdW1PZkVsZW1lbnRzIiwiZGlhZ25vc2UiLCJsb29wT3ZlciIsImluZCIsInJlc3QiLCJjaGlsZCIsIl9pc1ZhbGlkSG9va0NvbnRleHQiLCJfaXNWYWxpZEhvb2tDb250ZXh0MiIsIl9Db250ZXh0IiwiY3JlYXRlVXNlRWxlbWVudEhvb2siLCJDb250ZXh0IiwiX2Zhc3REZWVwRXF1YWwiLCJfZmFzdERlZXBFcXVhbDIiLCJTdG9yYWdlIiwiZWxlbWVudHMiLCJnZXQiLCJlZmZlY3RzIiwiY29uc3VtZXIiLCJjbGVhblVwIiwiY3JlYXRlRWZmZWN0IiwiZGVwcyIsInVwZGF0ZUVmZmVjdCIsImVmZmVjdCIsIm9sZERlcHMiLCJkZXBzRXF1YWwiLCJuZXdEZXBzIiwicmVzb2x2ZUVmZmVjdCIsImFyZUVxdWFsIiwiY3JlYXRlVXNlRWZmZWN0SG9vayIsInN0b3JhZ2UiLCJpbmRleCIsImNyZWF0ZVVzZVB1YlN1Ykhvb2siLCJzdWJzY3JpYmVycyIsInN1YnNjcmliZSIsInB1Ymxpc2giLCJwYXlsb2FkIiwic2NvcGVkRWxlbWVudCIsImVsIiwic3Vic2NyaWJlRnVuYyIsIl9sZW4iLCJwYXJhbXMiLCJfa2V5IiwicHVibGlzaEZ1bmMiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwiX2kiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zIiwiZXJyIiwiVHlwZUVycm9yIiwiY3JlYXRlVXNlUmVkdWNlckhvb2siLCJjcmVhdGVEaXNwYXRjaEVsZW1lbnQiLCJkaXNwYXRjaCIsImFjdGlvbiIsInByb3BzVG9BY3Rpb24iLCJ1c2VTdGF0ZSIsInJlZHVjZXIiLCJpbml0aWFsU3RhdGUiLCJzdGF0ZSIsInNldFN0YXRlIiwiY3JlYXRlVXNlU3RhdGVIb29rIiwic3RhdGVzIiwibmV3U3RhdGUiLCJpc1ZhbGlkSG9va0NvbnRleHQiLCJjcmVhdGVSdW50aW1lIiwiX1Byb2Nlc3NvciIsIl9Qcm9jZXNzb3IyIiwiX0FjdEVsZW1lbnQiLCJfQWN0RWxlbWVudDIiLCJfdXNlRWxlbWVudCIsIl91c2VFbGVtZW50MiIsIl91c2VSZWR1Y2VyIiwiX3VzZVJlZHVjZXIyIiwiX3VzZUNvbnRleHQiLCJfdXNlQ29udGV4dDIiLCJfQ29udGV4dDIiLCJBIiwiRnJhZ21lbnQiLCJ1c2VFbGVtZW50IiwidXNlUHViU3ViIiwidXNlUmVkdWNlciIsInVzZUVmZmVjdCIsInVzZUNvbnRleHQiLCJydW50aW1lIiwibW9kdWxlIiwiaXNBY3RNTEVsZW1lbnQiLCJzdHJpbmdpZnkiLCJDaXJjdWxhckpTT04iLCJzYW5pdGl6ZSIsInNvbWV0aGluZyIsInNob3dFcnJvckluQ29uc29sZSIsIkpTT04iLCJwYXJzZSIsIlNlcmlhbGl6ZUVycm9yIiwic3BlY2lhbENoYXIiLCJzYWZlU3BlY2lhbENoYXIiLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJlc2NhcGVkU2FmZVNwZWNpYWxDaGFyIiwic3BlY2lhbENoYXJSRyIsIlJlZ0V4cCIsInNhZmVTcGVjaWFsQ2hhclJHIiwic2FmZVN0YXJ0V2l0aFNwZWNpYWxDaGFyUkciLCJ2IiwiJFN0cmluZyIsIlN0cmluZyIsImdlbmVyYXRlUmVwbGFjZXIiLCJyZXBsYWNlciIsInJlc29sdmUiLCJpbnNwZWN0IiwicGF0aCIsImFsbCIsInNlZW4iLCJtYXBwIiwibGFzdCIsImx2bCIsImZuIiwicmVwbGFjZSIsInJldHJpZXZlRnJvbVBhdGgiLCJjdXJyZW50IiwiZ2VuZXJhdGVSZXZpdmVyIiwicmV2aXZlciIsImlzU3RyaW5nIiwiY2hhckF0IiwicmVnZW5lcmF0ZSIsInJlZ2VuZXJhdGVBcnJheSIsInJldHJpZXZlIiwicmVnZW5lcmF0ZU9iamVjdCIsInNwbGl0Iiwic3RyaW5naWZ5UmVjdXJzaW9uIiwic3BhY2UiLCJkb05vdFJlc29sdmUiLCJwYXJzZVJlY3Vyc2lvbiIsInRleHQiLCJkZXN0cm95Q2lyY3VsYXIiLCJ0byIsIm1lc3NhZ2UiLCJFTlRFUiIsIk9VVCIsIlJFTU9WRSIsInByaW50U25hcHNob3RUb0NvbnNvbGUiLCJzbmFwc2hvdCIsInN0ciIsImFkZEluZCIsInMiLCJsb29wIiwiaW5zcGVjdG9yIiwic25hcHNob3RzIiwiQ2hlY2tGb3JFZGl0RmllbGQiLCJ0b2RvcyIsImZpbmRJbmRleCIsImVkaXRpbmciLCIkIiwic2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsaXN0IiwiaGVhZGVyIiwiRVNDIiwiRmlsbENvbnRhaW5lciIsImlubmVySFRNTCIsIkNvbnRhaW5lciIsIm9uVXNlckFjdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidG9kb0luZGV4IiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJUT0dHTEUiLCJERUxFVEUiLCJFRElUIiwiRURJVF9UT0RPIiwibGFiZWwiLCJrZXlDb2RlIiwiTkVXX1RPRE8iLCJGb2N1c0ZpZWxkIiwiZm9jdXMiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsIlByb2dyZXNzQ2hlY2tlciIsImNvbXBsZXRlZCIsImZpbHRlciIsIml0ZW1zTGVmdCIsIkZvb3RlciIsIkZJTFRFUl9BTEwiLCJGSUxURVJfQUNUSVZFIiwiRklMVEVSX0NPTVBMRVRFRCIsIkNMRUFSX0NPTVBMRVRFRCIsIkZpbHRlck9wdGlvbnNUYWJzIiwic2V0QXR0cmlidXRlIiwiVG9EbyIsInVzZUxvY2FsU3RvcmFnZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXREYXRhIiwiUGVyc2lzdCIsInNldEl0ZW0iLCJSZW5kZXJlciIsInRvZG8iLCJsaUNsYXNzIiwidG9nZ2xlIiwiZGVsZXRlVG9kbyIsIm5ld1RvZG8iLCJlZGl0IiwiZWRpdFRvRG8iLCJjbGVhckNvbXBsZXRlZCIsIlN0b3JlIiwiQXBwIiwic2V0RmlsdGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLGtCQUFrQjtBQUNuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7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QUdpQjJCLHFEQUFRLENBQUNrSSxVQUFELENBSHpCO0FBQUE7QUFBQSxNQUdMSCxNQUhLO0FBQUEsTUFHRzJCLFNBSEg7O0FBS2JoSSx3REFBUyxDQUFDLFlBQU07QUFDZHJELGFBQVMsQ0FBQzZKLFVBQUQsRUFBYTtBQUFBLGFBQU13QixTQUFTLENBQUN4QixVQUFELENBQWY7QUFBQSxLQUFiLENBQVQ7QUFDQTdKLGFBQVMsQ0FBQzhKLGFBQUQsRUFBZ0I7QUFBQSxhQUFNdUIsU0FBUyxDQUFDdkIsYUFBRCxDQUFmO0FBQUEsS0FBaEIsQ0FBVDtBQUNBOUosYUFBUyxDQUFDK0osZ0JBQUQsRUFBbUI7QUFBQSxhQUFNc0IsU0FBUyxDQUFDdEIsZ0JBQUQsQ0FBZjtBQUFBLEtBQW5CLENBQVQ7QUFDRCxHQUpRLEVBSU4sRUFKTSxDQUFUO0FBTUEsU0FDRSwrQ0FBQyw2Q0FBRCxRQUNFLCtDQUFDLDhDQUFEO0FBQVcsZ0JBQVksRUFBRzlKO0FBQTFCLElBREYsRUFFRSwrQ0FBQywyQ0FBRDtBQUFRLGdCQUFZLEVBQUdBO0FBQXZCLElBRkYsRUFHRSwrQ0FBQyw4Q0FBRDtBQUFPLGdCQUFZLEVBQUdsSztBQUF0QixLQUNFLCtDQUFDLHNEQUFEO0FBQW1CLFVBQU0sRUFBRzJULE1BQU07QUFBbEMsSUFERixFQUVFLCtDQUFDLGlEQUFEO0FBQVUsVUFBTSxFQUFHQSxNQUFNO0FBQXpCLElBRkYsRUFHRSwrQ0FBQywwREFBRCxPQUhGLEVBSUUsK0NBQUMsb0RBQUQsT0FKRixFQUtFLCtDQUFDLGdEQUFELE9BTEYsQ0FIRixDQURGO0FBYUQ7O0FBQUE7QUFFRDNQLGdEQUFHLENBQUMsK0NBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gZ2V0RnVuY05hbWUoZnVuYykge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuICB2YXIgcmVzdWx0ID0gL15mdW5jdGlvblxccysoW1xcd1xcJF0rKVxccypcXCgvLmV4ZWMoZnVuYy50b1N0cmluZygpKTtcblxuICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0WzFdIDogJ3Vua25vd24nO1xufTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0cyBhIGZ1bmN0aW9uLiBcIicgKyBmdW5jICsgJ1wiIGdpdmVuIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIF9fdXNlZDogMCxcbiAgICBfX3J1bm5pbmc6IGZhbHNlLFxuICAgIGlkOiBudWxsLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICBuYW1lOiBnZXRGdW5jTmFtZShmdW5jKSxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShpZCkge1xuICAgICAgdmFyIHVzZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHRoaXMuX191c2VkID0gdXNlZDtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfSxcbiAgICBtZXJnZVByb3BzOiBmdW5jdGlvbiBtZXJnZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIH0sXG4gICAgdXNlZDogZnVuY3Rpb24gdXNlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fdXNlZDtcbiAgICB9LFxuICAgIGlzUnVubmluZzogZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19ydW5uaW5nO1xuICAgIH0sXG4gICAgZW50ZXI6IGZ1bmN0aW9uIGVudGVyKCkge1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSB0cnVlO1xuICAgIH0sXG4gICAgY29uc3VtZTogZnVuY3Rpb24gY29uc3VtZSgpIHtcbiAgICAgIHJldHVybiBmdW5jKHRoaXMucHJvcHMpO1xuICAgIH0sXG4gICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICB0aGlzLl9fdXNlZCArPSAxO1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVFbGVtZW50OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUNvbnRleHRGYWN0b3J5O1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xudmFyIENPTlRFWFRfS0VZID0gJ19fQ09OVEVYVF9LRVlfXyc7XG5cbnZhciBQVUJMSUNfQ09OVEVYVF9LRVkgPSBleHBvcnRzLlBVQkxJQ19DT05URVhUX0tFWSA9ICdfX1BVQkxJQ19DT05URVhUX0tFWV9fJztcblxudmFyIGlkcyA9IDA7XG5cbmZ1bmN0aW9uIGdldElkKCkge1xuICByZXR1cm4gJ2MnICsgKytpZHM7XG59O1xuZnVuY3Rpb24gcmVzb2x2ZUNvbnRleHQobm9kZSwgaWQpIHtcbiAgdmFyIHN0YWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBbXTtcblxuICBzdGFjay5wdXNoKG5vZGUuZWxlbWVudC5uYW1lKTtcbiAgaWYgKG5vZGVbQ09OVEVYVF9LRVldICYmIGlkIGluIG5vZGVbQ09OVEVYVF9LRVldKSB7XG4gICAgcmV0dXJuIG5vZGVbQ09OVEVYVF9LRVldW2lkXTtcbiAgfSBlbHNlIGlmIChub2RlLnBhcmVudCkge1xuICAgIHJldHVybiByZXNvbHZlQ29udGV4dChub2RlLnBhcmVudCwgaWQsIHN0YWNrKTtcbiAgfVxuICBjb25zb2xlLndhcm4oJ0EgY29udGV4dCBjb25zdW1lciBpcyB1c2VkIHdpdGggbm8gcHJvdmlkZXIuXFxuICBTdGFjazpcXG4nICsgc3RhY2subWFwKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuICcgICAgPCcgKyBuYW1lICsgJz4nO1xuICB9KS5qb2luKCdcXG4nKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHRGYWN0b3J5KHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlQ29udGV4dChpbml0aWFsVmFsdWUpIHtcbiAgICB2YXIgX3JlZjM7XG5cbiAgICB2YXIgaWQgPSBnZXRJZCgpO1xuXG4gICAgdmFyIFByb3ZpZGVyID0gZnVuY3Rpb24gUHJvdmlkZXIoX3JlZikge1xuICAgICAgdmFyIHZhbHVlID0gX3JlZi52YWx1ZSxcbiAgICAgICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW47XG5cbiAgICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgICAgaWYgKCFub2RlW0NPTlRFWFRfS0VZXSkge1xuICAgICAgICBub2RlW0NPTlRFWFRfS0VZXSA9IHt9O1xuICAgICAgfVxuICAgICAgbm9kZVtDT05URVhUX0tFWV1baWRdID0gdmFsdWU7XG5cbiAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICB9O1xuICAgIHZhciBDb25zdW1lciA9IGZ1bmN0aW9uIENvbnN1bWVyKF9yZWYyKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcmVmMi5jaGlsZHJlbjtcblxuICAgICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgICBjaGlsZHJlbihyZXNvbHZlQ29udGV4dChub2RlLCBpZCkgfHwgaW5pdGlhbFZhbHVlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF9yZWYzID0ge30sIF9kZWZpbmVQcm9wZXJ0eShfcmVmMywgUFVCTElDX0NPTlRFWFRfS0VZLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICAgIHJldHVybiByZXNvbHZlQ29udGV4dChub2RlLCBpZCkgfHwgaW5pdGlhbFZhbHVlO1xuICAgIH0pLCBfZGVmaW5lUHJvcGVydHkoX3JlZjMsICdQcm92aWRlcicsIFByb3ZpZGVyKSwgX2RlZmluZVByb3BlcnR5KF9yZWYzLCAnQ29uc3VtZXInLCBDb25zdW1lciksIF9yZWYzO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVQcm9jZXNzb3I7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQgPSByZXF1aXJlKCcuL3V0aWxzL2lzQWN0TUxFbGVtZW50Jyk7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RNTEVsZW1lbnQpO1xuXG52YXIgX1RyZWUgPSByZXF1aXJlKCcuL1RyZWUnKTtcblxudmFyIF9UcmVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RyZWUpO1xuXG52YXIgX3VzZVB1YlN1YiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHViU3ViJyk7XG5cbnZhciBfdXNlUHViU3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVB1YlN1Yik7XG5cbnZhciBfdXNlU3RhdGUgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVN0YXRlJyk7XG5cbnZhciBfdXNlU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlU3RhdGUpO1xuXG52YXIgX3VzZUVmZmVjdCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWZmZWN0Jyk7XG5cbnZhciBfdXNlRWZmZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVmZmVjdCk7XG5cbnZhciBfUXVldWUgPSByZXF1aXJlKCcuL1F1ZXVlJyk7XG5cbnZhciBfUXVldWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUXVldWUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgY29uc2lzdGVudC1yZXR1cm4gKi9cbnZhciBDSElMRFJFTiA9ICdfX0FDVE1MX0NISUxEUkVOX18nO1xuXG52YXIgQ09OU1VNRSA9ICdDT05TVU1FJztcbnZhciBQUk9DRVNTX1JFU1VMVCA9ICdQUk9DRVNTX1JFU1VMVCc7XG52YXIgUkVUVVJORURfRUxFTUVOVCA9ICdSRVRVUk5FRF9FTEVNRU5UJztcbnZhciBDSElMRCA9ICdDSElMRCc7XG5cbnZhciBpc0dlbmVyYXRvciA9IGZ1bmN0aW9uIGlzR2VuZXJhdG9yKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmpbJ25leHQnXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG52YXIgaXNQcm9taXNlID0gZnVuY3Rpb24gaXNQcm9taXNlKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmpbJ3RoZW4nXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoaWxkcmVuRnVuYyhub2RlLCBwcm9jZXNzTm9kZSkge1xuICB2YXIgZiA9IGZ1bmN0aW9uIGYoKSB7XG4gICAgdmFyIF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5lbGVtZW50LmNoaWxkcmVuO1xuXG5cbiAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHF1ZXVlSXRlbXNUb0FkZCA9IFtdO1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIHZhciBjaGlsZHJlblF1ZXVlID0gKDAsIF9RdWV1ZTIuZGVmYXVsdCkoJyAgJyArIG5vZGUuZWxlbWVudC5uYW1lICsgJzpjaGlsZHJlbicpO1xuXG4gICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XG4gICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShjaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICB2YXIgX2NoaWxkcmVuJGk7XG5cbiAgICAgICAgICAoX2NoaWxkcmVuJGkgPSBjaGlsZHJlbltpXSkubWVyZ2VQcm9wcy5hcHBseShfY2hpbGRyZW4kaSwgX2FyZ3VtZW50cyk7XG4gICAgICAgICAgcXVldWVJdGVtc1RvQWRkLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGNoaWxkcmVuW2ldKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNoaWxkcmVuW2ldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFyIGZ1bmNSZXN1bHQgPSBjaGlsZHJlbltpXS5hcHBseShjaGlsZHJlbiwgX2FyZ3VtZW50cyk7XG5cbiAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZnVuY1Jlc3VsdCkpIHtcbiAgICAgICAgICAgIHF1ZXVlSXRlbXNUb0FkZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGZ1bmNSZXN1bHQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goZnVuY1Jlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgX2xvb3AoaSk7XG4gICAgICB9XG4gICAgICBxdWV1ZUl0ZW1zVG9BZGQucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgY2hpbGRyZW5RdWV1ZS5wcmVwZW5kSXRlbShDSElMRCwgZnVuYywgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0cy5wdXNoKHIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY2hpbGRyZW5RdWV1ZS5wcm9jZXNzKCk7XG4gICAgICByZXR1cm4gY2hpbGRyZW5RdWV1ZS5vbkRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBmW0NISUxEUkVOXSA9IHRydWU7XG4gIHJldHVybiBmO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9jZXNzb3IoKSB7XG4gIHZhciB0cmVlID0gKDAsIF9UcmVlMi5kZWZhdWx0KSgpO1xuICB2YXIgY3VycmVudE5vZGUgPSBudWxsO1xuXG4gIHZhciBwcm9jZXNzTm9kZSA9IGZ1bmN0aW9uIHByb2Nlc3NOb2RlKG5vZGUpIHtcbiAgICBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gICAgbm9kZS5lbnRlcigpO1xuICAgIG5vZGUucmVydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZSk7XG4gICAgfTtcbiAgICBub2RlLmVsZW1lbnQubWVyZ2VQcm9wcyh7XG4gICAgICBjaGlsZHJlbjogY3JlYXRlQ2hpbGRyZW5GdW5jKG5vZGUsIHByb2Nlc3NOb2RlKVxuICAgIH0pO1xuXG4gICAgdmFyIHJlc3VsdHMgPSB7fTtcbiAgICB2YXIgcXVldWUgPSAoMCwgX1F1ZXVlMi5kZWZhdWx0KSgnICcgKyBub2RlLmVsZW1lbnQubmFtZSk7XG5cbiAgICAvLyBDT05TVU1FXG4gICAgcXVldWUuYWRkKENPTlNVTUUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBub2RlLmVsZW1lbnQuY29uc3VtZSgpO1xuICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHRzW0NPTlNVTUVdID0gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLy8gUFJPQ0VTU19SRVNVTFRcbiAgICBxdWV1ZS5hZGQoUFJPQ0VTU19SRVNVTFQsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb25zdW1wdGlvbiA9IHJlc3VsdHNbQ09OU1VNRV07XG5cbiAgICAgIC8vIEFjdE1MIGVsZW1lbnRcbiAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShjb25zdW1wdGlvbikpIHtcbiAgICAgICAgcXVldWUucHJlcGVuZEl0ZW0oUkVUVVJORURfRUxFTUVOVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjb25zdW1wdGlvbikpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdlbmVyYXRvclxuICAgICAgfSBlbHNlIGlmIChpc0dlbmVyYXRvcihjb25zdW1wdGlvbikpIHtcbiAgICAgICAgdmFyIGdlbmVyYXRvciA9IGNvbnN1bXB0aW9uO1xuXG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGdlbmVyYXRvckRvbmUpIHtcbiAgICAgICAgICAgIHZhciBnZW5SZXN1bHQgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIChmdW5jdGlvbiBpdGVyYXRlKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGdlblJlc3VsdCA9IGdlbmVyYXRvci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKCFnZW5SZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVzID0gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2UocmVzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdGUocmVzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVzID0gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2UoX3JlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgX3Jlcy50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRvckRvbmUocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdG9yRG9uZShfcmVzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZ2VuZXJhdG9yRG9uZShnZW5SZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGlsZHJlblxuICAgICAgfSBlbHNlIGlmIChjb25zdW1wdGlvbiAmJiBjb25zdW1wdGlvbltDSElMRFJFTl0pIHtcbiAgICAgICAgcXVldWUucHJlcGVuZEl0ZW0oUkVUVVJORURfRUxFTUVOVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjb25zdW1wdGlvbigpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoID09PSAxID8gcmVzdWx0WzBdIDogcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJ1bm5pbmcgdGhlIHF1ZXVlXG4gICAgcXVldWUucHJvY2VzcygpO1xuXG4gICAgLy8gR2V0dGluZyB0aGUgcmVzdWx0LiBJdCBpcyBlaXRoZXIgYSBwcm9taXNlIGlmIHRoZXJlIGlzXG4gICAgLy8gc29tZXRoaW5nIGFzeW5jaHJvbm91cyBvciBhIHZhbHVlXG4gICAgcmV0dXJuIHF1ZXVlLm9uRG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLm91dCgpO1xuICAgICAgcmV0dXJuIFJFVFVSTkVEX0VMRU1FTlQgaW4gcmVzdWx0cyA/IHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gOiByZXN1bHRzW0NPTlNVTUVdO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbm9kZTogZnVuY3Rpb24gbm9kZSgpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9LFxuICAgIHJ1bjogZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICAgIHZhciByb290Tm9kZSA9IHRyZWUucmVzb2x2ZVJvb3QoZWxlbWVudCk7XG5cbiAgICAgIHJldHVybiBwcm9jZXNzTm9kZShyb290Tm9kZSk7XG4gICAgfSxcbiAgICBvbk5vZGVFbnRlcjogZnVuY3Rpb24gb25Ob2RlRW50ZXIoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZUVudGVyQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlT3V0OiBmdW5jdGlvbiBvbk5vZGVPdXQoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZVJlbW92ZTogZnVuY3Rpb24gb25Ob2RlUmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLm9uTm9kZVJlbW92ZShjYWxsYmFjayk7XG4gICAgfSxcbiAgICBzeXN0ZW06IGZ1bmN0aW9uIHN5c3RlbSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyZWU6IHRyZWUsXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICAgICAgdHJlZS5yZXNldCgpO1xuICAgICAgICAgIF91c2VQdWJTdWIyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlU3RhdGUyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlRWZmZWN0Mi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVRdWV1ZTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbnZhciBMT0dTID0gZmFsc2U7XG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgcmV0dXJuIExPR1MgPyAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIGFyZ3VtZW50cykgOiBudWxsO1xufTtcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsndGhlbiddID09PSAnZnVuY3Rpb24nO1xufTtcbnZhciBjcmVhdGVJdGVtID0gZnVuY3Rpb24gY3JlYXRlSXRlbSh0eXBlLCBmdW5jKSB7XG4gIHZhciBvbkRvbmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZ1bmN0aW9uICgpIHt9O1xuICByZXR1cm4ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZnVuYzogZnVuYyxcbiAgICBvbkRvbmU6IG9uRG9uZVxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUXVldWUoY29udGV4dCkge1xuICB2YXIgaXRlbXMgPSBbXTtcbiAgdmFyIGFzeW5jID0gZmFsc2U7XG4gIHZhciBydW5uaW5nID0gZmFsc2U7XG4gIHZhciByZWxlYXNlID0gZnVuY3Rpb24gcmVsZWFzZSgpIHt9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGQodHlwZSwgZnVuYywgb25Eb25lKSB7XG4gICAgICBsb2coY29udGV4dCArICc6UTogWy4uLicgKyB0eXBlICsgJ10gKCcgKyAoaXRlbXMubGVuZ3RoICsgMSkgKyAnIHRvdGFsKScpO1xuICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSkpO1xuICAgIH0sXG4gICAgcHJlcGVuZEl0ZW06IGZ1bmN0aW9uIHByZXBlbmRJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSkge1xuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6IFsnICsgdHlwZSArICcuLi5dICgnICsgKGl0ZW1zLmxlbmd0aCArIDEpICsgJyB0b3RhbCknKTtcbiAgICAgIGl0ZW1zID0gW2NyZWF0ZUl0ZW0odHlwZSwgZnVuYywgb25Eb25lKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShpdGVtcykpO1xuICAgIH0sXG4gICAgcHJvY2VzczogZnVuY3Rpb24gcHJvY2VzcyhsYXN0UmVzdWx0KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbG9nKGNvbnRleHQgKyAnOlE6ZG9uZScpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlbSA9IGl0ZW1zLnNoaWZ0KCk7XG5cbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiAnICsgaXRlbS50eXBlICsgJygpICgnICsgaXRlbXMubGVuZ3RoICsgJyBsZWZ0KScpO1xuICAgICAgdmFyIHJlc3VsdCA9IGl0ZW0uZnVuYyhsYXN0UmVzdWx0KTtcblxuICAgICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgIGFzeW5jID0gdHJ1ZTtcbiAgICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24gKGFzeW5jUmVzdWx0KSB7XG4gICAgICAgICAgaXRlbS5vbkRvbmUoYXN5bmNSZXN1bHQpO1xuICAgICAgICAgIF90aGlzLnByb2Nlc3MoYXN5bmNSZXN1bHQpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZWxlYXNlKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLm9uRG9uZShyZXN1bHQpO1xuICAgICAgICB0aGlzLnByb2Nlc3MocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uRG9uZTogZnVuY3Rpb24gb25Eb25lKGdldFJlc3VsdCkge1xuICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZG9uZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVsZWFzZSA9IGZ1bmN0aW9uIHJlbGVhc2UoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9uZShnZXRSZXN1bHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0UmVzdWx0KCk7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiBydW5uaW5nO1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUcmVlO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBuby1yZXR1cm4tYXNzaWduLCBtYXgtbGVuICovXG52YXIgTE9HUyA9IGZhbHNlO1xudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIHJldHVybiBMT0dTID8gKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpIDogbnVsbDtcbn07XG5cbmZ1bmN0aW9uIFRyZWUoKSB7XG4gIHZhciBvbk5vZGVFbnRlciA9IFtdO1xuICB2YXIgb25Ob2RlT3V0ID0gW107XG4gIHZhciBfb25Ob2RlUmVtb3ZlID0gW107XG4gIHZhciByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICB2YXIgaWRzID0gMDtcblxuICBmdW5jdGlvbiBnZXRJZCgpIHtcbiAgICByZXR1cm4gJ2EnICsgKytpZHM7XG4gIH07XG4gIGZ1bmN0aW9uIHVzZVNhbWVOb2RlKG5vZGUsIG5ld0VsZW1lbnQpIHtcbiAgICBuZXdFbGVtZW50LmluaXRpYWxpemUobm9kZS5lbGVtZW50LmlkLCBub2RlLmVsZW1lbnQudXNlZCgpKTtcbiAgICBub2RlLmVsZW1lbnQgPSBuZXdFbGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIHRyZWVEaWZmKG9sZEVsZW1lbnQsIG5ld0VsZW1lbnQpIHtcbiAgICBpZiAob2xkRWxlbWVudCAmJiBvbGRFbGVtZW50Lm5hbWUgPT09IG5ld0VsZW1lbnQubmFtZSkge1xuICAgICAgaWYgKG9sZEVsZW1lbnQucHJvcHMgJiYgbmV3RWxlbWVudC5wcm9wcykge1xuICAgICAgICByZXR1cm4gb2xkRWxlbWVudC5wcm9wcy5rZXkgPT09IG5ld0VsZW1lbnQucHJvcHMua2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQsIHBhcmVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmluaXRpYWxpemUoZ2V0SWQoKSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICBjdXJzb3I6IDAsXG4gICAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgbG9nKCctPiAnICsgdGhpcy5lbGVtZW50Lm5hbWUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuZW50ZXIoKTtcbiAgICAgICAgb25Ob2RlRW50ZXIuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIGxvZygnPC0gJyArIHRoaXMuZWxlbWVudC5uYW1lKTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm91dCgpO1xuICAgICAgICAvLyBJZiB0aGVyZSdyZSBtb3JlIG5vZGVzIGluIHRoZSB0cmVlIHRoYW4gd2hhdCB3YXMgcHJvY2Vzc2VkXG4gICAgICAgIGlmICh0aGlzLmN1cnNvciA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gdGhpcy5jdXJzb3IpLmZvckVhY2goZnVuY3Rpb24gKHJlbW92ZWROb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjKHJlbW92ZWROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Vyc29yID0gMDtcbiAgICAgICAgb25Ob2RlT3V0LmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYyhfdGhpczIpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBhZGRDaGlsZE5vZGU6IGZ1bmN0aW9uIGFkZENoaWxkTm9kZShuZXdFbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXTtcblxuICAgICAgICAvLyB1c2luZyB0aGUgc2FtZSBub2RlXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgdHJlZURpZmYoY2hpbGROb2RlLmVsZW1lbnQsIG5ld0VsZW1lbnQpKSB7XG4gICAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgICByZXR1cm4gdXNlU2FtZU5vZGUoY2hpbGROb2RlLCBuZXdFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0aW5nIGEgbmV3IG5vZGVcbiAgICAgICAgdmFyIG5ld0NoaWxkTm9kZSA9IGNyZWF0ZU5ld05vZGUobmV3RWxlbWVudCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdKSB7XG4gICAgICAgICAgX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICByZXR1cm4gYyhfdGhpczMuY2hpbGRyZW5bX3RoaXMzLmN1cnNvcl0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdID0gbmV3Q2hpbGROb2RlO1xuICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGROb2RlO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmVSb290OiBmdW5jdGlvbiByZXNvbHZlUm9vdChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gcm9vdCA9IHRyZWVEaWZmKHJvb3QuZWxlbWVudCwgZWxlbWVudCkgPyB1c2VTYW1lTm9kZShyb290LCBlbGVtZW50KSA6IGNyZWF0ZU5ld05vZGUoZWxlbWVudCk7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICAgICAgaWRzID0gMDtcbiAgICB9LFxuICAgIGdldE51bU9mRWxlbWVudHM6IGZ1bmN0aW9uIGdldE51bU9mRWxlbWVudHMoKSB7XG4gICAgICByZXR1cm4gaWRzO1xuICAgIH0sXG4gICAgZGlhZ25vc2U6IGZ1bmN0aW9uIGRpYWdub3NlKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxvb3BPdmVyKG5vZGUpIHtcbiAgICAgICAgdmFyIGluZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICAgICAgICB2YXIgX3JlZiA9IG5vZGUuZWxlbWVudC5wcm9wcyA/IG5vZGUuZWxlbWVudC5wcm9wcyA6IHt9LFxuICAgICAgICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2NoaWxkcmVuJ10pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmQ6IGluZCxcbiAgICAgICAgICBuYW1lOiBub2RlLmVsZW1lbnQubmFtZSxcbiAgICAgICAgICBwcm9wczogX2V4dGVuZHMoe1xuICAgICAgICAgICAgY2hpbGRyZW46ICc8ZnVuY3Rpb24gY2hpbGRyZW4+J1xuICAgICAgICAgIH0sIHJlc3QpLFxuICAgICAgICAgIHVzZWQ6IG5vZGUuZWxlbWVudC51c2VkKCksXG4gICAgICAgICAgaWQ6IG5vZGUuZWxlbWVudC5pZCxcbiAgICAgICAgICBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9vcE92ZXIoY2hpbGQsIGluZCArIDEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICB9KHJvb3QpO1xuICAgIH0sXG4gICAgYWRkTm9kZUVudGVyQ2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVFbnRlckNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVFbnRlci5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIGFkZE5vZGVPdXRDYWxsYmFjazogZnVuY3Rpb24gYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVPdXQucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgX29uTm9kZVJlbW92ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG52YXIgX0NvbnRleHQgPSByZXF1aXJlKCcuLi9Db250ZXh0Jyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjcmVhdGVVc2VFbGVtZW50SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRIb29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKENvbnRleHQpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHJldHVybiBDb250ZXh0W19Db250ZXh0LlBVQkxJQ19DT05URVhUX0tFWV0oKTtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVsZW1lbnRIb29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9mYXN0RGVlcEVxdWFsID0gcmVxdWlyZSgnZmFzdC1kZWVwLWVxdWFsJyk7XG5cbnZhciBfZmFzdERlZXBFcXVhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mYXN0RGVlcEVxdWFsKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG52YXIgU3RvcmFnZSA9IHtcbiAgZWxlbWVudHM6IHt9LFxuICBnZXQ6IGZ1bmN0aW9uIGdldChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0pIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSA9IHsgZWZmZWN0czogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBjcmVhdGVFZmZlY3QgPSBmdW5jdGlvbiBjcmVhdGVFZmZlY3QoY2FsbGJhY2ssIGRlcHMpIHtcbiAgcmV0dXJuIHtcbiAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgZGVwczogZGVwc1xuICB9O1xufTtcbnZhciB1cGRhdGVFZmZlY3QgPSBmdW5jdGlvbiB1cGRhdGVFZmZlY3QoZWZmZWN0LCBjYWxsYmFjaywgZGVwcykge1xuICBlZmZlY3QuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgZWZmZWN0Lm9sZERlcHMgPSBlZmZlY3QuZGVwcztcbiAgZWZmZWN0LmRlcHMgPSBkZXBzO1xuICByZXR1cm4gZWZmZWN0O1xufTtcblxuZnVuY3Rpb24gZGVwc0VxdWFsKG9sZERlcHMsIG5ld0RlcHMpIHtcbiAgaWYgKCFvbGREZXBzKSByZXR1cm4gZmFsc2U7XG4gIGlmIChvbGREZXBzLmxlbmd0aCAhPT0gbmV3RGVwcy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICgwLCBfZmFzdERlZXBFcXVhbDIuZGVmYXVsdCkob2xkRGVwcywgbmV3RGVwcyk7XG59XG5mdW5jdGlvbiByZXNvbHZlRWZmZWN0KG5vZGUsIGVmZmVjdCkge1xuICB2YXIgZGVwcyA9IGVmZmVjdC5kZXBzLFxuICAgICAgb2xkRGVwcyA9IGVmZmVjdC5vbGREZXBzLFxuICAgICAgY2FsbGJhY2sgPSBlZmZlY3QuY2FsbGJhY2s7XG5cblxuICBpZiAodHlwZW9mIGRlcHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICB9IGVsc2UgaWYgKGRlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKG5vZGUuZWxlbWVudC51c2VkKCkgPT09IDEpIHtcbiAgICAgIGVmZmVjdC5jbGVhblVwID0gY2FsbGJhY2soKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGFyZUVxdWFsID0gZGVwc0VxdWFsKG9sZERlcHMsIGRlcHMpO1xuXG4gICAgaWYgKCFhcmVFcXVhbCkge1xuICAgICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgY3JlYXRlVXNlRWZmZWN0SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVmZmVjdEhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICBzdG9yYWdlLmVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmZWN0KSB7XG4gICAgICBpZiAoZWZmZWN0LmNsZWFuVXApIGVmZmVjdC5jbGVhblVwKCk7XG4gICAgfSk7XG4gICAgU3RvcmFnZS5jbGVhblVwKG5vZGUuZWxlbWVudC5pZCk7XG4gIH0pO1xuICBwcm9jZXNzb3Iub25Ob2RlT3V0KGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgaWYgKHN0b3JhZ2UuZWZmZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBzdG9yYWdlLmVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmZWN0KSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlRWZmZWN0KG5vZGUsIGVmZmVjdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBkZXBzKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLmVmZmVjdHMucHVzaChjcmVhdGVFZmZlY3QoY2FsbGJhY2ssIGRlcHMpKTtcblxuICAgICAgLy8gb3RoZXIgcnVuc1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuXG4gICAgICBzdG9yYWdlLmNvbnN1bWVyID0gaW5kZXggPCBzdG9yYWdlLmVmZmVjdHMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICAgIHVwZGF0ZUVmZmVjdChzdG9yYWdlLmVmZmVjdHNbaW5kZXhdLCBjYWxsYmFjaywgZGVwcyk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlRWZmZWN0SG9vaztcblxuXG5jcmVhdGVVc2VFZmZlY3RIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBTdG9yYWdlLmVsZW1lbnRzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlRWxlbWVudEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50SG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHJldHVybiBwcm9jZXNzb3Iubm9kZSgpLmVsZW1lbnQ7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFbGVtZW50SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VQdWJTdWJIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBzdWJzY3JpYmVycyA9IHt9O1xuXG52YXIgc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKGVsZW1lbnQsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHN1YnNjcmliZXJzW3R5cGVdID0ge307XG4gIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdID0gY2FsbGJhY2s7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdO1xuICB9O1xufTtcbnZhciBwdWJsaXNoID0gZnVuY3Rpb24gcHVibGlzaCh0eXBlLCBwYXlsb2FkKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHJldHVybjtcbiAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnNbdHlwZV0pLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgc3Vic2NyaWJlcnNbdHlwZV1baWRdKHBheWxvYWQpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVB1YlN1Ykhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgaWYgKHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF0pIHtcbiAgICAgICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlZEVsZW1lbnQpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWwgPSBzY29wZWRFbGVtZW50IHx8IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgc3Vic2NyaWJlRnVuYyA9IGZ1bmN0aW9uIHN1YnNjcmliZUZ1bmMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHBhcmFtc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1YnNjcmliZS5hcHBseSh1bmRlZmluZWQsIFtlbF0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG4gICAgdmFyIHB1Ymxpc2hGdW5jID0gZnVuY3Rpb24gcHVibGlzaEZ1bmMoKSB7XG4gICAgICByZXR1cm4gcHVibGlzaC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWJzY3JpYmU6IHN1YnNjcmliZUZ1bmMsXG4gICAgICBwdWJsaXNoOiBwdWJsaXNoRnVuYyxcbiAgICAgIHN1YnNjcmliZXJzOiBzdWJzY3JpYmVyc1xuICAgIH07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVB1YlN1Ykhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHN1YnNjcmliZXJzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VSZWR1Y2VySG9vaztcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGFjdGlvbiA9IF9yZWYuYWN0aW9uLFxuICAgICAgICBwcm9wc1RvQWN0aW9uID0gX3JlZi5wcm9wc1RvQWN0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnYWN0aW9uJywgJ3Byb3BzVG9BY3Rpb24nXSk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICBkaXNwYXRjaChhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAocHJvcHNUb0FjdGlvbikge1xuICAgICAgZGlzcGF0Y2gocHJvcHNUb0FjdGlvbihyZXN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignPERpc3BhdGNoPiBleHBlY3RzIFwiYWN0aW9uXCIgb3IgXCJwcm9wc1RvQWN0aW9uXCIgcHJvcC4nKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVJlZHVjZXJIb29rKHVzZVN0YXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgaW5pdGlhbFN0YXRlKSB7XG4gICAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKGluaXRpYWxTdGF0ZSksXG4gICAgICAgIF91c2VTdGF0ZTIgPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGUsIDIpLFxuICAgICAgICBzdGF0ZSA9IF91c2VTdGF0ZTJbMF0sXG4gICAgICAgIHNldFN0YXRlID0gX3VzZVN0YXRlMlsxXTtcblxuICAgIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHNldFN0YXRlKHJlZHVjZXIoc3RhdGUoKSwgYWN0aW9uKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoLCBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpLCAvLyA8RGlzcGF0Y2g+XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlKCk7XG4gICAgfSAvLyA8R2V0U3RhdGU+XG4gICAgXTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VTdGF0ZUhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IHN0YXRlczogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVzZVN0YXRlSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoaW5pdGlhbFN0YXRlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gICAgaWYgKGZhbHNlKSBjb25zb2xlLmxvZygnRk9PQkFSJyk7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlcy5wdXNoKGluaXRpYWxTdGF0ZSk7XG4gICAgICBpbmRleCA9IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDE7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICB9XG5cbiAgICByZXR1cm4gW2Z1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlLnN0YXRlc1tpbmRleF07XG4gICAgfSwgZnVuY3Rpb24gKG5ld1N0YXRlKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlc1tpbmRleF0gPSBuZXdTdGF0ZTtcbiAgICAgIGlmICghZWxlbWVudC5pc1J1bm5pbmcoKSkge1xuICAgICAgICBub2RlLnJlcnVuKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfV07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVN0YXRlSG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1ZhbGlkSG9va0NvbnRleHQ7XG5mdW5jdGlvbiBpc1ZhbGlkSG9va0NvbnRleHQocHJvY2Vzc29yKSB7XG4gIGlmICghcHJvY2Vzc29yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgdGVycmlibHkgd3JvbmcgaGFwcGVuZWQuIFRoZSBob29rIGZhY3RvcnkgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGhvdXQgYSBwcm9jZXNzb3IuJyk7XG4gIH1cbiAgaWYgKCFwcm9jZXNzb3Iubm9kZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdIb29rcyBtdXN0IGJlIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiBhbiBBY3RNTCBlbGVtZW50LicpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlUnVudGltZSA9IGNyZWF0ZVJ1bnRpbWU7XG5cbnZhciBfUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9Qcm9jZXNzb3InKTtcblxudmFyIF9Qcm9jZXNzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJvY2Vzc29yKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfQWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vQWN0RWxlbWVudCcpO1xuXG52YXIgX0FjdEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0RWxlbWVudCk7XG5cbnZhciBfdXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWxlbWVudCcpO1xuXG52YXIgX3VzZUVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWxlbWVudCk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlUmVkdWNlciA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUmVkdWNlcicpO1xuXG52YXIgX3VzZVJlZHVjZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUmVkdWNlcik7XG5cbnZhciBfdXNlRWZmZWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFZmZlY3QnKTtcblxudmFyIF91c2VFZmZlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWZmZWN0KTtcblxudmFyIF91c2VDb250ZXh0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VDb250ZXh0Jyk7XG5cbnZhciBfdXNlQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VDb250ZXh0KTtcblxudmFyIF9Db250ZXh0ID0gcmVxdWlyZSgnLi9Db250ZXh0Jyk7XG5cbnZhciBfQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlUnVudGltZSgpIHtcbiAgdmFyIHByb2Nlc3NvciA9ICgwLCBfUHJvY2Vzc29yMi5kZWZhdWx0KSgpO1xuXG4gIGZ1bmN0aW9uIEEoZnVuYywgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBjaGlsZHJlbltfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfQWN0RWxlbWVudDIuZGVmYXVsdCkoZnVuYywgcHJvcHMsIGNoaWxkcmVuKTtcbiAgfVxuICBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RlZC4gSW5zdGVhZCAnICsgZWxlbWVudC50b1N0cmluZygpICsgJyBwYXNzZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzb3IucnVuKGVsZW1lbnQpO1xuICB9XG4gIHZhciBGcmFnbWVudCA9IGZ1bmN0aW9uIEZyYWdtZW50KF9yZWYpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfTtcbiAgdmFyIHVzZUVsZW1lbnQgPSAoMCwgX3VzZUVsZW1lbnQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VTdGF0ZSA9ICgwLCBfdXNlU3RhdGUyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VQdWJTdWIgPSAoMCwgX3VzZVB1YlN1YjIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVJlZHVjZXIgPSAoMCwgX3VzZVJlZHVjZXIyLmRlZmF1bHQpKHVzZVN0YXRlKTtcbiAgdmFyIHVzZUVmZmVjdCA9ICgwLCBfdXNlRWZmZWN0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlQ29udGV4dCA9ICgwLCBfdXNlQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIGNyZWF0ZUNvbnRleHQgPSAoMCwgX0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgcmV0dXJuIHtcbiAgICBBOiBBLFxuICAgIHJ1bjogcnVuLFxuICAgIEZyYWdtZW50OiBGcmFnbWVudCxcbiAgICBwcm9jZXNzb3I6IHByb2Nlc3NvcixcbiAgICB1c2VFbGVtZW50OiB1c2VFbGVtZW50LFxuICAgIHVzZVB1YlN1YjogdXNlUHViU3ViLFxuICAgIHVzZVN0YXRlOiB1c2VTdGF0ZSxcbiAgICB1c2VSZWR1Y2VyOiB1c2VSZWR1Y2VyLFxuICAgIHVzZUVmZmVjdDogdXNlRWZmZWN0LFxuICAgIHVzZUNvbnRleHQ6IHVzZUNvbnRleHQsXG4gICAgY3JlYXRlQ29udGV4dDogY3JlYXRlQ29udGV4dFxuICB9O1xufVxuXG52YXIgcnVudGltZSA9IGNyZWF0ZVJ1bnRpbWUoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xubW9kdWxlLmV4cG9ydHMuY3JlYXRlUnVudGltZSA9IGNyZWF0ZVJ1bnRpbWUoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQWN0TUxFbGVtZW50O1xuZnVuY3Rpb24gaXNBY3RNTEVsZW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50Ll9fYWN0bWwgPT09IHRydWU7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGtleUxpc3QgPSBPYmplY3Qua2V5cztcbnZhciBoYXNQcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09ICdvYmplY3QnICYmIHR5cGVvZiBiID09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFyckEgPSBpc0FycmF5KGEpXG4gICAgICAsIGFyckIgPSBpc0FycmF5KGIpXG4gICAgICAsIGlcbiAgICAgICwgbGVuZ3RoXG4gICAgICAsIGtleTtcblxuICAgIGlmIChhcnJBICYmIGFyckIpIHtcbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgICBpZiAoIWVxdWFsKGFbaV0sIGJbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYXJyQSAhPSBhcnJCKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgZGF0ZUEgPSBhIGluc3RhbmNlb2YgRGF0ZVxuICAgICAgLCBkYXRlQiA9IGIgaW5zdGFuY2VvZiBEYXRlO1xuICAgIGlmIChkYXRlQSAhPSBkYXRlQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChkYXRlQSAmJiBkYXRlQikgcmV0dXJuIGEuZ2V0VGltZSgpID09IGIuZ2V0VGltZSgpO1xuXG4gICAgdmFyIHJlZ2V4cEEgPSBhIGluc3RhbmNlb2YgUmVnRXhwXG4gICAgICAsIHJlZ2V4cEIgPSBiIGluc3RhbmNlb2YgUmVnRXhwO1xuICAgIGlmIChyZWdleHBBICE9IHJlZ2V4cEIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAocmVnZXhwQSAmJiByZWdleHBCKSByZXR1cm4gYS50b1N0cmluZygpID09IGIudG9TdHJpbmcoKTtcblxuICAgIHZhciBrZXlzID0ga2V5TGlzdChhKTtcbiAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGggIT09IGtleUxpc3QoYikubGVuZ3RoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgaWYgKCFoYXNQcm9wLmNhbGwoYiwga2V5c1tpXSkpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmICghZXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gYSE9PWEgJiYgYiE9PWI7XG59O1xuIiwiaW1wb3J0IENpcmN1bGFySlNPTiBmcm9tICcuL3ZlbmRvci9DaXJjdWxhckpTT04nO1xuaW1wb3J0IFNlcmlhbGl6ZUVycm9yIGZyb20gJy4vdmVuZG9yL1NlcmlhbGl6ZUVycm9yJztcblxuY29uc3QgeyBzdHJpbmdpZnkgfSA9IENpcmN1bGFySlNPTjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2FuaXRpemUoc29tZXRoaW5nLCBzaG93RXJyb3JJbkNvbnNvbGUgPSBmYWxzZSkge1xuICB2YXIgcmVzdWx0O1xuXG4gIHRyeSB7XG4gICAgcmVzdWx0ID0gSlNPTi5wYXJzZShzdHJpbmdpZnkoc29tZXRoaW5nLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdmFsdWUubmFtZSA9PT0gJycgPyAnPGFub255bW91cz4nIDogYGZ1bmN0aW9uICR7IHZhbHVlLm5hbWUgfSgpYDtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHJldHVybiBTZXJpYWxpemVFcnJvcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSwgdW5kZWZpbmVkLCB0cnVlKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKHNob3dFcnJvckluQ29uc29sZSkge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgICByZXN1bHQgPSBudWxsO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59IiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIVxuQ29weXJpZ2h0IChDKSAyMDEzLTIwMTcgYnkgQW5kcmVhIEdpYW1tYXJjaGkgLSBAV2ViUmVmbGVjdGlvblxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG5cbiovXG52YXJcbi8vIHNob3VsZCBiZSBhIG5vdCBzbyBjb21tb24gY2hhclxuLy8gcG9zc2libHkgb25lIEpTT04gZG9lcyBub3QgZW5jb2RlXG4vLyBwb3NzaWJseSBvbmUgZW5jb2RlVVJJQ29tcG9uZW50IGRvZXMgbm90IGVuY29kZVxuLy8gcmlnaHQgbm93IHRoaXMgY2hhciBpcyAnficgYnV0IHRoaXMgbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmVcbnNwZWNpYWxDaGFyID0gJ34nLFxuc2FmZVNwZWNpYWxDaGFyID0gJ1xcXFx4JyArIChcbiAgJzAnICsgc3BlY2lhbENoYXIuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNilcbikuc2xpY2UoLTIpLFxuZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciA9ICdcXFxcJyArIHNhZmVTcGVjaWFsQ2hhcixcbnNwZWNpYWxDaGFyUkcgPSBuZXcgUmVnRXhwKHNhZmVTcGVjaWFsQ2hhciwgJ2cnKSxcbnNhZmVTcGVjaWFsQ2hhclJHID0gbmV3IFJlZ0V4cChlc2NhcGVkU2FmZVNwZWNpYWxDaGFyLCAnZycpLFxuXG5zYWZlU3RhcnRXaXRoU3BlY2lhbENoYXJSRyA9IG5ldyBSZWdFeHAoJyg/Ol58KFteXFxcXFxcXFxdKSknICsgZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciksXG5cbmluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKHYpe1xuICBmb3IodmFyIGk9dGhpcy5sZW5ndGg7aS0tJiZ0aGlzW2ldIT09djspO1xuICByZXR1cm4gaTtcbn0sXG4kU3RyaW5nID0gU3RyaW5nICAvLyB0aGVyZSdzIG5vIHdheSB0byBkcm9wIHdhcm5pbmdzIGluIEpTSGludFxuICAgICAgICAgICAgICAgICAgLy8gYWJvdXQgbmV3IFN0cmluZyAuLi4gd2VsbCwgSSBuZWVkIHRoYXQgaGVyZSFcbiAgICAgICAgICAgICAgICAgIC8vIGZha2VkLCBhbmQgaGFwcHkgbGludGVyIVxuO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVJlcGxhY2VyKHZhbHVlLCByZXBsYWNlciwgcmVzb2x2ZSkge1xudmFyXG4gIGluc3BlY3QgPSAhIXJlcGxhY2VyLFxuICBwYXRoID0gW10sXG4gIGFsbCAgPSBbdmFsdWVdLFxuICBzZWVuID0gW3ZhbHVlXSxcbiAgbWFwcCA9IFtyZXNvbHZlID8gc3BlY2lhbENoYXIgOiAnPGNpcmN1bGFyPiddLFxuICBsYXN0ID0gdmFsdWUsXG4gIGx2bCAgPSAxLFxuICBpLCBmblxuO1xuaWYgKGluc3BlY3QpIHtcbiAgZm4gPSB0eXBlb2YgcmVwbGFjZXIgPT09ICdvYmplY3QnID9cbiAgICBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGtleSAhPT0gJycgJiYgcmVwbGFjZXIuaW5kZXhPZihrZXkpIDwgMCA/IHZvaWQgMCA6IHZhbHVlO1xuICAgIH0gOlxuICAgIHJlcGxhY2VyO1xufVxucmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgLy8gdGhlIHJlcGxhY2VyIGhhcyByaWdodHMgdG8gZGVjaWRlXG4gIC8vIGlmIGEgbmV3IG9iamVjdCBzaG91bGQgYmUgcmV0dXJuZWRcbiAgLy8gb3IgaWYgdGhlcmUncyBzb21lIGtleSB0byBkcm9wXG4gIC8vIGxldCdzIGNhbGwgaXQgaGVyZSByYXRoZXIgdGhhbiBcInRvbyBsYXRlXCJcbiAgaWYgKGluc3BlY3QpIHZhbHVlID0gZm4uY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcblxuICAvLyBkaWQgeW91IGtub3cgPyBTYWZhcmkgcGFzc2VzIGtleXMgYXMgaW50ZWdlcnMgZm9yIGFycmF5c1xuICAvLyB3aGljaCBtZWFucyBpZiAoa2V5KSB3aGVuIGtleSA9PT0gMCB3b24ndCBwYXNzIHRoZSBjaGVja1xuICBpZiAoa2V5ICE9PSAnJykge1xuICAgIGlmIChsYXN0ICE9PSB0aGlzKSB7XG4gICAgICBpID0gbHZsIC0gaW5kZXhPZi5jYWxsKGFsbCwgdGhpcykgLSAxO1xuICAgICAgbHZsIC09IGk7XG4gICAgICBhbGwuc3BsaWNlKGx2bCwgYWxsLmxlbmd0aCk7XG4gICAgICBwYXRoLnNwbGljZShsdmwgLSAxLCBwYXRoLmxlbmd0aCk7XG4gICAgICBsYXN0ID0gdGhpcztcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2cobHZsLCBrZXksIHBhdGgpO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IHJlZmVycmluZyB0byBwYXJlbnQgb2JqZWN0LCBhZGQgdG8gdGhlXG4gICAgICAvLyBvYmplY3QgcGF0aCBzdGFjay4gT3RoZXJ3aXNlIGl0IGlzIGFscmVhZHkgdGhlcmUuXG4gICAgICBpZiAoaW5kZXhPZi5jYWxsKGFsbCwgdmFsdWUpIDwgMCkge1xuICAgICAgICBhbGwucHVzaChsYXN0ID0gdmFsdWUpO1xuICAgICAgfVxuICAgICAgbHZsID0gYWxsLmxlbmd0aDtcbiAgICAgIGkgPSBpbmRleE9mLmNhbGwoc2VlbiwgdmFsdWUpO1xuICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgIGkgPSBzZWVuLnB1c2godmFsdWUpIC0gMTtcbiAgICAgICAgaWYgKHJlc29sdmUpIHtcbiAgICAgICAgICAvLyBrZXkgY2Fubm90IGNvbnRhaW4gc3BlY2lhbENoYXIgYnV0IGNvdWxkIGJlIG5vdCBhIHN0cmluZ1xuICAgICAgICAgIHBhdGgucHVzaCgoJycgKyBrZXkpLnJlcGxhY2Uoc3BlY2lhbENoYXJSRywgc2FmZVNwZWNpYWxDaGFyKSk7XG4gICAgICAgICAgbWFwcFtpXSA9IHNwZWNpYWxDaGFyICsgcGF0aC5qb2luKHNwZWNpYWxDaGFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXBwW2ldID0gbWFwcFswXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBtYXBwW2ldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiByZXNvbHZlKSB7XG4gICAgICAgIC8vIGVuc3VyZSBubyBzcGVjaWFsIGNoYXIgaW52b2x2ZWQgb24gZGVzZXJpYWxpemF0aW9uXG4gICAgICAgIC8vIGluIHRoaXMgY2FzZSBvbmx5IGZpcnN0IGNoYXIgaXMgaW1wb3J0YW50XG4gICAgICAgIC8vIG5vIG5lZWQgdG8gcmVwbGFjZSBhbGwgdmFsdWUgKGJldHRlciBwZXJmb3JtYW5jZSlcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSAucmVwbGFjZShzYWZlU3BlY2lhbENoYXIsIGVzY2FwZWRTYWZlU3BlY2lhbENoYXIpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2Uoc3BlY2lhbENoYXIsIHNhZmVTcGVjaWFsQ2hhcik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG59XG5cbmZ1bmN0aW9uIHJldHJpZXZlRnJvbVBhdGgoY3VycmVudCwga2V5cykge1xuZm9yKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGN1cnJlbnQgPSBjdXJyZW50W1xuICAvLyBrZXlzIHNob3VsZCBiZSBub3JtYWxpemVkIGJhY2sgaGVyZVxuICBrZXlzW2krK10ucmVwbGFjZShzYWZlU3BlY2lhbENoYXJSRywgc3BlY2lhbENoYXIpXG5dKTtcbnJldHVybiBjdXJyZW50O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJldml2ZXIocmV2aXZlcikge1xucmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgaWYgKGlzU3RyaW5nICYmIHZhbHVlLmNoYXJBdCgwKSA9PT0gc3BlY2lhbENoYXIpIHtcbiAgICByZXR1cm4gbmV3ICRTdHJpbmcodmFsdWUuc2xpY2UoMSkpO1xuICB9XG4gIGlmIChrZXkgPT09ICcnKSB2YWx1ZSA9IHJlZ2VuZXJhdGUodmFsdWUsIHZhbHVlLCB7fSk7XG4gIC8vIGFnYWluLCBvbmx5IG9uZSBuZWVkZWQsIGRvIG5vdCB1c2UgdGhlIFJlZ0V4cCBmb3IgdGhpcyByZXBsYWNlbWVudFxuICAvLyBvbmx5IGtleXMgbmVlZCB0aGUgUmVnRXhwXG4gIGlmIChpc1N0cmluZykgdmFsdWUgPSB2YWx1ZSAucmVwbGFjZShzYWZlU3RhcnRXaXRoU3BlY2lhbENoYXJSRywgJyQxJyArIHNwZWNpYWxDaGFyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciwgc2FmZVNwZWNpYWxDaGFyKTtcbiAgcmV0dXJuIHJldml2ZXIgPyByZXZpdmVyLmNhbGwodGhpcywga2V5LCB2YWx1ZSkgOiB2YWx1ZTtcbn07XG59XG5cbmZ1bmN0aW9uIHJlZ2VuZXJhdGVBcnJheShyb290LCBjdXJyZW50LCByZXRyaWV2ZSkge1xuZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgY3VycmVudFtpXSA9IHJlZ2VuZXJhdGUocm9vdCwgY3VycmVudFtpXSwgcmV0cmlldmUpO1xufVxucmV0dXJuIGN1cnJlbnQ7XG59XG5cbmZ1bmN0aW9uIHJlZ2VuZXJhdGVPYmplY3Qocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIHtcbmZvciAodmFyIGtleSBpbiBjdXJyZW50KSB7XG4gIGlmIChjdXJyZW50Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBjdXJyZW50W2tleV0gPSByZWdlbmVyYXRlKHJvb3QsIGN1cnJlbnRba2V5XSwgcmV0cmlldmUpO1xuICB9XG59XG5yZXR1cm4gY3VycmVudDtcbn1cblxuZnVuY3Rpb24gcmVnZW5lcmF0ZShyb290LCBjdXJyZW50LCByZXRyaWV2ZSkge1xucmV0dXJuIGN1cnJlbnQgaW5zdGFuY2VvZiBBcnJheSA/XG4gIC8vIGZhc3QgQXJyYXkgcmVjb25zdHJ1Y3Rpb25cbiAgcmVnZW5lcmF0ZUFycmF5KHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSA6XG4gIChcbiAgICBjdXJyZW50IGluc3RhbmNlb2YgJFN0cmluZyA/XG4gICAgICAoXG4gICAgICAgIC8vIHJvb3QgaXMgYW4gZW1wdHkgc3RyaW5nXG4gICAgICAgIGN1cnJlbnQubGVuZ3RoID9cbiAgICAgICAgICAoXG4gICAgICAgICAgICByZXRyaWV2ZS5oYXNPd25Qcm9wZXJ0eShjdXJyZW50KSA/XG4gICAgICAgICAgICAgIHJldHJpZXZlW2N1cnJlbnRdIDpcbiAgICAgICAgICAgICAgcmV0cmlldmVbY3VycmVudF0gPSByZXRyaWV2ZUZyb21QYXRoKFxuICAgICAgICAgICAgICAgIHJvb3QsIGN1cnJlbnQuc3BsaXQoc3BlY2lhbENoYXIpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICApIDpcbiAgICAgICAgICByb290XG4gICAgICApIDpcbiAgICAgIChcbiAgICAgICAgY3VycmVudCBpbnN0YW5jZW9mIE9iamVjdCA/XG4gICAgICAgICAgLy8gZGVkaWNhdGVkIE9iamVjdCBwYXJzZXJcbiAgICAgICAgICByZWdlbmVyYXRlT2JqZWN0KHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSA6XG4gICAgICAgICAgLy8gdmFsdWUgYXMgaXQgaXNcbiAgICAgICAgICBjdXJyZW50XG4gICAgICApXG4gIClcbjtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5UmVjdXJzaW9uKHZhbHVlLCByZXBsYWNlciwgc3BhY2UsIGRvTm90UmVzb2x2ZSkge1xucmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlLCBnZW5lcmF0ZVJlcGxhY2VyKHZhbHVlLCByZXBsYWNlciwgIWRvTm90UmVzb2x2ZSksIHNwYWNlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VSZWN1cnNpb24odGV4dCwgcmV2aXZlcikge1xucmV0dXJuIEpTT04ucGFyc2UodGV4dCwgZ2VuZXJhdGVSZXZpdmVyKHJldml2ZXIpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdHJpbmdpZnk6IHN0cmluZ2lmeVJlY3Vyc2lvbixcbiAgcGFyc2U6IHBhcnNlUmVjdXJzaW9uXG59IiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIENyZWRpdHM6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvc2VyaWFsaXplLWVycm9yXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB2YWx1ZSA9PiB7XG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGRlc3Ryb3lDaXJjdWxhcih2YWx1ZSwgW10pO1xuXHR9XG5cblx0Ly8gUGVvcGxlIHNvbWV0aW1lcyB0aHJvdyB0aGluZ3MgYmVzaWRlcyBFcnJvciBvYmplY3RzLCBzb+KAplxuXG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHQvLyBKU09OLnN0cmluZ2lmeSBkaXNjYXJkcyBmdW5jdGlvbnMuIFdlIGRvIHRvbywgdW5sZXNzIGEgZnVuY3Rpb24gaXMgdGhyb3duIGRpcmVjdGx5LlxuXHRcdHJldHVybiBgW0Z1bmN0aW9uOiAkeyh2YWx1ZS5uYW1lIHx8ICdhbm9ueW1vdXMnKX1dYDtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2Rlc3Ryb3ktY2lyY3VsYXJcbmZ1bmN0aW9uIGRlc3Ryb3lDaXJjdWxhcihmcm9tLCBzZWVuKSB7XG5cdGNvbnN0IHRvID0gQXJyYXkuaXNBcnJheShmcm9tKSA/IFtdIDoge307XG5cblx0c2Vlbi5wdXNoKGZyb20pO1xuXG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGZyb20pKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBmcm9tW2tleV07XG5cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHRvW2tleV0gPSB2YWx1ZTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmIChzZWVuLmluZGV4T2YoZnJvbVtrZXldKSA9PT0gLTEpIHtcblx0XHRcdHRvW2tleV0gPSBkZXN0cm95Q2lyY3VsYXIoZnJvbVtrZXldLCBzZWVuLnNsaWNlKDApKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHRvW2tleV0gPSAnW0NpcmN1bGFyXSc7XG5cdH1cblxuXHRpZiAodHlwZW9mIGZyb20ubmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHR0by5uYW1lID0gZnJvbS5uYW1lO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBmcm9tLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG5cdFx0dG8ubWVzc2FnZSA9IGZyb20ubWVzc2FnZTtcblx0fVxuXG5cdGlmICh0eXBlb2YgZnJvbS5zdGFjayA9PT0gJ3N0cmluZycpIHtcblx0XHR0by5zdGFjayA9IGZyb20uc3RhY2s7XG5cdH1cblxuXHRyZXR1cm4gdG87XG59IiwiY29uc3QgRU5URVIgPSAnRU5URVInO1xuY29uc3QgT1VUID0gJ09VVCc7XG5jb25zdCBSRU1PVkUgPSAnUkVNT1ZFJztcblxuaW1wb3J0IHNhbml0aXplIGZyb20gJy4vaGVscGVycy9zYW5pdGl6ZSc7XG5cbmZ1bmN0aW9uIHByaW50U25hcHNob3RUb0NvbnNvbGUoc25hcHNob3QpIHtcbiAgbGV0IHN0ciA9ICcnO1xuICBsZXQgYWRkSW5kID0gaW5kID0+IHtcbiAgICBsZXQgcyA9ICcnLCBpID0gMDtcblxuICAgIGZvciAoO2kgPCBpbmQ7IGkrKykgcyArPSAnICAnO1xuICAgIHJldHVybiBzO1xuICB9O1xuXG4gIChmdW5jdGlvbiBsb29wKHsgaW5kLCBuYW1lLCB1c2VkLCBjaGlsZHJlbiB9KSB7XG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc3RyICs9IGAkeyBhZGRJbmQoaW5kKSB9PCR7IG5hbWUgfSAvPiAoJHsgdXNlZCB9KVxcbmA7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN0ciArPSBhZGRJbmQoaW5kKTtcbiAgICBzdHIgKz0gYDwkeyBuYW1lIH0+ICgkeyB1c2VkIH0pXFxuYDtcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiBsb29wKGNoaWxkKSk7XG4gICAgfVxuICAgIHN0ciArPSBhZGRJbmQoaW5kKTtcbiAgICBzdHIgKz0gYDwvJHsgbmFtZSB9PlxcbmA7XG4gIH0pKHNuYXBzaG90LnRyZWUpO1xuXG4gIGNvbnNvbGUuY2xlYXIoKTtcbiAgY29uc29sZS5sb2coc3RyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5zcGVjdG9yKHByb2Nlc3Nvcikge1xuICBjb25zdCBzbmFwc2hvdHMgPSBbXTtcblxuICBmdW5jdGlvbiBzbmFwc2hvdCh0eXBlLCBub2RlKSB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4ucmVzdCB9ID0gbm9kZS5lbGVtZW50LnByb3BzID8gbm9kZS5lbGVtZW50LnByb3BzIDoge307IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgIHNuYXBzaG90cy5wdXNoKHNhbml0aXplKHtcbiAgICAgIHR5cGUsXG4gICAgICBlbGVtZW50OiB7XG4gICAgICAgIG5hbWU6IG5vZGUuZWxlbWVudC5uYW1lLFxuICAgICAgICBwcm9wczoge1xuICAgICAgICAgIGNoaWxkcmVuOiAnPGZ1bmN0aW9uIGNoaWxkcmVuPicsXG4gICAgICAgICAgLi4ucmVzdFxuICAgICAgICB9LFxuICAgICAgICB1c2VkOiBub2RlLmVsZW1lbnQudXNlZCgpLFxuICAgICAgICBpZDogbm9kZS5lbGVtZW50LmlkXG4gICAgICB9LFxuICAgICAgdHJlZTogcHJvY2Vzc29yLnN5c3RlbSgpLnRyZWUuZGlhZ25vc2UoKVxuICAgIH0pKTtcbiAgICBwcmludFNuYXBzaG90VG9Db25zb2xlKHNuYXBzaG90c1tzbmFwc2hvdHMubGVuZ3RoIC0gMV0pO1xuICB9XG5cbiAgcHJvY2Vzc29yLm9uTm9kZUVudGVyKG5vZGUgPT4gc25hcHNob3QoRU5URVIsIG5vZGUpKTtcbiAgcHJvY2Vzc29yLm9uTm9kZU91dChub2RlID0+IHNuYXBzaG90KE9VVCwgbm9kZSkpO1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKG5vZGUgPT4gc25hcHNob3QoUkVNT1ZFLCBub2RlKSk7XG59O1xuIiwiZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhIb2xlczsiLCJmdW5jdGlvbiBfYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hcnJheVdpdGhvdXRIb2xlczsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmaW5lUHJvcGVydHk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheShpdGVyKSB7XG4gIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGl0ZXIpIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpdGVyKSA9PT0gXCJbb2JqZWN0IEFyZ3VtZW50c11cIikgcmV0dXJuIEFycmF5LmZyb20oaXRlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7XG4gIHZhciBfYXJyID0gW107XG4gIHZhciBfbiA9IHRydWU7XG4gIHZhciBfZCA9IGZhbHNlO1xuICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBfZCA9IHRydWU7XG4gICAgX2UgPSBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gX2Fycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5TGltaXQ7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlUmVzdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVTcHJlYWQoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVTcHJlYWQ7IiwidmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4vZGVmaW5lUHJvcGVydHlcIik7XG5cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQyKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpICUgMikge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge307XG4gICAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG5cbiAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbiAoc3ltKSB7XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cblxuICAgICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGFyZ3VtZW50c1tpXSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDI7IiwidmFyIGFycmF5V2l0aEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRoSG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXlMaW1pdCA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheUxpbWl0XCIpO1xuXG52YXIgbm9uSXRlcmFibGVSZXN0ID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVSZXN0XCIpO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHtcbiAgcmV0dXJuIGFycmF5V2l0aEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBub25JdGVyYWJsZVJlc3QoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfc2xpY2VkVG9BcnJheTsiLCJ2YXIgYXJyYXlXaXRob3V0SG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhvdXRIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheSA9IHJlcXVpcmUoXCIuL2l0ZXJhYmxlVG9BcnJheVwiKTtcblxudmFyIG5vbkl0ZXJhYmxlU3ByZWFkID0gcmVxdWlyZShcIi4vbm9uSXRlcmFibGVTcHJlYWRcIik7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHtcbiAgcmV0dXJuIGFycmF5V2l0aG91dEhvbGVzKGFycikgfHwgaXRlcmFibGVUb0FycmF5KGFycikgfHwgbm9uSXRlcmFibGVTcHJlYWQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdG9Db25zdW1hYmxlQXJyYXk7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgRm9jdXNGaWVsZCB9IGZyb20gJy4vRE9NJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hlY2tGb3JFZGl0RmllbGQoeyB0b2RvcyB9KSB7XG4gIHJldHVybiA8Rm9jdXNGaWVsZCBpbmRleD17IHRvZG9zLmZpbmRJbmRleCgoeyBlZGl0aW5nIH0pID0+IGVkaXRpbmcpIH0gLz47XG59XG4iLCJpbXBvcnQge1xuICBUT0dHTEUsXG4gIE5FV19UT0RPLFxuICBERUxFVEUsXG4gIEVESVQsXG4gIEVESVRfVE9ETyxcbiAgQ0xFQVJfQ09NUExFVEVEXG59IGZyb20gJy4vU3RvcmUnO1xuaW1wb3J0IHtcbiAgRklMVEVSX0FMTCxcbiAgRklMVEVSX0FDVElWRSxcbiAgRklMVEVSX0NPTVBMRVRFRFxufSBmcm9tICcuLyc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5jb25zdCAkID0gKHNlbGVjdG9yKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbmNvbnN0IGxpc3QgPSAkKCcudG9kby1saXN0Jyk7XG5jb25zdCBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5cbmNvbnN0IEVOVEVSID0gMTM7XG5jb25zdCBFU0MgPSAyNztcblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxDb250YWluZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGxpc3QuaW5uZXJIVE1MID0gY2hpbGRyZW4oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b2dnbGUnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oVE9HR0xFLCB0b2RvSW5kZXgpO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZGVsZXRlJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKERFTEVURSwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElUX1RPRE8sIHsgaW5kZXg6IHRvZG9JbmRleCwgbGFiZWw6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSAmJiBlLmtleUNvZGUgPT09IEVTQykge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1uZXcnKSAmJiBlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihORVdfVE9ETywgZS50YXJnZXQudmFsdWUpO1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBbXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gRm9jdXNGaWVsZCh7IGluZGV4IH0pIHtcbiAgY29uc3QgZWwgPSAkKGAuZWRpdFtkYXRhLWluZGV4PVwiJHsgaW5kZXggfVwiXWApO1xuXG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPSBlbC52YWx1ZS5sZW5ndGg7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gUHJvZ3Jlc3NDaGVja2VyKHsgdG9kb3MgfSkge1xuICBjb25zdCBjb21wbGV0ZWQgPSB0b2Rvcy5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IGNvbXBsZXRlZCkubGVuZ3RoO1xuICBjb25zdCBpdGVtc0xlZnQgPSB0b2Rvcy5sZW5ndGggLSBjb21wbGV0ZWQ7XG5cbiAgJCgnW2RhdGEtY291bnRdJykuaW5uZXJIVE1MID0gYFxuICAgIDxzdHJvbmc+JHsgaXRlbXNMZWZ0IH08L3N0cm9uZz4gJHsgaXRlbXNMZWZ0ID4gMSB8fCBpdGVtc0xlZnQgPT09IDAgPyAnaXRlbXMnIDogJ2l0ZW0nIH0gbGVmdFxuICBgO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGb290ZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICQoJ1tkYXRhLWZpbHRlcl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFsbCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUxMKTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFjdGl2ZScpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUNUSVZFKTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWNvbXBsZXRlZCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQ09NUExFVEVEKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKCdbZGF0YS1jbGVhci1jb21wbGV0ZWRdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBvblVzZXJBY3Rpb24oQ0xFQVJfQ09NUExFVEVEKTtcbiAgICB9KTtcbiAgfSwgW10pO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaWx0ZXJPcHRpb25zVGFicyh7IGZpbHRlciB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgJCgnW2RhdGEtYWxsXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9BTEwgPyAnc2VsZWN0ZWQnIDogJycpO1xuICAgICQoJ1tkYXRhLWFjdGl2ZV0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUNUSVZFID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgICAkKCdbZGF0YS1jb21wbGV0ZWRdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gIH0sIFsgZmlsdGVyIF0pO1xufVxuIiwiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi9TdG9yZSc7XG5cbmNvbnN0IGluaXRpYWxWYWx1ZSA9IEpTT04uc3RyaW5naWZ5KFtcbiAgVG9Ebyh7IGxhYmVsOiAnQWN0TUwgaXMgdXNpbmcgSlNYJyB9KSxcbiAgVG9Ebyh7IGxhYmVsOiAnSXQgaXMgbGlrZSBSZWFjdCBidXQgbm90IGZvciByZW5kZXJpbmcnIH0pXG5dKTtcblxuZXhwb3J0IGNvbnN0IHVzZUxvY2FsU3RvcmFnZSA9ICgpID0+IHtcbiAgY29uc3QgWyBnZXREYXRhIF0gPSB1c2VTdGF0ZShKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvcycpIHx8IGluaXRpYWxWYWx1ZSkpO1xuXG4gIHJldHVybiBnZXREYXRhKCk7XG59O1xuZXhwb3J0IGNvbnN0IFBlcnNpc3QgPSAoeyB0b2RvcyB9KSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZpbGxDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBGSUxURVJfQUxMLCBGSUxURVJfQUNUSVZFLCBGSUxURVJfQ09NUExFVEVEIH0gZnJvbSAnLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJlcih7IHRvZG9zLCBmaWx0ZXIgfSkge1xuICByZXR1cm4gKFxuICAgIDxGaWxsQ29udGFpbmVyPlxuICAgICAge1xuICAgICAgICAoKSA9PiB0b2Rvc1xuICAgICAgICAuZmlsdGVyKCh7IGNvbXBsZXRlZCB9KSA9PiB7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FMTCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSkgcmV0dXJuICFjb21wbGV0ZWQ7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCkgcmV0dXJuIGNvbXBsZXRlZDtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLm1hcCgodG9kbywgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxpQ2xhc3MgPSB0b2RvLmVkaXRpbmcgPyAnZWRpdGluZycgOiAodG9kby5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnKTtcblxuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8bGkgY2xhc3M9JyR7IGxpQ2xhc3MgfSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGVcbiAgICAgICAgICAgICAgICAgICR7IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfT5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1pbmRleD1cIiR7IGkgfVwiIGRhdGEtbGFiZWw+JHsgdG9kby5sYWJlbCB9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImRlc3Ryb3lcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWRlbGV0ZT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVkaXRcIiB2YWx1ZT1cIiR7IHRvZG8ubGFiZWwgfVwiIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWVkaXQ+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0pLmpvaW4oJycpXG4gICAgICB9XG4gICAgPC9GaWxsQ29udGFpbmVyPlxuICApO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IHVzZVJlZHVjZXIsIHVzZVB1YlN1YiwgdXNlRWZmZWN0IH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuZXhwb3J0IGNvbnN0IFRPR0dMRSA9ICdUT0dHTEUnO1xuZXhwb3J0IGNvbnN0IE5FV19UT0RPID0gJ05FV19UT0RPJztcbmV4cG9ydCBjb25zdCBERUxFVEUgPSAnREVMRVRFJztcbmV4cG9ydCBjb25zdCBFRElUID0gJ0VESVQnO1xuZXhwb3J0IGNvbnN0IEVESVRfVE9ETyA9ICdFRElUX1RPRE8nO1xuZXhwb3J0IGNvbnN0IENMRUFSX0NPTVBMRVRFRCA9ICdDTEVBUl9DT01QTEVURUQnO1xuXG5jb25zdCB0b2dnbGUgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBUT0dHTEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBERUxFVEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IG5ld1RvZG8gPSAobGFiZWwpID0+ICh7IHR5cGU6IE5FV19UT0RPLCBsYWJlbCB9KTtcbmNvbnN0IGVkaXQgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBFRElULCB0b2RvSW5kZXggfSk7XG5jb25zdCBlZGl0VG9EbyA9ICh7IGluZGV4LCBsYWJlbCB9KSA9PiAoeyB0eXBlOiBFRElUX1RPRE8sIGluZGV4LCBsYWJlbCB9KTtcbmNvbnN0IGNsZWFyQ29tcGxldGVkID0gKCkgPT4gKHsgdHlwZTogQ0xFQVJfQ09NUExFVEVEIH0pO1xuXG5leHBvcnQgY29uc3QgVG9EbyA9ICh7IGxhYmVsIH0pID0+ICh7IGxhYmVsLCBjb21wbGV0ZWQ6IGZhbHNlLCBlZGl0aW5nOiBmYWxzZSB9KTtcblxuY29uc3QgcmVkdWNlciA9IGZ1bmN0aW9uICh0b2RvcywgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRTpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgY29tcGxldGVkOiAhdG9kby5jb21wbGV0ZWRcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBFRElUOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24udG9kb0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBlZGl0aW5nOiAhdG9kby5lZGl0aW5nXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVF9UT0RPOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24uaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGxhYmVsOiBhY3Rpb24ubGFiZWwsXG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICB9KTtcbiAgICBjYXNlIE5FV19UT0RPOlxuICAgICAgcmV0dXJuIFsgLi4udG9kb3MsIFRvRG8oeyBsYWJlbDogYWN0aW9uLmxhYmVsIH0pIF07XG4gICAgY2FzZSBERUxFVEU6XG4gICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggIT09IGFjdGlvbi50b2RvSW5kZXgpO1xuICAgIGNhc2UgQ0xFQVJfQ09NUExFVEVEOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbykgPT4gIXRvZG8uY29tcGxldGVkKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRvZG9zO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdG9yZSh7IGluaXRpYWxWYWx1ZSwgY2hpbGRyZW4gfSkge1xuICBjb25zdCBbIHRvZG9zLCBkaXNwYXRjaCBdID0gdXNlUmVkdWNlcihyZWR1Y2VyLCBpbml0aWFsVmFsdWUpO1xuICBjb25zdCB7IHN1YnNjcmliZSB9ID0gdXNlUHViU3ViKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzdWJzY3JpYmUoVE9HR0xFLCAodG9kb0luZGV4KSA9PiBkaXNwYXRjaCh0b2dnbGUodG9kb0luZGV4KSkpO1xuICAgIHN1YnNjcmliZShORVdfVE9ETywgKGxhYmVsKSA9PiBkaXNwYXRjaChuZXdUb2RvKGxhYmVsKSkpO1xuICAgIHN1YnNjcmliZShERUxFVEUsICh0b2RvSW5kZXgpID0+IGRpc3BhdGNoKGRlbGV0ZVRvZG8odG9kb0luZGV4KSkpO1xuICAgIHN1YnNjcmliZShFRElULCAobGFiZWwpID0+IGRpc3BhdGNoKGVkaXQobGFiZWwpKSk7XG4gICAgc3Vic2NyaWJlKEVESVRfVE9ETywgKHBheWxvYWQpID0+IGRpc3BhdGNoKGVkaXRUb0RvKHBheWxvYWQpKSk7XG4gICAgc3Vic2NyaWJlKENMRUFSX0NPTVBMRVRFRCwgKCkgPT4gZGlzcGF0Y2goY2xlYXJDb21wbGV0ZWQoKSkpO1xuICB9LCBbXSk7XG5cbiAgY2hpbGRyZW4oeyB0b2RvczogdG9kb3MoKSB9KTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIHJ1biwgRnJhZ21lbnQsIHVzZVB1YlN1YiwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgcHJvY2Vzc29yIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcbmltcG9ydCBpbnNwZWN0b3IgZnJvbSAnLi4vLi4vLi4vcGFja2FnZXMvaW5zcGVjdG9yJztcblxuaW5zcGVjdG9yKHByb2Nlc3Nvcik7XG5cbmltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBDaGVja0ZvckVkaXRGaWVsZCBmcm9tICcuL0NoZWNrRm9yRWRpdEZpZWxkJztcbmltcG9ydCB7IFByb2dyZXNzQ2hlY2tlciwgRmlsdGVyT3B0aW9uc1RhYnMsIENvbnRhaW5lciwgRm9vdGVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgdXNlTG9jYWxTdG9yYWdlLCBQZXJzaXN0IH0gZnJvbSAnLi9QZXJzaXN0JztcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9BTEwgPSAnRklMVEVSX0FMTCc7XG5leHBvcnQgY29uc3QgRklMVEVSX0FDVElWRSA9ICdGSUxURVJfQUNUSVZFJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQ09NUExFVEVEID0gJ0ZJTFRFUl9DT01QTEVURUQnO1xuXG5mdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHVzZUxvY2FsU3RvcmFnZSgpO1xuICBjb25zdCB7IHB1Ymxpc2gsIHN1YnNjcmliZSB9ID0gdXNlUHViU3ViKCk7XG4gIGNvbnN0IFsgZmlsdGVyLCBzZXRGaWx0ZXIgXSA9IHVzZVN0YXRlKEZJTFRFUl9BTEwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3Vic2NyaWJlKEZJTFRFUl9BTEwsICgpID0+IHNldEZpbHRlcihGSUxURVJfQUxMKSk7XG4gICAgc3Vic2NyaWJlKEZJTFRFUl9BQ1RJVkUsICgpID0+IHNldEZpbHRlcihGSUxURVJfQUNUSVZFKSk7XG4gICAgc3Vic2NyaWJlKEZJTFRFUl9DT01QTEVURUQsICgpID0+IHNldEZpbHRlcihGSUxURVJfQ09NUExFVEVEKSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxDb250YWluZXIgb25Vc2VyQWN0aW9uPXsgcHVibGlzaCB9IC8+XG4gICAgICA8Rm9vdGVyIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfS8+XG4gICAgICA8U3RvcmUgaW5pdGlhbFZhbHVlPXsgaW5pdGlhbFZhbHVlIH0+XG4gICAgICAgIDxGaWx0ZXJPcHRpb25zVGFicyBmaWx0ZXI9eyBmaWx0ZXIoKSB9IC8+XG4gICAgICAgIDxSZW5kZXJlciBmaWx0ZXI9eyBmaWx0ZXIoKSB9Lz5cbiAgICAgICAgPENoZWNrRm9yRWRpdEZpZWxkIC8+XG4gICAgICAgIDxQcm9ncmVzc0NoZWNrZXIgLz5cbiAgICAgICAgPFBlcnNpc3QgLz5cbiAgICAgIDwvU3RvcmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbnJ1big8QXBwIC8+KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=