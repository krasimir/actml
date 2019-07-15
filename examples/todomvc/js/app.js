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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1F1ZXVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUHViU3ViLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVN0YXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi91dGlscy9pc0FjdE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2hlbHBlcnMvc2FuaXRpemUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9DaXJjdWxhckpTT04uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9TZXJpYWxpemVFcnJvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BlcnNpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJnZXRGdW5jTmFtZSIsImZ1bmMiLCJuYW1lIiwicmVzdWx0IiwiZXhlYyIsInRvU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJFcnJvciIsIl9fYWN0bWwiLCJfX3VzZWQiLCJfX3J1bm5pbmciLCJpZCIsImluaXRpYWxpemUiLCJ1c2VkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibWVyZ2VQcm9wcyIsIm5ld1Byb3BzIiwiYXNzaWduIiwiaXNSdW5uaW5nIiwiZW50ZXIiLCJjb25zdW1lIiwib3V0IiwiZGVmYXVsdCIsImNyZWF0ZUNvbnRleHRGYWN0b3J5IiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwia2V5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiQ09OVEVYVF9LRVkiLCJQVUJMSUNfQ09OVEVYVF9LRVkiLCJpZHMiLCJnZXRJZCIsInJlc29sdmVDb250ZXh0Iiwibm9kZSIsInN0YWNrIiwicHVzaCIsImVsZW1lbnQiLCJwYXJlbnQiLCJjb25zb2xlIiwid2FybiIsIm1hcCIsImpvaW4iLCJwcm9jZXNzb3IiLCJjcmVhdGVDb250ZXh0IiwiaW5pdGlhbFZhbHVlIiwiX3JlZjMiLCJQcm92aWRlciIsIl9yZWYiLCJDb25zdW1lciIsIl9yZWYyIiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3VzZUVmZmVjdCIsIl91c2VFZmZlY3QyIiwiX1F1ZXVlIiwiX1F1ZXVlMiIsIl9fZXNNb2R1bGUiLCJDSElMRFJFTiIsIkNPTlNVTUUiLCJQUk9DRVNTX1JFU1VMVCIsIlJFVFVSTkVEX0VMRU1FTlQiLCJDSElMRCIsImlzR2VuZXJhdG9yIiwiaXNQcm9taXNlIiwiY3JlYXRlQ2hpbGRyZW5GdW5jIiwicHJvY2Vzc05vZGUiLCJmIiwiX2FyZ3VtZW50cyIsInF1ZXVlSXRlbXNUb0FkZCIsInJlc3VsdHMiLCJjaGlsZHJlblF1ZXVlIiwiX2xvb3AiLCJpIiwiX2NoaWxkcmVuJGkiLCJhcHBseSIsImFkZENoaWxkTm9kZSIsImZ1bmNSZXN1bHQiLCJyZXZlcnNlIiwiZm9yRWFjaCIsInByZXBlbmRJdGVtIiwiciIsInByb2Nlc3MiLCJvbkRvbmUiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJyZXJ1biIsInF1ZXVlIiwiYWRkIiwiY29uc3VtcHRpb24iLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwiZ2VuZXJhdG9yRG9uZSIsImdlblJlc3VsdCIsIml0ZXJhdGUiLCJuZXh0IiwiZG9uZSIsInJlcyIsInRoZW4iLCJfcmVzIiwicnVuIiwicm9vdE5vZGUiLCJyZXNvbHZlUm9vdCIsIm9uTm9kZUVudGVyIiwiY2FsbGJhY2siLCJhZGROb2RlRW50ZXJDYWxsYmFjayIsIm9uTm9kZU91dCIsImFkZE5vZGVPdXRDYWxsYmFjayIsIm9uTm9kZVJlbW92ZSIsInN5c3RlbSIsInJlc2V0IiwiY2xlYXIiLCJjcmVhdGVRdWV1ZSIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImFycjIiLCJmcm9tIiwiTE9HUyIsImxvZyIsIl9jb25zb2xlIiwiY3JlYXRlSXRlbSIsInR5cGUiLCJjb250ZXh0IiwiaXRlbXMiLCJhc3luYyIsInJ1bm5pbmciLCJyZWxlYXNlIiwiY29uY2F0IiwibGFzdFJlc3VsdCIsIl90aGlzIiwiaXRlbSIsInNoaWZ0IiwiYXN5bmNSZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZ2V0UmVzdWx0IiwicmVqZWN0IiwiX2V4dGVuZHMiLCJ0YXJnZXQiLCJzb3VyY2UiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJUcmVlIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwia2V5cyIsImluZGV4T2YiLCJfb25Ob2RlUmVtb3ZlIiwicm9vdCIsImNyZWF0ZU5ld05vZGUiLCJ1c2VTYW1lTm9kZSIsIm5ld0VsZW1lbnQiLCJ0cmVlRGlmZiIsIm9sZEVsZW1lbnQiLCJjdXJzb3IiLCJjIiwiX3RoaXMyIiwic3BsaWNlIiwicmVtb3ZlZE5vZGUiLCJfdGhpczMiLCJjaGlsZE5vZGUiLCJuZXdDaGlsZE5vZGUiLCJnZXROdW1PZkVsZW1lbnRzIiwiZGlhZ25vc2UiLCJsb29wT3ZlciIsImluZCIsInJlc3QiLCJjaGlsZCIsIl9pc1ZhbGlkSG9va0NvbnRleHQiLCJfaXNWYWxpZEhvb2tDb250ZXh0MiIsIl9Db250ZXh0IiwiY3JlYXRlVXNlRWxlbWVudEhvb2siLCJDb250ZXh0IiwiX2Zhc3REZWVwRXF1YWwiLCJfZmFzdERlZXBFcXVhbDIiLCJTdG9yYWdlIiwiZWxlbWVudHMiLCJnZXQiLCJlZmZlY3RzIiwiY29uc3VtZXIiLCJjbGVhblVwIiwiY3JlYXRlRWZmZWN0IiwiZGVwcyIsInVwZGF0ZUVmZmVjdCIsImVmZmVjdCIsIm9sZERlcHMiLCJkZXBzRXF1YWwiLCJuZXdEZXBzIiwicmVzb2x2ZUVmZmVjdCIsImFyZUVxdWFsIiwiY3JlYXRlVXNlRWZmZWN0SG9vayIsInN0b3JhZ2UiLCJpbmRleCIsImNyZWF0ZVVzZVB1YlN1Ykhvb2siLCJzdWJzY3JpYmVycyIsInN1YnNjcmliZSIsInB1Ymxpc2giLCJwYXlsb2FkIiwic2NvcGVkRWxlbWVudCIsImVsIiwic3Vic2NyaWJlRnVuYyIsIl9sZW4iLCJwYXJhbXMiLCJfa2V5IiwicHVibGlzaEZ1bmMiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwiX2kiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zIiwiZXJyIiwiVHlwZUVycm9yIiwiY3JlYXRlVXNlUmVkdWNlckhvb2siLCJjcmVhdGVEaXNwYXRjaEVsZW1lbnQiLCJkaXNwYXRjaCIsImFjdGlvbiIsInByb3BzVG9BY3Rpb24iLCJ1c2VTdGF0ZSIsInJlZHVjZXIiLCJpbml0aWFsU3RhdGUiLCJzdGF0ZSIsInNldFN0YXRlIiwiY3JlYXRlVXNlU3RhdGVIb29rIiwic3RhdGVzIiwibmV3U3RhdGUiLCJpc1ZhbGlkSG9va0NvbnRleHQiLCJjcmVhdGVSdW50aW1lIiwiX1Byb2Nlc3NvciIsIl9Qcm9jZXNzb3IyIiwiX0FjdEVsZW1lbnQiLCJfQWN0RWxlbWVudDIiLCJfdXNlRWxlbWVudCIsIl91c2VFbGVtZW50MiIsIl91c2VSZWR1Y2VyIiwiX3VzZVJlZHVjZXIyIiwiX3VzZUNvbnRleHQiLCJfdXNlQ29udGV4dDIiLCJfQ29udGV4dDIiLCJBIiwiRnJhZ21lbnQiLCJ1c2VFbGVtZW50IiwidXNlUHViU3ViIiwidXNlUmVkdWNlciIsInVzZUVmZmVjdCIsInVzZUNvbnRleHQiLCJydW50aW1lIiwibW9kdWxlIiwiaXNBY3RNTEVsZW1lbnQiLCJzdHJpbmdpZnkiLCJDaXJjdWxhckpTT04iLCJzYW5pdGl6ZSIsInNvbWV0aGluZyIsInNob3dFcnJvckluQ29uc29sZSIsIkpTT04iLCJwYXJzZSIsIlNlcmlhbGl6ZUVycm9yIiwic3BlY2lhbENoYXIiLCJzYWZlU3BlY2lhbENoYXIiLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJlc2NhcGVkU2FmZVNwZWNpYWxDaGFyIiwic3BlY2lhbENoYXJSRyIsIlJlZ0V4cCIsInNhZmVTcGVjaWFsQ2hhclJHIiwic2FmZVN0YXJ0V2l0aFNwZWNpYWxDaGFyUkciLCJ2IiwiJFN0cmluZyIsIlN0cmluZyIsImdlbmVyYXRlUmVwbGFjZXIiLCJyZXBsYWNlciIsInJlc29sdmUiLCJpbnNwZWN0IiwicGF0aCIsImFsbCIsInNlZW4iLCJtYXBwIiwibGFzdCIsImx2bCIsImZuIiwicmVwbGFjZSIsInJldHJpZXZlRnJvbVBhdGgiLCJjdXJyZW50IiwiZ2VuZXJhdGVSZXZpdmVyIiwicmV2aXZlciIsImlzU3RyaW5nIiwiY2hhckF0IiwicmVnZW5lcmF0ZSIsInJlZ2VuZXJhdGVBcnJheSIsInJldHJpZXZlIiwicmVnZW5lcmF0ZU9iamVjdCIsInNwbGl0Iiwic3RyaW5naWZ5UmVjdXJzaW9uIiwic3BhY2UiLCJkb05vdFJlc29sdmUiLCJwYXJzZVJlY3Vyc2lvbiIsInRleHQiLCJkZXN0cm95Q2lyY3VsYXIiLCJ0byIsIm1lc3NhZ2UiLCJFTlRFUiIsIk9VVCIsIlJFTU9WRSIsInByaW50U25hcHNob3RUb0NvbnNvbGUiLCJzbmFwc2hvdCIsInN0ciIsImFkZEluZCIsInMiLCJsb29wIiwiaW5zcGVjdG9yIiwic25hcHNob3RzIiwiQ2hlY2tGb3JFZGl0RmllbGQiLCJ0b2RvcyIsImZpbmRJbmRleCIsImVkaXRpbmciLCIkIiwic2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsaXN0IiwiaGVhZGVyIiwiRVNDIiwiRmlsbENvbnRhaW5lciIsImlubmVySFRNTCIsIkNvbnRhaW5lciIsIm9uVXNlckFjdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidG9kb0luZGV4IiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJUT0dHTEUiLCJERUxFVEUiLCJFRElUIiwiRURJVF9UT0RPIiwibGFiZWwiLCJrZXlDb2RlIiwiTkVXX1RPRE8iLCJGb2N1c0ZpZWxkIiwiZm9jdXMiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsIlByb2dyZXNzQ2hlY2tlciIsImNvbXBsZXRlZCIsImZpbHRlciIsIml0ZW1zTGVmdCIsIkZvb3RlciIsIkZJTFRFUl9BTEwiLCJGSUxURVJfQUNUSVZFIiwiRklMVEVSX0NPTVBMRVRFRCIsIkNMRUFSX0NPTVBMRVRFRCIsIkZpbHRlck9wdGlvbnNUYWJzIiwic2V0QXR0cmlidXRlIiwiVG9EbyIsInVzZUxvY2FsU3RvcmFnZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJnZXREYXRhIiwiUGVyc2lzdCIsInNldEl0ZW0iLCJSZW5kZXJlciIsInRvZG8iLCJsaUNsYXNzIiwidG9nZ2xlIiwiZGVsZXRlVG9kbyIsIm5ld1RvZG8iLCJlZGl0IiwiZWRpdFRvRG8iLCJjbGVhckNvbXBsZXRlZCIsIlN0b3JlIiwiQXBwIiwic2V0RmlsdGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFB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QTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtB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QUh6QjtBQUFBO0FBQUEsTUFHTEgsTUFISztBQUFBLE1BR0cyQixTQUhIOztBQUtiaEksd0RBQVMsQ0FBQyxZQUFNO0FBQ2RyRCxhQUFTLENBQUM2SixVQUFELEVBQWE7QUFBQSxhQUFNd0IsU0FBUyxDQUFDeEIsVUFBRCxDQUFmO0FBQUEsS0FBYixDQUFUO0FBQ0E3SixhQUFTLENBQUM4SixhQUFELEVBQWdCO0FBQUEsYUFBTXVCLFNBQVMsQ0FBQ3ZCLGFBQUQsQ0FBZjtBQUFBLEtBQWhCLENBQVQ7QUFDQTlKLGFBQVMsQ0FBQytKLGdCQUFELEVBQW1CO0FBQUEsYUFBTXNCLFNBQVMsQ0FBQ3RCLGdCQUFELENBQWY7QUFBQSxLQUFuQixDQUFUO0FBQ0QsR0FKUSxFQUlOLEVBSk0sQ0FBVDtBQU1BLFNBQ0UsK0NBQUMsNkNBQUQsUUFDRSwrQ0FBQyw4Q0FBRDtBQUFXLGdCQUFZLEVBQUc5SjtBQUExQixJQURGLEVBRUUsK0NBQUMsMkNBQUQ7QUFBUSxnQkFBWSxFQUFHQTtBQUF2QixJQUZGLEVBR0UsK0NBQUMsOENBQUQ7QUFBTyxnQkFBWSxFQUFHbEs7QUFBdEIsS0FDRSwrQ0FBQyxzREFBRDtBQUFtQixVQUFNLEVBQUcyVCxNQUFNO0FBQWxDLElBREYsRUFFRSwrQ0FBQyxpREFBRDtBQUFVLFVBQU0sRUFBR0EsTUFBTTtBQUF6QixJQUZGLEVBR0UsK0NBQUMsMERBQUQsT0FIRixFQUlFLCtDQUFDLG9EQUFELE9BSkYsRUFLRSwrQ0FBQyxnREFBRCxPQUxGLENBSEYsQ0FERjtBQWFEOztBQUFBO0FBRUQzUCxnREFBRyxDQUFDLCtDQUFDLEdBQUQsT0FBRCxDQUFILEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmZ1bmN0aW9uIGdldEZ1bmNOYW1lKGZ1bmMpIHtcbiAgaWYgKGZ1bmMubmFtZSkgcmV0dXJuIGZ1bmMubmFtZTtcbiAgdmFyIHJlc3VsdCA9IC9eZnVuY3Rpb25cXHMrKFtcXHdcXCRdKylcXHMqXFwoLy5leGVjKGZ1bmMudG9TdHJpbmcoKSk7XG5cbiAgcmV0dXJuIHJlc3VsdCA/IHJlc3VsdFsxXSA6ICd1bmtub3duJztcbn07XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gY3JlYXRlRWxlbWVudChmdW5jLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgaWYgKHR5cGVvZiBmdW5jICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdBY3RNTCBlbGVtZW50IGV4cGVjdHMgYSBmdW5jdGlvbi4gXCInICsgZnVuYyArICdcIiBnaXZlbiBpbnN0ZWFkLicpO1xuICB9XG4gIHJldHVybiB7XG4gICAgX19hY3RtbDogdHJ1ZSxcbiAgICBfX3VzZWQ6IDAsXG4gICAgX19ydW5uaW5nOiBmYWxzZSxcbiAgICBpZDogbnVsbCxcbiAgICBwcm9wczogcHJvcHMsXG4gICAgbmFtZTogZ2V0RnVuY05hbWUoZnVuYyksXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uIGluaXRpYWxpemUoaWQpIHtcbiAgICAgIHZhciB1c2VkID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICB0aGlzLl9fdXNlZCA9IHVzZWQ7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgIH0sXG4gICAgbWVyZ2VQcm9wczogZnVuY3Rpb24gbWVyZ2VQcm9wcyhuZXdQcm9wcykge1xuICAgICAgdGhpcy5wcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICB9LFxuICAgIHVzZWQ6IGZ1bmN0aW9uIHVzZWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3VzZWQ7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcnVubmluZztcbiAgICB9LFxuICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcigpIHtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNvbnN1bWU6IGZ1bmN0aW9uIGNvbnN1bWUoKSB7XG4gICAgICByZXR1cm4gZnVuYyh0aGlzLnByb3BzKTtcbiAgICB9LFxuICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgdGhpcy5fX3VzZWQgKz0gMTtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlRWxlbWVudDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVDb250ZXh0RmFjdG9yeTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbnZhciBDT05URVhUX0tFWSA9ICdfX0NPTlRFWFRfS0VZX18nO1xuXG52YXIgUFVCTElDX0NPTlRFWFRfS0VZID0gZXhwb3J0cy5QVUJMSUNfQ09OVEVYVF9LRVkgPSAnX19QVUJMSUNfQ09OVEVYVF9LRVlfXyc7XG5cbnZhciBpZHMgPSAwO1xuXG5mdW5jdGlvbiBnZXRJZCgpIHtcbiAgcmV0dXJuICdjJyArICsraWRzO1xufTtcbmZ1bmN0aW9uIHJlc29sdmVDb250ZXh0KG5vZGUsIGlkKSB7XG4gIHZhciBzdGFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG5cbiAgc3RhY2sucHVzaChub2RlLmVsZW1lbnQubmFtZSk7XG4gIGlmIChub2RlW0NPTlRFWFRfS0VZXSAmJiBpZCBpbiBub2RlW0NPTlRFWFRfS0VZXSkge1xuICAgIHJldHVybiBub2RlW0NPTlRFWFRfS0VZXVtpZF07XG4gIH0gZWxzZSBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICByZXR1cm4gcmVzb2x2ZUNvbnRleHQobm9kZS5wYXJlbnQsIGlkLCBzdGFjayk7XG4gIH1cbiAgY29uc29sZS53YXJuKCdBIGNvbnRleHQgY29uc3VtZXIgaXMgdXNlZCB3aXRoIG5vIHByb3ZpZGVyLlxcbiAgU3RhY2s6XFxuJyArIHN0YWNrLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAnICAgIDwnICsgbmFtZSArICc+JztcbiAgfSkuam9pbignXFxuJykpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0RmFjdG9yeShwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoaW5pdGlhbFZhbHVlKSB7XG4gICAgdmFyIF9yZWYzO1xuXG4gICAgdmFyIGlkID0gZ2V0SWQoKTtcblxuICAgIHZhciBQcm92aWRlciA9IGZ1bmN0aW9uIFByb3ZpZGVyKF9yZWYpIHtcbiAgICAgIHZhciB2YWx1ZSA9IF9yZWYudmFsdWUsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuXG4gICAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICAgIGlmICghbm9kZVtDT05URVhUX0tFWV0pIHtcbiAgICAgICAgbm9kZVtDT05URVhUX0tFWV0gPSB7fTtcbiAgICAgIH1cbiAgICAgIG5vZGVbQ09OVEVYVF9LRVldW2lkXSA9IHZhbHVlO1xuXG4gICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfTtcbiAgICB2YXIgQ29uc3VtZXIgPSBmdW5jdGlvbiBDb25zdW1lcihfcmVmMikge1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3JlZjIuY2hpbGRyZW47XG5cbiAgICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgICAgY2hpbGRyZW4ocmVzb2x2ZUNvbnRleHQobm9kZSwgaWQpIHx8IGluaXRpYWxWYWx1ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBfcmVmMyA9IHt9LCBfZGVmaW5lUHJvcGVydHkoX3JlZjMsIFBVQkxJQ19DT05URVhUX0tFWSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgICByZXR1cm4gcmVzb2x2ZUNvbnRleHQobm9kZSwgaWQpIHx8IGluaXRpYWxWYWx1ZTtcbiAgICB9KSwgX2RlZmluZVByb3BlcnR5KF9yZWYzLCAnUHJvdmlkZXInLCBQcm92aWRlciksIF9kZWZpbmVQcm9wZXJ0eShfcmVmMywgJ0NvbnN1bWVyJywgQ29uc3VtZXIpLCBfcmVmMztcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUHJvY2Vzc29yO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50ID0gcmVxdWlyZSgnLi91dGlscy9pc0FjdE1MRWxlbWVudCcpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQWN0TUxFbGVtZW50KTtcblxudmFyIF9UcmVlID0gcmVxdWlyZSgnLi9UcmVlJyk7XG5cbnZhciBfVHJlZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9UcmVlKTtcblxudmFyIF91c2VQdWJTdWIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVB1YlN1YicpO1xuXG52YXIgX3VzZVB1YlN1YjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQdWJTdWIpO1xuXG52YXIgX3VzZVN0YXRlID0gcmVxdWlyZSgnLi9ob29rcy91c2VTdGF0ZScpO1xuXG52YXIgX3VzZVN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVN0YXRlKTtcblxudmFyIF91c2VFZmZlY3QgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVmZmVjdCcpO1xuXG52YXIgX3VzZUVmZmVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VFZmZlY3QpO1xuXG52YXIgX1F1ZXVlID0gcmVxdWlyZSgnLi9RdWV1ZScpO1xuXG52YXIgX1F1ZXVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1F1ZXVlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIGNvbnNpc3RlbnQtcmV0dXJuICovXG52YXIgQ0hJTERSRU4gPSAnX19BQ1RNTF9DSElMRFJFTl9fJztcblxudmFyIENPTlNVTUUgPSAnQ09OU1VNRSc7XG52YXIgUFJPQ0VTU19SRVNVTFQgPSAnUFJPQ0VTU19SRVNVTFQnO1xudmFyIFJFVFVSTkVEX0VMRU1FTlQgPSAnUkVUVVJORURfRUxFTUVOVCc7XG52YXIgQ0hJTEQgPSAnQ0hJTEQnO1xuXG52YXIgaXNHZW5lcmF0b3IgPSBmdW5jdGlvbiBpc0dlbmVyYXRvcihvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqWyduZXh0J10gPT09ICdmdW5jdGlvbic7XG59O1xudmFyIGlzUHJvbWlzZSA9IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqWyd0aGVuJ10gPT09ICdmdW5jdGlvbic7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDaGlsZHJlbkZ1bmMobm9kZSwgcHJvY2Vzc05vZGUpIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiBmKCkge1xuICAgIHZhciBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuZWxlbWVudC5jaGlsZHJlbjtcblxuXG4gICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBxdWV1ZUl0ZW1zVG9BZGQgPSBbXTtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB2YXIgY2hpbGRyZW5RdWV1ZSA9ICgwLCBfUXVldWUyLmRlZmF1bHQpKCcgICcgKyBub2RlLmVsZW1lbnQubmFtZSArICc6Y2hpbGRyZW4nKTtcblxuICAgICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSkge1xuICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoY2hpbGRyZW5baV0pKSB7XG4gICAgICAgICAgdmFyIF9jaGlsZHJlbiRpO1xuXG4gICAgICAgICAgKF9jaGlsZHJlbiRpID0gY2hpbGRyZW5baV0pLm1lcmdlUHJvcHMuYXBwbHkoX2NoaWxkcmVuJGksIF9hcmd1bWVudHMpO1xuICAgICAgICAgIHF1ZXVlSXRlbXNUb0FkZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjaGlsZHJlbltpXSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjaGlsZHJlbltpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBmdW5jUmVzdWx0ID0gY2hpbGRyZW5baV0uYXBwbHkoY2hpbGRyZW4sIF9hcmd1bWVudHMpO1xuXG4gICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmNSZXN1bHQpKSB7XG4gICAgICAgICAgICBxdWV1ZUl0ZW1zVG9BZGQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShmdW5jUmVzdWx0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGZ1bmNSZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF9sb29wKGkpO1xuICAgICAgfVxuICAgICAgcXVldWVJdGVtc1RvQWRkLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIGNoaWxkcmVuUXVldWUucHJlcGVuZEl0ZW0oQ0hJTEQsIGZ1bmMsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHMucHVzaChyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNoaWxkcmVuUXVldWUucHJvY2VzcygpO1xuICAgICAgcmV0dXJuIGNoaWxkcmVuUXVldWUub25Eb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZltDSElMRFJFTl0gPSB0cnVlO1xuICByZXR1cm4gZjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvY2Vzc29yKCkge1xuICB2YXIgdHJlZSA9ICgwLCBfVHJlZTIuZGVmYXVsdCkoKTtcbiAgdmFyIGN1cnJlbnROb2RlID0gbnVsbDtcblxuICB2YXIgcHJvY2Vzc05vZGUgPSBmdW5jdGlvbiBwcm9jZXNzTm9kZShub2RlKSB7XG4gICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgIG5vZGUuZW50ZXIoKTtcbiAgICBub2RlLnJlcnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgIH07XG4gICAgbm9kZS5lbGVtZW50Lm1lcmdlUHJvcHMoe1xuICAgICAgY2hpbGRyZW46IGNyZWF0ZUNoaWxkcmVuRnVuYyhub2RlLCBwcm9jZXNzTm9kZSlcbiAgICB9KTtcblxuICAgIHZhciByZXN1bHRzID0ge307XG4gICAgdmFyIHF1ZXVlID0gKDAsIF9RdWV1ZTIuZGVmYXVsdCkoJyAnICsgbm9kZS5lbGVtZW50Lm5hbWUpO1xuXG4gICAgLy8gQ09OU1VNRVxuICAgIHF1ZXVlLmFkZChDT05TVU1FLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9kZS5lbGVtZW50LmNvbnN1bWUoKTtcbiAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0c1tDT05TVU1FXSA9IHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8vIFBST0NFU1NfUkVTVUxUXG4gICAgcXVldWUuYWRkKFBST0NFU1NfUkVTVUxULCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29uc3VtcHRpb24gPSByZXN1bHRzW0NPTlNVTUVdO1xuXG4gICAgICAvLyBBY3RNTCBlbGVtZW50XG4gICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoY29uc3VtcHRpb24pKSB7XG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoY29uc3VtcHRpb24pKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZW5lcmF0b3JcbiAgICAgIH0gZWxzZSBpZiAoaXNHZW5lcmF0b3IoY29uc3VtcHRpb24pKSB7XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBjb25zdW1wdGlvbjtcblxuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChnZW5lcmF0b3JEb25lKSB7XG4gICAgICAgICAgICB2YXIgZ2VuUmVzdWx0ID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24gaXRlcmF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICBnZW5SZXN1bHQgPSBnZW5lcmF0b3IubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmICghZ2VuUmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0ZShyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRlKHJlcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlcyA9IHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlKF9yZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZXMudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JEb25lKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRvckRvbmUoX3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGdlbmVyYXRvckRvbmUoZ2VuUmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hpbGRyZW5cbiAgICAgIH0gZWxzZSBpZiAoY29uc3VtcHRpb24gJiYgY29uc3VtcHRpb25bQ0hJTERSRU5dKSB7XG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtcHRpb24oKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA9PT0gMSA/IHJlc3VsdFswXSA6IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBSdW5uaW5nIHRoZSBxdWV1ZVxuICAgIHF1ZXVlLnByb2Nlc3MoKTtcblxuICAgIC8vIEdldHRpbmcgdGhlIHJlc3VsdC4gSXQgaXMgZWl0aGVyIGEgcHJvbWlzZSBpZiB0aGVyZSBpc1xuICAgIC8vIHNvbWV0aGluZyBhc3luY2hyb25vdXMgb3IgYSB2YWx1ZVxuICAgIHJldHVybiBxdWV1ZS5vbkRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5vdXQoKTtcbiAgICAgIHJldHVybiBSRVRVUk5FRF9FTEVNRU5UIGluIHJlc3VsdHMgPyByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdIDogcmVzdWx0c1tDT05TVU1FXTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5vZGU6IGZ1bmN0aW9uIG5vZGUoKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSxcbiAgICBydW46IGZ1bmN0aW9uIHJ1bihlbGVtZW50KSB7XG4gICAgICB2YXIgcm9vdE5vZGUgPSB0cmVlLnJlc29sdmVSb290KGVsZW1lbnQpO1xuXG4gICAgICByZXR1cm4gcHJvY2Vzc05vZGUocm9vdE5vZGUpO1xuICAgIH0sXG4gICAgb25Ob2RlRW50ZXI6IGZ1bmN0aW9uIG9uTm9kZUVudGVyKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVFbnRlckNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZU91dDogZnVuY3Rpb24gb25Ob2RlT3V0KGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgdHJlZS5vbk5vZGVSZW1vdmUoY2FsbGJhY2spO1xuICAgIH0sXG4gICAgc3lzdGVtOiBmdW5jdGlvbiBzeXN0ZW0oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmVlOiB0cmVlLFxuICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgY3VycmVudE5vZGUgPSBudWxsO1xuICAgICAgICAgIHRyZWUucmVzZXQoKTtcbiAgICAgICAgICBfdXNlUHViU3ViMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgICAgX3VzZVN0YXRlMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgICAgX3VzZUVmZmVjdDIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUXVldWU7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG52YXIgTE9HUyA9IGZhbHNlO1xudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIHJldHVybiBMT0dTID8gKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpIDogbnVsbDtcbn07XG52YXIgaXNQcm9taXNlID0gZnVuY3Rpb24gaXNQcm9taXNlKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmpbJ3RoZW4nXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG52YXIgY3JlYXRlSXRlbSA9IGZ1bmN0aW9uIGNyZWF0ZUl0ZW0odHlwZSwgZnVuYykge1xuICB2YXIgb25Eb25lID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmdW5jdGlvbiAoKSB7fTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGZ1bmM6IGZ1bmMsXG4gICAgb25Eb25lOiBvbkRvbmVcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVF1ZXVlKGNvbnRleHQpIHtcbiAgdmFyIGl0ZW1zID0gW107XG4gIHZhciBhc3luYyA9IGZhbHNlO1xuICB2YXIgcnVubmluZyA9IGZhbHNlO1xuICB2YXIgcmVsZWFzZSA9IGZ1bmN0aW9uIHJlbGVhc2UoKSB7fTtcblxuICByZXR1cm4ge1xuICAgIGFkZDogZnVuY3Rpb24gYWRkKHR5cGUsIGZ1bmMsIG9uRG9uZSkge1xuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6IFsuLi4nICsgdHlwZSArICddICgnICsgKGl0ZW1zLmxlbmd0aCArIDEpICsgJyB0b3RhbCknKTtcbiAgICAgIGl0ZW1zLnB1c2goY3JlYXRlSXRlbSh0eXBlLCBmdW5jLCBvbkRvbmUpKTtcbiAgICB9LFxuICAgIHByZXBlbmRJdGVtOiBmdW5jdGlvbiBwcmVwZW5kSXRlbSh0eXBlLCBmdW5jLCBvbkRvbmUpIHtcbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiBbJyArIHR5cGUgKyAnLi4uXSAoJyArIChpdGVtcy5sZW5ndGggKyAxKSArICcgdG90YWwpJyk7XG4gICAgICBpdGVtcyA9IFtjcmVhdGVJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoaXRlbXMpKTtcbiAgICB9LFxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uIHByb2Nlc3MobGFzdFJlc3VsdCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGxvZyhjb250ZXh0ICsgJzpROmRvbmUnKTtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZW0gPSBpdGVtcy5zaGlmdCgpO1xuXG4gICAgICBsb2coY29udGV4dCArICc6UTogJyArIGl0ZW0udHlwZSArICcoKSAoJyArIGl0ZW1zLmxlbmd0aCArICcgbGVmdCknKTtcbiAgICAgIHZhciByZXN1bHQgPSBpdGVtLmZ1bmMobGFzdFJlc3VsdCk7XG5cbiAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICBhc3luYyA9IHRydWU7XG4gICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uIChhc3luY1Jlc3VsdCkge1xuICAgICAgICAgIGl0ZW0ub25Eb25lKGFzeW5jUmVzdWx0KTtcbiAgICAgICAgICBfdGhpcy5wcm9jZXNzKGFzeW5jUmVzdWx0KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgcmVsZWFzZShlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5vbkRvbmUocmVzdWx0KTtcbiAgICAgICAgdGhpcy5wcm9jZXNzKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvbkRvbmU6IGZ1bmN0aW9uIG9uRG9uZShnZXRSZXN1bHQpIHtcbiAgICAgIGlmIChhc3luYykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGRvbmUsIHJlamVjdCkge1xuICAgICAgICAgIHJlbGVhc2UgPSBmdW5jdGlvbiByZWxlYXNlKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRvbmUoZ2V0UmVzdWx0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFJlc3VsdCgpO1xuICAgIH0sXG4gICAgaXNSdW5uaW5nOiBmdW5jdGlvbiBpc1J1bm5pbmcoKSB7XG4gICAgICByZXR1cm4gcnVubmluZztcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVHJlZTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgbm8tcmV0dXJuLWFzc2lnbiwgbWF4LWxlbiAqL1xudmFyIExPR1MgPSBmYWxzZTtcbnZhciBsb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gIHZhciBfY29uc29sZTtcblxuICByZXR1cm4gTE9HUyA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG59O1xuXG5mdW5jdGlvbiBUcmVlKCkge1xuICB2YXIgb25Ob2RlRW50ZXIgPSBbXTtcbiAgdmFyIG9uTm9kZU91dCA9IFtdO1xuICB2YXIgX29uTm9kZVJlbW92ZSA9IFtdO1xuICB2YXIgcm9vdCA9IGNyZWF0ZU5ld05vZGUoKTtcbiAgdmFyIGlkcyA9IDA7XG5cbiAgZnVuY3Rpb24gZ2V0SWQoKSB7XG4gICAgcmV0dXJuICdhJyArICsraWRzO1xuICB9O1xuICBmdW5jdGlvbiB1c2VTYW1lTm9kZShub2RlLCBuZXdFbGVtZW50KSB7XG4gICAgbmV3RWxlbWVudC5pbml0aWFsaXplKG5vZGUuZWxlbWVudC5pZCwgbm9kZS5lbGVtZW50LnVzZWQoKSk7XG4gICAgbm9kZS5lbGVtZW50ID0gbmV3RWxlbWVudDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBmdW5jdGlvbiB0cmVlRGlmZihvbGRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgaWYgKG9sZEVsZW1lbnQgJiYgb2xkRWxlbWVudC5uYW1lID09PSBuZXdFbGVtZW50Lm5hbWUpIHtcbiAgICAgIGlmIChvbGRFbGVtZW50LnByb3BzICYmIG5ld0VsZW1lbnQucHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIG9sZEVsZW1lbnQucHJvcHMua2V5ID09PSBuZXdFbGVtZW50LnByb3BzLmtleTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlTmV3Tm9kZShlbGVtZW50LCBwYXJlbnQpIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5pbml0aWFsaXplKGdldElkKCkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgY3Vyc29yOiAwLFxuICAgICAgZW50ZXI6IGZ1bmN0aW9uIGVudGVyKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGxvZygnLT4gJyArIHRoaXMuZWxlbWVudC5uYW1lKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmVudGVyKCk7XG4gICAgICAgIG9uTm9kZUVudGVyLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYyhfdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICBsb2coJzwtICcgKyB0aGlzLmVsZW1lbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5vdXQoKTtcbiAgICAgICAgLy8gSWYgdGhlcmUncmUgbW9yZSBub2RlcyBpbiB0aGUgdHJlZSB0aGFuIHdoYXQgd2FzIHByb2Nlc3NlZFxuICAgICAgICBpZiAodGhpcy5jdXJzb3IgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKHRoaXMuY3Vyc29yLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIHRoaXMuY3Vyc29yKS5mb3JFYWNoKGZ1bmN0aW9uIChyZW1vdmVkTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9vbk5vZGVSZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICByZXR1cm4gYyhyZW1vdmVkTm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnNvciA9IDA7XG4gICAgICAgIG9uTm9kZU91dC5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMyKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgYWRkQ2hpbGROb2RlOiBmdW5jdGlvbiBhZGRDaGlsZE5vZGUobmV3RWxlbWVudCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgY2hpbGROb2RlID0gdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl07XG5cbiAgICAgICAgLy8gdXNpbmcgdGhlIHNhbWUgbm9kZVxuICAgICAgICBpZiAoY2hpbGROb2RlICYmIHRyZWVEaWZmKGNoaWxkTm9kZS5lbGVtZW50LCBuZXdFbGVtZW50KSkge1xuICAgICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgICAgcmV0dXJuIHVzZVNhbWVOb2RlKGNoaWxkTm9kZSwgbmV3RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGluZyBhIG5ldyBub2RlXG4gICAgICAgIHZhciBuZXdDaGlsZE5vZGUgPSBjcmVhdGVOZXdOb2RlKG5ld0VsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSkge1xuICAgICAgICAgIF9vbk5vZGVSZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgcmV0dXJuIGMoX3RoaXMzLmNoaWxkcmVuW190aGlzMy5jdXJzb3JdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSA9IG5ld0NoaWxkTm9kZTtcbiAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkTm9kZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlUm9vdDogZnVuY3Rpb24gcmVzb2x2ZVJvb3QoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHJvb3QgPSB0cmVlRGlmZihyb290LmVsZW1lbnQsIGVsZW1lbnQpID8gdXNlU2FtZU5vZGUocm9vdCwgZWxlbWVudCkgOiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQpO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgcm9vdCA9IGNyZWF0ZU5ld05vZGUoKTtcbiAgICAgIGlkcyA9IDA7XG4gICAgfSxcbiAgICBnZXROdW1PZkVsZW1lbnRzOiBmdW5jdGlvbiBnZXROdW1PZkVsZW1lbnRzKCkge1xuICAgICAgcmV0dXJuIGlkcztcbiAgICB9LFxuICAgIGRpYWdub3NlOiBmdW5jdGlvbiBkaWFnbm9zZSgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBsb29wT3Zlcihub2RlKSB7XG4gICAgICAgIHZhciBpbmQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgICAgdmFyIF9yZWYgPSBub2RlLmVsZW1lbnQucHJvcHMgPyBub2RlLmVsZW1lbnQucHJvcHMgOiB7fSxcbiAgICAgICAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbixcbiAgICAgICAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydjaGlsZHJlbiddKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kOiBpbmQsXG4gICAgICAgICAgbmFtZTogbm9kZS5lbGVtZW50Lm5hbWUsXG4gICAgICAgICAgcHJvcHM6IF9leHRlbmRzKHtcbiAgICAgICAgICAgIGNoaWxkcmVuOiAnPGZ1bmN0aW9uIGNoaWxkcmVuPidcbiAgICAgICAgICB9LCByZXN0KSxcbiAgICAgICAgICB1c2VkOiBub2RlLmVsZW1lbnQudXNlZCgpLFxuICAgICAgICAgIGlkOiBub2RlLmVsZW1lbnQuaWQsXG4gICAgICAgICAgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvb3BPdmVyKGNoaWxkLCBpbmQgKyAxKTtcbiAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgfShyb290KTtcbiAgICB9LFxuICAgIGFkZE5vZGVFbnRlckNhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlRW50ZXJDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlRW50ZXIucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBhZGROb2RlT3V0Q2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlT3V0LnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIF9vbk5vZGVSZW1vdmUucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxudmFyIF9Db250ZXh0ID0gcmVxdWlyZSgnLi4vQ29udGV4dCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlRWxlbWVudEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50SG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChDb250ZXh0KSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICByZXR1cm4gQ29udGV4dFtfQ29udGV4dC5QVUJMSUNfQ09OVEVYVF9LRVldKCk7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFbGVtZW50SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZmFzdERlZXBFcXVhbCA9IHJlcXVpcmUoJ2Zhc3QtZGVlcC1lcXVhbCcpO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmFzdERlZXBFcXVhbCk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IGVmZmVjdHM6IFtdLCBjb25zdW1lcjogMCB9O1xuICB9LFxuICBjbGVhblVwOiBmdW5jdGlvbiBjbGVhblVwKGlkKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbaWRdKSB7XG4gICAgICBkZWxldGUgdGhpcy5lbGVtZW50c1tpZF07XG4gICAgfVxuICB9XG59O1xuXG52YXIgY3JlYXRlRWZmZWN0ID0gZnVuY3Rpb24gY3JlYXRlRWZmZWN0KGNhbGxiYWNrLCBkZXBzKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgIGRlcHM6IGRlcHNcbiAgfTtcbn07XG52YXIgdXBkYXRlRWZmZWN0ID0gZnVuY3Rpb24gdXBkYXRlRWZmZWN0KGVmZmVjdCwgY2FsbGJhY2ssIGRlcHMpIHtcbiAgZWZmZWN0LmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGVmZmVjdC5vbGREZXBzID0gZWZmZWN0LmRlcHM7XG4gIGVmZmVjdC5kZXBzID0gZGVwcztcbiAgcmV0dXJuIGVmZmVjdDtcbn07XG5cbmZ1bmN0aW9uIGRlcHNFcXVhbChvbGREZXBzLCBuZXdEZXBzKSB7XG4gIGlmICghb2xkRGVwcykgcmV0dXJuIGZhbHNlO1xuICBpZiAob2xkRGVwcy5sZW5ndGggIT09IG5ld0RlcHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAoMCwgX2Zhc3REZWVwRXF1YWwyLmRlZmF1bHQpKG9sZERlcHMsIG5ld0RlcHMpO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUVmZmVjdChub2RlLCBlZmZlY3QpIHtcbiAgdmFyIGRlcHMgPSBlZmZlY3QuZGVwcyxcbiAgICAgIG9sZERlcHMgPSBlZmZlY3Qub2xkRGVwcyxcbiAgICAgIGNhbGxiYWNrID0gZWZmZWN0LmNhbGxiYWNrO1xuXG5cbiAgaWYgKHR5cGVvZiBkZXBzID09PSAndW5kZWZpbmVkJykge1xuICAgIGVmZmVjdC5jbGVhblVwID0gY2FsbGJhY2soKTtcbiAgfSBlbHNlIGlmIChkZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChub2RlLmVsZW1lbnQudXNlZCgpID09PSAxKSB7XG4gICAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBhcmVFcXVhbCA9IGRlcHNFcXVhbChvbGREZXBzLCBkZXBzKTtcblxuICAgIGlmICghYXJlRXF1YWwpIHtcbiAgICAgIGVmZmVjdC5jbGVhblVwID0gY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIGNyZWF0ZVVzZUVmZmVjdEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFZmZlY3RIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgc3RvcmFnZS5lZmZlY3RzLmZvckVhY2goZnVuY3Rpb24gKGVmZmVjdCkge1xuICAgICAgaWYgKGVmZmVjdC5jbGVhblVwKSBlZmZlY3QuY2xlYW5VcCgpO1xuICAgIH0pO1xuICAgIFN0b3JhZ2UuY2xlYW5VcChub2RlLmVsZW1lbnQuaWQpO1xuICB9KTtcbiAgcHJvY2Vzc29yLm9uTm9kZU91dChmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIGlmIChzdG9yYWdlLmVmZmVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc3RvcmFnZS5lZmZlY3RzLmZvckVhY2goZnVuY3Rpb24gKGVmZmVjdCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZUVmZmVjdChub2RlLCBlZmZlY3QpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaywgZGVwcykge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIC8vIGZpcnN0IHJ1blxuICAgIGlmIChlbGVtZW50LnVzZWQoKSA9PT0gMCkge1xuICAgICAgc3RvcmFnZS5lZmZlY3RzLnB1c2goY3JlYXRlRWZmZWN0KGNhbGxiYWNrLCBkZXBzKSk7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGluZGV4ID0gc3RvcmFnZS5jb25zdW1lcjtcblxuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5lZmZlY3RzLmxlbmd0aCAtIDEgPyBzdG9yYWdlLmNvbnN1bWVyICsgMSA6IDA7XG4gICAgICB1cGRhdGVFZmZlY3Qoc3RvcmFnZS5lZmZlY3RzW2luZGV4XSwgY2FsbGJhY2ssIGRlcHMpO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVmZmVjdEhvb2s7XG5cblxuY3JlYXRlVXNlRWZmZWN0SG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNyZWF0ZVVzZUVsZW1lbnRIb29rID0gZnVuY3Rpb24gY3JlYXRlVXNlRWxlbWVudEhvb2socHJvY2Vzc29yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICByZXR1cm4gcHJvY2Vzc29yLm5vZGUoKS5lbGVtZW50O1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlRWxlbWVudEhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHViU3ViSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc3Vic2NyaWJlcnMgPSB7fTtcblxudmFyIHN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShlbGVtZW50LCB0eXBlLCBjYWxsYmFjaykge1xuICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdKSBzdWJzY3JpYmVyc1t0eXBlXSA9IHt9O1xuICBzdWJzY3JpYmVyc1t0eXBlXVtlbGVtZW50LmlkXSA9IGNhbGxiYWNrO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGRlbGV0ZSBzdWJzY3JpYmVyc1t0eXBlXVtlbGVtZW50LmlkXTtcbiAgfTtcbn07XG52YXIgcHVibGlzaCA9IGZ1bmN0aW9uIHB1Ymxpc2godHlwZSwgcGF5bG9hZCkge1xuICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdKSByZXR1cm47XG4gIE9iamVjdC5rZXlzKHN1YnNjcmliZXJzW3R5cGVdKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgIHN1YnNjcmliZXJzW3R5cGVdW2lkXShwYXlsb2FkKTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVVc2VQdWJTdWJIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIGlmIChzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdKSB7XG4gICAgICAgIGRlbGV0ZSBzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZWRFbGVtZW50KSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsID0gc2NvcGVkRWxlbWVudCB8fCBub2RlLmVsZW1lbnQ7XG4gICAgdmFyIHN1YnNjcmliZUZ1bmMgPSBmdW5jdGlvbiBzdWJzY3JpYmVGdW5jKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBwYXJhbXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdWJzY3JpYmUuYXBwbHkodW5kZWZpbmVkLCBbZWxdLmNvbmNhdChwYXJhbXMpKTtcbiAgICB9O1xuICAgIHZhciBwdWJsaXNoRnVuYyA9IGZ1bmN0aW9uIHB1Ymxpc2hGdW5jKCkge1xuICAgICAgcmV0dXJuIHB1Ymxpc2guYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmVGdW5jLFxuICAgICAgcHVibGlzaDogcHVibGlzaEZ1bmMsXG4gICAgICBzdWJzY3JpYmVyczogc3Vic2NyaWJlcnNcbiAgICB9O1xuICB9O1xufVxuXG5jcmVhdGVVc2VQdWJTdWJIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBzdWJzY3JpYmVycyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUmVkdWNlckhvb2s7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gY3JlYXRlRGlzcGF0Y2hFbGVtZW50KGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBhY3Rpb24gPSBfcmVmLmFjdGlvbixcbiAgICAgICAgcHJvcHNUb0FjdGlvbiA9IF9yZWYucHJvcHNUb0FjdGlvbixcbiAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2FjdGlvbicsICdwcm9wc1RvQWN0aW9uJ10pO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgZGlzcGF0Y2goYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHByb3BzVG9BY3Rpb24pIHtcbiAgICAgIGRpc3BhdGNoKHByb3BzVG9BY3Rpb24ocmVzdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJzxEaXNwYXRjaD4gZXhwZWN0cyBcImFjdGlvblwiIG9yIFwicHJvcHNUb0FjdGlvblwiIHByb3AuJyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVc2VSZWR1Y2VySG9vayh1c2VTdGF0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSkge1xuICAgIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZShpbml0aWFsU3RhdGUpLFxuICAgICAgICBfdXNlU3RhdGUyID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAyKSxcbiAgICAgICAgc3RhdGUgPSBfdXNlU3RhdGUyWzBdLFxuICAgICAgICBzZXRTdGF0ZSA9IF91c2VTdGF0ZTJbMV07XG5cbiAgICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgIHJldHVybiBzZXRTdGF0ZShyZWR1Y2VyKHN0YXRlKCksIGFjdGlvbikpO1xuICAgIH07XG5cbiAgICByZXR1cm4gW3N0YXRlLCBkaXNwYXRjaCwgY3JlYXRlRGlzcGF0Y2hFbGVtZW50KGRpc3BhdGNoKSwgLy8gPERpc3BhdGNoPlxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGF0ZSgpO1xuICAgIH0gLy8gPEdldFN0YXRlPlxuICAgIF07XG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlU3RhdGVIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTdG9yYWdlID0ge1xuICBlbGVtZW50czoge30sXG4gIGdldDogZnVuY3Rpb24gZ2V0KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdID0geyBzdGF0ZXM6IFtdLCBjb25zdW1lcjogMCB9O1xuICB9LFxuICBjbGVhblVwOiBmdW5jdGlvbiBjbGVhblVwKGlkKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbaWRdKSB7XG4gICAgICBkZWxldGUgdGhpcy5lbGVtZW50c1tpZF07XG4gICAgfVxuICB9XG59OyAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5mdW5jdGlvbiBjcmVhdGVVc2VTdGF0ZUhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gU3RvcmFnZS5jbGVhblVwKG5vZGUuZWxlbWVudC5pZCk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKGluaXRpYWxTdGF0ZSkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIHZhciBpbmRleCA9IHZvaWQgMDtcblxuICAgIC8vIGZpcnN0IHJ1blxuICAgIGlmIChlbGVtZW50LnVzZWQoKSA9PT0gMCkge1xuICAgICAgc3RvcmFnZS5zdGF0ZXMucHVzaChpbml0aWFsU3RhdGUpO1xuICAgICAgaW5kZXggPSBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxO1xuXG4gICAgICAvLyBvdGhlciBydW5zXG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gc3RvcmFnZS5jb25zdW1lcjtcbiAgICAgIHN0b3JhZ2UuY29uc3VtZXIgPSBpbmRleCA8IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDEgPyBzdG9yYWdlLmNvbnN1bWVyICsgMSA6IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RvcmFnZS5zdGF0ZXNbaW5kZXhdO1xuICAgIH0sIGZ1bmN0aW9uIChuZXdTdGF0ZSkge1xuICAgICAgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdID0gbmV3U3RhdGU7XG4gICAgICBpZiAoIWVsZW1lbnQuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgbm9kZS5yZXJ1bigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1dO1xuICB9O1xufVxuXG5jcmVhdGVVc2VTdGF0ZUhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIFN0b3JhZ2UuZWxlbWVudHMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNWYWxpZEhvb2tDb250ZXh0O1xuZnVuY3Rpb24gaXNWYWxpZEhvb2tDb250ZXh0KHByb2Nlc3Nvcikge1xuICBpZiAoIXByb2Nlc3Nvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHRlcnJpYmx5IHdyb25nIGhhcHBlbmVkLiBUaGUgaG9vayBmYWN0b3J5IGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRob3V0IGEgcHJvY2Vzc29yLicpO1xuICB9XG4gIGlmICghcHJvY2Vzc29yLm5vZGUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSG9va3MgbXVzdCBiZSBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgYW4gQWN0TUwgZWxlbWVudC4nKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNyZWF0ZVJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lO1xuXG52YXIgX1Byb2Nlc3NvciA9IHJlcXVpcmUoJy4vUHJvY2Vzc29yJyk7XG5cbnZhciBfUHJvY2Vzc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Byb2Nlc3Nvcik7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQgPSByZXF1aXJlKCcuL3V0aWxzL2lzQWN0TUxFbGVtZW50Jyk7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RNTEVsZW1lbnQpO1xuXG52YXIgX0FjdEVsZW1lbnQgPSByZXF1aXJlKCcuL0FjdEVsZW1lbnQnKTtcblxudmFyIF9BY3RFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdEVsZW1lbnQpO1xuXG52YXIgX3VzZUVsZW1lbnQgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVsZW1lbnQnKTtcblxudmFyIF91c2VFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVsZW1lbnQpO1xuXG52YXIgX3VzZVB1YlN1YiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHViU3ViJyk7XG5cbnZhciBfdXNlUHViU3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVB1YlN1Yik7XG5cbnZhciBfdXNlU3RhdGUgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVN0YXRlJyk7XG5cbnZhciBfdXNlU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlU3RhdGUpO1xuXG52YXIgX3VzZVJlZHVjZXIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVJlZHVjZXInKTtcblxudmFyIF91c2VSZWR1Y2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVJlZHVjZXIpO1xuXG52YXIgX3VzZUVmZmVjdCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWZmZWN0Jyk7XG5cbnZhciBfdXNlRWZmZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVmZmVjdCk7XG5cbnZhciBfdXNlQ29udGV4dCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlQ29udGV4dCcpO1xuXG52YXIgX3VzZUNvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlQ29udGV4dCk7XG5cbnZhciBfQ29udGV4dCA9IHJlcXVpcmUoJy4vQ29udGV4dCcpO1xuXG52YXIgX0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNyZWF0ZVJ1bnRpbWUoKSB7XG4gIHZhciBwcm9jZXNzb3IgPSAoMCwgX1Byb2Nlc3NvcjIuZGVmYXVsdCkoKTtcblxuICBmdW5jdGlvbiBBKGZ1bmMsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgY2hpbGRyZW5bX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiAoMCwgX0FjdEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmMsIHByb3BzLCBjaGlsZHJlbik7XG4gIH1cbiAgZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0ZWQuIEluc3RlYWQgJyArIGVsZW1lbnQudG9TdHJpbmcoKSArICcgcGFzc2VkLicpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvY2Vzc29yLnJ1bihlbGVtZW50KTtcbiAgfVxuICB2YXIgRnJhZ21lbnQgPSBmdW5jdGlvbiBGcmFnbWVudChfcmVmKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbjtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH07XG4gIHZhciB1c2VFbGVtZW50ID0gKDAsIF91c2VFbGVtZW50Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlU3RhdGUgPSAoMCwgX3VzZVN0YXRlMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlUHViU3ViID0gKDAsIF91c2VQdWJTdWIyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VSZWR1Y2VyID0gKDAsIF91c2VSZWR1Y2VyMi5kZWZhdWx0KSh1c2VTdGF0ZSk7XG4gIHZhciB1c2VFZmZlY3QgPSAoMCwgX3VzZUVmZmVjdDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZUNvbnRleHQgPSAoMCwgX3VzZUNvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciBjcmVhdGVDb250ZXh0ID0gKDAsIF9Db250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gIHJldHVybiB7XG4gICAgQTogQSxcbiAgICBydW46IHJ1bixcbiAgICBGcmFnbWVudDogRnJhZ21lbnQsXG4gICAgcHJvY2Vzc29yOiBwcm9jZXNzb3IsXG4gICAgdXNlRWxlbWVudDogdXNlRWxlbWVudCxcbiAgICB1c2VQdWJTdWI6IHVzZVB1YlN1YixcbiAgICB1c2VTdGF0ZTogdXNlU3RhdGUsXG4gICAgdXNlUmVkdWNlcjogdXNlUmVkdWNlcixcbiAgICB1c2VFZmZlY3Q6IHVzZUVmZmVjdCxcbiAgICB1c2VDb250ZXh0OiB1c2VDb250ZXh0LFxuICAgIGNyZWF0ZUNvbnRleHQ6IGNyZWF0ZUNvbnRleHRcbiAgfTtcbn1cblxudmFyIHJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZVJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0FjdE1MRWxlbWVudDtcbmZ1bmN0aW9uIGlzQWN0TUxFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5fX2FjdG1sID09PSB0cnVlO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBrZXlMaXN0ID0gT2JqZWN0LmtleXM7XG52YXIgaGFzUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuICAgIHZhciBhcnJBID0gaXNBcnJheShhKVxuICAgICAgLCBhcnJCID0gaXNBcnJheShiKVxuICAgICAgLCBpXG4gICAgICAsIGxlbmd0aFxuICAgICAgLCBrZXk7XG5cbiAgICBpZiAoYXJyQSAmJiBhcnJCKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgICAgaWYgKCFlcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGFyckEgIT0gYXJyQikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGRhdGVBID0gYSBpbnN0YW5jZW9mIERhdGVcbiAgICAgICwgZGF0ZUIgPSBiIGluc3RhbmNlb2YgRGF0ZTtcbiAgICBpZiAoZGF0ZUEgIT0gZGF0ZUIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZUEgJiYgZGF0ZUIpIHJldHVybiBhLmdldFRpbWUoKSA9PSBiLmdldFRpbWUoKTtcblxuICAgIHZhciByZWdleHBBID0gYSBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgLCByZWdleHBCID0gYiBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgICBpZiAocmVnZXhwQSAhPSByZWdleHBCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHJlZ2V4cEEgJiYgcmVnZXhwQikgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG5cbiAgICB2YXIga2V5cyA9IGtleUxpc3QoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cbiAgICBpZiAobGVuZ3RoICE9PSBrZXlMaXN0KGIpLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgIGlmICghaGFzUHJvcC5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIWVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGEhPT1hICYmIGIhPT1iO1xufTtcbiIsImltcG9ydCBDaXJjdWxhckpTT04gZnJvbSAnLi92ZW5kb3IvQ2lyY3VsYXJKU09OJztcbmltcG9ydCBTZXJpYWxpemVFcnJvciBmcm9tICcuL3ZlbmRvci9TZXJpYWxpemVFcnJvcic7XG5cbmNvbnN0IHsgc3RyaW5naWZ5IH0gPSBDaXJjdWxhckpTT047XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhbml0aXplKHNvbWV0aGluZywgc2hvd0Vycm9ySW5Db25zb2xlID0gZmFsc2UpIHtcbiAgdmFyIHJlc3VsdDtcblxuICB0cnkge1xuICAgIHJlc3VsdCA9IEpTT04ucGFyc2Uoc3RyaW5naWZ5KHNvbWV0aGluZywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLm5hbWUgPT09ICcnID8gJzxhbm9ueW1vdXM+JyA6IGBmdW5jdGlvbiAkeyB2YWx1ZS5uYW1lIH0oKWA7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXR1cm4gU2VyaWFsaXplRXJyb3IodmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sIHVuZGVmaW5lZCwgdHJ1ZSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChzaG93RXJyb3JJbkNvbnNvbGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gICAgcmVzdWx0ID0gbnVsbDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vKiFcbkNvcHlyaWdodCAoQykgMjAxMy0yMDE3IGJ5IEFuZHJlYSBHaWFtbWFyY2hpIC0gQFdlYlJlZmxlY3Rpb25cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuXG4qL1xudmFyXG4vLyBzaG91bGQgYmUgYSBub3Qgc28gY29tbW9uIGNoYXJcbi8vIHBvc3NpYmx5IG9uZSBKU09OIGRvZXMgbm90IGVuY29kZVxuLy8gcG9zc2libHkgb25lIGVuY29kZVVSSUNvbXBvbmVudCBkb2VzIG5vdCBlbmNvZGVcbi8vIHJpZ2h0IG5vdyB0aGlzIGNoYXIgaXMgJ34nIGJ1dCB0aGlzIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlXG5zcGVjaWFsQ2hhciA9ICd+JyxcbnNhZmVTcGVjaWFsQ2hhciA9ICdcXFxceCcgKyAoXG4gICcwJyArIHNwZWNpYWxDaGFyLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpXG4pLnNsaWNlKC0yKSxcbmVzY2FwZWRTYWZlU3BlY2lhbENoYXIgPSAnXFxcXCcgKyBzYWZlU3BlY2lhbENoYXIsXG5zcGVjaWFsQ2hhclJHID0gbmV3IFJlZ0V4cChzYWZlU3BlY2lhbENoYXIsICdnJyksXG5zYWZlU3BlY2lhbENoYXJSRyA9IG5ldyBSZWdFeHAoZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciwgJ2cnKSxcblxuc2FmZVN0YXJ0V2l0aFNwZWNpYWxDaGFyUkcgPSBuZXcgUmVnRXhwKCcoPzpefChbXlxcXFxcXFxcXSkpJyArIGVzY2FwZWRTYWZlU3BlY2lhbENoYXIpLFxuXG5pbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbih2KXtcbiAgZm9yKHZhciBpPXRoaXMubGVuZ3RoO2ktLSYmdGhpc1tpXSE9PXY7KTtcbiAgcmV0dXJuIGk7XG59LFxuJFN0cmluZyA9IFN0cmluZyAgLy8gdGhlcmUncyBubyB3YXkgdG8gZHJvcCB3YXJuaW5ncyBpbiBKU0hpbnRcbiAgICAgICAgICAgICAgICAgIC8vIGFib3V0IG5ldyBTdHJpbmcgLi4uIHdlbGwsIEkgbmVlZCB0aGF0IGhlcmUhXG4gICAgICAgICAgICAgICAgICAvLyBmYWtlZCwgYW5kIGhhcHB5IGxpbnRlciFcbjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVSZXBsYWNlcih2YWx1ZSwgcmVwbGFjZXIsIHJlc29sdmUpIHtcbnZhclxuICBpbnNwZWN0ID0gISFyZXBsYWNlcixcbiAgcGF0aCA9IFtdLFxuICBhbGwgID0gW3ZhbHVlXSxcbiAgc2VlbiA9IFt2YWx1ZV0sXG4gIG1hcHAgPSBbcmVzb2x2ZSA/IHNwZWNpYWxDaGFyIDogJzxjaXJjdWxhcj4nXSxcbiAgbGFzdCA9IHZhbHVlLFxuICBsdmwgID0gMSxcbiAgaSwgZm5cbjtcbmlmIChpbnNwZWN0KSB7XG4gIGZuID0gdHlwZW9mIHJlcGxhY2VyID09PSAnb2JqZWN0JyA/XG4gICAgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBrZXkgIT09ICcnICYmIHJlcGxhY2VyLmluZGV4T2Yoa2V5KSA8IDAgPyB2b2lkIDAgOiB2YWx1ZTtcbiAgICB9IDpcbiAgICByZXBsYWNlcjtcbn1cbnJldHVybiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gIC8vIHRoZSByZXBsYWNlciBoYXMgcmlnaHRzIHRvIGRlY2lkZVxuICAvLyBpZiBhIG5ldyBvYmplY3Qgc2hvdWxkIGJlIHJldHVybmVkXG4gIC8vIG9yIGlmIHRoZXJlJ3Mgc29tZSBrZXkgdG8gZHJvcFxuICAvLyBsZXQncyBjYWxsIGl0IGhlcmUgcmF0aGVyIHRoYW4gXCJ0b28gbGF0ZVwiXG4gIGlmIChpbnNwZWN0KSB2YWx1ZSA9IGZuLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG5cbiAgLy8gZGlkIHlvdSBrbm93ID8gU2FmYXJpIHBhc3NlcyBrZXlzIGFzIGludGVnZXJzIGZvciBhcnJheXNcbiAgLy8gd2hpY2ggbWVhbnMgaWYgKGtleSkgd2hlbiBrZXkgPT09IDAgd29uJ3QgcGFzcyB0aGUgY2hlY2tcbiAgaWYgKGtleSAhPT0gJycpIHtcbiAgICBpZiAobGFzdCAhPT0gdGhpcykge1xuICAgICAgaSA9IGx2bCAtIGluZGV4T2YuY2FsbChhbGwsIHRoaXMpIC0gMTtcbiAgICAgIGx2bCAtPSBpO1xuICAgICAgYWxsLnNwbGljZShsdmwsIGFsbC5sZW5ndGgpO1xuICAgICAgcGF0aC5zcGxpY2UobHZsIC0gMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgbGFzdCA9IHRoaXM7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGx2bCwga2V5LCBwYXRoKTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCByZWZlcnJpbmcgdG8gcGFyZW50IG9iamVjdCwgYWRkIHRvIHRoZVxuICAgICAgLy8gb2JqZWN0IHBhdGggc3RhY2suIE90aGVyd2lzZSBpdCBpcyBhbHJlYWR5IHRoZXJlLlxuICAgICAgaWYgKGluZGV4T2YuY2FsbChhbGwsIHZhbHVlKSA8IDApIHtcbiAgICAgICAgYWxsLnB1c2gobGFzdCA9IHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGx2bCA9IGFsbC5sZW5ndGg7XG4gICAgICBpID0gaW5kZXhPZi5jYWxsKHNlZW4sIHZhbHVlKTtcbiAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICBpID0gc2Vlbi5wdXNoKHZhbHVlKSAtIDE7XG4gICAgICAgIGlmIChyZXNvbHZlKSB7XG4gICAgICAgICAgLy8ga2V5IGNhbm5vdCBjb250YWluIHNwZWNpYWxDaGFyIGJ1dCBjb3VsZCBiZSBub3QgYSBzdHJpbmdcbiAgICAgICAgICBwYXRoLnB1c2goKCcnICsga2V5KS5yZXBsYWNlKHNwZWNpYWxDaGFyUkcsIHNhZmVTcGVjaWFsQ2hhcikpO1xuICAgICAgICAgIG1hcHBbaV0gPSBzcGVjaWFsQ2hhciArIHBhdGguam9pbihzcGVjaWFsQ2hhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFwcFtpXSA9IG1hcHBbMF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gbWFwcFtpXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVzb2x2ZSkge1xuICAgICAgICAvLyBlbnN1cmUgbm8gc3BlY2lhbCBjaGFyIGludm9sdmVkIG9uIGRlc2VyaWFsaXphdGlvblxuICAgICAgICAvLyBpbiB0aGlzIGNhc2Ugb25seSBmaXJzdCBjaGFyIGlzIGltcG9ydGFudFxuICAgICAgICAvLyBubyBuZWVkIHRvIHJlcGxhY2UgYWxsIHZhbHVlIChiZXR0ZXIgcGVyZm9ybWFuY2UpXG4gICAgICAgIHZhbHVlID0gdmFsdWUgLnJlcGxhY2Uoc2FmZVNwZWNpYWxDaGFyLCBlc2NhcGVkU2FmZVNwZWNpYWxDaGFyKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHNwZWNpYWxDaGFyLCBzYWZlU3BlY2lhbENoYXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xufVxuXG5mdW5jdGlvbiByZXRyaWV2ZUZyb21QYXRoKGN1cnJlbnQsIGtleXMpIHtcbmZvcih2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBjdXJyZW50ID0gY3VycmVudFtcbiAgLy8ga2V5cyBzaG91bGQgYmUgbm9ybWFsaXplZCBiYWNrIGhlcmVcbiAga2V5c1tpKytdLnJlcGxhY2Uoc2FmZVNwZWNpYWxDaGFyUkcsIHNwZWNpYWxDaGFyKVxuXSk7XG5yZXR1cm4gY3VycmVudDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSZXZpdmVyKHJldml2ZXIpIHtcbnJldHVybiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gIHZhciBpc1N0cmluZyA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gIGlmIChpc1N0cmluZyAmJiB2YWx1ZS5jaGFyQXQoMCkgPT09IHNwZWNpYWxDaGFyKSB7XG4gICAgcmV0dXJuIG5ldyAkU3RyaW5nKHZhbHVlLnNsaWNlKDEpKTtcbiAgfVxuICBpZiAoa2V5ID09PSAnJykgdmFsdWUgPSByZWdlbmVyYXRlKHZhbHVlLCB2YWx1ZSwge30pO1xuICAvLyBhZ2Fpbiwgb25seSBvbmUgbmVlZGVkLCBkbyBub3QgdXNlIHRoZSBSZWdFeHAgZm9yIHRoaXMgcmVwbGFjZW1lbnRcbiAgLy8gb25seSBrZXlzIG5lZWQgdGhlIFJlZ0V4cFxuICBpZiAoaXNTdHJpbmcpIHZhbHVlID0gdmFsdWUgLnJlcGxhY2Uoc2FmZVN0YXJ0V2l0aFNwZWNpYWxDaGFyUkcsICckMScgKyBzcGVjaWFsQ2hhcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKGVzY2FwZWRTYWZlU3BlY2lhbENoYXIsIHNhZmVTcGVjaWFsQ2hhcik7XG4gIHJldHVybiByZXZpdmVyID8gcmV2aXZlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpIDogdmFsdWU7XG59O1xufVxuXG5mdW5jdGlvbiByZWdlbmVyYXRlQXJyYXkocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIHtcbmZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gIGN1cnJlbnRbaV0gPSByZWdlbmVyYXRlKHJvb3QsIGN1cnJlbnRbaV0sIHJldHJpZXZlKTtcbn1cbnJldHVybiBjdXJyZW50O1xufVxuXG5mdW5jdGlvbiByZWdlbmVyYXRlT2JqZWN0KHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSB7XG5mb3IgKHZhciBrZXkgaW4gY3VycmVudCkge1xuICBpZiAoY3VycmVudC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgY3VycmVudFtrZXldID0gcmVnZW5lcmF0ZShyb290LCBjdXJyZW50W2tleV0sIHJldHJpZXZlKTtcbiAgfVxufVxucmV0dXJuIGN1cnJlbnQ7XG59XG5cbmZ1bmN0aW9uIHJlZ2VuZXJhdGUocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIHtcbnJldHVybiBjdXJyZW50IGluc3RhbmNlb2YgQXJyYXkgP1xuICAvLyBmYXN0IEFycmF5IHJlY29uc3RydWN0aW9uXG4gIHJlZ2VuZXJhdGVBcnJheShyb290LCBjdXJyZW50LCByZXRyaWV2ZSkgOlxuICAoXG4gICAgY3VycmVudCBpbnN0YW5jZW9mICRTdHJpbmcgP1xuICAgICAgKFxuICAgICAgICAvLyByb290IGlzIGFuIGVtcHR5IHN0cmluZ1xuICAgICAgICBjdXJyZW50Lmxlbmd0aCA/XG4gICAgICAgICAgKFxuICAgICAgICAgICAgcmV0cmlldmUuaGFzT3duUHJvcGVydHkoY3VycmVudCkgP1xuICAgICAgICAgICAgICByZXRyaWV2ZVtjdXJyZW50XSA6XG4gICAgICAgICAgICAgIHJldHJpZXZlW2N1cnJlbnRdID0gcmV0cmlldmVGcm9tUGF0aChcbiAgICAgICAgICAgICAgICByb290LCBjdXJyZW50LnNwbGl0KHNwZWNpYWxDaGFyKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgKSA6XG4gICAgICAgICAgcm9vdFxuICAgICAgKSA6XG4gICAgICAoXG4gICAgICAgIGN1cnJlbnQgaW5zdGFuY2VvZiBPYmplY3QgP1xuICAgICAgICAgIC8vIGRlZGljYXRlZCBPYmplY3QgcGFyc2VyXG4gICAgICAgICAgcmVnZW5lcmF0ZU9iamVjdChyb290LCBjdXJyZW50LCByZXRyaWV2ZSkgOlxuICAgICAgICAgIC8vIHZhbHVlIGFzIGl0IGlzXG4gICAgICAgICAgY3VycmVudFxuICAgICAgKVxuICApXG47XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVJlY3Vyc2lvbih2YWx1ZSwgcmVwbGFjZXIsIHNwYWNlLCBkb05vdFJlc29sdmUpIHtcbnJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgZ2VuZXJhdGVSZXBsYWNlcih2YWx1ZSwgcmVwbGFjZXIsICFkb05vdFJlc29sdmUpLCBzcGFjZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUmVjdXJzaW9uKHRleHQsIHJldml2ZXIpIHtcbnJldHVybiBKU09OLnBhcnNlKHRleHQsIGdlbmVyYXRlUmV2aXZlcihyZXZpdmVyKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlSZWN1cnNpb24sXG4gIHBhcnNlOiBwYXJzZVJlY3Vyc2lvblxufSIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vLyBDcmVkaXRzOiBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3NlcmlhbGl6ZS1lcnJvclxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsdWUgPT4ge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBkZXN0cm95Q2lyY3VsYXIodmFsdWUsIFtdKTtcblx0fVxuXG5cdC8vIFBlb3BsZSBzb21ldGltZXMgdGhyb3cgdGhpbmdzIGJlc2lkZXMgRXJyb3Igb2JqZWN0cywgc2/igKZcblxuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gSlNPTi5zdHJpbmdpZnkgZGlzY2FyZHMgZnVuY3Rpb25zLiBXZSBkbyB0b28sIHVubGVzcyBhIGZ1bmN0aW9uIGlzIHRocm93biBkaXJlY3RseS5cblx0XHRyZXR1cm4gYFtGdW5jdGlvbjogJHsodmFsdWUubmFtZSB8fCAnYW5vbnltb3VzJyl9XWA7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9kZXN0cm95LWNpcmN1bGFyXG5mdW5jdGlvbiBkZXN0cm95Q2lyY3VsYXIoZnJvbSwgc2Vlbikge1xuXHRjb25zdCB0byA9IEFycmF5LmlzQXJyYXkoZnJvbSkgPyBbXSA6IHt9O1xuXG5cdHNlZW4ucHVzaChmcm9tKTtcblxuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhmcm9tKSkge1xuXHRcdGNvbnN0IHZhbHVlID0gZnJvbVtrZXldO1xuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG5cdFx0XHR0b1trZXldID0gdmFsdWU7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoc2Vlbi5pbmRleE9mKGZyb21ba2V5XSkgPT09IC0xKSB7XG5cdFx0XHR0b1trZXldID0gZGVzdHJveUNpcmN1bGFyKGZyb21ba2V5XSwgc2Vlbi5zbGljZSgwKSk7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR0b1trZXldID0gJ1tDaXJjdWxhcl0nO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBmcm9tLm5hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0dG8ubmFtZSA9IGZyb20ubmFtZTtcblx0fVxuXG5cdGlmICh0eXBlb2YgZnJvbS5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuXHRcdHRvLm1lc3NhZ2UgPSBmcm9tLm1lc3NhZ2U7XG5cdH1cblxuXHRpZiAodHlwZW9mIGZyb20uc3RhY2sgPT09ICdzdHJpbmcnKSB7XG5cdFx0dG8uc3RhY2sgPSBmcm9tLnN0YWNrO1xuXHR9XG5cblx0cmV0dXJuIHRvO1xufSIsImNvbnN0IEVOVEVSID0gJ0VOVEVSJztcbmNvbnN0IE9VVCA9ICdPVVQnO1xuY29uc3QgUkVNT1ZFID0gJ1JFTU9WRSc7XG5cbmltcG9ydCBzYW5pdGl6ZSBmcm9tICcuL2hlbHBlcnMvc2FuaXRpemUnO1xuXG5mdW5jdGlvbiBwcmludFNuYXBzaG90VG9Db25zb2xlKHNuYXBzaG90KSB7XG4gIGxldCBzdHIgPSAnJztcbiAgbGV0IGFkZEluZCA9IGluZCA9PiB7XG4gICAgbGV0IHMgPSAnJywgaSA9IDA7XG5cbiAgICBmb3IgKDtpIDwgaW5kOyBpKyspIHMgKz0gJyAgJztcbiAgICByZXR1cm4gcztcbiAgfTtcblxuICAoZnVuY3Rpb24gbG9vcCh7IGluZCwgbmFtZSwgdXNlZCwgY2hpbGRyZW4gfSkge1xuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIHN0ciArPSBgJHsgYWRkSW5kKGluZCkgfTwkeyBuYW1lIH0gLz4gKCR7IHVzZWQgfSlcXG5gO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzdHIgKz0gYWRkSW5kKGluZCk7XG4gICAgc3RyICs9IGA8JHsgbmFtZSB9PiAoJHsgdXNlZCB9KVxcbmA7XG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gbG9vcChjaGlsZCkpO1xuICAgIH1cbiAgICBzdHIgKz0gYWRkSW5kKGluZCk7XG4gICAgc3RyICs9IGA8LyR7IG5hbWUgfT5cXG5gO1xuICB9KShzbmFwc2hvdC50cmVlKTtcblxuICBjb25zb2xlLmNsZWFyKCk7XG4gIGNvbnNvbGUubG9nKHN0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluc3BlY3Rvcihwcm9jZXNzb3IpIHtcbiAgY29uc3Qgc25hcHNob3RzID0gW107XG5cbiAgZnVuY3Rpb24gc25hcHNob3QodHlwZSwgbm9kZSkge1xuICAgIGNvbnN0IHsgY2hpbGRyZW4sIC4uLnJlc3QgfSA9IG5vZGUuZWxlbWVudC5wcm9wcyA/IG5vZGUuZWxlbWVudC5wcm9wcyA6IHt9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICBzbmFwc2hvdHMucHVzaChzYW5pdGl6ZSh7XG4gICAgICB0eXBlLFxuICAgICAgZWxlbWVudDoge1xuICAgICAgICBuYW1lOiBub2RlLmVsZW1lbnQubmFtZSxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBjaGlsZHJlbjogJzxmdW5jdGlvbiBjaGlsZHJlbj4nLFxuICAgICAgICAgIC4uLnJlc3RcbiAgICAgICAgfSxcbiAgICAgICAgdXNlZDogbm9kZS5lbGVtZW50LnVzZWQoKSxcbiAgICAgICAgaWQ6IG5vZGUuZWxlbWVudC5pZFxuICAgICAgfSxcbiAgICAgIHRyZWU6IHByb2Nlc3Nvci5zeXN0ZW0oKS50cmVlLmRpYWdub3NlKClcbiAgICB9KSk7XG4gICAgcHJpbnRTbmFwc2hvdFRvQ29uc29sZShzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG4gIHByb2Nlc3Nvci5vbk5vZGVFbnRlcihub2RlID0+IHNuYXBzaG90KEVOVEVSLCBub2RlKSk7XG4gIHByb2Nlc3Nvci5vbk5vZGVPdXQobm9kZSA9PiBzbmFwc2hvdChPVVQsIG5vZGUpKTtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShub2RlID0+IHNuYXBzaG90KFJFTU9WRSwgbm9kZSkpO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQyOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZvY3VzRmllbGQgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENoZWNrRm9yRWRpdEZpZWxkKHsgdG9kb3MgfSkge1xuICByZXR1cm4gPEZvY3VzRmllbGQgaW5kZXg9eyB0b2Rvcy5maW5kSW5kZXgoKHsgZWRpdGluZyB9KSA9PiBlZGl0aW5nKSB9IC8+O1xufVxuIiwiaW1wb3J0IHtcbiAgVE9HR0xFLFxuICBORVdfVE9ETyxcbiAgREVMRVRFLFxuICBFRElULFxuICBFRElUX1RPRE8sXG4gIENMRUFSX0NPTVBMRVRFRFxufSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCB7XG4gIEZJTFRFUl9BTEwsXG4gIEZJTFRFUl9BQ1RJVkUsXG4gIEZJTFRFUl9DT01QTEVURURcbn0gZnJvbSAnLi8nO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuY29uc3QgJCA9IChzZWxlY3RvcikgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5jb25zdCBsaXN0ID0gJCgnLnRvZG8tbGlzdCcpO1xuY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuXG5jb25zdCBFTlRFUiA9IDEzO1xuY29uc3QgRVNDID0gMjc7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQ29udGFpbmVyKHsgY2hpbGRyZW4gfSkge1xuICBsaXN0LmlubmVySFRNTCA9IGNoaWxkcmVuKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdG9nZ2xlJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKFRPR0dMRSwgdG9kb0luZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWRlbGV0ZScpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihERUxFVEUsIHRvZG9JbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWxhYmVsJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEVESVQsIHRvZG9JbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpICYmIGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEVESVRfVE9ETywgeyBpbmRleDogdG9kb0luZGV4LCBsYWJlbDogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFU0MpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEVESVQsIHRvZG9JbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmV3JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICBvblVzZXJBY3Rpb24oTkVXX1RPRE8sIGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgZS50YXJnZXQudmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgW10pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIEZvY3VzRmllbGQoeyBpbmRleCB9KSB7XG4gIGNvbnN0IGVsID0gJChgLmVkaXRbZGF0YS1pbmRleD1cIiR7IGluZGV4IH1cIl1gKTtcblxuICBpZiAoZWwpIHtcbiAgICBlbC5mb2N1cygpO1xuICAgIGVsLnNlbGVjdGlvblN0YXJ0ID0gZWwuc2VsZWN0aW9uRW5kID0gZWwudmFsdWUubGVuZ3RoO1xuICB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIFByb2dyZXNzQ2hlY2tlcih7IHRvZG9zIH0pIHtcbiAgY29uc3QgY29tcGxldGVkID0gdG9kb3MuZmlsdGVyKCh7IGNvbXBsZXRlZCB9KSA9PiBjb21wbGV0ZWQpLmxlbmd0aDtcbiAgY29uc3QgaXRlbXNMZWZ0ID0gdG9kb3MubGVuZ3RoIC0gY29tcGxldGVkO1xuXG4gICQoJ1tkYXRhLWNvdW50XScpLmlubmVySFRNTCA9IGBcbiAgICA8c3Ryb25nPiR7IGl0ZW1zTGVmdCB9PC9zdHJvbmc+ICR7IGl0ZW1zTGVmdCA+IDEgfHwgaXRlbXNMZWZ0ID09PSAwID8gJ2l0ZW1zJyA6ICdpdGVtJyB9IGxlZnRcbiAgYDtcbn07XG5leHBvcnQgZnVuY3Rpb24gRm9vdGVyKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAkKCdbZGF0YS1maWx0ZXJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hbGwnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0FMTCk7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0FDVElWRSk7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1jb21wbGV0ZWQnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0NPTVBMRVRFRCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgJCgnW2RhdGEtY2xlYXItY29tcGxldGVkXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgb25Vc2VyQWN0aW9uKENMRUFSX0NPTVBMRVRFRCk7XG4gICAgfSk7XG4gIH0sIFtdKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlsdGVyT3B0aW9uc1RhYnMoeyBmaWx0ZXIgfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICQoJ1tkYXRhLWFsbF0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUxMID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgICAkKCdbZGF0YS1hY3RpdmVdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICAgJCgnW2RhdGEtY29tcGxldGVkXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQgPyAnc2VsZWN0ZWQnIDogJycpO1xuICB9LCBbIGZpbHRlciBdKTtcbn1cbiIsImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vU3RvcmUnO1xuXG5jb25zdCBpbml0aWFsVmFsdWUgPSBKU09OLnN0cmluZ2lmeShbXG4gIFRvRG8oeyBsYWJlbDogJ0FjdE1MIGlzIHVzaW5nIEpTWCcgfSksXG4gIFRvRG8oeyBsYWJlbDogJ0l0IGlzIGxpa2UgUmVhY3QgYnV0IG5vdCBmb3IgcmVuZGVyaW5nJyB9KVxuXSk7XG5cbmV4cG9ydCBjb25zdCB1c2VMb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IFsgZ2V0RGF0YSBdID0gdXNlU3RhdGUoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSB8fCBpbml0aWFsVmFsdWUpKTtcblxuICByZXR1cm4gZ2V0RGF0YSgpO1xufTtcbmV4cG9ydCBjb25zdCBQZXJzaXN0ID0gKHsgdG9kb3MgfSkgPT4ge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGaWxsQ29udGFpbmVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgRklMVEVSX0FMTCwgRklMVEVSX0FDVElWRSwgRklMVEVSX0NPTVBMRVRFRCB9IGZyb20gJy4vJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyZXIoeyB0b2RvcywgZmlsdGVyIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8RmlsbENvbnRhaW5lcj5cbiAgICAgIHtcbiAgICAgICAgKCkgPT4gdG9kb3NcbiAgICAgICAgLmZpbHRlcigoeyBjb21wbGV0ZWQgfSkgPT4ge1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BTEwpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BQ1RJVkUpIHJldHVybiAhY29tcGxldGVkO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQpIHJldHVybiBjb21wbGV0ZWQ7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KS5tYXAoKHRvZG8sIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBsaUNsYXNzID0gdG9kby5lZGl0aW5nID8gJ2VkaXRpbmcnIDogKHRvZG8uY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJyk7XG5cbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPSckeyBsaUNsYXNzIH0nPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlXG4gICAgICAgICAgICAgICAgICAkeyB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnIH0+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWxhYmVsPiR7IHRvZG8ubGFiZWwgfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkZXN0cm95XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS1kZWxldGU+PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZGl0XCIgdmFsdWU9XCIkeyB0b2RvLmxhYmVsIH1cIiBkYXRhLWluZGV4PVwiJHsgaSB9XCIgZGF0YS1lZGl0PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICBgO1xuICAgICAgICB9KS5qb2luKCcnKVxuICAgICAgfVxuICAgIDwvRmlsbENvbnRhaW5lcj5cbiAgKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyB1c2VSZWR1Y2VyLCB1c2VQdWJTdWIsIHVzZUVmZmVjdCB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmV4cG9ydCBjb25zdCBUT0dHTEUgPSAnVE9HR0xFJztcbmV4cG9ydCBjb25zdCBORVdfVE9ETyA9ICdORVdfVE9ETyc7XG5leHBvcnQgY29uc3QgREVMRVRFID0gJ0RFTEVURSc7XG5leHBvcnQgY29uc3QgRURJVCA9ICdFRElUJztcbmV4cG9ydCBjb25zdCBFRElUX1RPRE8gPSAnRURJVF9UT0RPJztcbmV4cG9ydCBjb25zdCBDTEVBUl9DT01QTEVURUQgPSAnQ0xFQVJfQ09NUExFVEVEJztcblxuY29uc3QgdG9nZ2xlID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogVE9HR0xFLCB0b2RvSW5kZXggfSk7XG5jb25zdCBkZWxldGVUb2RvID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogREVMRVRFLCB0b2RvSW5kZXggfSk7XG5jb25zdCBuZXdUb2RvID0gKGxhYmVsKSA9PiAoeyB0eXBlOiBORVdfVE9ETywgbGFiZWwgfSk7XG5jb25zdCBlZGl0ID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogRURJVCwgdG9kb0luZGV4IH0pO1xuY29uc3QgZWRpdFRvRG8gPSAoeyBpbmRleCwgbGFiZWwgfSkgPT4gKHsgdHlwZTogRURJVF9UT0RPLCBpbmRleCwgbGFiZWwgfSk7XG5jb25zdCBjbGVhckNvbXBsZXRlZCA9ICgpID0+ICh7IHR5cGU6IENMRUFSX0NPTVBMRVRFRCB9KTtcblxuZXhwb3J0IGNvbnN0IFRvRG8gPSAoeyBsYWJlbCB9KSA9PiAoeyBsYWJlbCwgY29tcGxldGVkOiBmYWxzZSwgZWRpdGluZzogZmFsc2UgfSk7XG5cbmNvbnN0IHJlZHVjZXIgPSBmdW5jdGlvbiAodG9kb3MsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBUT0dHTEU6XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi50b2RvSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGNvbXBsZXRlZDogIXRvZG8uY29tcGxldGVkXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVDpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgZWRpdGluZzogIXRvZG8uZWRpdGluZ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICBjYXNlIEVESVRfVE9ETzpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLmluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBsYWJlbDogYWN0aW9uLmxhYmVsLFxuICAgICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBORVdfVE9ETzpcbiAgICAgIHJldHVybiBbIC4uLnRvZG9zLCBUb0RvKHsgbGFiZWw6IGFjdGlvbi5sYWJlbCB9KSBdO1xuICAgIGNhc2UgREVMRVRFOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbywgaW5kZXgpID0+IGluZGV4ICE9PSBhY3Rpb24udG9kb0luZGV4KTtcbiAgICBjYXNlIENMRUFSX0NPTVBMRVRFRDpcbiAgICAgIHJldHVybiB0b2Rvcy5maWx0ZXIoKHRvZG8pID0+ICF0b2RvLmNvbXBsZXRlZCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0b2RvcztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RvcmUoeyBpbml0aWFsVmFsdWUsIGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgWyB0b2RvcywgZGlzcGF0Y2ggXSA9IHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFZhbHVlKTtcbiAgY29uc3QgeyBzdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3Vic2NyaWJlKFRPR0dMRSwgKHRvZG9JbmRleCkgPT4gZGlzcGF0Y2godG9nZ2xlKHRvZG9JbmRleCkpKTtcbiAgICBzdWJzY3JpYmUoTkVXX1RPRE8sIChsYWJlbCkgPT4gZGlzcGF0Y2gobmV3VG9kbyhsYWJlbCkpKTtcbiAgICBzdWJzY3JpYmUoREVMRVRFLCAodG9kb0luZGV4KSA9PiBkaXNwYXRjaChkZWxldGVUb2RvKHRvZG9JbmRleCkpKTtcbiAgICBzdWJzY3JpYmUoRURJVCwgKGxhYmVsKSA9PiBkaXNwYXRjaChlZGl0KGxhYmVsKSkpO1xuICAgIHN1YnNjcmliZShFRElUX1RPRE8sIChwYXlsb2FkKSA9PiBkaXNwYXRjaChlZGl0VG9EbyhwYXlsb2FkKSkpO1xuICAgIHN1YnNjcmliZShDTEVBUl9DT01QTEVURUQsICgpID0+IGRpc3BhdGNoKGNsZWFyQ29tcGxldGVkKCkpKTtcbiAgfSwgW10pO1xuXG4gIGNoaWxkcmVuKHsgdG9kb3M6IHRvZG9zKCkgfSk7XG59XG4iLCIvKiogQGpzeCBBICovXG5pbXBvcnQgeyBBLCBydW4sIEZyYWdtZW50LCB1c2VQdWJTdWIsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHByb2Nlc3NvciB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5pbXBvcnQgaW5zcGVjdG9yIGZyb20gJy4uLy4uLy4uL3BhY2thZ2VzL2luc3BlY3Rvcic7XG5cbmluc3BlY3Rvcihwcm9jZXNzb3IpO1xuXG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgQ2hlY2tGb3JFZGl0RmllbGQgZnJvbSAnLi9DaGVja0ZvckVkaXRGaWVsZCc7XG5pbXBvcnQgeyBQcm9ncmVzc0NoZWNrZXIsIEZpbHRlck9wdGlvbnNUYWJzLCBDb250YWluZXIsIEZvb3RlciB9IGZyb20gJy4vRE9NJztcbmltcG9ydCB7IHVzZUxvY2FsU3RvcmFnZSwgUGVyc2lzdCB9IGZyb20gJy4vUGVyc2lzdCc7XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfQUxMID0gJ0ZJTFRFUl9BTEwnO1xuZXhwb3J0IGNvbnN0IEZJTFRFUl9BQ1RJVkUgPSAnRklMVEVSX0FDVElWRSc7XG5leHBvcnQgY29uc3QgRklMVEVSX0NPTVBMRVRFRCA9ICdGSUxURVJfQ09NUExFVEVEJztcblxuZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCBpbml0aWFsVmFsdWUgPSB1c2VMb2NhbFN0b3JhZ2UoKTtcbiAgY29uc3QgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuICBjb25zdCBbIGZpbHRlciwgc2V0RmlsdGVyIF0gPSB1c2VTdGF0ZShGSUxURVJfQUxMKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHN1YnNjcmliZShGSUxURVJfQUxMLCAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0FMTCkpO1xuICAgIHN1YnNjcmliZShGSUxURVJfQUNUSVZFLCAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0FDVElWRSkpO1xuICAgIHN1YnNjcmliZShGSUxURVJfQ09NUExFVEVELCAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0NPTVBMRVRFRCkpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8Q29udGFpbmVyIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfSAvPlxuICAgICAgPEZvb3RlciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0vPlxuICAgICAgPFN0b3JlIGluaXRpYWxWYWx1ZT17IGluaXRpYWxWYWx1ZSB9PlxuICAgICAgICA8RmlsdGVyT3B0aW9uc1RhYnMgZmlsdGVyPXsgZmlsdGVyKCkgfSAvPlxuICAgICAgICA8UmVuZGVyZXIgZmlsdGVyPXsgZmlsdGVyKCkgfS8+XG4gICAgICAgIDxDaGVja0ZvckVkaXRGaWVsZCAvPlxuICAgICAgICA8UHJvZ3Jlc3NDaGVja2VyIC8+XG4gICAgICAgIDxQZXJzaXN0IC8+XG4gICAgICA8L1N0b3JlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuXG5ydW4oPEFwcCAvPik7XG4iXSwic291cmNlUm9vdCI6IiJ9