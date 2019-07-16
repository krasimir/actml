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

    var node = {
      element: element,
      children: [],
      parent: parent,
      cursor: 0,
      enter: function enter() {
        var _this = this;

        log('-> ' + this.element.name);

        if (true) {
          if (this.logs) this.logs = [];
        }

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

        if (true) {
          if (this.logs) this.logs = [];
        }
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

    if (true) {
      node.log = function (type, meta) {
        if (!('logs' in node)) node.logs = [];
        node.logs.push({
          type: type,
          meta: meta
        });
      };
    }

    return node;
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
      if (true) {
        return function loopOver(node) {
          var ind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

          var _ref = node.element.props ? node.element.props : {},
              children = _ref.children,
              rest = _objectWithoutProperties(_ref, ['children']); // eslint-disable-line no-unused-vars


          return {
            ind: ind,
            name: node.element.name,
            logs: node.logs,
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
      }

      throw new Error('Not available in production mode');
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
      if (true) node.log('useEffect:consumed');
    }
  } else {
    var areEqual = depsEqual(oldDeps, deps);

    if (!areEqual) {
      effect.cleanUp = callback();
      if (true) node.log('useEffect:consumed');
    }
  }
}

var createUseEffectHook = function createUseEffectHook(processor) {
  processor.onNodeRemove(function (node) {
    var element = node.element;
    var storage = Storage.get(element);
    storage.effects.forEach(function (effect) {
      if (effect.cleanUp) {
        effect.cleanUp();
        if (true) node.log('useEffect:cleanUp');
      }
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

var subscribe = function subscribe(node, element, type, callback) {
  if (!subscribers[type]) subscribers[type] = {};

  if (true) {
    if (!subscribers[type][element.id]) {
      node.log('usePubSub:subscribe', type);
    }
  }

  subscribers[type][element.id] = callback;
  return function () {
    if (true) {
      node.log('usePubSub:unsubscribe', type);
    }

    delete subscribers[type][element.id];
  };
};

var publish = function publish(node, type, payload) {
  if (!subscribers[type]) return;

  if (true) {
    node.log('usePubSub:publish:' + type, payload);
  }

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

      return subscribe.apply(undefined, [node, el].concat(params));
    };

    var publishFunc = function publishFunc() {
      for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return publish.apply(undefined, [node].concat(params));
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

var _isValidHookContext = __webpack_require__(/*! ./utils/isValidHookContext */ "../../lib/hooks/utils/isValidHookContext.js");

var _isValidHookContext2 = _interopRequireDefault(_isValidHookContext);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

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

function createUseReducerHook(processor, useState) {
  return function (reducer, initialState) {
    (0, _isValidHookContext2.default)(processor);
    var node = processor.node();

    var _useState = useState(initialState),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    var dispatch = function dispatch(action) {
      if (true) {
        node.log('useReducer:dispatch', action.type);
      }

      setState(reducer(state(), action));
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

    if (true) node.log('useState:consumed', storage.states[index]);
    return [function () {
      return storage.states[index];
    }, function (newState) {
      if (true) node.log('useState:new', newState);
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
  var useReducer = (0, _useReducer2.default)(processor, useState);
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
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return inspector; });
/* harmony import */ var _helpers_sanitize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/sanitize */ "../../packages/inspector/helpers/sanitize.js");
const ENTER = 'ENTER';
const OUT = 'OUT';
const REMOVE = 'REMOVE';

const isRunningInNode = typeof process !== 'undefined' && typeof process.release !== 'undefined' && process.release.name === 'node';

const getIndMargin = ind => {
  return `margin-left: ${ind * 20}px;`;
};

const getIndSpaces = ind => {
  return [...Array(ind * 2).keys()].map(x => ' ').join('');
};

const parseLogMeta = meta => {
  if (typeof meta === 'undefined') return '';

  if (typeof meta === 'string' || typeof meta === 'boolean' || typeof meta === 'number') {
    return `(${JSON.stringify(meta)})`;
  }

  if (typeof meta === 'object') {
    if (Array.isArray(meta)) {
      return `([...${meta.length}])`;
    }

    return '(object)';
  }

  return `(${typeof meta})`;
};

const print = {
  entrance: (what, ind) => {
    if (!isRunningInNode) {
      return [`%c${what}`, 'color: red;' + getIndMargin(ind)];
    }

    return ['\x1b[38m%s\x1b[0m', `${getIndSpaces(ind) + what}`];
  },
  default: (what, ind) => {
    if (!isRunningInNode) {
      return [`%c${what}`, getIndMargin(ind)];
    }

    return [`${getIndSpaces(ind) + what}`];
  },
  hook: (what, ind) => {
    if (!isRunningInNode) {
      return [`%c${what}`, 'color: #999;' + getIndMargin(ind)];
    }

    return ['\x1b[34m%s\x1b[0m', `${getIndSpaces(ind) + what}`];
  },
  current: (what, ind) => {
    if (!isRunningInNode) {
      return [`%c${what}`, 'font-weight: bold; border: solid 1px #999; border-radius: 2px; padding: 1px 0;' + getIndMargin(ind)];
    }

    return [`${getIndSpaces(ind) + what}`, '\x1b[31m★\x1b[0m'];
  }
};

function printSnapshotToConsole(snapshot) {
  const [type, node, tree] = snapshot;
  let printLines = [print.entrance('_______________________', 0)];
  printLines = printLines.concat(function loop({
    id,
    ind,
    name,
    used,
    children,
    logs
  }) {
    let lines = [];
    let elementOpenTag = `<${name}${used > 0 ? `(${used})` : ''}${children.length === 0 ? ' /' : ''}>`;
    lines.push(id === node.element.id ? print.current(elementOpenTag, ind) : print.default(elementOpenTag, ind));

    if (logs && logs.length > 0) {
      lines = lines.concat(logs.map(({
        type,
        meta
      }) => {
        return print.hook(`⤷ ${type}${parseLogMeta(meta)}`, ind);
      }));
    }

    if (children.length > 0) {
      children.map(child => {
        lines = lines.concat(loop(child));
      });
      lines.push(id === node.element.id ? print.current(`</${name}>`, ind) : print.default(`</${name}>`, ind));
    }

    return lines;
  }(tree)); // console.clear();

  printLines.forEach(line => {
    console.log(...line);
  });
}

function inspector(processor, options = {}) {
  const snapshots = [];

  function snapshot(type, node) {
    snapshots.push([type, node, processor.system().tree.diagnose()]);
    printSnapshotToConsole(snapshots[snapshots.length - 1], options);
  }

  processor.onNodeEnter(node => snapshot(ENTER, node)); // processor.onNodeOut(node => snapshot(OUT, node));
  // processor.onNodeRemove(node => snapshot(REMOVE, node));
}
;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../examples/todomvc/node_modules/process/browser.js */ "./node_modules/process/browser.js")))

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

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1F1ZXVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUHViU3ViLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVN0YXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi91dGlscy9pc0FjdE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2hlbHBlcnMvc2FuaXRpemUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9DaXJjdWxhckpTT04uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9TZXJpYWxpemVFcnJvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2hlY2tGb3JFZGl0RmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGVyc2lzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImdldEZ1bmNOYW1lIiwiZnVuYyIsIm5hbWUiLCJyZXN1bHQiLCJleGVjIiwidG9TdHJpbmciLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsIkVycm9yIiwiX19hY3RtbCIsIl9fdXNlZCIsIl9fcnVubmluZyIsImlkIiwiaW5pdGlhbGl6ZSIsInVzZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtZXJnZVByb3BzIiwibmV3UHJvcHMiLCJhc3NpZ24iLCJpc1J1bm5pbmciLCJlbnRlciIsImNvbnN1bWUiLCJvdXQiLCJkZWZhdWx0IiwiY3JlYXRlQ29udGV4dEZhY3RvcnkiLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJrZXkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJDT05URVhUX0tFWSIsIlBVQkxJQ19DT05URVhUX0tFWSIsImlkcyIsImdldElkIiwicmVzb2x2ZUNvbnRleHQiLCJub2RlIiwic3RhY2siLCJwdXNoIiwiZWxlbWVudCIsInBhcmVudCIsImNvbnNvbGUiLCJ3YXJuIiwibWFwIiwiam9pbiIsInByb2Nlc3NvciIsImNyZWF0ZUNvbnRleHQiLCJpbml0aWFsVmFsdWUiLCJfcmVmMyIsIlByb3ZpZGVyIiwiX3JlZiIsIkNvbnN1bWVyIiwiX3JlZjIiLCJjcmVhdGVQcm9jZXNzb3IiLCJfaXNBY3RNTEVsZW1lbnQiLCJyZXF1aXJlIiwiX2lzQWN0TUxFbGVtZW50MiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfVHJlZSIsIl9UcmVlMiIsIl91c2VQdWJTdWIiLCJfdXNlUHViU3ViMiIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfdXNlRWZmZWN0IiwiX3VzZUVmZmVjdDIiLCJfUXVldWUiLCJfUXVldWUyIiwiX19lc01vZHVsZSIsIkNISUxEUkVOIiwiQ09OU1VNRSIsIlBST0NFU1NfUkVTVUxUIiwiUkVUVVJORURfRUxFTUVOVCIsIkNISUxEIiwiaXNHZW5lcmF0b3IiLCJpc1Byb21pc2UiLCJjcmVhdGVDaGlsZHJlbkZ1bmMiLCJwcm9jZXNzTm9kZSIsImYiLCJfYXJndW1lbnRzIiwicXVldWVJdGVtc1RvQWRkIiwicmVzdWx0cyIsImNoaWxkcmVuUXVldWUiLCJfbG9vcCIsImkiLCJfY2hpbGRyZW4kaSIsImFwcGx5IiwiYWRkQ2hpbGROb2RlIiwiZnVuY1Jlc3VsdCIsInJldmVyc2UiLCJmb3JFYWNoIiwicHJlcGVuZEl0ZW0iLCJyIiwicHJvY2VzcyIsIm9uRG9uZSIsInRyZWUiLCJjdXJyZW50Tm9kZSIsInJlcnVuIiwicXVldWUiLCJhZGQiLCJjb25zdW1wdGlvbiIsImdlbmVyYXRvciIsIlByb21pc2UiLCJnZW5lcmF0b3JEb25lIiwiZ2VuUmVzdWx0IiwiaXRlcmF0ZSIsIm5leHQiLCJkb25lIiwicmVzIiwidGhlbiIsIl9yZXMiLCJydW4iLCJyb290Tm9kZSIsInJlc29sdmVSb290Iiwib25Ob2RlRW50ZXIiLCJjYWxsYmFjayIsImFkZE5vZGVFbnRlckNhbGxiYWNrIiwib25Ob2RlT3V0IiwiYWRkTm9kZU91dENhbGxiYWNrIiwib25Ob2RlUmVtb3ZlIiwic3lzdGVtIiwicmVzZXQiLCJjbGVhciIsImNyZWF0ZVF1ZXVlIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiYXJyMiIsImZyb20iLCJMT0dTIiwibG9nIiwiX2NvbnNvbGUiLCJjcmVhdGVJdGVtIiwidHlwZSIsImNvbnRleHQiLCJpdGVtcyIsImFzeW5jIiwicnVubmluZyIsInJlbGVhc2UiLCJjb25jYXQiLCJsYXN0UmVzdWx0IiwiX3RoaXMiLCJpdGVtIiwic2hpZnQiLCJhc3luY1Jlc3VsdCIsImNhdGNoIiwiZXJyb3IiLCJnZXRSZXN1bHQiLCJyZWplY3QiLCJfZXh0ZW5kcyIsInRhcmdldCIsInNvdXJjZSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIlRyZWUiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJrZXlzIiwiaW5kZXhPZiIsIl9vbk5vZGVSZW1vdmUiLCJyb290IiwiY3JlYXRlTmV3Tm9kZSIsInVzZVNhbWVOb2RlIiwibmV3RWxlbWVudCIsInRyZWVEaWZmIiwib2xkRWxlbWVudCIsImN1cnNvciIsIl9fREVWX18iLCJsb2dzIiwiYyIsIl90aGlzMiIsInNwbGljZSIsInJlbW92ZWROb2RlIiwiX3RoaXMzIiwiY2hpbGROb2RlIiwibmV3Q2hpbGROb2RlIiwibWV0YSIsImdldE51bU9mRWxlbWVudHMiLCJkaWFnbm9zZSIsImxvb3BPdmVyIiwiaW5kIiwicmVzdCIsImNoaWxkIiwiX2lzVmFsaWRIb29rQ29udGV4dCIsIl9pc1ZhbGlkSG9va0NvbnRleHQyIiwiX0NvbnRleHQiLCJjcmVhdGVVc2VFbGVtZW50SG9vayIsIkNvbnRleHQiLCJfZmFzdERlZXBFcXVhbCIsIl9mYXN0RGVlcEVxdWFsMiIsIlN0b3JhZ2UiLCJlbGVtZW50cyIsImdldCIsImVmZmVjdHMiLCJjb25zdW1lciIsImNsZWFuVXAiLCJjcmVhdGVFZmZlY3QiLCJkZXBzIiwidXBkYXRlRWZmZWN0IiwiZWZmZWN0Iiwib2xkRGVwcyIsImRlcHNFcXVhbCIsIm5ld0RlcHMiLCJyZXNvbHZlRWZmZWN0IiwiYXJlRXF1YWwiLCJjcmVhdGVVc2VFZmZlY3RIb29rIiwic3RvcmFnZSIsImluZGV4IiwiY3JlYXRlVXNlUHViU3ViSG9vayIsInN1YnNjcmliZXJzIiwic3Vic2NyaWJlIiwicHVibGlzaCIsInBheWxvYWQiLCJzY29wZWRFbGVtZW50IiwiZWwiLCJzdWJzY3JpYmVGdW5jIiwiX2xlbiIsInBhcmFtcyIsIl9rZXkiLCJwdWJsaXNoRnVuYyIsIl9sZW4yIiwiX2tleTIiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwiX2kiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zIiwiZXJyIiwiVHlwZUVycm9yIiwiY3JlYXRlVXNlUmVkdWNlckhvb2siLCJjcmVhdGVEaXNwYXRjaEVsZW1lbnQiLCJkaXNwYXRjaCIsImFjdGlvbiIsInByb3BzVG9BY3Rpb24iLCJ1c2VTdGF0ZSIsInJlZHVjZXIiLCJpbml0aWFsU3RhdGUiLCJzdGF0ZSIsInNldFN0YXRlIiwiY3JlYXRlVXNlU3RhdGVIb29rIiwic3RhdGVzIiwibmV3U3RhdGUiLCJpc1ZhbGlkSG9va0NvbnRleHQiLCJjcmVhdGVSdW50aW1lIiwiX1Byb2Nlc3NvciIsIl9Qcm9jZXNzb3IyIiwiX0FjdEVsZW1lbnQiLCJfQWN0RWxlbWVudDIiLCJfdXNlRWxlbWVudCIsIl91c2VFbGVtZW50MiIsIl91c2VSZWR1Y2VyIiwiX3VzZVJlZHVjZXIyIiwiX3VzZUNvbnRleHQiLCJfdXNlQ29udGV4dDIiLCJfQ29udGV4dDIiLCJBIiwiRnJhZ21lbnQiLCJ1c2VFbGVtZW50IiwidXNlUHViU3ViIiwidXNlUmVkdWNlciIsInVzZUVmZmVjdCIsInVzZUNvbnRleHQiLCJydW50aW1lIiwibW9kdWxlIiwiaXNBY3RNTEVsZW1lbnQiLCJzdHJpbmdpZnkiLCJDaXJjdWxhckpTT04iLCJzYW5pdGl6ZSIsInNvbWV0aGluZyIsInNob3dFcnJvckluQ29uc29sZSIsIkpTT04iLCJwYXJzZSIsIlNlcmlhbGl6ZUVycm9yIiwic3BlY2lhbENoYXIiLCJzYWZlU3BlY2lhbENoYXIiLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJlc2NhcGVkU2FmZVNwZWNpYWxDaGFyIiwic3BlY2lhbENoYXJSRyIsIlJlZ0V4cCIsInNhZmVTcGVjaWFsQ2hhclJHIiwic2FmZVN0YXJ0V2l0aFNwZWNpYWxDaGFyUkciLCJ2IiwiJFN0cmluZyIsIlN0cmluZyIsImdlbmVyYXRlUmVwbGFjZXIiLCJyZXBsYWNlciIsInJlc29sdmUiLCJpbnNwZWN0IiwicGF0aCIsImFsbCIsInNlZW4iLCJtYXBwIiwibGFzdCIsImx2bCIsImZuIiwicmVwbGFjZSIsInJldHJpZXZlRnJvbVBhdGgiLCJjdXJyZW50IiwiZ2VuZXJhdGVSZXZpdmVyIiwicmV2aXZlciIsImlzU3RyaW5nIiwiY2hhckF0IiwicmVnZW5lcmF0ZSIsInJlZ2VuZXJhdGVBcnJheSIsInJldHJpZXZlIiwicmVnZW5lcmF0ZU9iamVjdCIsInNwbGl0Iiwic3RyaW5naWZ5UmVjdXJzaW9uIiwic3BhY2UiLCJkb05vdFJlc29sdmUiLCJwYXJzZVJlY3Vyc2lvbiIsInRleHQiLCJkZXN0cm95Q2lyY3VsYXIiLCJ0byIsIm1lc3NhZ2UiLCJFTlRFUiIsIk9VVCIsIlJFTU9WRSIsImlzUnVubmluZ0luTm9kZSIsImdldEluZE1hcmdpbiIsImdldEluZFNwYWNlcyIsIngiLCJwYXJzZUxvZ01ldGEiLCJwcmludCIsImVudHJhbmNlIiwid2hhdCIsImhvb2siLCJwcmludFNuYXBzaG90VG9Db25zb2xlIiwic25hcHNob3QiLCJwcmludExpbmVzIiwibG9vcCIsImxpbmVzIiwiZWxlbWVudE9wZW5UYWciLCJsaW5lIiwiaW5zcGVjdG9yIiwib3B0aW9ucyIsInNuYXBzaG90cyIsIkNoZWNrRm9yRWRpdEZpZWxkIiwidG9kb3MiLCJmaW5kSW5kZXgiLCJlZGl0aW5nIiwiJCIsInNlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGlzdCIsImhlYWRlciIsIkVTQyIsIkZpbGxDb250YWluZXIiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJvblVzZXJBY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRvZG9JbmRleCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiVE9HR0xFIiwiREVMRVRFIiwiRURJVCIsIkVESVRfVE9ETyIsImxhYmVsIiwia2V5Q29kZSIsIk5FV19UT0RPIiwiRm9jdXNGaWVsZCIsImZvY3VzIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJQcm9ncmVzc0NoZWNrZXIiLCJjb21wbGV0ZWQiLCJmaWx0ZXIiLCJpdGVtc0xlZnQiLCJGb290ZXIiLCJGSUxURVJfQUxMIiwiRklMVEVSX0FDVElWRSIsIkZJTFRFUl9DT01QTEVURUQiLCJDTEVBUl9DT01QTEVURUQiLCJGaWx0ZXJPcHRpb25zVGFicyIsInNldEF0dHJpYnV0ZSIsIlRvRG8iLCJ1c2VMb2NhbFN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ2V0RGF0YSIsIlBlcnNpc3QiLCJzZXRJdGVtIiwiUmVuZGVyZXIiLCJ0b2RvIiwibGlDbGFzcyIsInRvZ2dsZSIsImRlbGV0ZVRvZG8iLCJuZXdUb2RvIiwiZWRpdCIsImVk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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMs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RCxFQUFtQjtBQUFBLGFBQU1zQixTQUFTLENBQUN0QixnQkFBRCxDQUFmO0FBQUEsS0FBbkIsQ0FBVDtBQUNELEdBSlEsRUFJTixFQUpNLENBQVQ7QUFNQSxTQUNFLCtDQUFDLDZDQUFELFFBQ0UsK0NBQUMsOENBQUQ7QUFBVyxnQkFBWSxFQUFHM0s7QUFBMUIsSUFERixFQUVFLCtDQUFDLDJDQUFEO0FBQVEsZ0JBQVksRUFBR0E7QUFBdkIsSUFGRixFQUdFLCtDQUFDLDhDQUFEO0FBQU8sZ0JBQVksRUFBR3JLO0FBQXRCLEtBQ0UsK0NBQUMsc0RBQUQ7QUFBbUIsVUFBTSxFQUFHMlUsTUFBTTtBQUFsQyxJQURGLEVBRUUsK0NBQUMsaURBQUQ7QUFBVSxVQUFNLEVBQUdBLE1BQU07QUFBekIsSUFGRixFQUdFLCtDQUFDLDBEQUFELE9BSEYsRUFJRSwrQ0FBQyxvREFBRCxPQUpGLEVBS0UsK0NBQUMsZ0RBQUQsT0FMRixDQUhGLENBREY7QUFhRDs7QUFBQTtBQUVEM1EsZ0RBQUcsQ0FBQywrQ0FBQyxHQUFELE9BQUQsQ0FBSCxDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5mdW5jdGlvbiBnZXRGdW5jTmFtZShmdW5jKSB7XG4gIGlmIChmdW5jLm5hbWUpIHJldHVybiBmdW5jLm5hbWU7XG4gIHZhciByZXN1bHQgPSAvXmZ1bmN0aW9uXFxzKyhbXFx3XFwkXSspXFxzKlxcKC8uZXhlYyhmdW5jLnRvU3RyaW5nKCkpO1xuXG4gIHJldHVybiByZXN1bHQgPyByZXN1bHRbMV0gOiAndW5rbm93bic7XG59O1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZnVuYywgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RzIGEgZnVuY3Rpb24uIFwiJyArIGZ1bmMgKyAnXCIgZ2l2ZW4gaW5zdGVhZC4nKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIF9fYWN0bWw6IHRydWUsXG4gICAgX191c2VkOiAwLFxuICAgIF9fcnVubmluZzogZmFsc2UsXG4gICAgaWQ6IG51bGwsXG4gICAgcHJvcHM6IHByb3BzLFxuICAgIG5hbWU6IGdldEZ1bmNOYW1lKGZ1bmMpLFxuICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKGlkKSB7XG4gICAgICB2YXIgdXNlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgdGhpcy5fX3VzZWQgPSB1c2VkO1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSBmYWxzZTtcbiAgICB9LFxuICAgIG1lcmdlUHJvcHM6IGZ1bmN0aW9uIG1lcmdlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCBuZXdQcm9wcyk7XG4gICAgfSxcbiAgICB1c2VkOiBmdW5jdGlvbiB1c2VkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX191c2VkO1xuICAgIH0sXG4gICAgaXNSdW5uaW5nOiBmdW5jdGlvbiBpc1J1bm5pbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3J1bm5pbmc7XG4gICAgfSxcbiAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IHRydWU7XG4gICAgfSxcbiAgICBjb25zdW1lOiBmdW5jdGlvbiBjb25zdW1lKCkge1xuICAgICAgcmV0dXJuIGZ1bmModGhpcy5wcm9wcyk7XG4gICAgfSxcbiAgICBvdXQ6IGZ1bmN0aW9uIG91dCgpIHtcbiAgICAgIHRoaXMuX191c2VkICs9IDE7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUVsZW1lbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlQ29udGV4dEZhY3Rvcnk7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIGNvbnNpc3RlbnQtcmV0dXJuICovXG52YXIgQ09OVEVYVF9LRVkgPSAnX19DT05URVhUX0tFWV9fJztcblxudmFyIFBVQkxJQ19DT05URVhUX0tFWSA9IGV4cG9ydHMuUFVCTElDX0NPTlRFWFRfS0VZID0gJ19fUFVCTElDX0NPTlRFWFRfS0VZX18nO1xuXG52YXIgaWRzID0gMDtcblxuZnVuY3Rpb24gZ2V0SWQoKSB7XG4gIHJldHVybiAnYycgKyArK2lkcztcbn07XG5mdW5jdGlvbiByZXNvbHZlQ29udGV4dChub2RlLCBpZCkge1xuICB2YXIgc3RhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IFtdO1xuXG4gIHN0YWNrLnB1c2gobm9kZS5lbGVtZW50Lm5hbWUpO1xuICBpZiAobm9kZVtDT05URVhUX0tFWV0gJiYgaWQgaW4gbm9kZVtDT05URVhUX0tFWV0pIHtcbiAgICByZXR1cm4gbm9kZVtDT05URVhUX0tFWV1baWRdO1xuICB9IGVsc2UgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgcmV0dXJuIHJlc29sdmVDb250ZXh0KG5vZGUucGFyZW50LCBpZCwgc3RhY2spO1xuICB9XG4gIGNvbnNvbGUud2FybignQSBjb250ZXh0IGNvbnN1bWVyIGlzIHVzZWQgd2l0aCBubyBwcm92aWRlci5cXG4gIFN0YWNrOlxcbicgKyBzdGFjay5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gJyAgICA8JyArIG5hbWUgKyAnPic7XG4gIH0pLmpvaW4oJ1xcbicpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dEZhY3RvcnkocHJvY2Vzc29yKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGVDb250ZXh0KGluaXRpYWxWYWx1ZSkge1xuICAgIHZhciBfcmVmMztcblxuICAgIHZhciBpZCA9IGdldElkKCk7XG5cbiAgICB2YXIgUHJvdmlkZXIgPSBmdW5jdGlvbiBQcm92aWRlcihfcmVmKSB7XG4gICAgICB2YXIgdmFsdWUgPSBfcmVmLnZhbHVlLFxuICAgICAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbjtcblxuICAgICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgICBpZiAoIW5vZGVbQ09OVEVYVF9LRVldKSB7XG4gICAgICAgIG5vZGVbQ09OVEVYVF9LRVldID0ge307XG4gICAgICB9XG4gICAgICBub2RlW0NPTlRFWFRfS0VZXVtpZF0gPSB2YWx1ZTtcblxuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH07XG4gICAgdmFyIENvbnN1bWVyID0gZnVuY3Rpb24gQ29uc3VtZXIoX3JlZjIpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9yZWYyLmNoaWxkcmVuO1xuXG4gICAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICAgIGNoaWxkcmVuKHJlc29sdmVDb250ZXh0KG5vZGUsIGlkKSB8fCBpbml0aWFsVmFsdWUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3JlZjMgPSB7fSwgX2RlZmluZVByb3BlcnR5KF9yZWYzLCBQVUJMSUNfQ09OVEVYVF9LRVksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgICAgcmV0dXJuIHJlc29sdmVDb250ZXh0KG5vZGUsIGlkKSB8fCBpbml0aWFsVmFsdWU7XG4gICAgfSksIF9kZWZpbmVQcm9wZXJ0eShfcmVmMywgJ1Byb3ZpZGVyJywgUHJvdmlkZXIpLCBfZGVmaW5lUHJvcGVydHkoX3JlZjMsICdDb25zdW1lcicsIENvbnN1bWVyKSwgX3JlZjM7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVByb2Nlc3NvcjtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfVHJlZSA9IHJlcXVpcmUoJy4vVHJlZScpO1xuXG52YXIgX1RyZWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVHJlZSk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlRWZmZWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFZmZlY3QnKTtcblxudmFyIF91c2VFZmZlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWZmZWN0KTtcblxudmFyIF9RdWV1ZSA9IHJlcXVpcmUoJy4vUXVldWUnKTtcblxudmFyIF9RdWV1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9RdWV1ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBjb25zaXN0ZW50LXJldHVybiAqL1xudmFyIENISUxEUkVOID0gJ19fQUNUTUxfQ0hJTERSRU5fXyc7XG5cbnZhciBDT05TVU1FID0gJ0NPTlNVTUUnO1xudmFyIFBST0NFU1NfUkVTVUxUID0gJ1BST0NFU1NfUkVTVUxUJztcbnZhciBSRVRVUk5FRF9FTEVNRU5UID0gJ1JFVFVSTkVEX0VMRU1FTlQnO1xudmFyIENISUxEID0gJ0NISUxEJztcblxudmFyIGlzR2VuZXJhdG9yID0gZnVuY3Rpb24gaXNHZW5lcmF0b3Iob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsnbmV4dCddID09PSAnZnVuY3Rpb24nO1xufTtcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsndGhlbiddID09PSAnZnVuY3Rpb24nO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hpbGRyZW5GdW5jKG5vZGUsIHByb2Nlc3NOb2RlKSB7XG4gIHZhciBmID0gZnVuY3Rpb24gZigpIHtcbiAgICB2YXIgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmVsZW1lbnQuY2hpbGRyZW47XG5cblxuICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgcXVldWVJdGVtc1RvQWRkID0gW107XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgdmFyIGNoaWxkcmVuUXVldWUgPSAoMCwgX1F1ZXVlMi5kZWZhdWx0KSgnICAnICsgbm9kZS5lbGVtZW50Lm5hbWUgKyAnOmNoaWxkcmVuJyk7XG5cbiAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGkpIHtcbiAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGNoaWxkcmVuW2ldKSkge1xuICAgICAgICAgIHZhciBfY2hpbGRyZW4kaTtcblxuICAgICAgICAgIChfY2hpbGRyZW4kaSA9IGNoaWxkcmVuW2ldKS5tZXJnZVByb3BzLmFwcGx5KF9jaGlsZHJlbiRpLCBfYXJndW1lbnRzKTtcbiAgICAgICAgICBxdWV1ZUl0ZW1zVG9BZGQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoY2hpbGRyZW5baV0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2hpbGRyZW5baV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YXIgZnVuY1Jlc3VsdCA9IGNoaWxkcmVuW2ldLmFwcGx5KGNoaWxkcmVuLCBfYXJndW1lbnRzKTtcblxuICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShmdW5jUmVzdWx0KSkge1xuICAgICAgICAgICAgcXVldWVJdGVtc1RvQWRkLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZnVuY1Jlc3VsdCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChmdW5jUmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBfbG9vcChpKTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlSXRlbXNUb0FkZC5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICBjaGlsZHJlblF1ZXVlLnByZXBlbmRJdGVtKENISUxELCBmdW5jLCBmdW5jdGlvbiAocikge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzLnB1c2gocik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjaGlsZHJlblF1ZXVlLnByb2Nlc3MoKTtcbiAgICAgIHJldHVybiBjaGlsZHJlblF1ZXVlLm9uRG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGZbQ0hJTERSRU5dID0gdHJ1ZTtcbiAgcmV0dXJuIGY7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2Nlc3NvcigpIHtcbiAgdmFyIHRyZWUgPSAoMCwgX1RyZWUyLmRlZmF1bHQpKCk7XG4gIHZhciBjdXJyZW50Tm9kZSA9IG51bGw7XG5cbiAgdmFyIHByb2Nlc3NOb2RlID0gZnVuY3Rpb24gcHJvY2Vzc05vZGUobm9kZSkge1xuICAgIGN1cnJlbnROb2RlID0gbm9kZTtcbiAgICBub2RlLmVudGVyKCk7XG4gICAgbm9kZS5yZXJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlKTtcbiAgICB9O1xuICAgIG5vZGUuZWxlbWVudC5tZXJnZVByb3BzKHtcbiAgICAgIGNoaWxkcmVuOiBjcmVhdGVDaGlsZHJlbkZ1bmMobm9kZSwgcHJvY2Vzc05vZGUpXG4gICAgfSk7XG5cbiAgICB2YXIgcmVzdWx0cyA9IHt9O1xuICAgIHZhciBxdWV1ZSA9ICgwLCBfUXVldWUyLmRlZmF1bHQpKCcgJyArIG5vZGUuZWxlbWVudC5uYW1lKTtcblxuICAgIC8vIENPTlNVTUVcbiAgICBxdWV1ZS5hZGQoQ09OU1VNRSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudC5jb25zdW1lKCk7XG4gICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdHNbQ09OU1VNRV0gPSByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvLyBQUk9DRVNTX1JFU1VMVFxuICAgIHF1ZXVlLmFkZChQUk9DRVNTX1JFU1VMVCwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnN1bXB0aW9uID0gcmVzdWx0c1tDT05TVU1FXTtcblxuICAgICAgLy8gQWN0TUwgZWxlbWVudFxuICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGNvbnN1bXB0aW9uKSkge1xuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGNvbnN1bXB0aW9uKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdG9yXG4gICAgICB9IGVsc2UgaWYgKGlzR2VuZXJhdG9yKGNvbnN1bXB0aW9uKSkge1xuICAgICAgICB2YXIgZ2VuZXJhdG9yID0gY29uc3VtcHRpb247XG5cbiAgICAgICAgcXVldWUucHJlcGVuZEl0ZW0oUkVUVVJORURfRUxFTUVOVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZ2VuZXJhdG9yRG9uZSkge1xuICAgICAgICAgICAgdmFyIGdlblJlc3VsdCA9IHZvaWQgMDtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGUodmFsdWUpIHtcbiAgICAgICAgICAgICAgZ2VuUmVzdWx0ID0gZ2VuZXJhdG9yLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoIWdlblJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIHZhciByZXMgPSBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShnZW5SZXN1bHQudmFsdWUpKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGUocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZShyZXMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZXMgPSBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShnZW5SZXN1bHQudmFsdWUpKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShfcmVzKSkge1xuICAgICAgICAgICAgICAgICAgICBfcmVzLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhdG9yRG9uZShyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0b3JEb25lKF9yZXMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBnZW5lcmF0b3JEb25lKGdlblJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoaWxkcmVuXG4gICAgICB9IGVsc2UgaWYgKGNvbnN1bXB0aW9uICYmIGNvbnN1bXB0aW9uW0NISUxEUkVOXSkge1xuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bXB0aW9uKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0ICYmIHJlc3VsdC5sZW5ndGggPT09IDEgPyByZXN1bHRbMF0gOiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUnVubmluZyB0aGUgcXVldWVcbiAgICBxdWV1ZS5wcm9jZXNzKCk7XG5cbiAgICAvLyBHZXR0aW5nIHRoZSByZXN1bHQuIEl0IGlzIGVpdGhlciBhIHByb21pc2UgaWYgdGhlcmUgaXNcbiAgICAvLyBzb21ldGhpbmcgYXN5bmNocm9ub3VzIG9yIGEgdmFsdWVcbiAgICByZXR1cm4gcXVldWUub25Eb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUub3V0KCk7XG4gICAgICByZXR1cm4gUkVUVVJORURfRUxFTUVOVCBpbiByZXN1bHRzID8gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA6IHJlc3VsdHNbQ09OU1VNRV07XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBub2RlOiBmdW5jdGlvbiBub2RlKCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH0sXG4gICAgcnVuOiBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgICAgdmFyIHJvb3ROb2RlID0gdHJlZS5yZXNvbHZlUm9vdChlbGVtZW50KTtcblxuICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKHJvb3ROb2RlKTtcbiAgICB9LFxuICAgIG9uTm9kZUVudGVyOiBmdW5jdGlvbiBvbk5vZGVFbnRlcihjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlRW50ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVPdXQ6IGZ1bmN0aW9uIG9uTm9kZU91dChjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlT3V0Q2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUub25Ob2RlUmVtb3ZlKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIHN5c3RlbTogZnVuY3Rpb24gc3lzdGVtKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJlZTogdHJlZSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgIGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgICAgICB0cmVlLnJlc2V0KCk7XG4gICAgICAgICAgX3VzZVB1YlN1YjIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICAgIF91c2VTdGF0ZTIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICAgIF91c2VFZmZlY3QyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVF1ZXVlO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xudmFyIExPR1MgPSBmYWxzZTtcbnZhciBsb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gIHZhciBfY29uc29sZTtcblxuICByZXR1cm4gTE9HUyA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG59O1xudmFyIGlzUHJvbWlzZSA9IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqWyd0aGVuJ10gPT09ICdmdW5jdGlvbic7XG59O1xudmFyIGNyZWF0ZUl0ZW0gPSBmdW5jdGlvbiBjcmVhdGVJdGVtKHR5cGUsIGZ1bmMpIHtcbiAgdmFyIG9uRG9uZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZnVuY3Rpb24gKCkge307XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBmdW5jOiBmdW5jLFxuICAgIG9uRG9uZTogb25Eb25lXG4gIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVRdWV1ZShjb250ZXh0KSB7XG4gIHZhciBpdGVtcyA9IFtdO1xuICB2YXIgYXN5bmMgPSBmYWxzZTtcbiAgdmFyIHJ1bm5pbmcgPSBmYWxzZTtcbiAgdmFyIHJlbGVhc2UgPSBmdW5jdGlvbiByZWxlYXNlKCkge307XG5cbiAgcmV0dXJuIHtcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZCh0eXBlLCBmdW5jLCBvbkRvbmUpIHtcbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiBbLi4uJyArIHR5cGUgKyAnXSAoJyArIChpdGVtcy5sZW5ndGggKyAxKSArICcgdG90YWwpJyk7XG4gICAgICBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0odHlwZSwgZnVuYywgb25Eb25lKSk7XG4gICAgfSxcbiAgICBwcmVwZW5kSXRlbTogZnVuY3Rpb24gcHJlcGVuZEl0ZW0odHlwZSwgZnVuYywgb25Eb25lKSB7XG4gICAgICBsb2coY29udGV4dCArICc6UTogWycgKyB0eXBlICsgJy4uLl0gKCcgKyAoaXRlbXMubGVuZ3RoICsgMSkgKyAnIHRvdGFsKScpO1xuICAgICAgaXRlbXMgPSBbY3JlYXRlSXRlbSh0eXBlLCBmdW5jLCBvbkRvbmUpXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGl0ZW1zKSk7XG4gICAgfSxcbiAgICBwcm9jZXNzOiBmdW5jdGlvbiBwcm9jZXNzKGxhc3RSZXN1bHQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBsb2coY29udGV4dCArICc6UTpkb25lJyk7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVtID0gaXRlbXMuc2hpZnQoKTtcblxuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6ICcgKyBpdGVtLnR5cGUgKyAnKCkgKCcgKyBpdGVtcy5sZW5ndGggKyAnIGxlZnQpJyk7XG4gICAgICB2YXIgcmVzdWx0ID0gaXRlbS5mdW5jKGxhc3RSZXN1bHQpO1xuXG4gICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgYXN5bmMgPSB0cnVlO1xuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbiAoYXN5bmNSZXN1bHQpIHtcbiAgICAgICAgICBpdGVtLm9uRG9uZShhc3luY1Jlc3VsdCk7XG4gICAgICAgICAgX3RoaXMucHJvY2Vzcyhhc3luY1Jlc3VsdCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIHJlbGVhc2UoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0ub25Eb25lKHJlc3VsdCk7XG4gICAgICAgIHRoaXMucHJvY2VzcyhyZXN1bHQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgb25Eb25lOiBmdW5jdGlvbiBvbkRvbmUoZ2V0UmVzdWx0KSB7XG4gICAgICBpZiAoYXN5bmMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChkb25lLCByZWplY3QpIHtcbiAgICAgICAgICByZWxlYXNlID0gZnVuY3Rpb24gcmVsZWFzZShlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb25lKGdldFJlc3VsdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRSZXN1bHQoKTtcbiAgICB9LFxuICAgIGlzUnVubmluZzogZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRyZWU7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIG5vLXJldHVybi1hc3NpZ24sIG1heC1sZW4gKi9cbnZhciBMT0dTID0gZmFsc2U7XG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgcmV0dXJuIExPR1MgPyAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIGFyZ3VtZW50cykgOiBudWxsO1xufTtcblxuZnVuY3Rpb24gVHJlZSgpIHtcbiAgdmFyIG9uTm9kZUVudGVyID0gW107XG4gIHZhciBvbk5vZGVPdXQgPSBbXTtcbiAgdmFyIF9vbk5vZGVSZW1vdmUgPSBbXTtcbiAgdmFyIHJvb3QgPSBjcmVhdGVOZXdOb2RlKCk7XG4gIHZhciBpZHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGdldElkKCkge1xuICAgIHJldHVybiAnYScgKyArK2lkcztcbiAgfTtcbiAgZnVuY3Rpb24gdXNlU2FtZU5vZGUobm9kZSwgbmV3RWxlbWVudCkge1xuICAgIG5ld0VsZW1lbnQuaW5pdGlhbGl6ZShub2RlLmVsZW1lbnQuaWQsIG5vZGUuZWxlbWVudC51c2VkKCkpO1xuICAgIG5vZGUuZWxlbWVudCA9IG5ld0VsZW1lbnQ7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgZnVuY3Rpb24gdHJlZURpZmYob2xkRWxlbWVudCwgbmV3RWxlbWVudCkge1xuICAgIGlmIChvbGRFbGVtZW50ICYmIG9sZEVsZW1lbnQubmFtZSA9PT0gbmV3RWxlbWVudC5uYW1lKSB7XG4gICAgICBpZiAob2xkRWxlbWVudC5wcm9wcyAmJiBuZXdFbGVtZW50LnByb3BzKSB7XG4gICAgICAgIHJldHVybiBvbGRFbGVtZW50LnByb3BzLmtleSA9PT0gbmV3RWxlbWVudC5wcm9wcy5rZXk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld05vZGUoZWxlbWVudCwgcGFyZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuaW5pdGlhbGl6ZShnZXRJZCgpKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgIGN1cnNvcjogMCxcbiAgICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBsb2coJy0+ICcgKyB0aGlzLmVsZW1lbnQubmFtZSk7XG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgaWYgKHRoaXMubG9ncykgdGhpcy5sb2dzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGVtZW50LmVudGVyKCk7XG4gICAgICAgIG9uTm9kZUVudGVyLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICByZXR1cm4gYyhfdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICBsb2coJzwtICcgKyB0aGlzLmVsZW1lbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5vdXQoKTtcbiAgICAgICAgLy8gSWYgdGhlcmUncmUgbW9yZSBub2RlcyBpbiB0aGUgdHJlZSB0aGFuIHdoYXQgd2FzIHByb2Nlc3NlZFxuICAgICAgICBpZiAodGhpcy5jdXJzb3IgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKHRoaXMuY3Vyc29yLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIHRoaXMuY3Vyc29yKS5mb3JFYWNoKGZ1bmN0aW9uIChyZW1vdmVkTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9vbk5vZGVSZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgICByZXR1cm4gYyhyZW1vdmVkTm9kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnNvciA9IDA7XG4gICAgICAgIG9uTm9kZU91dC5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgICAgaWYgKHRoaXMubG9ncykgdGhpcy5sb2dzID0gW107XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhZGRDaGlsZE5vZGU6IGZ1bmN0aW9uIGFkZENoaWxkTm9kZShuZXdFbGVtZW50KSB7XG4gICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjaGlsZE5vZGUgPSB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXTtcblxuICAgICAgICAvLyB1c2luZyB0aGUgc2FtZSBub2RlXG4gICAgICAgIGlmIChjaGlsZE5vZGUgJiYgdHJlZURpZmYoY2hpbGROb2RlLmVsZW1lbnQsIG5ld0VsZW1lbnQpKSB7XG4gICAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgICByZXR1cm4gdXNlU2FtZU5vZGUoY2hpbGROb2RlLCBuZXdFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0aW5nIGEgbmV3IG5vZGVcbiAgICAgICAgdmFyIG5ld0NoaWxkTm9kZSA9IGNyZWF0ZU5ld05vZGUobmV3RWxlbWVudCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdKSB7XG4gICAgICAgICAgX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICByZXR1cm4gYyhfdGhpczMuY2hpbGRyZW5bX3RoaXMzLmN1cnNvcl0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdID0gbmV3Q2hpbGROb2RlO1xuICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICByZXR1cm4gbmV3Q2hpbGROb2RlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgbm9kZS5sb2cgPSBmdW5jdGlvbiAodHlwZSwgbWV0YSkge1xuICAgICAgICBpZiAoISgnbG9ncycgaW4gbm9kZSkpIG5vZGUubG9ncyA9IFtdO1xuICAgICAgICBub2RlLmxvZ3MucHVzaCh7IHR5cGU6IHR5cGUsIG1ldGE6IG1ldGEgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlUm9vdDogZnVuY3Rpb24gcmVzb2x2ZVJvb3QoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHJvb3QgPSB0cmVlRGlmZihyb290LmVsZW1lbnQsIGVsZW1lbnQpID8gdXNlU2FtZU5vZGUocm9vdCwgZWxlbWVudCkgOiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQpO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgcm9vdCA9IGNyZWF0ZU5ld05vZGUoKTtcbiAgICAgIGlkcyA9IDA7XG4gICAgfSxcbiAgICBnZXROdW1PZkVsZW1lbnRzOiBmdW5jdGlvbiBnZXROdW1PZkVsZW1lbnRzKCkge1xuICAgICAgcmV0dXJuIGlkcztcbiAgICB9LFxuICAgIGRpYWdub3NlOiBmdW5jdGlvbiBkaWFnbm9zZSgpIHtcbiAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBsb29wT3Zlcihub2RlKSB7XG4gICAgICAgICAgdmFyIGluZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICAgICAgICAgIHZhciBfcmVmID0gbm9kZS5lbGVtZW50LnByb3BzID8gbm9kZS5lbGVtZW50LnByb3BzIDoge30sXG4gICAgICAgICAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbixcbiAgICAgICAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2NoaWxkcmVuJ10pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5kOiBpbmQsXG4gICAgICAgICAgICBuYW1lOiBub2RlLmVsZW1lbnQubmFtZSxcbiAgICAgICAgICAgIGxvZ3M6IG5vZGUubG9ncyxcbiAgICAgICAgICAgIHByb3BzOiBfZXh0ZW5kcyh7XG4gICAgICAgICAgICAgIGNoaWxkcmVuOiAnPGZ1bmN0aW9uIGNoaWxkcmVuPidcbiAgICAgICAgICAgIH0sIHJlc3QpLFxuICAgICAgICAgICAgdXNlZDogbm9kZS5lbGVtZW50LnVzZWQoKSxcbiAgICAgICAgICAgIGlkOiBub2RlLmVsZW1lbnQuaWQsXG4gICAgICAgICAgICBjaGlsZHJlbjogbm9kZS5jaGlsZHJlbi5tYXAoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBsb29wT3ZlcihjaGlsZCwgaW5kICsgMSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH07XG4gICAgICAgIH0ocm9vdCk7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhdmFpbGFibGUgaW4gcHJvZHVjdGlvbiBtb2RlJyk7XG4gICAgfSxcbiAgICBhZGROb2RlRW50ZXJDYWxsYmFjazogZnVuY3Rpb24gYWRkTm9kZUVudGVyQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIG9uTm9kZUVudGVyLnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgYWRkTm9kZU91dENhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlT3V0Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIG9uTm9kZU91dC5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZVJlbW92ZTogZnVuY3Rpb24gb25Ob2RlUmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgICBfb25Ob2RlUmVtb3ZlLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbnZhciBfQ29udGV4dCA9IHJlcXVpcmUoJy4uL0NvbnRleHQnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNyZWF0ZVVzZUVsZW1lbnRIb29rID0gZnVuY3Rpb24gY3JlYXRlVXNlRWxlbWVudEhvb2socHJvY2Vzc29yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoQ29udGV4dCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgcmV0dXJuIENvbnRleHRbX0NvbnRleHQuUFVCTElDX0NPTlRFWFRfS0VZXSgpO1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlRWxlbWVudEhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwgPSByZXF1aXJlKCdmYXN0LWRlZXAtZXF1YWwnKTtcblxudmFyIF9mYXN0RGVlcEVxdWFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zhc3REZWVwRXF1YWwpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbnZhciBTdG9yYWdlID0ge1xuICBlbGVtZW50czoge30sXG4gIGdldDogZnVuY3Rpb24gZ2V0KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdID0geyBlZmZlY3RzOiBbXSwgY29uc3VtZXI6IDAgfTtcbiAgfSxcbiAgY2xlYW5VcDogZnVuY3Rpb24gY2xlYW5VcChpZCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2lkXSkge1xuICAgICAgZGVsZXRlIHRoaXMuZWxlbWVudHNbaWRdO1xuICAgIH1cbiAgfVxufTtcblxudmFyIGNyZWF0ZUVmZmVjdCA9IGZ1bmN0aW9uIGNyZWF0ZUVmZmVjdChjYWxsYmFjaywgZGVwcykge1xuICByZXR1cm4ge1xuICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICBkZXBzOiBkZXBzXG4gIH07XG59O1xudmFyIHVwZGF0ZUVmZmVjdCA9IGZ1bmN0aW9uIHVwZGF0ZUVmZmVjdChlZmZlY3QsIGNhbGxiYWNrLCBkZXBzKSB7XG4gIGVmZmVjdC5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICBlZmZlY3Qub2xkRGVwcyA9IGVmZmVjdC5kZXBzO1xuICBlZmZlY3QuZGVwcyA9IGRlcHM7XG4gIHJldHVybiBlZmZlY3Q7XG59O1xuXG5mdW5jdGlvbiBkZXBzRXF1YWwob2xkRGVwcywgbmV3RGVwcykge1xuICBpZiAoIW9sZERlcHMpIHJldHVybiBmYWxzZTtcbiAgaWYgKG9sZERlcHMubGVuZ3RoICE9PSBuZXdEZXBzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKDAsIF9mYXN0RGVlcEVxdWFsMi5kZWZhdWx0KShvbGREZXBzLCBuZXdEZXBzKTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVFZmZlY3Qobm9kZSwgZWZmZWN0KSB7XG4gIHZhciBkZXBzID0gZWZmZWN0LmRlcHMsXG4gICAgICBvbGREZXBzID0gZWZmZWN0Lm9sZERlcHMsXG4gICAgICBjYWxsYmFjayA9IGVmZmVjdC5jYWxsYmFjaztcblxuXG4gIGlmICh0eXBlb2YgZGVwcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gIH0gZWxzZSBpZiAoZGVwcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAobm9kZS5lbGVtZW50LnVzZWQoKSA9PT0gMSkge1xuICAgICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICAgICAgaWYgKF9fREVWX18pIG5vZGUubG9nKCd1c2VFZmZlY3Q6Y29uc3VtZWQnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGFyZUVxdWFsID0gZGVwc0VxdWFsKG9sZERlcHMsIGRlcHMpO1xuXG4gICAgaWYgKCFhcmVFcXVhbCkge1xuICAgICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICAgICAgaWYgKF9fREVWX18pIG5vZGUubG9nKCd1c2VFZmZlY3Q6Y29uc3VtZWQnKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIGNyZWF0ZVVzZUVmZmVjdEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFZmZlY3RIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgc3RvcmFnZS5lZmZlY3RzLmZvckVhY2goZnVuY3Rpb24gKGVmZmVjdCkge1xuICAgICAgaWYgKGVmZmVjdC5jbGVhblVwKSB7XG4gICAgICAgIGVmZmVjdC5jbGVhblVwKCk7XG4gICAgICAgIGlmIChfX0RFVl9fKSBub2RlLmxvZygndXNlRWZmZWN0OmNsZWFuVXAnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHByb2Nlc3Nvci5vbk5vZGVPdXQoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICBpZiAoc3RvcmFnZS5lZmZlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHN0b3JhZ2UuZWZmZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChlZmZlY3QpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVFZmZlY3Qobm9kZSwgZWZmZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIGRlcHMpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICAvLyBmaXJzdCBydW5cbiAgICBpZiAoZWxlbWVudC51c2VkKCkgPT09IDApIHtcbiAgICAgIHN0b3JhZ2UuZWZmZWN0cy5wdXNoKGNyZWF0ZUVmZmVjdChjYWxsYmFjaywgZGVwcykpO1xuXG4gICAgICAvLyBvdGhlciBydW5zXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpbmRleCA9IHN0b3JhZ2UuY29uc3VtZXI7XG5cbiAgICAgIHN0b3JhZ2UuY29uc3VtZXIgPSBpbmRleCA8IHN0b3JhZ2UuZWZmZWN0cy5sZW5ndGggLSAxID8gc3RvcmFnZS5jb25zdW1lciArIDEgOiAwO1xuICAgICAgdXBkYXRlRWZmZWN0KHN0b3JhZ2UuZWZmZWN0c1tpbmRleF0sIGNhbGxiYWNrLCBkZXBzKTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFZmZlY3RIb29rO1xuXG5cbmNyZWF0ZVVzZUVmZmVjdEhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIFN0b3JhZ2UuZWxlbWVudHMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjcmVhdGVVc2VFbGVtZW50SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRIb29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgcmV0dXJuIHByb2Nlc3Nvci5ub2RlKCkuZWxlbWVudDtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVsZW1lbnRIb29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZVB1YlN1Ykhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHN1YnNjcmliZXJzID0ge307XG5cbnZhciBzdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUobm9kZSwgZWxlbWVudCwgdHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgc3Vic2NyaWJlcnNbdHlwZV0gPSB7fTtcbiAgaWYgKF9fREVWX18pIHtcbiAgICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdKSB7XG4gICAgICBub2RlLmxvZygndXNlUHViU3ViOnN1YnNjcmliZScsIHR5cGUpO1xuICAgIH1cbiAgfVxuICBzdWJzY3JpYmVyc1t0eXBlXVtlbGVtZW50LmlkXSA9IGNhbGxiYWNrO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICBub2RlLmxvZygndXNlUHViU3ViOnVuc3Vic2NyaWJlJywgdHlwZSk7XG4gICAgfVxuICAgIGRlbGV0ZSBzdWJzY3JpYmVyc1t0eXBlXVtlbGVtZW50LmlkXTtcbiAgfTtcbn07XG52YXIgcHVibGlzaCA9IGZ1bmN0aW9uIHB1Ymxpc2gobm9kZSwgdHlwZSwgcGF5bG9hZCkge1xuICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdKSByZXR1cm47XG4gIGlmIChfX0RFVl9fKSB7XG4gICAgbm9kZS5sb2coJ3VzZVB1YlN1YjpwdWJsaXNoOicgKyB0eXBlLCBwYXlsb2FkKTtcbiAgfVxuICBPYmplY3Qua2V5cyhzdWJzY3JpYmVyc1t0eXBlXSkuZm9yRWFjaChmdW5jdGlvbiAoaWQpIHtcbiAgICBzdWJzY3JpYmVyc1t0eXBlXVtpZF0ocGF5bG9hZCk7XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlVXNlUHViU3ViSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIE9iamVjdC5rZXlzKHN1YnNjcmliZXJzKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBpZiAoc3Vic2NyaWJlcnNbdHlwZV1bbm9kZS5lbGVtZW50LmlkXSkge1xuICAgICAgICBkZWxldGUgc3Vic2NyaWJlcnNbdHlwZV1bbm9kZS5lbGVtZW50LmlkXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoc2NvcGVkRWxlbWVudCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbCA9IHNjb3BlZEVsZW1lbnQgfHwgbm9kZS5lbGVtZW50O1xuICAgIHZhciBzdWJzY3JpYmVGdW5jID0gZnVuY3Rpb24gc3Vic2NyaWJlRnVuYygpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBwYXJhbXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgcGFyYW1zW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3Vic2NyaWJlLmFwcGx5KHVuZGVmaW5lZCwgW25vZGUsIGVsXS5jb25jYXQocGFyYW1zKSk7XG4gICAgfTtcbiAgICB2YXIgcHVibGlzaEZ1bmMgPSBmdW5jdGlvbiBwdWJsaXNoRnVuYygpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgcGFyYW1zW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwdWJsaXNoLmFwcGx5KHVuZGVmaW5lZCwgW25vZGVdLmNvbmNhdChwYXJhbXMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1YnNjcmliZTogc3Vic2NyaWJlRnVuYyxcbiAgICAgIHB1Ymxpc2g6IHB1Ymxpc2hGdW5jLFxuICAgICAgc3Vic2NyaWJlcnM6IHN1YnNjcmliZXJzXG4gICAgfTtcbiAgfTtcbn1cblxuY3JlYXRlVXNlUHViU3ViSG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgc3Vic2NyaWJlcnMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZVJlZHVjZXJIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gY3JlYXRlRGlzcGF0Y2hFbGVtZW50KGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBhY3Rpb24gPSBfcmVmLmFjdGlvbixcbiAgICAgICAgcHJvcHNUb0FjdGlvbiA9IF9yZWYucHJvcHNUb0FjdGlvbixcbiAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2FjdGlvbicsICdwcm9wc1RvQWN0aW9uJ10pO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgZGlzcGF0Y2goYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHByb3BzVG9BY3Rpb24pIHtcbiAgICAgIGRpc3BhdGNoKHByb3BzVG9BY3Rpb24ocmVzdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJzxEaXNwYXRjaD4gZXhwZWN0cyBcImFjdGlvblwiIG9yIFwicHJvcHNUb0FjdGlvblwiIHByb3AuJyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVc2VSZWR1Y2VySG9vayhwcm9jZXNzb3IsIHVzZVN0YXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgaW5pdGlhbFN0YXRlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICB2YXIgX3VzZVN0YXRlID0gdXNlU3RhdGUoaW5pdGlhbFN0YXRlKSxcbiAgICAgICAgX3VzZVN0YXRlMiA9IF9zbGljZWRUb0FycmF5KF91c2VTdGF0ZSwgMiksXG4gICAgICAgIHN0YXRlID0gX3VzZVN0YXRlMlswXSxcbiAgICAgICAgc2V0U3RhdGUgPSBfdXNlU3RhdGUyWzFdO1xuXG4gICAgdmFyIGRpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICBub2RlLmxvZygndXNlUmVkdWNlcjpkaXNwYXRjaCcsIGFjdGlvbi50eXBlKTtcbiAgICAgIH1cbiAgICAgIHNldFN0YXRlKHJlZHVjZXIoc3RhdGUoKSwgYWN0aW9uKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoLCBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpLCAvLyA8RGlzcGF0Y2g+XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlKCk7XG4gICAgfSAvLyA8R2V0U3RhdGU+XG4gICAgXTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VTdGF0ZUhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IHN0YXRlczogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVzZVN0YXRlSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoaW5pdGlhbFN0YXRlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlcy5wdXNoKGluaXRpYWxTdGF0ZSk7XG4gICAgICBpbmRleCA9IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDE7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICB9XG5cbiAgICBpZiAoX19ERVZfXykgbm9kZS5sb2coJ3VzZVN0YXRlOmNvbnN1bWVkJywgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdKTtcblxuICAgIHJldHVybiBbZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XTtcbiAgICB9LCBmdW5jdGlvbiAobmV3U3RhdGUpIHtcbiAgICAgIGlmIChfX0RFVl9fKSBub2RlLmxvZygndXNlU3RhdGU6bmV3JywgbmV3U3RhdGUpO1xuICAgICAgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdID0gbmV3U3RhdGU7XG4gICAgICBpZiAoIWVsZW1lbnQuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgbm9kZS5yZXJ1bigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1dO1xuICB9O1xufVxuXG5jcmVhdGVVc2VTdGF0ZUhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIFN0b3JhZ2UuZWxlbWVudHMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNWYWxpZEhvb2tDb250ZXh0O1xuZnVuY3Rpb24gaXNWYWxpZEhvb2tDb250ZXh0KHByb2Nlc3Nvcikge1xuICBpZiAoIXByb2Nlc3Nvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHRlcnJpYmx5IHdyb25nIGhhcHBlbmVkLiBUaGUgaG9vayBmYWN0b3J5IGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRob3V0IGEgcHJvY2Vzc29yLicpO1xuICB9XG4gIGlmICghcHJvY2Vzc29yLm5vZGUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSG9va3MgbXVzdCBiZSBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgYW4gQWN0TUwgZWxlbWVudC4nKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNyZWF0ZVJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lO1xuXG52YXIgX1Byb2Nlc3NvciA9IHJlcXVpcmUoJy4vUHJvY2Vzc29yJyk7XG5cbnZhciBfUHJvY2Vzc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Byb2Nlc3Nvcik7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQgPSByZXF1aXJlKCcuL3V0aWxzL2lzQWN0TUxFbGVtZW50Jyk7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RNTEVsZW1lbnQpO1xuXG52YXIgX0FjdEVsZW1lbnQgPSByZXF1aXJlKCcuL0FjdEVsZW1lbnQnKTtcblxudmFyIF9BY3RFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdEVsZW1lbnQpO1xuXG52YXIgX3VzZUVsZW1lbnQgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVsZW1lbnQnKTtcblxudmFyIF91c2VFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVsZW1lbnQpO1xuXG52YXIgX3VzZVB1YlN1YiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHViU3ViJyk7XG5cbnZhciBfdXNlUHViU3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVB1YlN1Yik7XG5cbnZhciBfdXNlU3RhdGUgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVN0YXRlJyk7XG5cbnZhciBfdXNlU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlU3RhdGUpO1xuXG52YXIgX3VzZVJlZHVjZXIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVJlZHVjZXInKTtcblxudmFyIF91c2VSZWR1Y2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVJlZHVjZXIpO1xuXG52YXIgX3VzZUVmZmVjdCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWZmZWN0Jyk7XG5cbnZhciBfdXNlRWZmZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVmZmVjdCk7XG5cbnZhciBfdXNlQ29udGV4dCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlQ29udGV4dCcpO1xuXG52YXIgX3VzZUNvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlQ29udGV4dCk7XG5cbnZhciBfQ29udGV4dCA9IHJlcXVpcmUoJy4vQ29udGV4dCcpO1xuXG52YXIgX0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNyZWF0ZVJ1bnRpbWUoKSB7XG4gIHZhciBwcm9jZXNzb3IgPSAoMCwgX1Byb2Nlc3NvcjIuZGVmYXVsdCkoKTtcblxuICBmdW5jdGlvbiBBKGZ1bmMsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgY2hpbGRyZW5bX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiAoMCwgX0FjdEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmMsIHByb3BzLCBjaGlsZHJlbik7XG4gIH1cbiAgZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0ZWQuIEluc3RlYWQgJyArIGVsZW1lbnQudG9TdHJpbmcoKSArICcgcGFzc2VkLicpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvY2Vzc29yLnJ1bihlbGVtZW50KTtcbiAgfVxuICB2YXIgRnJhZ21lbnQgPSBmdW5jdGlvbiBGcmFnbWVudChfcmVmKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbjtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH07XG4gIHZhciB1c2VFbGVtZW50ID0gKDAsIF91c2VFbGVtZW50Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlU3RhdGUgPSAoMCwgX3VzZVN0YXRlMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlUHViU3ViID0gKDAsIF91c2VQdWJTdWIyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VSZWR1Y2VyID0gKDAsIF91c2VSZWR1Y2VyMi5kZWZhdWx0KShwcm9jZXNzb3IsIHVzZVN0YXRlKTtcbiAgdmFyIHVzZUVmZmVjdCA9ICgwLCBfdXNlRWZmZWN0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlQ29udGV4dCA9ICgwLCBfdXNlQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIGNyZWF0ZUNvbnRleHQgPSAoMCwgX0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgcmV0dXJuIHtcbiAgICBBOiBBLFxuICAgIHJ1bjogcnVuLFxuICAgIEZyYWdtZW50OiBGcmFnbWVudCxcbiAgICBwcm9jZXNzb3I6IHByb2Nlc3NvcixcbiAgICB1c2VFbGVtZW50OiB1c2VFbGVtZW50LFxuICAgIHVzZVB1YlN1YjogdXNlUHViU3ViLFxuICAgIHVzZVN0YXRlOiB1c2VTdGF0ZSxcbiAgICB1c2VSZWR1Y2VyOiB1c2VSZWR1Y2VyLFxuICAgIHVzZUVmZmVjdDogdXNlRWZmZWN0LFxuICAgIHVzZUNvbnRleHQ6IHVzZUNvbnRleHQsXG4gICAgY3JlYXRlQ29udGV4dDogY3JlYXRlQ29udGV4dFxuICB9O1xufVxuXG52YXIgcnVudGltZSA9IGNyZWF0ZVJ1bnRpbWUoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xubW9kdWxlLmV4cG9ydHMuY3JlYXRlUnVudGltZSA9IGNyZWF0ZVJ1bnRpbWUoKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQWN0TUxFbGVtZW50O1xuZnVuY3Rpb24gaXNBY3RNTEVsZW1lbnQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50Ll9fYWN0bWwgPT09IHRydWU7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGtleUxpc3QgPSBPYmplY3Qua2V5cztcbnZhciBoYXNQcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlcXVhbChhLCBiKSB7XG4gIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcblxuICBpZiAoYSAmJiBiICYmIHR5cGVvZiBhID09ICdvYmplY3QnICYmIHR5cGVvZiBiID09ICdvYmplY3QnKSB7XG4gICAgdmFyIGFyckEgPSBpc0FycmF5KGEpXG4gICAgICAsIGFyckIgPSBpc0FycmF5KGIpXG4gICAgICAsIGlcbiAgICAgICwgbGVuZ3RoXG4gICAgICAsIGtleTtcblxuICAgIGlmIChhcnJBICYmIGFyckIpIHtcbiAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCAhPSBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgICBpZiAoIWVxdWFsKGFbaV0sIGJbaV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYXJyQSAhPSBhcnJCKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgZGF0ZUEgPSBhIGluc3RhbmNlb2YgRGF0ZVxuICAgICAgLCBkYXRlQiA9IGIgaW5zdGFuY2VvZiBEYXRlO1xuICAgIGlmIChkYXRlQSAhPSBkYXRlQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChkYXRlQSAmJiBkYXRlQikgcmV0dXJuIGEuZ2V0VGltZSgpID09IGIuZ2V0VGltZSgpO1xuXG4gICAgdmFyIHJlZ2V4cEEgPSBhIGluc3RhbmNlb2YgUmVnRXhwXG4gICAgICAsIHJlZ2V4cEIgPSBiIGluc3RhbmNlb2YgUmVnRXhwO1xuICAgIGlmIChyZWdleHBBICE9IHJlZ2V4cEIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAocmVnZXhwQSAmJiByZWdleHBCKSByZXR1cm4gYS50b1N0cmluZygpID09IGIudG9TdHJpbmcoKTtcblxuICAgIHZhciBrZXlzID0ga2V5TGlzdChhKTtcbiAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGggIT09IGtleUxpc3QoYikubGVuZ3RoKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KVxuICAgICAgaWYgKCFoYXNQcm9wLmNhbGwoYiwga2V5c1tpXSkpIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmICghZXF1YWwoYVtrZXldLCBiW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gYSE9PWEgJiYgYiE9PWI7XG59O1xuIiwiaW1wb3J0IENpcmN1bGFySlNPTiBmcm9tICcuL3ZlbmRvci9DaXJjdWxhckpTT04nO1xuaW1wb3J0IFNlcmlhbGl6ZUVycm9yIGZyb20gJy4vdmVuZG9yL1NlcmlhbGl6ZUVycm9yJztcblxuY29uc3QgeyBzdHJpbmdpZnkgfSA9IENpcmN1bGFySlNPTjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2FuaXRpemUoc29tZXRoaW5nLCBzaG93RXJyb3JJbkNvbnNvbGUgPSBmYWxzZSkge1xuICB2YXIgcmVzdWx0O1xuXG4gIHRyeSB7XG4gICAgcmVzdWx0ID0gSlNPTi5wYXJzZShzdHJpbmdpZnkoc29tZXRoaW5nLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdmFsdWUubmFtZSA9PT0gJycgPyAnPGFub255bW91cz4nIDogYGZ1bmN0aW9uICR7IHZhbHVlLm5hbWUgfSgpYDtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHJldHVybiBTZXJpYWxpemVFcnJvcih2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSwgdW5kZWZpbmVkLCB0cnVlKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKHNob3dFcnJvckluQ29uc29sZSkge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIH1cbiAgICByZXN1bHQgPSBudWxsO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59IiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qIVxuQ29weXJpZ2h0IChDKSAyMDEzLTIwMTcgYnkgQW5kcmVhIEdpYW1tYXJjaGkgLSBAV2ViUmVmbGVjdGlvblxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG5cbiovXG52YXJcbi8vIHNob3VsZCBiZSBhIG5vdCBzbyBjb21tb24gY2hhclxuLy8gcG9zc2libHkgb25lIEpTT04gZG9lcyBub3QgZW5jb2RlXG4vLyBwb3NzaWJseSBvbmUgZW5jb2RlVVJJQ29tcG9uZW50IGRvZXMgbm90IGVuY29kZVxuLy8gcmlnaHQgbm93IHRoaXMgY2hhciBpcyAnficgYnV0IHRoaXMgbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmVcbnNwZWNpYWxDaGFyID0gJ34nLFxuc2FmZVNwZWNpYWxDaGFyID0gJ1xcXFx4JyArIChcbiAgJzAnICsgc3BlY2lhbENoYXIuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNilcbikuc2xpY2UoLTIpLFxuZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciA9ICdcXFxcJyArIHNhZmVTcGVjaWFsQ2hhcixcbnNwZWNpYWxDaGFyUkcgPSBuZXcgUmVnRXhwKHNhZmVTcGVjaWFsQ2hhciwgJ2cnKSxcbnNhZmVTcGVjaWFsQ2hhclJHID0gbmV3IFJlZ0V4cChlc2NhcGVkU2FmZVNwZWNpYWxDaGFyLCAnZycpLFxuXG5zYWZlU3RhcnRXaXRoU3BlY2lhbENoYXJSRyA9IG5ldyBSZWdFeHAoJyg/Ol58KFteXFxcXFxcXFxdKSknICsgZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciksXG5cbmluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKHYpe1xuICBmb3IodmFyIGk9dGhpcy5sZW5ndGg7aS0tJiZ0aGlzW2ldIT09djspO1xuICByZXR1cm4gaTtcbn0sXG4kU3RyaW5nID0gU3RyaW5nICAvLyB0aGVyZSdzIG5vIHdheSB0byBkcm9wIHdhcm5pbmdzIGluIEpTSGludFxuICAgICAgICAgICAgICAgICAgLy8gYWJvdXQgbmV3IFN0cmluZyAuLi4gd2VsbCwgSSBuZWVkIHRoYXQgaGVyZSFcbiAgICAgICAgICAgICAgICAgIC8vIGZha2VkLCBhbmQgaGFwcHkgbGludGVyIVxuO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVJlcGxhY2VyKHZhbHVlLCByZXBsYWNlciwgcmVzb2x2ZSkge1xudmFyXG4gIGluc3BlY3QgPSAhIXJlcGxhY2VyLFxuICBwYXRoID0gW10sXG4gIGFsbCAgPSBbdmFsdWVdLFxuICBzZWVuID0gW3ZhbHVlXSxcbiAgbWFwcCA9IFtyZXNvbHZlID8gc3BlY2lhbENoYXIgOiAnPGNpcmN1bGFyPiddLFxuICBsYXN0ID0gdmFsdWUsXG4gIGx2bCAgPSAxLFxuICBpLCBmblxuO1xuaWYgKGluc3BlY3QpIHtcbiAgZm4gPSB0eXBlb2YgcmVwbGFjZXIgPT09ICdvYmplY3QnID9cbiAgICBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGtleSAhPT0gJycgJiYgcmVwbGFjZXIuaW5kZXhPZihrZXkpIDwgMCA/IHZvaWQgMCA6IHZhbHVlO1xuICAgIH0gOlxuICAgIHJlcGxhY2VyO1xufVxucmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgLy8gdGhlIHJlcGxhY2VyIGhhcyByaWdodHMgdG8gZGVjaWRlXG4gIC8vIGlmIGEgbmV3IG9iamVjdCBzaG91bGQgYmUgcmV0dXJuZWRcbiAgLy8gb3IgaWYgdGhlcmUncyBzb21lIGtleSB0byBkcm9wXG4gIC8vIGxldCdzIGNhbGwgaXQgaGVyZSByYXRoZXIgdGhhbiBcInRvbyBsYXRlXCJcbiAgaWYgKGluc3BlY3QpIHZhbHVlID0gZm4uY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcblxuICAvLyBkaWQgeW91IGtub3cgPyBTYWZhcmkgcGFzc2VzIGtleXMgYXMgaW50ZWdlcnMgZm9yIGFycmF5c1xuICAvLyB3aGljaCBtZWFucyBpZiAoa2V5KSB3aGVuIGtleSA9PT0gMCB3b24ndCBwYXNzIHRoZSBjaGVja1xuICBpZiAoa2V5ICE9PSAnJykge1xuICAgIGlmIChsYXN0ICE9PSB0aGlzKSB7XG4gICAgICBpID0gbHZsIC0gaW5kZXhPZi5jYWxsKGFsbCwgdGhpcykgLSAxO1xuICAgICAgbHZsIC09IGk7XG4gICAgICBhbGwuc3BsaWNlKGx2bCwgYWxsLmxlbmd0aCk7XG4gICAgICBwYXRoLnNwbGljZShsdmwgLSAxLCBwYXRoLmxlbmd0aCk7XG4gICAgICBsYXN0ID0gdGhpcztcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2cobHZsLCBrZXksIHBhdGgpO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlKSB7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IHJlZmVycmluZyB0byBwYXJlbnQgb2JqZWN0LCBhZGQgdG8gdGhlXG4gICAgICAvLyBvYmplY3QgcGF0aCBzdGFjay4gT3RoZXJ3aXNlIGl0IGlzIGFscmVhZHkgdGhlcmUuXG4gICAgICBpZiAoaW5kZXhPZi5jYWxsKGFsbCwgdmFsdWUpIDwgMCkge1xuICAgICAgICBhbGwucHVzaChsYXN0ID0gdmFsdWUpO1xuICAgICAgfVxuICAgICAgbHZsID0gYWxsLmxlbmd0aDtcbiAgICAgIGkgPSBpbmRleE9mLmNhbGwoc2VlbiwgdmFsdWUpO1xuICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgIGkgPSBzZWVuLnB1c2godmFsdWUpIC0gMTtcbiAgICAgICAgaWYgKHJlc29sdmUpIHtcbiAgICAgICAgICAvLyBrZXkgY2Fubm90IGNvbnRhaW4gc3BlY2lhbENoYXIgYnV0IGNvdWxkIGJlIG5vdCBhIHN0cmluZ1xuICAgICAgICAgIHBhdGgucHVzaCgoJycgKyBrZXkpLnJlcGxhY2Uoc3BlY2lhbENoYXJSRywgc2FmZVNwZWNpYWxDaGFyKSk7XG4gICAgICAgICAgbWFwcFtpXSA9IHNwZWNpYWxDaGFyICsgcGF0aC5qb2luKHNwZWNpYWxDaGFyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYXBwW2ldID0gbWFwcFswXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBtYXBwW2ldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiByZXNvbHZlKSB7XG4gICAgICAgIC8vIGVuc3VyZSBubyBzcGVjaWFsIGNoYXIgaW52b2x2ZWQgb24gZGVzZXJpYWxpemF0aW9uXG4gICAgICAgIC8vIGluIHRoaXMgY2FzZSBvbmx5IGZpcnN0IGNoYXIgaXMgaW1wb3J0YW50XG4gICAgICAgIC8vIG5vIG5lZWQgdG8gcmVwbGFjZSBhbGwgdmFsdWUgKGJldHRlciBwZXJmb3JtYW5jZSlcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSAucmVwbGFjZShzYWZlU3BlY2lhbENoYXIsIGVzY2FwZWRTYWZlU3BlY2lhbENoYXIpXG4gICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2Uoc3BlY2lhbENoYXIsIHNhZmVTcGVjaWFsQ2hhcik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG59XG5cbmZ1bmN0aW9uIHJldHJpZXZlRnJvbVBhdGgoY3VycmVudCwga2V5cykge1xuZm9yKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGN1cnJlbnQgPSBjdXJyZW50W1xuICAvLyBrZXlzIHNob3VsZCBiZSBub3JtYWxpemVkIGJhY2sgaGVyZVxuICBrZXlzW2krK10ucmVwbGFjZShzYWZlU3BlY2lhbENoYXJSRywgc3BlY2lhbENoYXIpXG5dKTtcbnJldHVybiBjdXJyZW50O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVJldml2ZXIocmV2aXZlcikge1xucmV0dXJuIGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbiAgaWYgKGlzU3RyaW5nICYmIHZhbHVlLmNoYXJBdCgwKSA9PT0gc3BlY2lhbENoYXIpIHtcbiAgICByZXR1cm4gbmV3ICRTdHJpbmcodmFsdWUuc2xpY2UoMSkpO1xuICB9XG4gIGlmIChrZXkgPT09ICcnKSB2YWx1ZSA9IHJlZ2VuZXJhdGUodmFsdWUsIHZhbHVlLCB7fSk7XG4gIC8vIGFnYWluLCBvbmx5IG9uZSBuZWVkZWQsIGRvIG5vdCB1c2UgdGhlIFJlZ0V4cCBmb3IgdGhpcyByZXBsYWNlbWVudFxuICAvLyBvbmx5IGtleXMgbmVlZCB0aGUgUmVnRXhwXG4gIGlmIChpc1N0cmluZykgdmFsdWUgPSB2YWx1ZSAucmVwbGFjZShzYWZlU3RhcnRXaXRoU3BlY2lhbENoYXJSRywgJyQxJyArIHNwZWNpYWxDaGFyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciwgc2FmZVNwZWNpYWxDaGFyKTtcbiAgcmV0dXJuIHJldml2ZXIgPyByZXZpdmVyLmNhbGwodGhpcywga2V5LCB2YWx1ZSkgOiB2YWx1ZTtcbn07XG59XG5cbmZ1bmN0aW9uIHJlZ2VuZXJhdGVBcnJheShyb290LCBjdXJyZW50LCByZXRyaWV2ZSkge1xuZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnQubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgY3VycmVudFtpXSA9IHJlZ2VuZXJhdGUocm9vdCwgY3VycmVudFtpXSwgcmV0cmlldmUpO1xufVxucmV0dXJuIGN1cnJlbnQ7XG59XG5cbmZ1bmN0aW9uIHJlZ2VuZXJhdGVPYmplY3Qocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIHtcbmZvciAodmFyIGtleSBpbiBjdXJyZW50KSB7XG4gIGlmIChjdXJyZW50Lmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICBjdXJyZW50W2tleV0gPSByZWdlbmVyYXRlKHJvb3QsIGN1cnJlbnRba2V5XSwgcmV0cmlldmUpO1xuICB9XG59XG5yZXR1cm4gY3VycmVudDtcbn1cblxuZnVuY3Rpb24gcmVnZW5lcmF0ZShyb290LCBjdXJyZW50LCByZXRyaWV2ZSkge1xucmV0dXJuIGN1cnJlbnQgaW5zdGFuY2VvZiBBcnJheSA/XG4gIC8vIGZhc3QgQXJyYXkgcmVjb25zdHJ1Y3Rpb25cbiAgcmVnZW5lcmF0ZUFycmF5KHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSA6XG4gIChcbiAgICBjdXJyZW50IGluc3RhbmNlb2YgJFN0cmluZyA/XG4gICAgICAoXG4gICAgICAgIC8vIHJvb3QgaXMgYW4gZW1wdHkgc3RyaW5nXG4gICAgICAgIGN1cnJlbnQubGVuZ3RoID9cbiAgICAgICAgICAoXG4gICAgICAgICAgICByZXRyaWV2ZS5oYXNPd25Qcm9wZXJ0eShjdXJyZW50KSA/XG4gICAgICAgICAgICAgIHJldHJpZXZlW2N1cnJlbnRdIDpcbiAgICAgICAgICAgICAgcmV0cmlldmVbY3VycmVudF0gPSByZXRyaWV2ZUZyb21QYXRoKFxuICAgICAgICAgICAgICAgIHJvb3QsIGN1cnJlbnQuc3BsaXQoc3BlY2lhbENoYXIpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICApIDpcbiAgICAgICAgICByb290XG4gICAgICApIDpcbiAgICAgIChcbiAgICAgICAgY3VycmVudCBpbnN0YW5jZW9mIE9iamVjdCA/XG4gICAgICAgICAgLy8gZGVkaWNhdGVkIE9iamVjdCBwYXJzZXJcbiAgICAgICAgICByZWdlbmVyYXRlT2JqZWN0KHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSA6XG4gICAgICAgICAgLy8gdmFsdWUgYXMgaXQgaXNcbiAgICAgICAgICBjdXJyZW50XG4gICAgICApXG4gIClcbjtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5UmVjdXJzaW9uKHZhbHVlLCByZXBsYWNlciwgc3BhY2UsIGRvTm90UmVzb2x2ZSkge1xucmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlLCBnZW5lcmF0ZVJlcGxhY2VyKHZhbHVlLCByZXBsYWNlciwgIWRvTm90UmVzb2x2ZSksIHNwYWNlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VSZWN1cnNpb24odGV4dCwgcmV2aXZlcikge1xucmV0dXJuIEpTT04ucGFyc2UodGV4dCwgZ2VuZXJhdGVSZXZpdmVyKHJldml2ZXIpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdHJpbmdpZnk6IHN0cmluZ2lmeVJlY3Vyc2lvbixcbiAgcGFyc2U6IHBhcnNlUmVjdXJzaW9uXG59IiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8vIENyZWRpdHM6IGh0dHBzOi8vZ2l0aHViLmNvbS9zaW5kcmVzb3JodXMvc2VyaWFsaXplLWVycm9yXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB2YWx1ZSA9PiB7XG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGRlc3Ryb3lDaXJjdWxhcih2YWx1ZSwgW10pO1xuXHR9XG5cblx0Ly8gUGVvcGxlIHNvbWV0aW1lcyB0aHJvdyB0aGluZ3MgYmVzaWRlcyBFcnJvciBvYmplY3RzLCBzb+KAplxuXG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHQvLyBKU09OLnN0cmluZ2lmeSBkaXNjYXJkcyBmdW5jdGlvbnMuIFdlIGRvIHRvbywgdW5sZXNzIGEgZnVuY3Rpb24gaXMgdGhyb3duIGRpcmVjdGx5LlxuXHRcdHJldHVybiBgW0Z1bmN0aW9uOiAkeyh2YWx1ZS5uYW1lIHx8ICdhbm9ueW1vdXMnKX1dYDtcblx0fVxuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbi8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2Rlc3Ryb3ktY2lyY3VsYXJcbmZ1bmN0aW9uIGRlc3Ryb3lDaXJjdWxhcihmcm9tLCBzZWVuKSB7XG5cdGNvbnN0IHRvID0gQXJyYXkuaXNBcnJheShmcm9tKSA/IFtdIDoge307XG5cblx0c2Vlbi5wdXNoKGZyb20pO1xuXG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGZyb20pKSB7XG5cdFx0Y29uc3QgdmFsdWUgPSBmcm9tW2tleV07XG5cblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHRvW2tleV0gPSB2YWx1ZTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmIChzZWVuLmluZGV4T2YoZnJvbVtrZXldKSA9PT0gLTEpIHtcblx0XHRcdHRvW2tleV0gPSBkZXN0cm95Q2lyY3VsYXIoZnJvbVtrZXldLCBzZWVuLnNsaWNlKDApKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHRvW2tleV0gPSAnW0NpcmN1bGFyXSc7XG5cdH1cblxuXHRpZiAodHlwZW9mIGZyb20ubmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHR0by5uYW1lID0gZnJvbS5uYW1lO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBmcm9tLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG5cdFx0dG8ubWVzc2FnZSA9IGZyb20ubWVzc2FnZTtcblx0fVxuXG5cdGlmICh0eXBlb2YgZnJvbS5zdGFjayA9PT0gJ3N0cmluZycpIHtcblx0XHR0by5zdGFjayA9IGZyb20uc3RhY2s7XG5cdH1cblxuXHRyZXR1cm4gdG87XG59IiwiY29uc3QgRU5URVIgPSAnRU5URVInO1xuY29uc3QgT1VUID0gJ09VVCc7XG5jb25zdCBSRU1PVkUgPSAnUkVNT1ZFJztcblxuaW1wb3J0IHNhbml0aXplIGZyb20gJy4vaGVscGVycy9zYW5pdGl6ZSc7XG5cbmNvbnN0IGlzUnVubmluZ0luTm9kZSA9XG4gICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpICYmXG4gICh0eXBlb2YgcHJvY2Vzcy5yZWxlYXNlICE9PSAndW5kZWZpbmVkJykgJiZcbiAgKHByb2Nlc3MucmVsZWFzZS5uYW1lID09PSAnbm9kZScpO1xuXG5jb25zdCBnZXRJbmRNYXJnaW4gPSBpbmQgPT4ge1xuICByZXR1cm4gYG1hcmdpbi1sZWZ0OiAkeyBpbmQgKiAyMCB9cHg7YDtcbn07XG5jb25zdCBnZXRJbmRTcGFjZXMgPSBpbmQgPT4ge1xuICByZXR1cm4gWy4uLkFycmF5KGluZCAqIDIpLmtleXMoKV0ubWFwKHggPT4gJyAnKS5qb2luKCcnKTtcbn07XG5jb25zdCBwYXJzZUxvZ01ldGEgPSBtZXRhID0+IHtcbiAgaWYgKHR5cGVvZiBtZXRhID09PSAndW5kZWZpbmVkJykgcmV0dXJuICcnO1xuICBpZiAodHlwZW9mIG1ldGEgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBtZXRhID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIG1ldGEgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGAoJHsgSlNPTi5zdHJpbmdpZnkobWV0YSkgfSlgO1xuICB9XG4gIGlmICh0eXBlb2YgbWV0YSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZXRhKSkge1xuICAgICAgcmV0dXJuIGAoWy4uLiR7IG1ldGEubGVuZ3RoIH1dKWA7XG4gICAgfVxuICAgIHJldHVybiAnKG9iamVjdCknO1xuICB9XG4gIHJldHVybiBgKCR7IHR5cGVvZiBtZXRhIH0pYDtcbn07XG5cbmNvbnN0IHByaW50ID0ge1xuICBlbnRyYW5jZTogKHdoYXQsIGluZCkgPT4ge1xuICAgIGlmICghaXNSdW5uaW5nSW5Ob2RlKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBgJWMkeyB3aGF0IH1gLFxuICAgICAgICAnY29sb3I6IHJlZDsnICsgZ2V0SW5kTWFyZ2luKGluZClcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbICdcXHgxYlszOG0lc1xceDFiWzBtJywgYCR7IGdldEluZFNwYWNlcyhpbmQpICsgd2hhdCB9YF07XG4gIH0sXG4gIGRlZmF1bHQ6ICh3aGF0LCBpbmQpID0+IHtcbiAgICBpZiAoIWlzUnVubmluZ0luTm9kZSkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgYCVjJHsgd2hhdCB9YCxcbiAgICAgICAgZ2V0SW5kTWFyZ2luKGluZClcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbIGAkeyBnZXRJbmRTcGFjZXMoaW5kKSArIHdoYXQgfWAgXTtcbiAgfSxcbiAgaG9vazogKHdoYXQsIGluZCkgPT4ge1xuICAgIGlmICghaXNSdW5uaW5nSW5Ob2RlKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBgJWMkeyB3aGF0IH1gLFxuICAgICAgICAnY29sb3I6ICM5OTk7JyArIGdldEluZE1hcmdpbihpbmQpXG4gICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gWyAnXFx4MWJbMzRtJXNcXHgxYlswbScsIGAkeyBnZXRJbmRTcGFjZXMoaW5kKSArIHdoYXQgfWAgXTtcbiAgfSxcbiAgY3VycmVudDogKHdoYXQsIGluZCkgPT4ge1xuICAgIGlmICghaXNSdW5uaW5nSW5Ob2RlKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBgJWMkeyB3aGF0IH1gLFxuICAgICAgICAnZm9udC13ZWlnaHQ6IGJvbGQ7IGJvcmRlcjogc29saWQgMXB4ICM5OTk7IGJvcmRlci1yYWRpdXM6IDJweDsgcGFkZGluZzogMXB4IDA7JyArIGdldEluZE1hcmdpbihpbmQpXG4gICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4gWyBgJHsgZ2V0SW5kU3BhY2VzKGluZCkgKyB3aGF0IH1gLCAnXFx4MWJbMzFt4piFXFx4MWJbMG0nIF07XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHByaW50U25hcHNob3RUb0NvbnNvbGUoc25hcHNob3QpIHtcbiAgY29uc3QgWyB0eXBlLCBub2RlLCB0cmVlIF0gPSBzbmFwc2hvdDtcblxuICBsZXQgcHJpbnRMaW5lcyA9IFtcbiAgICBwcmludC5lbnRyYW5jZSgnX19fX19fX19fX19fX19fX19fX19fX18nLCAwKVxuICBdO1xuXG4gIHByaW50TGluZXMgPSBwcmludExpbmVzLmNvbmNhdCgoZnVuY3Rpb24gbG9vcCh7IGlkLCBpbmQsIG5hbWUsIHVzZWQsIGNoaWxkcmVuLCBsb2dzIH0pIHtcbiAgICBsZXQgbGluZXMgPSBbXTtcbiAgICBsZXQgZWxlbWVudE9wZW5UYWcgPSBgPCR7IG5hbWUgfSR7IHVzZWQgPiAwID8gYCgkeyB1c2VkIH0pYCA6ICcnIH0keyBjaGlsZHJlbi5sZW5ndGggPT09IDAgPyAnIC8nIDogJyd9PmA7XG5cbiAgICBsaW5lcy5wdXNoKFxuICAgICAgaWQgPT09IG5vZGUuZWxlbWVudC5pZCA/IHByaW50LmN1cnJlbnQoZWxlbWVudE9wZW5UYWcsIGluZCkgOiBwcmludC5kZWZhdWx0KGVsZW1lbnRPcGVuVGFnLCBpbmQpXG4gICAgKTtcbiAgICBpZiAobG9ncyAmJiBsb2dzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxpbmVzID0gbGluZXMuY29uY2F0KGxvZ3MubWFwKCh7IHR5cGUsIG1ldGEgfSkgPT4ge1xuICAgICAgICByZXR1cm4gcHJpbnQuaG9vayhg4qS3ICR7IHR5cGUgfSR7IHBhcnNlTG9nTWV0YShtZXRhKSB9YCwgaW5kKTtcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGNoaWxkcmVuLm1hcChjaGlsZCA9PiB7XG4gICAgICAgIGxpbmVzID0gbGluZXMuY29uY2F0KGxvb3AoY2hpbGQpKTtcbiAgICAgIH0pO1xuICAgICAgbGluZXMucHVzaChcbiAgICAgICAgaWQgPT09IG5vZGUuZWxlbWVudC5pZCA/IHByaW50LmN1cnJlbnQoYDwvJHsgbmFtZSB9PmAsIGluZCkgOiBwcmludC5kZWZhdWx0KGA8LyR7IG5hbWUgfT5gLCBpbmQpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbGluZXM7XG4gIH0pKHRyZWUpKTtcblxuICAvLyBjb25zb2xlLmNsZWFyKCk7XG4gIHByaW50TGluZXMuZm9yRWFjaChsaW5lID0+IHtcbiAgICBjb25zb2xlLmxvZyguLi5saW5lKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluc3BlY3Rvcihwcm9jZXNzb3IsIG9wdGlvbnMgPSB7fSkge1xuICBjb25zdCBzbmFwc2hvdHMgPSBbXTtcblxuICBmdW5jdGlvbiBzbmFwc2hvdCh0eXBlLCBub2RlKSB7XG4gICAgc25hcHNob3RzLnB1c2goW1xuICAgICAgdHlwZSxcbiAgICAgIG5vZGUsXG4gICAgICBwcm9jZXNzb3Iuc3lzdGVtKCkudHJlZS5kaWFnbm9zZSgpXG4gICAgXSk7XG4gICAgcHJpbnRTbmFwc2hvdFRvQ29uc29sZShzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdLCBvcHRpb25zKTtcbiAgfVxuXG4gIHByb2Nlc3Nvci5vbk5vZGVFbnRlcihub2RlID0+IHNuYXBzaG90KEVOVEVSLCBub2RlKSk7XG4gIC8vIHByb2Nlc3Nvci5vbk5vZGVPdXQobm9kZSA9PiBzbmFwc2hvdChPVVQsIG5vZGUpKTtcbiAgLy8gcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShub2RlID0+IHNuYXBzaG90KFJFTU9WRSwgbm9kZSkpO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQyOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGb2N1c0ZpZWxkIH0gZnJvbSAnLi9ET00nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDaGVja0ZvckVkaXRGaWVsZCh7IHRvZG9zIH0pIHtcbiAgcmV0dXJuIDxGb2N1c0ZpZWxkIGluZGV4PXsgdG9kb3MuZmluZEluZGV4KCh7IGVkaXRpbmcgfSkgPT4gZWRpdGluZykgfSAvPjtcbn1cbiIsImltcG9ydCB7XG4gIFRPR0dMRSxcbiAgTkVXX1RPRE8sXG4gIERFTEVURSxcbiAgRURJVCxcbiAgRURJVF9UT0RPLFxuICBDTEVBUl9DT01QTEVURURcbn0gZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQge1xuICBGSUxURVJfQUxMLFxuICBGSUxURVJfQUNUSVZFLFxuICBGSUxURVJfQ09NUExFVEVEXG59IGZyb20gJy4vJztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmNvbnN0ICQgPSAoc2VsZWN0b3IpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuY29uc3QgbGlzdCA9ICQoJy50b2RvLWxpc3QnKTtcbmNvbnN0IGhlYWRlciA9ICQoJy5oZWFkZXInKTtcblxuY29uc3QgRU5URVIgPSAxMztcbmNvbnN0IEVTQyA9IDI3O1xuXG5leHBvcnQgZnVuY3Rpb24gRmlsbENvbnRhaW5lcih7IGNoaWxkcmVuIH0pIHtcbiAgbGlzdC5pbm5lckhUTUwgPSBjaGlsZHJlbigpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIENvbnRhaW5lcih7IG9uVXNlckFjdGlvbiB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLXRvZ2dsZScpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihUT0dHTEUsIHRvZG9JbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1kZWxldGUnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oREVMRVRFLCB0b2RvSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElULCB0b2RvSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEVESVRfVE9ETywgeyBpbmRleDogdG9kb0luZGV4LCBsYWJlbDogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSAmJiBlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElUX1RPRE8sIHsgaW5kZXg6IHRvZG9JbmRleCwgbGFiZWw6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpICYmIGUua2V5Q29kZSA9PT0gRVNDKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElULCB0b2RvSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLW5ldycpICYmIGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKE5FV19UT0RPLCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIFtdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBGb2N1c0ZpZWxkKHsgaW5kZXggfSkge1xuICBjb25zdCBlbCA9ICQoYC5lZGl0W2RhdGEtaW5kZXg9XCIkeyBpbmRleCB9XCJdYCk7XG5cbiAgaWYgKGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgICBlbC5zZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvbkVuZCA9IGVsLnZhbHVlLmxlbmd0aDtcbiAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBQcm9ncmVzc0NoZWNrZXIoeyB0b2RvcyB9KSB7XG4gIGNvbnN0IGNvbXBsZXRlZCA9IHRvZG9zLmZpbHRlcigoeyBjb21wbGV0ZWQgfSkgPT4gY29tcGxldGVkKS5sZW5ndGg7XG4gIGNvbnN0IGl0ZW1zTGVmdCA9IHRvZG9zLmxlbmd0aCAtIGNvbXBsZXRlZDtcblxuICAkKCdbZGF0YS1jb3VudF0nKS5pbm5lckhUTUwgPSBgXG4gICAgPHN0cm9uZz4keyBpdGVtc0xlZnQgfTwvc3Ryb25nPiAkeyBpdGVtc0xlZnQgPiAxIHx8IGl0ZW1zTGVmdCA9PT0gMCA/ICdpdGVtcycgOiAnaXRlbScgfSBsZWZ0XG4gIGA7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZvb3Rlcih7IG9uVXNlckFjdGlvbiB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgJCgnW2RhdGEtZmlsdGVyXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWxsJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9BTEwpO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9BQ1RJVkUpO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY29tcGxldGVkJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9DT01QTEVURUQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQoJ1tkYXRhLWNsZWFyLWNvbXBsZXRlZF0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG9uVXNlckFjdGlvbihDTEVBUl9DT01QTEVURUQpO1xuICAgIH0pO1xuICB9LCBbXSk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpbHRlck9wdGlvbnNUYWJzKHsgZmlsdGVyIH0pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAkKCdbZGF0YS1hbGxdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FMTCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICAgJCgnW2RhdGEtYWN0aXZlXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9BQ1RJVkUgPyAnc2VsZWN0ZWQnIDogJycpO1xuICAgICQoJ1tkYXRhLWNvbXBsZXRlZF0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQ09NUExFVEVEID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgfSwgWyBmaWx0ZXIgXSk7XG59XG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IFRvRG8gfSBmcm9tICcuL1N0b3JlJztcblxuY29uc3QgaW5pdGlhbFZhbHVlID0gSlNPTi5zdHJpbmdpZnkoW1xuICBUb0RvKHsgbGFiZWw6ICdBY3RNTCBpcyB1c2luZyBKU1gnIH0pLFxuICBUb0RvKHsgbGFiZWw6ICdJdCBpcyBsaWtlIFJlYWN0IGJ1dCBub3QgZm9yIHJlbmRlcmluZycgfSlcbl0pO1xuXG5leHBvcnQgY29uc3QgdXNlTG9jYWxTdG9yYWdlID0gKCkgPT4ge1xuICBjb25zdCBbIGdldERhdGEgXSA9IHVzZVN0YXRlKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykgfHwgaW5pdGlhbFZhbHVlKSk7XG5cbiAgcmV0dXJuIGdldERhdGEoKTtcbn07XG5leHBvcnQgY29uc3QgUGVyc2lzdCA9ICh7IHRvZG9zIH0pID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgRmlsbENvbnRhaW5lciB9IGZyb20gJy4vRE9NJztcbmltcG9ydCB7IEZJTFRFUl9BTEwsIEZJTFRFUl9BQ1RJVkUsIEZJTFRFUl9DT01QTEVURUQgfSBmcm9tICcuLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlbmRlcmVyKHsgdG9kb3MsIGZpbHRlciB9KSB7XG4gIHJldHVybiAoXG4gICAgPEZpbGxDb250YWluZXI+XG4gICAgICB7XG4gICAgICAgICgpID0+IHRvZG9zXG4gICAgICAgIC5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IHtcbiAgICAgICAgICBpZiAoZmlsdGVyID09PSBGSUxURVJfQUxMKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoZmlsdGVyID09PSBGSUxURVJfQUNUSVZFKSByZXR1cm4gIWNvbXBsZXRlZDtcbiAgICAgICAgICBpZiAoZmlsdGVyID09PSBGSUxURVJfQ09NUExFVEVEKSByZXR1cm4gY29tcGxldGVkO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkubWFwKCh0b2RvLCBpKSA9PiB7XG4gICAgICAgICAgY29uc3QgbGlDbGFzcyA9IHRvZG8uZWRpdGluZyA/ICdlZGl0aW5nJyA6ICh0b2RvLmNvbXBsZXRlZCA/ICdjb21wbGV0ZWQnIDogJycpO1xuXG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxsaSBjbGFzcz0nJHsgbGlDbGFzcyB9Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZVxuICAgICAgICAgICAgICAgICAgJHsgdG9kby5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJyB9PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLWluZGV4PVwiJHsgaSB9XCIgZGF0YS1sYWJlbD4keyB0b2RvLmxhYmVsIH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGVzdHJveVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtZGVsZXRlPjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWRpdFwiIHZhbHVlPVwiJHsgdG9kby5sYWJlbCB9XCIgZGF0YS1pbmRleD1cIiR7IGkgfVwiIGRhdGEtZWRpdD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgYDtcbiAgICAgICAgfSkuam9pbignJylcbiAgICAgIH1cbiAgICA8L0ZpbGxDb250YWluZXI+XG4gICk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgdXNlUmVkdWNlciwgdXNlUHViU3ViLCB1c2VFZmZlY3QgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5leHBvcnQgY29uc3QgVE9HR0xFID0gJ1RPR0dMRSc7XG5leHBvcnQgY29uc3QgTkVXX1RPRE8gPSAnTkVXX1RPRE8nO1xuZXhwb3J0IGNvbnN0IERFTEVURSA9ICdERUxFVEUnO1xuZXhwb3J0IGNvbnN0IEVESVQgPSAnRURJVCc7XG5leHBvcnQgY29uc3QgRURJVF9UT0RPID0gJ0VESVRfVE9ETyc7XG5leHBvcnQgY29uc3QgQ0xFQVJfQ09NUExFVEVEID0gJ0NMRUFSX0NPTVBMRVRFRCc7XG5cbmNvbnN0IHRvZ2dsZSA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IFRPR0dMRSwgdG9kb0luZGV4IH0pO1xuY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IERFTEVURSwgdG9kb0luZGV4IH0pO1xuY29uc3QgbmV3VG9kbyA9IChsYWJlbCkgPT4gKHsgdHlwZTogTkVXX1RPRE8sIGxhYmVsIH0pO1xuY29uc3QgZWRpdCA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IEVESVQsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGVkaXRUb0RvID0gKHsgaW5kZXgsIGxhYmVsIH0pID0+ICh7IHR5cGU6IEVESVRfVE9ETywgaW5kZXgsIGxhYmVsIH0pO1xuY29uc3QgY2xlYXJDb21wbGV0ZWQgPSAoKSA9PiAoeyB0eXBlOiBDTEVBUl9DT01QTEVURUQgfSk7XG5cbmV4cG9ydCBjb25zdCBUb0RvID0gKHsgbGFiZWwgfSkgPT4gKHsgbGFiZWwsIGNvbXBsZXRlZDogZmFsc2UsIGVkaXRpbmc6IGZhbHNlIH0pO1xuXG5jb25zdCByZWR1Y2VyID0gZnVuY3Rpb24gKHRvZG9zLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgVE9HR0xFOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24udG9kb0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBjb21wbGV0ZWQ6ICF0b2RvLmNvbXBsZXRlZFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICB9KTtcbiAgICBjYXNlIEVESVQ6XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi50b2RvSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGVkaXRpbmc6ICF0b2RvLmVkaXRpbmdcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICBlZGl0aW5nOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgY2FzZSBFRElUX1RPRE86XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi5pbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgbGFiZWw6IGFjdGlvbi5sYWJlbCxcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgIH0pO1xuICAgIGNhc2UgTkVXX1RPRE86XG4gICAgICByZXR1cm4gWyAuLi50b2RvcywgVG9Ebyh7IGxhYmVsOiBhY3Rpb24ubGFiZWwgfSkgXTtcbiAgICBjYXNlIERFTEVURTpcbiAgICAgIHJldHVybiB0b2Rvcy5maWx0ZXIoKHRvZG8sIGluZGV4KSA9PiBpbmRleCAhPT0gYWN0aW9uLnRvZG9JbmRleCk7XG4gICAgY2FzZSBDTEVBUl9DT01QTEVURUQ6XG4gICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKCh0b2RvKSA9PiAhdG9kby5jb21wbGV0ZWQpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdG9kb3M7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0b3JlKHsgaW5pdGlhbFZhbHVlLCBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFsgdG9kb3MsIGRpc3BhdGNoIF0gPSB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxWYWx1ZSk7XG4gIGNvbnN0IHsgc3Vic2NyaWJlIH0gPSB1c2VQdWJTdWIoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHN1YnNjcmliZShUT0dHTEUsICh0b2RvSW5kZXgpID0+IGRpc3BhdGNoKHRvZ2dsZSh0b2RvSW5kZXgpKSk7XG4gICAgc3Vic2NyaWJlKE5FV19UT0RPLCAobGFiZWwpID0+IGRpc3BhdGNoKG5ld1RvZG8obGFiZWwpKSk7XG4gICAgc3Vic2NyaWJlKERFTEVURSwgKHRvZG9JbmRleCkgPT4gZGlzcGF0Y2goZGVsZXRlVG9kbyh0b2RvSW5kZXgpKSk7XG4gICAgc3Vic2NyaWJlKEVESVQsIChsYWJlbCkgPT4gZGlzcGF0Y2goZWRpdChsYWJlbCkpKTtcbiAgICBzdWJzY3JpYmUoRURJVF9UT0RPLCAocGF5bG9hZCkgPT4gZGlzcGF0Y2goZWRpdFRvRG8ocGF5bG9hZCkpKTtcbiAgICBzdWJzY3JpYmUoQ0xFQVJfQ09NUExFVEVELCAoKSA9PiBkaXNwYXRjaChjbGVhckNvbXBsZXRlZCgpKSk7XG4gIH0sIFtdKTtcblxuICBjaGlsZHJlbih7IHRvZG9zOiB0b2RvcygpIH0pO1xufVxuIiwiLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSwgcnVuLCBGcmFnbWVudCwgdXNlUHViU3ViLCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCBwcm9jZXNzb3IgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuaW1wb3J0IGluc3BlY3RvciBmcm9tICcuLi8uLi8uLi9wYWNrYWdlcy9pbnNwZWN0b3InO1xuXG5pbnNwZWN0b3IocHJvY2Vzc29yKTtcblxuaW1wb3J0IFN0b3JlIGZyb20gJy4vU3RvcmUnO1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IENoZWNrRm9yRWRpdEZpZWxkIGZyb20gJy4vQ2hlY2tGb3JFZGl0RmllbGQnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NDaGVja2VyLCBGaWx0ZXJPcHRpb25zVGFicywgQ29udGFpbmVyLCBGb290ZXIgfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyB1c2VMb2NhbFN0b3JhZ2UsIFBlcnNpc3QgfSBmcm9tICcuL1BlcnNpc3QnO1xuXG5leHBvcnQgY29uc3QgRklMVEVSX0FMTCA9ICdGSUxURVJfQUxMJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQUNUSVZFID0gJ0ZJTFRFUl9BQ1RJVkUnO1xuZXhwb3J0IGNvbnN0IEZJTFRFUl9DT01QTEVURUQgPSAnRklMVEVSX0NPTVBMRVRFRCc7XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgaW5pdGlhbFZhbHVlID0gdXNlTG9jYWxTdG9yYWdlKCk7XG4gIGNvbnN0IHsgcHVibGlzaCwgc3Vic2NyaWJlIH0gPSB1c2VQdWJTdWIoKTtcbiAgY29uc3QgWyBmaWx0ZXIsIHNldEZpbHRlciBdID0gdXNlU3RhdGUoRklMVEVSX0FMTCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzdWJzY3JpYmUoRklMVEVSX0FMTCwgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9BTEwpKTtcbiAgICBzdWJzY3JpYmUoRklMVEVSX0FDVElWRSwgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9BQ1RJVkUpKTtcbiAgICBzdWJzY3JpYmUoRklMVEVSX0NPTVBMRVRFRCwgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9DT01QTEVURUQpKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPENvbnRhaW5lciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0gLz5cbiAgICAgIDxGb290ZXIgb25Vc2VyQWN0aW9uPXsgcHVibGlzaCB9Lz5cbiAgICAgIDxTdG9yZSBpbml0aWFsVmFsdWU9eyBpbml0aWFsVmFsdWUgfT5cbiAgICAgICAgPEZpbHRlck9wdGlvbnNUYWJzIGZpbHRlcj17IGZpbHRlcigpIH0gLz5cbiAgICAgICAgPFJlbmRlcmVyIGZpbHRlcj17IGZpbHRlcigpIH0vPlxuICAgICAgICA8Q2hlY2tGb3JFZGl0RmllbGQgLz5cbiAgICAgICAgPFByb2dyZXNzQ2hlY2tlciAvPlxuICAgICAgICA8UGVyc2lzdCAvPlxuICAgICAgPC9TdG9yZT5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxucnVuKDxBcHAgLz4pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==