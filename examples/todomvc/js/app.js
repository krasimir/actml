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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return inspector; });
/* harmony import */ var _helpers_sanitize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/sanitize */ "../../packages/inspector/helpers/sanitize.js");
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

function inspector(processor, options = {}) {
  const snapshots = [];

  function snapshot(type, node) {
    snapshots.push([type, node, processor.system().tree.diagnose()]);
    printSnapshotToConsole(snapshots[snapshots.length - 1], options);
  } // processor.onNodeIn(node => snapshot(IN, node));


  processor.onNodeOut(node => snapshot(OUT, node)); // processor.onNodeRemove(node => snapshot(REMOVE, node));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1Byb2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL1F1ZXVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZUNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFZmZlY3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUHViU3ViLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlUmVkdWNlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVN0YXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi91dGlscy9pc0FjdE1MRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbm9kZV9tb2R1bGVzL2Zhc3QtZGVlcC1lcXVhbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2hlbHBlcnMvc2FuaXRpemUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9DaXJjdWxhckpTT04uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3BhY2thZ2VzL2luc3BlY3Rvci9oZWxwZXJzL3ZlbmRvci9TZXJpYWxpemVFcnJvci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvcGFja2FnZXMvaW5zcGVjdG9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQ2hlY2tGb3JFZGl0RmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGVyc2lzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImdldEZ1bmNOYW1lIiwiZnVuYyIsIm5hbWUiLCJyZXN1bHQiLCJleGVjIiwidG9TdHJpbmciLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsIkVycm9yIiwiX19hY3RtbCIsIl9fdXNlZCIsIl9fcnVubmluZyIsImlkIiwiaW5pdGlhbGl6ZSIsInVzZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtZXJnZVByb3BzIiwibmV3UHJvcHMiLCJhc3NpZ24iLCJpc1J1bm5pbmciLCJpbiIsIl9pbiIsImNvbnN1bWUiLCJvdXQiLCJkZWZhdWx0IiwiY3JlYXRlQ29udGV4dEZhY3RvcnkiLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJrZXkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJDT05URVhUX0tFWSIsIlBVQkxJQ19DT05URVhUX0tFWSIsImlkcyIsImdldElkIiwicmVzb2x2ZUNvbnRleHQiLCJub2RlIiwic3RhY2siLCJwdXNoIiwiZWxlbWVudCIsInBhcmVudCIsImNvbnNvbGUiLCJ3YXJuIiwibWFwIiwiam9pbiIsInByb2Nlc3NvciIsImNyZWF0ZUNvbnRleHQiLCJpbml0aWFsVmFsdWUiLCJfcmVmMyIsIlByb3ZpZGVyIiwiX3JlZiIsIkNvbnN1bWVyIiwiX3JlZjIiLCJjcmVhdGVQcm9jZXNzb3IiLCJfaXNBY3RNTEVsZW1lbnQiLCJyZXF1aXJlIiwiX2lzQWN0TUxFbGVtZW50MiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfVHJlZSIsIl9UcmVlMiIsIl91c2VQdWJTdWIiLCJfdXNlUHViU3ViMiIsIl91c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfdXNlRWZmZWN0IiwiX3VzZUVmZmVjdDIiLCJfUXVldWUiLCJfUXVldWUyIiwiX19lc01vZHVsZSIsIkNISUxEUkVOIiwiQ09OU1VNRSIsIlBST0NFU1NfUkVTVUxUIiwiUkVUVVJORURfRUxFTUVOVCIsIkNISUxEIiwiaXNHZW5lcmF0b3IiLCJpc1Byb21pc2UiLCJjcmVhdGVDaGlsZHJlbkZ1bmMiLCJwcm9jZXNzTm9kZSIsImYiLCJfYXJndW1lbnRzIiwicXVldWVJdGVtc1RvQWRkIiwicmVzdWx0cyIsImNoaWxkcmVuUXVldWUiLCJfbG9vcCIsImkiLCJfY2hpbGRyZW4kaSIsImFwcGx5IiwiYWRkQ2hpbGROb2RlIiwiZnVuY1Jlc3VsdCIsInJldmVyc2UiLCJmb3JFYWNoIiwicHJlcGVuZEl0ZW0iLCJyIiwicHJvY2VzcyIsIm9uRG9uZSIsInRyZWUiLCJjdXJyZW50Tm9kZSIsInJlcnVuIiwicXVldWUiLCJhZGQiLCJjb25zdW1wdGlvbiIsImdlbmVyYXRvciIsIlByb21pc2UiLCJnZW5lcmF0b3JEb25lIiwiZ2VuUmVzdWx0IiwiaXRlcmF0ZSIsIm5leHQiLCJkb25lIiwicmVzIiwidGhlbiIsIl9yZXMiLCJydW4iLCJyb290Tm9kZSIsInJlc29sdmVSb290Iiwib25Ob2RlSW4iLCJjYWxsYmFjayIsImFkZE5vZGVJbkNhbGxiYWNrIiwib25Ob2RlT3V0IiwiYWRkTm9kZU91dENhbGxiYWNrIiwib25Ob2RlUmVtb3ZlIiwic3lzdGVtIiwicmVzZXQiLCJjbGVhciIsImNyZWF0ZVF1ZXVlIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwiYXJyIiwiQXJyYXkiLCJpc0FycmF5IiwiYXJyMiIsImZyb20iLCJMT0dTIiwibG9nIiwiX2NvbnNvbGUiLCJjcmVhdGVJdGVtIiwidHlwZSIsImNvbnRleHQiLCJpdGVtcyIsImFzeW5jIiwicnVubmluZyIsInJlbGVhc2UiLCJjb25jYXQiLCJsYXN0UmVzdWx0IiwiX3RoaXMiLCJpdGVtIiwic2hpZnQiLCJhc3luY1Jlc3VsdCIsImNhdGNoIiwiZXJyb3IiLCJnZXRSZXN1bHQiLCJyZWplY3QiLCJfZXh0ZW5kcyIsInRhcmdldCIsInNvdXJjZSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIlRyZWUiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJrZXlzIiwiaW5kZXhPZiIsIl9vbk5vZGVSZW1vdmUiLCJyb290IiwiY3JlYXRlTmV3Tm9kZSIsInVzZVNhbWVOb2RlIiwibmV3RWxlbWVudCIsInRyZWVEaWZmIiwib2xkRWxlbWVudCIsImN1cnNvciIsImMiLCJfX0RFVl9fIiwiX3RoaXMyIiwic3BsaWNlIiwicmVtb3ZlZE5vZGUiLCJsb2dzIiwiX3RoaXMzIiwiY2hpbGROb2RlIiwibmV3Q2hpbGROb2RlIiwibWV0YSIsInRpbWUiLCJwZXJmb3JtYW5jZSIsIm5vdyIsImdldE51bU9mRWxlbWVudHMiLCJkaWFnbm9zZSIsImxvb3BPdmVyIiwiaW5kIiwicmVzdCIsImNoaWxkIiwiX2lzVmFsaWRIb29rQ29udGV4dCIsIl9pc1ZhbGlkSG9va0NvbnRleHQyIiwiX0NvbnRleHQiLCJjcmVhdGVVc2VFbGVtZW50SG9vayIsIkNvbnRleHQiLCJfZmFzdERlZXBFcXVhbCIsIl9mYXN0RGVlcEVxdWFsMiIsIlN0b3JhZ2UiLCJlbGVtZW50cyIsImdldCIsImVmZmVjdHMiLCJjb25zdW1lciIsImNsZWFuVXAiLCJjcmVhdGVFZmZlY3QiLCJkZXBzIiwidXBkYXRlRWZmZWN0IiwiZWZmZWN0Iiwib2xkRGVwcyIsImRlcHNFcXVhbCIsIm5ld0RlcHMiLCJyZXNvbHZlRWZmZWN0IiwiYXJlRXF1YWwiLCJjcmVhdGVVc2VFZmZlY3RIb29rIiwic3RvcmFnZSIsImluZGV4IiwiY3JlYXRlVXNlUHViU3ViSG9vayIsInN1YnNjcmliZXJzIiwic3Vic2NyaWJlIiwicHVibGlzaCIsInBheWxvYWQiLCJzY29wZWRFbGVtZW50IiwiZWwiLCJzdWJzY3JpYmVGdW5jIiwiX2xlbiIsInBhcmFtcyIsIl9rZXkiLCJwdWJsaXNoRnVuYyIsIl9sZW4yIiwiX2tleTIiLCJfc2xpY2VkVG9BcnJheSIsInNsaWNlSXRlcmF0b3IiLCJfYXJyIiwiX24iLCJfZCIsIl9lIiwiX2kiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9zIiwiZXJyIiwiVHlwZUVycm9yIiwiY3JlYXRlVXNlUmVkdWNlckhvb2siLCJjcmVhdGVEaXNwYXRjaEVsZW1lbnQiLCJkaXNwYXRjaCIsImFjdGlvbiIsInByb3BzVG9BY3Rpb24iLCJ1c2VTdGF0ZSIsInJlZHVjZXIiLCJpbml0aWFsU3RhdGUiLCJzdGF0ZSIsInNldFN0YXRlIiwiY3JlYXRlVXNlU3RhdGVIb29rIiwic3RhdGVzIiwibmV3U3RhdGUiLCJpc1ZhbGlkSG9va0NvbnRleHQiLCJjcmVhdGVSdW50aW1lIiwiX1Byb2Nlc3NvciIsIl9Qcm9jZXNzb3IyIiwiX0FjdEVsZW1lbnQiLCJfQWN0RWxlbWVudDIiLCJfdXNlRWxlbWVudCIsIl91c2VFbGVtZW50MiIsIl91c2VSZWR1Y2VyIiwiX3VzZVJlZHVjZXIyIiwiX3VzZUNvbnRleHQiLCJfdXNlQ29udGV4dDIiLCJfQ29udGV4dDIiLCJBIiwiRnJhZ21lbnQiLCJ1c2VFbGVtZW50IiwidXNlUHViU3ViIiwidXNlUmVkdWNlciIsInVzZUVmZmVjdCIsInVzZUNvbnRleHQiLCJydW50aW1lIiwibW9kdWxlIiwiaXNBY3RNTEVsZW1lbnQiLCJzdHJpbmdpZnkiLCJDaXJjdWxhckpTT04iLCJzYW5pdGl6ZSIsInNvbWV0aGluZyIsInNob3dFcnJvckluQ29uc29sZSIsIkpTT04iLCJwYXJzZSIsIlNlcmlhbGl6ZUVycm9yIiwic3BlY2lhbENoYXIiLCJzYWZlU3BlY2lhbENoYXIiLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJlc2NhcGVkU2FmZVNwZWNpYWxDaGFyIiwic3BlY2lhbENoYXJSRyIsIlJlZ0V4cCIsInNhZmVTcGVjaWFsQ2hhclJHIiwic2FmZVN0YXJ0V2l0aFNwZWNpYWxDaGFyUkciLCJ2IiwiJFN0cmluZyIsIlN0cmluZyIsImdlbmVyYXRlUmVwbGFjZXIiLCJyZXBsYWNlciIsInJlc29sdmUiLCJpbnNwZWN0IiwicGF0aCIsImFsbCIsInNlZW4iLCJtYXBwIiwibGFzdCIsImx2bCIsImZuIiwicmVwbGFjZSIsInJldHJpZXZlRnJvbVBhdGgiLCJjdXJyZW50IiwiZ2VuZXJhdGVSZXZpdmVyIiwicmV2aXZlciIsImlzU3RyaW5nIiwiY2hhckF0IiwicmVnZW5lcmF0ZSIsInJlZ2VuZXJhdGVBcnJheSIsInJldHJpZXZlIiwicmVnZW5lcmF0ZU9iamVjdCIsInNwbGl0Iiwic3RyaW5naWZ5UmVjdXJzaW9uIiwic3BhY2UiLCJkb05vdFJlc29sdmUiLCJwYXJzZVJlY3Vyc2lvbiIsInRleHQiLCJkZXN0cm95Q2lyY3VsYXIiLCJ0byIsIm1lc3NhZ2UiLCJJTiIsIk9VVCIsIlJFTU9WRSIsImlzUnVubmluZ0luTm9kZSIsInRyaW0iLCJzdHIiLCJsZW4iLCJlbXAiLCJzdWJzdHIiLCJnZXRJbmRNYXJnaW4iLCJnZXRJbmRTcGFjZXMiLCJ4IiwicGFyc2VMb2dNZXRhIiwicHJpbnQiLCJlbnRyYW5jZSIsIndoYXQiLCJob29rIiwicHJpbnRTbmFwc2hvdFRvQ29uc29sZSIsInNuYXBzaG90IiwicHJpbnRMaW5lcyIsImxvb3AiLCJsaW5lcyIsImVsZW1lbnRPcGVuVGFnIiwic29ydGVkSG9va1RpbWVzIiwiZmlsdGVyIiwic29ydCIsImEiLCJiIiwibGluZSIsImZpbmRJbmRleCIsInQiLCJpbnNwZWN0b3IiLCJvcHRpb25zIiwic25hcHNob3RzIiwiQ2hlY2tGb3JFZGl0RmllbGQiLCJ0b2RvcyIsImVkaXRpbmciLCIkIiwic2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsaXN0IiwiaGVhZGVyIiwiRU5URVIiLCJFU0MiLCJGaWxsQ29udGFpbmVyIiwiaW5uZXJIVE1MIiwiQ29udGFpbmVyIiwib25Vc2VyQWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0b2RvSW5kZXgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsIlRPR0dMRSIsIkRFTEVURSIsIkVESVQiLCJFRElUX1RPRE8iLCJsYWJlbCIsImtleUNvZGUiLCJORVdfVE9ETyIsIkZvY3VzRmllbGQiLCJmb2N1cyIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiUHJvZ3Jlc3NDaGVja2VyIiwiY29tcGxldGVkIiwiaXRlbXNMZWZ0IiwiRm9vdGVyIiwiRklMVEVSX0FMTCIsIkZJTFRFUl9BQ1RJVkUiLCJGSUxURVJfQ09NUExFVEVEIiwiQ0xFQVJfQ09NUExFVEVEIiwiRmlsdGVyT3B0aW9uc1RhYnMiLCJzZXRBdHRyaWJ1dGUiLCJUb0RvIiwidXNlTG9jYWxTdG9yYWdlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImdldERhdGEiLCJQZXJzaXN0Iiwic2V0SXRlbSIsIlJlbmRlcmVyIiwidG9kbyIsImxpQ2xhc3MiLCJ0b2dnbGUiLCJkZWxldGVUb2RvIiwibmV3VG9kbyIsImVkaXQiLCJlZGl0VG9EbyIsImNsZWFyQ29tcGxldGVkIiwiU3RvcmUiLCJBcHAiLCJzZXRGaWx0ZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRmE7O0FBRWJBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLE9BQUssRUFBRTtBQURvQyxDQUE3Qzs7QUFHQSxTQUFTQyxXQUFULENBQXFCQyxJQUFyQixFQUEyQjtBQUN6QixNQUFJQSxJQUFJLENBQUNDLElBQVQsRUFBZSxPQUFPRCxJQUFJLENBQUNDLElBQVo7QUFDZixNQUFJQyxNQUFNLEdBQUcsNkJBQTZCQyxJQUE3QixDQUFrQ0gsSUFBSSxDQUFDSSxRQUFMLEVBQWxDLENB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Q0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkLEtBQUs7QUFDTCxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtB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QSxLQUFiLENBQVQ7QUFDQXJMLGFBQVMsQ0FBQ3NMLGFBQUQsRUFBZ0I7QUFBQSxhQUFNdUIsU0FBUyxDQUFDdkIsYUFBRCxDQUFmO0FBQUEsS0FBaEIsQ0FBVDtBQUNBdEwsYUFBUyxDQUFDdUwsZ0JBQUQsRUFBbUI7QUFBQSxhQUFNc0IsU0FBUyxDQUFDdEIsZ0JBQUQsQ0FBZjtBQUFBLEtBQW5CLENBQVQ7QUFDRCxHQUpRLEVBSU4sRUFKTSxDQUFUO0FBTUEsU0FDRSwrQ0FBQyw2Q0FBRCxRQUNFLCtDQUFDLDhDQUFEO0FBQVcsZ0JBQVksRUFBR3RMO0FBQTFCLElBREYsRUFFRSwrQ0FBQywyQ0FBRDtBQUFRLGdCQUFZLEVBQUdBO0FBQXZCLElBRkYsRUFHRSwrQ0FBQyw4Q0FBRDtBQUFPLGdCQUFZLEVBQUd4SztBQUF0QixLQUNFLCtDQUFDLHNEQUFEO0FBQW1CLFVBQU0sRUFBRzhTLE1BQU07QUFBbEMsSUFERixFQUVFLCtDQUFDLGlEQUFEO0FBQVUsVUFBTSxFQUFHQSxNQUFNO0FBQXpCLElBRkYsRUFHRSwrQ0FBQywwREFBRCxPQUhGLEVBSUUsK0NBQUMsb0RBQUQsT0FKRixFQUtFLCtDQUFDLGdEQUFELE9BTEYsQ0FIRixDQURGO0FBYUQ7O0FBQUE7QUFFRDlPLGdEQUFHLENBQUMsK0NBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gZ2V0RnVuY05hbWUoZnVuYykge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuICB2YXIgcmVzdWx0ID0gL15mdW5jdGlvblxccysoW1xcd1xcJF0rKVxccypcXCgvLmV4ZWMoZnVuYy50b1N0cmluZygpKTtcblxuICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0WzFdIDogJ3Vua25vd24nO1xufTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0cyBhIGZ1bmN0aW9uLiBcIicgKyBmdW5jICsgJ1wiIGdpdmVuIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIF9fdXNlZDogMCxcbiAgICBfX3J1bm5pbmc6IGZhbHNlLFxuICAgIGlkOiBudWxsLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICBuYW1lOiBnZXRGdW5jTmFtZShmdW5jKSxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShpZCkge1xuICAgICAgdmFyIHVzZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHRoaXMuX191c2VkID0gdXNlZDtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfSxcbiAgICBtZXJnZVByb3BzOiBmdW5jdGlvbiBtZXJnZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIH0sXG4gICAgdXNlZDogZnVuY3Rpb24gdXNlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fdXNlZDtcbiAgICB9LFxuICAgIGlzUnVubmluZzogZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19ydW5uaW5nO1xuICAgIH0sXG4gICAgaW46IGZ1bmN0aW9uIF9pbigpIHtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gdHJ1ZTtcbiAgICB9LFxuICAgIGNvbnN1bWU6IGZ1bmN0aW9uIGNvbnN1bWUoKSB7XG4gICAgICByZXR1cm4gZnVuYyh0aGlzLnByb3BzKTtcbiAgICB9LFxuICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgdGhpcy5fX3VzZWQgKz0gMTtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlRWxlbWVudDsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVDb250ZXh0RmFjdG9yeTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkgeyBpZiAoa2V5IGluIG9iaikgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBlbnVtZXJhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pOyB9IGVsc2UgeyBvYmpba2V5XSA9IHZhbHVlOyB9IHJldHVybiBvYmo7IH1cblxuLyogZXNsaW50LWRpc2FibGUgY29uc2lzdGVudC1yZXR1cm4gKi9cbnZhciBDT05URVhUX0tFWSA9ICdfX0NPTlRFWFRfS0VZX18nO1xuXG52YXIgUFVCTElDX0NPTlRFWFRfS0VZID0gZXhwb3J0cy5QVUJMSUNfQ09OVEVYVF9LRVkgPSAnX19QVUJMSUNfQ09OVEVYVF9LRVlfXyc7XG5cbnZhciBpZHMgPSAwO1xuXG5mdW5jdGlvbiBnZXRJZCgpIHtcbiAgcmV0dXJuICdjJyArICsraWRzO1xufTtcbmZ1bmN0aW9uIHJlc29sdmVDb250ZXh0KG5vZGUsIGlkKSB7XG4gIHZhciBzdGFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG5cbiAgc3RhY2sucHVzaChub2RlLmVsZW1lbnQubmFtZSk7XG4gIGlmIChub2RlW0NPTlRFWFRfS0VZXSAmJiBpZCBpbiBub2RlW0NPTlRFWFRfS0VZXSkge1xuICAgIHJldHVybiBub2RlW0NPTlRFWFRfS0VZXVtpZF07XG4gIH0gZWxzZSBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICByZXR1cm4gcmVzb2x2ZUNvbnRleHQobm9kZS5wYXJlbnQsIGlkLCBzdGFjayk7XG4gIH1cbiAgY29uc29sZS53YXJuKCdBIGNvbnRleHQgY29uc3VtZXIgaXMgdXNlZCB3aXRoIG5vIHByb3ZpZGVyLlxcbiAgU3RhY2s6XFxuJyArIHN0YWNrLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAnICAgIDwnICsgbmFtZSArICc+JztcbiAgfSkuam9pbignXFxuJykpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0RmFjdG9yeShwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoaW5pdGlhbFZhbHVlKSB7XG4gICAgdmFyIF9yZWYzO1xuXG4gICAgdmFyIGlkID0gZ2V0SWQoKTtcblxuICAgIHZhciBQcm92aWRlciA9IGZ1bmN0aW9uIFByb3ZpZGVyKF9yZWYpIHtcbiAgICAgIHZhciB2YWx1ZSA9IF9yZWYudmFsdWUsXG4gICAgICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuXG4gICAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG5cbiAgICAgIGlmICghbm9kZVtDT05URVhUX0tFWV0pIHtcbiAgICAgICAgbm9kZVtDT05URVhUX0tFWV0gPSB7fTtcbiAgICAgIH1cbiAgICAgIG5vZGVbQ09OVEVYVF9LRVldW2lkXSA9IHZhbHVlO1xuXG4gICAgICByZXR1cm4gY2hpbGRyZW47XG4gICAgfTtcbiAgICB2YXIgQ29uc3VtZXIgPSBmdW5jdGlvbiBDb25zdW1lcihfcmVmMikge1xuICAgICAgdmFyIGNoaWxkcmVuID0gX3JlZjIuY2hpbGRyZW47XG5cbiAgICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgICAgY2hpbGRyZW4ocmVzb2x2ZUNvbnRleHQobm9kZSwgaWQpIHx8IGluaXRpYWxWYWx1ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBfcmVmMyA9IHt9LCBfZGVmaW5lUHJvcGVydHkoX3JlZjMsIFBVQkxJQ19DT05URVhUX0tFWSwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgICByZXR1cm4gcmVzb2x2ZUNvbnRleHQobm9kZSwgaWQpIHx8IGluaXRpYWxWYWx1ZTtcbiAgICB9KSwgX2RlZmluZVByb3BlcnR5KF9yZWYzLCAnUHJvdmlkZXInLCBQcm92aWRlciksIF9kZWZpbmVQcm9wZXJ0eShfcmVmMywgJ0NvbnN1bWVyJywgQ29uc3VtZXIpLCBfcmVmMztcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUHJvY2Vzc29yO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50ID0gcmVxdWlyZSgnLi91dGlscy9pc0FjdE1MRWxlbWVudCcpO1xuXG52YXIgX2lzQWN0TUxFbGVtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzQWN0TUxFbGVtZW50KTtcblxudmFyIF9UcmVlID0gcmVxdWlyZSgnLi9UcmVlJyk7XG5cbnZhciBfVHJlZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9UcmVlKTtcblxudmFyIF91c2VQdWJTdWIgPSByZXF1aXJlKCcuL2hvb2tzL3VzZVB1YlN1YicpO1xuXG52YXIgX3VzZVB1YlN1YjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VQdWJTdWIpO1xuXG52YXIgX3VzZVN0YXRlID0gcmVxdWlyZSgnLi9ob29rcy91c2VTdGF0ZScpO1xuXG52YXIgX3VzZVN0YXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3VzZVN0YXRlKTtcblxudmFyIF91c2VFZmZlY3QgPSByZXF1aXJlKCcuL2hvb2tzL3VzZUVmZmVjdCcpO1xuXG52YXIgX3VzZUVmZmVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VFZmZlY3QpO1xuXG52YXIgX1F1ZXVlID0gcmVxdWlyZSgnLi9RdWV1ZScpO1xuXG52YXIgX1F1ZXVlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1F1ZXVlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIGNvbnNpc3RlbnQtcmV0dXJuICovXG52YXIgQ0hJTERSRU4gPSAnX19BQ1RNTF9DSElMRFJFTl9fJztcblxudmFyIENPTlNVTUUgPSAnQ09OU1VNRSc7XG52YXIgUFJPQ0VTU19SRVNVTFQgPSAnUFJPQ0VTU19SRVNVTFQnO1xudmFyIFJFVFVSTkVEX0VMRU1FTlQgPSAnUkVUVVJORURfRUxFTUVOVCc7XG52YXIgQ0hJTEQgPSAnQ0hJTEQnO1xuXG52YXIgaXNHZW5lcmF0b3IgPSBmdW5jdGlvbiBpc0dlbmVyYXRvcihvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqWyduZXh0J10gPT09ICdmdW5jdGlvbic7XG59O1xudmFyIGlzUHJvbWlzZSA9IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqWyd0aGVuJ10gPT09ICdmdW5jdGlvbic7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVDaGlsZHJlbkZ1bmMobm9kZSwgcHJvY2Vzc05vZGUpIHtcbiAgdmFyIGYgPSBmdW5jdGlvbiBmKCkge1xuICAgIHZhciBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuZWxlbWVudC5jaGlsZHJlbjtcblxuXG4gICAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBxdWV1ZUl0ZW1zVG9BZGQgPSBbXTtcbiAgICAgIHZhciByZXN1bHRzID0gW107XG4gICAgICB2YXIgY2hpbGRyZW5RdWV1ZSA9ICgwLCBfUXVldWUyLmRlZmF1bHQpKCcgICcgKyBub2RlLmVsZW1lbnQubmFtZSArICc6Y2hpbGRyZW4nKTtcblxuICAgICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoaSkge1xuICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoY2hpbGRyZW5baV0pKSB7XG4gICAgICAgICAgdmFyIF9jaGlsZHJlbiRpO1xuXG4gICAgICAgICAgKF9jaGlsZHJlbiRpID0gY2hpbGRyZW5baV0pLm1lcmdlUHJvcHMuYXBwbHkoX2NoaWxkcmVuJGksIF9hcmd1bWVudHMpO1xuICAgICAgICAgIHF1ZXVlSXRlbXNUb0FkZC5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShjaGlsZHJlbltpXSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjaGlsZHJlbltpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBmdW5jUmVzdWx0ID0gY2hpbGRyZW5baV0uYXBwbHkoY2hpbGRyZW4sIF9hcmd1bWVudHMpO1xuXG4gICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGZ1bmNSZXN1bHQpKSB7XG4gICAgICAgICAgICBxdWV1ZUl0ZW1zVG9BZGQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShmdW5jUmVzdWx0KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGZ1bmNSZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2goY2hpbGRyZW5baV0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF9sb29wKGkpO1xuICAgICAgfVxuICAgICAgcXVldWVJdGVtc1RvQWRkLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIGNoaWxkcmVuUXVldWUucHJlcGVuZEl0ZW0oQ0hJTEQsIGZ1bmMsIGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHMucHVzaChyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGNoaWxkcmVuUXVldWUucHJvY2VzcygpO1xuICAgICAgcmV0dXJuIGNoaWxkcmVuUXVldWUub25Eb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZltDSElMRFJFTl0gPSB0cnVlO1xuICByZXR1cm4gZjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvY2Vzc29yKCkge1xuICB2YXIgdHJlZSA9ICgwLCBfVHJlZTIuZGVmYXVsdCkoKTtcbiAgdmFyIGN1cnJlbnROb2RlID0gbnVsbDtcblxuICB2YXIgcHJvY2Vzc05vZGUgPSBmdW5jdGlvbiBwcm9jZXNzTm9kZShub2RlKSB7XG4gICAgY3VycmVudE5vZGUgPSBub2RlO1xuICAgIG5vZGUuaW4oKTtcbiAgICBub2RlLnJlcnVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUpO1xuICAgIH07XG4gICAgbm9kZS5lbGVtZW50Lm1lcmdlUHJvcHMoe1xuICAgICAgY2hpbGRyZW46IGNyZWF0ZUNoaWxkcmVuRnVuYyhub2RlLCBwcm9jZXNzTm9kZSlcbiAgICB9KTtcblxuICAgIHZhciByZXN1bHRzID0ge307XG4gICAgdmFyIHF1ZXVlID0gKDAsIF9RdWV1ZTIuZGVmYXVsdCkoJyAnICsgbm9kZS5lbGVtZW50Lm5hbWUpO1xuXG4gICAgLy8gQ09OU1VNRVxuICAgIHF1ZXVlLmFkZChDT05TVU1FLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbm9kZS5lbGVtZW50LmNvbnN1bWUoKTtcbiAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0c1tDT05TVU1FXSA9IHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8vIFBST0NFU1NfUkVTVUxUXG4gICAgcXVldWUuYWRkKFBST0NFU1NfUkVTVUxULCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgY29uc3VtcHRpb24gPSByZXN1bHRzW0NPTlNVTUVdO1xuXG4gICAgICAvLyBBY3RNTCBlbGVtZW50XG4gICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoY29uc3VtcHRpb24pKSB7XG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoY29uc3VtcHRpb24pKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBnZW5lcmF0b3JcbiAgICAgIH0gZWxzZSBpZiAoaXNHZW5lcmF0b3IoY29uc3VtcHRpb24pKSB7XG4gICAgICAgIHZhciBnZW5lcmF0b3IgPSBjb25zdW1wdGlvbjtcblxuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChnZW5lcmF0b3JEb25lKSB7XG4gICAgICAgICAgICB2YXIgZ2VuUmVzdWx0ID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAoZnVuY3Rpb24gaXRlcmF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICBnZW5SZXN1bHQgPSBnZW5lcmF0b3IubmV4dCh2YWx1ZSk7XG4gICAgICAgICAgICAgIGlmICghZ2VuUmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHJlcyA9IHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlKHJlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0ZShyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRlKHJlcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgX3JlcyA9IHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGdlblJlc3VsdC52YWx1ZSkpO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlKF9yZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZXMudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZW5lcmF0b3JEb25lKHIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRvckRvbmUoX3Jlcyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGdlbmVyYXRvckRvbmUoZ2VuUmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gY2hpbGRyZW5cbiAgICAgIH0gZWxzZSBpZiAoY29uc3VtcHRpb24gJiYgY29uc3VtcHRpb25bQ0hJTERSRU5dKSB7XG4gICAgICAgIHF1ZXVlLnByZXBlbmRJdGVtKFJFVFVSTkVEX0VMRU1FTlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtcHRpb24oKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gPSByZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA9PT0gMSA/IHJlc3VsdFswXSA6IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBSdW5uaW5nIHRoZSBxdWV1ZVxuICAgIHF1ZXVlLnByb2Nlc3MoKTtcblxuICAgIC8vIEdldHRpbmcgdGhlIHJlc3VsdC4gSXQgaXMgZWl0aGVyIGEgcHJvbWlzZSBpZiB0aGVyZSBpc1xuICAgIC8vIHNvbWV0aGluZyBhc3luY2hyb25vdXMgb3IgYSB2YWx1ZVxuICAgIHJldHVybiBxdWV1ZS5vbkRvbmUoZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5vdXQoKTtcbiAgICAgIHJldHVybiBSRVRVUk5FRF9FTEVNRU5UIGluIHJlc3VsdHMgPyByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdIDogcmVzdWx0c1tDT05TVU1FXTtcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIG5vZGU6IGZ1bmN0aW9uIG5vZGUoKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSxcbiAgICBydW46IGZ1bmN0aW9uIHJ1bihlbGVtZW50KSB7XG4gICAgICB2YXIgcm9vdE5vZGUgPSB0cmVlLnJlc29sdmVSb290KGVsZW1lbnQpO1xuXG4gICAgICByZXR1cm4gcHJvY2Vzc05vZGUocm9vdE5vZGUpO1xuICAgIH0sXG4gICAgb25Ob2RlSW46IGZ1bmN0aW9uIG9uTm9kZUluKGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVJbkNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZU91dDogZnVuY3Rpb24gb25Ob2RlT3V0KGNhbGxiYWNrKSB7XG4gICAgICB0cmVlLmFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVSZW1vdmU6IGZ1bmN0aW9uIG9uTm9kZVJlbW92ZShjYWxsYmFjaykge1xuICAgICAgdHJlZS5vbk5vZGVSZW1vdmUoY2FsbGJhY2spO1xuICAgIH0sXG4gICAgc3lzdGVtOiBmdW5jdGlvbiBzeXN0ZW0oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmVlOiB0cmVlLFxuICAgICAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgICAgY3VycmVudE5vZGUgPSBudWxsO1xuICAgICAgICAgIHRyZWUucmVzZXQoKTtcbiAgICAgICAgICBfdXNlUHViU3ViMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgICAgX3VzZVN0YXRlMi5kZWZhdWx0LmNsZWFyKCk7XG4gICAgICAgICAgX3VzZUVmZmVjdDIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlUXVldWU7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG52YXIgTE9HUyA9IGZhbHNlO1xudmFyIGxvZyA9IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIF9jb25zb2xlO1xuXG4gIHJldHVybiBMT0dTID8gKF9jb25zb2xlID0gY29uc29sZSkubG9nLmFwcGx5KF9jb25zb2xlLCBhcmd1bWVudHMpIDogbnVsbDtcbn07XG52YXIgaXNQcm9taXNlID0gZnVuY3Rpb24gaXNQcm9taXNlKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmpbJ3RoZW4nXSA9PT0gJ2Z1bmN0aW9uJztcbn07XG52YXIgY3JlYXRlSXRlbSA9IGZ1bmN0aW9uIGNyZWF0ZUl0ZW0odHlwZSwgZnVuYykge1xuICB2YXIgb25Eb25lID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmdW5jdGlvbiAoKSB7fTtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIGZ1bmM6IGZ1bmMsXG4gICAgb25Eb25lOiBvbkRvbmVcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVF1ZXVlKGNvbnRleHQpIHtcbiAgdmFyIGl0ZW1zID0gW107XG4gIHZhciBhc3luYyA9IGZhbHNlO1xuICB2YXIgcnVubmluZyA9IGZhbHNlO1xuICB2YXIgcmVsZWFzZSA9IGZ1bmN0aW9uIHJlbGVhc2UoKSB7fTtcblxuICByZXR1cm4ge1xuICAgIGFkZDogZnVuY3Rpb24gYWRkKHR5cGUsIGZ1bmMsIG9uRG9uZSkge1xuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6IFsuLi4nICsgdHlwZSArICddICgnICsgKGl0ZW1zLmxlbmd0aCArIDEpICsgJyB0b3RhbCknKTtcbiAgICAgIGl0ZW1zLnB1c2goY3JlYXRlSXRlbSh0eXBlLCBmdW5jLCBvbkRvbmUpKTtcbiAgICB9LFxuICAgIHByZXBlbmRJdGVtOiBmdW5jdGlvbiBwcmVwZW5kSXRlbSh0eXBlLCBmdW5jLCBvbkRvbmUpIHtcbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiBbJyArIHR5cGUgKyAnLi4uXSAoJyArIChpdGVtcy5sZW5ndGggKyAxKSArICcgdG90YWwpJyk7XG4gICAgICBpdGVtcyA9IFtjcmVhdGVJdGVtKHR5cGUsIGZ1bmMsIG9uRG9uZSldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoaXRlbXMpKTtcbiAgICB9LFxuICAgIHByb2Nlc3M6IGZ1bmN0aW9uIHByb2Nlc3MobGFzdFJlc3VsdCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgcnVubmluZyA9IHRydWU7XG4gICAgICBpZiAoaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGxvZyhjb250ZXh0ICsgJzpROmRvbmUnKTtcbiAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICByZWxlYXNlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZW0gPSBpdGVtcy5zaGlmdCgpO1xuXG4gICAgICBsb2coY29udGV4dCArICc6UTogJyArIGl0ZW0udHlwZSArICcoKSAoJyArIGl0ZW1zLmxlbmd0aCArICcgbGVmdCknKTtcbiAgICAgIHZhciByZXN1bHQgPSBpdGVtLmZ1bmMobGFzdFJlc3VsdCk7XG5cbiAgICAgIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICBhc3luYyA9IHRydWU7XG4gICAgICAgIHJlc3VsdC50aGVuKGZ1bmN0aW9uIChhc3luY1Jlc3VsdCkge1xuICAgICAgICAgIGl0ZW0ub25Eb25lKGFzeW5jUmVzdWx0KTtcbiAgICAgICAgICBfdGhpcy5wcm9jZXNzKGFzeW5jUmVzdWx0KTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgcmVsZWFzZShlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5vbkRvbmUocmVzdWx0KTtcbiAgICAgICAgdGhpcy5wcm9jZXNzKHJlc3VsdCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvbkRvbmU6IGZ1bmN0aW9uIG9uRG9uZShnZXRSZXN1bHQpIHtcbiAgICAgIGlmIChhc3luYykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGRvbmUsIHJlamVjdCkge1xuICAgICAgICAgIHJlbGVhc2UgPSBmdW5jdGlvbiByZWxlYXNlKGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRvbmUoZ2V0UmVzdWx0KCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFJlc3VsdCgpO1xuICAgIH0sXG4gICAgaXNSdW5uaW5nOiBmdW5jdGlvbiBpc1J1bm5pbmcoKSB7XG4gICAgICByZXR1cm4gcnVubmluZztcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVHJlZTtcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgbm8tcmV0dXJuLWFzc2lnbiwgbWF4LWxlbiAqL1xudmFyIExPR1MgPSBmYWxzZTtcbnZhciBsb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gIHZhciBfY29uc29sZTtcblxuICByZXR1cm4gTE9HUyA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG59O1xuXG5mdW5jdGlvbiBUcmVlKCkge1xuICB2YXIgb25Ob2RlSW4gPSBbXTtcbiAgdmFyIG9uTm9kZU91dCA9IFtdO1xuICB2YXIgX29uTm9kZVJlbW92ZSA9IFtdO1xuICB2YXIgcm9vdCA9IGNyZWF0ZU5ld05vZGUoKTtcbiAgdmFyIGlkcyA9IDA7XG5cbiAgZnVuY3Rpb24gZ2V0SWQoKSB7XG4gICAgcmV0dXJuICdhJyArICsraWRzO1xuICB9O1xuICBmdW5jdGlvbiB1c2VTYW1lTm9kZShub2RlLCBuZXdFbGVtZW50KSB7XG4gICAgbmV3RWxlbWVudC5pbml0aWFsaXplKG5vZGUuZWxlbWVudC5pZCwgbm9kZS5lbGVtZW50LnVzZWQoKSk7XG4gICAgbm9kZS5lbGVtZW50ID0gbmV3RWxlbWVudDtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuICBmdW5jdGlvbiB0cmVlRGlmZihvbGRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgaWYgKG9sZEVsZW1lbnQgJiYgb2xkRWxlbWVudC5uYW1lID09PSBuZXdFbGVtZW50Lm5hbWUpIHtcbiAgICAgIGlmIChvbGRFbGVtZW50LnByb3BzICYmIG5ld0VsZW1lbnQucHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIG9sZEVsZW1lbnQucHJvcHMua2V5ID09PSBuZXdFbGVtZW50LnByb3BzLmtleTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gY3JlYXRlTmV3Tm9kZShlbGVtZW50LCBwYXJlbnQpIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudC5pbml0aWFsaXplKGdldElkKCkpO1xuICAgIH1cblxuICAgIHZhciBub2RlID0ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgY3Vyc29yOiAwLFxuICAgICAgaW46IGZ1bmN0aW9uIF9pbigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBsb2coJy0+ICcgKyB0aGlzLmVsZW1lbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5pbigpO1xuICAgICAgICBvbk5vZGVJbi5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICBub2RlLmxvZygnbm9kZTppbicpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgIGxvZygnPC0gJyArIHRoaXMuZWxlbWVudC5uYW1lKTtcbiAgICAgICAgdGhpcy5lbGVtZW50Lm91dCgpO1xuICAgICAgICAvLyBJZiB0aGVyZSdyZSBtb3JlIG5vZGVzIGluIHRoZSB0cmVlIHRoYW4gd2hhdCB3YXMgcHJvY2Vzc2VkXG4gICAgICAgIGlmICh0aGlzLmN1cnNvciA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gdGhpcy5jdXJzb3IpLmZvckVhY2goZnVuY3Rpb24gKHJlbW92ZWROb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gX29uTm9kZVJlbW92ZS5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjKHJlbW92ZWROb2RlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3Vyc29yID0gMDtcbiAgICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgICBub2RlLmxvZygnbm9kZTpvdXQnKTtcbiAgICAgICAgfVxuICAgICAgICBvbk5vZGVPdXQuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzMik7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoX19ERVZfXykge1xuICAgICAgICAgIGlmICh0aGlzLmxvZ3MpIHRoaXMubG9ncyA9IFtdO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYWRkQ2hpbGROb2RlOiBmdW5jdGlvbiBhZGRDaGlsZE5vZGUobmV3RWxlbWVudCkge1xuICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICB2YXIgY2hpbGROb2RlID0gdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl07XG5cbiAgICAgICAgLy8gdXNpbmcgdGhlIHNhbWUgbm9kZVxuICAgICAgICBpZiAoY2hpbGROb2RlICYmIHRyZWVEaWZmKGNoaWxkTm9kZS5lbGVtZW50LCBuZXdFbGVtZW50KSkge1xuICAgICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgICAgcmV0dXJuIHVzZVNhbWVOb2RlKGNoaWxkTm9kZSwgbmV3RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGluZyBhIG5ldyBub2RlXG4gICAgICAgIHZhciBuZXdDaGlsZE5vZGUgPSBjcmVhdGVOZXdOb2RlKG5ld0VsZW1lbnQsIHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSkge1xuICAgICAgICAgIF9vbk5vZGVSZW1vdmUuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgICAgcmV0dXJuIGMoX3RoaXMzLmNoaWxkcmVuW190aGlzMy5jdXJzb3JdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSA9IG5ld0NoaWxkTm9kZTtcbiAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld0NoaWxkTm9kZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIG5vZGUubG9nID0gZnVuY3Rpb24gKHR5cGUsIG1ldGEpIHtcbiAgICAgICAgaWYgKCEoJ2xvZ3MnIGluIG5vZGUpKSBub2RlLmxvZ3MgPSBbXTtcbiAgICAgICAgbm9kZS5sb2dzLnB1c2goeyB0eXBlOiB0eXBlLCBtZXRhOiBtZXRhLCB0aW1lOiBwZXJmb3JtYW5jZS5ub3coKSB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmVSb290OiBmdW5jdGlvbiByZXNvbHZlUm9vdChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gcm9vdCA9IHRyZWVEaWZmKHJvb3QuZWxlbWVudCwgZWxlbWVudCkgPyB1c2VTYW1lTm9kZShyb290LCBlbGVtZW50KSA6IGNyZWF0ZU5ld05vZGUoZWxlbWVudCk7XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICByb290ID0gY3JlYXRlTmV3Tm9kZSgpO1xuICAgICAgaWRzID0gMDtcbiAgICB9LFxuICAgIGdldE51bU9mRWxlbWVudHM6IGZ1bmN0aW9uIGdldE51bU9mRWxlbWVudHMoKSB7XG4gICAgICByZXR1cm4gaWRzO1xuICAgIH0sXG4gICAgZGlhZ25vc2U6IGZ1bmN0aW9uIGRpYWdub3NlKCkge1xuICAgICAgaWYgKF9fREVWX18pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxvb3BPdmVyKG5vZGUpIHtcbiAgICAgICAgICB2YXIgaW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICAgICAgdmFyIF9yZWYgPSBub2RlLmVsZW1lbnQucHJvcHMgPyBub2RlLmVsZW1lbnQucHJvcHMgOiB7fSxcbiAgICAgICAgICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuLFxuICAgICAgICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnY2hpbGRyZW4nXSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpbmQ6IGluZCxcbiAgICAgICAgICAgIG5hbWU6IG5vZGUuZWxlbWVudC5uYW1lLFxuICAgICAgICAgICAgbG9nczogbm9kZS5sb2dzLFxuICAgICAgICAgICAgcHJvcHM6IF9leHRlbmRzKHtcbiAgICAgICAgICAgICAgY2hpbGRyZW46ICc8ZnVuY3Rpb24gY2hpbGRyZW4+J1xuICAgICAgICAgICAgfSwgcmVzdCksXG4gICAgICAgICAgICB1c2VkOiBub2RlLmVsZW1lbnQudXNlZCgpLFxuICAgICAgICAgICAgaWQ6IG5vZGUuZWxlbWVudC5pZCxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxvb3BPdmVyKGNoaWxkLCBpbmQgKyAxKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfTtcbiAgICAgICAgfShyb290KTtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGF2YWlsYWJsZSBpbiBwcm9kdWN0aW9uIG1vZGUnKTtcbiAgICB9LFxuICAgIGFkZE5vZGVJbkNhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlSW5DYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlSW4ucHVzaChjYWxsYmFjayk7XG4gICAgfSxcbiAgICBhZGROb2RlT3V0Q2FsbGJhY2s6IGZ1bmN0aW9uIGFkZE5vZGVPdXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgb25Ob2RlT3V0LnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIF9vbk5vZGVSZW1vdmUucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxudmFyIF9Db250ZXh0ID0gcmVxdWlyZSgnLi4vQ29udGV4dCcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgY3JlYXRlVXNlRWxlbWVudEhvb2sgPSBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50SG9vayhwcm9jZXNzb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChDb250ZXh0KSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICByZXR1cm4gQ29udGV4dFtfQ29udGV4dC5QVUJMSUNfQ09OVEVYVF9LRVldKCk7XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFbGVtZW50SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfZmFzdERlZXBFcXVhbCA9IHJlcXVpcmUoJ2Zhc3QtZGVlcC1lcXVhbCcpO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmFzdERlZXBFcXVhbCk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IGVmZmVjdHM6IFtdLCBjb25zdW1lcjogMCB9O1xuICB9LFxuICBjbGVhblVwOiBmdW5jdGlvbiBjbGVhblVwKGlkKSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbaWRdKSB7XG4gICAgICBkZWxldGUgdGhpcy5lbGVtZW50c1tpZF07XG4gICAgfVxuICB9XG59O1xuXG52YXIgY3JlYXRlRWZmZWN0ID0gZnVuY3Rpb24gY3JlYXRlRWZmZWN0KGNhbGxiYWNrLCBkZXBzKSB7XG4gIHJldHVybiB7XG4gICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgIGRlcHM6IGRlcHNcbiAgfTtcbn07XG52YXIgdXBkYXRlRWZmZWN0ID0gZnVuY3Rpb24gdXBkYXRlRWZmZWN0KGVmZmVjdCwgY2FsbGJhY2ssIGRlcHMpIHtcbiAgZWZmZWN0LmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGVmZmVjdC5vbGREZXBzID0gZWZmZWN0LmRlcHM7XG4gIGVmZmVjdC5kZXBzID0gZGVwcztcbiAgcmV0dXJuIGVmZmVjdDtcbn07XG5cbmZ1bmN0aW9uIGRlcHNFcXVhbChvbGREZXBzLCBuZXdEZXBzKSB7XG4gIGlmICghb2xkRGVwcykgcmV0dXJuIGZhbHNlO1xuICBpZiAob2xkRGVwcy5sZW5ndGggIT09IG5ld0RlcHMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAoMCwgX2Zhc3REZWVwRXF1YWwyLmRlZmF1bHQpKG9sZERlcHMsIG5ld0RlcHMpO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUVmZmVjdChub2RlLCBlZmZlY3QpIHtcbiAgdmFyIGRlcHMgPSBlZmZlY3QuZGVwcyxcbiAgICAgIG9sZERlcHMgPSBlZmZlY3Qub2xkRGVwcyxcbiAgICAgIGNhbGxiYWNrID0gZWZmZWN0LmNhbGxiYWNrO1xuXG5cbiAgaWYgKHR5cGVvZiBkZXBzID09PSAndW5kZWZpbmVkJykge1xuICAgIGVmZmVjdC5jbGVhblVwID0gY2FsbGJhY2soKTtcbiAgfSBlbHNlIGlmIChkZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChub2RlLmVsZW1lbnQudXNlZCgpID09PSAxKSB7XG4gICAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gICAgICBpZiAoX19ERVZfXykgbm9kZS5sb2coJ3VzZUVmZmVjdDpmaXJlZCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYXJlRXF1YWwgPSBkZXBzRXF1YWwob2xkRGVwcywgZGVwcyk7XG5cbiAgICBpZiAoIWFyZUVxdWFsKSB7XG4gICAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gICAgICBpZiAoX19ERVZfXykgbm9kZS5sb2coJ3VzZUVmZmVjdDpmaXJlZCcpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgY3JlYXRlVXNlRWZmZWN0SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVmZmVjdEhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICBzdG9yYWdlLmVmZmVjdHMuZm9yRWFjaChmdW5jdGlvbiAoZWZmZWN0KSB7XG4gICAgICBpZiAoZWZmZWN0LmNsZWFuVXApIHtcbiAgICAgICAgZWZmZWN0LmNsZWFuVXAoKTtcbiAgICAgICAgaWYgKF9fREVWX18pIG5vZGUubG9nKCd1c2VFZmZlY3Q6Y2xlYW5VcCcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFN0b3JhZ2UuY2xlYW5VcChub2RlLmVsZW1lbnQuaWQpO1xuICB9KTtcbiAgcHJvY2Vzc29yLm9uTm9kZU91dChmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIGlmIChzdG9yYWdlLmVmZmVjdHMubGVuZ3RoID4gMCkge1xuICAgICAgc3RvcmFnZS5lZmZlY3RzLmZvckVhY2goZnVuY3Rpb24gKGVmZmVjdCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZUVmZmVjdChub2RlLCBlZmZlY3QpO1xuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaywgZGVwcykge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIC8vIGZpcnN0IHJ1blxuICAgIGlmIChlbGVtZW50LnVzZWQoKSA9PT0gMCkge1xuICAgICAgc3RvcmFnZS5lZmZlY3RzLnB1c2goY3JlYXRlRWZmZWN0KGNhbGxiYWNrLCBkZXBzKSk7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGluZGV4ID0gc3RvcmFnZS5jb25zdW1lcjtcblxuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5lZmZlY3RzLmxlbmd0aCAtIDEgPyBzdG9yYWdlLmNvbnN1bWVyICsgMSA6IDA7XG4gICAgICB1cGRhdGVFZmZlY3Qoc3RvcmFnZS5lZmZlY3RzW2luZGV4XSwgY2FsbGJhY2ssIGRlcHMpO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVmZmVjdEhvb2s7XG5cblxuY3JlYXRlVXNlRWZmZWN0SG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNyZWF0ZVVzZUVsZW1lbnRIb29rID0gZnVuY3Rpb24gY3JlYXRlVXNlRWxlbWVudEhvb2socHJvY2Vzc29yKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICByZXR1cm4gcHJvY2Vzc29yLm5vZGUoKS5lbGVtZW50O1xuICB9O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlRWxlbWVudEhvb2s7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUHViU3ViSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc3Vic2NyaWJlcnMgPSB7fTtcblxudmFyIHN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShub2RlLCBlbGVtZW50LCB0eXBlLCBjYWxsYmFjaykge1xuICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdKSBzdWJzY3JpYmVyc1t0eXBlXSA9IHt9O1xuICBpZiAoX19ERVZfXykge1xuICAgIGlmICghc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF0pIHtcbiAgICAgIG5vZGUubG9nKCd1c2VQdWJTdWI6c3Vic2NyaWJlJywgdHlwZSk7XG4gICAgfVxuICB9XG4gIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdID0gY2FsbGJhY2s7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKF9fREVWX18pIHtcbiAgICAgIG5vZGUubG9nKCd1c2VQdWJTdWI6dW5zdWJzY3JpYmUnLCB0eXBlKTtcbiAgICB9XG4gICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdO1xuICB9O1xufTtcbnZhciBwdWJsaXNoID0gZnVuY3Rpb24gcHVibGlzaChub2RlLCB0eXBlLCBwYXlsb2FkKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHJldHVybjtcbiAgaWYgKF9fREVWX18pIHtcbiAgICBub2RlLmxvZygndXNlUHViU3ViOnB1Ymxpc2g6JyArIHR5cGUsIHBheWxvYWQpO1xuICB9XG4gIE9iamVjdC5rZXlzKHN1YnNjcmliZXJzW3R5cGVdKS5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgIHN1YnNjcmliZXJzW3R5cGVdW2lkXShwYXlsb2FkKTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVVc2VQdWJTdWJIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnMpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgIGlmIChzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdKSB7XG4gICAgICAgIGRlbGV0ZSBzdWJzY3JpYmVyc1t0eXBlXVtub2RlLmVsZW1lbnQuaWRdO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzY29wZWRFbGVtZW50KSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsID0gc2NvcGVkRWxlbWVudCB8fCBub2RlLmVsZW1lbnQ7XG4gICAgdmFyIHN1YnNjcmliZUZ1bmMgPSBmdW5jdGlvbiBzdWJzY3JpYmVGdW5jKCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIHBhcmFtcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBwYXJhbXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdWJzY3JpYmUuYXBwbHkodW5kZWZpbmVkLCBbbm9kZSwgZWxdLmNvbmNhdChwYXJhbXMpKTtcbiAgICB9O1xuICAgIHZhciBwdWJsaXNoRnVuYyA9IGZ1bmN0aW9uIHB1Ymxpc2hGdW5jKCkge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBwYXJhbXMgPSBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBwYXJhbXNbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHB1Ymxpc2guYXBwbHkodW5kZWZpbmVkLCBbbm9kZV0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmVGdW5jLFxuICAgICAgcHVibGlzaDogcHVibGlzaEZ1bmMsXG4gICAgICBzdWJzY3JpYmVyczogc3Vic2NyaWJlcnNcbiAgICB9O1xuICB9O1xufVxuXG5jcmVhdGVVc2VQdWJTdWJIb29rLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICBzdWJzY3JpYmVycyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlVXNlUmVkdWNlckhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGFjdGlvbiA9IF9yZWYuYWN0aW9uLFxuICAgICAgICBwcm9wc1RvQWN0aW9uID0gX3JlZi5wcm9wc1RvQWN0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnYWN0aW9uJywgJ3Byb3BzVG9BY3Rpb24nXSk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICBkaXNwYXRjaChhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAocHJvcHNUb0FjdGlvbikge1xuICAgICAgZGlzcGF0Y2gocHJvcHNUb0FjdGlvbihyZXN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignPERpc3BhdGNoPiBleHBlY3RzIFwiYWN0aW9uXCIgb3IgXCJwcm9wc1RvQWN0aW9uXCIgcHJvcC4nKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVJlZHVjZXJIb29rKHByb2Nlc3NvciwgdXNlU3RhdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChyZWR1Y2VyLCBpbml0aWFsU3RhdGUpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcblxuICAgIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZShpbml0aWFsU3RhdGUpLFxuICAgICAgICBfdXNlU3RhdGUyID0gX3NsaWNlZFRvQXJyYXkoX3VzZVN0YXRlLCAyKSxcbiAgICAgICAgc3RhdGUgPSBfdXNlU3RhdGUyWzBdLFxuICAgICAgICBzZXRTdGF0ZSA9IF91c2VTdGF0ZTJbMV07XG5cbiAgICB2YXIgZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgIGlmIChfX0RFVl9fKSB7XG4gICAgICAgIG5vZGUubG9nKCd1c2VSZWR1Y2VyOmRpc3BhdGNoJywgYWN0aW9uLnR5cGUpO1xuICAgICAgfVxuICAgICAgc2V0U3RhdGUocmVkdWNlcihzdGF0ZSgpLCBhY3Rpb24pKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFtzdGF0ZSwgZGlzcGF0Y2gsIGNyZWF0ZURpc3BhdGNoRWxlbWVudChkaXNwYXRjaCksIC8vIDxEaXNwYXRjaD5cbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhdGUoKTtcbiAgICB9IC8vIDxHZXRTdGF0ZT5cbiAgICBdO1xuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZVN0YXRlSG9vaztcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgU3RvcmFnZSA9IHtcbiAgZWxlbWVudHM6IHt9LFxuICBnZXQ6IGZ1bmN0aW9uIGdldChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0pIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSA9IHsgc3RhdGVzOiBbXSwgY29uc3VtZXI6IDAgfTtcbiAgfSxcbiAgY2xlYW5VcDogZnVuY3Rpb24gY2xlYW5VcChpZCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2lkXSkge1xuICAgICAgZGVsZXRlIHRoaXMuZWxlbWVudHNbaWRdO1xuICAgIH1cbiAgfVxufTsgLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuZnVuY3Rpb24gY3JlYXRlVXNlU3RhdGVIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlUmVtb3ZlKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgcmV0dXJuIFN0b3JhZ2UuY2xlYW5VcChub2RlLmVsZW1lbnQuaWQpO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpbml0aWFsU3RhdGUpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICB2YXIgaW5kZXggPSB2b2lkIDA7XG5cbiAgICAvLyBmaXJzdCBydW5cbiAgICBpZiAoZWxlbWVudC51c2VkKCkgPT09IDApIHtcbiAgICAgIHN0b3JhZ2Uuc3RhdGVzLnB1c2goaW5pdGlhbFN0YXRlKTtcbiAgICAgIGluZGV4ID0gc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMTtcblxuICAgICAgLy8gb3RoZXIgcnVuc1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IHN0b3JhZ2UuY29uc3VtZXI7XG4gICAgICBzdG9yYWdlLmNvbnN1bWVyID0gaW5kZXggPCBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxID8gc3RvcmFnZS5jb25zdW1lciArIDEgOiAwO1xuICAgIH1cbiAgICBpZiAoX19ERVZfXykgbm9kZS5sb2coJ3VzZVN0YXRlOmNvbnN1bWVkJywgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdKTtcblxuICAgIHJldHVybiBbZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XTtcbiAgICB9LCBmdW5jdGlvbiAobmV3U3RhdGUpIHtcbiAgICAgIGlmIChfX0RFVl9fKSBub2RlLmxvZygndXNlU3RhdGU6c2V0JywgbmV3U3RhdGUpO1xuICAgICAgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdID0gbmV3U3RhdGU7XG4gICAgICBpZiAoIWVsZW1lbnQuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgaWYgKF9fREVWX18pIG5vZGUubG9nKCd1c2VTdGF0ZTpyZXJ1bicpO1xuICAgICAgICBub2RlLnJlcnVuKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfV07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVN0YXRlSG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1ZhbGlkSG9va0NvbnRleHQ7XG5mdW5jdGlvbiBpc1ZhbGlkSG9va0NvbnRleHQocHJvY2Vzc29yKSB7XG4gIGlmICghcHJvY2Vzc29yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgdGVycmlibHkgd3JvbmcgaGFwcGVuZWQuIFRoZSBob29rIGZhY3RvcnkgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGhvdXQgYSBwcm9jZXNzb3IuJyk7XG4gIH1cbiAgaWYgKCFwcm9jZXNzb3Iubm9kZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdIb29rcyBtdXN0IGJlIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiBhbiBBY3RNTCBlbGVtZW50LicpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlUnVudGltZSA9IGNyZWF0ZVJ1bnRpbWU7XG5cbnZhciBfUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9Qcm9jZXNzb3InKTtcblxudmFyIF9Qcm9jZXNzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJvY2Vzc29yKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfQWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vQWN0RWxlbWVudCcpO1xuXG52YXIgX0FjdEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0RWxlbWVudCk7XG5cbnZhciBfdXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWxlbWVudCcpO1xuXG52YXIgX3VzZUVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWxlbWVudCk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlUmVkdWNlciA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUmVkdWNlcicpO1xuXG52YXIgX3VzZVJlZHVjZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUmVkdWNlcik7XG5cbnZhciBfdXNlRWZmZWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFZmZlY3QnKTtcblxudmFyIF91c2VFZmZlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWZmZWN0KTtcblxudmFyIF91c2VDb250ZXh0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VDb250ZXh0Jyk7XG5cbnZhciBfdXNlQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VDb250ZXh0KTtcblxudmFyIF9Db250ZXh0ID0gcmVxdWlyZSgnLi9Db250ZXh0Jyk7XG5cbnZhciBfQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlUnVudGltZSgpIHtcbiAgdmFyIHByb2Nlc3NvciA9ICgwLCBfUHJvY2Vzc29yMi5kZWZhdWx0KSgpO1xuXG4gIGZ1bmN0aW9uIEEoZnVuYywgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBjaGlsZHJlbltfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfQWN0RWxlbWVudDIuZGVmYXVsdCkoZnVuYywgcHJvcHMsIGNoaWxkcmVuKTtcbiAgfVxuICBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RlZC4gSW5zdGVhZCAnICsgZWxlbWVudC50b1N0cmluZygpICsgJyBwYXNzZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzb3IucnVuKGVsZW1lbnQpO1xuICB9XG4gIHZhciBGcmFnbWVudCA9IGZ1bmN0aW9uIEZyYWdtZW50KF9yZWYpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfTtcbiAgdmFyIHVzZUVsZW1lbnQgPSAoMCwgX3VzZUVsZW1lbnQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VTdGF0ZSA9ICgwLCBfdXNlU3RhdGUyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VQdWJTdWIgPSAoMCwgX3VzZVB1YlN1YjIuZGVmYXVsdCkocHJvY2Vzc29yKTtcbiAgdmFyIHVzZVJlZHVjZXIgPSAoMCwgX3VzZVJlZHVjZXIyLmRlZmF1bHQpKHByb2Nlc3NvciwgdXNlU3RhdGUpO1xuICB2YXIgdXNlRWZmZWN0ID0gKDAsIF91c2VFZmZlY3QyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VDb250ZXh0ID0gKDAsIF91c2VDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgY3JlYXRlQ29udGV4dCA9ICgwLCBfQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICByZXR1cm4ge1xuICAgIEE6IEEsXG4gICAgcnVuOiBydW4sXG4gICAgRnJhZ21lbnQ6IEZyYWdtZW50LFxuICAgIHByb2Nlc3NvcjogcHJvY2Vzc29yLFxuICAgIHVzZUVsZW1lbnQ6IHVzZUVsZW1lbnQsXG4gICAgdXNlUHViU3ViOiB1c2VQdWJTdWIsXG4gICAgdXNlU3RhdGU6IHVzZVN0YXRlLFxuICAgIHVzZVJlZHVjZXI6IHVzZVJlZHVjZXIsXG4gICAgdXNlRWZmZWN0OiB1c2VFZmZlY3QsXG4gICAgdXNlQ29udGV4dDogdXNlQ29udGV4dCxcbiAgICBjcmVhdGVDb250ZXh0OiBjcmVhdGVDb250ZXh0XG4gIH07XG59XG5cbnZhciBydW50aW1lID0gY3JlYXRlUnVudGltZSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVSdW50aW1lID0gY3JlYXRlUnVudGltZSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNBY3RNTEVsZW1lbnQ7XG5mdW5jdGlvbiBpc0FjdE1MRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQuX19hY3RtbCA9PT0gdHJ1ZTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIga2V5TGlzdCA9IE9iamVjdC5rZXlzO1xudmFyIGhhc1Byb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYXJyQSA9IGlzQXJyYXkoYSlcbiAgICAgICwgYXJyQiA9IGlzQXJyYXkoYilcbiAgICAgICwgaVxuICAgICAgLCBsZW5ndGhcbiAgICAgICwga2V5O1xuXG4gICAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhcnJBICE9IGFyckIpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAsIGRhdGVCID0gYiBpbnN0YW5jZW9mIERhdGU7XG4gICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSByZXR1cm4gYS5nZXRUaW1lKCkgPT0gYi5nZXRUaW1lKCk7XG5cbiAgICB2YXIgcmVnZXhwQSA9IGEgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICwgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuXG4gICAgdmFyIGtleXMgPSBrZXlMaXN0KGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCAhPT0ga2V5TGlzdChiKS5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIWhhc1Byb3AuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKCFlcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBhIT09YSAmJiBiIT09Yjtcbn07XG4iLCJpbXBvcnQgQ2lyY3VsYXJKU09OIGZyb20gJy4vdmVuZG9yL0NpcmN1bGFySlNPTic7XG5pbXBvcnQgU2VyaWFsaXplRXJyb3IgZnJvbSAnLi92ZW5kb3IvU2VyaWFsaXplRXJyb3InO1xuXG5jb25zdCB7IHN0cmluZ2lmeSB9ID0gQ2lyY3VsYXJKU09OO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYW5pdGl6ZShzb21ldGhpbmcsIHNob3dFcnJvckluQ29uc29sZSA9IGZhbHNlKSB7XG4gIHZhciByZXN1bHQ7XG5cbiAgdHJ5IHtcbiAgICByZXN1bHQgPSBKU09OLnBhcnNlKHN0cmluZ2lmeShzb21ldGhpbmcsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5uYW1lID09PSAnJyA/ICc8YW5vbnltb3VzPicgOiBgZnVuY3Rpb24gJHsgdmFsdWUubmFtZSB9KClgO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIFNlcmlhbGl6ZUVycm9yKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9LCB1bmRlZmluZWQsIHRydWUpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoc2hvd0Vycm9ySW5Db25zb2xlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxuICAgIHJlc3VsdCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLyohXG5Db3B5cmlnaHQgKEMpIDIwMTMtMjAxNyBieSBBbmRyZWEgR2lhbW1hcmNoaSAtIEBXZWJSZWZsZWN0aW9uXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cblxuKi9cbnZhclxuLy8gc2hvdWxkIGJlIGEgbm90IHNvIGNvbW1vbiBjaGFyXG4vLyBwb3NzaWJseSBvbmUgSlNPTiBkb2VzIG5vdCBlbmNvZGVcbi8vIHBvc3NpYmx5IG9uZSBlbmNvZGVVUklDb21wb25lbnQgZG9lcyBub3QgZW5jb2RlXG4vLyByaWdodCBub3cgdGhpcyBjaGFyIGlzICd+JyBidXQgdGhpcyBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZVxuc3BlY2lhbENoYXIgPSAnficsXG5zYWZlU3BlY2lhbENoYXIgPSAnXFxcXHgnICsgKFxuICAnMCcgKyBzcGVjaWFsQ2hhci5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KVxuKS5zbGljZSgtMiksXG5lc2NhcGVkU2FmZVNwZWNpYWxDaGFyID0gJ1xcXFwnICsgc2FmZVNwZWNpYWxDaGFyLFxuc3BlY2lhbENoYXJSRyA9IG5ldyBSZWdFeHAoc2FmZVNwZWNpYWxDaGFyLCAnZycpLFxuc2FmZVNwZWNpYWxDaGFyUkcgPSBuZXcgUmVnRXhwKGVzY2FwZWRTYWZlU3BlY2lhbENoYXIsICdnJyksXG5cbnNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHID0gbmV3IFJlZ0V4cCgnKD86XnwoW15cXFxcXFxcXF0pKScgKyBlc2NhcGVkU2FmZVNwZWNpYWxDaGFyKSxcblxuaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24odil7XG4gIGZvcih2YXIgaT10aGlzLmxlbmd0aDtpLS0mJnRoaXNbaV0hPT12Oyk7XG4gIHJldHVybiBpO1xufSxcbiRTdHJpbmcgPSBTdHJpbmcgIC8vIHRoZXJlJ3Mgbm8gd2F5IHRvIGRyb3Agd2FybmluZ3MgaW4gSlNIaW50XG4gICAgICAgICAgICAgICAgICAvLyBhYm91dCBuZXcgU3RyaW5nIC4uLiB3ZWxsLCBJIG5lZWQgdGhhdCBoZXJlIVxuICAgICAgICAgICAgICAgICAgLy8gZmFrZWQsIGFuZCBoYXBweSBsaW50ZXIhXG47XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmVwbGFjZXIodmFsdWUsIHJlcGxhY2VyLCByZXNvbHZlKSB7XG52YXJcbiAgaW5zcGVjdCA9ICEhcmVwbGFjZXIsXG4gIHBhdGggPSBbXSxcbiAgYWxsICA9IFt2YWx1ZV0sXG4gIHNlZW4gPSBbdmFsdWVdLFxuICBtYXBwID0gW3Jlc29sdmUgPyBzcGVjaWFsQ2hhciA6ICc8Y2lyY3VsYXI+J10sXG4gIGxhc3QgPSB2YWx1ZSxcbiAgbHZsICA9IDEsXG4gIGksIGZuXG47XG5pZiAoaW5zcGVjdCkge1xuICBmbiA9IHR5cGVvZiByZXBsYWNlciA9PT0gJ29iamVjdCcgP1xuICAgIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4ga2V5ICE9PSAnJyAmJiByZXBsYWNlci5pbmRleE9mKGtleSkgPCAwID8gdm9pZCAwIDogdmFsdWU7XG4gICAgfSA6XG4gICAgcmVwbGFjZXI7XG59XG5yZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAvLyB0aGUgcmVwbGFjZXIgaGFzIHJpZ2h0cyB0byBkZWNpZGVcbiAgLy8gaWYgYSBuZXcgb2JqZWN0IHNob3VsZCBiZSByZXR1cm5lZFxuICAvLyBvciBpZiB0aGVyZSdzIHNvbWUga2V5IHRvIGRyb3BcbiAgLy8gbGV0J3MgY2FsbCBpdCBoZXJlIHJhdGhlciB0aGFuIFwidG9vIGxhdGVcIlxuICBpZiAoaW5zcGVjdCkgdmFsdWUgPSBmbi5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuXG4gIC8vIGRpZCB5b3Uga25vdyA/IFNhZmFyaSBwYXNzZXMga2V5cyBhcyBpbnRlZ2VycyBmb3IgYXJyYXlzXG4gIC8vIHdoaWNoIG1lYW5zIGlmIChrZXkpIHdoZW4ga2V5ID09PSAwIHdvbid0IHBhc3MgdGhlIGNoZWNrXG4gIGlmIChrZXkgIT09ICcnKSB7XG4gICAgaWYgKGxhc3QgIT09IHRoaXMpIHtcbiAgICAgIGkgPSBsdmwgLSBpbmRleE9mLmNhbGwoYWxsLCB0aGlzKSAtIDE7XG4gICAgICBsdmwgLT0gaTtcbiAgICAgIGFsbC5zcGxpY2UobHZsLCBhbGwubGVuZ3RoKTtcbiAgICAgIHBhdGguc3BsaWNlKGx2bCAtIDEsIHBhdGgubGVuZ3RoKTtcbiAgICAgIGxhc3QgPSB0aGlzO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhsdmwsIGtleSwgcGF0aCk7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUpIHtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgcmVmZXJyaW5nIHRvIHBhcmVudCBvYmplY3QsIGFkZCB0byB0aGVcbiAgICAgIC8vIG9iamVjdCBwYXRoIHN0YWNrLiBPdGhlcndpc2UgaXQgaXMgYWxyZWFkeSB0aGVyZS5cbiAgICAgIGlmIChpbmRleE9mLmNhbGwoYWxsLCB2YWx1ZSkgPCAwKSB7XG4gICAgICAgIGFsbC5wdXNoKGxhc3QgPSB2YWx1ZSk7XG4gICAgICB9XG4gICAgICBsdmwgPSBhbGwubGVuZ3RoO1xuICAgICAgaSA9IGluZGV4T2YuY2FsbChzZWVuLCB2YWx1ZSk7XG4gICAgICBpZiAoaSA8IDApIHtcbiAgICAgICAgaSA9IHNlZW4ucHVzaCh2YWx1ZSkgLSAxO1xuICAgICAgICBpZiAocmVzb2x2ZSkge1xuICAgICAgICAgIC8vIGtleSBjYW5ub3QgY29udGFpbiBzcGVjaWFsQ2hhciBidXQgY291bGQgYmUgbm90IGEgc3RyaW5nXG4gICAgICAgICAgcGF0aC5wdXNoKCgnJyArIGtleSkucmVwbGFjZShzcGVjaWFsQ2hhclJHLCBzYWZlU3BlY2lhbENoYXIpKTtcbiAgICAgICAgICBtYXBwW2ldID0gc3BlY2lhbENoYXIgKyBwYXRoLmpvaW4oc3BlY2lhbENoYXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1hcHBbaV0gPSBtYXBwWzBdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSA9IG1hcHBbaV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHJlc29sdmUpIHtcbiAgICAgICAgLy8gZW5zdXJlIG5vIHNwZWNpYWwgY2hhciBpbnZvbHZlZCBvbiBkZXNlcmlhbGl6YXRpb25cbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIG9ubHkgZmlyc3QgY2hhciBpcyBpbXBvcnRhbnRcbiAgICAgICAgLy8gbm8gbmVlZCB0byByZXBsYWNlIGFsbCB2YWx1ZSAoYmV0dGVyIHBlcmZvcm1hbmNlKVxuICAgICAgICB2YWx1ZSA9IHZhbHVlIC5yZXBsYWNlKHNhZmVTcGVjaWFsQ2hhciwgZXNjYXBlZFNhZmVTcGVjaWFsQ2hhcilcbiAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShzcGVjaWFsQ2hhciwgc2FmZVNwZWNpYWxDaGFyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufTtcbn1cblxuZnVuY3Rpb24gcmV0cmlldmVGcm9tUGF0aChjdXJyZW50LCBrZXlzKSB7XG5mb3IodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgY3VycmVudCA9IGN1cnJlbnRbXG4gIC8vIGtleXMgc2hvdWxkIGJlIG5vcm1hbGl6ZWQgYmFjayBoZXJlXG4gIGtleXNbaSsrXS5yZXBsYWNlKHNhZmVTcGVjaWFsQ2hhclJHLCBzcGVjaWFsQ2hhcilcbl0pO1xucmV0dXJuIGN1cnJlbnQ7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUmV2aXZlcihyZXZpdmVyKSB7XG5yZXR1cm4gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICBpZiAoaXNTdHJpbmcgJiYgdmFsdWUuY2hhckF0KDApID09PSBzcGVjaWFsQ2hhcikge1xuICAgIHJldHVybiBuZXcgJFN0cmluZyh2YWx1ZS5zbGljZSgxKSk7XG4gIH1cbiAgaWYgKGtleSA9PT0gJycpIHZhbHVlID0gcmVnZW5lcmF0ZSh2YWx1ZSwgdmFsdWUsIHt9KTtcbiAgLy8gYWdhaW4sIG9ubHkgb25lIG5lZWRlZCwgZG8gbm90IHVzZSB0aGUgUmVnRXhwIGZvciB0aGlzIHJlcGxhY2VtZW50XG4gIC8vIG9ubHkga2V5cyBuZWVkIHRoZSBSZWdFeHBcbiAgaWYgKGlzU3RyaW5nKSB2YWx1ZSA9IHZhbHVlIC5yZXBsYWNlKHNhZmVTdGFydFdpdGhTcGVjaWFsQ2hhclJHLCAnJDEnICsgc3BlY2lhbENoYXIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShlc2NhcGVkU2FmZVNwZWNpYWxDaGFyLCBzYWZlU3BlY2lhbENoYXIpO1xuICByZXR1cm4gcmV2aXZlciA/IHJldml2ZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKSA6IHZhbHVlO1xufTtcbn1cblxuZnVuY3Rpb24gcmVnZW5lcmF0ZUFycmF5KHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSB7XG5mb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudC5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICBjdXJyZW50W2ldID0gcmVnZW5lcmF0ZShyb290LCBjdXJyZW50W2ldLCByZXRyaWV2ZSk7XG59XG5yZXR1cm4gY3VycmVudDtcbn1cblxuZnVuY3Rpb24gcmVnZW5lcmF0ZU9iamVjdChyb290LCBjdXJyZW50LCByZXRyaWV2ZSkge1xuZm9yICh2YXIga2V5IGluIGN1cnJlbnQpIHtcbiAgaWYgKGN1cnJlbnQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgIGN1cnJlbnRba2V5XSA9IHJlZ2VuZXJhdGUocm9vdCwgY3VycmVudFtrZXldLCByZXRyaWV2ZSk7XG4gIH1cbn1cbnJldHVybiBjdXJyZW50O1xufVxuXG5mdW5jdGlvbiByZWdlbmVyYXRlKHJvb3QsIGN1cnJlbnQsIHJldHJpZXZlKSB7XG5yZXR1cm4gY3VycmVudCBpbnN0YW5jZW9mIEFycmF5ID9cbiAgLy8gZmFzdCBBcnJheSByZWNvbnN0cnVjdGlvblxuICByZWdlbmVyYXRlQXJyYXkocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIDpcbiAgKFxuICAgIGN1cnJlbnQgaW5zdGFuY2VvZiAkU3RyaW5nID9cbiAgICAgIChcbiAgICAgICAgLy8gcm9vdCBpcyBhbiBlbXB0eSBzdHJpbmdcbiAgICAgICAgY3VycmVudC5sZW5ndGggP1xuICAgICAgICAgIChcbiAgICAgICAgICAgIHJldHJpZXZlLmhhc093blByb3BlcnR5KGN1cnJlbnQpID9cbiAgICAgICAgICAgICAgcmV0cmlldmVbY3VycmVudF0gOlxuICAgICAgICAgICAgICByZXRyaWV2ZVtjdXJyZW50XSA9IHJldHJpZXZlRnJvbVBhdGgoXG4gICAgICAgICAgICAgICAgcm9vdCwgY3VycmVudC5zcGxpdChzcGVjaWFsQ2hhcilcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICkgOlxuICAgICAgICAgIHJvb3RcbiAgICAgICkgOlxuICAgICAgKFxuICAgICAgICBjdXJyZW50IGluc3RhbmNlb2YgT2JqZWN0ID9cbiAgICAgICAgICAvLyBkZWRpY2F0ZWQgT2JqZWN0IHBhcnNlclxuICAgICAgICAgIHJlZ2VuZXJhdGVPYmplY3Qocm9vdCwgY3VycmVudCwgcmV0cmlldmUpIDpcbiAgICAgICAgICAvLyB2YWx1ZSBhcyBpdCBpc1xuICAgICAgICAgIGN1cnJlbnRcbiAgICAgIClcbiAgKVxuO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlSZWN1cnNpb24odmFsdWUsIHJlcGxhY2VyLCBzcGFjZSwgZG9Ob3RSZXNvbHZlKSB7XG5yZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUsIGdlbmVyYXRlUmVwbGFjZXIodmFsdWUsIHJlcGxhY2VyLCAhZG9Ob3RSZXNvbHZlKSwgc3BhY2UpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVJlY3Vyc2lvbih0ZXh0LCByZXZpdmVyKSB7XG5yZXR1cm4gSlNPTi5wYXJzZSh0ZXh0LCBnZW5lcmF0ZVJldml2ZXIocmV2aXZlcikpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN0cmluZ2lmeTogc3RyaW5naWZ5UmVjdXJzaW9uLFxuICBwYXJzZTogcGFyc2VSZWN1cnNpb25cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSAqL1xuLy8gQ3JlZGl0czogaHR0cHM6Ly9naXRodWIuY29tL3NpbmRyZXNvcmh1cy9zZXJpYWxpemUtZXJyb3JcblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlID0+IHtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gZGVzdHJveUNpcmN1bGFyKHZhbHVlLCBbXSk7XG5cdH1cblxuXHQvLyBQZW9wbGUgc29tZXRpbWVzIHRocm93IHRoaW5ncyBiZXNpZGVzIEVycm9yIG9iamVjdHMsIHNv4oCmXG5cblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdC8vIEpTT04uc3RyaW5naWZ5IGRpc2NhcmRzIGZ1bmN0aW9ucy4gV2UgZG8gdG9vLCB1bmxlc3MgYSBmdW5jdGlvbiBpcyB0aHJvd24gZGlyZWN0bHkuXG5cdFx0cmV0dXJuIGBbRnVuY3Rpb246ICR7KHZhbHVlLm5hbWUgfHwgJ2Fub255bW91cycpfV1gO1xuXHR9XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZGVzdHJveS1jaXJjdWxhclxuZnVuY3Rpb24gZGVzdHJveUNpcmN1bGFyKGZyb20sIHNlZW4pIHtcblx0Y29uc3QgdG8gPSBBcnJheS5pc0FycmF5KGZyb20pID8gW10gOiB7fTtcblxuXHRzZWVuLnB1c2goZnJvbSk7XG5cblx0Zm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZnJvbSkpIHtcblx0XHRjb25zdCB2YWx1ZSA9IGZyb21ba2V5XTtcblxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0dG9ba2V5XSA9IHZhbHVlO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKHNlZW4uaW5kZXhPZihmcm9tW2tleV0pID09PSAtMSkge1xuXHRcdFx0dG9ba2V5XSA9IGRlc3Ryb3lDaXJjdWxhcihmcm9tW2tleV0sIHNlZW4uc2xpY2UoMCkpO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dG9ba2V5XSA9ICdbQ2lyY3VsYXJdJztcblx0fVxuXG5cdGlmICh0eXBlb2YgZnJvbS5uYW1lID09PSAnc3RyaW5nJykge1xuXHRcdHRvLm5hbWUgPSBmcm9tLm5hbWU7XG5cdH1cblxuXHRpZiAodHlwZW9mIGZyb20ubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcblx0XHR0by5tZXNzYWdlID0gZnJvbS5tZXNzYWdlO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBmcm9tLnN0YWNrID09PSAnc3RyaW5nJykge1xuXHRcdHRvLnN0YWNrID0gZnJvbS5zdGFjaztcblx0fVxuXG5cdHJldHVybiB0bztcbn0iLCJjb25zdCBJTiA9ICdJTic7XG5jb25zdCBPVVQgPSAnT1VUJztcbmNvbnN0IFJFTU9WRSA9ICdSRU1PVkUnO1xuXG5pbXBvcnQgc2FuaXRpemUgZnJvbSAnLi9oZWxwZXJzL3Nhbml0aXplJztcblxuY29uc3QgaXNSdW5uaW5nSW5Ob2RlID1cbiAgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykgJiZcbiAgKHR5cGVvZiBwcm9jZXNzLnJlbGVhc2UgIT09ICd1bmRlZmluZWQnKSAmJlxuICAocHJvY2Vzcy5yZWxlYXNlLm5hbWUgPT09ICdub2RlJyk7XG5cbmNvbnN0IHRyaW0gPSAoc3RyLCBsZW4sIGVtcCA9ICcuLi4nKSA9PiBzdHIubGVuZ3RoID4gbGVuID8gc3RyLnN1YnN0cigwLCBsZW4pICsgZW1wIDogc3RyO1xuY29uc3QgZ2V0SW5kTWFyZ2luID0gaW5kID0+IHtcbiAgcmV0dXJuIGBtYXJnaW4tbGVmdDogJHsgaW5kICogMjAgfXB4O2A7XG59O1xuY29uc3QgZ2V0SW5kU3BhY2VzID0gaW5kID0+IHtcbiAgcmV0dXJuIFsuLi5BcnJheShpbmQgKiAyKS5rZXlzKCldLm1hcCh4ID0+ICcgJykuam9pbignJyk7XG59O1xuY29uc3QgcGFyc2VMb2dNZXRhID0gbWV0YSA9PiB7XG4gIGlmICh0eXBlb2YgbWV0YSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiBtZXRhID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgbWV0YSA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBtZXRhID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBgKCR7IEpTT04uc3RyaW5naWZ5KG1ldGEpIH0pYDtcbiAgfVxuICBpZiAodHlwZW9mIG1ldGEgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWV0YSkpIHtcbiAgICAgIHJldHVybiBgKFsuLi4keyBtZXRhLmxlbmd0aCB9XSlgO1xuICAgIH1cbiAgICByZXR1cm4gYCgkeyB0cmltKEpTT04uc3RyaW5naWZ5KHNhbml0aXplKG1ldGEpKSwgNTApIH0pYDtcbiAgfVxuICByZXR1cm4gYCgkeyB0eXBlb2YgbWV0YSB9KWA7XG59O1xuXG5jb25zdCBwcmludCA9IHtcbiAgZW50cmFuY2U6ICh3aGF0LCBpbmQpID0+IHtcbiAgICBpZiAoIWlzUnVubmluZ0luTm9kZSkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbnVsbCxcbiAgICAgICAgYCVjJHsgd2hhdCB9YCxcbiAgICAgICAgJ2NvbG9yOiAjYjBiMGIwOycgKyBnZXRJbmRNYXJnaW4oaW5kKVxuICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIFsgbnVsbCwgJ1xceDFiWzM4bSVzXFx4MWJbMG0nLCBgJHsgZ2V0SW5kU3BhY2VzKGluZCkgKyB3aGF0IH1gXTtcbiAgfSxcbiAgZGVmYXVsdDogKHdoYXQsIGluZCkgPT4ge1xuICAgIGlmICghaXNSdW5uaW5nSW5Ob2RlKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBudWxsLFxuICAgICAgICBgJWMkeyB3aGF0IH1gLFxuICAgICAgICBnZXRJbmRNYXJnaW4oaW5kKVxuICAgICAgXTtcbiAgICB9XG4gICAgcmV0dXJuIFsgbnVsbCwgYCR7IGdldEluZFNwYWNlcyhpbmQpICsgd2hhdCB9YCBdO1xuICB9LFxuICBob29rOiAod2hhdCwgaW5kLCB0aW1lKSA9PiB7XG4gICAgaWYgKCFpc1J1bm5pbmdJbk5vZGUpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRpbWUsXG4gICAgICAgIGAlYyR7IHdoYXQgfWAsXG4gICAgICAgICdjb2xvcjogIzk5OTsnICsgZ2V0SW5kTWFyZ2luKGluZClcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbIHRpbWUsICdcXHgxYlszNG0lc1xceDFiWzBtJywgYCR7IGdldEluZFNwYWNlcyhpbmQpICsgd2hhdCB9YCBdO1xuICB9LFxuICBjdXJyZW50OiAod2hhdCwgaW5kKSA9PiB7XG4gICAgaWYgKCFpc1J1bm5pbmdJbk5vZGUpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIG51bGwsXG4gICAgICAgIGAlYyR7IHdoYXQgfWAsXG4gICAgICAgICdmb250LXdlaWdodDogYm9sZDsgYm9yZGVyOiBzb2xpZCAxcHggIzk5OTsgYm9yZGVyLXJhZGl1czogMnB4OyBwYWRkaW5nOiAxcHggMDsnICsgZ2V0SW5kTWFyZ2luKGluZClcbiAgICAgIF07XG4gICAgfVxuICAgIHJldHVybiBbIG51bGwsIGdldEluZFNwYWNlcyhpbmQpICsgYFxceDFiWzEwMG0keyB3aGF0IH1cXHgxYlswbWAgXTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcHJpbnRTbmFwc2hvdFRvQ29uc29sZShzbmFwc2hvdCkge1xuICBjb25zdCBbIHR5cGUsIG5vZGUsIHRyZWUgXSA9IHNuYXBzaG90O1xuXG4gIGxldCBwcmludExpbmVzID0gW1xuICAgIHByaW50LmVudHJhbmNlKCcnLCAwKVxuICBdO1xuXG4gIHByaW50TGluZXMgPSBwcmludExpbmVzLmNvbmNhdCgoZnVuY3Rpb24gbG9vcCh7IGlkLCBpbmQsIG5hbWUsIHVzZWQsIGNoaWxkcmVuLCBsb2dzIH0pIHtcbiAgICBsZXQgbGluZXMgPSBbXTtcbiAgICBsZXQgZWxlbWVudE9wZW5UYWcgPSBgPCR7IG5hbWUgfSR7IHVzZWQgPiAwID8gYCgkeyB1c2VkIH0pYCA6ICcnIH0+YDtcblxuICAgIGxpbmVzLnB1c2goXG4gICAgICBpZCA9PT0gbm9kZS5lbGVtZW50LmlkID8gcHJpbnQuY3VycmVudChlbGVtZW50T3BlblRhZywgaW5kKSA6IHByaW50LmRlZmF1bHQoZWxlbWVudE9wZW5UYWcsIGluZClcbiAgICApO1xuICAgIGlmIChsb2dzICYmIGxvZ3MubGVuZ3RoID4gMCkge1xuICAgICAgbGluZXMgPSBsaW5lcy5jb25jYXQobG9ncy5tYXAoKHsgdHlwZSwgbWV0YSwgdGltZSB9KSA9PiB7XG4gICAgICAgIHJldHVybiBwcmludC5ob29rKGDipLcgJHsgdHlwZSB9JHsgcGFyc2VMb2dNZXRhKG1ldGEpIH1gLCBpbmQsIHRpbWUpO1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgbGluZXMgPSBsaW5lcy5jb25jYXQobG9vcChjaGlsZCkpO1xuICAgICAgfSk7XG4gICAgICBsaW5lcy5wdXNoKFxuICAgICAgICBpZCA9PT0gbm9kZS5lbGVtZW50LmlkID8gcHJpbnQuY3VycmVudChgPC8keyBuYW1lIH0+YCwgaW5kKSA6IHByaW50LmRlZmF1bHQoYDwvJHsgbmFtZSB9PmAsIGluZClcbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBsaW5lcztcbiAgfSkodHJlZSkpO1xuXG4gIC8vIGNvbnNvbGUuY2xlYXIoKTtcbiAgY29uc3Qgc29ydGVkSG9va1RpbWVzID0gcHJpbnRMaW5lc1xuICAgIC5maWx0ZXIoKFsgdGltZSBdKSA9PiB0aW1lICE9PSBudWxsKVxuICAgIC5tYXAoKFsgdGltZSBdKSA9PiB0aW1lKVxuICAgIC5zb3J0KChhLCBiKSA9PiBhID4gYiA/IDEgOiAtMSk7XG5cbiAgcHJpbnRMaW5lcy5mb3JFYWNoKChbIHRpbWUsIC4uLmxpbmUgXSkgPT4ge1xuICAgIGlmIChzb3J0ZWRIb29rVGltZXMubGVuZ3RoID4gMCAmJiB0aW1lKSB7XG4gICAgICBjb25zb2xlLmxvZyguLi5saW5lLCBzb3J0ZWRIb29rVGltZXMuZmluZEluZGV4KHQgPT4gdCA9PT0gdGltZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyguLi5saW5lKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnNwZWN0b3IocHJvY2Vzc29yLCBvcHRpb25zID0ge30pIHtcbiAgY29uc3Qgc25hcHNob3RzID0gW107XG5cbiAgZnVuY3Rpb24gc25hcHNob3QodHlwZSwgbm9kZSkge1xuICAgIHNuYXBzaG90cy5wdXNoKFtcbiAgICAgIHR5cGUsXG4gICAgICBub2RlLFxuICAgICAgcHJvY2Vzc29yLnN5c3RlbSgpLnRyZWUuZGlhZ25vc2UoKVxuICAgIF0pO1xuICAgIHByaW50U25hcHNob3RUb0NvbnNvbGUoc25hcHNob3RzW3NuYXBzaG90cy5sZW5ndGggLSAxXSwgb3B0aW9ucyk7XG4gIH1cblxuICAvLyBwcm9jZXNzb3Iub25Ob2RlSW4obm9kZSA9PiBzbmFwc2hvdChJTiwgbm9kZSkpO1xuICBwcm9jZXNzb3Iub25Ob2RlT3V0KG5vZGUgPT4gc25hcHNob3QoT1VULCBub2RlKSk7XG4gIC8vIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUobm9kZSA9PiBzbmFwc2hvdChSRU1PVkUsIG5vZGUpKTtcbn07XG4iLCJmdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aEhvbGVzOyIsImZ1bmN0aW9uIF9hcnJheVdpdGhvdXRIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FycmF5V2l0aG91dEhvbGVzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJmdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5KGl0ZXIpIHtcbiAgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoaXRlcikgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGl0ZXIpID09PSBcIltvYmplY3QgQXJndW1lbnRzXVwiKSByZXR1cm4gQXJyYXkuZnJvbShpdGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfaXRlcmFibGVUb0FycmF5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVNwcmVhZCgpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBzcHJlYWQgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVNwcmVhZDsiLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi9kZWZpbmVQcm9wZXJ0eVwiKTtcblxuZnVuY3Rpb24gX29iamVjdFNwcmVhZDIodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgJSAyKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldICE9IG51bGwgPyBhcmd1bWVudHNbaV0gOiB7fTtcbiAgICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgICAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG93bktleXMgPSBvd25LZXlzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZmlsdGVyKGZ1bmN0aW9uIChzeW0pIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuXG4gICAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgc291cmNlW2tleV0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMoYXJndW1lbnRzW2ldKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfb2JqZWN0U3ByZWFkMjsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsInZhciBhcnJheVdpdGhvdXRIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aG91dEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5XCIpO1xuXG52YXIgbm9uSXRlcmFibGVTcHJlYWQgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVNwcmVhZFwiKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikge1xuICByZXR1cm4gYXJyYXlXaXRob3V0SG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXkoYXJyKSB8fCBub25JdGVyYWJsZVNwcmVhZCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90b0NvbnN1bWFibGVBcnJheTsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG52YXIgcnVudGltZSA9IChmdW5jdGlvbiAoZXhwb3J0cykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIGV4cG9ydHMuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgZXhwb3J0cy5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIGV4cG9ydHMudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZVxuICAvLyBvciBub3QsIHJldHVybiB0aGUgcnVudGltZSBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gZGVjbGFyZSB0aGUgdmFyaWFibGVcbiAgLy8gcmVnZW5lcmF0b3JSdW50aW1lIGluIHRoZSBvdXRlciBzY29wZSwgd2hpY2ggYWxsb3dzIHRoaXMgbW9kdWxlIHRvIGJlXG4gIC8vIGluamVjdGVkIGVhc2lseSBieSBgYmluL3JlZ2VuZXJhdG9yIC0taW5jbHVkZS1ydW50aW1lIHNjcmlwdC5qc2AuXG4gIHJldHVybiBleHBvcnRzO1xuXG59KFxuICAvLyBJZiB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGUsIHVzZSBtb2R1bGUuZXhwb3J0c1xuICAvLyBhcyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIG5hbWVzcGFjZS4gT3RoZXJ3aXNlIGNyZWF0ZSBhIG5ldyBlbXB0eVxuICAvLyBvYmplY3QuIEVpdGhlciB3YXksIHRoZSByZXN1bHRpbmcgb2JqZWN0IHdpbGwgYmUgdXNlZCB0byBpbml0aWFsaXplXG4gIC8vIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgdmFyaWFibGUgYXQgdGhlIHRvcCBvZiB0aGlzIGZpbGUuXG4gIHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgPyBtb2R1bGUuZXhwb3J0cyA6IHt9XG4pKTtcblxudHJ5IHtcbiAgcmVnZW5lcmF0b3JSdW50aW1lID0gcnVudGltZTtcbn0gY2F0Y2ggKGFjY2lkZW50YWxTdHJpY3RNb2RlKSB7XG4gIC8vIFRoaXMgbW9kdWxlIHNob3VsZCBub3QgYmUgcnVubmluZyBpbiBzdHJpY3QgbW9kZSwgc28gdGhlIGFib3ZlXG4gIC8vIGFzc2lnbm1lbnQgc2hvdWxkIGFsd2F5cyB3b3JrIHVubGVzcyBzb21ldGhpbmcgaXMgbWlzY29uZmlndXJlZC4gSnVzdFxuICAvLyBpbiBjYXNlIHJ1bnRpbWUuanMgYWNjaWRlbnRhbGx5IHJ1bnMgaW4gc3RyaWN0IG1vZGUsIHdlIGNhbiBlc2NhcGVcbiAgLy8gc3RyaWN0IG1vZGUgdXNpbmcgYSBnbG9iYWwgRnVuY3Rpb24gY2FsbC4gVGhpcyBjb3VsZCBjb25jZWl2YWJseSBmYWlsXG4gIC8vIGlmIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3kgZm9yYmlkcyB1c2luZyBGdW5jdGlvbiwgYnV0IGluIHRoYXQgY2FzZVxuICAvLyB0aGUgcHJvcGVyIHNvbHV0aW9uIGlzIHRvIGZpeCB0aGUgYWNjaWRlbnRhbCBzdHJpY3QgbW9kZSBwcm9ibGVtLiBJZlxuICAvLyB5b3UndmUgbWlzY29uZmlndXJlZCB5b3VyIGJ1bmRsZXIgdG8gZm9yY2Ugc3RyaWN0IG1vZGUgYW5kIGFwcGxpZWQgYVxuICAvLyBDU1AgdG8gZm9yYmlkIEZ1bmN0aW9uLCBhbmQgeW91J3JlIG5vdCB3aWxsaW5nIHRvIGZpeCBlaXRoZXIgb2YgdGhvc2VcbiAgLy8gcHJvYmxlbXMsIHBsZWFzZSBkZXRhaWwgeW91ciB1bmlxdWUgcHJlZGljYW1lbnQgaW4gYSBHaXRIdWIgaXNzdWUuXG4gIEZ1bmN0aW9uKFwiclwiLCBcInJlZ2VuZXJhdG9yUnVudGltZSA9IHJcIikocnVudGltZSk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuaW1wb3J0IHsgRm9jdXNGaWVsZCB9IGZyb20gJy4vRE9NJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ2hlY2tGb3JFZGl0RmllbGQoeyB0b2RvcyB9KSB7XG4gIHJldHVybiA8Rm9jdXNGaWVsZCBpbmRleD17IHRvZG9zLmZpbmRJbmRleCgoeyBlZGl0aW5nIH0pID0+IGVkaXRpbmcpIH0gLz47XG59XG4iLCJpbXBvcnQge1xuICBUT0dHTEUsXG4gIE5FV19UT0RPLFxuICBERUxFVEUsXG4gIEVESVQsXG4gIEVESVRfVE9ETyxcbiAgQ0xFQVJfQ09NUExFVEVEXG59IGZyb20gJy4vU3RvcmUnO1xuaW1wb3J0IHtcbiAgRklMVEVSX0FMTCxcbiAgRklMVEVSX0FDVElWRSxcbiAgRklMVEVSX0NPTVBMRVRFRFxufSBmcm9tICcuLyc7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5jb25zdCAkID0gKHNlbGVjdG9yKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbmNvbnN0IGxpc3QgPSAkKCcudG9kby1saXN0Jyk7XG5jb25zdCBoZWFkZXIgPSAkKCcuaGVhZGVyJyk7XG5cbmNvbnN0IEVOVEVSID0gMTM7XG5jb25zdCBFU0MgPSAyNztcblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxDb250YWluZXIoeyBjaGlsZHJlbiB9KSB7XG4gIGxpc3QuaW5uZXJIVE1MID0gY2hpbGRyZW4oKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b2dnbGUnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oVE9HR0xFLCB0b2RvSW5kZXgpO1xuICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZGVsZXRlJykpIHtcbiAgICAgICAgb25Vc2VyQWN0aW9uKERFTEVURSwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKSkge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKGUpID0+IHtcbiAgICAgIGNvbnN0IHRvZG9JbmRleCA9IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpLCAxMCk7XG5cbiAgICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihFRElUX1RPRE8sIHsgaW5kZXg6IHRvZG9JbmRleCwgbGFiZWw6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWVkaXQnKSAmJiBlLmtleUNvZGUgPT09IEVTQykge1xuICAgICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1uZXcnKSAmJiBlLmtleUNvZGUgPT09IEVOVEVSKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihORVdfVE9ETywgZS50YXJnZXQudmFsdWUpO1xuICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBbXSk7XG59XG5leHBvcnQgZnVuY3Rpb24gRm9jdXNGaWVsZCh7IGluZGV4IH0pIHtcbiAgY29uc3QgZWwgPSAkKGAuZWRpdFtkYXRhLWluZGV4PVwiJHsgaW5kZXggfVwiXWApO1xuXG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPSBlbC52YWx1ZS5sZW5ndGg7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gUHJvZ3Jlc3NDaGVja2VyKHsgdG9kb3MgfSkge1xuICBjb25zdCBjb21wbGV0ZWQgPSB0b2Rvcy5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IGNvbXBsZXRlZCkubGVuZ3RoO1xuICBjb25zdCBpdGVtc0xlZnQgPSB0b2Rvcy5sZW5ndGggLSBjb21wbGV0ZWQ7XG5cbiAgJCgnW2RhdGEtY291bnRdJykuaW5uZXJIVE1MID0gYFxuICAgIDxzdHJvbmc+JHsgaXRlbXNMZWZ0IH08L3N0cm9uZz4gJHsgaXRlbXNMZWZ0ID4gMSB8fCBpdGVtc0xlZnQgPT09IDAgPyAnaXRlbXMnIDogJ2l0ZW0nIH0gbGVmdFxuICBgO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGb290ZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICQoJ1tkYXRhLWZpbHRlcl0nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFsbCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUxMKTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWFjdGl2ZScpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUNUSVZFKTtcbiAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWNvbXBsZXRlZCcpKSB7XG4gICAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQ09NUExFVEVEKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKCdbZGF0YS1jbGVhci1jb21wbGV0ZWRdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBvblVzZXJBY3Rpb24oQ0xFQVJfQ09NUExFVEVEKTtcbiAgICB9KTtcbiAgfSwgW10pO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGaWx0ZXJPcHRpb25zVGFicyh7IGZpbHRlciB9KSB7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgJCgnW2RhdGEtYWxsXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9BTEwgPyAnc2VsZWN0ZWQnIDogJycpO1xuICAgICQoJ1tkYXRhLWFjdGl2ZV0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUNUSVZFID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgICAkKCdbZGF0YS1jb21wbGV0ZWRdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gIH0sIFsgZmlsdGVyIF0pO1xufVxuIiwiaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBUb0RvIH0gZnJvbSAnLi9TdG9yZSc7XG5cbmNvbnN0IGluaXRpYWxWYWx1ZSA9IEpTT04uc3RyaW5naWZ5KFtcbiAgVG9Ebyh7IGxhYmVsOiAnQWN0TUwgaXMgdXNpbmcgSlNYJyB9KSxcbiAgVG9Ebyh7IGxhYmVsOiAnSXQgaXMgbGlrZSBSZWFjdCBidXQgbm90IGZvciByZW5kZXJpbmcnIH0pXG5dKTtcblxuZXhwb3J0IGNvbnN0IHVzZUxvY2FsU3RvcmFnZSA9ICgpID0+IHtcbiAgY29uc3QgWyBnZXREYXRhIF0gPSB1c2VTdGF0ZShKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvcycpIHx8IGluaXRpYWxWYWx1ZSkpO1xuXG4gIHJldHVybiBnZXREYXRhKCk7XG59O1xuZXhwb3J0IGNvbnN0IFBlcnNpc3QgPSAoeyB0b2RvcyB9KSA9PiB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvcycsIEpTT04uc3RyaW5naWZ5KHRvZG9zKSk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZpbGxDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5pbXBvcnQgeyBGSUxURVJfQUxMLCBGSUxURVJfQUNUSVZFLCBGSUxURVJfQ09NUExFVEVEIH0gZnJvbSAnLi8nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJlcih7IHRvZG9zLCBmaWx0ZXIgfSkge1xuICByZXR1cm4gKFxuICAgIDxGaWxsQ29udGFpbmVyPlxuICAgICAge1xuICAgICAgICAoKSA9PiB0b2Rvc1xuICAgICAgICAuZmlsdGVyKCh7IGNvbXBsZXRlZCB9KSA9PiB7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FMTCkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0FDVElWRSkgcmV0dXJuICFjb21wbGV0ZWQ7XG4gICAgICAgICAgaWYgKGZpbHRlciA9PT0gRklMVEVSX0NPTVBMRVRFRCkgcmV0dXJuIGNvbXBsZXRlZDtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pLm1hcCgodG9kbywgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGxpQ2xhc3MgPSB0b2RvLmVkaXRpbmcgPyAnZWRpdGluZycgOiAodG9kby5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnKTtcblxuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8bGkgY2xhc3M9JyR7IGxpQ2xhc3MgfSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS10b2dnbGVcbiAgICAgICAgICAgICAgICAgICR7IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfT5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZGF0YS1pbmRleD1cIiR7IGkgfVwiIGRhdGEtbGFiZWw+JHsgdG9kby5sYWJlbCB9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImRlc3Ryb3lcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWRlbGV0ZT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVkaXRcIiB2YWx1ZT1cIiR7IHRvZG8ubGFiZWwgfVwiIGRhdGEtaW5kZXg9XCIkeyBpIH1cIiBkYXRhLWVkaXQ+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0pLmpvaW4oJycpXG4gICAgICB9XG4gICAgPC9GaWxsQ29udGFpbmVyPlxuICApO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IHVzZVJlZHVjZXIsIHVzZVB1YlN1YiwgdXNlRWZmZWN0IH0gZnJvbSAnLi4vLi4vLi4vbGliJztcblxuZXhwb3J0IGNvbnN0IFRPR0dMRSA9ICdUT0dHTEUnO1xuZXhwb3J0IGNvbnN0IE5FV19UT0RPID0gJ05FV19UT0RPJztcbmV4cG9ydCBjb25zdCBERUxFVEUgPSAnREVMRVRFJztcbmV4cG9ydCBjb25zdCBFRElUID0gJ0VESVQnO1xuZXhwb3J0IGNvbnN0IEVESVRfVE9ETyA9ICdFRElUX1RPRE8nO1xuZXhwb3J0IGNvbnN0IENMRUFSX0NPTVBMRVRFRCA9ICdDTEVBUl9DT01QTEVURUQnO1xuXG5jb25zdCB0b2dnbGUgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBUT0dHTEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IGRlbGV0ZVRvZG8gPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBERUxFVEUsIHRvZG9JbmRleCB9KTtcbmNvbnN0IG5ld1RvZG8gPSAobGFiZWwpID0+ICh7IHR5cGU6IE5FV19UT0RPLCBsYWJlbCB9KTtcbmNvbnN0IGVkaXQgPSAodG9kb0luZGV4KSA9PiAoeyB0eXBlOiBFRElULCB0b2RvSW5kZXggfSk7XG5jb25zdCBlZGl0VG9EbyA9ICh7IGluZGV4LCBsYWJlbCB9KSA9PiAoeyB0eXBlOiBFRElUX1RPRE8sIGluZGV4LCBsYWJlbCB9KTtcbmNvbnN0IGNsZWFyQ29tcGxldGVkID0gKCkgPT4gKHsgdHlwZTogQ0xFQVJfQ09NUExFVEVEIH0pO1xuXG5leHBvcnQgY29uc3QgVG9EbyA9ICh7IGxhYmVsIH0pID0+ICh7IGxhYmVsLCBjb21wbGV0ZWQ6IGZhbHNlLCBlZGl0aW5nOiBmYWxzZSB9KTtcblxuY29uc3QgcmVkdWNlciA9IGZ1bmN0aW9uICh0b2RvcywgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIFRPR0dMRTpcbiAgICAgIHJldHVybiB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gYWN0aW9uLnRvZG9JbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgY29tcGxldGVkOiAhdG9kby5jb21wbGV0ZWRcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0b2RvO1xuICAgICAgfSk7XG4gICAgY2FzZSBFRElUOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24udG9kb0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBlZGl0aW5nOiAhdG9kby5lZGl0aW5nXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgZWRpdGluZzogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIGNhc2UgRURJVF9UT0RPOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24uaW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGxhYmVsOiBhY3Rpb24ubGFiZWwsXG4gICAgICAgICAgICBlZGl0aW5nOiBmYWxzZVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICB9KTtcbiAgICBjYXNlIE5FV19UT0RPOlxuICAgICAgcmV0dXJuIFsgLi4udG9kb3MsIFRvRG8oeyBsYWJlbDogYWN0aW9uLmxhYmVsIH0pIF07XG4gICAgY2FzZSBERUxFVEU6XG4gICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKCh0b2RvLCBpbmRleCkgPT4gaW5kZXggIT09IGFjdGlvbi50b2RvSW5kZXgpO1xuICAgIGNhc2UgQ0xFQVJfQ09NUExFVEVEOlxuICAgICAgcmV0dXJuIHRvZG9zLmZpbHRlcigodG9kbykgPT4gIXRvZG8uY29tcGxldGVkKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHRvZG9zO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdG9yZSh7IGluaXRpYWxWYWx1ZSwgY2hpbGRyZW4gfSkge1xuICBjb25zdCBbIHRvZG9zLCBkaXNwYXRjaCBdID0gdXNlUmVkdWNlcihyZWR1Y2VyLCBpbml0aWFsVmFsdWUpO1xuICBjb25zdCB7IHN1YnNjcmliZSB9ID0gdXNlUHViU3ViKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzdWJzY3JpYmUoVE9HR0xFLCAodG9kb0luZGV4KSA9PiBkaXNwYXRjaCh0b2dnbGUodG9kb0luZGV4KSkpO1xuICAgIHN1YnNjcmliZShORVdfVE9ETywgKGxhYmVsKSA9PiBkaXNwYXRjaChuZXdUb2RvKGxhYmVsKSkpO1xuICAgIHN1YnNjcmliZShERUxFVEUsICh0b2RvSW5kZXgpID0+IGRpc3BhdGNoKGRlbGV0ZVRvZG8odG9kb0luZGV4KSkpO1xuICAgIHN1YnNjcmliZShFRElULCAobGFiZWwpID0+IGRpc3BhdGNoKGVkaXQobGFiZWwpKSk7XG4gICAgc3Vic2NyaWJlKEVESVRfVE9ETywgKHBheWxvYWQpID0+IGRpc3BhdGNoKGVkaXRUb0RvKHBheWxvYWQpKSk7XG4gICAgc3Vic2NyaWJlKENMRUFSX0NPTVBMRVRFRCwgKCkgPT4gZGlzcGF0Y2goY2xlYXJDb21wbGV0ZWQoKSkpO1xuICB9LCBbXSk7XG5cbiAgY2hpbGRyZW4oeyB0b2RvczogdG9kb3MoKSB9KTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIHJ1biwgRnJhZ21lbnQsIHVzZVB1YlN1YiwgdXNlU3RhdGUsIHVzZUVmZmVjdCwgcHJvY2Vzc29yIH0gZnJvbSAnLi4vLi4vLi4vbGliJztcbmltcG9ydCBpbnNwZWN0b3IgZnJvbSAnLi4vLi4vLi4vcGFja2FnZXMvaW5zcGVjdG9yJztcblxuaW5zcGVjdG9yKHByb2Nlc3Nvcik7XG5cbmltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBDaGVja0ZvckVkaXRGaWVsZCBmcm9tICcuL0NoZWNrRm9yRWRpdEZpZWxkJztcbmltcG9ydCB7IFByb2dyZXNzQ2hlY2tlciwgRmlsdGVyT3B0aW9uc1RhYnMsIENvbnRhaW5lciwgRm9vdGVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgdXNlTG9jYWxTdG9yYWdlLCBQZXJzaXN0IH0gZnJvbSAnLi9QZXJzaXN0JztcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9BTEwgPSAnRklMVEVSX0FMTCc7XG5leHBvcnQgY29uc3QgRklMVEVSX0FDVElWRSA9ICdGSUxURVJfQUNUSVZFJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQ09NUExFVEVEID0gJ0ZJTFRFUl9DT01QTEVURUQnO1xuXG5mdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IGluaXRpYWxWYWx1ZSA9IHVzZUxvY2FsU3RvcmFnZSgpO1xuICBjb25zdCB7IHB1Ymxpc2gsIHN1YnNjcmliZSB9ID0gdXNlUHViU3ViKCk7XG4gIGNvbnN0IFsgZmlsdGVyLCBzZXRGaWx0ZXIgXSA9IHVzZVN0YXRlKEZJTFRFUl9BTEwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc3Vic2NyaWJlKEZJTFRFUl9BTEwsICgpID0+IHNldEZpbHRlcihGSUxURVJfQUxMKSk7XG4gICAgc3Vic2NyaWJlKEZJTFRFUl9BQ1RJVkUsICgpID0+IHNldEZpbHRlcihGSUxURVJfQUNUSVZFKSk7XG4gICAgc3Vic2NyaWJlKEZJTFRFUl9DT01QTEVURUQsICgpID0+IHNldEZpbHRlcihGSUxURVJfQ09NUExFVEVEKSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxDb250YWluZXIgb25Vc2VyQWN0aW9uPXsgcHVibGlzaCB9IC8+XG4gICAgICA8Rm9vdGVyIG9uVXNlckFjdGlvbj17IHB1Ymxpc2ggfS8+XG4gICAgICA8U3RvcmUgaW5pdGlhbFZhbHVlPXsgaW5pdGlhbFZhbHVlIH0+XG4gICAgICAgIDxGaWx0ZXJPcHRpb25zVGFicyBmaWx0ZXI9eyBmaWx0ZXIoKSB9IC8+XG4gICAgICAgIDxSZW5kZXJlciBmaWx0ZXI9eyBmaWx0ZXIoKSB9Lz5cbiAgICAgICAgPENoZWNrRm9yRWRpdEZpZWxkIC8+XG4gICAgICAgIDxQcm9ncmVzc0NoZWNrZXIgLz5cbiAgICAgICAgPFBlcnNpc3QgLz5cbiAgICAgIDwvU3RvcmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbnJ1big8QXBwIC8+KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=