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

        if (true) {
          if (this.logs) this.logs = [];
        }

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

function printSnapshotToConsole(snapshot) {
  const [type, node, tree] = snapshot;
  let str = `${type} <${node.element.name}>\n`;

  let addInd = ind => {
    let s = '',
        i = 0;

    for (; i < ind; i++) s += '  ';

    return s;
  }; // console.clear();


  (function loop({
    ind,
    name,
    used,
    children,
    logs
  }) {
    const logsStr = logs && logs.length > 0 ? logs.map(({
      type,
      meta
    }) => {
      return `${addInd(ind)}  ⤷ ${type}${parseLogMeta(meta)}`;
    }).join('\n') + '\n' : '';
    const elStr = `${addInd(ind)}<${name}> (${used})\n${logsStr}`;

    if (children.length === 0) {
      str += elStr;
      return;
    }

    str += elStr;

    if (children.length > 0) {
      children.forEach(child => loop(child));
    }
  })(tree);

  console.log(str);
}

function inspector(processor) {
  const snapshots = [];

  function snapshot(type, node) {
    snapshots.push([type, node, processor.system().tree.diagnose()]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1F1ZXVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUHViU3ViLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVN0YXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi91dGlscy9pc0FjdE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2hlbHBlcnMvc2FuaXRpemUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9DaXJjdWxhckpTT04uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9TZXJpYWxpemVFcnJvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BlcnNpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJnZXRGdW5jTmFtZSIsImZ1bmMiLCJuYW1lIiwicmVzdWx0IiwiZXhlYyIsInRvU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJFcnJvciIsIl9fYWN0bWwiLCJfX3VzZWQiLCJfX3J1bm5pbmciLCJpZCIsImluaXRpYWxpemUiLCJ1c2VkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibWVyZ2VQcm9wcyIsIm5ld1Byb3BzIiwiYXNzaWduIiwiaXNSdW5uaW5nIiwiZW50ZXIiLCJjb25zdW1lIiwib3V0IiwiZGVmYXVsdCIsImNyZWF0ZUNvbnRleHRGYWN0b3J5IiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwia2V5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiQ09OVEVYVF9LRVkiLCJQVUJMSUNfQ09OVEVYVF9LRVkiLCJpZHMiLCJnZXRJZCIsInJlc29sdmVDb250ZXh0Iiwibm9kZSIsInN0YWNrIiwicHVzaCIsImVsZW1lbnQiLCJwYXJlbnQiLCJjb25zb2xlIiwid2FybiIsIm1hcCIsImpvaW4iLCJwcm9jZXNzb3IiLCJjcmVhdGVDb250ZXh0IiwiaW5pdGlhbFZhbHVlIiwiX3JlZjMiLCJQcm92aWRlciIsIl9yZWYiLCJDb25zdW1lciIsIl9yZWYyIiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3VzZUVmZmVjdCIsIl91c2VFZmZlY3QyIiwiX1F1ZXVlIiwiX1F1ZXVlMiIsIl9fZXNNb2R1bGUiLCJDSElMRFJFTiIsIkNPTlNVTUUiLCJQUk9DRVNTX1JFU1VMVCIsIlJFVFVSTkVEX0VMRU1FTlQiLCJDSElMRCIsImlzR2VuZXJhdG9yIiwiaXNQcm9taXNlIiwiY3JlYXRlQ2hpbGRyZW5GdW5jIiwicHJvY2Vzc05vZGUiLCJmIiwiX2FyZ3VtZW50cyIsInF1ZXVlSXRlbXNUb0FkZCIsInJlc3VsdHMiLCJjaGlsZHJlblF1ZXVlIiwiX2xvb3AiLCJpIiwiX2NoaWxkcmVuJGkiLCJhcHBseSIsImFkZENoaWxkTm9kZSIsImZ1bmNSZXN1bHQiLCJyZXZlcnNlIiwiZm9yRWFjaCIsInByZXBlbmRJdGVtIiwiciIsInByb2Nlc3MiLCJvbkRvbmUiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJyZXJ1biIsInF1ZXVlIiwiYWRkIiwiY29uc3VtcHRpb24iLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwiZ2VuZXJhdG9yRG9uZSIsImdlblJlc3VsdCIsIml0ZXJhdGUiLCJuZXh0IiwiZG9uZSIsInJlcyIsInRoZW4iLCJfcmVzIiwicnVuIiwicm9vdE5vZGUiLCJyZXNvbHZlUm9vdCIsIm9uTm9kZUVudGVyIiwiY2FsbGJhY2siLCJhZGROb2RlRW50ZXJDYWxsYmFjayIsIm9uTm9kZU91dCIsImFkZE5vZGVPdXRDYWxsYmFjayIsIm9uTm9kZVJlbW92ZSIsInN5c3RlbSIsInJlc2V0IiwiY2xlYXIiLCJjcmVhdGVRdWV1ZSIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImFycjIiLCJmcm9tIiwiTE9HUyIsImxvZyIsIl9jb25zb2xlIiwiY3JlYXRlSXRlbSIsInR5cGUiLCJjb250ZXh0IiwiaXRlbXMiLCJhc3luYyIsInJ1bm5pbmciLCJyZWxlYXNlIiwiY29uY2F0IiwibGFzdFJlc3VsdCIsIl90aGlzIiwiaXRlbSIsInNoaWZ0IiwiYXN5bmNSZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZ2V0UmVzdWx0IiwicmVqZWN0IiwiX2V4dGVuZHMiLCJ0YXJnZXQiLCJzb3VyY2UiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJUcmVlIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwia2V5cyIsImluZGV4T2YiLCJfb25Ob2RlUmVtb3ZlIiwicm9vdCIsImNyZWF0ZU5ld05vZGUiLCJ1c2VTYW1lTm9kZSIsIm5ld0VsZW1lbnQiLCJ0cmVlRGlmZiIsIm9sZEVsZW1lbnQiLCJjdXJzb3IiLCJfX0RFVl9fIiwibG9ncyIsImMiLCJfdGhpczIiLCJzcGxpY2UiLCJyZW1vdmVkTm9kZSIsIl90aGlzMyIsImNoaWxkTm9kZSIsIm5ld0NoaWxkTm9kZSIsIm1ldGEiLCJnZXROdW1PZkVsZW1lbnRzIiwiZGlhZ25vc2UiLCJsb29wT3ZlciIsImluZCIsInJlc3QiLCJjaGlsZCIsIl9pc1ZhbGlkSG9va0NvbnRleHQiLCJfaXNWYWxpZEhvb2tDb250ZXh0MiIsIl9Db250ZXh0IiwiY3JlYXRlVXNlRWxlbWVudEhvb2siLCJDb250ZXh0IiwiX2Zhc3REZWVwRXF1YWwiLCJfZmFzdERlZXBFcXVhbDIiLCJTdG9yYWdlIiwiZWxlbWVudHMiLCJnZXQiLCJlZmZlY3RzIiwiY29uc3VtZXIiLCJjbGVhblVwIiwiY3JlYXRlRWZmZWN0IiwiZGVwcyIsInVwZGF0ZUVmZmVjdCIsImVmZmVjdCIsIm9sZERlcHMiLCJkZXBzRXF1YWwiLCJuZXdEZXBzIiwicmVzb2x2ZUVmZmVjdCIsImFyZUVxdWFsIiwiY3JlYXRlVXNlRWZmZWN0SG9vayIsInN0b3JhZ2UiLCJpbmRleCIsImNyZWF0ZVVzZVB1YlN1Ykhvb2siLCJzdWJzY3JpYmVycyIsInN1YnNjcmliZSIsInB1Ymxpc2giLCJwYXlsb2FkIiwic2NvcGVkRWxlbWVudCIsImVsIiwic3Vic2NyaWJlRnVuYyIsIl9sZW4iLCJwYXJhbXMiLCJfa2V5IiwicHVibGlzaEZ1bmMiLCJfbGVuMiIsIl9rZXkyIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsIl9pIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfcyIsImVyciIsIlR5cGVFcnJvciIsImNyZWF0ZVVzZVJlZHVjZXJIb29rIiwiY3JlYXRlRGlzcGF0Y2hFbGVtZW50IiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJwcm9wc1RvQWN0aW9uIiwidXNlU3RhdGUiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsImNyZWF0ZVVzZVN0YXRlSG9vayIsInN0YXRlcyIsIm5ld1N0YXRlIiwiaXNWYWxpZEhvb2tDb250ZXh0IiwiY3JlYXRlUnVudGltZSIsIl9Qcm9jZXNzb3IiLCJfUHJvY2Vzc29yMiIsIl9BY3RFbGVtZW50IiwiX0FjdEVsZW1lbnQyIiwiX3VzZUVsZW1lbnQiLCJfdXNlRWxlbWVudDIiLCJfdXNlUmVkdWNlciIsIl91c2VSZWR1Y2VyMiIsIl91c2VDb250ZXh0IiwiX3VzZUNvbnRleHQyIiwiX0NvbnRleHQyIiwiQSIsIkZyYWdtZW50IiwidXNlRWxlbWVudCIsInVzZVB1YlN1YiIsInVzZVJlZHVjZXIiLCJ1c2VFZmZlY3QiLCJ1c2VDb250ZXh0IiwicnVudGltZSIsIm1vZHVsZSIsImlzQWN0TUxFbGVtZW50Iiwic3RyaW5naWZ5IiwiQ2lyY3VsYXJKU09OIiwic2FuaXRpemUiLCJzb21ldGhpbmciLCJzaG93RXJyb3JJbkNvbnNvbGUiLCJKU09OIiwicGFyc2UiLCJTZXJpYWxpemVFcnJvciIsInNwZWNpYWxDaGFyIiwic2FmZVNwZWNpYWxDaGFyIiwiY2hhckNvZGVBdCIsInNsaWNlIiwiZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciIsInNwZWNpYWxDaGFyUkciLCJSZWdFeHAiLCJzYWZlU3BlY2lhbENoYXJSRyIsInNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHIiwidiIsIiRTdHJpbmciLCJTdHJpbmciLCJnZW5lcmF0ZVJlcGxhY2VyIiwicmVwbGFjZXIiLCJyZXNvbHZlIiwiaW5zcGVjdCIsInBhdGgiLCJhbGwiLCJzZWVuIiwibWFwcCIsImxhc3QiLCJsdmwiLCJmbiIsInJlcGxhY2UiLCJyZXRyaWV2ZUZyb21QYXRoIiwiY3VycmVudCIsImdlbmVyYXRlUmV2aXZlciIsInJldml2ZXIiLCJpc1N0cmluZyIsImNoYXJBdCIsInJlZ2VuZXJhdGUiLCJyZWdlbmVyYXRlQXJyYXkiLCJyZXRyaWV2ZSIsInJlZ2VuZXJhdGVPYmplY3QiLCJzcGxpdCIsInN0cmluZ2lmeVJlY3Vyc2lvbiIsInNwYWNlIiwiZG9Ob3RSZXNvbHZlIiwicGFyc2VSZWN1cnNpb24iLCJ0ZXh0IiwiZGVzdHJveUNpcmN1bGFyIiwidG8iLCJtZXNzYWdlIiwiRU5URVIiLCJPVVQiLCJSRU1PVkUiLCJwYXJzZUxvZ01ldGEiLCJwcmludFNuYXBzaG90VG9Db25zb2xlIiwic25hcHNob3QiLCJzdHIiLCJhZGRJbmQiLCJzIiwibG9vcCIsImxvZ3NTdHIiLCJlbFN0ciIsImluc3BlY3RvciIsInNuYXBzaG90cyIsIkNoZWNrRm9yRWRpdEZpZWxkIiwidG9kb3MiLCJmaW5kSW5kZXgiLCJlZGl0aW5nIiwiJCIsInNlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGlzdCIsImhlYWRlciIsIkVTQyIsIkZpbGxDb250YWluZXIiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJvblVzZXJBY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRvZG9JbmRleCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiVE9HR0xFIiwiREVMRVRFIiwiRURJVCIsIkVESVRfVE9ETyIsImxhYmVsIiwia2V5Q29kZSIsIk5FV19UT0RPIiwiRm9jdXNGaWVsZCIsImZvY3VzIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJQcm9ncmVzc0NoZWNrZXIiLCJjb21wbGV0ZWQiLCJmaWx0ZXIiLCJpdGVtc0xlZnQiLCJGb290ZXIiLCJGSUxURVJfQUxMIiwiRklMVEVSX0FDVElWRSIsIkZJTFRFUl9DT01QTEVURUQiLCJDTEVBUl9DT01QTEVURUQiLCJGaWx0ZXJPcHRpb25zVGFicyIsInNldEF0dHJpYnV0ZSIsIlRvRG8iLCJ1c2VMb2NhbFN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ2V0RGF0YSIsIlBlcnNpc3QiLCJzZXRJdGVtIiwiUmVuZGVyZXIiLCJ0b2RvIiwibGlDbGFzcyIsInRvZ2dsZSIsImRlbGV0ZVRvZG8iLCJuZXdUb2RvIiwiZWRpdCIsImVkaXRUb0RvIiwiY2xlYXJDb21wbGV0ZWQiLCJTdG9yZSIsIkFwcCIsInNldEZpbHRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFF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QUFiLENBQVQ7QUFDQWxLLGFBQVMsQ0FBQ21LLGFBQUQsRUFBZ0I7QUFBQSxhQUFNdUIsU0FBUyxDQUFDdkIsYUFBRCxDQUFmO0FBQUEsS0FBaEIsQ0FBVDtBQUNBbkssYUFBUyxDQUFDb0ssZ0JBQUQsRUFBbUI7QUFBQSxhQUFNc0IsU0FBUyxDQUFDdEIsZ0JBQUQsQ0FBZjtBQUFBLEtBQW5CLENBQVQ7QUFDRCxHQUpRLEVBSU4sRUFKTSxDQUFUO0FBTUEsU0FDRSwrQ0FBQyw2Q0FBRCxRQUNFLCtDQUFDLDhDQUFEO0FBQVcsZ0JBQVksRUFBR25LO0FBQTFCLElBREYsRUFFRSwrQ0FBQywyQ0FBRDtBQUFRLGdCQUFZLEVBQUdBO0FBQXZCLElBRkYsRUFHRSwrQ0FBQyw4Q0FBRDtBQUFPLGdCQUFZLEVBQUdySztBQUF0QixLQUNFLCtDQUFDLHNEQUFEO0FBQW1CLFVBQU0sRUFBR21VLE1BQU07QUFBbEMsSUFERixFQUVFLCtDQUFDLGlEQUFEO0FBQVUsVUFBTSxFQUFHQSxNQUFNO0FBQXpCLElBRkYsRUFHRSwrQ0FBQywwREFBRCxPQUhGLEVBSUUsK0NBQUMsb0RBQUQsT0FKRixFQUtFLCtDQUFDLGdEQUFELE9BTEYsQ0FIRixDQURGO0FBYUQ7O0FBQUE7QUFFRG5RLGdEQUFHLENBQUMsK0NBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gZ2V0RnVuY05hbWUoZnVuYykge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuICB2YXIgcmVzdWx0ID0gL15mdW5jdGlvblxccysoW1xcd1xcJF0rKVxccypcXCgvLmV4ZWMoZnVuYy50b1N0cmluZygpKTtcblxuICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0WzFdIDogJ3Vua25vd24nO1xufTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0cyBhIGZ1bmN0aW9uLiBcIicgKyBmdW5jICsgJ1wiIGdpdmVuIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIF9fdXNlZDogMCxcbiAgICBfX3J1bm5pbmc6IGZhbHNlLFxuICAgIGlkOiBudWxsLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICBuYW1lOiBnZXRGdW5jTmFtZShmdW5jKSxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShpZCkge1xuICAgICAgdmFyIHVzZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHRoaXMuX191c2VkID0gdXNlZDtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfSxcbiAgICBtZXJnZVByb3BzOiBmdW5jdGlvbiBtZXJnZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIH0sXG4gICAgdXNlZDogZnVuY3Rpb24gdXNlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fdXNlZDtcbiAgICB9LFxuICAgIGlzUnVubmluZzogZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19ydW5uaW5nO1xuICAgIH0sXG4gICAgZW50ZXI6IGZ1bmN0aW9uIGVudGVyKCkge1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSB0cnVlO1xuICAgIH0sXG4gICAgY29uc3VtZTogZnVuY3Rpb24gY29uc3VtZSgpIHtcbiAgICAgIHJldHVybiBmdW5jKHRoaXMucHJvcHMpO1xuICAgIH0sXG4gICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICB0aGlzLl9fdXNlZCArPSAxO1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVFbGVtZW50OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUNvbnRleHRGYWN0b3J5O1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBjb25zaXN0ZW50LXJldHVybiAqL1xudmFyIENPTlRFWFRfS0VZID0gJ19fQ09OVEVYVF9LRVlfXyc7XG5cbnZhciBQVUJMSUNfQ09OVEVYVF9LRVkgPSBleHBvcnRzLlBVQkxJQ19DT05URVhUX0tFWSA9ICdfX1BVQkxJQ19DT05URVhUX0tFWV9fJztcblxudmFyIGlkcyA9IDA7XG5cbmZ1bmN0aW9uIGdldElkKCkge1xuICByZXR1cm4gJ2MnICsgKytpZHM7XG59O1xuZnVuY3Rpb24gcmVzb2x2ZUNvbnRleHQobm9kZSwgaWQpIHtcbiAgdmFyIHN0YWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBbXTtcblxuICBzdGFjay5wdXNoKG5vZGUuZWxlbWVudC5uYW1lKTtcbiAgaWYgKG5vZGVbQ09OVEVYVF9LRVldICYmIGlkIGluIG5vZGVbQ09OVEVYVF9LRVldKSB7XG4gICAgcmV0dXJuIG5vZGVbQ09OVEVYVF9LRVldW2lkXTtcbiAgfSBlbHNlIGlmIChub2RlLnBhcmVudCkge1xuICAgIHJldHVybiByZXNvbHZlQ29udGV4dChub2RlLnBhcmVudCwgaWQsIHN0YWNrKTtcbiAgfVxuICBjb25zb2xlLndhcm4oJ0EgY29udGV4dCBjb25zdW1lciBpcyB1c2VkIHdpdGggbm8gcHJvdmlkZXIuXFxuICBTdGFjazpcXG4nICsgc3RhY2subWFwKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuICcgICAgPCcgKyBuYW1lICsgJz4nO1xuICB9KS5qb2luKCdcXG4nKSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHRGYWN0b3J5KHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlQ29udGV4dChpbml0aWFsVmFsdWUpIHtcbiAgICB2YXIgX3JlZjM7XG5cbiAgICB2YXIgaWQgPSBnZXRJZCgpO1xuXG4gICAgdmFyIFByb3ZpZGVyID0gZnVuY3Rpb24gUHJvdmlkZXIoX3JlZikge1xuICAgICAgdmFyIHZhbHVlID0gX3JlZi52YWx1ZSxcbiAgICAgICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW47XG5cbiAgICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgICAgaWYgKCFub2RlW0NPTlRFWFRfS0VZXSkge1xuICAgICAgICBub2RlW0NPTlRFWFRfS0VZXSA9IHt9O1xuICAgICAgfVxuICAgICAgbm9kZVtDT05URVhUX0tFWV1baWRdID0gdmFsdWU7XG5cbiAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICB9O1xuICAgIHZhciBDb25zdW1lciA9IGZ1bmN0aW9uIENvbnN1bWVyKF9yZWYyKSB7XG4gICAgICB2YXIgY2hpbGRyZW4gPSBfcmVmMi5jaGlsZHJlbjtcblxuICAgICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgICBjaGlsZHJlbihyZXNvbHZlQ29udGV4dChub2RlLCBpZCkgfHwgaW5pdGlhbFZhbHVlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIF9yZWYzID0ge30sIF9kZWZpbmVQcm9wZXJ0eShfcmVmMywgUFVCTElDX0NPTlRFWFRfS0VZLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICAgIHJldHVybiByZXNvbHZlQ29udGV4dChub2RlLCBpZCkgfHwgaW5pdGlhbFZhbHVlO1xuICAgIH0pLCBfZGVmaW5lUHJvcGVydHkoX3JlZjMsICdQcm92aWRlcicsIFByb3ZpZGVyKSwgX2RlZmluZVByb3BlcnR5KF9yZWYzLCAnQ29uc3VtZXInLCBDb25zdW1lciksIF9yZWYzO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVQcm9jZXNzb3I7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQgPSByZXF1aXJlKCcuL3V0aWxzL2lzQWN0TUxFbGVtZW50Jyk7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RNTEVsZW1lbnQpO1xuXG52YXIgX1RyZWUgPSByZXF1aXJlKCcuL1RyZWUnKTtcblxudmFyIF9UcmVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1RyZWUpO1xuXG52YXIgX3VzZVB1YlN1YiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHViU3ViJyk7XG5cbnZhciBfdXNlUHViU3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVB1YlN1Yik7XG5cbnZhciBfdXNlU3RhdGUgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVN0YXRlJyk7XG5cbnZhciBfdXNlU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlU3RhdGUpO1xuXG52YXIgX3VzZUVmZmVjdCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWZmZWN0Jyk7XG5cbnZhciBfdXNlRWZmZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVmZmVjdCk7XG5cbnZhciBfUXVldWUgPSByZXF1aXJlKCcuL1F1ZXVlJyk7XG5cbnZhciBfUXVldWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUXVldWUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgY29uc2lzdGVudC1yZXR1cm4gKi9cbnZhciBDSElMRFJFTiA9ICdfX0FDVE1MX0NISUxEUkVOX18nO1xuXG52YXIgQ09OU1VNRSA9ICdDT05TVU1FJztcbnZhciBQUk9DRVNTX1JFU1VMVCA9ICdQUk9DRVNTX1JFU1VMVCc7XG52YXIgUkVUVVJORURfRUxFTUVOVCA9ICdSRVRVUk5FRF9FTEVNRU5UJztcbnZhciBDSElMRCA9ICdDSElMRCc7XG5cbnZhciBpc0dlbmVyYXRvciA9IGZ1bmN0aW9uIGlzR2VuZXJhdG9yKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmpbJ25leHQnXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG52YXIgaXNQcm9taXNlID0gZnVuY3Rpb24gaXNQcm9taXNlKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmpbJ3RoZW4nXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoaWxkcmVuRnVuYyhub2RlLCBwcm9jZXNzTm9kZSkge1xuICB2YXIgZiA9IGZ1bmN0aW9uIGYoKSB7XG4gICAgdmFyIF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5lbGVtZW50LmNoaWxkcmVuO1xuXG5cbiAgICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIHF1ZXVlSXRlbXNUb0FkZCA9IFtdO1xuICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgICAgIHZhciBjaGlsZHJlblF1ZXVlID0gKDAsIF9RdWV1ZTIuZGVmYXVsdCkoJyAgJyArIG5vZGUuZWxlbWVudC5uYW1lICsgJzpjaGlsZHJlbicpO1xuXG4gICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XG4gICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShjaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICB2YXIgX2NoaWxkcmVuJGk7XG5cbiAgICAgICAgICAoX2NoaWxkcmVuJGkgPSBjaGlsZHJlbltpXSkubWVyZ2VQcm9wcy5hcHBseShfY2hpbGRyZW4kaSwgX2FyZ3VtZW50cyk7XG4gICAgICAgICAgcXVldWVJdGVtc1RvQWRkLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGNoaWxkcmVuW2ldKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNoaWxkcmVuW2ldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFyIGZ1bmNSZXN1bHQgPSBjaGlsZHJlbltpXS5hcHBseShjaGlsZHJlbiwgX2FyZ3VtZW50cyk7XG5cbiAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZnVuY1Jlc3VsdCkpIHtcbiAgICAgICAgICAgIHF1ZXVlSXRlbXNUb0FkZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGZ1bmNSZXN1bHQpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goZnVuY1Jlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdHMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgX2xvb3AoaSk7XG4gICAgICB9XG4gICAgICBxdWV1ZUl0ZW1zVG9BZGQucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgY2hpbGRyZW5RdWV1ZS5wcmVwZW5kSXRlbShDSElMRCwgZnVuYywgZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0cy5wdXNoKHIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY2hpbGRyZW5RdWV1ZS5wcm9jZXNzKCk7XG4gICAgICByZXR1cm4gY2hpbGRyZW5RdWV1ZS5vbkRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBmW0NISUxEUkVOXSA9IHRydWU7XG4gIHJldHVybiBmO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9jZXNzb3IoKSB7XG4gIHZhciB0cmVlID0gKDAsIF9UcmVlMi5kZWZhdWx0KSgpO1xuICB2YXIgY3VycmVudE5vZGUgPSBudWxsO1xuXG4gIHZhciBwcm9jZXNzTm9kZSA9IGZ1bmN0aW9uIHByb2Nlc3NOb2RlKG5vZGUpIHtcbiAgICBjdXJyZW50Tm9kZSA9IG5vZGU7XG4gICAgbm9kZS5lbnRlcigpO1xuICAgIG5vZGUucmVydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZSk7XG4gICAgfTtcbiAgICBub2RlLmVsZW1lbnQubWVyZ2VQcm9wcyh7XG4gICAgICBjaGlsZHJlbjogY3JlYXRlQ2hpbGRyZW5GdW5jKG5vZGUsIHByb2Nlc3NOb2RlKVxuICAgIH0pO1xuXG4gICAgdmFyIHJlc3VsdHMgPSB7fTtcbiAgICB2YXIgcXVldWUgPSAoMCwgX1F1ZXVlMi5kZWZhdWx0KSgnICcgKyBub2RlLmVsZW1lbnQubmFtZSk7XG5cbiAgICAvLyBDT05TVU1FXG4gICAgcXVldWUuYWRkKENPTlNVTUUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBub2RlLmVsZW1lbnQuY29uc3VtZSgpO1xuICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHRzW0NPTlNVTUVdID0gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLy8gUFJPQ0VTU19SRVNVTFRcbiAgICBxdWV1ZS5hZGQoUFJPQ0VTU19SRVNVTFQsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBjb25zdW1wdGlvbiA9IHJlc3VsdHNbQ09OU1VNRV07XG5cbiAgICAgIC8vIEFjdE1MIGVsZW1lbnRcbiAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShjb25zdW1wdGlvbikpIHtcbiAgICAgICAgcXVldWUucHJlcGVuZEl0ZW0oUkVUVVJORURfRUxFTUVOVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjb25zdW1wdGlvbikpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGdlbmVyYXRvclxuICAgICAgfSBlbHNlIGlmIChpc0dlbmVyYXRvcihjb25zdW1wdGlvbikpIHtcbiAgICAgICAgdmFyIGdlbmVyYXRvciA9IGNvbnN1bXB0aW9uO1xuXG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGdlbmVyYXRvckRvbmUpIHtcbiAgICAgICAgICAgIHZhciBnZW5SZXN1bHQgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIChmdW5jdGlvbiBpdGVyYXRlKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGdlblJlc3VsdCA9IGdlbmVyYXRvci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKCFnZW5SZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVzID0gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2UocmVzKSkge1xuICAgICAgICAgICAgICAgICAgICByZXMudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdGUocmVzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBfcmVzID0gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZ2VuUmVzdWx0LnZhbHVlKSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2UoX3JlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgX3Jlcy50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRvckRvbmUocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdG9yRG9uZShfcmVzKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZ2VuZXJhdG9yRG9uZShnZW5SZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjaGlsZHJlblxuICAgICAgfSBlbHNlIGlmIChjb25zdW1wdGlvbiAmJiBjb25zdW1wdGlvbltDSElMRFJFTl0pIHtcbiAgICAgICAgcXVldWUucHJlcGVuZEl0ZW0oUkVUVVJORURfRUxFTUVOVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjb25zdW1wdGlvbigpO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdCAmJiByZXN1bHQubGVuZ3RoID09PSAxID8gcmVzdWx0WzBdIDogcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJ1bm5pbmcgdGhlIHF1ZXVlXG4gICAgcXVldWUucHJvY2VzcygpO1xuXG4gICAgLy8gR2V0dGluZyB0aGUgcmVzdWx0LiBJdCBpcyBlaXRoZXIgYSBwcm9taXNlIGlmIHRoZXJlIGlzXG4gICAgLy8gc29tZXRoaW5nIGFzeW5jaHJvbm91cyBvciBhIHZhbHVlXG4gICAgcmV0dXJuIHF1ZXVlLm9uRG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICBub2RlLm91dCgpO1xuICAgICAgcmV0dXJuIFJFVFVSTkVEX0VMRU1FTlQgaW4gcmVzdWx0cyA/IHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gOiByZXN1bHRzW0NPTlNVTUVdO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbm9kZTogZnVuY3Rpb24gbm9kZSgpIHtcbiAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9LFxuICAgIHJ1bjogZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICAgIHZhciByb290Tm9kZSA9IHRyZWUucmVzb2x2ZVJvb3QoZWxlbWVudCk7XG5cbiAgICAgIHJldHVybiBwcm9jZXNzTm9kZShyb290Tm9kZSk7XG4gICAgfSxcbiAgICBvbk5vZGVFbnRlcjogZnVuY3Rpb24gb25Ob2RlRW50ZXIoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZUVudGVyQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlT3V0OiBmdW5jdGlvbiBvbk5vZGVPdXQoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUuYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZVJlbW92ZTogZnVuY3Rpb24gb25Ob2RlUmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLm9uTm9kZVJlbW92ZShjYWxsYmFjayk7XG4gICAgfSxcbiAgICBzeXN0ZW06IGZ1bmN0aW9uIHN5c3RlbSgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyZWU6IHRyZWUsXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgICAgICBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICAgICAgdHJlZS5yZXNldCgpO1xuICAgICAgICAgIF91c2VQdWJTdWIyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlU3RhdGUyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgICBfdXNlRWZmZWN0Mi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVRdWV1ZTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbnZhciBMT0dTID0gZmFsc2U7XG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgcmV0dXJuIExPR1MgPyAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIGFyZ3VtZW50cykgOiBudWxsO1xufTtcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsndGhlbiddID09PSAnZnVuY3Rpb24nO1xufTtcbnZhciBjcmVhdGVJdGVtID0gZnVuY3Rpb24gY3JlYXRlSXRlbSh0eXBlLCBmdW5jKSB7XG4gIHZhciBvbkRvbmUgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZ1bmN0aW9uICgpIHt9O1xuICByZXR1cm4ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZnVuYzogZnVuYyxcbiAgICBvbkRvbmU6IG9uRG9uZVxuICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlUXVldWUoY29udGV4dCkge1xuICB2YXIgaXRlbXMgPSBbXTtcbiAgdmFyIGFzeW5jID0gZmFsc2U7XG4gIHZhciBydW5uaW5nID0gZmFsc2U7XG4gIHZhciByZWxlYXNlID0gZnVuY3Rpb24gcmVsZWFzZSgpIHt9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGQodHlwZSwgZnVuYywgb25Eb25lKSB7XG4gICAgICBsb2coY29udGV4dCArICc6UTogWy4uLicgKyB0eXBlICsgJ10gKCcgKyAoaXRlbXMubGVuZ3RoICsgMSkgKyAnIHRvdGFsKScpO1xuICAgICAgaXRlbXMucHVzaChjcmVhdGVJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSkpO1xuICAgIH0sXG4gICAgcHJlcGVuZEl0ZW06IGZ1bmN0aW9uIHByZXBlbmRJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSkge1xuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6IFsnICsgdHlwZSArICcuLi5dICgnICsgKGl0ZW1zLmxlbmd0aCArIDEpICsgJyB0b3RhbCknKTtcbiAgICAgIGl0ZW1zID0gW2NyZWF0ZUl0ZW0odHlwZSwgZnVuYywgb25Eb25lKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShpdGVtcykpO1xuICAgIH0sXG4gICAgcHJvY2VzczogZnVuY3Rpb24gcHJvY2VzcyhsYXN0UmVzdWx0KSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbG9nKGNvbnRleHQgKyAnOlE6ZG9uZScpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHJlbGVhc2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgaXRlbSA9IGl0ZW1zLnNoaWZ0KCk7XG5cbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiAnICsgaXRlbS50eXBlICsgJygpICgnICsgaXRlbXMubGVuZ3RoICsgJyBsZWZ0KScpO1xuICAgICAgdmFyIHJlc3VsdCA9IGl0ZW0uZnVuYyhsYXN0UmVzdWx0KTtcblxuICAgICAgaWYgKGlzUHJvbWlzZShyZXN1bHQpKSB7XG4gICAgICAgIGFzeW5jID0gdHJ1ZTtcbiAgICAgICAgcmVzdWx0LnRoZW4oZnVuY3Rpb24gKGFzeW5jUmVzdWx0KSB7XG4gICAgICAgICAgaXRlbS5vbkRvbmUoYXN5bmNSZXN1bHQpO1xuICAgICAgICAgIF90aGlzLnByb2Nlc3MoYXN5bmNSZXN1bHQpO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICByZWxlYXNlKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpdGVtLm9uRG9uZShyZXN1bHQpO1xuICAgICAgICB0aGlzLnByb2Nlc3MocmVzdWx0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uRG9uZTogZnVuY3Rpb24gb25Eb25lKGdldFJlc3VsdCkge1xuICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZG9uZSwgcmVqZWN0KSB7XG4gICAgICAgICAgcmVsZWFzZSA9IGZ1bmN0aW9uIHJlbGVhc2UoZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZG9uZShnZXRSZXN1bHQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0UmVzdWx0KCk7XG4gICAgfSxcbiAgICBpc1J1bm5pbmc6IGZ1bmN0aW9uIGlzUnVubmluZygpIHtcbiAgICAgIHJldHVybiBydW5uaW5nO1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUcmVlO1xuXG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMob2JqLCBrZXlzKSB7IHZhciB0YXJnZXQgPSB7fTsgZm9yICh2YXIgaSBpbiBvYmopIHsgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTsgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7IHRhcmdldFtpXSA9IG9ialtpXTsgfSByZXR1cm4gdGFyZ2V0OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBuby1yZXR1cm4tYXNzaWduLCBtYXgtbGVuICovXG52YXIgTE9HUyA9IGZhbHNlO1xudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIHJldHVybiBMT0dTID8gKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpIDogbnVsbDtcbn07XG5cbmZ1bmN0aW9uIFRyZWUoKSB7XG4gIHZhciBvbk5vZGVFbnRlciA9IFtdO1xuICB2YXIgb25Ob2RlT3V0ID0gW107XG4gIHZhciBfb25Ob2RlUmVtb3ZlID0gW107XG4gIHZhciByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICB2YXIgaWRzID0gMDtcblxuICBmdW5jdGlvbiBnZXRJZCgpIHtcbiAgICByZXR1cm4gJ2EnICsgKytpZHM7XG4gIH07XG4gIGZ1bmN0aW9uIHVzZVNhbWVOb2RlKG5vZGUsIG5ld0VsZW1lbnQpIHtcbiAgICBuZXdFbGVtZW50LmluaXRpYWxpemUobm9kZS5lbGVtZW50LmlkLCBub2RlLmVsZW1lbnQudXNlZCgpKTtcbiAgICBub2RlLmVsZW1lbnQgPSBuZXdFbGVtZW50O1xuICAgIHJldHVybiBub2RlO1xuICB9XG4gIGZ1bmN0aW9uIHRyZWVEaWZmKG9sZEVsZW1lbnQsIG5ld0VsZW1lbnQpIHtcbiAgICBpZiAob2xkRWxlbWVudCAmJiBvbGRFbGVtZW50Lm5hbWUgPT09IG5ld0VsZW1lbnQubmFtZSkge1xuICAgICAgaWYgKG9sZEVsZW1lbnQucHJvcHMgJiYgbmV3RWxlbWVudC5wcm9wcykge1xuICAgICAgICByZXR1cm4gb2xkRWxlbWVudC5wcm9wcy5rZXkgPT09IG5ld0VsZW1lbnQucHJvcHMua2V5O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBjcmVhdGVOZXdOb2RlKGVsZW1lbnQsIHBhcmVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50LmluaXRpYWxpemUoZ2V0SWQoKSk7XG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICBjdXJzb3I6IDAsXG4gICAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICBpZiAodGhpcy5sb2dzKSB0aGlzLmxvZ3MgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBsb2coJy0+ICcgKyB0aGlzLmVsZW1lbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5lbnRlcigpO1xuICAgICAgICBvbk5vZGVFbnRlci5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBvdXQ6IGZ1bmN0aW9uIG91dCgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgbG9nKCc8LSAnICsgdGhpcy5lbGVtZW50Lm5hbWUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQub3V0KCk7XG4gICAgICAgIC8vIElmIHRoZXJlJ3JlIG1vcmUgbm9kZXMgaW4gdGhlIHRyZWUgdGhhbiB3aGF0IHdhcyBwcm9jZXNzZWRcbiAgICAgICAgaWYgKHRoaXMuY3Vyc29yIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSh0aGlzLmN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSB0aGlzLmN1cnNvcikuZm9yRWFjaChmdW5jdGlvbiAocmVtb3ZlZE5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfb25Ob2RlUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGMocmVtb3ZlZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJzb3IgPSAwO1xuICAgICAgICBvbk5vZGVPdXQuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzMik7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGFkZENoaWxkTm9kZTogZnVuY3Rpb24gYWRkQ2hpbGROb2RlKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGNoaWxkTm9kZSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdO1xuXG4gICAgICAgIC8vIHVzaW5nIHRoZSBzYW1lIG5vZGVcbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiB0cmVlRGlmZihjaGlsZE5vZGUuZWxlbWVudCwgbmV3RWxlbWVudCkpIHtcbiAgICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICAgIHJldHVybiB1c2VTYW1lTm9kZShjaGlsZE5vZGUsIG5ld0VsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRpbmcgYSBuZXcgbm9kZVxuICAgICAgICB2YXIgbmV3Q2hpbGROb2RlID0gY3JlYXRlTmV3Tm9kZShuZXdFbGVtZW50LCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl0pIHtcbiAgICAgICAgICBfb25Ob2RlUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiBjKF90aGlzMy5jaGlsZHJlbltfdGhpczMuY3Vyc29yXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl0gPSBuZXdDaGlsZE5vZGU7XG4gICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgIHJldHVybiBuZXdDaGlsZE5vZGU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICBub2RlLmxvZyA9IGZ1bmN0aW9uICh0eXBlLCBtZXRhKSB7XG4gICAgICAgIGlmICghKCdsb2dzJyBpbiBub2RlKSkgbm9kZS5sb2dzID0gW107XG4gICAgICAgIG5vZGUubG9ncy5wdXNoKHsgdHlwZTogdHlwZSwgbWV0YTogbWV0YSB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmVSb290OiBmdW5jdGlvbiByZXNvbHZlUm9vdChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gcm9vdCA9IHRyZWVEaWZmKHJvb3QuZWxlbWVudCwgZWxlbWVudCkgPyB1c2VTYW1lTm9kZShyb290LCBlbGVtZW50KSA6IGNyZWF0ZU5ld05vZGUoZWxlbWVudCk7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICAgICAgaWRzID0gMDtcbiAgICB9LFxuICAgIGdldE51bU9mRWxlbWVudHM6IGZ1bmN0aW9uIGdldE51bU9mRWxlbWVudHMoKSB7XG4gICAgICByZXR1cm4gaWRzO1xuICAgIH0sXG4gICAgZGlhZ25vc2U6IGZ1bmN0aW9uIGRpYWdub3NlKCkge1xuICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxvb3BPdmVyKG5vZGUpIHtcbiAgICAgICAgICB2YXIgaW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICAgICAgdmFyIF9yZWYgPSBub2RlLmVsZW1lbnQucHJvcHMgPyBub2RlLmVsZW1lbnQucHJvcHMgOiB7fSxcbiAgICAgICAgICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnY2hpbGRyZW4nXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmQ6IGluZCxcbiAgICAgICAgICAgIG5hbWU6IG5vZGUuZWxlbWVudC5uYW1lLFxuICAgICAgICAgICAgbG9nczogbm9kZS5sb2dzLFxuICAgICAgICAgICAgcHJvcHM6IF9leHRlbmRzKHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46ICc8ZnVuY3Rpb24gY2hpbGRyZW4+J1xuICAgICAgICAgICAgfSwgcmVzdCksXG4gICAgICAgICAgICB1c2VkOiBub2RlLmVsZW1lbnQudXNlZCgpLFxuICAgICAgICAgICAgaWQ6IG5vZGUuZWxlbWVudC5pZCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxvb3BPdmVyKGNoaWxkLCBpbmQgKyAxKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfTtcbiAgICAgICAgfShyb290KTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGF2YWlsYWJsZSBpbiBwcm9kdWN0aW9uIG1vZGUnKTtcbiAgICB9LFxuICAgIGFkZE5vZGVFbnRlckNhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlRW50ZXJDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlRW50ZXIucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBhZGROb2RlT3V0Q2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlT3V0LnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIF9vbk5vZGVSZW1vdmUucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxudmFyIF9Db250ZXh0ID0gcmVxdWlyZSgnLi4vQ29udGV4dCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlRWxlbWVudEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50SG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChDb250ZXh0KSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICByZXR1cm4gQ29udGV4dFtfQ29udGV4dC5QVUJMSUNfQ09OVEVYVF9LRVldKCk7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFbGVtZW50SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZmFzdERlZXBFcXVhbCA9IHJlcXVpcmUoJ2Zhc3QtZGVlcC1lcXVhbCcpO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmFzdERlZXBFcXVhbCk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IGVmZmVjdHM6IFtdLCBjb25zdW1lcjogMCB9O1xuICB9LFxuICBjbGVhblVwOiBmdW5jdGlvbiBjbGVhblVwKGlkKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbaWRdKSB7XG4gICAgICBkZWxldGUgdGhpcy5lbGVtZW50c1tpZF07XG4gICAgfVxuICB9XG59O1xuXG52YXIgY3JlYXRlRWZmZWN0ID0gZnVuY3Rpb24gY3JlYXRlRWZmZWN0KGNhbGxiYWNrLCBkZXBzKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgIGRlcHM6IGRlcHNcbiAgfTtcbn07XG52YXIgdXBkYXRlRWZmZWN0ID0gZnVuY3Rpb24gdXBkYXRlRWZmZWN0KGVmZmVjdCwgY2FsbGJhY2ssIGRlcHMpIHtcbiAgZWZmZWN0LmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGVmZmVjdC5vbGREZXBzID0gZWZmZWN0LmRlcHM7XG4gIGVmZmVjdC5kZXBzID0gZGVwcztcbiAgcmV0dXJuIGVmZmVjdDtcbn07XG5cbmZ1bmN0aW9uIGRlcHNFcXVhbChvbGREZXBzLCBuZXdEZXBzKSB7XG4gIGlmICghb2xkRGVwcykgcmV0dXJuIGZhbHNlO1xuICBpZiAob2xkRGVwcy5sZW5ndGggIT09IG5ld0RlcHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAoMCwgX2Zhc3REZWVwRXF1YWwyLmRlZmF1bHQpKG9sZERlcHMsIG5ld0RlcHMpO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUVmZmVjdChub2RlLCBlZmZlY3QpIHtcbiAgdmFyIGRlcHMgPSBlZmZlY3QuZGVwcyxcbiAgICAgIG9sZERlcHMgPSBlZmZlY3Qub2xkRGVwcyxcbiAgICAgIGNhbGxiYWNrID0gZWZmZWN0LmNhbGxiYWNrO1xuXG5cbiAgaWYgKHR5cGVvZiBkZXBzID09PSAndW5kZWZpbmVkJykge1xuICAgIGVmZmVjdC5jbGVhblVwID0gY2FsbGJhY2soKTtcbiAgfSBlbHNlIGlmIChkZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChub2RlLmVsZW1lbnQudXNlZCgpID09PSAxKSB7XG4gICAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBhcmVFcXVhbCA9IGRlcHNFcXVhbChvbGREZXBzLCBkZXBzKTtcblxuICAgIGlmICghYXJlRXF1YWwpIHtcbiAgICAgIGVmZmVjdC5jbGVhblVwID0gY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIGNyZWF0ZVVzZUVmZmVjdEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFZmZlY3RIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgc3RvcmFnZS5lZmZlY3RzLmZvckVhY2goZnVuY3Rpb24gKGVmZmVjdCkge1xuICAgICAgaWYgKGVmZmVjdC5jbGVhblVwKSBlZmZlY3QuY2xlYW5VcCgpO1xuICAgIH0pO1xuICAgIFN0b3JhZ2UuY2xlYW5VcChub2RlLmVsZW1lbnQuaWQpO1xuICB9KTtcbiAgcHJvY2Vzc29yLm9uTm9kZU91dChmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIGlmIChzdG9yYWdlLmVmZmVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc3RvcmFnZS5lZmZlY3RzLmZvckVhY2goZnVuY3Rpb24gKGVmZmVjdCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZUVmZmVjdChub2RlLCBlZmZlY3QpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaywgZGVwcykge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIC8vIGZpcnN0IHJ1blxuICAgIGlmIChlbGVtZW50LnVzZWQoKSA9PT0gMCkge1xuICAgICAgc3RvcmFnZS5lZmZlY3RzLnB1c2goY3JlYXRlRWZmZWN0KGNhbGxiYWNrLCBkZXBzKSk7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGluZGV4ID0gc3RvcmFnZS5jb25zdW1lcjtcblxuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5lZmZlY3RzLmxlbmd0aCAtIDEgPyBzdG9yYWdlLmNvbnN1bWVyICsgMSA6IDA7XG4gICAgICB1cGRhdGVFZmZlY3Qoc3RvcmFnZS5lZmZlY3RzW2luZGV4XSwgY2FsbGJhY2ssIGRlcHMpO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVmZmVjdEhvb2s7XG5cblxuY3JlYXRlVXNlRWZmZWN0SG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNyZWF0ZVVzZUVsZW1lbnRIb29rID0gZnVuY3Rpb24gY3JlYXRlVXNlRWxlbWVudEhvb2socHJvY2Vzc29yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICByZXR1cm4gcHJvY2Vzc29yLm5vZGUoKS5lbGVtZW50O1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlRWxlbWVudEhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHViU3ViSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc3Vic2NyaWJlcnMgPSB7fTtcblxudmFyIHN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShub2RlLCBlbGVtZW50LCB0eXBlLCBjYWxsYmFjaykge1xuICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdKSBzdWJzY3JpYmVyc1t0eXBlXSA9IHt9O1xuICBpZiAoX19ERVZfXykge1xuICAgIGlmICghc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF0pIHtcbiAgICAgIG5vZGUubG9nKCd1c2VQdWJTdWI6c3Vic2NyaWJlJywgdHlwZSk7XG4gICAgfVxuICB9XG4gIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdID0gY2FsbGJhY2s7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIG5vZGUubG9nKCd1c2VQdWJTdWI6dW5zdWJzY3JpYmUnLCB0eXBlKTtcbiAgICB9XG4gICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdO1xuICB9O1xufTtcbnZhciBwdWJsaXNoID0gZnVuY3Rpb24gcHVibGlzaChub2RlLCB0eXBlLCBwYXlsb2FkKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHJldHVybjtcbiAgaWYgKF9fREVWX18pIHtcbiAgICBub2RlLmxvZygndXNlUHViU3ViOnB1Ymxpc2g6JyArIHR5cGUsIHBheWxvYWQpO1xuICB9XG4gIE9iamVjdC5rZXlzKHN1YnNjcmliZXJzW3R5cGVdKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgIHN1YnNjcmliZXJzW3R5cGVdW2lkXShwYXlsb2FkKTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVVc2VQdWJTdWJIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIGlmIChzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdKSB7XG4gICAgICAgIGRlbGV0ZSBzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZWRFbGVtZW50KSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsID0gc2NvcGVkRWxlbWVudCB8fCBub2RlLmVsZW1lbnQ7XG4gICAgdmFyIHN1YnNjcmliZUZ1bmMgPSBmdW5jdGlvbiBzdWJzY3JpYmVGdW5jKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBwYXJhbXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdWJzY3JpYmUuYXBwbHkodW5kZWZpbmVkLCBbbm9kZSwgZWxdLmNvbmNhdChwYXJhbXMpKTtcbiAgICB9O1xuICAgIHZhciBwdWJsaXNoRnVuYyA9IGZ1bmN0aW9uIHB1Ymxpc2hGdW5jKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBwYXJhbXMgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBwYXJhbXNbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHB1Ymxpc2guYXBwbHkodW5kZWZpbmVkLCBbbm9kZV0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmVGdW5jLFxuICAgICAgcHVibGlzaDogcHVibGlzaEZ1bmMsXG4gICAgICBzdWJzY3JpYmVyczogc3Vic2NyaWJlcnNcbiAgICB9O1xuICB9O1xufVxuXG5jcmVhdGVVc2VQdWJTdWJIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBzdWJzY3JpYmVycyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUmVkdWNlckhvb2s7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuZnVuY3Rpb24gY3JlYXRlRGlzcGF0Y2hFbGVtZW50KGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBhY3Rpb24gPSBfcmVmLmFjdGlvbixcbiAgICAgICAgcHJvcHNUb0FjdGlvbiA9IF9yZWYucHJvcHNUb0FjdGlvbixcbiAgICAgICAgcmVzdCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcmVmLCBbJ2FjdGlvbicsICdwcm9wc1RvQWN0aW9uJ10pO1xuXG4gICAgaWYgKGFjdGlvbikge1xuICAgICAgZGlzcGF0Y2goYWN0aW9uKTtcbiAgICB9IGVsc2UgaWYgKHByb3BzVG9BY3Rpb24pIHtcbiAgICAgIGRpc3BhdGNoKHByb3BzVG9BY3Rpb24ocmVzdCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJzxEaXNwYXRjaD4gZXhwZWN0cyBcImFjdGlvblwiIG9yIFwicHJvcHNUb0FjdGlvblwiIHByb3AuJyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVc2VSZWR1Y2VySG9vayh1c2VTdGF0ZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIGluaXRpYWxTdGF0ZSkge1xuICAgIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZShpbml0aWFsU3RhdGUpLFxuICAgICAgICBfdXNlU3RhdGUyID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAyKSxcbiAgICAgICAgc3RhdGUgPSBfdXNlU3RhdGUyWzBdLFxuICAgICAgICBzZXRTdGF0ZSA9IF91c2VTdGF0ZTJbMV07XG5cbiAgICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgIHJldHVybiBzZXRTdGF0ZShyZWR1Y2VyKHN0YXRlKCksIGFjdGlvbikpO1xuICAgIH07XG5cbiAgICByZXR1cm4gW3N0YXRlLCBkaXNwYXRjaCwgY3JlYXRlRGlzcGF0Y2hFbGVtZW50KGRpc3BhdGNoKSwgLy8gPERpc3BhdGNoPlxuICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGF0ZSgpO1xuICAgIH0gLy8gPEdldFN0YXRlPlxuICAgIF07XG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlU3RhdGVIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBTdG9yYWdlID0ge1xuICBlbGVtZW50czoge30sXG4gIGdldDogZnVuY3Rpb24gZ2V0KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdID0geyBzdGF0ZXM6IFtdLCBjb25zdW1lcjogMCB9O1xuICB9LFxuICBjbGVhblVwOiBmdW5jdGlvbiBjbGVhblVwKGlkKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbaWRdKSB7XG4gICAgICBkZWxldGUgdGhpcy5lbGVtZW50c1tpZF07XG4gICAgfVxuICB9XG59OyAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5mdW5jdGlvbiBjcmVhdGVVc2VTdGF0ZUhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICByZXR1cm4gU3RvcmFnZS5jbGVhblVwKG5vZGUuZWxlbWVudC5pZCk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKGluaXRpYWxTdGF0ZSkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIHZhciBpbmRleCA9IHZvaWQgMDtcblxuICAgIC8vIGZpcnN0IHJ1blxuICAgIGlmIChlbGVtZW50LnVzZWQoKSA9PT0gMCkge1xuICAgICAgc3RvcmFnZS5zdGF0ZXMucHVzaChpbml0aWFsU3RhdGUpO1xuICAgICAgaW5kZXggPSBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxO1xuXG4gICAgICAvLyBvdGhlciBydW5zXG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gc3RvcmFnZS5jb25zdW1lcjtcbiAgICAgIHN0b3JhZ2UuY29uc3VtZXIgPSBpbmRleCA8IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDEgPyBzdG9yYWdlLmNvbnN1bWVyICsgMSA6IDA7XG4gICAgfVxuXG4gICAgaWYgKF9fREVWX18pIG5vZGUubG9nKCd1c2VTdGF0ZTpjb25zdW1lZCcsIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XSk7XG5cbiAgICByZXR1cm4gW2Z1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlLnN0YXRlc1tpbmRleF07XG4gICAgfSwgZnVuY3Rpb24gKG5ld1N0YXRlKSB7XG4gICAgICBpZiAoX19ERVZfXykgbm9kZS5sb2coJ3VzZVN0YXRlOm5ldycsIG5ld1N0YXRlKTtcbiAgICAgIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XSA9IG5ld1N0YXRlO1xuICAgICAgaWYgKCFlbGVtZW50LmlzUnVubmluZygpKSB7XG4gICAgICAgIG5vZGUucmVydW4oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICB9XTtcbiAgfTtcbn1cblxuY3JlYXRlVXNlU3RhdGVIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBTdG9yYWdlLmVsZW1lbnRzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVmFsaWRIb29rQ29udGV4dDtcbmZ1bmN0aW9uIGlzVmFsaWRIb29rQ29udGV4dChwcm9jZXNzb3IpIHtcbiAgaWYgKCFwcm9jZXNzb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NvbWV0aGluZyB0ZXJyaWJseSB3cm9uZyBoYXBwZW5lZC4gVGhlIGhvb2sgZmFjdG9yeSBmdW5jdGlvbiBpcyBjYWxsZWQgd2l0aG91dCBhIHByb2Nlc3Nvci4nKTtcbiAgfVxuICBpZiAoIXByb2Nlc3Nvci5ub2RlKCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0hvb2tzIG11c3QgYmUgY2FsbGVkIGluIHRoZSBjb250ZXh0IG9mIGFuIEFjdE1MIGVsZW1lbnQuJyk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jcmVhdGVSdW50aW1lID0gY3JlYXRlUnVudGltZTtcblxudmFyIF9Qcm9jZXNzb3IgPSByZXF1aXJlKCcuL1Byb2Nlc3NvcicpO1xuXG52YXIgX1Byb2Nlc3NvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Qcm9jZXNzb3IpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50ID0gcmVxdWlyZSgnLi91dGlscy9pc0FjdE1MRWxlbWVudCcpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQWN0TUxFbGVtZW50KTtcblxudmFyIF9BY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9BY3RFbGVtZW50Jyk7XG5cbnZhciBfQWN0RWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY3RFbGVtZW50KTtcblxudmFyIF91c2VFbGVtZW50ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFbGVtZW50Jyk7XG5cbnZhciBfdXNlRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VFbGVtZW50KTtcblxudmFyIF91c2VQdWJTdWIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVB1YlN1YicpO1xuXG52YXIgX3VzZVB1YlN1YjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQdWJTdWIpO1xuXG52YXIgX3VzZVN0YXRlID0gcmVxdWlyZSgnLi9ob29rcy91c2VTdGF0ZScpO1xuXG52YXIgX3VzZVN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVN0YXRlKTtcblxudmFyIF91c2VSZWR1Y2VyID0gcmVxdWlyZSgnLi9ob29rcy91c2VSZWR1Y2VyJyk7XG5cbnZhciBfdXNlUmVkdWNlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VSZWR1Y2VyKTtcblxudmFyIF91c2VFZmZlY3QgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVmZmVjdCcpO1xuXG52YXIgX3VzZUVmZmVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VFZmZlY3QpO1xuXG52YXIgX3VzZUNvbnRleHQgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUNvbnRleHQnKTtcblxudmFyIF91c2VDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUNvbnRleHQpO1xuXG52YXIgX0NvbnRleHQgPSByZXF1aXJlKCcuL0NvbnRleHQnKTtcblxudmFyIF9Db250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjcmVhdGVSdW50aW1lKCkge1xuICB2YXIgcHJvY2Vzc29yID0gKDAsIF9Qcm9jZXNzb3IyLmRlZmF1bHQpKCk7XG5cbiAgZnVuY3Rpb24gQShmdW5jLCBwcm9wcykge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBjaGlsZHJlbiA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGNoaWxkcmVuW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICByZXR1cm4gKDAsIF9BY3RFbGVtZW50Mi5kZWZhdWx0KShmdW5jLCBwcm9wcywgY2hpbGRyZW4pO1xuICB9XG4gIGZ1bmN0aW9uIHJ1bihlbGVtZW50KSB7XG4gICAgaWYgKCEoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShlbGVtZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3RNTCBlbGVtZW50IGV4cGVjdGVkLiBJbnN0ZWFkICcgKyBlbGVtZW50LnRvU3RyaW5nKCkgKyAnIHBhc3NlZC4nKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb2Nlc3Nvci5ydW4oZWxlbWVudCk7XG4gIH1cbiAgdmFyIEZyYWdtZW50ID0gZnVuY3Rpb24gRnJhZ21lbnQoX3JlZikge1xuICAgIHZhciBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW47XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9O1xuICB2YXIgdXNlRWxlbWVudCA9ICgwLCBfdXNlRWxlbWVudDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVN0YXRlID0gKDAsIF91c2VTdGF0ZTIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVB1YlN1YiA9ICgwLCBfdXNlUHViU3ViMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlUmVkdWNlciA9ICgwLCBfdXNlUmVkdWNlcjIuZGVmYXVsdCkodXNlU3RhdGUpO1xuICB2YXIgdXNlRWZmZWN0ID0gKDAsIF91c2VFZmZlY3QyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VDb250ZXh0ID0gKDAsIF91c2VDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgY3JlYXRlQ29udGV4dCA9ICgwLCBfQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICByZXR1cm4ge1xuICAgIEE6IEEsXG4gICAgcnVuOiBydW4sXG4gICAgRnJhZ21lbnQ6IEZyYWdtZW50LFxuICAgIHByb2Nlc3NvcjogcHJvY2Vzc29yLFxuICAgIHVzZUVsZW1lbnQ6IHVzZUVsZW1lbnQsXG4gICAgdXNlUHViU3ViOiB1c2VQdWJTdWIsXG4gICAgdXNlU3RhdGU6IHVzZVN0YXRlLFxuICAgIHVzZVJlZHVjZXI6IHVzZVJlZHVjZXIsXG4gICAgdXNlRWZmZWN0OiB1c2VFZmZlY3QsXG4gICAgdXNlQ29udGV4dDogdXNlQ29udGV4dCxcbiAgICBjcmVhdGVDb250ZXh0OiBjcmVhdGVDb250ZXh0XG4gIH07XG59XG5cbnZhciBydW50aW1lID0gY3JlYXRlUnVudGltZSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVSdW50aW1lID0gY3JlYXRlUnVudGltZSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNBY3RNTEVsZW1lbnQ7XG5mdW5jdGlvbiBpc0FjdE1MRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuX19hY3RtbCA9PT0gdHJ1ZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIga2V5TGlzdCA9IE9iamVjdC5rZXlzO1xudmFyIGhhc1Byb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYXJyQSA9IGlzQXJyYXkoYSlcbiAgICAgICwgYXJyQiA9IGlzQXJyYXkoYilcbiAgICAgICwgaVxuICAgICAgLCBsZW5ndGhcbiAgICAgICwga2V5O1xuXG4gICAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhcnJBICE9IGFyckIpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAsIGRhdGVCID0gYiBpbnN0YW5jZW9mIERhdGU7XG4gICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSByZXR1cm4gYS5nZXRUaW1lKCkgPT0gYi5nZXRUaW1lKCk7XG5cbiAgICB2YXIgcmVnZXhwQSA9IGEgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICwgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuXG4gICAgdmFyIGtleXMgPSBrZXlMaXN0KGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCAhPT0ga2V5TGlzdChiKS5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIWhhc1Byb3AuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKCFlcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBhIT09YSAmJiBiIT09Yjtcbn07XG4iLCJpbXBvcnQgQ2lyY3VsYXJKU09OIGZyb20gJy4vdmVuZG9yL0NpcmN1bGFySlNPTic7XG5pbXBvcnQgU2VyaWFsaXplRXJyb3IgZnJvbSAnLi92ZW5kb3IvU2VyaWFsaXplRXJyb3InO1xuXG5jb25zdCB7IHN0cmluZ2lmeSB9ID0gQ2lyY3VsYXJKU09OO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYW5pdGl6ZShzb21ldGhpbmcsIHNob3dFcnJvckluQ29uc29sZSA9IGZhbHNlKSB7XG4gIHZhciByZXN1bHQ7XG5cbiAgdHJ5IHtcbiAgICByZXN1bHQgPSBKU09OLnBhcnNlKHN0cmluZ2lmeShzb21ldGhpbmcsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5uYW1lID09PSAnJyA/ICc8YW5vbnltb3VzPicgOiBgZnVuY3Rpb24gJHsgdmFsdWUubmFtZSB9KClgO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZUVycm9yKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LCB1bmRlZmluZWQsIHRydWUpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoc2hvd0Vycm9ySW5Db25zb2xlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICAgIHJlc3VsdCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyohXG5Db3B5cmlnaHQgKEMpIDIwMTMtMjAxNyBieSBBbmRyZWEgR2lhbW1hcmNoaSAtIEBXZWJSZWZsZWN0aW9uXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cblxuKi9cbnZhclxuLy8gc2hvdWxkIGJlIGEgbm90IHNvIGNvbW1vbiBjaGFyXG4vLyBwb3NzaWJseSBvbmUgSlNPTiBkb2VzIG5vdCBlbmNvZGVcbi8vIHBvc3NpYmx5IG9uZSBlbmNvZGVVUklDb21wb25lbnQgZG9lcyBub3QgZW5jb2RlXG4vLyByaWdodCBub3cgdGhpcyBjaGFyIGlzICd+JyBidXQgdGhpcyBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZVxuc3BlY2lhbENoYXIgPSAnficsXG5zYWZlU3BlY2lhbENoYXIgPSAnXFxcXHgnICsgKFxuICAnMCcgKyBzcGVjaWFsQ2hhci5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KVxuKS5zbGljZSgtMiksXG5lc2NhcGVkU2FmZVNwZWNpYWxDaGFyID0gJ1xcXFwnICsgc2FmZVNwZWNpYWxDaGFyLFxuc3BlY2lhbENoYXJSRyA9IG5ldyBSZWdFeHAoc2FmZVNwZWNpYWxDaGFyLCAnZycpLFxuc2FmZVNwZWNpYWxDaGFyUkcgPSBuZXcgUmVnRXhwKGVzY2FwZWRTYWZlU3BlY2lhbENoYXIsICdnJyksXG5cbnNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHID0gbmV3IFJlZ0V4cCgnKD86XnwoW15cXFxcXFxcXF0pKScgKyBlc2NhcGVkU2FmZVNwZWNpYWxDaGFyKSxcblxuaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24odil7XG4gIGZvcih2YXIgaT10aGlzLmxlbmd0aDtpLS0mJnRoaXNbaV0hPT12Oyk7XG4gIHJldHVybiBpO1xufSxcbiRTdHJpbmcgPSBTdHJpbmcgIC8vIHRoZXJlJ3Mgbm8gd2F5IHRvIGRyb3Agd2FybmluZ3MgaW4gSlNIaW50XG4gICAgICAgICAgICAgICAgICAvLyBhYm91dCBuZXcgU3RyaW5nIC4uLiB3ZWxsLCBJIG5lZWQgdGhhdCBoZXJlIVxuICAgICAgICAgICAgICAgICAgLy8gZmFrZWQsIGFuZCBoYXBweSBsaW50ZXIhXG47XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmVwbGFjZXIodmFsdWUsIHJlcGxhY2VyLCByZXNvbHZlKSB7XG52YXJcbiAgaW5zcGVjdCA9ICEhcmVwbGFjZXIsXG4gIHBhdGggPSBbXSxcbiAgYWxsICA9IFt2YWx1ZV0sXG4gIHNlZW4gPSBbdmFsdWVdLFxuICBtYXBwID0gW3Jlc29sdmUgPyBzcGVjaWFsQ2hhciA6ICc8Y2lyY3VsYXI+J10sXG4gIGxhc3QgPSB2YWx1ZSxcbiAgbHZsICA9IDEsXG4gIGksIGZuXG47XG5pZiAoaW5zcGVjdCkge1xuICBmbiA9IHR5cGVvZiByZXBsYWNlciA9PT0gJ29iamVjdCcgP1xuICAgIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4ga2V5ICE9PSAnJyAmJiByZXBsYWNlci5pbmRleE9mKGtleSkgPCAwID8gdm9pZCAwIDogdmFsdWU7XG4gICAgfSA6XG4gICAgcmVwbGFjZXI7XG59XG5yZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAvLyB0aGUgcmVwbGFjZXIgaGFzIHJpZ2h0cyB0byBkZWNpZGVcbiAgLy8gaWYgYSBuZXcgb2JqZWN0IHNob3VsZCBiZSByZXR1cm5lZFxuICAvLyBvciBpZiB0aGVyZSdzIHNvbWUga2V5IHRvIGRyb3BcbiAgLy8gbGV0J3MgY2FsbCBpdCBoZXJlIHJhdGhlciB0aGFuIFwidG9vIGxhdGVcIlxuICBpZiAoaW5zcGVjdCkgdmFsdWUgPSBmbi5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuXG4gIC8vIGRpZCB5b3Uga25vdyA/IFNhZmFyaSBwYXNzZXMga2V5cyBhcyBpbnRlZ2VycyBmb3IgYXJyYXlzXG4gIC8vIHdoaWNoIG1lYW5zIGlmIChrZXkpIHdoZW4ga2V5ID09PSAwIHdvbid0IHBhc3MgdGhlIGNoZWNrXG4gIGlmIChrZXkgIT09ICcnKSB7XG4gICAgaWYgKGxhc3QgIT09IHRoaXMpIHtcbiAgICAgIGkgPSBsdmwgLSBpbmRleE9mLmNhbGwoYWxsLCB0aGlzKSAtIDE7XG4gICAgICBsdmwgLT0gaTtcbiAgICAgIGFsbC5zcGxpY2UobHZsLCBhbGwubGVuZ3RoKTtcbiAgICAgIHBhdGguc3BsaWNlKGx2bCAtIDEsIHBhdGgubGVuZ3RoKTtcbiAgICAgIGxhc3QgPSB0aGlzO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhsdmwsIGtleSwgcGF0aCk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgcmVmZXJyaW5nIHRvIHBhcmVudCBvYmplY3QsIGFkZCB0byB0aGVcbiAgICAgIC8vIG9iamVjdCBwYXRoIHN0YWNrLiBPdGhlcndpc2UgaXQgaXMgYWxyZWFkeSB0aGVyZS5cbiAgICAgIGlmIChpbmRleE9mLmNhbGwoYWxsLCB2YWx1ZSkgPCAwKSB7XG4gICAgICAgIGFsbC5wdXNoKGxhc3QgPSB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBsdmwgPSBhbGwubGVuZ3RoO1xuICAgICAgaSA9IGluZGV4T2YuY2FsbChzZWVuLCB2YWx1ZSk7XG4gICAgICBpZiAoaSA8IDApIHtcbiAgICAgICAgaSA9IHNlZW4ucHVzaCh2YWx1ZSkgLSAxO1xuICAgICAgICBpZiAocmVzb2x2ZSkge1xuICAgICAgICAgIC8vIGtleSBjYW5ub3QgY29udGFpbiBzcGVjaWFsQ2hhciBidXQgY291bGQgYmUgbm90IGEgc3RyaW5nXG4gICAgICAgICAgcGF0aC5wdXNoKCgnJyArIGtleSkucmVwbGFjZShzcGVjaWFsQ2hhclJHLCBzYWZlU3BlY2lhbENoYXIpKTtcbiAgICAgICAgICBtYXBwW2ldID0gc3BlY2lhbENoYXIgKyBwYXRoLmpvaW4oc3BlY2lhbENoYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcHBbaV0gPSBtYXBwWzBdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IG1hcHBbaV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHJlc29sdmUpIHtcbiAgICAgICAgLy8gZW5zdXJlIG5vIHNwZWNpYWwgY2hhciBpbnZvbHZlZCBvbiBkZXNlcmlhbGl6YXRpb25cbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIG9ubHkgZmlyc3QgY2hhciBpcyBpbXBvcnRhbnRcbiAgICAgICAgLy8gbm8gbmVlZCB0byByZXBsYWNlIGFsbCB2YWx1ZSAoYmV0dGVyIHBlcmZvcm1hbmNlKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlIC5yZXBsYWNlKHNhZmVTcGVjaWFsQ2hhciwgZXNjYXBlZFNhZmVTcGVjaWFsQ2hhcilcbiAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShzcGVjaWFsQ2hhciwgc2FmZVNwZWNpYWxDaGFyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcbn1cblxuZnVuY3Rpb24gcmV0cmlldmVGcm9tUGF0aChjdXJyZW50LCBrZXlzKSB7XG5mb3IodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgY3VycmVudCA9IGN1cnJlbnRbXG4gIC8vIGtleXMgc2hvdWxkIGJlIG5vcm1hbGl6ZWQgYmFjayBoZXJlXG4gIGtleXNbaSsrXS5yZXBsYWNlKHNhZmVTcGVjaWFsQ2hhclJHLCBzcGVjaWFsQ2hhcilcbl0pO1xucmV0dXJuIGN1cnJlbnQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmV2aXZlcihyZXZpdmVyKSB7XG5yZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICBpZiAoaXNTdHJpbmcgJiYgdmFsdWUuY2hhckF0KDApID09PSBzcGVjaWFsQ2hhcikge1xuICAgIHJldHVybiBuZXcgJFN0cmluZyh2YWx1ZS5zbGljZSgxKSk7XG4gIH1cbiAgaWYgKGtleSA9PT0gJycpIHZhbHVlID0gcmVnZW5lcmF0ZSh2YWx1ZSwgdmFsdWUsIHt9KTtcbiAgLy8gYWdhaW4sIG9ubHkgb25lIG5lZWRlZCwgZG8gbm90IHVzZSB0aGUgUmVnRXhwIGZvciB0aGlzIHJlcGxhY2VtZW50XG4gIC8vIG9ubHkga2V5cyBuZWVkIHRoZSBSZWdFeHBcbiAgaWYgKGlzU3RyaW5nKSB2YWx1ZSA9IHZhbHVlIC5yZXBsYWNlKHNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHLCAnJDEnICsgc3BlY2lhbENoYXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShlc2NhcGVkU2FmZVNwZWNpYWxDaGFyLCBzYWZlU3BlY2lhbENoYXIpO1xuICByZXR1cm4gcmV2aXZlciA/IHJldml2ZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKSA6IHZhbHVlO1xufTtcbn1cblxuZnVuY3Rpb24gcmVnZW5lcmF0ZUFycmF5KHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSB7XG5mb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICBjdXJyZW50W2ldID0gcmVnZW5lcmF0ZShyb290LCBjdXJyZW50W2ldLCByZXRyaWV2ZSk7XG59XG5yZXR1cm4gY3VycmVudDtcbn1cblxuZnVuY3Rpb24gcmVnZW5lcmF0ZU9iamVjdChyb290LCBjdXJyZW50LCByZXRyaWV2ZSkge1xuZm9yICh2YXIga2V5IGluIGN1cnJlbnQpIHtcbiAgaWYgKGN1cnJlbnQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIGN1cnJlbnRba2V5XSA9IHJlZ2VuZXJhdGUocm9vdCwgY3VycmVudFtrZXldLCByZXRyaWV2ZSk7XG4gIH1cbn1cbnJldHVybiBjdXJyZW50O1xufVxuXG5mdW5jdGlvbiByZWdlbmVyYXRlKHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSB7XG5yZXR1cm4gY3VycmVudCBpbnN0YW5jZW9mIEFycmF5ID9cbiAgLy8gZmFzdCBBcnJheSByZWNvbnN0cnVjdGlvblxuICByZWdlbmVyYXRlQXJyYXkocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIDpcbiAgKFxuICAgIGN1cnJlbnQgaW5zdGFuY2VvZiAkU3RyaW5nID9cbiAgICAgIChcbiAgICAgICAgLy8gcm9vdCBpcyBhbiBlbXB0eSBzdHJpbmdcbiAgICAgICAgY3VycmVudC5sZW5ndGggP1xuICAgICAgICAgIChcbiAgICAgICAgICAgIHJldHJpZXZlLmhhc093blByb3BlcnR5KGN1cnJlbnQpID9cbiAgICAgICAgICAgICAgcmV0cmlldmVbY3VycmVudF0gOlxuICAgICAgICAgICAgICByZXRyaWV2ZVtjdXJyZW50XSA9IHJldHJpZXZlRnJvbVBhdGgoXG4gICAgICAgICAgICAgICAgcm9vdCwgY3VycmVudC5zcGxpdChzcGVjaWFsQ2hhcilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICkgOlxuICAgICAgICAgIHJvb3RcbiAgICAgICkgOlxuICAgICAgKFxuICAgICAgICBjdXJyZW50IGluc3RhbmNlb2YgT2JqZWN0ID9cbiAgICAgICAgICAvLyBkZWRpY2F0ZWQgT2JqZWN0IHBhcnNlclxuICAgICAgICAgIHJlZ2VuZXJhdGVPYmplY3Qocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIDpcbiAgICAgICAgICAvLyB2YWx1ZSBhcyBpdCBpc1xuICAgICAgICAgIGN1cnJlbnRcbiAgICAgIClcbiAgKVxuO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlSZWN1cnNpb24odmFsdWUsIHJlcGxhY2VyLCBzcGFjZSwgZG9Ob3RSZXNvbHZlKSB7XG5yZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIGdlbmVyYXRlUmVwbGFjZXIodmFsdWUsIHJlcGxhY2VyLCAhZG9Ob3RSZXNvbHZlKSwgc3BhY2UpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVJlY3Vyc2lvbih0ZXh0LCByZXZpdmVyKSB7XG5yZXR1cm4gSlNPTi5wYXJzZSh0ZXh0LCBnZW5lcmF0ZVJldml2ZXIocmV2aXZlcikpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5UmVjdXJzaW9uLFxuICBwYXJzZTogcGFyc2VSZWN1cnNpb25cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8gQ3JlZGl0czogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9zZXJpYWxpemUtZXJyb3JcblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlID0+IHtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gZGVzdHJveUNpcmN1bGFyKHZhbHVlLCBbXSk7XG5cdH1cblxuXHQvLyBQZW9wbGUgc29tZXRpbWVzIHRocm93IHRoaW5ncyBiZXNpZGVzIEVycm9yIG9iamVjdHMsIHNv4oCmXG5cblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIEpTT04uc3RyaW5naWZ5IGRpc2NhcmRzIGZ1bmN0aW9ucy4gV2UgZG8gdG9vLCB1bmxlc3MgYSBmdW5jdGlvbiBpcyB0aHJvd24gZGlyZWN0bHkuXG5cdFx0cmV0dXJuIGBbRnVuY3Rpb246ICR7KHZhbHVlLm5hbWUgfHwgJ2Fub255bW91cycpfV1gO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZGVzdHJveS1jaXJjdWxhclxuZnVuY3Rpb24gZGVzdHJveUNpcmN1bGFyKGZyb20sIHNlZW4pIHtcblx0Y29uc3QgdG8gPSBBcnJheS5pc0FycmF5KGZyb20pID8gW10gOiB7fTtcblxuXHRzZWVuLnB1c2goZnJvbSk7XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZnJvbSkpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGZyb21ba2V5XTtcblxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0dG9ba2V5XSA9IHZhbHVlO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKHNlZW4uaW5kZXhPZihmcm9tW2tleV0pID09PSAtMSkge1xuXHRcdFx0dG9ba2V5XSA9IGRlc3Ryb3lDaXJjdWxhcihmcm9tW2tleV0sIHNlZW4uc2xpY2UoMCkpO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dG9ba2V5XSA9ICdbQ2lyY3VsYXJdJztcblx0fVxuXG5cdGlmICh0eXBlb2YgZnJvbS5uYW1lID09PSAnc3RyaW5nJykge1xuXHRcdHRvLm5hbWUgPSBmcm9tLm5hbWU7XG5cdH1cblxuXHRpZiAodHlwZW9mIGZyb20ubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcblx0XHR0by5tZXNzYWdlID0gZnJvbS5tZXNzYWdlO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBmcm9tLnN0YWNrID09PSAnc3RyaW5nJykge1xuXHRcdHRvLnN0YWNrID0gZnJvbS5zdGFjaztcblx0fVxuXG5cdHJldHVybiB0bztcbn0iLCJjb25zdCBFTlRFUiA9ICdFTlRFUic7XG5jb25zdCBPVVQgPSAnT1VUJztcbmNvbnN0IFJFTU9WRSA9ICdSRU1PVkUnO1xuXG5pbXBvcnQgc2FuaXRpemUgZnJvbSAnLi9oZWxwZXJzL3Nhbml0aXplJztcblxuY29uc3QgcGFyc2VMb2dNZXRhID0gbWV0YSA9PiB7XG4gIGlmICh0eXBlb2YgbWV0YSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiBtZXRhID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgbWV0YSA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBtZXRhID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBgKCR7IEpTT04uc3RyaW5naWZ5KG1ldGEpIH0pYDtcbiAgfVxuICBpZiAodHlwZW9mIG1ldGEgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWV0YSkpIHtcbiAgICAgIHJldHVybiBgKFsuLi4keyBtZXRhLmxlbmd0aCB9XSlgO1xuICAgIH1cbiAgICByZXR1cm4gJyhvYmplY3QpJztcbiAgfVxuICByZXR1cm4gYCgkeyB0eXBlb2YgbWV0YSB9KWA7XG59O1xuXG5mdW5jdGlvbiBwcmludFNuYXBzaG90VG9Db25zb2xlKHNuYXBzaG90KSB7XG4gIGNvbnN0IFsgdHlwZSwgbm9kZSwgdHJlZSBdID0gc25hcHNob3Q7XG4gIGxldCBzdHIgPSBgJHsgdHlwZSB9IDwkeyBub2RlLmVsZW1lbnQubmFtZSB9PlxcbmA7XG4gIGxldCBhZGRJbmQgPSBpbmQgPT4ge1xuICAgIGxldCBzID0gJycsIGkgPSAwO1xuXG4gICAgZm9yICg7aSA8IGluZDsgaSsrKSBzICs9ICcgICc7XG4gICAgcmV0dXJuIHM7XG4gIH07XG5cbiAgLy8gY29uc29sZS5jbGVhcigpO1xuICAoZnVuY3Rpb24gbG9vcCh7IGluZCwgbmFtZSwgdXNlZCwgY2hpbGRyZW4sIGxvZ3MgfSkge1xuICAgIGNvbnN0IGxvZ3NTdHIgPSBsb2dzICYmIGxvZ3MubGVuZ3RoID4gMCA/XG4gICAgICBsb2dzLm1hcCgoeyB0eXBlLCBtZXRhIH0pID0+IHtcbiAgICAgICAgcmV0dXJuIGAkeyBhZGRJbmQoaW5kKSB9ICDipLcgJHsgdHlwZSB9JHsgcGFyc2VMb2dNZXRhKG1ldGEpIH1gO1xuICAgICAgfSkuam9pbignXFxuJykgKyAnXFxuJyA6XG4gICAgICAnJztcbiAgICBjb25zdCBlbFN0ciA9IGAkeyBhZGRJbmQoaW5kKSB9PCR7IG5hbWUgfT4gKCR7IHVzZWQgfSlcXG4keyBsb2dzU3RyIH1gO1xuXG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc3RyICs9IGVsU3RyO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzdHIgKz0gZWxTdHI7XG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4gbG9vcChjaGlsZCkpO1xuICAgIH1cbiAgfSkodHJlZSk7XG4gIGNvbnNvbGUubG9nKHN0cik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluc3BlY3Rvcihwcm9jZXNzb3IpIHtcbiAgY29uc3Qgc25hcHNob3RzID0gW107XG5cbiAgZnVuY3Rpb24gc25hcHNob3QodHlwZSwgbm9kZSkge1xuICAgIHNuYXBzaG90cy5wdXNoKFtcbiAgICAgIHR5cGUsXG4gICAgICBub2RlLFxuICAgICAgcHJvY2Vzc29yLnN5c3RlbSgpLnRyZWUuZGlhZ25vc2UoKVxuICAgIF0pO1xuICAgIHByaW50U25hcHNob3RUb0NvbnNvbGUoc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXSk7XG4gIH1cblxuICBwcm9jZXNzb3Iub25Ob2RlRW50ZXIobm9kZSA9PiBzbmFwc2hvdChFTlRFUiwgbm9kZSkpO1xuICBwcm9jZXNzb3Iub25Ob2RlT3V0KG5vZGUgPT4gc25hcHNob3QoT1VULCBub2RlKSk7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUobm9kZSA9PiBzbmFwc2hvdChSRU1PVkUsIG5vZGUpKTtcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDsiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZDIodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgJSAyKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkMjsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGb2N1c0ZpZWxkIH0gZnJvbSAnLi9ET00nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDaGVja0ZvckVkaXRGaWVsZCh7IHRvZG9zIH0pIHtcbiAgcmV0dXJuIDxGb2N1c0ZpZWxkIGluZGV4PXsgdG9kb3MuZmluZEluZGV4KCh7IGVkaXRpbmcgfSkgPT4gZWRpdGluZykgfSAvPjtcbn1cbiIsImltcG9ydCB7XG4gIFRPR0dMRSxcbiAgTkVXX1RPRE8sXG4gIERFTEVURSxcbiAgRURJVCxcbiAgRURJVF9UT0RPLFxuICBDTEVBUl9DT01QTEVURURcbn0gZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQge1xuICBGSUxURVJfQUxMLFxuICBGSUxURVJfQUNUSVZFLFxuICBGSUxURVJfQ09NUExFVEVEXG59IGZyb20gJy4vJztcbmltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmNvbnN0ICQgPSAoc2VsZWN0b3IpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuY29uc3QgbGlzdCA9ICQoJy50b2RvLWxpc3QnKTtcbmNvbnN0IGhlYWRlciA9ICQoJy5oZWFkZXInKTtcblxuY29uc3QgRU5URVIgPSAxMztcbmNvbnN0IEVTQyA9IDI3O1xuXG5leHBvcnQgZnVuY3Rpb24gRmlsbENvbnRhaW5lcih7IGNoaWxkcmVuIH0pIHtcbiAgbGlzdC5pbm5lckhUTUwgPSBjaGlsZHJlbigpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIENvbnRhaW5lcih7IG9uVXNlckFjdGlvbiB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLXRvZ2dsZScpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihUT0dHTEUsIHRvZG9JbmRleCk7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1kZWxldGUnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oREVMRVRFLCB0b2RvSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElULCB0b2RvSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNvdXQnLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEVESVRfVE9ETywgeyBpbmRleDogdG9kb0luZGV4LCBsYWJlbDogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSAmJiBlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElUX1RPRE8sIHsgaW5kZXg6IHRvZG9JbmRleCwgbGFiZWw6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpICYmIGUua2V5Q29kZSA9PT0gRVNDKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElULCB0b2RvSW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLW5ldycpICYmIGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKE5FV19UT0RPLCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgIGUudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIFtdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBGb2N1c0ZpZWxkKHsgaW5kZXggfSkge1xuICBjb25zdCBlbCA9ICQoYC5lZGl0W2RhdGEtaW5kZXg9XCIkeyBpbmRleCB9XCJdYCk7XG5cbiAgaWYgKGVsKSB7XG4gICAgZWwuZm9jdXMoKTtcbiAgICBlbC5zZWxlY3Rpb25TdGFydCA9IGVsLnNlbGVjdGlvbkVuZCA9IGVsLnZhbHVlLmxlbmd0aDtcbiAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBQcm9ncmVzc0NoZWNrZXIoeyB0b2RvcyB9KSB7XG4gIGNvbnN0IGNvbXBsZXRlZCA9IHRvZG9zLmZpbHRlcigoeyBjb21wbGV0ZWQgfSkgPT4gY29tcGxldGVkKS5sZW5ndGg7XG4gIGNvbnN0IGl0ZW1zTGVmdCA9IHRvZG9zLmxlbmd0aCAtIGNvbXBsZXRlZDtcblxuICAkKCdbZGF0YS1jb3VudF0nKS5pbm5lckhUTUwgPSBgXG4gICAgPHN0cm9uZz4keyBpdGVtc0xlZnQgfTwvc3Ryb25nPiAkeyBpdGVtc0xlZnQgPiAxIHx8IGl0ZW1zTGVmdCA9PT0gMCA/ICdpdGVtcycgOiAnaXRlbScgfSBsZWZ0XG4gIGA7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZvb3Rlcih7IG9uVXNlckFjdGlvbiB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgJCgnW2RhdGEtZmlsdGVyXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWxsJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9BTEwpO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9BQ1RJVkUpO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtY29tcGxldGVkJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9DT01QTEVURUQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQoJ1tkYXRhLWNsZWFyLWNvbXBsZXRlZF0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG9uVXNlckFjdGlvbihDTEVBUl9DT01QTEVURUQpO1xuICAgIH0pO1xuICB9LCBbXSk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIEZpbHRlck9wdGlvbnNUYWJzKHsgZmlsdGVyIH0pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAkKCdbZGF0YS1hbGxdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FMTCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICAgJCgnW2RhdGEtYWN0aXZlXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9BQ1RJVkUgPyAnc2VsZWN0ZWQnIDogJycpO1xuICAgICQoJ1tkYXRhLWNvbXBsZXRlZF0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQ09NUExFVEVEID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgfSwgWyBmaWx0ZXIgXSk7XG59XG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IFRvRG8gfSBmcm9tICcuL1N0b3JlJztcblxuY29uc3QgaW5pdGlhbFZhbHVlID0gSlNPTi5zdHJpbmdpZnkoW1xuICBUb0RvKHsgbGFiZWw6ICdBY3RNTCBpcyB1c2luZyBKU1gnIH0pLFxuICBUb0RvKHsgbGFiZWw6ICdJdCBpcyBsaWtlIFJlYWN0IGJ1dCBub3QgZm9yIHJlbmRlcmluZycgfSlcbl0pO1xuXG5leHBvcnQgY29uc3QgdXNlTG9jYWxTdG9yYWdlID0gKCkgPT4ge1xuICBjb25zdCBbIGdldERhdGEgXSA9IHVzZVN0YXRlKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG9zJykgfHwgaW5pdGlhbFZhbHVlKSk7XG5cbiAgcmV0dXJuIGdldERhdGEoKTtcbn07XG5leHBvcnQgY29uc3QgUGVyc2lzdCA9ICh7IHRvZG9zIH0pID0+IHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgRmlsbENvbnRhaW5lciB9IGZyb20gJy4vRE9NJztcbmltcG9ydCB7IEZJTFRFUl9BTEwsIEZJTFRFUl9BQ1RJVkUsIEZJTFRFUl9DT01QTEVURUQgfSBmcm9tICcuLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlbmRlcmVyKHsgdG9kb3MsIGZpbHRlciB9KSB7XG4gIHJldHVybiAoXG4gICAgPEZpbGxDb250YWluZXI+XG4gICAgICB7XG4gICAgICAgICgpID0+IHRvZG9zXG4gICAgICAgIC5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IHtcbiAgICAgICAgICBpZiAoZmlsdGVyID09PSBGSUxURVJfQUxMKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoZmlsdGVyID09PSBGSUxURVJfQUNUSVZFKSByZXR1cm4gIWNvbXBsZXRlZDtcbiAgICAgICAgICBpZiAoZmlsdGVyID09PSBGSUxURVJfQ09NUExFVEVEKSByZXR1cm4gY29tcGxldGVkO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkubWFwKCh0b2RvLCBpKSA9PiB7XG4gICAgICAgICAgY29uc3QgbGlDbGFzcyA9IHRvZG8uZWRpdGluZyA/ICdlZGl0aW5nJyA6ICh0b2RvLmNvbXBsZXRlZCA/ICdjb21wbGV0ZWQnIDogJycpO1xuXG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxsaSBjbGFzcz0nJHsgbGlDbGFzcyB9Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZVxuICAgICAgICAgICAgICAgICAgJHsgdG9kby5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJyB9PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLWluZGV4PVwiJHsgaSB9XCIgZGF0YS1sYWJlbD4keyB0b2RvLmxhYmVsIH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGVzdHJveVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtZGVsZXRlPjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWRpdFwiIHZhbHVlPVwiJHsgdG9kby5sYWJlbCB9XCIgZGF0YS1pbmRleD1cIiR7IGkgfVwiIGRhdGEtZWRpdD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgYDtcbiAgICAgICAgfSkuam9pbignJylcbiAgICAgIH1cbiAgICA8L0ZpbGxDb250YWluZXI+XG4gICk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgdXNlUmVkdWNlciwgdXNlUHViU3ViLCB1c2VFZmZlY3QgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5leHBvcnQgY29uc3QgVE9HR0xFID0gJ1RPR0dMRSc7XG5leHBvcnQgY29uc3QgTkVXX1RPRE8gPSAnTkVXX1RPRE8nO1xuZXhwb3J0IGNvbnN0IERFTEVURSA9ICdERUxFVEUnO1xuZXhwb3J0IGNvbnN0IEVESVQgPSAnRURJVCc7XG5leHBvcnQgY29uc3QgRURJVF9UT0RPID0gJ0VESVRfVE9ETyc7XG5leHBvcnQgY29uc3QgQ0xFQVJfQ09NUExFVEVEID0gJ0NMRUFSX0NPTVBMRVRFRCc7XG5cbmNvbnN0IHRvZ2dsZSA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IFRPR0dMRSwgdG9kb0luZGV4IH0pO1xuY29uc3QgZGVsZXRlVG9kbyA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IERFTEVURSwgdG9kb0luZGV4IH0pO1xuY29uc3QgbmV3VG9kbyA9IChsYWJlbCkgPT4gKHsgdHlwZTogTkVXX1RPRE8sIGxhYmVsIH0pO1xuY29uc3QgZWRpdCA9ICh0b2RvSW5kZXgpID0+ICh7IHR5cGU6IEVESVQsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGVkaXRUb0RvID0gKHsgaW5kZXgsIGxhYmVsIH0pID0+ICh7IHR5cGU6IEVESVRfVE9ETywgaW5kZXgsIGxhYmVsIH0pO1xuY29uc3QgY2xlYXJDb21wbGV0ZWQgPSAoKSA9PiAoeyB0eXBlOiBDTEVBUl9DT01QTEVURUQgfSk7XG5cbmV4cG9ydCBjb25zdCBUb0RvID0gKHsgbGFiZWwgfSkgPT4gKHsgbGFiZWwsIGNvbXBsZXRlZDogZmFsc2UsIGVkaXRpbmc6IGZhbHNlIH0pO1xuXG5jb25zdCByZWR1Y2VyID0gZnVuY3Rpb24gKHRvZG9zLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgVE9HR0xFOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24udG9kb0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBjb21wbGV0ZWQ6ICF0b2RvLmNvbXBsZXRlZFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICB9KTtcbiAgICBjYXNlIEVESVQ6XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi50b2RvSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGVkaXRpbmc6ICF0b2RvLmVkaXRpbmdcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICBlZGl0aW5nOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgY2FzZSBFRElUX1RPRE86XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi5pbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgbGFiZWw6IGFjdGlvbi5sYWJlbCxcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgIH0pO1xuICAgIGNhc2UgTkVXX1RPRE86XG4gICAgICByZXR1cm4gWyAuLi50b2RvcywgVG9Ebyh7IGxhYmVsOiBhY3Rpb24ubGFiZWwgfSkgXTtcbiAgICBjYXNlIERFTEVURTpcbiAgICAgIHJldHVybiB0b2Rvcy5maWx0ZXIoKHRvZG8sIGluZGV4KSA9PiBpbmRleCAhPT0gYWN0aW9uLnRvZG9JbmRleCk7XG4gICAgY2FzZSBDTEVBUl9DT01QTEVURUQ6XG4gICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKCh0b2RvKSA9PiAhdG9kby5jb21wbGV0ZWQpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdG9kb3M7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0b3JlKHsgaW5pdGlhbFZhbHVlLCBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFsgdG9kb3MsIGRpc3BhdGNoIF0gPSB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRpYWxWYWx1ZSk7XG4gIGNvbnN0IHsgc3Vic2NyaWJlIH0gPSB1c2VQdWJTdWIoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHN1YnNjcmliZShUT0dHTEUsICh0b2RvSW5kZXgpID0+IGRpc3BhdGNoKHRvZ2dsZSh0b2RvSW5kZXgpKSk7XG4gICAgc3Vic2NyaWJlKE5FV19UT0RPLCAobGFiZWwpID0+IGRpc3BhdGNoKG5ld1RvZG8obGFiZWwpKSk7XG4gICAgc3Vic2NyaWJlKERFTEVURSwgKHRvZG9JbmRleCkgPT4gZGlzcGF0Y2goZGVsZXRlVG9kbyh0b2RvSW5kZXgpKSk7XG4gICAgc3Vic2NyaWJlKEVESVQsIChsYWJlbCkgPT4gZGlzcGF0Y2goZWRpdChsYWJlbCkpKTtcbiAgICBzdWJzY3JpYmUoRURJVF9UT0RPLCAocGF5bG9hZCkgPT4gZGlzcGF0Y2goZWRpdFRvRG8ocGF5bG9hZCkpKTtcbiAgICBzdWJzY3JpYmUoQ0xFQVJfQ09NUExFVEVELCAoKSA9PiBkaXNwYXRjaChjbGVhckNvbXBsZXRlZCgpKSk7XG4gIH0sIFtdKTtcblxuICBjaGlsZHJlbih7IHRvZG9zOiB0b2RvcygpIH0pO1xufVxuIiwiLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSwgcnVuLCBGcmFnbWVudCwgdXNlUHViU3ViLCB1c2VTdGF0ZSwgdXNlRWZmZWN0LCBwcm9jZXNzb3IgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuaW1wb3J0IGluc3BlY3RvciBmcm9tICcuLi8uLi8uLi9wYWNrYWdlcy9pbnNwZWN0b3InO1xuXG5pbnNwZWN0b3IocHJvY2Vzc29yKTtcblxuaW1wb3J0IFN0b3JlIGZyb20gJy4vU3RvcmUnO1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IENoZWNrRm9yRWRpdEZpZWxkIGZyb20gJy4vQ2hlY2tGb3JFZGl0RmllbGQnO1xuaW1wb3J0IHsgUHJvZ3Jlc3NDaGVja2VyLCBGaWx0ZXJPcHRpb25zVGFicywgQ29udGFpbmVyLCBGb290ZXIgfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyB1c2VMb2NhbFN0b3JhZ2UsIFBlcnNpc3QgfSBmcm9tICcuL1BlcnNpc3QnO1xuXG5leHBvcnQgY29uc3QgRklMVEVSX0FMTCA9ICdGSUxURVJfQUxMJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQUNUSVZFID0gJ0ZJTFRFUl9BQ1RJVkUnO1xuZXhwb3J0IGNvbnN0IEZJTFRFUl9DT01QTEVURUQgPSAnRklMVEVSX0NPTVBMRVRFRCc7XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgaW5pdGlhbFZhbHVlID0gdXNlTG9jYWxTdG9yYWdlKCk7XG4gIGNvbnN0IHsgcHVibGlzaCwgc3Vic2NyaWJlIH0gPSB1c2VQdWJTdWIoKTtcbiAgY29uc3QgWyBmaWx0ZXIsIHNldEZpbHRlciBdID0gdXNlU3RhdGUoRklMVEVSX0FMTCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzdWJzY3JpYmUoRklMVEVSX0FMTCwgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9BTEwpKTtcbiAgICBzdWJzY3JpYmUoRklMVEVSX0FDVElWRSwgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9BQ1RJVkUpKTtcbiAgICBzdWJzY3JpYmUoRklMVEVSX0NPTVBMRVRFRCwgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9DT01QTEVURUQpKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPENvbnRhaW5lciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0gLz5cbiAgICAgIDxGb290ZXIgb25Vc2VyQWN0aW9uPXsgcHVibGlzaCB9Lz5cbiAgICAgIDxTdG9yZSBpbml0aWFsVmFsdWU9eyBpbml0aWFsVmFsdWUgfT5cbiAgICAgICAgPEZpbHRlck9wdGlvbnNUYWJzIGZpbHRlcj17IGZpbHRlcigpIH0gLz5cbiAgICAgICAgPFJlbmRlcmVyIGZpbHRlcj17IGZpbHRlcigpIH0vPlxuICAgICAgICA8Q2hlY2tGb3JFZGl0RmllbGQgLz5cbiAgICAgICAgPFByb2dyZXNzQ2hlY2tlciAvPlxuICAgICAgICA8UGVyc2lzdCAvPlxuICAgICAgPC9TdG9yZT5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxucnVuKDxBcHAgLz4pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==