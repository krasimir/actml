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
    in: function _in() {
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
    node.in();

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
    onNodeIn: function onNodeIn(callback) {
      tree.addNodeInCallback(callback);
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
  var onNodeIn = [];
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
      in: function _in() {
        var _this = this;

        log('-> ' + this.element.name);
        this.element.in();
        onNodeIn.forEach(function (c) {
          return c(_this);
        });

        if (true) {
          node.log('node:in');
        }
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

        if (true) {
          node.log('node:out');
        }

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
          meta: meta,
          time: performance.now()
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
    addNodeInCallback: function addNodeInCallback(callback) {
      onNodeIn.push(callback);
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
      if (true) node.log('useEffect:fired');
    }
  } else {
    var areEqual = depsEqual(oldDeps, deps);

    if (!areEqual) {
      effect.cleanUp = callback();
      if (true) node.log('useEffect:fired');
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
      if (true) node.log('useState:set', newState);
      storage.states[index] = newState;

      if (!element.isRunning()) {
        if (true) node.log('useState:rerun');
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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process, module) {/* harmony import */ var _helpers_sanitize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/sanitize */ "../../packages/inspector/helpers/sanitize.js");
const IN = 'IN';
const OUT = 'OUT';
const REMOVE = 'REMOVE';

const isRunningInNode = typeof process !== 'undefined' && typeof process.release !== 'undefined' && process.release.name === 'node';

const trim = (str, len, emp = '...') => str.length > len ? str.substr(0, len) + emp : str;

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

    return `(${trim(JSON.stringify(Object(_helpers_sanitize__WEBPACK_IMPORTED_MODULE_0__["default"])(meta)), 50)})`;
  }

  return `(${typeof meta})`;
};

const print = {
  entrance: (what, ind) => {
    if (!isRunningInNode) {
      return [null, `%c${what}`, 'color: #b0b0b0;' + getIndMargin(ind)];
    }

    return [null, '\x1b[38m%s\x1b[0m', `${getIndSpaces(ind) + what}`];
  },
  default: (what, ind) => {
    if (!isRunningInNode) {
      return [null, `%c${what}`, getIndMargin(ind)];
    }

    return [null, `${getIndSpaces(ind) + what}`];
  },
  hook: (what, ind, time) => {
    if (!isRunningInNode) {
      return [time, `%c${what}`, 'color: #999;' + getIndMargin(ind)];
    }

    return [time, '\x1b[34m%s\x1b[0m', `${getIndSpaces(ind) + what}`];
  },
  current: (what, ind) => {
    if (!isRunningInNode) {
      return [null, `%c${what}`, 'font-weight: bold; border: solid 1px #999; border-radius: 2px; padding: 1px 0;' + getIndMargin(ind)];
    }

    return [null, getIndSpaces(ind) + `\x1b[100m${what}\x1b[0m`];
  }
};

function printSnapshotToConsole(snapshot) {
  const [type, node, tree] = snapshot;
  let printLines = [print.entrance('', 0)];
  printLines = printLines.concat(function loop({
    id,
    ind,
    name,
    used,
    children,
    logs
  }) {
    let lines = [];
    let elementOpenTag = `<${name}${used > 0 ? `(${used})` : ''}>`;
    lines.push(id === node.element.id ? print.current(elementOpenTag, ind) : print.default(elementOpenTag, ind));

    if (logs && logs.length > 0) {
      lines = lines.concat(logs.map(({
        type,
        meta,
        time
      }) => {
        return print.hook(`⤷ ${type}${parseLogMeta(meta)}`, ind, time);
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

  const sortedHookTimes = printLines.filter(([time]) => time !== null).map(([time]) => time).sort((a, b) => a > b ? 1 : -1);
  printLines.forEach(([time, ...line]) => {
    if (sortedHookTimes.length > 0 && time) {
      console.log(...line, sortedHookTimes.findIndex(t => t === time));
    } else {
      console.log(...line);
    }
  });
}

module.exports = {
  watch(processor) {
    const snapshots = [];

    function snapshot(type, node) {
      snapshots.push([type, {
        element: {
          id: node.element.id
        }
      }, processor.system().tree.diagnose()]);
      printSnapshotToConsole(snapshots[snapshots.length - 1]);
    } // processor.onNodeIn(node => snapshot(IN, node));


    processor.onNodeOut(node => snapshot(OUT, node)); // processor.onNodeRemove(node => snapshot(REMOVE, node));
  },

  printSnapshotToConsole(snapshots) {
    snapshots.forEach(printSnapshotToConsole);
  }

};
module.default = {};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../examples/todomvc/node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../examples/todomvc/node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

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

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


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


_packages_inspector__WEBPACK_IMPORTED_MODULE_2__["default"].watch(_lib__WEBPACK_IMPORTED_MODULE_1__["processor"]);





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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1F1ZXVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUHViU3ViLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVN0YXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi91dGlscy9pc0FjdE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2hlbHBlcnMvc2FuaXRpemUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9DaXJjdWxhckpTT04uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9TZXJpYWxpemVFcnJvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vaGFybW9ueS1tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BlcnNpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJnZXRGdW5jTmFtZSIsImZ1bmMiLCJuYW1lIiwicmVzdWx0IiwiZXhlYyIsInRvU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJFcnJvciIsIl9fYWN0bWwiLCJfX3VzZWQiLCJfX3J1bm5pbmciLCJpZCIsImluaXRpYWxpemUiLCJ1c2VkIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwibWVyZ2VQcm9wcyIsIm5ld1Byb3BzIiwiYXNzaWduIiwiaXNSdW5uaW5nIiwiaW4iLCJfaW4iLCJjb25zdW1lIiwib3V0IiwiZGVmYXVsdCIsImNyZWF0ZUNvbnRleHRGYWN0b3J5IiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwia2V5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiQ09OVEVYVF9LRVkiLCJQVUJMSUNfQ09OVEVYVF9LRVkiLCJpZHMiLCJnZXRJZCIsInJlc29sdmVDb250ZXh0Iiwibm9kZSIsInN0YWNrIiwicHVzaCIsImVsZW1lbnQiLCJwYXJlbnQiLCJjb25zb2xlIiwid2FybiIsIm1hcCIsImpvaW4iLCJwcm9jZXNzb3IiLCJjcmVhdGVDb250ZXh0IiwiaW5pdGlhbFZhbHVlIiwiX3JlZjMiLCJQcm92aWRlciIsIl9yZWYiLCJDb25zdW1lciIsIl9yZWYyIiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3VzZUVmZmVjdCIsIl91c2VFZmZlY3QyIiwiX1F1ZXVlIiwiX1F1ZXVlMiIsIl9fZXNNb2R1bGUiLCJDSElMRFJFTiIsIkNPTlNVTUUiLCJQUk9DRVNTX1JFU1VMVCIsIlJFVFVSTkVEX0VMRU1FTlQiLCJDSElMRCIsImlzR2VuZXJhdG9yIiwiaXNQcm9taXNlIiwiY3JlYXRlQ2hpbGRyZW5GdW5jIiwicHJvY2Vzc05vZGUiLCJmIiwiX2FyZ3VtZW50cyIsInF1ZXVlSXRlbXNUb0FkZCIsInJlc3VsdHMiLCJjaGlsZHJlblF1ZXVlIiwiX2xvb3AiLCJpIiwiX2NoaWxkcmVuJGkiLCJhcHBseSIsImFkZENoaWxkTm9kZSIsImZ1bmNSZXN1bHQiLCJyZXZlcnNlIiwiZm9yRWFjaCIsInByZXBlbmRJdGVtIiwiciIsInByb2Nlc3MiLCJvbkRvbmUiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJyZXJ1biIsInF1ZXVlIiwiYWRkIiwiY29uc3VtcHRpb24iLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwiZ2VuZXJhdG9yRG9uZSIsImdlblJlc3VsdCIsIml0ZXJhdGUiLCJuZXh0IiwiZG9uZSIsInJlcyIsInRoZW4iLCJfcmVzIiwicnVuIiwicm9vdE5vZGUiLCJyZXNvbHZlUm9vdCIsIm9uTm9kZUluIiwiY2FsbGJhY2siLCJhZGROb2RlSW5DYWxsYmFjayIsIm9uTm9kZU91dCIsImFkZE5vZGVPdXRDYWxsYmFjayIsIm9uTm9kZVJlbW92ZSIsInN5c3RlbSIsInJlc2V0IiwiY2xlYXIiLCJjcmVhdGVRdWV1ZSIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImFycjIiLCJmcm9tIiwiTE9HUyIsImxvZyIsIl9jb25zb2xlIiwiY3JlYXRlSXRlbSIsInR5cGUiLCJjb250ZXh0IiwiaXRlbXMiLCJhc3luYyIsInJ1bm5pbmciLCJyZWxlYXNlIiwiY29uY2F0IiwibGFzdFJlc3VsdCIsIl90aGlzIiwiaXRlbSIsInNoaWZ0IiwiYXN5bmNSZXN1bHQiLCJjYXRjaCIsImVycm9yIiwiZ2V0UmVzdWx0IiwicmVqZWN0IiwiX2V4dGVuZHMiLCJ0YXJnZXQiLCJzb3VyY2UiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJUcmVlIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwia2V5cyIsImluZGV4T2YiLCJfb25Ob2RlUmVtb3ZlIiwicm9vdCIsImNyZWF0ZU5ld05vZGUiLCJ1c2VTYW1lTm9kZSIsIm5ld0VsZW1lbnQiLCJ0cmVlRGlmZiIsIm9sZEVsZW1lbnQiLCJjdXJzb3IiLCJjIiwiX19ERVZfXyIsIl90aGlzMiIsInNwbGljZSIsInJlbW92ZWROb2RlIiwibG9ncyIsIl90aGlzMyIsImNoaWxkTm9kZSIsIm5ld0NoaWxkTm9kZSIsIm1ldGEiLCJ0aW1lIiwicGVyZm9ybWFuY2UiLCJub3ciLCJnZXROdW1PZkVsZW1lbnRzIiwiZGlhZ25vc2UiLCJsb29wT3ZlciIsImluZCIsInJlc3QiLCJjaGlsZCIsIl9pc1ZhbGlkSG9va0NvbnRleHQiLCJfaXNWYWxpZEhvb2tDb250ZXh0MiIsIl9Db250ZXh0IiwiY3JlYXRlVXNlRWxlbWVudEhvb2siLCJDb250ZXh0IiwiX2Zhc3REZWVwRXF1YWwiLCJfZmFzdERlZXBFcXVhbDIiLCJTdG9yYWdlIiwiZWxlbWVudHMiLCJnZXQiLCJlZmZlY3RzIiwiY29uc3VtZXIiLCJjbGVhblVwIiwiY3JlYXRlRWZmZWN0IiwiZGVwcyIsInVwZGF0ZUVmZmVjdCIsImVmZmVjdCIsIm9sZERlcHMiLCJkZXBzRXF1YWwiLCJuZXdEZXBzIiwicmVzb2x2ZUVmZmVjdCIsImFyZUVxdWFsIiwiY3JlYXRlVXNlRWZmZWN0SG9vayIsInN0b3JhZ2UiLCJpbmRleCIsImNyZWF0ZVVzZVB1YlN1Ykhvb2siLCJzdWJzY3JpYmVycyIsInN1YnNjcmliZSIsInB1Ymxpc2giLCJwYXlsb2FkIiwic2NvcGVkRWxlbWVudCIsImVsIiwic3Vic2NyaWJlRnVuYyIsIl9sZW4iLCJwYXJhbXMiLCJfa2V5IiwicHVibGlzaEZ1bmMiLCJfbGVuMiIsIl9rZXkyIiwiX3NsaWNlZFRvQXJyYXkiLCJzbGljZUl0ZXJhdG9yIiwiX2FyciIsIl9uIiwiX2QiLCJfZSIsIl9pIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJfcyIsImVyciIsIlR5cGVFcnJvciIsImNyZWF0ZVVzZVJlZHVjZXJIb29rIiwiY3JlYXRlRGlzcGF0Y2hFbGVtZW50IiwiZGlzcGF0Y2giLCJhY3Rpb24iLCJwcm9wc1RvQWN0aW9uIiwidXNlU3RhdGUiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsImNyZWF0ZVVzZVN0YXRlSG9vayIsInN0YXRlcyIsIm5ld1N0YXRlIiwiaXNWYWxpZEhvb2tDb250ZXh0IiwiY3JlYXRlUnVudGltZSIsIl9Qcm9jZXNzb3IiLCJfUHJvY2Vzc29yMiIsIl9BY3RFbGVtZW50IiwiX0FjdEVsZW1lbnQyIiwiX3VzZUVsZW1lbnQiLCJfdXNlRWxlbWVudDIiLCJfdXNlUmVkdWNlciIsIl91c2VSZWR1Y2VyMiIsIl91c2VDb250ZXh0IiwiX3VzZUNvbnRleHQyIiwiX0NvbnRleHQyIiwiQSIsIkZyYWdtZW50IiwidXNlRWxlbWVudCIsInVzZVB1YlN1YiIsInVzZVJlZHVjZXIiLCJ1c2VFZmZlY3QiLCJ1c2VDb250ZXh0IiwicnVudGltZSIsIm1vZHVsZSIsImlzQWN0TUxFbGVtZW50Iiwic3RyaW5naWZ5IiwiQ2lyY3VsYXJKU09OIiwic2FuaXRpemUiLCJzb21ldGhpbmciLCJzaG93RXJyb3JJbkNvbnNvbGUiLCJKU09OIiwicGFyc2UiLCJTZXJpYWxpemVFcnJvciIsInNwZWNpYWxDaGFyIiwic2FmZVNwZWNpYWxDaGFyIiwiY2hhckNvZGVBdCIsInNsaWNlIiwiZXNjYXBlZFNhZmVTcGVjaWFsQ2hhciIsInNwZWNpYWxDaGFyUkciLCJSZWdFeHAiLCJzYWZlU3BlY2lhbENoYXJSRyIsInNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHIiwidiIsIiRTdHJpbmciLCJTdHJpbmciLCJnZW5lcmF0ZVJlcGxhY2VyIiwicmVwbGFjZXIiLCJyZXNvbHZlIiwiaW5zcGVjdCIsInBhdGgiLCJhbGwiLCJzZWVuIiwibWFwcCIsImxhc3QiLCJsdmwiLCJmbiIsInJlcGxhY2UiLCJyZXRyaWV2ZUZyb21QYXRoIiwiY3VycmVudCIsImdlbmVyYXRlUmV2aXZlciIsInJldml2ZXIiLCJpc1N0cmluZyIsImNoYXJBdCIsInJlZ2VuZXJhdGUiLCJyZWdlbmVyYXRlQXJyYXkiLCJyZXRyaWV2ZSIsInJlZ2VuZXJhdGVPYmplY3QiLCJzcGxpdCIsInN0cmluZ2lmeVJlY3Vyc2lvbiIsInNwYWNlIiwiZG9Ob3RSZXNvbHZlIiwicGFyc2VSZWN1cnNpb24iLCJ0ZXh0IiwiZGVzdHJveUNpcmN1bGFyIiwidG8iLCJtZXNzYWdlIiwiSU4iLCJPVVQiLCJSRU1PVkUiLCJpc1J1bm5pbmdJbk5vZGUiLCJ0cmltIiwic3RyIiwibGVuIiwiZW1wIiwic3Vic3RyIiwiZ2V0SW5kTWFyZ2luIiwiZ2V0SW5kU3BhY2VzIiwieCIsInBhcnNlTG9nTWV0YSIsInByaW50IiwiZW50cmFuY2UiLCJ3aGF0IiwiaG9vayIsInByaW50U25hcHNob3RUb0NvbnNvbGUiLCJzbmFwc2hvdCIsInByaW50TGluZXMiLCJsb29wIiwibGluZXMiLCJlbGVtZW50T3BlblRhZyIsInNvcnRlZEhvb2tUaW1lcyIsImZpbHRlciIsInNvcnQiLCJhIiwiYiIsImxpbmUiLCJmaW5kSW5kZXgiLCJ0Iiwid2F0Y2giLCJzbmFwc2hvdHMiLCJDaGVja0ZvckVkaXRGaWVsZCIsInRvZG9zIiwiZWRpdGluZyIsIiQiLCJzZWxlY3RvciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImxpc3QiLCJoZWFkZXIiLCJFTlRFUiIsIkVTQyIsIkZpbGxDb250YWluZXIiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJvblVzZXJBY3Rpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRvZG9JbmRleCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiVE9HR0xFIiwiREVMRVRFIiwiRURJVCIsIkVESVRfVE9ETyIsImxhYmVsIiwia2V5Q29kZSIsIk5FV19UT0RPIiwiRm9jdXNGaWVsZCIsImZvY3VzIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJQcm9ncmVzc0NoZWNrZXIiLCJjb21wbGV0ZWQiLCJpdGVtc0xlZnQiLCJGb290ZXIiLCJGSUxURVJfQUxMIiwiRklMVEVSX0FDVElWRSIsIkZJTFRFUl9DT01QTEVURUQiLCJDTEVBUl9DT01QTEVURUQiLCJGaWx0ZXJPcHRpb25zVGFicyIsInNldEF0dHJpYnV0ZSIsIlRvRG8iLCJ1c2VMb2NhbFN0b3JhZ2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiZ2V0RGF0YSIsIlBlcnNpc3QiLCJzZXRJdGVtIiwiUmVuZGVyZXIiLCJ0b2RvIiwibGlDbGFzcyIsInRvZ2dsZSIsImRlbGV0ZVRvZG8iLCJuZXdUb2RvIiwiZWRpdCIsImVkaXRUb0RvIiwiY2xlYXJDb21wbGV0ZWQiLCJTdG9yZSIsImluc3BlY3RvciIsIkFwcCIsInNldEZpbHRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYkEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUMzQ0MsT0FBSyxFQUFFO0FBRG9DLENBQTdDOztBQUdBLFNBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLE1BQUlBLElBQUksQ0FBQ0MsSUFBVCxFQUFlLE9BQU9ELElBQUksQ0FBQ0MsSUFBWjtBQUNmLE1BQUlDLE1BQU0sR0FB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QUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFD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QURGO0FBYUQ7O0FBQUE7QUFFRDlPLGdEQUFHLENBQUMsK0NBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gZ2V0RnVuY05hbWUoZnVuYykge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuICB2YXIgcmVzdWx0ID0gL15mdW5jdGlvblxccysoW1xcd1xcJF0rKVxccypcXCgvLmV4ZWMoZnVuYy50b1N0cmluZygpKTtcblxuICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0WzFdIDogJ3Vua25vd24nO1xufTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0cyBhIGZ1bmN0aW9uLiBcIicgKyBmdW5jICsgJ1wiIGdpdmVuIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIF9fdXNlZDogMCxcbiAgICBfX3J1bm5pbmc6IGZhbHNlLFxuICAgIGlkOiBudWxsLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICBuYW1lOiBnZXRGdW5jTmFtZShmdW5jKSxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShpZCkge1xuICAgICAgdmFyIHVzZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHRoaXMuX191c2VkID0gdXNlZDtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfSxcbiAgICBtZXJnZVByb3BzOiBmdW5jdGlvbiBtZXJnZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIH0sXG4gICAgdXNlZDogZnVuY3Rpb24gdXNlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fdXNlZDtcbiAgICB9LFxuICAgIGlzUnVubmluZzogZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19ydW5uaW5nO1xuICAgIH0sXG4gICAgaW46IGZ1bmN0aW9uIF9pbigpIHtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNvbnN1bWU6IGZ1bmN0aW9uIGNvbnN1bWUoKSB7XG4gICAgICByZXR1cm4gZnVuYyh0aGlzLnByb3BzKTtcbiAgICB9LFxuICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgdGhpcy5fX3VzZWQgKz0gMTtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlRWxlbWVudDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVDb250ZXh0RmFjdG9yeTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbnZhciBDT05URVhUX0tFWSA9ICdfX0NPTlRFWFRfS0VZX18nO1xuXG52YXIgUFVCTElDX0NPTlRFWFRfS0VZID0gZXhwb3J0cy5QVUJMSUNfQ09OVEVYVF9LRVkgPSAnX19QVUJMSUNfQ09OVEVYVF9LRVlfXyc7XG5cbnZhciBpZHMgPSAwO1xuXG5mdW5jdGlvbiBnZXRJZCgpIHtcbiAgcmV0dXJuICdjJyArICsraWRzO1xufTtcbmZ1bmN0aW9uIHJlc29sdmVDb250ZXh0KG5vZGUsIGlkKSB7XG4gIHZhciBzdGFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG5cbiAgc3RhY2sucHVzaChub2RlLmVsZW1lbnQubmFtZSk7XG4gIGlmIChub2RlW0NPTlRFWFRfS0VZXSAmJiBpZCBpbiBub2RlW0NPTlRFWFRfS0VZXSkge1xuICAgIHJldHVybiBub2RlW0NPTlRFWFRfS0VZXVtpZF07XG4gIH0gZWxzZSBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICByZXR1cm4gcmVzb2x2ZUNvbnRleHQobm9kZS5wYXJlbnQsIGlkLCBzdGFjayk7XG4gIH1cbiAgY29uc29sZS53YXJuKCdBIGNvbnRleHQgY29uc3VtZXIgaXMgdXNlZCB3aXRoIG5vIHByb3ZpZGVyLlxcbiAgU3RhY2s6XFxuJyArIHN0YWNrLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAnICAgIDwnICsgbmFtZSArICc+JztcbiAgfSkuam9pbignXFxuJykpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0RmFjdG9yeShwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoaW5pdGlhbFZhbHVlKSB7XG4gICAgdmFyIF9yZWYzO1xuXG4gICAgdmFyIGlkID0gZ2V0SWQoKTtcblxuICAgIHZhciBQcm92aWRlciA9IGZ1bmN0aW9uIFByb3ZpZGVyKF9yZWYpIHtcbiAgICAgIHZhciB2YWx1ZSA9IF9yZWYudmFsdWUsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuXG4gICAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICAgIGlmICghbm9kZVtDT05URVhUX0tFWV0pIHtcbiAgICAgICAgbm9kZVtDT05URVhUX0tFWV0gPSB7fTtcbiAgICAgIH1cbiAgICAgIG5vZGVbQ09OVEVYVF9LRVldW2lkXSA9IHZhbHVlO1xuXG4gICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfTtcbiAgICB2YXIgQ29uc3VtZXIgPSBmdW5jdGlvbiBDb25zdW1lcihfcmVmMikge1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3JlZjIuY2hpbGRyZW47XG5cbiAgICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgICAgY2hpbGRyZW4ocmVzb2x2ZUNvbnRleHQobm9kZSwgaWQpIHx8IGluaXRpYWxWYWx1ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBfcmVmMyA9IHt9LCBfZGVmaW5lUHJvcGVydHkoX3JlZjMsIFBVQkxJQ19DT05URVhUX0tFWSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgICByZXR1cm4gcmVzb2x2ZUNvbnRleHQobm9kZSwgaWQpIHx8IGluaXRpYWxWYWx1ZTtcbiAgICB9KSwgX2RlZmluZVByb3BlcnR5KF9yZWYzLCAnUHJvdmlkZXInLCBQcm92aWRlciksIF9kZWZpbmVQcm9wZXJ0eShfcmVmMywgJ0NvbnN1bWVyJywgQ29uc3VtZXIpLCBfcmVmMztcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUHJvY2Vzc29yO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50ID0gcmVxdWlyZSgnLi91dGlscy9pc0FjdE1MRWxlbWVudCcpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQWN0TUxFbGVtZW50KTtcblxudmFyIF9UcmVlID0gcmVxdWlyZSgnLi9UcmVlJyk7XG5cbnZhciBfVHJlZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9UcmVlKTtcblxudmFyIF91c2VQdWJTdWIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVB1YlN1YicpO1xuXG52YXIgX3VzZVB1YlN1YjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQdWJTdWIpO1xuXG52YXIgX3VzZVN0YXRlID0gcmVxdWlyZSgnLi9ob29rcy91c2VTdGF0ZScpO1xuXG52YXIgX3VzZVN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVN0YXRlKTtcblxudmFyIF91c2VFZmZlY3QgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVmZmVjdCcpO1xuXG52YXIgX3VzZUVmZmVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VFZmZlY3QpO1xuXG52YXIgX1F1ZXVlID0gcmVxdWlyZSgnLi9RdWV1ZScpO1xuXG52YXIgX1F1ZXVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1F1ZXVlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIGNvbnNpc3RlbnQtcmV0dXJuICovXG52YXIgQ0hJTERSRU4gPSAnX19BQ1RNTF9DSElMRFJFTl9fJztcblxudmFyIENPTlNVTUUgPSAnQ09OU1VNRSc7XG52YXIgUFJPQ0VTU19SRVNVTFQgPSAnUFJPQ0VTU19SRVNVTFQnO1xudmFyIFJFVFVSTkVEX0VMRU1FTlQgPSAnUkVUVVJORURfRUxFTUVOVCc7XG52YXIgQ0hJTEQgPSAnQ0hJTEQnO1xuXG52YXIgaXNHZW5lcmF0b3IgPSBmdW5jdGlvbiBpc0dlbmVyYXRvcihvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqWyduZXh0J10gPT09ICdmdW5jdGlvbic7XG59O1xudmFyIGlzUHJvbWlzZSA9IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqWyd0aGVuJ10gPT09ICdmdW5jdGlvbic7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDaGlsZHJlbkZ1bmMobm9kZSwgcHJvY2Vzc05vZGUpIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiBmKCkge1xuICAgIHZhciBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuZWxlbWVudC5jaGlsZHJlbjtcblxuXG4gICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBxdWV1ZUl0ZW1zVG9BZGQgPSBbXTtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB2YXIgY2hpbGRyZW5RdWV1ZSA9ICgwLCBfUXVldWUyLmRlZmF1bHQpKCcgICcgKyBub2RlLmVsZW1lbnQubmFtZSArICc6Y2hpbGRyZW4nKTtcblxuICAgICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSkge1xuICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoY2hpbGRyZW5baV0pKSB7XG4gICAgICAgICAgdmFyIF9jaGlsZHJlbiRpO1xuXG4gICAgICAgICAgKF9jaGlsZHJlbiRpID0gY2hpbGRyZW5baV0pLm1lcmdlUHJvcHMuYXBwbHkoX2NoaWxkcmVuJGksIF9hcmd1bWVudHMpO1xuICAgICAgICAgIHF1ZXVlSXRlbXNUb0FkZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjaGlsZHJlbltpXSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjaGlsZHJlbltpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBmdW5jUmVzdWx0ID0gY2hpbGRyZW5baV0uYXBwbHkoY2hpbGRyZW4sIF9hcmd1bWVudHMpO1xuXG4gICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmNSZXN1bHQpKSB7XG4gICAgICAgICAgICBxdWV1ZUl0ZW1zVG9BZGQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShmdW5jUmVzdWx0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGZ1bmNSZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF9sb29wKGkpO1xuICAgICAgfVxuICAgICAgcXVldWVJdGVtc1RvQWRkLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIGNoaWxkcmVuUXVldWUucHJlcGVuZEl0ZW0oQ0hJTEQsIGZ1bmMsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHMucHVzaChyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNoaWxkcmVuUXVldWUucHJvY2VzcygpO1xuICAgICAgcmV0dXJuIGNoaWxkcmVuUXVldWUub25Eb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZltDSElMRFJFTl0gPSB0cnVlO1xuICByZXR1cm4gZjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvY2Vzc29yKCkge1xuICB2YXIgdHJlZSA9ICgwLCBfVHJlZTIuZGVmYXVsdCkoKTtcbiAgdmFyIGN1cnJlbnROb2RlID0gbnVsbDtcblxuICB2YXIgcHJvY2Vzc05vZGUgPSBmdW5jdGlvbiBwcm9jZXNzTm9kZShub2RlKSB7XG4gICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgIG5vZGUuaW4oKTtcbiAgICBub2RlLnJlcnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgIH07XG4gICAgbm9kZS5lbGVtZW50Lm1lcmdlUHJvcHMoe1xuICAgICAgY2hpbGRyZW46IGNyZWF0ZUNoaWxkcmVuRnVuYyhub2RlLCBwcm9jZXNzTm9kZSlcbiAgICB9KTtcblxuICAgIHZhciByZXN1bHRzID0ge307XG4gICAgdmFyIHF1ZXVlID0gKDAsIF9RdWV1ZTIuZGVmYXVsdCkoJyAnICsgbm9kZS5lbGVtZW50Lm5hbWUpO1xuXG4gICAgLy8gQ09OU1VNRVxuICAgIHF1ZXVlLmFkZChDT05TVU1FLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9kZS5lbGVtZW50LmNvbnN1bWUoKTtcbiAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0c1tDT05TVU1FXSA9IHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8vIFBST0NFU1NfUkVTVUxUXG4gICAgcXVldWUuYWRkKFBST0NFU1NfUkVTVUxULCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29uc3VtcHRpb24gPSByZXN1bHRzW0NPTlNVTUVdO1xuXG4gICAgICAvLyBBY3RNTCBlbGVtZW50XG4gICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoY29uc3VtcHRpb24pKSB7XG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoY29uc3VtcHRpb24pKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZW5lcmF0b3JcbiAgICAgIH0gZWxzZSBpZiAoaXNHZW5lcmF0b3IoY29uc3VtcHRpb24pKSB7XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBjb25zdW1wdGlvbjtcblxuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChnZW5lcmF0b3JEb25lKSB7XG4gICAgICAgICAgICB2YXIgZ2VuUmVzdWx0ID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24gaXRlcmF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICBnZW5SZXN1bHQgPSBnZW5lcmF0b3IubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmICghZ2VuUmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0ZShyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRlKHJlcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlcyA9IHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlKF9yZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZXMudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JEb25lKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRvckRvbmUoX3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGdlbmVyYXRvckRvbmUoZ2VuUmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hpbGRyZW5cbiAgICAgIH0gZWxzZSBpZiAoY29uc3VtcHRpb24gJiYgY29uc3VtcHRpb25bQ0hJTERSRU5dKSB7XG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtcHRpb24oKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA9PT0gMSA/IHJlc3VsdFswXSA6IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBSdW5uaW5nIHRoZSBxdWV1ZVxuICAgIHF1ZXVlLnByb2Nlc3MoKTtcblxuICAgIC8vIEdldHRpbmcgdGhlIHJlc3VsdC4gSXQgaXMgZWl0aGVyIGEgcHJvbWlzZSBpZiB0aGVyZSBpc1xuICAgIC8vIHNvbWV0aGluZyBhc3luY2hyb25vdXMgb3IgYSB2YWx1ZVxuICAgIHJldHVybiBxdWV1ZS5vbkRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5vdXQoKTtcbiAgICAgIHJldHVybiBSRVRVUk5FRF9FTEVNRU5UIGluIHJlc3VsdHMgPyByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdIDogcmVzdWx0c1tDT05TVU1FXTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5vZGU6IGZ1bmN0aW9uIG5vZGUoKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSxcbiAgICBydW46IGZ1bmN0aW9uIHJ1bihlbGVtZW50KSB7XG4gICAgICB2YXIgcm9vdE5vZGUgPSB0cmVlLnJlc29sdmVSb290KGVsZW1lbnQpO1xuXG4gICAgICByZXR1cm4gcHJvY2Vzc05vZGUocm9vdE5vZGUpO1xuICAgIH0sXG4gICAgb25Ob2RlSW46IGZ1bmN0aW9uIG9uTm9kZUluKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVJbkNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZU91dDogZnVuY3Rpb24gb25Ob2RlT3V0KGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgdHJlZS5vbk5vZGVSZW1vdmUoY2FsbGJhY2spO1xuICAgIH0sXG4gICAgc3lzdGVtOiBmdW5jdGlvbiBzeXN0ZW0oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmVlOiB0cmVlLFxuICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgY3VycmVudE5vZGUgPSBudWxsO1xuICAgICAgICAgIHRyZWUucmVzZXQoKTtcbiAgICAgICAgICBfdXNlUHViU3ViMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgICAgX3VzZVN0YXRlMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgICAgX3VzZUVmZmVjdDIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUXVldWU7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG52YXIgTE9HUyA9IGZhbHNlO1xudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIHJldHVybiBMT0dTID8gKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpIDogbnVsbDtcbn07XG52YXIgaXNQcm9taXNlID0gZnVuY3Rpb24gaXNQcm9taXNlKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmpbJ3RoZW4nXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG52YXIgY3JlYXRlSXRlbSA9IGZ1bmN0aW9uIGNyZWF0ZUl0ZW0odHlwZSwgZnVuYykge1xuICB2YXIgb25Eb25lID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmdW5jdGlvbiAoKSB7fTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGZ1bmM6IGZ1bmMsXG4gICAgb25Eb25lOiBvbkRvbmVcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVF1ZXVlKGNvbnRleHQpIHtcbiAgdmFyIGl0ZW1zID0gW107XG4gIHZhciBhc3luYyA9IGZhbHNlO1xuICB2YXIgcnVubmluZyA9IGZhbHNlO1xuICB2YXIgcmVsZWFzZSA9IGZ1bmN0aW9uIHJlbGVhc2UoKSB7fTtcblxuICByZXR1cm4ge1xuICAgIGFkZDogZnVuY3Rpb24gYWRkKHR5cGUsIGZ1bmMsIG9uRG9uZSkge1xuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6IFsuLi4nICsgdHlwZSArICddICgnICsgKGl0ZW1zLmxlbmd0aCArIDEpICsgJyB0b3RhbCknKTtcbiAgICAgIGl0ZW1zLnB1c2goY3JlYXRlSXRlbSh0eXBlLCBmdW5jLCBvbkRvbmUpKTtcbiAgICB9LFxuICAgIHByZXBlbmRJdGVtOiBmdW5jdGlvbiBwcmVwZW5kSXRlbSh0eXBlLCBmdW5jLCBvbkRvbmUpIHtcbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiBbJyArIHR5cGUgKyAnLi4uXSAoJyArIChpdGVtcy5sZW5ndGggKyAxKSArICcgdG90YWwpJyk7XG4gICAgICBpdGVtcyA9IFtjcmVhdGVJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoaXRlbXMpKTtcbiAgICB9LFxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uIHByb2Nlc3MobGFzdFJlc3VsdCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGxvZyhjb250ZXh0ICsgJzpROmRvbmUnKTtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZW0gPSBpdGVtcy5zaGlmdCgpO1xuXG4gICAgICBsb2coY29udGV4dCArICc6UTogJyArIGl0ZW0udHlwZSArICcoKSAoJyArIGl0ZW1zLmxlbmd0aCArICcgbGVmdCknKTtcbiAgICAgIHZhciByZXN1bHQgPSBpdGVtLmZ1bmMobGFzdFJlc3VsdCk7XG5cbiAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICBhc3luYyA9IHRydWU7XG4gICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uIChhc3luY1Jlc3VsdCkge1xuICAgICAgICAgIGl0ZW0ub25Eb25lKGFzeW5jUmVzdWx0KTtcbiAgICAgICAgICBfdGhpcy5wcm9jZXNzKGFzeW5jUmVzdWx0KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgcmVsZWFzZShlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5vbkRvbmUocmVzdWx0KTtcbiAgICAgICAgdGhpcy5wcm9jZXNzKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvbkRvbmU6IGZ1bmN0aW9uIG9uRG9uZShnZXRSZXN1bHQpIHtcbiAgICAgIGlmIChhc3luYykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGRvbmUsIHJlamVjdCkge1xuICAgICAgICAgIHJlbGVhc2UgPSBmdW5jdGlvbiByZWxlYXNlKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRvbmUoZ2V0UmVzdWx0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFJlc3VsdCgpO1xuICAgIH0sXG4gICAgaXNSdW5uaW5nOiBmdW5jdGlvbiBpc1J1bm5pbmcoKSB7XG4gICAgICByZXR1cm4gcnVubmluZztcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVHJlZTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgbm8tcmV0dXJuLWFzc2lnbiwgbWF4LWxlbiAqL1xudmFyIExPR1MgPSBmYWxzZTtcbnZhciBsb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gIHZhciBfY29uc29sZTtcblxuICByZXR1cm4gTE9HUyA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG59O1xuXG5mdW5jdGlvbiBUcmVlKCkge1xuICB2YXIgb25Ob2RlSW4gPSBbXTtcbiAgdmFyIG9uTm9kZU91dCA9IFtdO1xuICB2YXIgX29uTm9kZVJlbW92ZSA9IFtdO1xuICB2YXIgcm9vdCA9IGNyZWF0ZU5ld05vZGUoKTtcbiAgdmFyIGlkcyA9IDA7XG5cbiAgZnVuY3Rpb24gZ2V0SWQoKSB7XG4gICAgcmV0dXJuICdhJyArICsraWRzO1xuICB9O1xuICBmdW5jdGlvbiB1c2VTYW1lTm9kZShub2RlLCBuZXdFbGVtZW50KSB7XG4gICAgbmV3RWxlbWVudC5pbml0aWFsaXplKG5vZGUuZWxlbWVudC5pZCwgbm9kZS5lbGVtZW50LnVzZWQoKSk7XG4gICAgbm9kZS5lbGVtZW50ID0gbmV3RWxlbWVudDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBmdW5jdGlvbiB0cmVlRGlmZihvbGRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgaWYgKG9sZEVsZW1lbnQgJiYgb2xkRWxlbWVudC5uYW1lID09PSBuZXdFbGVtZW50Lm5hbWUpIHtcbiAgICAgIGlmIChvbGRFbGVtZW50LnByb3BzICYmIG5ld0VsZW1lbnQucHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIG9sZEVsZW1lbnQucHJvcHMua2V5ID09PSBuZXdFbGVtZW50LnByb3BzLmtleTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlTmV3Tm9kZShlbGVtZW50LCBwYXJlbnQpIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5pbml0aWFsaXplKGdldElkKCkpO1xuICAgIH1cblxuICAgIHZhciBub2RlID0ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgY3Vyc29yOiAwLFxuICAgICAgaW46IGZ1bmN0aW9uIF9pbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBsb2coJy0+ICcgKyB0aGlzLmVsZW1lbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5pbigpO1xuICAgICAgICBvbk5vZGVJbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICBub2RlLmxvZygnbm9kZTppbicpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIGxvZygnPC0gJyArIHRoaXMuZWxlbWVudC5uYW1lKTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm91dCgpO1xuICAgICAgICAvLyBJZiB0aGVyZSdyZSBtb3JlIG5vZGVzIGluIHRoZSB0cmVlIHRoYW4gd2hhdCB3YXMgcHJvY2Vzc2VkXG4gICAgICAgIGlmICh0aGlzLmN1cnNvciA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gdGhpcy5jdXJzb3IpLmZvckVhY2goZnVuY3Rpb24gKHJlbW92ZWROb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjKHJlbW92ZWROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Vyc29yID0gMDtcbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICBub2RlLmxvZygnbm9kZTpvdXQnKTtcbiAgICAgICAgfVxuICAgICAgICBvbk5vZGVPdXQuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzMik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgIGlmICh0aGlzLmxvZ3MpIHRoaXMubG9ncyA9IFtdO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWRkQ2hpbGROb2RlOiBmdW5jdGlvbiBhZGRDaGlsZE5vZGUobmV3RWxlbWVudCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgY2hpbGROb2RlID0gdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl07XG5cbiAgICAgICAgLy8gdXNpbmcgdGhlIHNhbWUgbm9kZVxuICAgICAgICBpZiAoY2hpbGROb2RlICYmIHRyZWVEaWZmKGNoaWxkTm9kZS5lbGVtZW50LCBuZXdFbGVtZW50KSkge1xuICAgICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgICAgcmV0dXJuIHVzZVNhbWVOb2RlKGNoaWxkTm9kZSwgbmV3RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGluZyBhIG5ldyBub2RlXG4gICAgICAgIHZhciBuZXdDaGlsZE5vZGUgPSBjcmVhdGVOZXdOb2RlKG5ld0VsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSkge1xuICAgICAgICAgIF9vbk5vZGVSZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgcmV0dXJuIGMoX3RoaXMzLmNoaWxkcmVuW190aGlzMy5jdXJzb3JdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSA9IG5ld0NoaWxkTm9kZTtcbiAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkTm9kZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIG5vZGUubG9nID0gZnVuY3Rpb24gKHR5cGUsIG1ldGEpIHtcbiAgICAgICAgaWYgKCEoJ2xvZ3MnIGluIG5vZGUpKSBub2RlLmxvZ3MgPSBbXTtcbiAgICAgICAgbm9kZS5sb2dzLnB1c2goeyB0eXBlOiB0eXBlLCBtZXRhOiBtZXRhLCB0aW1lOiBwZXJmb3JtYW5jZS5ub3coKSB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmVSb290OiBmdW5jdGlvbiByZXNvbHZlUm9vdChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gcm9vdCA9IHRyZWVEaWZmKHJvb3QuZWxlbWVudCwgZWxlbWVudCkgPyB1c2VTYW1lTm9kZShyb290LCBlbGVtZW50KSA6IGNyZWF0ZU5ld05vZGUoZWxlbWVudCk7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICAgICAgaWRzID0gMDtcbiAgICB9LFxuICAgIGdldE51bU9mRWxlbWVudHM6IGZ1bmN0aW9uIGdldE51bU9mRWxlbWVudHMoKSB7XG4gICAgICByZXR1cm4gaWRzO1xuICAgIH0sXG4gICAgZGlhZ25vc2U6IGZ1bmN0aW9uIGRpYWdub3NlKCkge1xuICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxvb3BPdmVyKG5vZGUpIHtcbiAgICAgICAgICB2YXIgaW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICAgICAgdmFyIF9yZWYgPSBub2RlLmVsZW1lbnQucHJvcHMgPyBub2RlLmVsZW1lbnQucHJvcHMgOiB7fSxcbiAgICAgICAgICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnY2hpbGRyZW4nXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmQ6IGluZCxcbiAgICAgICAgICAgIG5hbWU6IG5vZGUuZWxlbWVudC5uYW1lLFxuICAgICAgICAgICAgbG9nczogbm9kZS5sb2dzLFxuICAgICAgICAgICAgcHJvcHM6IF9leHRlbmRzKHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46ICc8ZnVuY3Rpb24gY2hpbGRyZW4+J1xuICAgICAgICAgICAgfSwgcmVzdCksXG4gICAgICAgICAgICB1c2VkOiBub2RlLmVsZW1lbnQudXNlZCgpLFxuICAgICAgICAgICAgaWQ6IG5vZGUuZWxlbWVudC5pZCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxvb3BPdmVyKGNoaWxkLCBpbmQgKyAxKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfTtcbiAgICAgICAgfShyb290KTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGF2YWlsYWJsZSBpbiBwcm9kdWN0aW9uIG1vZGUnKTtcbiAgICB9LFxuICAgIGFkZE5vZGVJbkNhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlSW5DYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlSW4ucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBhZGROb2RlT3V0Q2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlT3V0LnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIF9vbk5vZGVSZW1vdmUucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxudmFyIF9Db250ZXh0ID0gcmVxdWlyZSgnLi4vQ29udGV4dCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlRWxlbWVudEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50SG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChDb250ZXh0KSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICByZXR1cm4gQ29udGV4dFtfQ29udGV4dC5QVUJMSUNfQ09OVEVYVF9LRVldKCk7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFbGVtZW50SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZmFzdERlZXBFcXVhbCA9IHJlcXVpcmUoJ2Zhc3QtZGVlcC1lcXVhbCcpO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmFzdERlZXBFcXVhbCk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IGVmZmVjdHM6IFtdLCBjb25zdW1lcjogMCB9O1xuICB9LFxuICBjbGVhblVwOiBmdW5jdGlvbiBjbGVhblVwKGlkKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbaWRdKSB7XG4gICAgICBkZWxldGUgdGhpcy5lbGVtZW50c1tpZF07XG4gICAgfVxuICB9XG59O1xuXG52YXIgY3JlYXRlRWZmZWN0ID0gZnVuY3Rpb24gY3JlYXRlRWZmZWN0KGNhbGxiYWNrLCBkZXBzKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgIGRlcHM6IGRlcHNcbiAgfTtcbn07XG52YXIgdXBkYXRlRWZmZWN0ID0gZnVuY3Rpb24gdXBkYXRlRWZmZWN0KGVmZmVjdCwgY2FsbGJhY2ssIGRlcHMpIHtcbiAgZWZmZWN0LmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGVmZmVjdC5vbGREZXBzID0gZWZmZWN0LmRlcHM7XG4gIGVmZmVjdC5kZXBzID0gZGVwcztcbiAgcmV0dXJuIGVmZmVjdDtcbn07XG5cbmZ1bmN0aW9uIGRlcHNFcXVhbChvbGREZXBzLCBuZXdEZXBzKSB7XG4gIGlmICghb2xkRGVwcykgcmV0dXJuIGZhbHNlO1xuICBpZiAob2xkRGVwcy5sZW5ndGggIT09IG5ld0RlcHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAoMCwgX2Zhc3REZWVwRXF1YWwyLmRlZmF1bHQpKG9sZERlcHMsIG5ld0RlcHMpO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUVmZmVjdChub2RlLCBlZmZlY3QpIHtcbiAgdmFyIGRlcHMgPSBlZmZlY3QuZGVwcyxcbiAgICAgIG9sZERlcHMgPSBlZmZlY3Qub2xkRGVwcyxcbiAgICAgIGNhbGxiYWNrID0gZWZmZWN0LmNhbGxiYWNrO1xuXG5cbiAgaWYgKHR5cGVvZiBkZXBzID09PSAndW5kZWZpbmVkJykge1xuICAgIGVmZmVjdC5jbGVhblVwID0gY2FsbGJhY2soKTtcbiAgfSBlbHNlIGlmIChkZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChub2RlLmVsZW1lbnQudXNlZCgpID09PSAxKSB7XG4gICAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gICAgICBpZiAoX19ERVZfXykgbm9kZS5sb2coJ3VzZUVmZmVjdDpmaXJlZCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYXJlRXF1YWwgPSBkZXBzRXF1YWwob2xkRGVwcywgZGVwcyk7XG5cbiAgICBpZiAoIWFyZUVxdWFsKSB7XG4gICAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gICAgICBpZiAoX19ERVZfXykgbm9kZS5sb2coJ3VzZUVmZmVjdDpmaXJlZCcpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgY3JlYXRlVXNlRWZmZWN0SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVmZmVjdEhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICBzdG9yYWdlLmVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmZWN0KSB7XG4gICAgICBpZiAoZWZmZWN0LmNsZWFuVXApIHtcbiAgICAgICAgZWZmZWN0LmNsZWFuVXAoKTtcbiAgICAgICAgaWYgKF9fREVWX18pIG5vZGUubG9nKCd1c2VFZmZlY3Q6Y2xlYW5VcCcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFN0b3JhZ2UuY2xlYW5VcChub2RlLmVsZW1lbnQuaWQpO1xuICB9KTtcbiAgcHJvY2Vzc29yLm9uTm9kZU91dChmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIGlmIChzdG9yYWdlLmVmZmVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc3RvcmFnZS5lZmZlY3RzLmZvckVhY2goZnVuY3Rpb24gKGVmZmVjdCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZUVmZmVjdChub2RlLCBlZmZlY3QpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaywgZGVwcykge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIC8vIGZpcnN0IHJ1blxuICAgIGlmIChlbGVtZW50LnVzZWQoKSA9PT0gMCkge1xuICAgICAgc3RvcmFnZS5lZmZlY3RzLnB1c2goY3JlYXRlRWZmZWN0KGNhbGxiYWNrLCBkZXBzKSk7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGluZGV4ID0gc3RvcmFnZS5jb25zdW1lcjtcblxuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5lZmZlY3RzLmxlbmd0aCAtIDEgPyBzdG9yYWdlLmNvbnN1bWVyICsgMSA6IDA7XG4gICAgICB1cGRhdGVFZmZlY3Qoc3RvcmFnZS5lZmZlY3RzW2luZGV4XSwgY2FsbGJhY2ssIGRlcHMpO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVmZmVjdEhvb2s7XG5cblxuY3JlYXRlVXNlRWZmZWN0SG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNyZWF0ZVVzZUVsZW1lbnRIb29rID0gZnVuY3Rpb24gY3JlYXRlVXNlRWxlbWVudEhvb2socHJvY2Vzc29yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICByZXR1cm4gcHJvY2Vzc29yLm5vZGUoKS5lbGVtZW50O1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlRWxlbWVudEhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHViU3ViSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc3Vic2NyaWJlcnMgPSB7fTtcblxudmFyIHN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShub2RlLCBlbGVtZW50LCB0eXBlLCBjYWxsYmFjaykge1xuICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdKSBzdWJzY3JpYmVyc1t0eXBlXSA9IHt9O1xuICBpZiAoX19ERVZfXykge1xuICAgIGlmICghc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF0pIHtcbiAgICAgIG5vZGUubG9nKCd1c2VQdWJTdWI6c3Vic2NyaWJlJywgdHlwZSk7XG4gICAgfVxuICB9XG4gIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdID0gY2FsbGJhY2s7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIG5vZGUubG9nKCd1c2VQdWJTdWI6dW5zdWJzY3JpYmUnLCB0eXBlKTtcbiAgICB9XG4gICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdO1xuICB9O1xufTtcbnZhciBwdWJsaXNoID0gZnVuY3Rpb24gcHVibGlzaChub2RlLCB0eXBlLCBwYXlsb2FkKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHJldHVybjtcbiAgaWYgKF9fREVWX18pIHtcbiAgICBub2RlLmxvZygndXNlUHViU3ViOnB1Ymxpc2g6JyArIHR5cGUsIHBheWxvYWQpO1xuICB9XG4gIE9iamVjdC5rZXlzKHN1YnNjcmliZXJzW3R5cGVdKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgIHN1YnNjcmliZXJzW3R5cGVdW2lkXShwYXlsb2FkKTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVVc2VQdWJTdWJIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIGlmIChzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdKSB7XG4gICAgICAgIGRlbGV0ZSBzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZWRFbGVtZW50KSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsID0gc2NvcGVkRWxlbWVudCB8fCBub2RlLmVsZW1lbnQ7XG4gICAgdmFyIHN1YnNjcmliZUZ1bmMgPSBmdW5jdGlvbiBzdWJzY3JpYmVGdW5jKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBwYXJhbXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdWJzY3JpYmUuYXBwbHkodW5kZWZpbmVkLCBbbm9kZSwgZWxdLmNvbmNhdChwYXJhbXMpKTtcbiAgICB9O1xuICAgIHZhciBwdWJsaXNoRnVuYyA9IGZ1bmN0aW9uIHB1Ymxpc2hGdW5jKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBwYXJhbXMgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBwYXJhbXNbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHB1Ymxpc2guYXBwbHkodW5kZWZpbmVkLCBbbm9kZV0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmVGdW5jLFxuICAgICAgcHVibGlzaDogcHVibGlzaEZ1bmMsXG4gICAgICBzdWJzY3JpYmVyczogc3Vic2NyaWJlcnNcbiAgICB9O1xuICB9O1xufVxuXG5jcmVhdGVVc2VQdWJTdWJIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBzdWJzY3JpYmVycyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUmVkdWNlckhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGFjdGlvbiA9IF9yZWYuYWN0aW9uLFxuICAgICAgICBwcm9wc1RvQWN0aW9uID0gX3JlZi5wcm9wc1RvQWN0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnYWN0aW9uJywgJ3Byb3BzVG9BY3Rpb24nXSk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICBkaXNwYXRjaChhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAocHJvcHNUb0FjdGlvbikge1xuICAgICAgZGlzcGF0Y2gocHJvcHNUb0FjdGlvbihyZXN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignPERpc3BhdGNoPiBleHBlY3RzIFwiYWN0aW9uXCIgb3IgXCJwcm9wc1RvQWN0aW9uXCIgcHJvcC4nKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVJlZHVjZXJIb29rKHByb2Nlc3NvciwgdXNlU3RhdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBpbml0aWFsU3RhdGUpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZShpbml0aWFsU3RhdGUpLFxuICAgICAgICBfdXNlU3RhdGUyID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAyKSxcbiAgICAgICAgc3RhdGUgPSBfdXNlU3RhdGUyWzBdLFxuICAgICAgICBzZXRTdGF0ZSA9IF91c2VTdGF0ZTJbMV07XG5cbiAgICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIG5vZGUubG9nKCd1c2VSZWR1Y2VyOmRpc3BhdGNoJywgYWN0aW9uLnR5cGUpO1xuICAgICAgfVxuICAgICAgc2V0U3RhdGUocmVkdWNlcihzdGF0ZSgpLCBhY3Rpb24pKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFtzdGF0ZSwgZGlzcGF0Y2gsIGNyZWF0ZURpc3BhdGNoRWxlbWVudChkaXNwYXRjaCksIC8vIDxEaXNwYXRjaD5cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhdGUoKTtcbiAgICB9IC8vIDxHZXRTdGF0ZT5cbiAgICBdO1xuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZVN0YXRlSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU3RvcmFnZSA9IHtcbiAgZWxlbWVudHM6IHt9LFxuICBnZXQ6IGZ1bmN0aW9uIGdldChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0pIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSA9IHsgc3RhdGVzOiBbXSwgY29uc3VtZXI6IDAgfTtcbiAgfSxcbiAgY2xlYW5VcDogZnVuY3Rpb24gY2xlYW5VcChpZCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2lkXSkge1xuICAgICAgZGVsZXRlIHRoaXMuZWxlbWVudHNbaWRdO1xuICAgIH1cbiAgfVxufTsgLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuZnVuY3Rpb24gY3JlYXRlVXNlU3RhdGVIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgcmV0dXJuIFN0b3JhZ2UuY2xlYW5VcChub2RlLmVsZW1lbnQuaWQpO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpbml0aWFsU3RhdGUpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICB2YXIgaW5kZXggPSB2b2lkIDA7XG5cbiAgICAvLyBmaXJzdCBydW5cbiAgICBpZiAoZWxlbWVudC51c2VkKCkgPT09IDApIHtcbiAgICAgIHN0b3JhZ2Uuc3RhdGVzLnB1c2goaW5pdGlhbFN0YXRlKTtcbiAgICAgIGluZGV4ID0gc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMTtcblxuICAgICAgLy8gb3RoZXIgcnVuc1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IHN0b3JhZ2UuY29uc3VtZXI7XG4gICAgICBzdG9yYWdlLmNvbnN1bWVyID0gaW5kZXggPCBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxID8gc3RvcmFnZS5jb25zdW1lciArIDEgOiAwO1xuICAgIH1cbiAgICBpZiAoX19ERVZfXykgbm9kZS5sb2coJ3VzZVN0YXRlOmNvbnN1bWVkJywgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdKTtcblxuICAgIHJldHVybiBbZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XTtcbiAgICB9LCBmdW5jdGlvbiAobmV3U3RhdGUpIHtcbiAgICAgIGlmIChfX0RFVl9fKSBub2RlLmxvZygndXNlU3RhdGU6c2V0JywgbmV3U3RhdGUpO1xuICAgICAgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdID0gbmV3U3RhdGU7XG4gICAgICBpZiAoIWVsZW1lbnQuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgaWYgKF9fREVWX18pIG5vZGUubG9nKCd1c2VTdGF0ZTpyZXJ1bicpO1xuICAgICAgICBub2RlLnJlcnVuKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfV07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVN0YXRlSG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1ZhbGlkSG9va0NvbnRleHQ7XG5mdW5jdGlvbiBpc1ZhbGlkSG9va0NvbnRleHQocHJvY2Vzc29yKSB7XG4gIGlmICghcHJvY2Vzc29yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgdGVycmlibHkgd3JvbmcgaGFwcGVuZWQuIFRoZSBob29rIGZhY3RvcnkgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGhvdXQgYSBwcm9jZXNzb3IuJyk7XG4gIH1cbiAgaWYgKCFwcm9jZXNzb3Iubm9kZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdIb29rcyBtdXN0IGJlIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiBhbiBBY3RNTCBlbGVtZW50LicpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlUnVudGltZSA9IGNyZWF0ZVJ1bnRpbWU7XG5cbnZhciBfUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9Qcm9jZXNzb3InKTtcblxudmFyIF9Qcm9jZXNzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJvY2Vzc29yKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfQWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vQWN0RWxlbWVudCcpO1xuXG52YXIgX0FjdEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0RWxlbWVudCk7XG5cbnZhciBfdXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWxlbWVudCcpO1xuXG52YXIgX3VzZUVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWxlbWVudCk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlUmVkdWNlciA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUmVkdWNlcicpO1xuXG52YXIgX3VzZVJlZHVjZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUmVkdWNlcik7XG5cbnZhciBfdXNlRWZmZWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFZmZlY3QnKTtcblxudmFyIF91c2VFZmZlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWZmZWN0KTtcblxudmFyIF91c2VDb250ZXh0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VDb250ZXh0Jyk7XG5cbnZhciBfdXNlQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VDb250ZXh0KTtcblxudmFyIF9Db250ZXh0ID0gcmVxdWlyZSgnLi9Db250ZXh0Jyk7XG5cbnZhciBfQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlUnVudGltZSgpIHtcbiAgdmFyIHByb2Nlc3NvciA9ICgwLCBfUHJvY2Vzc29yMi5kZWZhdWx0KSgpO1xuXG4gIGZ1bmN0aW9uIEEoZnVuYywgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBjaGlsZHJlbltfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfQWN0RWxlbWVudDIuZGVmYXVsdCkoZnVuYywgcHJvcHMsIGNoaWxkcmVuKTtcbiAgfVxuICBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RlZC4gSW5zdGVhZCAnICsgZWxlbWVudC50b1N0cmluZygpICsgJyBwYXNzZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzb3IucnVuKGVsZW1lbnQpO1xuICB9XG4gIHZhciBGcmFnbWVudCA9IGZ1bmN0aW9uIEZyYWdtZW50KF9yZWYpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfTtcbiAgdmFyIHVzZUVsZW1lbnQgPSAoMCwgX3VzZUVsZW1lbnQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VTdGF0ZSA9ICgwLCBfdXNlU3RhdGUyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VQdWJTdWIgPSAoMCwgX3VzZVB1YlN1YjIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVJlZHVjZXIgPSAoMCwgX3VzZVJlZHVjZXIyLmRlZmF1bHQpKHByb2Nlc3NvciwgdXNlU3RhdGUpO1xuICB2YXIgdXNlRWZmZWN0ID0gKDAsIF91c2VFZmZlY3QyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VDb250ZXh0ID0gKDAsIF91c2VDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgY3JlYXRlQ29udGV4dCA9ICgwLCBfQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICByZXR1cm4ge1xuICAgIEE6IEEsXG4gICAgcnVuOiBydW4sXG4gICAgRnJhZ21lbnQ6IEZyYWdtZW50LFxuICAgIHByb2Nlc3NvcjogcHJvY2Vzc29yLFxuICAgIHVzZUVsZW1lbnQ6IHVzZUVsZW1lbnQsXG4gICAgdXNlUHViU3ViOiB1c2VQdWJTdWIsXG4gICAgdXNlU3RhdGU6IHVzZVN0YXRlLFxuICAgIHVzZVJlZHVjZXI6IHVzZVJlZHVjZXIsXG4gICAgdXNlRWZmZWN0OiB1c2VFZmZlY3QsXG4gICAgdXNlQ29udGV4dDogdXNlQ29udGV4dCxcbiAgICBjcmVhdGVDb250ZXh0OiBjcmVhdGVDb250ZXh0XG4gIH07XG59XG5cbnZhciBydW50aW1lID0gY3JlYXRlUnVudGltZSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVSdW50aW1lID0gY3JlYXRlUnVudGltZSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNBY3RNTEVsZW1lbnQ7XG5mdW5jdGlvbiBpc0FjdE1MRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuX19hY3RtbCA9PT0gdHJ1ZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIga2V5TGlzdCA9IE9iamVjdC5rZXlzO1xudmFyIGhhc1Byb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYXJyQSA9IGlzQXJyYXkoYSlcbiAgICAgICwgYXJyQiA9IGlzQXJyYXkoYilcbiAgICAgICwgaVxuICAgICAgLCBsZW5ndGhcbiAgICAgICwga2V5O1xuXG4gICAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhcnJBICE9IGFyckIpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAsIGRhdGVCID0gYiBpbnN0YW5jZW9mIERhdGU7XG4gICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSByZXR1cm4gYS5nZXRUaW1lKCkgPT0gYi5nZXRUaW1lKCk7XG5cbiAgICB2YXIgcmVnZXhwQSA9IGEgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICwgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuXG4gICAgdmFyIGtleXMgPSBrZXlMaXN0KGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCAhPT0ga2V5TGlzdChiKS5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIWhhc1Byb3AuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKCFlcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBhIT09YSAmJiBiIT09Yjtcbn07XG4iLCJpbXBvcnQgQ2lyY3VsYXJKU09OIGZyb20gJy4vdmVuZG9yL0NpcmN1bGFySlNPTic7XG5pbXBvcnQgU2VyaWFsaXplRXJyb3IgZnJvbSAnLi92ZW5kb3IvU2VyaWFsaXplRXJyb3InO1xuXG5jb25zdCB7IHN0cmluZ2lmeSB9ID0gQ2lyY3VsYXJKU09OO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYW5pdGl6ZShzb21ldGhpbmcsIHNob3dFcnJvckluQ29uc29sZSA9IGZhbHNlKSB7XG4gIHZhciByZXN1bHQ7XG5cbiAgdHJ5IHtcbiAgICByZXN1bHQgPSBKU09OLnBhcnNlKHN0cmluZ2lmeShzb21ldGhpbmcsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5uYW1lID09PSAnJyA/ICc8YW5vbnltb3VzPicgOiBgZnVuY3Rpb24gJHsgdmFsdWUubmFtZSB9KClgO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZUVycm9yKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LCB1bmRlZmluZWQsIHRydWUpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoc2hvd0Vycm9ySW5Db25zb2xlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICAgIHJlc3VsdCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyohXG5Db3B5cmlnaHQgKEMpIDIwMTMtMjAxNyBieSBBbmRyZWEgR2lhbW1hcmNoaSAtIEBXZWJSZWZsZWN0aW9uXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cblxuKi9cbnZhclxuLy8gc2hvdWxkIGJlIGEgbm90IHNvIGNvbW1vbiBjaGFyXG4vLyBwb3NzaWJseSBvbmUgSlNPTiBkb2VzIG5vdCBlbmNvZGVcbi8vIHBvc3NpYmx5IG9uZSBlbmNvZGVVUklDb21wb25lbnQgZG9lcyBub3QgZW5jb2RlXG4vLyByaWdodCBub3cgdGhpcyBjaGFyIGlzICd+JyBidXQgdGhpcyBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZVxuc3BlY2lhbENoYXIgPSAnficsXG5zYWZlU3BlY2lhbENoYXIgPSAnXFxcXHgnICsgKFxuICAnMCcgKyBzcGVjaWFsQ2hhci5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KVxuKS5zbGljZSgtMiksXG5lc2NhcGVkU2FmZVNwZWNpYWxDaGFyID0gJ1xcXFwnICsgc2FmZVNwZWNpYWxDaGFyLFxuc3BlY2lhbENoYXJSRyA9IG5ldyBSZWdFeHAoc2FmZVNwZWNpYWxDaGFyLCAnZycpLFxuc2FmZVNwZWNpYWxDaGFyUkcgPSBuZXcgUmVnRXhwKGVzY2FwZWRTYWZlU3BlY2lhbENoYXIsICdnJyksXG5cbnNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHID0gbmV3IFJlZ0V4cCgnKD86XnwoW15cXFxcXFxcXF0pKScgKyBlc2NhcGVkU2FmZVNwZWNpYWxDaGFyKSxcblxuaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24odil7XG4gIGZvcih2YXIgaT10aGlzLmxlbmd0aDtpLS0mJnRoaXNbaV0hPT12Oyk7XG4gIHJldHVybiBpO1xufSxcbiRTdHJpbmcgPSBTdHJpbmcgIC8vIHRoZXJlJ3Mgbm8gd2F5IHRvIGRyb3Agd2FybmluZ3MgaW4gSlNIaW50XG4gICAgICAgICAgICAgICAgICAvLyBhYm91dCBuZXcgU3RyaW5nIC4uLiB3ZWxsLCBJIG5lZWQgdGhhdCBoZXJlIVxuICAgICAgICAgICAgICAgICAgLy8gZmFrZWQsIGFuZCBoYXBweSBsaW50ZXIhXG47XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmVwbGFjZXIodmFsdWUsIHJlcGxhY2VyLCByZXNvbHZlKSB7XG52YXJcbiAgaW5zcGVjdCA9ICEhcmVwbGFjZXIsXG4gIHBhdGggPSBbXSxcbiAgYWxsICA9IFt2YWx1ZV0sXG4gIHNlZW4gPSBbdmFsdWVdLFxuICBtYXBwID0gW3Jlc29sdmUgPyBzcGVjaWFsQ2hhciA6ICc8Y2lyY3VsYXI+J10sXG4gIGxhc3QgPSB2YWx1ZSxcbiAgbHZsICA9IDEsXG4gIGksIGZuXG47XG5pZiAoaW5zcGVjdCkge1xuICBmbiA9IHR5cGVvZiByZXBsYWNlciA9PT0gJ29iamVjdCcgP1xuICAgIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4ga2V5ICE9PSAnJyAmJiByZXBsYWNlci5pbmRleE9mKGtleSkgPCAwID8gdm9pZCAwIDogdmFsdWU7XG4gICAgfSA6XG4gICAgcmVwbGFjZXI7XG59XG5yZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAvLyB0aGUgcmVwbGFjZXIgaGFzIHJpZ2h0cyB0byBkZWNpZGVcbiAgLy8gaWYgYSBuZXcgb2JqZWN0IHNob3VsZCBiZSByZXR1cm5lZFxuICAvLyBvciBpZiB0aGVyZSdzIHNvbWUga2V5IHRvIGRyb3BcbiAgLy8gbGV0J3MgY2FsbCBpdCBoZXJlIHJhdGhlciB0aGFuIFwidG9vIGxhdGVcIlxuICBpZiAoaW5zcGVjdCkgdmFsdWUgPSBmbi5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuXG4gIC8vIGRpZCB5b3Uga25vdyA/IFNhZmFyaSBwYXNzZXMga2V5cyBhcyBpbnRlZ2VycyBmb3IgYXJyYXlzXG4gIC8vIHdoaWNoIG1lYW5zIGlmIChrZXkpIHdoZW4ga2V5ID09PSAwIHdvbid0IHBhc3MgdGhlIGNoZWNrXG4gIGlmIChrZXkgIT09ICcnKSB7XG4gICAgaWYgKGxhc3QgIT09IHRoaXMpIHtcbiAgICAgIGkgPSBsdmwgLSBpbmRleE9mLmNhbGwoYWxsLCB0aGlzKSAtIDE7XG4gICAgICBsdmwgLT0gaTtcbiAgICAgIGFsbC5zcGxpY2UobHZsLCBhbGwubGVuZ3RoKTtcbiAgICAgIHBhdGguc3BsaWNlKGx2bCAtIDEsIHBhdGgubGVuZ3RoKTtcbiAgICAgIGxhc3QgPSB0aGlzO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhsdmwsIGtleSwgcGF0aCk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgcmVmZXJyaW5nIHRvIHBhcmVudCBvYmplY3QsIGFkZCB0byB0aGVcbiAgICAgIC8vIG9iamVjdCBwYXRoIHN0YWNrLiBPdGhlcndpc2UgaXQgaXMgYWxyZWFkeSB0aGVyZS5cbiAgICAgIGlmIChpbmRleE9mLmNhbGwoYWxsLCB2YWx1ZSkgPCAwKSB7XG4gICAgICAgIGFsbC5wdXNoKGxhc3QgPSB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBsdmwgPSBhbGwubGVuZ3RoO1xuICAgICAgaSA9IGluZGV4T2YuY2FsbChzZWVuLCB2YWx1ZSk7XG4gICAgICBpZiAoaSA8IDApIHtcbiAgICAgICAgaSA9IHNlZW4ucHVzaCh2YWx1ZSkgLSAxO1xuICAgICAgICBpZiAocmVzb2x2ZSkge1xuICAgICAgICAgIC8vIGtleSBjYW5ub3QgY29udGFpbiBzcGVjaWFsQ2hhciBidXQgY291bGQgYmUgbm90IGEgc3RyaW5nXG4gICAgICAgICAgcGF0aC5wdXNoKCgnJyArIGtleSkucmVwbGFjZShzcGVjaWFsQ2hhclJHLCBzYWZlU3BlY2lhbENoYXIpKTtcbiAgICAgICAgICBtYXBwW2ldID0gc3BlY2lhbENoYXIgKyBwYXRoLmpvaW4oc3BlY2lhbENoYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcHBbaV0gPSBtYXBwWzBdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IG1hcHBbaV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHJlc29sdmUpIHtcbiAgICAgICAgLy8gZW5zdXJlIG5vIHNwZWNpYWwgY2hhciBpbnZvbHZlZCBvbiBkZXNlcmlhbGl6YXRpb25cbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIG9ubHkgZmlyc3QgY2hhciBpcyBpbXBvcnRhbnRcbiAgICAgICAgLy8gbm8gbmVlZCB0byByZXBsYWNlIGFsbCB2YWx1ZSAoYmV0dGVyIHBlcmZvcm1hbmNlKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlIC5yZXBsYWNlKHNhZmVTcGVjaWFsQ2hhciwgZXNjYXBlZFNhZmVTcGVjaWFsQ2hhcilcbiAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShzcGVjaWFsQ2hhciwgc2FmZVNwZWNpYWxDaGFyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcbn1cblxuZnVuY3Rpb24gcmV0cmlldmVGcm9tUGF0aChjdXJyZW50LCBrZXlzKSB7XG5mb3IodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgY3VycmVudCA9IGN1cnJlbnRbXG4gIC8vIGtleXMgc2hvdWxkIGJlIG5vcm1hbGl6ZWQgYmFjayBoZXJlXG4gIGtleXNbaSsrXS5yZXBsYWNlKHNhZmVTcGVjaWFsQ2hhclJHLCBzcGVjaWFsQ2hhcilcbl0pO1xucmV0dXJuIGN1cnJlbnQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmV2aXZlcihyZXZpdmVyKSB7XG5yZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICBpZiAoaXNTdHJpbmcgJiYgdmFsdWUuY2hhckF0KDApID09PSBzcGVjaWFsQ2hhcikge1xuICAgIHJldHVybiBuZXcgJFN0cmluZyh2YWx1ZS5zbGljZSgxKSk7XG4gIH1cbiAgaWYgKGtleSA9PT0gJycpIHZhbHVlID0gcmVnZW5lcmF0ZSh2YWx1ZSwgdmFsdWUsIHt9KTtcbiAgLy8gYWdhaW4sIG9ubHkgb25lIG5lZWRlZCwgZG8gbm90IHVzZSB0aGUgUmVnRXhwIGZvciB0aGlzIHJlcGxhY2VtZW50XG4gIC8vIG9ubHkga2V5cyBuZWVkIHRoZSBSZWdFeHBcbiAgaWYgKGlzU3RyaW5nKSB2YWx1ZSA9IHZhbHVlIC5yZXBsYWNlKHNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHLCAnJDEnICsgc3BlY2lhbENoYXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShlc2NhcGVkU2FmZVNwZWNpYWxDaGFyLCBzYWZlU3BlY2lhbENoYXIpO1xuICByZXR1cm4gcmV2aXZlciA/IHJldml2ZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKSA6IHZhbHVlO1xufTtcbn1cblxuZnVuY3Rpb24gcmVnZW5lcmF0ZUFycmF5KHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSB7XG5mb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICBjdXJyZW50W2ldID0gcmVnZW5lcmF0ZShyb290LCBjdXJyZW50W2ldLCByZXRyaWV2ZSk7XG59XG5yZXR1cm4gY3VycmVudDtcbn1cblxuZnVuY3Rpb24gcmVnZW5lcmF0ZU9iamVjdChyb290LCBjdXJyZW50LCByZXRyaWV2ZSkge1xuZm9yICh2YXIga2V5IGluIGN1cnJlbnQpIHtcbiAgaWYgKGN1cnJlbnQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIGN1cnJlbnRba2V5XSA9IHJlZ2VuZXJhdGUocm9vdCwgY3VycmVudFtrZXldLCByZXRyaWV2ZSk7XG4gIH1cbn1cbnJldHVybiBjdXJyZW50O1xufVxuXG5mdW5jdGlvbiByZWdlbmVyYXRlKHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSB7XG5yZXR1cm4gY3VycmVudCBpbnN0YW5jZW9mIEFycmF5ID9cbiAgLy8gZmFzdCBBcnJheSByZWNvbnN0cnVjdGlvblxuICByZWdlbmVyYXRlQXJyYXkocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIDpcbiAgKFxuICAgIGN1cnJlbnQgaW5zdGFuY2VvZiAkU3RyaW5nID9cbiAgICAgIChcbiAgICAgICAgLy8gcm9vdCBpcyBhbiBlbXB0eSBzdHJpbmdcbiAgICAgICAgY3VycmVudC5sZW5ndGggP1xuICAgICAgICAgIChcbiAgICAgICAgICAgIHJldHJpZXZlLmhhc093blByb3BlcnR5KGN1cnJlbnQpID9cbiAgICAgICAgICAgICAgcmV0cmlldmVbY3VycmVudF0gOlxuICAgICAgICAgICAgICByZXRyaWV2ZVtjdXJyZW50XSA9IHJldHJpZXZlRnJvbVBhdGgoXG4gICAgICAgICAgICAgICAgcm9vdCwgY3VycmVudC5zcGxpdChzcGVjaWFsQ2hhcilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICkgOlxuICAgICAgICAgIHJvb3RcbiAgICAgICkgOlxuICAgICAgKFxuICAgICAgICBjdXJyZW50IGluc3RhbmNlb2YgT2JqZWN0ID9cbiAgICAgICAgICAvLyBkZWRpY2F0ZWQgT2JqZWN0IHBhcnNlclxuICAgICAgICAgIHJlZ2VuZXJhdGVPYmplY3Qocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIDpcbiAgICAgICAgICAvLyB2YWx1ZSBhcyBpdCBpc1xuICAgICAgICAgIGN1cnJlbnRcbiAgICAgIClcbiAgKVxuO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlSZWN1cnNpb24odmFsdWUsIHJlcGxhY2VyLCBzcGFjZSwgZG9Ob3RSZXNvbHZlKSB7XG5yZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIGdlbmVyYXRlUmVwbGFjZXIodmFsdWUsIHJlcGxhY2VyLCAhZG9Ob3RSZXNvbHZlKSwgc3BhY2UpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVJlY3Vyc2lvbih0ZXh0LCByZXZpdmVyKSB7XG5yZXR1cm4gSlNPTi5wYXJzZSh0ZXh0LCBnZW5lcmF0ZVJldml2ZXIocmV2aXZlcikpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5UmVjdXJzaW9uLFxuICBwYXJzZTogcGFyc2VSZWN1cnNpb25cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8gQ3JlZGl0czogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9zZXJpYWxpemUtZXJyb3JcblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlID0+IHtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gZGVzdHJveUNpcmN1bGFyKHZhbHVlLCBbXSk7XG5cdH1cblxuXHQvLyBQZW9wbGUgc29tZXRpbWVzIHRocm93IHRoaW5ncyBiZXNpZGVzIEVycm9yIG9iamVjdHMsIHNv4oCmXG5cblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIEpTT04uc3RyaW5naWZ5IGRpc2NhcmRzIGZ1bmN0aW9ucy4gV2UgZG8gdG9vLCB1bmxlc3MgYSBmdW5jdGlvbiBpcyB0aHJvd24gZGlyZWN0bHkuXG5cdFx0cmV0dXJuIGBbRnVuY3Rpb246ICR7KHZhbHVlLm5hbWUgfHwgJ2Fub255bW91cycpfV1gO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZGVzdHJveS1jaXJjdWxhclxuZnVuY3Rpb24gZGVzdHJveUNpcmN1bGFyKGZyb20sIHNlZW4pIHtcblx0Y29uc3QgdG8gPSBBcnJheS5pc0FycmF5KGZyb20pID8gW10gOiB7fTtcblxuXHRzZWVuLnB1c2goZnJvbSk7XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZnJvbSkpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGZyb21ba2V5XTtcblxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0dG9ba2V5XSA9IHZhbHVlO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKHNlZW4uaW5kZXhPZihmcm9tW2tleV0pID09PSAtMSkge1xuXHRcdFx0dG9ba2V5XSA9IGRlc3Ryb3lDaXJjdWxhcihmcm9tW2tleV0sIHNlZW4uc2xpY2UoMCkpO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dG9ba2V5XSA9ICdbQ2lyY3VsYXJdJztcblx0fVxuXG5cdGlmICh0eXBlb2YgZnJvbS5uYW1lID09PSAnc3RyaW5nJykge1xuXHRcdHRvLm5hbWUgPSBmcm9tLm5hbWU7XG5cdH1cblxuXHRpZiAodHlwZW9mIGZyb20ubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcblx0XHR0by5tZXNzYWdlID0gZnJvbS5tZXNzYWdlO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBmcm9tLnN0YWNrID09PSAnc3RyaW5nJykge1xuXHRcdHRvLnN0YWNrID0gZnJvbS5zdGFjaztcblx0fVxuXG5cdHJldHVybiB0bztcbn0iLCJjb25zdCBJTiA9ICdJTic7XG5jb25zdCBPVVQgPSAnT1VUJztcbmNvbnN0IFJFTU9WRSA9ICdSRU1PVkUnO1xuXG5pbXBvcnQgc2FuaXRpemUgZnJvbSAnLi9oZWxwZXJzL3Nhbml0aXplJztcblxuY29uc3QgaXNSdW5uaW5nSW5Ob2RlID1cbiAgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykgJiZcbiAgKHR5cGVvZiBwcm9jZXNzLnJlbGVhc2UgIT09ICd1bmRlZmluZWQnKSAmJlxuICAocHJvY2Vzcy5yZWxlYXNlLm5hbWUgPT09ICdub2RlJyk7XG5cbmNvbnN0IHRyaW0gPSAoc3RyLCBsZW4sIGVtcCA9ICcuLi4nKSA9PiBzdHIubGVuZ3RoID4gbGVuID8gc3RyLnN1YnN0cigwLCBsZW4pICsgZW1wIDogc3RyO1xuY29uc3QgZ2V0SW5kTWFyZ2luID0gaW5kID0+IHtcbiAgcmV0dXJuIGBtYXJnaW4tbGVmdDogJHsgaW5kICogMjAgfXB4O2A7XG59O1xuY29uc3QgZ2V0SW5kU3BhY2VzID0gaW5kID0+IHtcbiAgcmV0dXJuIFsuLi5BcnJheShpbmQgKiAyKS5rZXlzKCldLm1hcCh4ID0+ICcgJykuam9pbignJyk7XG59O1xuY29uc3QgcGFyc2VMb2dNZXRhID0gbWV0YSA9PiB7XG4gIGlmICh0eXBlb2YgbWV0YSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiBtZXRhID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgbWV0YSA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBtZXRhID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBgKCR7IEpTT04uc3RyaW5naWZ5KG1ldGEpIH0pYDtcbiAgfVxuICBpZiAodHlwZW9mIG1ldGEgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWV0YSkpIHtcbiAgICAgIHJldHVybiBgKFsuLi4keyBtZXRhLmxlbmd0aCB9XSlgO1xuICAgIH1cbiAgICByZXR1cm4gYCgkeyB0cmltKEpTT04uc3RyaW5naWZ5KHNhbml0aXplKG1ldGEpKSwgNTApIH0pYDtcbiAgfVxuICByZXR1cm4gYCgkeyB0eXBlb2YgbWV0YSB9KWA7XG59O1xuXG5jb25zdCBwcmludCA9IHtcbiAgZW50cmFuY2U6ICh3aGF0LCBpbmQpID0+IHtcbiAgICBpZiAoIWlzUnVubmluZ0luTm9kZSkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbnVsbCxcbiAgICAgICAgYCVjJHsgd2hhdCB9YCxcbiAgICAgICAgJ2NvbG9yOiAjYjBiMGIwOycgKyBnZXRJbmRNYXJnaW4oaW5kKVxuICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIFsgbnVsbCwgJ1xceDFiWzM4bSVzXFx4MWJbMG0nLCBgJHsgZ2V0SW5kU3BhY2VzKGluZCkgKyB3aGF0IH1gXTtcbiAgfSxcbiAgZGVmYXVsdDogKHdoYXQsIGluZCkgPT4ge1xuICAgIGlmICghaXNSdW5uaW5nSW5Ob2RlKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBudWxsLFxuICAgICAgICBgJWMkeyB3aGF0IH1gLFxuICAgICAgICBnZXRJbmRNYXJnaW4oaW5kKVxuICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIFsgbnVsbCwgYCR7IGdldEluZFNwYWNlcyhpbmQpICsgd2hhdCB9YCBdO1xuICB9LFxuICBob29rOiAod2hhdCwgaW5kLCB0aW1lKSA9PiB7XG4gICAgaWYgKCFpc1J1bm5pbmdJbk5vZGUpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGAlYyR7IHdoYXQgfWAsXG4gICAgICAgICdjb2xvcjogIzk5OTsnICsgZ2V0SW5kTWFyZ2luKGluZClcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbIHRpbWUsICdcXHgxYlszNG0lc1xceDFiWzBtJywgYCR7IGdldEluZFNwYWNlcyhpbmQpICsgd2hhdCB9YCBdO1xuICB9LFxuICBjdXJyZW50OiAod2hhdCwgaW5kKSA9PiB7XG4gICAgaWYgKCFpc1J1bm5pbmdJbk5vZGUpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIG51bGwsXG4gICAgICAgIGAlYyR7IHdoYXQgfWAsXG4gICAgICAgICdmb250LXdlaWdodDogYm9sZDsgYm9yZGVyOiBzb2xpZCAxcHggIzk5OTsgYm9yZGVyLXJhZGl1czogMnB4OyBwYWRkaW5nOiAxcHggMDsnICsgZ2V0SW5kTWFyZ2luKGluZClcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbIG51bGwsIGdldEluZFNwYWNlcyhpbmQpICsgYFxceDFiWzEwMG0keyB3aGF0IH1cXHgxYlswbWAgXTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcHJpbnRTbmFwc2hvdFRvQ29uc29sZShzbmFwc2hvdCkge1xuICBjb25zdCBbIHR5cGUsIG5vZGUsIHRyZWUgXSA9IHNuYXBzaG90O1xuXG4gIGxldCBwcmludExpbmVzID0gW1xuICAgIHByaW50LmVudHJhbmNlKCcnLCAwKVxuICBdO1xuXG4gIHByaW50TGluZXMgPSBwcmludExpbmVzLmNvbmNhdCgoZnVuY3Rpb24gbG9vcCh7IGlkLCBpbmQsIG5hbWUsIHVzZWQsIGNoaWxkcmVuLCBsb2dzIH0pIHtcbiAgICBsZXQgbGluZXMgPSBbXTtcbiAgICBsZXQgZWxlbWVudE9wZW5UYWcgPSBgPCR7IG5hbWUgfSR7IHVzZWQgPiAwID8gYCgkeyB1c2VkIH0pYCA6ICcnIH0+YDtcblxuICAgIGxpbmVzLnB1c2goXG4gICAgICBpZCA9PT0gbm9kZS5lbGVtZW50LmlkID8gcHJpbnQuY3VycmVudChlbGVtZW50T3BlblRhZywgaW5kKSA6IHByaW50LmRlZmF1bHQoZWxlbWVudE9wZW5UYWcsIGluZClcbiAgICApO1xuICAgIGlmIChsb2dzICYmIGxvZ3MubGVuZ3RoID4gMCkge1xuICAgICAgbGluZXMgPSBsaW5lcy5jb25jYXQobG9ncy5tYXAoKHsgdHlwZSwgbWV0YSwgdGltZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBwcmludC5ob29rKGDipLcgJHsgdHlwZSB9JHsgcGFyc2VMb2dNZXRhKG1ldGEpIH1gLCBpbmQsIHRpbWUpO1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgbGluZXMgPSBsaW5lcy5jb25jYXQobG9vcChjaGlsZCkpO1xuICAgICAgfSk7XG4gICAgICBsaW5lcy5wdXNoKFxuICAgICAgICBpZCA9PT0gbm9kZS5lbGVtZW50LmlkID8gcHJpbnQuY3VycmVudChgPC8keyBuYW1lIH0+YCwgaW5kKSA6IHByaW50LmRlZmF1bHQoYDwvJHsgbmFtZSB9PmAsIGluZClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBsaW5lcztcbiAgfSkodHJlZSkpO1xuXG4gIC8vIGNvbnNvbGUuY2xlYXIoKTtcbiAgY29uc3Qgc29ydGVkSG9va1RpbWVzID0gcHJpbnRMaW5lc1xuICAgIC5maWx0ZXIoKFsgdGltZSBdKSA9PiB0aW1lICE9PSBudWxsKVxuICAgIC5tYXAoKFsgdGltZSBdKSA9PiB0aW1lKVxuICAgIC5zb3J0KChhLCBiKSA9PiBhID4gYiA/IDEgOiAtMSk7XG5cbiAgcHJpbnRMaW5lcy5mb3JFYWNoKChbIHRpbWUsIC4uLmxpbmUgXSkgPT4ge1xuICAgIGlmIChzb3J0ZWRIb29rVGltZXMubGVuZ3RoID4gMCAmJiB0aW1lKSB7XG4gICAgICBjb25zb2xlLmxvZyguLi5saW5lLCBzb3J0ZWRIb29rVGltZXMuZmluZEluZGV4KHQgPT4gdCA9PT0gdGltZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyguLi5saW5lKTtcbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgd2F0Y2gocHJvY2Vzc29yKSB7XG4gICAgY29uc3Qgc25hcHNob3RzID0gW107XG5cbiAgICBmdW5jdGlvbiBzbmFwc2hvdCh0eXBlLCBub2RlKSB7XG4gICAgICBzbmFwc2hvdHMucHVzaChbXG4gICAgICAgIHR5cGUsXG4gICAgICAgIHsgZWxlbWVudDogeyBpZDogbm9kZS5lbGVtZW50LmlkIH19LFxuICAgICAgICBwcm9jZXNzb3Iuc3lzdGVtKCkudHJlZS5kaWFnbm9zZSgpXG4gICAgICBdKTtcbiAgICAgIHByaW50U25hcHNob3RUb0NvbnNvbGUoc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXSk7XG4gICAgfVxuXG4gICAgLy8gcHJvY2Vzc29yLm9uTm9kZUluKG5vZGUgPT4gc25hcHNob3QoSU4sIG5vZGUpKTtcbiAgICBwcm9jZXNzb3Iub25Ob2RlT3V0KG5vZGUgPT4gc25hcHNob3QoT1VULCBub2RlKSk7XG4gICAgLy8gcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShub2RlID0+IHNuYXBzaG90KFJFTU9WRSwgbm9kZSkpO1xuICB9LFxuICBwcmludFNuYXBzaG90VG9Db25zb2xlKHNuYXBzaG90cykge1xuICAgIHNuYXBzaG90cy5mb3JFYWNoKHByaW50U25hcHNob3RUb0NvbnNvbGUpO1xuICB9XG59O1xubW9kdWxlLmRlZmF1bHQgPSB7fTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQyOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcblx0aWYgKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgRm9jdXNGaWVsZCB9IGZyb20gJy4vRE9NJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hlY2tGb3JFZGl0RmllbGQoeyB0b2RvcyB9KSB7XG4gIHJldHVybiA8Rm9jdXNGaWVsZCBpbmRleD17IHRvZG9zLmZpbmRJbmRleCgoeyBlZGl0aW5nIH0pID0+IGVkaXRpbmcpIH0gLz47XG59XG4iLCJpbXBvcnQge1xuICBUT0dHTEUsXG4gIE5FV19UT0RPLFxuICBERUxFVEUsXG4gIEVESVQsXG4gIEVESVRfVE9ETyxcbiAgQ0xFQVJfQ09NUExFVEVEXG59IGZyb20gJy4vU3RvcmUnO1xuaW1wb3J0IHtcbiAgRklMVEVSX0FMTCxcbiAgRklMVEVSX0FDVElWRSxcbiAgRklMVEVSX0NPTVBMRVRFRFxufSBmcm9tICcuLyc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5jb25zdCAkID0gKHNlbGVjdG9yKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbmNvbnN0IGxpc3QgPSAkKCcudG9kby1saXN0Jyk7XG5jb25zdCBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5cbmNvbnN0IEVOVEVSID0gMTM7XG5jb25zdCBFU0MgPSAyNztcblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxDb250YWluZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGxpc3QuaW5uZXJIVE1MID0gY2hpbGRyZW4oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b2dnbGUnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oVE9HR0xFLCB0b2RvSW5kZXgpO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZGVsZXRlJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKERFTEVURSwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElUX1RPRE8sIHsgaW5kZXg6IHRvZG9JbmRleCwgbGFiZWw6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSAmJiBlLmtleUNvZGUgPT09IEVTQykge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1uZXcnKSAmJiBlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihORVdfVE9ETywgZS50YXJnZXQudmFsdWUpO1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBbXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gRm9jdXNGaWVsZCh7IGluZGV4IH0pIHtcbiAgY29uc3QgZWwgPSAkKGAuZWRpdFtkYXRhLWluZGV4PVwiJHsgaW5kZXggfVwiXWApO1xuXG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPSBlbC52YWx1ZS5sZW5ndGg7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gUHJvZ3Jlc3NDaGVja2VyKHsgdG9kb3MgfSkge1xuICBjb25zdCBjb21wbGV0ZWQgPSB0b2Rvcy5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IGNvbXBsZXRlZCkubGVuZ3RoO1xuICBjb25zdCBpdGVtc0xlZnQgPSB0b2Rvcy5sZW5ndGggLSBjb21wbGV0ZWQ7XG5cbiAgJCgnW2RhdGEtY291bnRdJykuaW5uZXJIVE1MID0gYFxuICAgIDxzdHJvbmc+JHsgaXRlbXNMZWZ0IH08L3N0cm9uZz4gJHsgaXRlbXNMZWZ0ID4gMSB8fCBpdGVtc0xlZnQgPT09IDAgPyAnaXRlbXMnIDogJ2l0ZW0nIH0gbGVmdFxuICBgO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGb290ZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICQoJ1tkYXRhLWZpbHRlcl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFsbCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUxMKTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFjdGl2ZScpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUNUSVZFKTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWNvbXBsZXRlZCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQ09NUExFVEVEKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKCdbZGF0YS1jbGVhci1jb21wbGV0ZWRdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBvblVzZXJBY3Rpb24oQ0xFQVJfQ09NUExFVEVEKTtcbiAgICB9KTtcbiAgfSwgW10pO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaWx0ZXJPcHRpb25zVGFicyh7IGZpbHRlciB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgJCgnW2RhdGEtYWxsXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9BTEwgPyAnc2VsZWN0ZWQnIDogJycpO1xuICAgICQoJ1tkYXRhLWFjdGl2ZV0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUNUSVZFID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgICAkKCdbZGF0YS1jb21wbGV0ZWRdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gIH0sIFsgZmlsdGVyIF0pO1xufVxuIiwiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi9TdG9yZSc7XG5cbmNvbnN0IGluaXRpYWxWYWx1ZSA9IEpTT04uc3RyaW5naWZ5KFtcbiAgVG9Ebyh7IGxhYmVsOiAnQWN0TUwgaXMgdXNpbmcgSlNYJyB9KSxcbiAgVG9Ebyh7IGxhYmVsOiAnSXQgaXMgbGlrZSBSZWFjdCBidXQgbm90IGZvciByZW5kZXJpbmcnIH0pXG5dKTtcblxuZXhwb3J0IGNvbnN0IHVzZUxvY2FsU3RvcmFnZSA9ICgpID0+IHtcbiAgY29uc3QgWyBnZXREYXRhIF0gPSB1c2VTdGF0ZShKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvcycpIHx8IGluaXRpYWxWYWx1ZSkpO1xuXG4gIHJldHVybiBnZXREYXRhKCk7XG59O1xuZXhwb3J0IGNvbnN0IFBlcnNpc3QgPSAoeyB0b2RvcyB9KSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZpbGxDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBGSUxURVJfQUxMLCBGSUxURVJfQUNUSVZFLCBGSUxURVJfQ09NUExFVEVEIH0gZnJvbSAnLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJlcih7IHRvZG9zLCBmaWx0ZXIgfSkge1xuICByZXR1cm4gKFxuICAgIDxGaWxsQ29udGFpbmVyPlxuICAgICAge1xuICAgICAgICAoKSA9PiB0b2Rvc1xuICAgICAgICAuZmlsdGVyKCh7IGNvbXBsZXRlZCB9KSA9PiB7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FMTCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSkgcmV0dXJuICFjb21wbGV0ZWQ7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCkgcmV0dXJuIGNvbXBsZXRlZDtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLm1hcCgodG9kbywgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxpQ2xhc3MgPSB0b2RvLmVkaXRpbmcgPyAnZWRpdGluZycgOiAodG9kby5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnKTtcblxuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8bGkgY2xhc3M9JyR7IGxpQ2xhc3MgfSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGVcbiAgICAgICAgICAgICAgICAgICR7IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfT5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1pbmRleD1cIiR7IGkgfVwiIGRhdGEtbGFiZWw+JHsgdG9kby5sYWJlbCB9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImRlc3Ryb3lcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWRlbGV0ZT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVkaXRcIiB2YWx1ZT1cIiR7IHRvZG8ubGFiZWwgfVwiIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWVkaXQ+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0pLmpvaW4oJycpXG4gICAgICB9XG4gICAgPC9GaWxsQ29udGFpbmVyPlxuICApO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IHVzZVJlZHVjZXIsIHVzZVB1YlN1YiwgdXNlRWZmZWN0IH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuZXhwb3J0IGNvbnN0IFRPR0dMRSA9ICdUT0dHTEUnO1xuZXhwb3J0IGNvbnN0IE5FV19UT0RPID0gJ05FV19UT0RPJztcbmV4cG9ydCBjb25zdCBERUxFVEUgPSAnREVMRVRFJztcbmV4cG9ydCBjb25zdCBFRElUID0gJ0VESVQnO1xuZXhwb3J0IGNvbnN0IEVESVRfVE9ETyA9ICdFRElUX1RPRE8nO1xuZXhwb3J0IGNvbnN0IENMRUFSX0NPTVBMRVRFRCA9ICdDTEVBUl9DT01QTEVURUQnO1xuXG5jb25zdCB0b2dnbGUgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBUT0dHTEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBERUxFVEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IG5ld1RvZG8gPSAobGFiZWwpID0+ICh7IHR5cGU6IE5FV19UT0RPLCBsYWJlbCB9KTtcbmNvbnN0IGVkaXQgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBFRElULCB0b2RvSW5kZXggfSk7XG5jb25zdCBlZGl0VG9EbyA9ICh7IGluZGV4LCBsYWJlbCB9KSA9PiAoeyB0eXBlOiBFRElUX1RPRE8sIGluZGV4LCBsYWJlbCB9KTtcbmNvbnN0IGNsZWFyQ29tcGxldGVkID0gKCkgPT4gKHsgdHlwZTogQ0xFQVJfQ09NUExFVEVEIH0pO1xuXG5leHBvcnQgY29uc3QgVG9EbyA9ICh7IGxhYmVsIH0pID0+ICh7IGxhYmVsLCBjb21wbGV0ZWQ6IGZhbHNlLCBlZGl0aW5nOiBmYWxzZSB9KTtcblxuY29uc3QgcmVkdWNlciA9IGZ1bmN0aW9uICh0b2RvcywgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRTpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgY29tcGxldGVkOiAhdG9kby5jb21wbGV0ZWRcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBFRElUOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24udG9kb0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBlZGl0aW5nOiAhdG9kby5lZGl0aW5nXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVF9UT0RPOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24uaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGxhYmVsOiBhY3Rpb24ubGFiZWwsXG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICB9KTtcbiAgICBjYXNlIE5FV19UT0RPOlxuICAgICAgcmV0dXJuIFsgLi4udG9kb3MsIFRvRG8oeyBsYWJlbDogYWN0aW9uLmxhYmVsIH0pIF07XG4gICAgY2FzZSBERUxFVEU6XG4gICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggIT09IGFjdGlvbi50b2RvSW5kZXgpO1xuICAgIGNhc2UgQ0xFQVJfQ09NUExFVEVEOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbykgPT4gIXRvZG8uY29tcGxldGVkKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRvZG9zO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdG9yZSh7IGluaXRpYWxWYWx1ZSwgY2hpbGRyZW4gfSkge1xuICBjb25zdCBbIHRvZG9zLCBkaXNwYXRjaCBdID0gdXNlUmVkdWNlcihyZWR1Y2VyLCBpbml0aWFsVmFsdWUpO1xuICBjb25zdCB7IHN1YnNjcmliZSB9ID0gdXNlUHViU3ViKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzdWJzY3JpYmUoVE9HR0xFLCAodG9kb0luZGV4KSA9PiBkaXNwYXRjaCh0b2dnbGUodG9kb0luZGV4KSkpO1xuICAgIHN1YnNjcmliZShORVdfVE9ETywgKGxhYmVsKSA9PiBkaXNwYXRjaChuZXdUb2RvKGxhYmVsKSkpO1xuICAgIHN1YnNjcmliZShERUxFVEUsICh0b2RvSW5kZXgpID0+IGRpc3BhdGNoKGRlbGV0ZVRvZG8odG9kb0luZGV4KSkpO1xuICAgIHN1YnNjcmliZShFRElULCAobGFiZWwpID0+IGRpc3BhdGNoKGVkaXQobGFiZWwpKSk7XG4gICAgc3Vic2NyaWJlKEVESVRfVE9ETywgKHBheWxvYWQpID0+IGRpc3BhdGNoKGVkaXRUb0RvKHBheWxvYWQpKSk7XG4gICAgc3Vic2NyaWJlKENMRUFSX0NPTVBMRVRFRCwgKCkgPT4gZGlzcGF0Y2goY2xlYXJDb21wbGV0ZWQoKSkpO1xuICB9LCBbXSk7XG5cbiAgY2hpbGRyZW4oeyB0b2RvczogdG9kb3MoKSB9KTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIHJ1biwgRnJhZ21lbnQsIHVzZVB1YlN1YiwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgcHJvY2Vzc29yIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcbmltcG9ydCBpbnNwZWN0b3IgZnJvbSAnLi4vLi4vLi4vcGFja2FnZXMvaW5zcGVjdG9yJztcblxuaW5zcGVjdG9yLndhdGNoKHByb2Nlc3Nvcik7XG5cbmltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBDaGVja0ZvckVkaXRGaWVsZCBmcm9tICcuL0NoZWNrRm9yRWRpdEZpZWxkJztcbmltcG9ydCB7IFByb2dyZXNzQ2hlY2tlciwgRmlsdGVyT3B0aW9uc1RhYnMsIENvbnRhaW5lciwgRm9vdGVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgdXNlTG9jYWxTdG9yYWdlLCBQZXJzaXN0IH0gZnJvbSAnLi9QZXJzaXN0JztcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9BTEwgPSAnRklMVEVSX0FMTCc7XG5leHBvcnQgY29uc3QgRklMVEVSX0FDVElWRSA9ICdGSUxURVJfQUNUSVZFJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQ09NUExFVEVEID0gJ0ZJTFRFUl9DT01QTEVURUQnO1xuXG5mdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHVzZUxvY2FsU3RvcmFnZSgpO1xuICBjb25zdCB7IHB1Ymxpc2gsIHN1YnNjcmliZSB9ID0gdXNlUHViU3ViKCk7XG4gIGNvbnN0IFsgZmlsdGVyLCBzZXRGaWx0ZXIgXSA9IHVzZVN0YXRlKEZJTFRFUl9BTEwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3Vic2NyaWJlKEZJTFRFUl9BTEwsICgpID0+IHNldEZpbHRlcihGSUxURVJfQUxMKSk7XG4gICAgc3Vic2NyaWJlKEZJTFRFUl9BQ1RJVkUsICgpID0+IHNldEZpbHRlcihGSUxURVJfQUNUSVZFKSk7XG4gICAgc3Vic2NyaWJlKEZJTFRFUl9DT01QTEVURUQsICgpID0+IHNldEZpbHRlcihGSUxURVJfQ09NUExFVEVEKSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxDb250YWluZXIgb25Vc2VyQWN0aW9uPXsgcHVibGlzaCB9IC8+XG4gICAgICA8Rm9vdGVyIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfS8+XG4gICAgICA8U3RvcmUgaW5pdGlhbFZhbHVlPXsgaW5pdGlhbFZhbHVlIH0+XG4gICAgICAgIDxGaWx0ZXJPcHRpb25zVGFicyBmaWx0ZXI9eyBmaWx0ZXIoKSB9IC8+XG4gICAgICAgIDxSZW5kZXJlciBmaWx0ZXI9eyBmaWx0ZXIoKSB9Lz5cbiAgICAgICAgPENoZWNrRm9yRWRpdEZpZWxkIC8+XG4gICAgICAgIDxQcm9ncmVzc0NoZWNrZXIgLz5cbiAgICAgICAgPFBlcnNpc3QgLz5cbiAgICAgIDwvU3RvcmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbnJ1big8QXBwIC8+KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=