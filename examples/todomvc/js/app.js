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


const addInd = ind => {
  return `margin-left: ${ind * 20}px;`;
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

const STYLES = {
  default: ind => 'display: inline-block;' + addInd(ind),
  hook: ind => 'color: #999;' + addInd(ind),
  current: ind => 'font-weight: bold; border: solid 1px #999; border-radius: 2px; padding: 1px 0;' + addInd(ind),
  entrance: ind => 'color: #FFF;background: #4d4d4d;' + addInd(ind)
};

function printSnapshotToConsole(snapshot) {
  const [type, node, tree] = snapshot;
  let printLines = [[`→ ${type} <${node.element.name}>`, STYLES.entrance(0)]];
  printLines = printLines.concat(function loop({
    id,
    ind,
    name,
    used,
    children,
    logs
  }) {
    let lines = [];
    lines.push([`<${name}${children.length === 0 ? ' /' : ''}> (${used})`, id === node.element.id ? STYLES.current(ind) : STYLES.default(ind)]);

    if (logs && logs.length > 0) {
      lines = lines.concat(logs.map(({
        type,
        meta
      }) => {
        return [`⤷ ${type}${parseLogMeta(meta)}`, STYLES.hook(ind)];
      }));
    }

    if (children.length > 0) {
      children.map(child => {
        lines = lines.concat(loop(child));
      });
      lines.push([`</${name}>`, id === node.element.id ? STYLES.current(ind) : STYLES.default(ind)]);
    }

    return lines;
  }(tree));
  console.clear();
  printLines.forEach(line => {
    console.log(`%c${line[0]}`, line[1]);
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1F1ZXVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUHViU3ViLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVN0YXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi91dGlscy9pc0FjdE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2hlbHBlcnMvc2FuaXRpemUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9DaXJjdWxhckpTT04uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9TZXJpYWxpemVFcnJvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BlcnNpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJnZXRGdW5jTmFtZSIsImZ1bmMiLCJuYW1lIiwicmVzdWx0IiwiZXhlYyIsInRvU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJFcnJvciIsIl9fYWN0bWwiLCJfX3VzZWQiLCJfX3J1bm5pbmciLCJpZCIsImluaXRpYWxpemUiLCJ1c2VkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibWVyZ2VQcm9wcyIsIm5ld1Byb3BzIiwiYXNzaWduIiwiaXNSdW5uaW5nIiwiZW50ZXIiLCJjb25zdW1lIiwib3V0IiwiZGVmYXVsdCIsImNyZWF0ZUNvbnRleHRGYWN0b3J5IiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwia2V5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiQ09OVEVYVF9LRVkiLCJQVUJMSUNfQ09OVEVYVF9LRVkiLCJpZHMiLCJnZXRJZCIsInJlc29sdmVDb250ZXh0Iiwibm9kZSIsInN0YWNrIiwicHVzaCIsImVsZW1lbnQiLCJwYXJlbnQiLCJjb25zb2xlIiwid2FybiIsIm1hcCIsImpvaW4iLCJwcm9jZXNzb3IiLCJjcmVhdGVDb250ZXh0IiwiaW5pdGlhbFZhbHVlIiwiX3JlZjMiLCJQcm92aWRlciIsIl9yZWYiLCJDb25zdW1lciIsIl9yZWYyIiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3VzZUVmZmVjdCIsIl91c2VFZmZlY3QyIiwiX1F1ZXVlIiwiX1F1ZXVlMiIsIl9fZXNNb2R1bGUiLCJDSElMRFJFTiIsIkNPTlNVTUUiLCJQUk9DRVNTX1JFU1VMVCIsIlJFVFVSTkVEX0VMRU1FTlQiLCJDSElMRCIsImlzR2VuZXJhdG9yIiwiaXNQcm9taXNlIiwiY3JlYXRlQ2hpbGRyZW5GdW5jIiwicHJvY2Vzc05vZGUiLCJmIiwiX2FyZ3VtZW50cyIsInF1ZXVlSXRlbXNUb0FkZCIsInJlc3VsdHMiLCJjaGlsZHJlblF1ZXVlIiwiX2xvb3AiLCJpIiwiX2NoaWxkcmVuJGkiLCJhcHBseSIsImFkZENoaWxkTm9kZSIsImZ1bmNSZXN1bHQiLCJyZXZlcnNlIiwiZm9yRWFjaCIsInByZXBlbmRJdGVtIiwiciIsInByb2Nlc3MiLCJvbkRvbmUiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJyZXJ1biIsInF1ZXVlIiwiYWRkIiwiY29uc3VtcHRpb24iLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwiZ2VuZXJhdG9yRG9uZSIsImdlblJlc3VsdCIsIml0ZXJhdGUiLCJuZXh0IiwiZG9uZSIsInJlcyIsInRoZW4iLCJfcmVzIiwicnVuIiwicm9vdE5vZGUiLCJyZXNvbHZlUm9vdCIsIm9uTm9kZUVudGVyIiwiY2FsbGJhY2siLCJhZGROb2RlRW50ZXJDYWxsYmFjayIsIm9uTm9kZU91dCIsImFkZE5vZGVPdXRDYWxsYmFjayIsIm9uTm9kZVJlbW92ZSIsInN5c3RlbSIsInJlc2V0IiwiY2xlYXIiLCJjcmVhdGVRdWV1ZSIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImFycjIiLCJmcm9tIiwiTE9HUyIsImxvZyIsIl9jb25zb2xlIiwiY3JlYXRlSXRlbSIsInR5cGUiLCJjb250ZXh0IiwiaXRlbXMiLCJhc3luYyIsInJ1bm5pbmciLCJyZWxlYXNlIiwiY29uY2F0IiwibGFzdFJlc3VsdCIsIl90aGlzIiwiaXRlbSIsInNoaWZ0IiwiYXN5bmNSZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZ2V0UmVzdWx0IiwicmVqZWN0IiwiX2V4dGVuZHMiLCJ0YXJnZXQiLCJzb3VyY2UiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJUcmVlIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwia2V5cyIsImluZGV4T2YiLCJfb25Ob2RlUmVtb3ZlIiwicm9vdCIsImNyZWF0ZU5ld05vZGUiLCJ1c2VTYW1lTm9kZSIsIm5ld0VsZW1lbnQiLCJ0cmVlRGlmZiIsIm9sZEVsZW1lbnQiLCJjdXJzb3IiLCJjIiwiX3RoaXMyIiwic3BsaWNlIiwicmVtb3ZlZE5vZGUiLCJfX0RFVl9fIiwibG9ncyIsIl90aGlzMyIsImNoaWxkTm9kZSIsIm5ld0NoaWxkTm9kZSIsIm1ldGEiLCJnZXROdW1PZkVsZW1lbnRzIiwiZGlhZ25vc2UiLCJsb29wT3ZlciIsImluZCIsInJlc3QiLCJjaGlsZCIsIl9pc1ZhbGlkSG9va0NvbnRleHQiLCJfaXNWYWxpZEhvb2tDb250ZXh0MiIsIl9Db250ZXh0IiwiY3JlYXRlVXNlRWxlbWVudEhvb2siLCJDb250ZXh0IiwiX2Zhc3REZWVwRXF1YWwiLCJfZmFzdERlZXBFcXVhbDIiLCJTdG9yYWdlIiwiZWxlbWVudHMiLCJnZXQiLCJlZmZlY3RzIiwiY29uc3VtZXIiLCJjbGVhblVwIiwiY3JlYXRlRWZmZWN0IiwiZGVwcyIsInVwZGF0ZUVmZmVjdCIsImVmZmVjdCIsIm9sZERlcHMiLCJkZXBzRXF1YWwiLCJuZXdEZXBzIiwicmVzb2x2ZUVmZmVjdCIsImFyZUVxdWFsIiwiY3JlYXRlVXNlRWZmZWN0SG9vayIsInN0b3JhZ2UiLCJpbmRleCIsImNyZWF0ZVVzZVB1YlN1Ykhvb2siLCJzdWJzY3JpYmVycyIsInN1YnNjcmliZSIsInB1Ymxpc2giLCJwYXlsb2FkIiwic2NvcGVkRWxlbWVudCIsImVsIiwic3Vic2NyaWJlRnVuYyIsIl9sZW4iLCJwYXJhbXMiLCJfa2V5IiwicHVibGlzaEZ1bmMiLCJfbGVuMiIsIl9rZXkyIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsIl9pIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfcyIsImVyciIsIlR5cGVFcnJvciIsImNyZWF0ZVVzZVJlZHVjZXJIb29rIiwiY3JlYXRlRGlzcGF0Y2hFbGVtZW50IiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJwcm9wc1RvQWN0aW9uIiwidXNlU3RhdGUiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsImNyZWF0ZVVzZVN0YXRlSG9vayIsInN0YXRlcyIsIm5ld1N0YXRlIiwiaXNWYWxpZEhvb2tDb250ZXh0IiwiY3JlYXRlUnVudGltZSIsIl9Qcm9jZXNzb3IiLCJfUHJvY2Vzc29yMiIsIl9BY3RFbGVtZW50IiwiX0FjdEVsZW1lbnQyIiwiX3VzZUVsZW1lbnQiLCJfdXNlRWxlbWVudDIiLCJfdXNlUmVkdWNlciIsIl91c2VSZWR1Y2VyMiIsIl91c2VDb250ZXh0IiwiX3VzZUNvbnRleHQyIiwiX0NvbnRleHQyIiwiQSIsIkZyYWdtZW50IiwidXNlRWxlbWVudCIsInVzZVB1YlN1YiIsInVzZVJlZHVjZXIiLCJ1c2VFZmZlY3QiLCJ1c2VDb250ZXh0IiwicnVudGltZSIsIm1vZHVsZSIsImlzQWN0TUxFbGVtZW50Iiwic3RyaW5naWZ5IiwiQ2lyY3VsYXJKU09OIiwic2FuaXRpemUiLCJzb21ldGhpbmciLCJzaG93RXJyb3JJbkNvbnNvbGUiLCJKU09OIiwicGFyc2UiLCJTZXJpYWxpemVFcnJvciIsInNwZWNpYWxDaGFyIiwic2FmZVNwZWNpYWxDaGFyIiwiY2hhckNvZGVBdCIsInNsaWNlIiwiZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciIsInNwZWNpYWxDaGFyUkciLCJSZWdFeHAiLCJzYWZlU3BlY2lhbENoYXJSRyIsInNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHIiwidiIsIiRTdHJpbmciLCJTdHJpbmciLCJnZW5lcmF0ZVJlcGxhY2VyIiwicmVwbGFjZXIiLCJyZXNvbHZlIiwiaW5zcGVjdCIsInBhdGgiLCJhbGwiLCJzZWVuIiwibWFwcCIsImxhc3QiLCJsdmwiLCJmbiIsInJlcGxhY2UiLCJyZXRyaWV2ZUZyb21QYXRoIiwiY3VycmVudCIsImdlbmVyYXRlUmV2aXZlciIsInJldml2ZXIiLCJpc1N0cmluZyIsImNoYXJBdCIsInJlZ2VuZXJhdGUiLCJyZWdlbmVyYXRlQXJyYXkiLCJyZXRyaWV2ZSIsInJlZ2VuZXJhdGVPYmplY3QiLCJzcGxpdCIsInN0cmluZ2lmeVJlY3Vyc2lvbiIsInNwYWNlIiwiZG9Ob3RSZXNvbHZlIiwicGFyc2VSZWN1cnNpb24iLCJ0ZXh0IiwiZGVzdHJveUNpcmN1bGFyIiwidG8iLCJtZXNzYWdlIiwiRU5URVIiLCJPVVQiLCJSRU1PVkUiLCJhZGRJbmQiLCJwYXJzZUxvZ01ldGEiLCJTVFlMRVMiLCJob29rIiwiZW50cmFuY2UiLCJwcmludFNuYXBzaG90VG9Db25zb2xlIiwic25hcHNob3QiLCJwcmludExpbmVzIiwibG9vcCIsImxpbmVzIiwibGluZSIsImluc3BlY3RvciIsInNuYXBzaG90cyIsIkNoZWNrRm9yRWRpdEZpZWxkIiwidG9kb3MiLCJmaW5kSW5kZXgiLCJlZGl0aW5nIiwiJCIsInNlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibGlzdCIsImhlYWRlciIsIkVTQyIsIkZpbGxDb250YWluZXIiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJvblVzZXJBY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRvZG9JbmRleCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiVE9HR0xFIiwiREVMRVRFIiwiRURJVCIsIkVESVRfVE9ETyIsImxhYmVsIiwia2V5Q29kZSIsIk5FV19UT0RPIiwiRm9jdXNGaWVsZCIsImZvY3VzIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJQcm9ncmVzc0NoZWNrZXIiLCJjb21wbGV0ZWQiLCJmaWx0ZXIiLCJpdGVtc0xlZnQiLCJGb290ZXIiLCJGSUxURVJfQUxMIiwiRklMVEVSX0FDVElWRSIsIkZJTFRFUl9DT01QTEVURUQiLCJDTEVBUl9DT01QTEVURUQiLCJGaWx0ZXJPcHRpb25zVGFicyIsInNldEF0dHJpYnV0ZSIsIlRvRG8iLCJ1c2VMb2NhbFN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ2V0RGF0YSIsIlBlcnNpc3QiLCJzZXRJdGVtIiwiUmVuZGVyZXIiLCJ0b2RvIiwibGlDbGFzcyIsInRvZ2dsZSIsImRlbGV0ZVRvZG8iLCJuZXdUb2RvIiwiZWRpdCIsImVkaXRUb0RvIiwiY2xlYXJDb21wbGV0ZWQiLCJTdG9yZSIsIkFwcCIsInNldEZpbHRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7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SyxhQUFTLENBQUNzSyxnQkFBRCxFQUFtQjtBQUFBLGFBQU1zQixTQUFTLENBQUN0QixnQkFBRCxDQUFmO0FBQUEsS0FBbkIsQ0FBVDtBQUNELEdBSlEsRUFJTixFQUpNLENBQVQ7QUFNQSxTQUNFLCtDQUFDLDZDQUFELFFBQ0UsK0NBQUMsOENBQUQ7QUFBVyxnQkFBWSxFQUFHcks7QUFBMUIsSUFERixFQUVFLCtDQUFDLDJDQUFEO0FBQVEsZ0JBQVksRUFBR0E7QUFBdkIsSUFGRixFQUdFLCtDQUFDLDhDQUFEO0FBQU8sZ0JBQVksRUFBR3JLO0FBQXRCLEtBQ0UsK0NBQUMsc0RBQUQ7QUFBbUIsVUFBTSxFQUFHcVUsTUFBTTtBQUFsQyxJQURGLEVBRUUsK0NBQUMsaURBQUQ7QUFBVSxVQUFNLEVBQUdBLE1BQU07QUFBekIsSUFGRixFQUdFLCtDQUFDLDBEQUFELE9BSEYsRUFJRSwrQ0FBQyxvREFBRCxPQUpGLEVBS0UsK0NBQUMsZ0RBQUQsT0FMRixDQUhGLENBREY7QUFhRDs7QUFBQTtBQUVEclEsZ0RBQUcsQ0FBQywrQ0FBQyxHQUFELE9BQUQsQ0FBSCxDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5mdW5jdGlvbiBnZXRGdW5jTmFtZShmdW5jKSB7XG4gIGlmIChmdW5jLm5hbWUpIHJldHVybiBmdW5jLm5hbWU7XG4gIHZhciByZXN1bHQgPSAvXmZ1bmN0aW9uXFxzKyhbXFx3XFwkXSspXFxzKlxcKC8uZXhlYyhmdW5jLnRvU3RyaW5nKCkpO1xuXG4gIHJldHVybiByZXN1bHQgPyByZXN1bHRbMV0gOiAndW5rbm93bic7XG59O1xuXG52YXIgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZnVuYywgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RzIGEgZnVuY3Rpb24uIFwiJyArIGZ1bmMgKyAnXCIgZ2l2ZW4gaW5zdGVhZC4nKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIF9fYWN0bWw6IHRydWUsXG4gICAgX191c2VkOiAwLFxuICAgIF9fcnVubmluZzogZmFsc2UsXG4gICAgaWQ6IG51bGwsXG4gICAgcHJvcHM6IHByb3BzLFxuICAgIG5hbWU6IGdldEZ1bmNOYW1lKGZ1bmMpLFxuICAgIGNoaWxkcmVuOiBjaGlsZHJlbixcbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbiBpbml0aWFsaXplKGlkKSB7XG4gICAgICB2YXIgdXNlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogMDtcblxuICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgdGhpcy5fX3VzZWQgPSB1c2VkO1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSBmYWxzZTtcbiAgICB9LFxuICAgIG1lcmdlUHJvcHM6IGZ1bmN0aW9uIG1lcmdlUHJvcHMobmV3UHJvcHMpIHtcbiAgICAgIHRoaXMucHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCBuZXdQcm9wcyk7XG4gICAgfSxcbiAgICB1c2VkOiBmdW5jdGlvbiB1c2VkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX191c2VkO1xuICAgIH0sXG4gICAgaXNSdW5uaW5nOiBmdW5jdGlvbiBpc1J1bm5pbmcoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fX3J1bm5pbmc7XG4gICAgfSxcbiAgICBlbnRlcjogZnVuY3Rpb24gZW50ZXIoKSB7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IHRydWU7XG4gICAgfSxcbiAgICBjb25zdW1lOiBmdW5jdGlvbiBjb25zdW1lKCkge1xuICAgICAgcmV0dXJuIGZ1bmModGhpcy5wcm9wcyk7XG4gICAgfSxcbiAgICBvdXQ6IGZ1bmN0aW9uIG91dCgpIHtcbiAgICAgIHRoaXMuX191c2VkICs9IDE7XG4gICAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZUVsZW1lbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlQ29udGV4dEZhY3Rvcnk7XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHsgaWYgKGtleSBpbiBvYmopIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTsgfSBlbHNlIHsgb2JqW2tleV0gPSB2YWx1ZTsgfSByZXR1cm4gb2JqOyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIGNvbnNpc3RlbnQtcmV0dXJuICovXG52YXIgQ09OVEVYVF9LRVkgPSAnX19DT05URVhUX0tFWV9fJztcblxudmFyIFBVQkxJQ19DT05URVhUX0tFWSA9IGV4cG9ydHMuUFVCTElDX0NPTlRFWFRfS0VZID0gJ19fUFVCTElDX0NPTlRFWFRfS0VZX18nO1xuXG52YXIgaWRzID0gMDtcblxuZnVuY3Rpb24gZ2V0SWQoKSB7XG4gIHJldHVybiAnYycgKyArK2lkcztcbn07XG5mdW5jdGlvbiByZXNvbHZlQ29udGV4dChub2RlLCBpZCkge1xuICB2YXIgc3RhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IFtdO1xuXG4gIHN0YWNrLnB1c2gobm9kZS5lbGVtZW50Lm5hbWUpO1xuICBpZiAobm9kZVtDT05URVhUX0tFWV0gJiYgaWQgaW4gbm9kZVtDT05URVhUX0tFWV0pIHtcbiAgICByZXR1cm4gbm9kZVtDT05URVhUX0tFWV1baWRdO1xuICB9IGVsc2UgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgcmV0dXJuIHJlc29sdmVDb250ZXh0KG5vZGUucGFyZW50LCBpZCwgc3RhY2spO1xuICB9XG4gIGNvbnNvbGUud2FybignQSBjb250ZXh0IGNvbnN1bWVyIGlzIHVzZWQgd2l0aCBubyBwcm92aWRlci5cXG4gIFN0YWNrOlxcbicgKyBzdGFjay5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gJyAgICA8JyArIG5hbWUgKyAnPic7XG4gIH0pLmpvaW4oJ1xcbicpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dEZhY3RvcnkocHJvY2Vzc29yKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGVDb250ZXh0KGluaXRpYWxWYWx1ZSkge1xuICAgIHZhciBfcmVmMztcblxuICAgIHZhciBpZCA9IGdldElkKCk7XG5cbiAgICB2YXIgUHJvdmlkZXIgPSBmdW5jdGlvbiBQcm92aWRlcihfcmVmKSB7XG4gICAgICB2YXIgdmFsdWUgPSBfcmVmLnZhbHVlLFxuICAgICAgICAgIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbjtcblxuICAgICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgICBpZiAoIW5vZGVbQ09OVEVYVF9LRVldKSB7XG4gICAgICAgIG5vZGVbQ09OVEVYVF9LRVldID0ge307XG4gICAgICB9XG4gICAgICBub2RlW0NPTlRFWFRfS0VZXVtpZF0gPSB2YWx1ZTtcblxuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH07XG4gICAgdmFyIENvbnN1bWVyID0gZnVuY3Rpb24gQ29uc3VtZXIoX3JlZjIpIHtcbiAgICAgIHZhciBjaGlsZHJlbiA9IF9yZWYyLmNoaWxkcmVuO1xuXG4gICAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICAgIGNoaWxkcmVuKHJlc29sdmVDb250ZXh0KG5vZGUsIGlkKSB8fCBpbml0aWFsVmFsdWUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gX3JlZjMgPSB7fSwgX2RlZmluZVByb3BlcnR5KF9yZWYzLCBQVUJMSUNfQ09OVEVYVF9LRVksIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgICAgcmV0dXJuIHJlc29sdmVDb250ZXh0KG5vZGUsIGlkKSB8fCBpbml0aWFsVmFsdWU7XG4gICAgfSksIF9kZWZpbmVQcm9wZXJ0eShfcmVmMywgJ1Byb3ZpZGVyJywgUHJvdmlkZXIpLCBfZGVmaW5lUHJvcGVydHkoX3JlZjMsICdDb25zdW1lcicsIENvbnN1bWVyKSwgX3JlZjM7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVByb2Nlc3NvcjtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfVHJlZSA9IHJlcXVpcmUoJy4vVHJlZScpO1xuXG52YXIgX1RyZWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVHJlZSk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlRWZmZWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFZmZlY3QnKTtcblxudmFyIF91c2VFZmZlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWZmZWN0KTtcblxudmFyIF9RdWV1ZSA9IHJlcXVpcmUoJy4vUXVldWUnKTtcblxudmFyIF9RdWV1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9RdWV1ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBjb25zaXN0ZW50LXJldHVybiAqL1xudmFyIENISUxEUkVOID0gJ19fQUNUTUxfQ0hJTERSRU5fXyc7XG5cbnZhciBDT05TVU1FID0gJ0NPTlNVTUUnO1xudmFyIFBST0NFU1NfUkVTVUxUID0gJ1BST0NFU1NfUkVTVUxUJztcbnZhciBSRVRVUk5FRF9FTEVNRU5UID0gJ1JFVFVSTkVEX0VMRU1FTlQnO1xudmFyIENISUxEID0gJ0NISUxEJztcblxudmFyIGlzR2VuZXJhdG9yID0gZnVuY3Rpb24gaXNHZW5lcmF0b3Iob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsnbmV4dCddID09PSAnZnVuY3Rpb24nO1xufTtcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsndGhlbiddID09PSAnZnVuY3Rpb24nO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hpbGRyZW5GdW5jKG5vZGUsIHByb2Nlc3NOb2RlKSB7XG4gIHZhciBmID0gZnVuY3Rpb24gZigpIHtcbiAgICB2YXIgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmVsZW1lbnQuY2hpbGRyZW47XG5cblxuICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgcXVldWVJdGVtc1RvQWRkID0gW107XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgdmFyIGNoaWxkcmVuUXVldWUgPSAoMCwgX1F1ZXVlMi5kZWZhdWx0KSgnICAnICsgbm9kZS5lbGVtZW50Lm5hbWUgKyAnOmNoaWxkcmVuJyk7XG5cbiAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGkpIHtcbiAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGNoaWxkcmVuW2ldKSkge1xuICAgICAgICAgIHZhciBfY2hpbGRyZW4kaTtcblxuICAgICAgICAgIChfY2hpbGRyZW4kaSA9IGNoaWxkcmVuW2ldKS5tZXJnZVByb3BzLmFwcGx5KF9jaGlsZHJlbiRpLCBfYXJndW1lbnRzKTtcbiAgICAgICAgICBxdWV1ZUl0ZW1zVG9BZGQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoY2hpbGRyZW5baV0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2hpbGRyZW5baV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YXIgZnVuY1Jlc3VsdCA9IGNoaWxkcmVuW2ldLmFwcGx5KGNoaWxkcmVuLCBfYXJndW1lbnRzKTtcblxuICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShmdW5jUmVzdWx0KSkge1xuICAgICAgICAgICAgcXVldWVJdGVtc1RvQWRkLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZnVuY1Jlc3VsdCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChmdW5jUmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBfbG9vcChpKTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlSXRlbXNUb0FkZC5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICBjaGlsZHJlblF1ZXVlLnByZXBlbmRJdGVtKENISUxELCBmdW5jLCBmdW5jdGlvbiAocikge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzLnB1c2gocik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjaGlsZHJlblF1ZXVlLnByb2Nlc3MoKTtcbiAgICAgIHJldHVybiBjaGlsZHJlblF1ZXVlLm9uRG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGZbQ0hJTERSRU5dID0gdHJ1ZTtcbiAgcmV0dXJuIGY7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2Nlc3NvcigpIHtcbiAgdmFyIHRyZWUgPSAoMCwgX1RyZWUyLmRlZmF1bHQpKCk7XG4gIHZhciBjdXJyZW50Tm9kZSA9IG51bGw7XG5cbiAgdmFyIHByb2Nlc3NOb2RlID0gZnVuY3Rpb24gcHJvY2Vzc05vZGUobm9kZSkge1xuICAgIGN1cnJlbnROb2RlID0gbm9kZTtcbiAgICBub2RlLmVudGVyKCk7XG4gICAgbm9kZS5yZXJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlKTtcbiAgICB9O1xuICAgIG5vZGUuZWxlbWVudC5tZXJnZVByb3BzKHtcbiAgICAgIGNoaWxkcmVuOiBjcmVhdGVDaGlsZHJlbkZ1bmMobm9kZSwgcHJvY2Vzc05vZGUpXG4gICAgfSk7XG5cbiAgICB2YXIgcmVzdWx0cyA9IHt9O1xuICAgIHZhciBxdWV1ZSA9ICgwLCBfUXVldWUyLmRlZmF1bHQpKCcgJyArIG5vZGUuZWxlbWVudC5uYW1lKTtcblxuICAgIC8vIENPTlNVTUVcbiAgICBxdWV1ZS5hZGQoQ09OU1VNRSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudC5jb25zdW1lKCk7XG4gICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdHNbQ09OU1VNRV0gPSByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvLyBQUk9DRVNTX1JFU1VMVFxuICAgIHF1ZXVlLmFkZChQUk9DRVNTX1JFU1VMVCwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnN1bXB0aW9uID0gcmVzdWx0c1tDT05TVU1FXTtcblxuICAgICAgLy8gQWN0TUwgZWxlbWVudFxuICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGNvbnN1bXB0aW9uKSkge1xuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGNvbnN1bXB0aW9uKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdG9yXG4gICAgICB9IGVsc2UgaWYgKGlzR2VuZXJhdG9yKGNvbnN1bXB0aW9uKSkge1xuICAgICAgICB2YXIgZ2VuZXJhdG9yID0gY29uc3VtcHRpb247XG5cbiAgICAgICAgcXVldWUucHJlcGVuZEl0ZW0oUkVUVVJORURfRUxFTUVOVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZ2VuZXJhdG9yRG9uZSkge1xuICAgICAgICAgICAgdmFyIGdlblJlc3VsdCA9IHZvaWQgMDtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGUodmFsdWUpIHtcbiAgICAgICAgICAgICAgZ2VuUmVzdWx0ID0gZ2VuZXJhdG9yLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoIWdlblJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIHZhciByZXMgPSBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShnZW5SZXN1bHQudmFsdWUpKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGUocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZShyZXMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZXMgPSBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShnZW5SZXN1bHQudmFsdWUpKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShfcmVzKSkge1xuICAgICAgICAgICAgICAgICAgICBfcmVzLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhdG9yRG9uZShyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0b3JEb25lKF9yZXMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBnZW5lcmF0b3JEb25lKGdlblJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoaWxkcmVuXG4gICAgICB9IGVsc2UgaWYgKGNvbnN1bXB0aW9uICYmIGNvbnN1bXB0aW9uW0NISUxEUkVOXSkge1xuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bXB0aW9uKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0ICYmIHJlc3VsdC5sZW5ndGggPT09IDEgPyByZXN1bHRbMF0gOiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUnVubmluZyB0aGUgcXVldWVcbiAgICBxdWV1ZS5wcm9jZXNzKCk7XG5cbiAgICAvLyBHZXR0aW5nIHRoZSByZXN1bHQuIEl0IGlzIGVpdGhlciBhIHByb21pc2UgaWYgdGhlcmUgaXNcbiAgICAvLyBzb21ldGhpbmcgYXN5bmNocm9ub3VzIG9yIGEgdmFsdWVcbiAgICByZXR1cm4gcXVldWUub25Eb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUub3V0KCk7XG4gICAgICByZXR1cm4gUkVUVVJORURfRUxFTUVOVCBpbiByZXN1bHRzID8gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA6IHJlc3VsdHNbQ09OU1VNRV07XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBub2RlOiBmdW5jdGlvbiBub2RlKCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH0sXG4gICAgcnVuOiBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgICAgdmFyIHJvb3ROb2RlID0gdHJlZS5yZXNvbHZlUm9vdChlbGVtZW50KTtcblxuICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKHJvb3ROb2RlKTtcbiAgICB9LFxuICAgIG9uTm9kZUVudGVyOiBmdW5jdGlvbiBvbk5vZGVFbnRlcihjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlRW50ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVPdXQ6IGZ1bmN0aW9uIG9uTm9kZU91dChjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlT3V0Q2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUub25Ob2RlUmVtb3ZlKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIHN5c3RlbTogZnVuY3Rpb24gc3lzdGVtKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJlZTogdHJlZSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgIGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgICAgICB0cmVlLnJlc2V0KCk7XG4gICAgICAgICAgX3VzZVB1YlN1YjIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICAgIF91c2VTdGF0ZTIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICAgIF91c2VFZmZlY3QyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVF1ZXVlO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xudmFyIExPR1MgPSBmYWxzZTtcbnZhciBsb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gIHZhciBfY29uc29sZTtcblxuICByZXR1cm4gTE9HUyA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG59O1xudmFyIGlzUHJvbWlzZSA9IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqWyd0aGVuJ10gPT09ICdmdW5jdGlvbic7XG59O1xudmFyIGNyZWF0ZUl0ZW0gPSBmdW5jdGlvbiBjcmVhdGVJdGVtKHR5cGUsIGZ1bmMpIHtcbiAgdmFyIG9uRG9uZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZnVuY3Rpb24gKCkge307XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBmdW5jOiBmdW5jLFxuICAgIG9uRG9uZTogb25Eb25lXG4gIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVRdWV1ZShjb250ZXh0KSB7XG4gIHZhciBpdGVtcyA9IFtdO1xuICB2YXIgYXN5bmMgPSBmYWxzZTtcbiAgdmFyIHJ1bm5pbmcgPSBmYWxzZTtcbiAgdmFyIHJlbGVhc2UgPSBmdW5jdGlvbiByZWxlYXNlKCkge307XG5cbiAgcmV0dXJuIHtcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZCh0eXBlLCBmdW5jLCBvbkRvbmUpIHtcbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiBbLi4uJyArIHR5cGUgKyAnXSAoJyArIChpdGVtcy5sZW5ndGggKyAxKSArICcgdG90YWwpJyk7XG4gICAgICBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0odHlwZSwgZnVuYywgb25Eb25lKSk7XG4gICAgfSxcbiAgICBwcmVwZW5kSXRlbTogZnVuY3Rpb24gcHJlcGVuZEl0ZW0odHlwZSwgZnVuYywgb25Eb25lKSB7XG4gICAgICBsb2coY29udGV4dCArICc6UTogWycgKyB0eXBlICsgJy4uLl0gKCcgKyAoaXRlbXMubGVuZ3RoICsgMSkgKyAnIHRvdGFsKScpO1xuICAgICAgaXRlbXMgPSBbY3JlYXRlSXRlbSh0eXBlLCBmdW5jLCBvbkRvbmUpXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGl0ZW1zKSk7XG4gICAgfSxcbiAgICBwcm9jZXNzOiBmdW5jdGlvbiBwcm9jZXNzKGxhc3RSZXN1bHQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBsb2coY29udGV4dCArICc6UTpkb25lJyk7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVtID0gaXRlbXMuc2hpZnQoKTtcblxuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6ICcgKyBpdGVtLnR5cGUgKyAnKCkgKCcgKyBpdGVtcy5sZW5ndGggKyAnIGxlZnQpJyk7XG4gICAgICB2YXIgcmVzdWx0ID0gaXRlbS5mdW5jKGxhc3RSZXN1bHQpO1xuXG4gICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgYXN5bmMgPSB0cnVlO1xuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbiAoYXN5bmNSZXN1bHQpIHtcbiAgICAgICAgICBpdGVtLm9uRG9uZShhc3luY1Jlc3VsdCk7XG4gICAgICAgICAgX3RoaXMucHJvY2Vzcyhhc3luY1Jlc3VsdCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIHJlbGVhc2UoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0ub25Eb25lKHJlc3VsdCk7XG4gICAgICAgIHRoaXMucHJvY2VzcyhyZXN1bHQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgb25Eb25lOiBmdW5jdGlvbiBvbkRvbmUoZ2V0UmVzdWx0KSB7XG4gICAgICBpZiAoYXN5bmMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChkb25lLCByZWplY3QpIHtcbiAgICAgICAgICByZWxlYXNlID0gZnVuY3Rpb24gcmVsZWFzZShlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb25lKGdldFJlc3VsdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRSZXN1bHQoKTtcbiAgICB9LFxuICAgIGlzUnVubmluZzogZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFRyZWU7XG5cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhvYmosIGtleXMpIHsgdmFyIHRhcmdldCA9IHt9OyBmb3IgKHZhciBpIGluIG9iaikgeyBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlOyBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTsgdGFyZ2V0W2ldID0gb2JqW2ldOyB9IHJldHVybiB0YXJnZXQ7IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIG5vLXJldHVybi1hc3NpZ24sIG1heC1sZW4gKi9cbnZhciBMT0dTID0gZmFsc2U7XG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgcmV0dXJuIExPR1MgPyAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIGFyZ3VtZW50cykgOiBudWxsO1xufTtcblxuZnVuY3Rpb24gVHJlZSgpIHtcbiAgdmFyIG9uTm9kZUVudGVyID0gW107XG4gIHZhciBvbk5vZGVPdXQgPSBbXTtcbiAgdmFyIF9vbk5vZGVSZW1vdmUgPSBbXTtcbiAgdmFyIHJvb3QgPSBjcmVhdGVOZXdOb2RlKCk7XG4gIHZhciBpZHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGdldElkKCkge1xuICAgIHJldHVybiAnYScgKyArK2lkcztcbiAgfTtcbiAgZnVuY3Rpb24gdXNlU2FtZU5vZGUobm9kZSwgbmV3RWxlbWVudCkge1xuICAgIG5ld0VsZW1lbnQuaW5pdGlhbGl6ZShub2RlLmVsZW1lbnQuaWQsIG5vZGUuZWxlbWVudC51c2VkKCkpO1xuICAgIG5vZGUuZWxlbWVudCA9IG5ld0VsZW1lbnQ7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgZnVuY3Rpb24gdHJlZURpZmYob2xkRWxlbWVudCwgbmV3RWxlbWVudCkge1xuICAgIGlmIChvbGRFbGVtZW50ICYmIG9sZEVsZW1lbnQubmFtZSA9PT0gbmV3RWxlbWVudC5uYW1lKSB7XG4gICAgICBpZiAob2xkRWxlbWVudC5wcm9wcyAmJiBuZXdFbGVtZW50LnByb3BzKSB7XG4gICAgICAgIHJldHVybiBvbGRFbGVtZW50LnByb3BzLmtleSA9PT0gbmV3RWxlbWVudC5wcm9wcy5rZXk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld05vZGUoZWxlbWVudCwgcGFyZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuaW5pdGlhbGl6ZShnZXRJZCgpKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgIGN1cnNvcjogMCxcbiAgICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBsb2coJy0+ICcgKyB0aGlzLmVsZW1lbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5lbnRlcigpO1xuICAgICAgICBvbk5vZGVFbnRlci5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBvdXQ6IGZ1bmN0aW9uIG91dCgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgbG9nKCc8LSAnICsgdGhpcy5lbGVtZW50Lm5hbWUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQub3V0KCk7XG4gICAgICAgIC8vIElmIHRoZXJlJ3JlIG1vcmUgbm9kZXMgaW4gdGhlIHRyZWUgdGhhbiB3aGF0IHdhcyBwcm9jZXNzZWRcbiAgICAgICAgaWYgKHRoaXMuY3Vyc29yIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSh0aGlzLmN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSB0aGlzLmN1cnNvcikuZm9yRWFjaChmdW5jdGlvbiAocmVtb3ZlZE5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfb25Ob2RlUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGMocmVtb3ZlZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJzb3IgPSAwO1xuICAgICAgICBvbk5vZGVPdXQuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzMik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgIGlmICh0aGlzLmxvZ3MpIHRoaXMubG9ncyA9IFtdO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWRkQ2hpbGROb2RlOiBmdW5jdGlvbiBhZGRDaGlsZE5vZGUobmV3RWxlbWVudCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgY2hpbGROb2RlID0gdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl07XG5cbiAgICAgICAgLy8gdXNpbmcgdGhlIHNhbWUgbm9kZVxuICAgICAgICBpZiAoY2hpbGROb2RlICYmIHRyZWVEaWZmKGNoaWxkTm9kZS5lbGVtZW50LCBuZXdFbGVtZW50KSkge1xuICAgICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgICAgcmV0dXJuIHVzZVNhbWVOb2RlKGNoaWxkTm9kZSwgbmV3RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGluZyBhIG5ldyBub2RlXG4gICAgICAgIHZhciBuZXdDaGlsZE5vZGUgPSBjcmVhdGVOZXdOb2RlKG5ld0VsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSkge1xuICAgICAgICAgIF9vbk5vZGVSZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgcmV0dXJuIGMoX3RoaXMzLmNoaWxkcmVuW190aGlzMy5jdXJzb3JdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSA9IG5ld0NoaWxkTm9kZTtcbiAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkTm9kZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIG5vZGUubG9nID0gZnVuY3Rpb24gKHR5cGUsIG1ldGEpIHtcbiAgICAgICAgaWYgKCEoJ2xvZ3MnIGluIG5vZGUpKSBub2RlLmxvZ3MgPSBbXTtcbiAgICAgICAgbm9kZS5sb2dzLnB1c2goeyB0eXBlOiB0eXBlLCBtZXRhOiBtZXRhIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZVJvb3Q6IGZ1bmN0aW9uIHJlc29sdmVSb290KGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiByb290ID0gdHJlZURpZmYocm9vdC5lbGVtZW50LCBlbGVtZW50KSA/IHVzZVNhbWVOb2RlKHJvb3QsIGVsZW1lbnQpIDogY3JlYXRlTmV3Tm9kZShlbGVtZW50KTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHJvb3QgPSBjcmVhdGVOZXdOb2RlKCk7XG4gICAgICBpZHMgPSAwO1xuICAgIH0sXG4gICAgZ2V0TnVtT2ZFbGVtZW50czogZnVuY3Rpb24gZ2V0TnVtT2ZFbGVtZW50cygpIHtcbiAgICAgIHJldHVybiBpZHM7XG4gICAgfSxcbiAgICBkaWFnbm9zZTogZnVuY3Rpb24gZGlhZ25vc2UoKSB7XG4gICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbG9vcE92ZXIobm9kZSkge1xuICAgICAgICAgIHZhciBpbmQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgICAgICB2YXIgX3JlZiA9IG5vZGUuZWxlbWVudC5wcm9wcyA/IG5vZGUuZWxlbWVudC5wcm9wcyA6IHt9LFxuICAgICAgICAgICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW4sXG4gICAgICAgICAgICAgIHJlc3QgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3JlZiwgWydjaGlsZHJlbiddKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluZDogaW5kLFxuICAgICAgICAgICAgbmFtZTogbm9kZS5lbGVtZW50Lm5hbWUsXG4gICAgICAgICAgICBsb2dzOiBub2RlLmxvZ3MsXG4gICAgICAgICAgICBwcm9wczogX2V4dGVuZHMoe1xuICAgICAgICAgICAgICBjaGlsZHJlbjogJzxmdW5jdGlvbiBjaGlsZHJlbj4nXG4gICAgICAgICAgICB9LCByZXN0KSxcbiAgICAgICAgICAgIHVzZWQ6IG5vZGUuZWxlbWVudC51c2VkKCksXG4gICAgICAgICAgICBpZDogbm9kZS5lbGVtZW50LmlkLFxuICAgICAgICAgICAgY2hpbGRyZW46IG5vZGUuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgICByZXR1cm4gbG9vcE92ZXIoY2hpbGQsIGluZCArIDEpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9O1xuICAgICAgICB9KHJvb3QpO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgYXZhaWxhYmxlIGluIHByb2R1Y3Rpb24gbW9kZScpO1xuICAgIH0sXG4gICAgYWRkTm9kZUVudGVyQ2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVFbnRlckNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVFbnRlci5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIGFkZE5vZGVPdXRDYWxsYmFjazogZnVuY3Rpb24gYWRkTm9kZU91dENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICBvbk5vZGVPdXQucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgX29uTm9kZVJlbW92ZS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG52YXIgX0NvbnRleHQgPSByZXF1aXJlKCcuLi9Db250ZXh0Jyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjcmVhdGVVc2VFbGVtZW50SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRIb29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKENvbnRleHQpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHJldHVybiBDb250ZXh0W19Db250ZXh0LlBVQkxJQ19DT05URVhUX0tFWV0oKTtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVsZW1lbnRIb29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9mYXN0RGVlcEVxdWFsID0gcmVxdWlyZSgnZmFzdC1kZWVwLWVxdWFsJyk7XG5cbnZhciBfZmFzdERlZXBFcXVhbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mYXN0RGVlcEVxdWFsKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG52YXIgU3RvcmFnZSA9IHtcbiAgZWxlbWVudHM6IHt9LFxuICBnZXQ6IGZ1bmN0aW9uIGdldChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0pIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSA9IHsgZWZmZWN0czogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBjcmVhdGVFZmZlY3QgPSBmdW5jdGlvbiBjcmVhdGVFZmZlY3QoY2FsbGJhY2ssIGRlcHMpIHtcbiAgcmV0dXJuIHtcbiAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgZGVwczogZGVwc1xuICB9O1xufTtcbnZhciB1cGRhdGVFZmZlY3QgPSBmdW5jdGlvbiB1cGRhdGVFZmZlY3QoZWZmZWN0LCBjYWxsYmFjaywgZGVwcykge1xuICBlZmZlY3QuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgZWZmZWN0Lm9sZERlcHMgPSBlZmZlY3QuZGVwcztcbiAgZWZmZWN0LmRlcHMgPSBkZXBzO1xuICByZXR1cm4gZWZmZWN0O1xufTtcblxuZnVuY3Rpb24gZGVwc0VxdWFsKG9sZERlcHMsIG5ld0RlcHMpIHtcbiAgaWYgKCFvbGREZXBzKSByZXR1cm4gZmFsc2U7XG4gIGlmIChvbGREZXBzLmxlbmd0aCAhPT0gbmV3RGVwcy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuICgwLCBfZmFzdERlZXBFcXVhbDIuZGVmYXVsdCkob2xkRGVwcywgbmV3RGVwcyk7XG59XG5mdW5jdGlvbiByZXNvbHZlRWZmZWN0KG5vZGUsIGVmZmVjdCkge1xuICB2YXIgZGVwcyA9IGVmZmVjdC5kZXBzLFxuICAgICAgb2xkRGVwcyA9IGVmZmVjdC5vbGREZXBzLFxuICAgICAgY2FsbGJhY2sgPSBlZmZlY3QuY2FsbGJhY2s7XG5cblxuICBpZiAodHlwZW9mIGRlcHMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICB9IGVsc2UgaWYgKGRlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgaWYgKG5vZGUuZWxlbWVudC51c2VkKCkgPT09IDEpIHtcbiAgICAgIGVmZmVjdC5jbGVhblVwID0gY2FsbGJhY2soKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGFyZUVxdWFsID0gZGVwc0VxdWFsKG9sZERlcHMsIGRlcHMpO1xuXG4gICAgaWYgKCFhcmVFcXVhbCkge1xuICAgICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgY3JlYXRlVXNlRWZmZWN0SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVmZmVjdEhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICBzdG9yYWdlLmVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmZWN0KSB7XG4gICAgICBpZiAoZWZmZWN0LmNsZWFuVXApIGVmZmVjdC5jbGVhblVwKCk7XG4gICAgfSk7XG4gICAgU3RvcmFnZS5jbGVhblVwKG5vZGUuZWxlbWVudC5pZCk7XG4gIH0pO1xuICBwcm9jZXNzb3Iub25Ob2RlT3V0KGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgaWYgKHN0b3JhZ2UuZWZmZWN0cy5sZW5ndGggPiAwKSB7XG4gICAgICBzdG9yYWdlLmVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmZWN0KSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlRWZmZWN0KG5vZGUsIGVmZmVjdCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBkZXBzKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLmVmZmVjdHMucHVzaChjcmVhdGVFZmZlY3QoY2FsbGJhY2ssIGRlcHMpKTtcblxuICAgICAgLy8gb3RoZXIgcnVuc1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuXG4gICAgICBzdG9yYWdlLmNvbnN1bWVyID0gaW5kZXggPCBzdG9yYWdlLmVmZmVjdHMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICAgIHVwZGF0ZUVmZmVjdChzdG9yYWdlLmVmZmVjdHNbaW5kZXhdLCBjYWxsYmFjaywgZGVwcyk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlRWZmZWN0SG9vaztcblxuXG5jcmVhdGVVc2VFZmZlY3RIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBTdG9yYWdlLmVsZW1lbnRzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlRWxlbWVudEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50SG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHJldHVybiBwcm9jZXNzb3Iubm9kZSgpLmVsZW1lbnQ7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFbGVtZW50SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VQdWJTdWJIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBzdWJzY3JpYmVycyA9IHt9O1xuXG52YXIgc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKG5vZGUsIGVsZW1lbnQsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHN1YnNjcmliZXJzW3R5cGVdID0ge307XG4gIGlmIChfX0RFVl9fKSB7XG4gICAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXVtlbGVtZW50LmlkXSkge1xuICAgICAgbm9kZS5sb2coJ3VzZVB1YlN1YjpzdWJzY3JpYmUnLCB0eXBlKTtcbiAgICB9XG4gIH1cbiAgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF0gPSBjYWxsYmFjaztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoX19ERVZfXykge1xuICAgICAgbm9kZS5sb2coJ3VzZVB1YlN1Yjp1bnN1YnNjcmliZScsIHR5cGUpO1xuICAgIH1cbiAgICBkZWxldGUgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF07XG4gIH07XG59O1xudmFyIHB1Ymxpc2ggPSBmdW5jdGlvbiBwdWJsaXNoKG5vZGUsIHR5cGUsIHBheWxvYWQpIHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgcmV0dXJuO1xuICBpZiAoX19ERVZfXykge1xuICAgIG5vZGUubG9nKCd1c2VQdWJTdWI6cHVibGlzaDonICsgdHlwZSwgcGF5bG9hZCk7XG4gIH1cbiAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnNbdHlwZV0pLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgc3Vic2NyaWJlcnNbdHlwZV1baWRdKHBheWxvYWQpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVB1YlN1Ykhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgaWYgKHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF0pIHtcbiAgICAgICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlZEVsZW1lbnQpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWwgPSBzY29wZWRFbGVtZW50IHx8IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgc3Vic2NyaWJlRnVuYyA9IGZ1bmN0aW9uIHN1YnNjcmliZUZ1bmMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHBhcmFtc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1YnNjcmliZS5hcHBseSh1bmRlZmluZWQsIFtub2RlLCBlbF0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG4gICAgdmFyIHB1Ymxpc2hGdW5jID0gZnVuY3Rpb24gcHVibGlzaEZ1bmMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIHBhcmFtc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHVibGlzaC5hcHBseSh1bmRlZmluZWQsIFtub2RlXS5jb25jYXQocGFyYW1zKSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWJzY3JpYmU6IHN1YnNjcmliZUZ1bmMsXG4gICAgICBwdWJsaXNoOiBwdWJsaXNoRnVuYyxcbiAgICAgIHN1YnNjcmliZXJzOiBzdWJzY3JpYmVyc1xuICAgIH07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVB1YlN1Ykhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHN1YnNjcmliZXJzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VSZWR1Y2VySG9vaztcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGFjdGlvbiA9IF9yZWYuYWN0aW9uLFxuICAgICAgICBwcm9wc1RvQWN0aW9uID0gX3JlZi5wcm9wc1RvQWN0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnYWN0aW9uJywgJ3Byb3BzVG9BY3Rpb24nXSk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICBkaXNwYXRjaChhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAocHJvcHNUb0FjdGlvbikge1xuICAgICAgZGlzcGF0Y2gocHJvcHNUb0FjdGlvbihyZXN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignPERpc3BhdGNoPiBleHBlY3RzIFwiYWN0aW9uXCIgb3IgXCJwcm9wc1RvQWN0aW9uXCIgcHJvcC4nKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVJlZHVjZXJIb29rKHVzZVN0YXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgaW5pdGlhbFN0YXRlKSB7XG4gICAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKGluaXRpYWxTdGF0ZSksXG4gICAgICAgIF91c2VTdGF0ZTIgPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGUsIDIpLFxuICAgICAgICBzdGF0ZSA9IF91c2VTdGF0ZTJbMF0sXG4gICAgICAgIHNldFN0YXRlID0gX3VzZVN0YXRlMlsxXTtcblxuICAgIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHNldFN0YXRlKHJlZHVjZXIoc3RhdGUoKSwgYWN0aW9uKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoLCBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpLCAvLyA8RGlzcGF0Y2g+XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlKCk7XG4gICAgfSAvLyA8R2V0U3RhdGU+XG4gICAgXTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VTdGF0ZUhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IHN0YXRlczogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVzZVN0YXRlSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoaW5pdGlhbFN0YXRlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlcy5wdXNoKGluaXRpYWxTdGF0ZSk7XG4gICAgICBpbmRleCA9IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDE7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICB9XG5cbiAgICBpZiAoX19ERVZfXykgbm9kZS5sb2coJ3VzZVN0YXRlOmNvbnN1bWVkJywgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdKTtcblxuICAgIHJldHVybiBbZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XTtcbiAgICB9LCBmdW5jdGlvbiAobmV3U3RhdGUpIHtcbiAgICAgIGlmIChfX0RFVl9fKSBub2RlLmxvZygndXNlU3RhdGU6bmV3JywgbmV3U3RhdGUpO1xuICAgICAgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdID0gbmV3U3RhdGU7XG4gICAgICBpZiAoIWVsZW1lbnQuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgbm9kZS5yZXJ1bigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgIH1dO1xuICB9O1xufVxuXG5jcmVhdGVVc2VTdGF0ZUhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIFN0b3JhZ2UuZWxlbWVudHMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNWYWxpZEhvb2tDb250ZXh0O1xuZnVuY3Rpb24gaXNWYWxpZEhvb2tDb250ZXh0KHByb2Nlc3Nvcikge1xuICBpZiAoIXByb2Nlc3Nvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignU29tZXRoaW5nIHRlcnJpYmx5IHdyb25nIGhhcHBlbmVkLiBUaGUgaG9vayBmYWN0b3J5IGZ1bmN0aW9uIGlzIGNhbGxlZCB3aXRob3V0IGEgcHJvY2Vzc29yLicpO1xuICB9XG4gIGlmICghcHJvY2Vzc29yLm5vZGUoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSG9va3MgbXVzdCBiZSBjYWxsZWQgaW4gdGhlIGNvbnRleHQgb2YgYW4gQWN0TUwgZWxlbWVudC4nKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmNyZWF0ZVJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lO1xuXG52YXIgX1Byb2Nlc3NvciA9IHJlcXVpcmUoJy4vUHJvY2Vzc29yJyk7XG5cbnZhciBfUHJvY2Vzc29yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Byb2Nlc3Nvcik7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQgPSByZXF1aXJlKCcuL3V0aWxzL2lzQWN0TUxFbGVtZW50Jyk7XG5cbnZhciBfaXNBY3RNTEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNBY3RNTEVsZW1lbnQpO1xuXG52YXIgX0FjdEVsZW1lbnQgPSByZXF1aXJlKCcuL0FjdEVsZW1lbnQnKTtcblxudmFyIF9BY3RFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdEVsZW1lbnQpO1xuXG52YXIgX3VzZUVsZW1lbnQgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVsZW1lbnQnKTtcblxudmFyIF91c2VFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVsZW1lbnQpO1xuXG52YXIgX3VzZVB1YlN1YiA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHViU3ViJyk7XG5cbnZhciBfdXNlUHViU3ViMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVB1YlN1Yik7XG5cbnZhciBfdXNlU3RhdGUgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVN0YXRlJyk7XG5cbnZhciBfdXNlU3RhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlU3RhdGUpO1xuXG52YXIgX3VzZVJlZHVjZXIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVJlZHVjZXInKTtcblxudmFyIF91c2VSZWR1Y2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVJlZHVjZXIpO1xuXG52YXIgX3VzZUVmZmVjdCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWZmZWN0Jyk7XG5cbnZhciBfdXNlRWZmZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZUVmZmVjdCk7XG5cbnZhciBfdXNlQ29udGV4dCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlQ29udGV4dCcpO1xuXG52YXIgX3VzZUNvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlQ29udGV4dCk7XG5cbnZhciBfQ29udGV4dCA9IHJlcXVpcmUoJy4vQ29udGV4dCcpO1xuXG52YXIgX0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGNyZWF0ZVJ1bnRpbWUoKSB7XG4gIHZhciBwcm9jZXNzb3IgPSAoMCwgX1Byb2Nlc3NvcjIuZGVmYXVsdCkoKTtcblxuICBmdW5jdGlvbiBBKGZ1bmMsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGNoaWxkcmVuID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgY2hpbGRyZW5bX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHJldHVybiAoMCwgX0FjdEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmMsIHByb3BzLCBjaGlsZHJlbik7XG4gIH1cbiAgZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgICBpZiAoISgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0ZWQuIEluc3RlYWQgJyArIGVsZW1lbnQudG9TdHJpbmcoKSArICcgcGFzc2VkLicpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvY2Vzc29yLnJ1bihlbGVtZW50KTtcbiAgfVxuICB2YXIgRnJhZ21lbnQgPSBmdW5jdGlvbiBGcmFnbWVudChfcmVmKSB7XG4gICAgdmFyIGNoaWxkcmVuID0gX3JlZi5jaGlsZHJlbjtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH07XG4gIHZhciB1c2VFbGVtZW50ID0gKDAsIF91c2VFbGVtZW50Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlU3RhdGUgPSAoMCwgX3VzZVN0YXRlMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlUHViU3ViID0gKDAsIF91c2VQdWJTdWIyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VSZWR1Y2VyID0gKDAsIF91c2VSZWR1Y2VyMi5kZWZhdWx0KSh1c2VTdGF0ZSk7XG4gIHZhciB1c2VFZmZlY3QgPSAoMCwgX3VzZUVmZmVjdDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZUNvbnRleHQgPSAoMCwgX3VzZUNvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciBjcmVhdGVDb250ZXh0ID0gKDAsIF9Db250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gIHJldHVybiB7XG4gICAgQTogQSxcbiAgICBydW46IHJ1bixcbiAgICBGcmFnbWVudDogRnJhZ21lbnQsXG4gICAgcHJvY2Vzc29yOiBwcm9jZXNzb3IsXG4gICAgdXNlRWxlbWVudDogdXNlRWxlbWVudCxcbiAgICB1c2VQdWJTdWI6IHVzZVB1YlN1YixcbiAgICB1c2VTdGF0ZTogdXNlU3RhdGUsXG4gICAgdXNlUmVkdWNlcjogdXNlUmVkdWNlcixcbiAgICB1c2VFZmZlY3Q6IHVzZUVmZmVjdCxcbiAgICB1c2VDb250ZXh0OiB1c2VDb250ZXh0LFxuICAgIGNyZWF0ZUNvbnRleHQ6IGNyZWF0ZUNvbnRleHRcbiAgfTtcbn1cblxudmFyIHJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZVJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0FjdE1MRWxlbWVudDtcbmZ1bmN0aW9uIGlzQWN0TUxFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5fX2FjdG1sID09PSB0cnVlO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBrZXlMaXN0ID0gT2JqZWN0LmtleXM7XG52YXIgaGFzUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuICAgIHZhciBhcnJBID0gaXNBcnJheShhKVxuICAgICAgLCBhcnJCID0gaXNBcnJheShiKVxuICAgICAgLCBpXG4gICAgICAsIGxlbmd0aFxuICAgICAgLCBrZXk7XG5cbiAgICBpZiAoYXJyQSAmJiBhcnJCKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgICAgaWYgKCFlcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGFyckEgIT0gYXJyQikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGRhdGVBID0gYSBpbnN0YW5jZW9mIERhdGVcbiAgICAgICwgZGF0ZUIgPSBiIGluc3RhbmNlb2YgRGF0ZTtcbiAgICBpZiAoZGF0ZUEgIT0gZGF0ZUIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZUEgJiYgZGF0ZUIpIHJldHVybiBhLmdldFRpbWUoKSA9PSBiLmdldFRpbWUoKTtcblxuICAgIHZhciByZWdleHBBID0gYSBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgLCByZWdleHBCID0gYiBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgICBpZiAocmVnZXhwQSAhPSByZWdleHBCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHJlZ2V4cEEgJiYgcmVnZXhwQikgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG5cbiAgICB2YXIga2V5cyA9IGtleUxpc3QoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cbiAgICBpZiAobGVuZ3RoICE9PSBrZXlMaXN0KGIpLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgIGlmICghaGFzUHJvcC5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIWVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGEhPT1hICYmIGIhPT1iO1xufTtcbiIsImltcG9ydCBDaXJjdWxhckpTT04gZnJvbSAnLi92ZW5kb3IvQ2lyY3VsYXJKU09OJztcbmltcG9ydCBTZXJpYWxpemVFcnJvciBmcm9tICcuL3ZlbmRvci9TZXJpYWxpemVFcnJvcic7XG5cbmNvbnN0IHsgc3RyaW5naWZ5IH0gPSBDaXJjdWxhckpTT047XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhbml0aXplKHNvbWV0aGluZywgc2hvd0Vycm9ySW5Db25zb2xlID0gZmFsc2UpIHtcbiAgdmFyIHJlc3VsdDtcblxuICB0cnkge1xuICAgIHJlc3VsdCA9IEpTT04ucGFyc2Uoc3RyaW5naWZ5KHNvbWV0aGluZywgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLm5hbWUgPT09ICcnID8gJzxhbm9ueW1vdXM+JyA6IGBmdW5jdGlvbiAkeyB2YWx1ZS5uYW1lIH0oKWA7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXR1cm4gU2VyaWFsaXplRXJyb3IodmFsdWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sIHVuZGVmaW5lZCwgdHJ1ZSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChzaG93RXJyb3JJbkNvbnNvbGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9XG4gICAgcmVzdWx0ID0gbnVsbDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufSIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vKiFcbkNvcHlyaWdodCAoQykgMjAxMy0yMDE3IGJ5IEFuZHJlYSBHaWFtbWFyY2hpIC0gQFdlYlJlZmxlY3Rpb25cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuXG4qL1xudmFyXG4vLyBzaG91bGQgYmUgYSBub3Qgc28gY29tbW9uIGNoYXJcbi8vIHBvc3NpYmx5IG9uZSBKU09OIGRvZXMgbm90IGVuY29kZVxuLy8gcG9zc2libHkgb25lIGVuY29kZVVSSUNvbXBvbmVudCBkb2VzIG5vdCBlbmNvZGVcbi8vIHJpZ2h0IG5vdyB0aGlzIGNoYXIgaXMgJ34nIGJ1dCB0aGlzIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlXG5zcGVjaWFsQ2hhciA9ICd+JyxcbnNhZmVTcGVjaWFsQ2hhciA9ICdcXFxceCcgKyAoXG4gICcwJyArIHNwZWNpYWxDaGFyLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpXG4pLnNsaWNlKC0yKSxcbmVzY2FwZWRTYWZlU3BlY2lhbENoYXIgPSAnXFxcXCcgKyBzYWZlU3BlY2lhbENoYXIsXG5zcGVjaWFsQ2hhclJHID0gbmV3IFJlZ0V4cChzYWZlU3BlY2lhbENoYXIsICdnJyksXG5zYWZlU3BlY2lhbENoYXJSRyA9IG5ldyBSZWdFeHAoZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciwgJ2cnKSxcblxuc2FmZVN0YXJ0V2l0aFNwZWNpYWxDaGFyUkcgPSBuZXcgUmVnRXhwKCcoPzpefChbXlxcXFxcXFxcXSkpJyArIGVzY2FwZWRTYWZlU3BlY2lhbENoYXIpLFxuXG5pbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbih2KXtcbiAgZm9yKHZhciBpPXRoaXMubGVuZ3RoO2ktLSYmdGhpc1tpXSE9PXY7KTtcbiAgcmV0dXJuIGk7XG59LFxuJFN0cmluZyA9IFN0cmluZyAgLy8gdGhlcmUncyBubyB3YXkgdG8gZHJvcCB3YXJuaW5ncyBpbiBKU0hpbnRcbiAgICAgICAgICAgICAgICAgIC8vIGFib3V0IG5ldyBTdHJpbmcgLi4uIHdlbGwsIEkgbmVlZCB0aGF0IGhlcmUhXG4gICAgICAgICAgICAgICAgICAvLyBmYWtlZCwgYW5kIGhhcHB5IGxpbnRlciFcbjtcblxuZnVuY3Rpb24gZ2VuZXJhdGVSZXBsYWNlcih2YWx1ZSwgcmVwbGFjZXIsIHJlc29sdmUpIHtcbnZhclxuICBpbnNwZWN0ID0gISFyZXBsYWNlcixcbiAgcGF0aCA9IFtdLFxuICBhbGwgID0gW3ZhbHVlXSxcbiAgc2VlbiA9IFt2YWx1ZV0sXG4gIG1hcHAgPSBbcmVzb2x2ZSA/IHNwZWNpYWxDaGFyIDogJzxjaXJjdWxhcj4nXSxcbiAgbGFzdCA9IHZhbHVlLFxuICBsdmwgID0gMSxcbiAgaSwgZm5cbjtcbmlmIChpbnNwZWN0KSB7XG4gIGZuID0gdHlwZW9mIHJlcGxhY2VyID09PSAnb2JqZWN0JyA/XG4gICAgZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBrZXkgIT09ICcnICYmIHJlcGxhY2VyLmluZGV4T2Yoa2V5KSA8IDAgPyB2b2lkIDAgOiB2YWx1ZTtcbiAgICB9IDpcbiAgICByZXBsYWNlcjtcbn1cbnJldHVybiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gIC8vIHRoZSByZXBsYWNlciBoYXMgcmlnaHRzIHRvIGRlY2lkZVxuICAvLyBpZiBhIG5ldyBvYmplY3Qgc2hvdWxkIGJlIHJldHVybmVkXG4gIC8vIG9yIGlmIHRoZXJlJ3Mgc29tZSBrZXkgdG8gZHJvcFxuICAvLyBsZXQncyBjYWxsIGl0IGhlcmUgcmF0aGVyIHRoYW4gXCJ0b28gbGF0ZVwiXG4gIGlmIChpbnNwZWN0KSB2YWx1ZSA9IGZuLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG5cbiAgLy8gZGlkIHlvdSBrbm93ID8gU2FmYXJpIHBhc3NlcyBrZXlzIGFzIGludGVnZXJzIGZvciBhcnJheXNcbiAgLy8gd2hpY2ggbWVhbnMgaWYgKGtleSkgd2hlbiBrZXkgPT09IDAgd29uJ3QgcGFzcyB0aGUgY2hlY2tcbiAgaWYgKGtleSAhPT0gJycpIHtcbiAgICBpZiAobGFzdCAhPT0gdGhpcykge1xuICAgICAgaSA9IGx2bCAtIGluZGV4T2YuY2FsbChhbGwsIHRoaXMpIC0gMTtcbiAgICAgIGx2bCAtPSBpO1xuICAgICAgYWxsLnNwbGljZShsdmwsIGFsbC5sZW5ndGgpO1xuICAgICAgcGF0aC5zcGxpY2UobHZsIC0gMSwgcGF0aC5sZW5ndGgpO1xuICAgICAgbGFzdCA9IHRoaXM7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGx2bCwga2V5LCBwYXRoKTtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCByZWZlcnJpbmcgdG8gcGFyZW50IG9iamVjdCwgYWRkIHRvIHRoZVxuICAgICAgLy8gb2JqZWN0IHBhdGggc3RhY2suIE90aGVyd2lzZSBpdCBpcyBhbHJlYWR5IHRoZXJlLlxuICAgICAgaWYgKGluZGV4T2YuY2FsbChhbGwsIHZhbHVlKSA8IDApIHtcbiAgICAgICAgYWxsLnB1c2gobGFzdCA9IHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGx2bCA9IGFsbC5sZW5ndGg7XG4gICAgICBpID0gaW5kZXhPZi5jYWxsKHNlZW4sIHZhbHVlKTtcbiAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICBpID0gc2Vlbi5wdXNoKHZhbHVlKSAtIDE7XG4gICAgICAgIGlmIChyZXNvbHZlKSB7XG4gICAgICAgICAgLy8ga2V5IGNhbm5vdCBjb250YWluIHNwZWNpYWxDaGFyIGJ1dCBjb3VsZCBiZSBub3QgYSBzdHJpbmdcbiAgICAgICAgICBwYXRoLnB1c2goKCcnICsga2V5KS5yZXBsYWNlKHNwZWNpYWxDaGFyUkcsIHNhZmVTcGVjaWFsQ2hhcikpO1xuICAgICAgICAgIG1hcHBbaV0gPSBzcGVjaWFsQ2hhciArIHBhdGguam9pbihzcGVjaWFsQ2hhcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFwcFtpXSA9IG1hcHBbMF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gbWFwcFtpXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgcmVzb2x2ZSkge1xuICAgICAgICAvLyBlbnN1cmUgbm8gc3BlY2lhbCBjaGFyIGludm9sdmVkIG9uIGRlc2VyaWFsaXphdGlvblxuICAgICAgICAvLyBpbiB0aGlzIGNhc2Ugb25seSBmaXJzdCBjaGFyIGlzIGltcG9ydGFudFxuICAgICAgICAvLyBubyBuZWVkIHRvIHJlcGxhY2UgYWxsIHZhbHVlIChiZXR0ZXIgcGVyZm9ybWFuY2UpXG4gICAgICAgIHZhbHVlID0gdmFsdWUgLnJlcGxhY2Uoc2FmZVNwZWNpYWxDaGFyLCBlc2NhcGVkU2FmZVNwZWNpYWxDaGFyKVxuICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKHNwZWNpYWxDaGFyLCBzYWZlU3BlY2lhbENoYXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdmFsdWU7XG59O1xufVxuXG5mdW5jdGlvbiByZXRyaWV2ZUZyb21QYXRoKGN1cnJlbnQsIGtleXMpIHtcbmZvcih2YXIgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBjdXJyZW50ID0gY3VycmVudFtcbiAgLy8ga2V5cyBzaG91bGQgYmUgbm9ybWFsaXplZCBiYWNrIGhlcmVcbiAga2V5c1tpKytdLnJlcGxhY2Uoc2FmZVNwZWNpYWxDaGFyUkcsIHNwZWNpYWxDaGFyKVxuXSk7XG5yZXR1cm4gY3VycmVudDtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVSZXZpdmVyKHJldml2ZXIpIHtcbnJldHVybiBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gIHZhciBpc1N0cmluZyA9IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gIGlmIChpc1N0cmluZyAmJiB2YWx1ZS5jaGFyQXQoMCkgPT09IHNwZWNpYWxDaGFyKSB7XG4gICAgcmV0dXJuIG5ldyAkU3RyaW5nKHZhbHVlLnNsaWNlKDEpKTtcbiAgfVxuICBpZiAoa2V5ID09PSAnJykgdmFsdWUgPSByZWdlbmVyYXRlKHZhbHVlLCB2YWx1ZSwge30pO1xuICAvLyBhZ2Fpbiwgb25seSBvbmUgbmVlZGVkLCBkbyBub3QgdXNlIHRoZSBSZWdFeHAgZm9yIHRoaXMgcmVwbGFjZW1lbnRcbiAgLy8gb25seSBrZXlzIG5lZWQgdGhlIFJlZ0V4cFxuICBpZiAoaXNTdHJpbmcpIHZhbHVlID0gdmFsdWUgLnJlcGxhY2Uoc2FmZVN0YXJ0V2l0aFNwZWNpYWxDaGFyUkcsICckMScgKyBzcGVjaWFsQ2hhcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKGVzY2FwZWRTYWZlU3BlY2lhbENoYXIsIHNhZmVTcGVjaWFsQ2hhcik7XG4gIHJldHVybiByZXZpdmVyID8gcmV2aXZlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpIDogdmFsdWU7XG59O1xufVxuXG5mdW5jdGlvbiByZWdlbmVyYXRlQXJyYXkocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIHtcbmZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gIGN1cnJlbnRbaV0gPSByZWdlbmVyYXRlKHJvb3QsIGN1cnJlbnRbaV0sIHJldHJpZXZlKTtcbn1cbnJldHVybiBjdXJyZW50O1xufVxuXG5mdW5jdGlvbiByZWdlbmVyYXRlT2JqZWN0KHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSB7XG5mb3IgKHZhciBrZXkgaW4gY3VycmVudCkge1xuICBpZiAoY3VycmVudC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgY3VycmVudFtrZXldID0gcmVnZW5lcmF0ZShyb290LCBjdXJyZW50W2tleV0sIHJldHJpZXZlKTtcbiAgfVxufVxucmV0dXJuIGN1cnJlbnQ7XG59XG5cbmZ1bmN0aW9uIHJlZ2VuZXJhdGUocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIHtcbnJldHVybiBjdXJyZW50IGluc3RhbmNlb2YgQXJyYXkgP1xuICAvLyBmYXN0IEFycmF5IHJlY29uc3RydWN0aW9uXG4gIHJlZ2VuZXJhdGVBcnJheShyb290LCBjdXJyZW50LCByZXRyaWV2ZSkgOlxuICAoXG4gICAgY3VycmVudCBpbnN0YW5jZW9mICRTdHJpbmcgP1xuICAgICAgKFxuICAgICAgICAvLyByb290IGlzIGFuIGVtcHR5IHN0cmluZ1xuICAgICAgICBjdXJyZW50Lmxlbmd0aCA/XG4gICAgICAgICAgKFxuICAgICAgICAgICAgcmV0cmlldmUuaGFzT3duUHJvcGVydHkoY3VycmVudCkgP1xuICAgICAgICAgICAgICByZXRyaWV2ZVtjdXJyZW50XSA6XG4gICAgICAgICAgICAgIHJldHJpZXZlW2N1cnJlbnRdID0gcmV0cmlldmVGcm9tUGF0aChcbiAgICAgICAgICAgICAgICByb290LCBjdXJyZW50LnNwbGl0KHNwZWNpYWxDaGFyKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgKSA6XG4gICAgICAgICAgcm9vdFxuICAgICAgKSA6XG4gICAgICAoXG4gICAgICAgIGN1cnJlbnQgaW5zdGFuY2VvZiBPYmplY3QgP1xuICAgICAgICAgIC8vIGRlZGljYXRlZCBPYmplY3QgcGFyc2VyXG4gICAgICAgICAgcmVnZW5lcmF0ZU9iamVjdChyb290LCBjdXJyZW50LCByZXRyaWV2ZSkgOlxuICAgICAgICAgIC8vIHZhbHVlIGFzIGl0IGlzXG4gICAgICAgICAgY3VycmVudFxuICAgICAgKVxuICApXG47XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVJlY3Vyc2lvbih2YWx1ZSwgcmVwbGFjZXIsIHNwYWNlLCBkb05vdFJlc29sdmUpIHtcbnJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgZ2VuZXJhdGVSZXBsYWNlcih2YWx1ZSwgcmVwbGFjZXIsICFkb05vdFJlc29sdmUpLCBzcGFjZSk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUmVjdXJzaW9uKHRleHQsIHJldml2ZXIpIHtcbnJldHVybiBKU09OLnBhcnNlKHRleHQsIGdlbmVyYXRlUmV2aXZlcihyZXZpdmVyKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3RyaW5naWZ5OiBzdHJpbmdpZnlSZWN1cnNpb24sXG4gIHBhcnNlOiBwYXJzZVJlY3Vyc2lvblxufSIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vLyBDcmVkaXRzOiBodHRwczovL2dpdGh1Yi5jb20vc2luZHJlc29yaHVzL3NlcmlhbGl6ZS1lcnJvclxuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsdWUgPT4ge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBkZXN0cm95Q2lyY3VsYXIodmFsdWUsIFtdKTtcblx0fVxuXG5cdC8vIFBlb3BsZSBzb21ldGltZXMgdGhyb3cgdGhpbmdzIGJlc2lkZXMgRXJyb3Igb2JqZWN0cywgc2/igKZcblxuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0Ly8gSlNPTi5zdHJpbmdpZnkgZGlzY2FyZHMgZnVuY3Rpb25zLiBXZSBkbyB0b28sIHVubGVzcyBhIGZ1bmN0aW9uIGlzIHRocm93biBkaXJlY3RseS5cblx0XHRyZXR1cm4gYFtGdW5jdGlvbjogJHsodmFsdWUubmFtZSB8fCAnYW5vbnltb3VzJyl9XWA7XG5cdH1cblxuXHRyZXR1cm4gdmFsdWU7XG59O1xuXG4vLyBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9kZXN0cm95LWNpcmN1bGFyXG5mdW5jdGlvbiBkZXN0cm95Q2lyY3VsYXIoZnJvbSwgc2Vlbikge1xuXHRjb25zdCB0byA9IEFycmF5LmlzQXJyYXkoZnJvbSkgPyBbXSA6IHt9O1xuXG5cdHNlZW4ucHVzaChmcm9tKTtcblxuXHRmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhmcm9tKSkge1xuXHRcdGNvbnN0IHZhbHVlID0gZnJvbVtrZXldO1xuXG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG5cdFx0XHR0b1trZXldID0gdmFsdWU7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHRpZiAoc2Vlbi5pbmRleE9mKGZyb21ba2V5XSkgPT09IC0xKSB7XG5cdFx0XHR0b1trZXldID0gZGVzdHJveUNpcmN1bGFyKGZyb21ba2V5XSwgc2Vlbi5zbGljZSgwKSk7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR0b1trZXldID0gJ1tDaXJjdWxhcl0nO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBmcm9tLm5hbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0dG8ubmFtZSA9IGZyb20ubmFtZTtcblx0fVxuXG5cdGlmICh0eXBlb2YgZnJvbS5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuXHRcdHRvLm1lc3NhZ2UgPSBmcm9tLm1lc3NhZ2U7XG5cdH1cblxuXHRpZiAodHlwZW9mIGZyb20uc3RhY2sgPT09ICdzdHJpbmcnKSB7XG5cdFx0dG8uc3RhY2sgPSBmcm9tLnN0YWNrO1xuXHR9XG5cblx0cmV0dXJuIHRvO1xufSIsImNvbnN0IEVOVEVSID0gJ0VOVEVSJztcbmNvbnN0IE9VVCA9ICdPVVQnO1xuY29uc3QgUkVNT1ZFID0gJ1JFTU9WRSc7XG5cbmltcG9ydCBzYW5pdGl6ZSBmcm9tICcuL2hlbHBlcnMvc2FuaXRpemUnO1xuXG5jb25zdCBhZGRJbmQgPSBpbmQgPT4ge1xuICByZXR1cm4gYG1hcmdpbi1sZWZ0OiAkeyBpbmQgKiAyMCB9cHg7YDtcbn07XG5jb25zdCBwYXJzZUxvZ01ldGEgPSBtZXRhID0+IHtcbiAgaWYgKHR5cGVvZiBtZXRhID09PSAndW5kZWZpbmVkJykgcmV0dXJuICcnO1xuICBpZiAodHlwZW9mIG1ldGEgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBtZXRhID09PSAnYm9vbGVhbicgfHwgdHlwZW9mIG1ldGEgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGAoJHsgSlNPTi5zdHJpbmdpZnkobWV0YSkgfSlgO1xuICB9XG4gIGlmICh0eXBlb2YgbWV0YSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtZXRhKSkge1xuICAgICAgcmV0dXJuIGAoWy4uLiR7IG1ldGEubGVuZ3RoIH1dKWA7XG4gICAgfVxuICAgIHJldHVybiAnKG9iamVjdCknO1xuICB9XG4gIHJldHVybiBgKCR7IHR5cGVvZiBtZXRhIH0pYDtcbn07XG5cbmNvbnN0IFNUWUxFUyA9IHtcbiAgZGVmYXVsdDogKGluZCkgPT4gJ2Rpc3BsYXk6IGlubGluZS1ibG9jazsnICsgYWRkSW5kKGluZCksXG4gIGhvb2s6IChpbmQpID0+ICdjb2xvcjogIzk5OTsnICsgYWRkSW5kKGluZCksXG4gIGN1cnJlbnQ6IChpbmQpID0+ICdmb250LXdlaWdodDogYm9sZDsgYm9yZGVyOiBzb2xpZCAxcHggIzk5OTsgYm9yZGVyLXJhZGl1czogMnB4OyBwYWRkaW5nOiAxcHggMDsnICsgYWRkSW5kKGluZCksXG4gIGVudHJhbmNlOiAoaW5kKSA9PiAnY29sb3I6ICNGRkY7YmFja2dyb3VuZDogIzRkNGQ0ZDsnICsgYWRkSW5kKGluZClcbn07XG5cbmZ1bmN0aW9uIHByaW50U25hcHNob3RUb0NvbnNvbGUoc25hcHNob3QpIHtcbiAgY29uc3QgWyB0eXBlLCBub2RlLCB0cmVlIF0gPSBzbmFwc2hvdDtcblxuICBsZXQgcHJpbnRMaW5lcyA9IFtcbiAgICBbIGDihpIgJHsgdHlwZSB9IDwkeyBub2RlLmVsZW1lbnQubmFtZSB9PmAsIFNUWUxFUy5lbnRyYW5jZSgwKSBdXG4gIF07XG5cbiAgcHJpbnRMaW5lcyA9IHByaW50TGluZXMuY29uY2F0KChmdW5jdGlvbiBsb29wKHsgaWQsIGluZCwgbmFtZSwgdXNlZCwgY2hpbGRyZW4sIGxvZ3MgfSkge1xuICAgIGxldCBsaW5lcyA9IFtdO1xuXG4gICAgbGluZXMucHVzaChcbiAgICAgIFtcbiAgICAgICAgYDwkeyBuYW1lIH0keyBjaGlsZHJlbi5sZW5ndGggPT09IDAgPyAnIC8nIDogJyd9PiAoJHsgdXNlZCB9KWAsXG4gICAgICAgIGlkID09PSBub2RlLmVsZW1lbnQuaWQgPyBTVFlMRVMuY3VycmVudChpbmQpIDogU1RZTEVTLmRlZmF1bHQoaW5kKVxuICAgICAgXSxcbiAgICApO1xuICAgIGlmIChsb2dzICYmIGxvZ3MubGVuZ3RoID4gMCkge1xuICAgICAgbGluZXMgPSBsaW5lcy5jb25jYXQobG9ncy5tYXAoKHsgdHlwZSwgbWV0YSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBbIGDipLcgJHsgdHlwZSB9JHsgcGFyc2VMb2dNZXRhKG1ldGEpIH1gLCBTVFlMRVMuaG9vayhpbmQpIF07XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBjaGlsZHJlbi5tYXAoY2hpbGQgPT4ge1xuICAgICAgICBsaW5lcyA9IGxpbmVzLmNvbmNhdChsb29wKGNoaWxkKSk7XG4gICAgICB9KTtcbiAgICAgIGxpbmVzLnB1c2goXG4gICAgICAgIFtcbiAgICAgICAgICBgPC8keyBuYW1lIH0+YCxcbiAgICAgICAgICBpZCA9PT0gbm9kZS5lbGVtZW50LmlkID8gU1RZTEVTLmN1cnJlbnQoaW5kKSA6IFNUWUxFUy5kZWZhdWx0KGluZClcbiAgICAgICAgXSxcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBsaW5lcztcbiAgfSkodHJlZSkpO1xuXG4gIGNvbnNvbGUuY2xlYXIoKTtcbiAgcHJpbnRMaW5lcy5mb3JFYWNoKGxpbmUgPT4ge1xuICAgIGNvbnNvbGUubG9nKGAlYyR7IGxpbmVbMF0gfWAsIGxpbmVbMV0pO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5zcGVjdG9yKHByb2Nlc3Nvcikge1xuICBjb25zdCBzbmFwc2hvdHMgPSBbXTtcblxuICBmdW5jdGlvbiBzbmFwc2hvdCh0eXBlLCBub2RlKSB7XG4gICAgc25hcHNob3RzLnB1c2goW1xuICAgICAgdHlwZSxcbiAgICAgIG5vZGUsXG4gICAgICBwcm9jZXNzb3Iuc3lzdGVtKCkudHJlZS5kaWFnbm9zZSgpXG4gICAgXSk7XG4gICAgcHJpbnRTbmFwc2hvdFRvQ29uc29sZShzbmFwc2hvdHNbc25hcHNob3RzLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG4gIHByb2Nlc3Nvci5vbk5vZGVFbnRlcihub2RlID0+IHNuYXBzaG90KEVOVEVSLCBub2RlKSk7XG4gIHByb2Nlc3Nvci5vbk5vZGVPdXQobm9kZSA9PiBzbmFwc2hvdChPVVQsIG5vZGUpKTtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShub2RlID0+IHNuYXBzaG90KFJFTU9WRSwgbm9kZSkpO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQyOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZvY3VzRmllbGQgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENoZWNrRm9yRWRpdEZpZWxkKHsgdG9kb3MgfSkge1xuICByZXR1cm4gPEZvY3VzRmllbGQgaW5kZXg9eyB0b2Rvcy5maW5kSW5kZXgoKHsgZWRpdGluZyB9KSA9PiBlZGl0aW5nKSB9IC8+O1xufVxuIiwiaW1wb3J0IHtcbiAgVE9HR0xFLFxuICBORVdfVE9ETyxcbiAgREVMRVRFLFxuICBFRElULFxuICBFRElUX1RPRE8sXG4gIENMRUFSX0NPTVBMRVRFRFxufSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCB7XG4gIEZJTFRFUl9BTEwsXG4gIEZJTFRFUl9BQ1RJVkUsXG4gIEZJTFRFUl9DT01QTEVURURcbn0gZnJvbSAnLi8nO1xuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuY29uc3QgJCA9IChzZWxlY3RvcikgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5jb25zdCBsaXN0ID0gJCgnLnRvZG8tbGlzdCcpO1xuY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuXG5jb25zdCBFTlRFUiA9IDEzO1xuY29uc3QgRVNDID0gMjc7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQ29udGFpbmVyKHsgY2hpbGRyZW4gfSkge1xuICBsaXN0LmlubmVySFRNTCA9IGNoaWxkcmVuKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdG9nZ2xlJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKFRPR0dMRSwgdG9kb0luZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWRlbGV0ZScpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihERUxFVEUsIHRvZG9JbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIChlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWxhYmVsJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEVESVQsIHRvZG9JbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpICYmIGUua2V5Q29kZSA9PT0gRU5URVIpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEVESVRfVE9ETywgeyBpbmRleDogdG9kb0luZGV4LCBsYWJlbDogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFU0MpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKEVESVQsIHRvZG9JbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmV3JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICBvblVzZXJBY3Rpb24oTkVXX1RPRE8sIGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgZS50YXJnZXQudmFsdWUgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgW10pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIEZvY3VzRmllbGQoeyBpbmRleCB9KSB7XG4gIGNvbnN0IGVsID0gJChgLmVkaXRbZGF0YS1pbmRleD1cIiR7IGluZGV4IH1cIl1gKTtcblxuICBpZiAoZWwpIHtcbiAgICBlbC5mb2N1cygpO1xuICAgIGVsLnNlbGVjdGlvblN0YXJ0ID0gZWwuc2VsZWN0aW9uRW5kID0gZWwudmFsdWUubGVuZ3RoO1xuICB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIFByb2dyZXNzQ2hlY2tlcih7IHRvZG9zIH0pIHtcbiAgY29uc3QgY29tcGxldGVkID0gdG9kb3MuZmlsdGVyKCh7IGNvbXBsZXRlZCB9KSA9PiBjb21wbGV0ZWQpLmxlbmd0aDtcbiAgY29uc3QgaXRlbXNMZWZ0ID0gdG9kb3MubGVuZ3RoIC0gY29tcGxldGVkO1xuXG4gICQoJ1tkYXRhLWNvdW50XScpLmlubmVySFRNTCA9IGBcbiAgICA8c3Ryb25nPiR7IGl0ZW1zTGVmdCB9PC9zdHJvbmc+ICR7IGl0ZW1zTGVmdCA+IDEgfHwgaXRlbXNMZWZ0ID09PSAwID8gJ2l0ZW1zJyA6ICdpdGVtJyB9IGxlZnRcbiAgYDtcbn07XG5leHBvcnQgZnVuY3Rpb24gRm9vdGVyKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAkKCdbZGF0YS1maWx0ZXJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hbGwnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0FMTCk7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0FDVElWRSk7XG4gICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1jb21wbGV0ZWQnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0NPTVBMRVRFRCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgJCgnW2RhdGEtY2xlYXItY29tcGxldGVkXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgb25Vc2VyQWN0aW9uKENMRUFSX0NPTVBMRVRFRCk7XG4gICAgfSk7XG4gIH0sIFtdKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlsdGVyT3B0aW9uc1RhYnMoeyBmaWx0ZXIgfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICQoJ1tkYXRhLWFsbF0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUxMID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgICAkKCdbZGF0YS1hY3RpdmVdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICAgJCgnW2RhdGEtY29tcGxldGVkXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQgPyAnc2VsZWN0ZWQnIDogJycpO1xuICB9LCBbIGZpbHRlciBdKTtcbn1cbiIsImltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgVG9EbyB9IGZyb20gJy4vU3RvcmUnO1xuXG5jb25zdCBpbml0aWFsVmFsdWUgPSBKU09OLnN0cmluZ2lmeShbXG4gIFRvRG8oeyBsYWJlbDogJ0FjdE1MIGlzIHVzaW5nIEpTWCcgfSksXG4gIFRvRG8oeyBsYWJlbDogJ0l0IGlzIGxpa2UgUmVhY3QgYnV0IG5vdCBmb3IgcmVuZGVyaW5nJyB9KVxuXSk7XG5cbmV4cG9ydCBjb25zdCB1c2VMb2NhbFN0b3JhZ2UgPSAoKSA9PiB7XG4gIGNvbnN0IFsgZ2V0RGF0YSBdID0gdXNlU3RhdGUoSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndG9kb3MnKSB8fCBpbml0aWFsVmFsdWUpKTtcblxuICByZXR1cm4gZ2V0RGF0YSgpO1xufTtcbmV4cG9ydCBjb25zdCBQZXJzaXN0ID0gKHsgdG9kb3MgfSkgPT4ge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9kb3MnLCBKU09OLnN0cmluZ2lmeSh0b2RvcykpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGaWxsQ29udGFpbmVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgRklMVEVSX0FMTCwgRklMVEVSX0FDVElWRSwgRklMVEVSX0NPTVBMRVRFRCB9IGZyb20gJy4vJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyZXIoeyB0b2RvcywgZmlsdGVyIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8RmlsbENvbnRhaW5lcj5cbiAgICAgIHtcbiAgICAgICAgKCkgPT4gdG9kb3NcbiAgICAgICAgLmZpbHRlcigoeyBjb21wbGV0ZWQgfSkgPT4ge1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BTEwpIHJldHVybiB0cnVlO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9BQ1RJVkUpIHJldHVybiAhY29tcGxldGVkO1xuICAgICAgICAgIGlmIChmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQpIHJldHVybiBjb21wbGV0ZWQ7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KS5tYXAoKHRvZG8sIGkpID0+IHtcbiAgICAgICAgICBjb25zdCBsaUNsYXNzID0gdG9kby5lZGl0aW5nID8gJ2VkaXRpbmcnIDogKHRvZG8uY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJyk7XG5cbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPSckeyBsaUNsYXNzIH0nPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtdG9nZ2xlXG4gICAgICAgICAgICAgICAgICAkeyB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnIH0+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWxhYmVsPiR7IHRvZG8ubGFiZWwgfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkZXN0cm95XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS1kZWxldGU+PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZGl0XCIgdmFsdWU9XCIkeyB0b2RvLmxhYmVsIH1cIiBkYXRhLWluZGV4PVwiJHsgaSB9XCIgZGF0YS1lZGl0PlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICBgO1xuICAgICAgICB9KS5qb2luKCcnKVxuICAgICAgfVxuICAgIDwvRmlsbENvbnRhaW5lcj5cbiAgKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyB1c2VSZWR1Y2VyLCB1c2VQdWJTdWIsIHVzZUVmZmVjdCB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmV4cG9ydCBjb25zdCBUT0dHTEUgPSAnVE9HR0xFJztcbmV4cG9ydCBjb25zdCBORVdfVE9ETyA9ICdORVdfVE9ETyc7XG5leHBvcnQgY29uc3QgREVMRVRFID0gJ0RFTEVURSc7XG5leHBvcnQgY29uc3QgRURJVCA9ICdFRElUJztcbmV4cG9ydCBjb25zdCBFRElUX1RPRE8gPSAnRURJVF9UT0RPJztcbmV4cG9ydCBjb25zdCBDTEVBUl9DT01QTEVURUQgPSAnQ0xFQVJfQ09NUExFVEVEJztcblxuY29uc3QgdG9nZ2xlID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogVE9HR0xFLCB0b2RvSW5kZXggfSk7XG5jb25zdCBkZWxldGVUb2RvID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogREVMRVRFLCB0b2RvSW5kZXggfSk7XG5jb25zdCBuZXdUb2RvID0gKGxhYmVsKSA9PiAoeyB0eXBlOiBORVdfVE9ETywgbGFiZWwgfSk7XG5jb25zdCBlZGl0ID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogRURJVCwgdG9kb0luZGV4IH0pO1xuY29uc3QgZWRpdFRvRG8gPSAoeyBpbmRleCwgbGFiZWwgfSkgPT4gKHsgdHlwZTogRURJVF9UT0RPLCBpbmRleCwgbGFiZWwgfSk7XG5jb25zdCBjbGVhckNvbXBsZXRlZCA9ICgpID0+ICh7IHR5cGU6IENMRUFSX0NPTVBMRVRFRCB9KTtcblxuZXhwb3J0IGNvbnN0IFRvRG8gPSAoeyBsYWJlbCB9KSA9PiAoeyBsYWJlbCwgY29tcGxldGVkOiBmYWxzZSwgZWRpdGluZzogZmFsc2UgfSk7XG5cbmNvbnN0IHJlZHVjZXIgPSBmdW5jdGlvbiAodG9kb3MsIGFjdGlvbikge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBUT0dHTEU6XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi50b2RvSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGNvbXBsZXRlZDogIXRvZG8uY29tcGxldGVkXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVDpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgZWRpdGluZzogIXRvZG8uZWRpdGluZ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICBjYXNlIEVESVRfVE9ETzpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLmluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBsYWJlbDogYWN0aW9uLmxhYmVsLFxuICAgICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBORVdfVE9ETzpcbiAgICAgIHJldHVybiBbIC4uLnRvZG9zLCBUb0RvKHsgbGFiZWw6IGFjdGlvbi5sYWJlbCB9KSBdO1xuICAgIGNhc2UgREVMRVRFOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbywgaW5kZXgpID0+IGluZGV4ICE9PSBhY3Rpb24udG9kb0luZGV4KTtcbiAgICBjYXNlIENMRUFSX0NPTVBMRVRFRDpcbiAgICAgIHJldHVybiB0b2Rvcy5maWx0ZXIoKHRvZG8pID0+ICF0b2RvLmNvbXBsZXRlZCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0b2RvcztcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RvcmUoeyBpbml0aWFsVmFsdWUsIGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgWyB0b2RvcywgZGlzcGF0Y2ggXSA9IHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFZhbHVlKTtcbiAgY29uc3QgeyBzdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3Vic2NyaWJlKFRPR0dMRSwgKHRvZG9JbmRleCkgPT4gZGlzcGF0Y2godG9nZ2xlKHRvZG9JbmRleCkpKTtcbiAgICBzdWJzY3JpYmUoTkVXX1RPRE8sIChsYWJlbCkgPT4gZGlzcGF0Y2gobmV3VG9kbyhsYWJlbCkpKTtcbiAgICBzdWJzY3JpYmUoREVMRVRFLCAodG9kb0luZGV4KSA9PiBkaXNwYXRjaChkZWxldGVUb2RvKHRvZG9JbmRleCkpKTtcbiAgICBzdWJzY3JpYmUoRURJVCwgKGxhYmVsKSA9PiBkaXNwYXRjaChlZGl0KGxhYmVsKSkpO1xuICAgIHN1YnNjcmliZShFRElUX1RPRE8sIChwYXlsb2FkKSA9PiBkaXNwYXRjaChlZGl0VG9EbyhwYXlsb2FkKSkpO1xuICAgIHN1YnNjcmliZShDTEVBUl9DT01QTEVURUQsICgpID0+IGRpc3BhdGNoKGNsZWFyQ29tcGxldGVkKCkpKTtcbiAgfSwgW10pO1xuXG4gIGNoaWxkcmVuKHsgdG9kb3M6IHRvZG9zKCkgfSk7XG59XG4iLCIvKiogQGpzeCBBICovXG5pbXBvcnQgeyBBLCBydW4sIEZyYWdtZW50LCB1c2VQdWJTdWIsIHVzZVN0YXRlLCB1c2VFZmZlY3QsIHByb2Nlc3NvciB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5pbXBvcnQgaW5zcGVjdG9yIGZyb20gJy4uLy4uLy4uL3BhY2thZ2VzL2luc3BlY3Rvcic7XG5cbmluc3BlY3Rvcihwcm9jZXNzb3IpO1xuXG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgQ2hlY2tGb3JFZGl0RmllbGQgZnJvbSAnLi9DaGVja0ZvckVkaXRGaWVsZCc7XG5pbXBvcnQgeyBQcm9ncmVzc0NoZWNrZXIsIEZpbHRlck9wdGlvbnNUYWJzLCBDb250YWluZXIsIEZvb3RlciB9IGZyb20gJy4vRE9NJztcbmltcG9ydCB7IHVzZUxvY2FsU3RvcmFnZSwgUGVyc2lzdCB9IGZyb20gJy4vUGVyc2lzdCc7XG5cbmV4cG9ydCBjb25zdCBGSUxURVJfQUxMID0gJ0ZJTFRFUl9BTEwnO1xuZXhwb3J0IGNvbnN0IEZJTFRFUl9BQ1RJVkUgPSAnRklMVEVSX0FDVElWRSc7XG5leHBvcnQgY29uc3QgRklMVEVSX0NPTVBMRVRFRCA9ICdGSUxURVJfQ09NUExFVEVEJztcblxuZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCBpbml0aWFsVmFsdWUgPSB1c2VMb2NhbFN0b3JhZ2UoKTtcbiAgY29uc3QgeyBwdWJsaXNoLCBzdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuICBjb25zdCBbIGZpbHRlciwgc2V0RmlsdGVyIF0gPSB1c2VTdGF0ZShGSUxURVJfQUxMKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHN1YnNjcmliZShGSUxURVJfQUxMLCAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0FMTCkpO1xuICAgIHN1YnNjcmliZShGSUxURVJfQUNUSVZFLCAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0FDVElWRSkpO1xuICAgIHN1YnNjcmliZShGSUxURVJfQ09NUExFVEVELCAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0NPTVBMRVRFRCkpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8Q29udGFpbmVyIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfSAvPlxuICAgICAgPEZvb3RlciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0vPlxuICAgICAgPFN0b3JlIGluaXRpYWxWYWx1ZT17IGluaXRpYWxWYWx1ZSB9PlxuICAgICAgICA8RmlsdGVyT3B0aW9uc1RhYnMgZmlsdGVyPXsgZmlsdGVyKCkgfSAvPlxuICAgICAgICA8UmVuZGVyZXIgZmlsdGVyPXsgZmlsdGVyKCkgfS8+XG4gICAgICAgIDxDaGVja0ZvckVkaXRGaWVsZCAvPlxuICAgICAgICA8UHJvZ3Jlc3NDaGVja2VyIC8+XG4gICAgICAgIDxQZXJzaXN0IC8+XG4gICAgICA8L1N0b3JlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuXG5ydW4oPEFwcCAvPik7XG4iXSwic291cmNlUm9vdCI6IiJ9