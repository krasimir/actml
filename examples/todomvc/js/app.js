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
exports.default = Tree;
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
}

;

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

/***/ "../../lib/hooks/useProduct.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/lib/hooks/useProduct.js ***!
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
/* eslint-disable no-return-assign */


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
          return {
            value: node.__product
          };
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

function createSubscribeElement(subscribe) {
  return function (_ref) {
    var type = _ref.type,
        children = _ref.children;
    subscribe(type, function (payload) {
      return children({
        payload: payload
      });
    });
  };
}

;

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

var _useProduct = __webpack_require__(/*! ./hooks/useProduct */ "../../lib/hooks/useProduct.js");

var _useProduct2 = _interopRequireDefault(_useProduct);

var _usePubSub = __webpack_require__(/*! ./hooks/usePubSub */ "../../lib/hooks/usePubSub.js");

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = __webpack_require__(/*! ./hooks/useState */ "../../lib/hooks/useState.js");

var _useState2 = _interopRequireDefault(_useState);

var _useReducer = __webpack_require__(/*! ./hooks/useReducer */ "../../lib/hooks/useReducer.js");

var _useReducer2 = _interopRequireDefault(_useReducer);

var _useEffect = __webpack_require__(/*! ./hooks/useEffect */ "../../lib/hooks/useEffect.js");

var _useEffect2 = _interopRequireDefault(_useEffect);

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
  var useProduct = (0, _useProduct2.default)(processor, useState);
  var usePubSub = (0, _usePubSub2.default)(processor);
  var useReducer = (0, _useReducer2.default)(useState);
  var useEffect = (0, _useEffect2.default)(processor);
  return {
    A: A,
    run: run,
    Fragment: Fragment,
    processor: processor,
    useElement: useElement,
    useProduct: useProduct,
    usePubSub: usePubSub,
    useState: useState,
    useReducer: useReducer,
    useEffect: useEffect
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
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Filter */ "./src/Filter.js");




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
  list.addEventListener('click', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

    if (e.target.hasAttribute('data-toggle')) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_1__["TOGGLE"], todoIndex);
    } else if (e.target.hasAttribute('data-delete')) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_1__["DELETE"], todoIndex);
    }
  });
  list.addEventListener('dblclick', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

    if (e.target.hasAttribute('data-label')) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_1__["EDIT"], todoIndex);
    }
  });
  list.addEventListener('focusout', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

    if (e.target.hasAttribute('data-edit')) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_1__["EDIT_TODO"], {
        index: todoIndex,
        label: e.target.value
      });
    }
  });
  list.addEventListener('keyup', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);

    if (e.target.hasAttribute('data-edit') && e.keyCode === ENTER) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_1__["EDIT_TODO"], {
        index: todoIndex,
        label: e.target.value
      });
    } else if (e.target.hasAttribute('data-edit') && e.keyCode === ESC) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_1__["EDIT"], todoIndex);
    }
  });
  header.addEventListener('keyup', function (e) {
    if (e.target.hasAttribute('data-new') && e.keyCode === ENTER) {
      onUserAction(_Store__WEBPACK_IMPORTED_MODULE_1__["NEW_TODO"], e.target.value);
      e.target.value = '';
    }
  });
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
  $('[data-filter]').addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-all')) {
      onUserAction(_Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_ALL"]);
    } else if (e.target.hasAttribute('data-active')) {
      onUserAction(_Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_ACTIVE"]);
    } else if (e.target.hasAttribute('data-completed')) {
      onUserAction(_Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_COMPLETED"]);
    }
  });
  $('[data-clear-completed]').addEventListener('click', function () {
    onUserAction(_Store__WEBPACK_IMPORTED_MODULE_1__["CLEAR_COMPLETED"]);
  });
}
;
function FilterOptionsTabs(_ref7) {
  var filter = _ref7.filter;
  $('[data-all]').setAttribute('class', filter === _Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_ALL"] ? 'selected' : '');
  $('[data-active]').setAttribute('class', filter === _Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_ACTIVE"] ? 'selected' : '');
  $('[data-completed]').setAttribute('class', filter === _Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_COMPLETED"] ? 'selected' : '');
}

/***/ }),

/***/ "./src/Filter.js":
/*!***********************!*\
  !*** ./src/Filter.js ***!
  \***********************/
/*! exports provided: FILTER_ALL, FILTER_ACTIVE, FILTER_COMPLETED, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_ALL", function() { return FILTER_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_ACTIVE", function() { return FILTER_ACTIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTER_COMPLETED", function() { return FILTER_COMPLETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_1__);


/* eslint-disable react/prop-types */

/** @jsx A */

var FILTER_ALL = 'FILTER_ALL';
var FILTER_ACTIVE = 'FILTER_ACTIVE';
var FILTER_COMPLETED = 'FILTER_COMPLETED';
function Filter(_ref) {
  var children = _ref.children;

  var _useState = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useState"])(FILTER_ALL),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_1__["usePubSub"])(),
      Subscribe = _usePubSub.Subscribe;

  Object(_lib__WEBPACK_IMPORTED_MODULE_1__["useProduct"])(filter());
  return Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(_lib__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, children, Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(Subscribe, {
    type: FILTER_ALL
  }, function () {
    return setFilter(FILTER_ALL);
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(Subscribe, {
    type: FILTER_ACTIVE
  }, function () {
    return setFilter(FILTER_ACTIVE);
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_1__["A"])(Subscribe, {
    type: FILTER_COMPLETED
  }, function () {
    return setFilter(FILTER_COMPLETED);
  }));
}
;

/***/ }),

/***/ "./src/Persist.js":
/*!************************!*\
  !*** ./src/Persist.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/Store.js");


var initialValue = JSON.stringify([Object(_Store__WEBPACK_IMPORTED_MODULE_1__["ToDo"])({
  label: 'ActML is using JSX'
}), Object(_Store__WEBPACK_IMPORTED_MODULE_1__["ToDo"])({
  label: 'It is like React but not for rendering'
})]);
/* harmony default export */ __webpack_exports__["default"] = ({
  Provider: function Provider() {
    Object(_lib__WEBPACK_IMPORTED_MODULE_0__["useProduct"])(JSON.parse(localStorage.getItem('todos') || initialValue));
  },
  Storage: function Storage(_ref) {
    var todos = _ref.todos;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
});

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
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Filter */ "./src/Filter.js");
/* eslint-disable react/prop-types */

/** @jsx A */



function Renderer(_ref) {
  var todos = _ref.todos,
      filter = _ref.filter;
  console.log(todos, filter);
  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["FillContainer"], null, function () {
    return todos.filter(function (_ref2) {
      var completed = _ref2.completed;
      if (filter === _Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_ALL"]) return true;
      if (filter === _Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_ACTIVE"]) return !completed;
      if (filter === _Filter__WEBPACK_IMPORTED_MODULE_2__["FILTER_COMPLETED"]) return completed;
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
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useReducer, 3),
      todos = _useReducer2[0],
      Dispatch = _useReducer2[2];

  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_3__["usePubSub"])(),
      Subscribe = _usePubSub.Subscribe;

  Object(_lib__WEBPACK_IMPORTED_MODULE_3__["useProduct"])(todos());
  return Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(_lib__WEBPACK_IMPORTED_MODULE_3__["Fragment"], null, children, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: TOGGLE
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref4) {
      var todoIndex = _ref4.payload;
      return toggle(todoIndex);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: NEW_TODO
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref5) {
      var label = _ref5.payload;
      return newTodo(label);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: DELETE
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref6) {
      var todoIndex = _ref6.payload;
      return deleteTodo(todoIndex);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: EDIT
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref7) {
      var todoIndex = _ref7.payload;
      return edit(todoIndex);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: EDIT_TODO
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    propsToAction: function propsToAction(_ref8) {
      var payload = _ref8.payload;
      return editToDo(payload);
    }
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Subscribe, {
    type: CLEAR_COMPLETED
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_3__["A"])(Dispatch, {
    action: clearCompleted()
  })));
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib */ "../../lib/index.js");
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Renderer */ "./src/Renderer.js");
/* harmony import */ var _CheckForEditField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./CheckForEditField */ "./src/CheckForEditField.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Filter */ "./src/Filter.js");
/* harmony import */ var _Persist__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Persist */ "./src/Persist.js");
/** @jsx A */








function App() {
  var _usePubSub = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["usePubSub"])(),
      publish = _usePubSub.publish;

  return Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_lib__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["Container"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["Footer"], {
    onUserAction: publish
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Persist__WEBPACK_IMPORTED_MODULE_6__["default"].Provider, {
    exports: "initialValue"
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"], {
    exports: "todos",
    $initialValue: true
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Filter__WEBPACK_IMPORTED_MODULE_5__["default"], {
    exports: "filter"
  }, Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Renderer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    $todos: true,
    $filter: true
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["FilterOptionsTabs"], {
    $filter: true
  })), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_CheckForEditField__WEBPACK_IMPORTED_MODULE_3__["default"], {
    $todos: true
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_4__["ProgressChecker"], {
    $todos: true
  }), Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(_Persist__WEBPACK_IMPORTED_MODULE_6__["default"].Storage, {
    $todos: true
  })));
}

;
Object(_lib__WEBPACK_IMPORTED_MODULE_0__["run"])(Object(_lib__WEBPACK_IMPORTED_MODULE_0__["A"])(App, null));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvUXVldWUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9UcmVlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlRWZmZWN0LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL2hvb2tzL3VzZVByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VQdWJTdWIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91c2VSZWR1Y2VyLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9saWIvaG9va3MvdXNlU3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9ob29rcy91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvbGliL3V0aWxzL2lzQWN0TUxFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9ub2RlX21vZHVsZXMvZmFzdC1kZWVwLWVxdWFsL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2FycmF5V2l0aG91dEhvbGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2l0ZXJhYmxlVG9BcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pdGVyYWJsZVRvQXJyYXlMaW1pdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9ub25JdGVyYWJsZVJlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVTcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvb2JqZWN0U3ByZWFkMi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3RvQ29uc3VtYWJsZUFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0NoZWNrRm9yRWRpdEZpZWxkLmpzIiwid2VicGFjazovLy8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUGVyc2lzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImdldEZ1bmNOYW1lIiwiZnVuYyIsIm5hbWUiLCJyZXN1bHQiLCJleGVjIiwidG9TdHJpbmciLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsIkVycm9yIiwiX19hY3RtbCIsIl9fdXNlZCIsIl9fcnVubmluZyIsImlkIiwiaW5pdGlhbGl6ZSIsInVzZWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJtZXJnZVByb3BzIiwibmV3UHJvcHMiLCJhc3NpZ24iLCJpc1J1bm5pbmciLCJlbnRlciIsImNvbnN1bWUiLCJvdXQiLCJkZWZhdWx0IiwiY3JlYXRlUHJvY2Vzc29yIiwiX2lzQWN0TUxFbGVtZW50IiwicmVxdWlyZSIsIl9pc0FjdE1MRWxlbWVudDIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX1RyZWUiLCJfVHJlZTIiLCJfdXNlUHViU3ViIiwiX3VzZVB1YlN1YjIiLCJfdXNlU3RhdGUiLCJfdXNlU3RhdGUyIiwiX3VzZUVmZmVjdCIsIl91c2VFZmZlY3QyIiwiX1F1ZXVlIiwiX1F1ZXVlMiIsIm9iaiIsIl9fZXNNb2R1bGUiLCJDSElMRFJFTiIsIkNPTlNVTUUiLCJQUk9DRVNTX1JFU1VMVCIsIlJFVFVSTkVEX0VMRU1FTlQiLCJDSElMRCIsImlzR2VuZXJhdG9yIiwiaXNQcm9taXNlIiwiY3JlYXRlQ2hpbGRyZW5GdW5jIiwibm9kZSIsInByb2Nlc3NOb2RlIiwiZiIsIl9hcmd1bWVudHMiLCJlbGVtZW50IiwicXVldWVJdGVtc1RvQWRkIiwicmVzdWx0cyIsImNoaWxkcmVuUXVldWUiLCJfbG9vcCIsImkiLCJfY2hpbGRyZW4kaSIsImFwcGx5IiwicHVzaCIsImFkZENoaWxkTm9kZSIsImZ1bmNSZXN1bHQiLCJyZXZlcnNlIiwiZm9yRWFjaCIsInByZXBlbmRJdGVtIiwiciIsInByb2Nlc3MiLCJvbkRvbmUiLCJ0cmVlIiwiY3VycmVudE5vZGUiLCJyZXJ1biIsInF1ZXVlIiwiYWRkIiwiY29uc3VtcHRpb24iLCJnZW5lcmF0b3IiLCJQcm9taXNlIiwiZ2VuZXJhdG9yRG9uZSIsImdlblJlc3VsdCIsIml0ZXJhdGUiLCJuZXh0IiwiZG9uZSIsInJlcyIsInRoZW4iLCJfcmVzIiwicnVuIiwicm9vdE5vZGUiLCJyZXNvbHZlUm9vdCIsIm9uTm9kZUVudGVyIiwiY2FsbGJhY2siLCJhZGROb2RlRW50ZXJDYWxsYmFjayIsIm9uTm9kZU91dCIsImFkZE5vZGVPdXRDYWxsYmFjayIsIm9uTm9kZVJlbW92ZSIsInN5c3RlbSIsInJlc2V0IiwiY2xlYXIiLCJjcmVhdGVRdWV1ZSIsIl90b0NvbnN1bWFibGVBcnJheSIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsImFycjIiLCJmcm9tIiwiTE9HUyIsImxvZyIsIl9jb25zb2xlIiwiY29uc29sZSIsImNyZWF0ZUl0ZW0iLCJ0eXBlIiwiY29udGV4dCIsIml0ZW1zIiwiYXN5bmMiLCJydW5uaW5nIiwicmVsZWFzZSIsImNvbmNhdCIsImxhc3RSZXN1bHQiLCJfdGhpcyIsIml0ZW0iLCJzaGlmdCIsImFzeW5jUmVzdWx0IiwiY2F0Y2giLCJlcnJvciIsImdldFJlc3VsdCIsInJlamVjdCIsIlRyZWUiLCJfb25Ob2RlUmVtb3ZlIiwicm9vdCIsImNyZWF0ZU5ld05vZGUiLCJpZHMiLCJnZXRJZCIsInVzZVNhbWVOb2RlIiwibmV3RWxlbWVudCIsInRyZWVEaWZmIiwib2xkRWxlbWVudCIsImtleSIsInBhcmVudCIsImN1cnNvciIsImMiLCJfdGhpczIiLCJzcGxpY2UiLCJyZW1vdmVkTm9kZSIsIl90aGlzMyIsImNoaWxkTm9kZSIsIm5ld0NoaWxkTm9kZSIsImdldE51bU9mRWxlbWVudHMiLCJkaWFnbm9zZSIsImxvb3BPdmVyIiwiaW5kIiwibWFwIiwiY2hpbGQiLCJfZmFzdERlZXBFcXVhbCIsIl9mYXN0RGVlcEVxdWFsMiIsIl9pc1ZhbGlkSG9va0NvbnRleHQiLCJfaXNWYWxpZEhvb2tDb250ZXh0MiIsIlN0b3JhZ2UiLCJlbGVtZW50cyIsImdldCIsImVmZmVjdHMiLCJjb25zdW1lciIsImNsZWFuVXAiLCJjcmVhdGVFZmZlY3QiLCJkZXBzIiwidXBkYXRlRWZmZWN0IiwiZWZmZWN0Iiwib2xkRGVwcyIsImRlcHNFcXVhbCIsIm5ld0RlcHMiLCJyZXNvbHZlRWZmZWN0IiwiYXJlRXF1YWwiLCJjcmVhdGVVc2VFZmZlY3RIb29rIiwicHJvY2Vzc29yIiwic3RvcmFnZSIsImluZGV4IiwiY3JlYXRlVXNlRWxlbWVudEhvb2siLCJfZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJicmlkZ2VNZXRob2ROYW1lIiwia2V5d29yZCIsInJlc29sdmVQcm9kdWN0IiwiYnJpZGdlTWV0aG9kIiwiZ2V0RXJyb3IiLCJzb3VyY2UiLCJmaW5kIiwicHJvZHVjdCIsImdldE5vdEZvdW5kRXJyb3IiLCJnZXRTdGFjayIsInN0YWNrIiwiam9pbiIsImNyZWF0ZVVzZVByb2R1Y3RIb29rIiwicHJvcE5hbWVzIiwia2V5cyIsInByb3BOYW1lIiwiY2hhckF0Iiwic3Vic3RyIiwicHJvZHVjdFZhbHVlIiwiX19wcm9kdWN0IiwibmV3VmFsdWUiLCJjcmVhdGVVc2VQdWJTdWJIb29rIiwic3Vic2NyaWJlcnMiLCJjcmVhdGVTdWJzY3JpYmVFbGVtZW50Iiwic3Vic2NyaWJlIiwiX3JlZiIsInBheWxvYWQiLCJjcmVhdGVQdWJsaXNoRWxlbWVudCIsInB1Ymxpc2giLCJfcmVmMiIsInNjb3BlZEVsZW1lbnQiLCJlbCIsInN1YnNjcmliZUZ1bmMiLCJfbGVuIiwicGFyYW1zIiwiX2tleSIsInB1Ymxpc2hGdW5jIiwiU3Vic2NyaWJlIiwiUHVibGlzaCIsIl9zbGljZWRUb0FycmF5Iiwic2xpY2VJdGVyYXRvciIsIl9hcnIiLCJfbiIsIl9kIiwiX2UiLCJfaSIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3MiLCJlcnIiLCJUeXBlRXJyb3IiLCJjcmVhdGVVc2VSZWR1Y2VySG9vayIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsInRhcmdldCIsImluZGV4T2YiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJjcmVhdGVEaXNwYXRjaEVsZW1lbnQiLCJkaXNwYXRjaCIsImFjdGlvbiIsInByb3BzVG9BY3Rpb24iLCJyZXN0IiwidXNlU3RhdGUiLCJyZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwic3RhdGUiLCJzZXRTdGF0ZSIsImNyZWF0ZVVzZVN0YXRlSG9vayIsInN0YXRlcyIsIm5ld1N0YXRlIiwiaXNWYWxpZEhvb2tDb250ZXh0IiwiY3JlYXRlUnVudGltZSIsIl9Qcm9jZXNzb3IiLCJfUHJvY2Vzc29yMiIsIl9BY3RFbGVtZW50IiwiX0FjdEVsZW1lbnQyIiwiX3VzZUVsZW1lbnQiLCJfdXNlRWxlbWVudDIiLCJfdXNlUHJvZHVjdCIsIl91c2VQcm9kdWN0MiIsIl91c2VSZWR1Y2VyIiwiX3VzZVJlZHVjZXIyIiwiQSIsIkZyYWdtZW50IiwidXNlRWxlbWVudCIsInVzZVByb2R1Y3QiLCJ1c2VQdWJTdWIiLCJ1c2VSZWR1Y2VyIiwidXNlRWZmZWN0IiwicnVudGltZSIsIm1vZHVsZSIsImlzQWN0TUxFbGVtZW50IiwiQ2hlY2tGb3JFZGl0RmllbGQiLCJ0b2RvcyIsImZpbmRJbmRleCIsImVkaXRpbmciLCIkIiwic2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsaXN0IiwiaGVhZGVyIiwiRU5URVIiLCJFU0MiLCJGaWxsQ29udGFpbmVyIiwiaW5uZXJIVE1MIiwiQ29udGFpbmVyIiwib25Vc2VyQWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0b2RvSW5kZXgiLCJwYXJzZUludCIsImdldEF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsIlRPR0dMRSIsIkRFTEVURSIsIkVESVQiLCJFRElUX1RPRE8iLCJsYWJlbCIsImtleUNvZGUiLCJORVdfVE9ETyIsIkZvY3VzRmllbGQiLCJmb2N1cyIsInNlbGVjdGlvblN0YXJ0Iiwic2VsZWN0aW9uRW5kIiwiUHJvZ3Jlc3NDaGVja2VyIiwiY29tcGxldGVkIiwiZmlsdGVyIiwiaXRlbXNMZWZ0IiwiRm9vdGVyIiwiRklMVEVSX0FMTCIsIkZJTFRFUl9BQ1RJVkUiLCJGSUxURVJfQ09NUExFVEVEIiwiQ0xFQVJfQ09NUExFVEVEIiwiRmlsdGVyT3B0aW9uc1RhYnMiLCJzZXRBdHRyaWJ1dGUiLCJGaWx0ZXIiLCJzZXRGaWx0ZXIiLCJpbml0aWFsVmFsdWUiLCJKU09OIiwic3RyaW5naWZ5IiwiVG9EbyIsIlByb3ZpZGVyIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsIlJlbmRlcmVyIiwidG9kbyIsImxpQ2xhc3MiLCJ0b2dnbGUiLCJkZWxldGVUb2RvIiwibmV3VG9kbyIsImVkaXQiLCJlZGl0VG9EbyIsImNsZWFyQ29tcGxldGVkIiwiU3RvcmUiLCJEaXNwYXRjaCIsIkFwcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtB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LFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLGtCQUFrQjtBQUNuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDhDQUE4QyxRQUFRO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxLQUEwQixvQkFBb0IsU0FBRTtBQUNsRDs7QUFFQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QixJQUZGLEVBR0UsK0NBQUMsZ0RBQUQsQ0FBUyxRQUFUO0FBQWtCLFdBQU8sRUFBQztBQUExQixJQUhGLEVBSUUsK0NBQUMsOENBQUQ7QUFBTyxXQUFPLEVBQUMsT0FBZjtBQUF1QixpQkFBYTtBQUFwQyxLQUNFLCtDQUFDLCtDQUFEO0FBQVEsV0FBTyxFQUFDO0FBQWhCLEtBQ0UsK0NBQUMsaURBQUQ7QUFBVSxVQUFNLE1BQWhCO0FBQWlCLFdBQU87QUFBeEIsSUFERixFQUVFLCtDQUFDLHNEQUFEO0FBQW1CLFdBQU87QUFBMUIsSUFGRixDQURGLEVBS0UsK0NBQUMsMERBQUQ7QUFBbUIsVUFBTTtBQUF6QixJQUxGLEVBTUUsK0NBQUMsb0RBQUQ7QUFBaUIsVUFBTTtBQUF2QixJQU5GLEVBT0UsK0NBQUMsZ0RBQUQsQ0FBUyxPQUFUO0FBQWlCLFVBQU07QUFBdkIsSUFQRixDQUpGLENBREY7QUFnQkQ7O0FBQUE7QUFFRDFILGdEQUFHLENBQUMsK0NBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZnVuY3Rpb24gZ2V0RnVuY05hbWUoZnVuYykge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuICB2YXIgcmVzdWx0ID0gL15mdW5jdGlvblxccysoW1xcd1xcJF0rKVxccypcXCgvLmV4ZWMoZnVuYy50b1N0cmluZygpKTtcblxuICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0WzFdIDogJ3Vua25vd24nO1xufTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdE1MIGVsZW1lbnQgZXhwZWN0cyBhIGZ1bmN0aW9uLiBcIicgKyBmdW5jICsgJ1wiIGdpdmVuIGluc3RlYWQuJyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIF9fdXNlZDogMCxcbiAgICBfX3J1bm5pbmc6IGZhbHNlLFxuICAgIGlkOiBudWxsLFxuICAgIHByb3BzOiBwcm9wcyxcbiAgICBuYW1lOiBnZXRGdW5jTmFtZShmdW5jKSxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZShpZCkge1xuICAgICAgdmFyIHVzZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG5cbiAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgIHRoaXMuX191c2VkID0gdXNlZDtcbiAgICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgfSxcbiAgICBtZXJnZVByb3BzOiBmdW5jdGlvbiBtZXJnZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICB0aGlzLnByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIH0sXG4gICAgdXNlZDogZnVuY3Rpb24gdXNlZCgpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fdXNlZDtcbiAgICB9LFxuICAgIGlzUnVubmluZzogZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIHRoaXMuX19ydW5uaW5nO1xuICAgIH0sXG4gICAgZW50ZXI6IGZ1bmN0aW9uIGVudGVyKCkge1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSB0cnVlO1xuICAgIH0sXG4gICAgY29uc3VtZTogZnVuY3Rpb24gY29uc3VtZSgpIHtcbiAgICAgIHJldHVybiBmdW5jKHRoaXMucHJvcHMpO1xuICAgIH0sXG4gICAgb3V0OiBmdW5jdGlvbiBvdXQoKSB7XG4gICAgICB0aGlzLl9fdXNlZCArPSAxO1xuICAgICAgdGhpcy5fX3J1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVFbGVtZW50OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVByb2Nlc3NvcjtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfVHJlZSA9IHJlcXVpcmUoJy4vVHJlZScpO1xuXG52YXIgX1RyZWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVHJlZSk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlRWZmZWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFZmZlY3QnKTtcblxudmFyIF91c2VFZmZlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWZmZWN0KTtcblxudmFyIF9RdWV1ZSA9IHJlcXVpcmUoJy4vUXVldWUnKTtcblxudmFyIF9RdWV1ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9RdWV1ZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBjb25zaXN0ZW50LXJldHVybiAqL1xudmFyIENISUxEUkVOID0gJ19fQUNUTUxfQ0hJTERSRU5fXyc7XG5cbnZhciBDT05TVU1FID0gJ0NPTlNVTUUnO1xudmFyIFBST0NFU1NfUkVTVUxUID0gJ1BST0NFU1NfUkVTVUxUJztcbnZhciBSRVRVUk5FRF9FTEVNRU5UID0gJ1JFVFVSTkVEX0VMRU1FTlQnO1xudmFyIENISUxEID0gJ0NISUxEJztcblxudmFyIGlzR2VuZXJhdG9yID0gZnVuY3Rpb24gaXNHZW5lcmF0b3Iob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsnbmV4dCddID09PSAnZnVuY3Rpb24nO1xufTtcbnZhciBpc1Byb21pc2UgPSBmdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIG9ialsndGhlbiddID09PSAnZnVuY3Rpb24nO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hpbGRyZW5GdW5jKG5vZGUsIHByb2Nlc3NOb2RlKSB7XG4gIHZhciBmID0gZnVuY3Rpb24gZigpIHtcbiAgICB2YXIgX2FyZ3VtZW50cyA9IGFyZ3VtZW50cztcbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmVsZW1lbnQuY2hpbGRyZW47XG5cblxuICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICB2YXIgcXVldWVJdGVtc1RvQWRkID0gW107XG4gICAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgICAgdmFyIGNoaWxkcmVuUXVldWUgPSAoMCwgX1F1ZXVlMi5kZWZhdWx0KSgnICAnICsgbm9kZS5lbGVtZW50Lm5hbWUgKyAnOmNoaWxkcmVuJyk7XG5cbiAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKGkpIHtcbiAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGNoaWxkcmVuW2ldKSkge1xuICAgICAgICAgIHZhciBfY2hpbGRyZW4kaTtcblxuICAgICAgICAgIChfY2hpbGRyZW4kaSA9IGNoaWxkcmVuW2ldKS5tZXJnZVByb3BzLmFwcGx5KF9jaGlsZHJlbiRpLCBfYXJndW1lbnRzKTtcbiAgICAgICAgICBxdWV1ZUl0ZW1zVG9BZGQucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoY2hpbGRyZW5baV0pKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2hpbGRyZW5baV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YXIgZnVuY1Jlc3VsdCA9IGNoaWxkcmVuW2ldLmFwcGx5KGNoaWxkcmVuLCBfYXJndW1lbnRzKTtcblxuICAgICAgICAgIGlmICgoMCwgX2lzQWN0TUxFbGVtZW50Mi5kZWZhdWx0KShmdW5jUmVzdWx0KSkge1xuICAgICAgICAgICAgcXVldWVJdGVtc1RvQWRkLnB1c2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzc05vZGUobm9kZS5hZGRDaGlsZE5vZGUoZnVuY1Jlc3VsdCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChmdW5jUmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBfbG9vcChpKTtcbiAgICAgIH1cbiAgICAgIHF1ZXVlSXRlbXNUb0FkZC5yZXZlcnNlKCkuZm9yRWFjaChmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICBjaGlsZHJlblF1ZXVlLnByZXBlbmRJdGVtKENISUxELCBmdW5jLCBmdW5jdGlvbiAocikge1xuICAgICAgICAgIHJldHVybiByZXN1bHRzLnB1c2gocik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBjaGlsZHJlblF1ZXVlLnByb2Nlc3MoKTtcbiAgICAgIHJldHVybiBjaGlsZHJlblF1ZXVlLm9uRG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGZbQ0hJTERSRU5dID0gdHJ1ZTtcbiAgcmV0dXJuIGY7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2Nlc3NvcigpIHtcbiAgdmFyIHRyZWUgPSAoMCwgX1RyZWUyLmRlZmF1bHQpKCk7XG4gIHZhciBjdXJyZW50Tm9kZSA9IG51bGw7XG5cbiAgdmFyIHByb2Nlc3NOb2RlID0gZnVuY3Rpb24gcHJvY2Vzc05vZGUobm9kZSkge1xuICAgIGN1cnJlbnROb2RlID0gbm9kZTtcbiAgICBub2RlLmVudGVyKCk7XG4gICAgbm9kZS5yZXJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzTm9kZShub2RlKTtcbiAgICB9O1xuICAgIG5vZGUuZWxlbWVudC5tZXJnZVByb3BzKHtcbiAgICAgIGNoaWxkcmVuOiBjcmVhdGVDaGlsZHJlbkZ1bmMobm9kZSwgcHJvY2Vzc05vZGUpXG4gICAgfSk7XG5cbiAgICB2YXIgcmVzdWx0cyA9IHt9O1xuICAgIHZhciBxdWV1ZSA9ICgwLCBfUXVldWUyLmRlZmF1bHQpKCcgJyArIG5vZGUuZWxlbWVudC5uYW1lKTtcblxuICAgIC8vIENPTlNVTUVcbiAgICBxdWV1ZS5hZGQoQ09OU1VNRSwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5vZGUuZWxlbWVudC5jb25zdW1lKCk7XG4gICAgfSwgZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdHNbQ09OU1VNRV0gPSByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvLyBQUk9DRVNTX1JFU1VMVFxuICAgIHF1ZXVlLmFkZChQUk9DRVNTX1JFU1VMVCwgZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGNvbnN1bXB0aW9uID0gcmVzdWx0c1tDT05TVU1FXTtcblxuICAgICAgLy8gQWN0TUwgZWxlbWVudFxuICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGNvbnN1bXB0aW9uKSkge1xuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKG5vZGUuYWRkQ2hpbGROb2RlKGNvbnN1bXB0aW9uKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gZ2VuZXJhdG9yXG4gICAgICB9IGVsc2UgaWYgKGlzR2VuZXJhdG9yKGNvbnN1bXB0aW9uKSkge1xuICAgICAgICB2YXIgZ2VuZXJhdG9yID0gY29uc3VtcHRpb247XG5cbiAgICAgICAgcXVldWUucHJlcGVuZEl0ZW0oUkVUVVJORURfRUxFTUVOVCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoZ2VuZXJhdG9yRG9uZSkge1xuICAgICAgICAgICAgdmFyIGdlblJlc3VsdCA9IHZvaWQgMDtcblxuICAgICAgICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGUodmFsdWUpIHtcbiAgICAgICAgICAgICAgZ2VuUmVzdWx0ID0gZ2VuZXJhdG9yLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoIWdlblJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCgwLCBfaXNBY3RNTEVsZW1lbnQyLmRlZmF1bHQpKGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgIHZhciByZXMgPSBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShnZW5SZXN1bHQudmFsdWUpKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShyZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy50aGVuKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGUocik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZShyZXMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIF9yZXMgPSBwcm9jZXNzTm9kZShub2RlLmFkZENoaWxkTm9kZShnZW5SZXN1bHQudmFsdWUpKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGlzUHJvbWlzZShfcmVzKSkge1xuICAgICAgICAgICAgICAgICAgICBfcmVzLnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhdG9yRG9uZShyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0b3JEb25lKF9yZXMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBnZW5lcmF0b3JEb25lKGdlblJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdHNbUkVUVVJORURfRUxFTUVOVF0gPSByZXN1bHQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoaWxkcmVuXG4gICAgICB9IGVsc2UgaWYgKGNvbnN1bXB0aW9uICYmIGNvbnN1bXB0aW9uW0NISUxEUkVOXSkge1xuICAgICAgICBxdWV1ZS5wcmVwZW5kSXRlbShSRVRVUk5FRF9FTEVNRU5ULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bXB0aW9uKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHRzW1JFVFVSTkVEX0VMRU1FTlRdID0gcmVzdWx0ICYmIHJlc3VsdC5sZW5ndGggPT09IDEgPyByZXN1bHRbMF0gOiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gUnVubmluZyB0aGUgcXVldWVcbiAgICBxdWV1ZS5wcm9jZXNzKCk7XG5cbiAgICAvLyBHZXR0aW5nIHRoZSByZXN1bHQuIEl0IGlzIGVpdGhlciBhIHByb21pc2UgaWYgdGhlcmUgaXNcbiAgICAvLyBzb21ldGhpbmcgYXN5bmNocm9ub3VzIG9yIGEgdmFsdWVcbiAgICByZXR1cm4gcXVldWUub25Eb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgIG5vZGUub3V0KCk7XG4gICAgICByZXR1cm4gUkVUVVJORURfRUxFTUVOVCBpbiByZXN1bHRzID8gcmVzdWx0c1tSRVRVUk5FRF9FTEVNRU5UXSA6IHJlc3VsdHNbQ09OU1VNRV07XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBub2RlOiBmdW5jdGlvbiBub2RlKCkge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH0sXG4gICAgcnVuOiBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgICAgdmFyIHJvb3ROb2RlID0gdHJlZS5yZXNvbHZlUm9vdChlbGVtZW50KTtcblxuICAgICAgcmV0dXJuIHByb2Nlc3NOb2RlKHJvb3ROb2RlKTtcbiAgICB9LFxuICAgIG9uTm9kZUVudGVyOiBmdW5jdGlvbiBvbk5vZGVFbnRlcihjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlRW50ZXJDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfSxcbiAgICBvbk5vZGVPdXQ6IGZ1bmN0aW9uIG9uTm9kZU91dChjYWxsYmFjaykge1xuICAgICAgdHJlZS5hZGROb2RlT3V0Q2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH0sXG4gICAgb25Ob2RlUmVtb3ZlOiBmdW5jdGlvbiBvbk5vZGVSZW1vdmUoY2FsbGJhY2spIHtcbiAgICAgIHRyZWUub25Ob2RlUmVtb3ZlKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIHN5c3RlbTogZnVuY3Rpb24gc3lzdGVtKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJlZTogdHJlZSxcbiAgICAgICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgIGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgICAgICB0cmVlLnJlc2V0KCk7XG4gICAgICAgICAgX3VzZVB1YlN1YjIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICAgIF91c2VTdGF0ZTIuZGVmYXVsdC5jbGVhcigpO1xuICAgICAgICAgIF91c2VFZmZlY3QyLmRlZmF1bHQuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVF1ZXVlO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xudmFyIExPR1MgPSBmYWxzZTtcbnZhciBsb2cgPSBmdW5jdGlvbiBsb2coKSB7XG4gIHZhciBfY29uc29sZTtcblxuICByZXR1cm4gTE9HUyA/IChfY29uc29sZSA9IGNvbnNvbGUpLmxvZy5hcHBseShfY29uc29sZSwgYXJndW1lbnRzKSA6IG51bGw7XG59O1xudmFyIGlzUHJvbWlzZSA9IGZ1bmN0aW9uIGlzUHJvbWlzZShvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqWyd0aGVuJ10gPT09ICdmdW5jdGlvbic7XG59O1xudmFyIGNyZWF0ZUl0ZW0gPSBmdW5jdGlvbiBjcmVhdGVJdGVtKHR5cGUsIGZ1bmMpIHtcbiAgdmFyIG9uRG9uZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZnVuY3Rpb24gKCkge307XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBmdW5jOiBmdW5jLFxuICAgIG9uRG9uZTogb25Eb25lXG4gIH07XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVRdWV1ZShjb250ZXh0KSB7XG4gIHZhciBpdGVtcyA9IFtdO1xuICB2YXIgYXN5bmMgPSBmYWxzZTtcbiAgdmFyIHJ1bm5pbmcgPSBmYWxzZTtcbiAgdmFyIHJlbGVhc2UgPSBmdW5jdGlvbiByZWxlYXNlKCkge307XG5cbiAgcmV0dXJuIHtcbiAgICBhZGQ6IGZ1bmN0aW9uIGFkZCh0eXBlLCBmdW5jLCBvbkRvbmUpIHtcbiAgICAgIGxvZyhjb250ZXh0ICsgJzpROiBbLi4uJyArIHR5cGUgKyAnXSAoJyArIChpdGVtcy5sZW5ndGggKyAxKSArICcgdG90YWwpJyk7XG4gICAgICBpdGVtcy5wdXNoKGNyZWF0ZUl0ZW0odHlwZSwgZnVuYywgb25Eb25lKSk7XG4gICAgfSxcbiAgICBwcmVwZW5kSXRlbTogZnVuY3Rpb24gcHJlcGVuZEl0ZW0odHlwZSwgZnVuYywgb25Eb25lKSB7XG4gICAgICBsb2coY29udGV4dCArICc6UTogWycgKyB0eXBlICsgJy4uLl0gKCcgKyAoaXRlbXMubGVuZ3RoICsgMSkgKyAnIHRvdGFsKScpO1xuICAgICAgaXRlbXMgPSBbY3JlYXRlSXRlbSh0eXBlLCBmdW5jLCBvbkRvbmUpXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGl0ZW1zKSk7XG4gICAgfSxcbiAgICBwcm9jZXNzOiBmdW5jdGlvbiBwcm9jZXNzKGxhc3RSZXN1bHQpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBsb2coY29udGV4dCArICc6UTpkb25lJyk7XG4gICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgcmVsZWFzZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVtID0gaXRlbXMuc2hpZnQoKTtcblxuICAgICAgbG9nKGNvbnRleHQgKyAnOlE6ICcgKyBpdGVtLnR5cGUgKyAnKCkgKCcgKyBpdGVtcy5sZW5ndGggKyAnIGxlZnQpJyk7XG4gICAgICB2YXIgcmVzdWx0ID0gaXRlbS5mdW5jKGxhc3RSZXN1bHQpO1xuXG4gICAgICBpZiAoaXNQcm9taXNlKHJlc3VsdCkpIHtcbiAgICAgICAgYXN5bmMgPSB0cnVlO1xuICAgICAgICByZXN1bHQudGhlbihmdW5jdGlvbiAoYXN5bmNSZXN1bHQpIHtcbiAgICAgICAgICBpdGVtLm9uRG9uZShhc3luY1Jlc3VsdCk7XG4gICAgICAgICAgX3RoaXMucHJvY2Vzcyhhc3luY1Jlc3VsdCk7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIHJlbGVhc2UoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGl0ZW0ub25Eb25lKHJlc3VsdCk7XG4gICAgICAgIHRoaXMucHJvY2VzcyhyZXN1bHQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgb25Eb25lOiBmdW5jdGlvbiBvbkRvbmUoZ2V0UmVzdWx0KSB7XG4gICAgICBpZiAoYXN5bmMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChkb25lLCByZWplY3QpIHtcbiAgICAgICAgICByZWxlYXNlID0gZnVuY3Rpb24gcmVsZWFzZShlcnJvcikge1xuICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkb25lKGdldFJlc3VsdCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRSZXN1bHQoKTtcbiAgICB9LFxuICAgIGlzUnVubmluZzogZnVuY3Rpb24gaXNSdW5uaW5nKCkge1xuICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgfVxuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBUcmVlO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIG5vLXJldHVybi1hc3NpZ24sIG1heC1sZW4gKi9cbnZhciBMT0dTID0gZmFsc2U7XG52YXIgbG9nID0gZnVuY3Rpb24gbG9nKCkge1xuICB2YXIgX2NvbnNvbGU7XG5cbiAgcmV0dXJuIExPR1MgPyAoX2NvbnNvbGUgPSBjb25zb2xlKS5sb2cuYXBwbHkoX2NvbnNvbGUsIGFyZ3VtZW50cykgOiBudWxsO1xufTtcblxuZnVuY3Rpb24gVHJlZSgpIHtcbiAgdmFyIG9uTm9kZUVudGVyID0gW107XG4gIHZhciBvbk5vZGVPdXQgPSBbXTtcbiAgdmFyIF9vbk5vZGVSZW1vdmUgPSBbXTtcbiAgdmFyIHJvb3QgPSBjcmVhdGVOZXdOb2RlKCk7XG4gIHZhciBpZHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGdldElkKCkge1xuICAgIHJldHVybiAnYScgKyArK2lkcztcbiAgfTtcbiAgZnVuY3Rpb24gdXNlU2FtZU5vZGUobm9kZSwgbmV3RWxlbWVudCkge1xuICAgIG5ld0VsZW1lbnQuaW5pdGlhbGl6ZShub2RlLmVsZW1lbnQuaWQsIG5vZGUuZWxlbWVudC51c2VkKCkpO1xuICAgIG5vZGUuZWxlbWVudCA9IG5ld0VsZW1lbnQ7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbiAgZnVuY3Rpb24gdHJlZURpZmYob2xkRWxlbWVudCwgbmV3RWxlbWVudCkge1xuICAgIGlmIChvbGRFbGVtZW50ICYmIG9sZEVsZW1lbnQubmFtZSA9PT0gbmV3RWxlbWVudC5uYW1lKSB7XG4gICAgICBpZiAob2xkRWxlbWVudC5wcm9wcyAmJiBuZXdFbGVtZW50LnByb3BzKSB7XG4gICAgICAgIHJldHVybiBvbGRFbGVtZW50LnByb3BzLmtleSA9PT0gbmV3RWxlbWVudC5wcm9wcy5rZXk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld05vZGUoZWxlbWVudCwgcGFyZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnQuaW5pdGlhbGl6ZShnZXRJZCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgIGN1cnNvcjogMCxcbiAgICAgIGVudGVyOiBmdW5jdGlvbiBlbnRlcigpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBsb2coJy0+ICcgKyB0aGlzLmVsZW1lbnQubmFtZSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5lbnRlcigpO1xuICAgICAgICBvbk5vZGVFbnRlci5mb3JFYWNoKGZ1bmN0aW9uIChjKSB7XG4gICAgICAgICAgcmV0dXJuIGMoX3RoaXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBvdXQ6IGZ1bmN0aW9uIG91dCgpIHtcbiAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgbG9nKCc8LSAnICsgdGhpcy5lbGVtZW50Lm5hbWUpO1xuICAgICAgICB0aGlzLmVsZW1lbnQub3V0KCk7XG4gICAgICAgIC8vIElmIHRoZXJlJ3JlIG1vcmUgbm9kZXMgaW4gdGhlIHRyZWUgdGhhbiB3aGF0IHdhcyBwcm9jZXNzZWRcbiAgICAgICAgaWYgKHRoaXMuY3Vyc29yIDwgdGhpcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSh0aGlzLmN1cnNvciwgdGhpcy5jaGlsZHJlbi5sZW5ndGggLSB0aGlzLmN1cnNvcikuZm9yRWFjaChmdW5jdGlvbiAocmVtb3ZlZE5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiBfb25Ob2RlUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGMocmVtb3ZlZE5vZGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJzb3IgPSAwO1xuICAgICAgICBvbk5vZGVPdXQuZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgICAgIHJldHVybiBjKF90aGlzMik7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGFkZENoaWxkTm9kZTogZnVuY3Rpb24gYWRkQ2hpbGROb2RlKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGNoaWxkTm9kZSA9IHRoaXMuY2hpbGRyZW5bdGhpcy5jdXJzb3JdO1xuXG4gICAgICAgIC8vIHVzaW5nIHRoZSBzYW1lIG5vZGVcbiAgICAgICAgaWYgKGNoaWxkTm9kZSAmJiB0cmVlRGlmZihjaGlsZE5vZGUuZWxlbWVudCwgbmV3RWxlbWVudCkpIHtcbiAgICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICAgIHJldHVybiB1c2VTYW1lTm9kZShjaGlsZE5vZGUsIG5ld0VsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRpbmcgYSBuZXcgbm9kZVxuICAgICAgICB2YXIgbmV3Q2hpbGROb2RlID0gY3JlYXRlTmV3Tm9kZShuZXdFbGVtZW50LCB0aGlzKTtcblxuICAgICAgICBpZiAodGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl0pIHtcbiAgICAgICAgICBfb25Ob2RlUmVtb3ZlLmZvckVhY2goZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgIHJldHVybiBjKF90aGlzMy5jaGlsZHJlbltfdGhpczMuY3Vyc29yXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl0gPSBuZXdDaGlsZE5vZGU7XG4gICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgIHJldHVybiBuZXdDaGlsZE5vZGU7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZVJvb3Q6IGZ1bmN0aW9uIHJlc29sdmVSb290KGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiByb290ID0gdHJlZURpZmYocm9vdC5lbGVtZW50LCBlbGVtZW50KSA/IHVzZVNhbWVOb2RlKHJvb3QsIGVsZW1lbnQpIDogY3JlYXRlTmV3Tm9kZShlbGVtZW50KTtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIHJvb3QgPSBjcmVhdGVOZXdOb2RlKCk7XG4gICAgICBpZHMgPSAwO1xuICAgIH0sXG4gICAgZ2V0TnVtT2ZFbGVtZW50czogZnVuY3Rpb24gZ2V0TnVtT2ZFbGVtZW50cygpIHtcbiAgICAgIHJldHVybiBpZHM7XG4gICAgfSxcbiAgICBkaWFnbm9zZTogZnVuY3Rpb24gZGlhZ25vc2UoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gbG9vcE92ZXIobm9kZSkge1xuICAgICAgICB2YXIgaW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kOiBpbmQsXG4gICAgICAgICAgbmFtZTogbm9kZS5lbGVtZW50Lm5hbWUsXG4gICAgICAgICAgdXNlZDogbm9kZS5lbGVtZW50LnVzZWQoKSxcbiAgICAgICAgICBpZDogbm9kZS5lbGVtZW50LmlkLFxuICAgICAgICAgIGNoaWxkcmVuOiBub2RlLmNoaWxkcmVuLm1hcChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb29wT3ZlcihjaGlsZCwgaW5kICsgMSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgIH0ocm9vdCk7XG4gICAgfSxcbiAgICBhZGROb2RlRW50ZXJDYWxsYmFjazogZnVuY3Rpb24gYWRkTm9kZUVudGVyQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIG9uTm9kZUVudGVyLnB1c2goY2FsbGJhY2spO1xuICAgIH0sXG4gICAgYWRkTm9kZU91dENhbGxiYWNrOiBmdW5jdGlvbiBhZGROb2RlT3V0Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIG9uTm9kZU91dC5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIG9uTm9kZVJlbW92ZTogZnVuY3Rpb24gb25Ob2RlUmVtb3ZlKGNhbGxiYWNrKSB7XG4gICAgICBfb25Ob2RlUmVtb3ZlLnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2Zhc3REZWVwRXF1YWwgPSByZXF1aXJlKCdmYXN0LWRlZXAtZXF1YWwnKTtcblxudmFyIF9mYXN0RGVlcEVxdWFsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zhc3REZWVwRXF1YWwpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbnZhciBTdG9yYWdlID0ge1xuICBlbGVtZW50czoge30sXG4gIGdldDogZnVuY3Rpb24gZ2V0KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdID0geyBlZmZlY3RzOiBbXSwgY29uc3VtZXI6IDAgfTtcbiAgfSxcbiAgY2xlYW5VcDogZnVuY3Rpb24gY2xlYW5VcChpZCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2lkXSkge1xuICAgICAgZGVsZXRlIHRoaXMuZWxlbWVudHNbaWRdO1xuICAgIH1cbiAgfVxufTtcblxudmFyIGNyZWF0ZUVmZmVjdCA9IGZ1bmN0aW9uIGNyZWF0ZUVmZmVjdChjYWxsYmFjaywgZGVwcykge1xuICByZXR1cm4ge1xuICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICBkZXBzOiBkZXBzXG4gIH07XG59O1xudmFyIHVwZGF0ZUVmZmVjdCA9IGZ1bmN0aW9uIHVwZGF0ZUVmZmVjdChlZmZlY3QsIGNhbGxiYWNrLCBkZXBzKSB7XG4gIGVmZmVjdC5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICBlZmZlY3Qub2xkRGVwcyA9IGVmZmVjdC5kZXBzO1xuICBlZmZlY3QuZGVwcyA9IGRlcHM7XG4gIHJldHVybiBlZmZlY3Q7XG59O1xuXG5mdW5jdGlvbiBkZXBzRXF1YWwob2xkRGVwcywgbmV3RGVwcykge1xuICBpZiAoIW9sZERlcHMpIHJldHVybiBmYWxzZTtcbiAgaWYgKG9sZERlcHMubGVuZ3RoICE9PSBuZXdEZXBzLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gKDAsIF9mYXN0RGVlcEVxdWFsMi5kZWZhdWx0KShvbGREZXBzLCBuZXdEZXBzKTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVFZmZlY3Qobm9kZSwgZWZmZWN0KSB7XG4gIHZhciBkZXBzID0gZWZmZWN0LmRlcHMsXG4gICAgICBvbGREZXBzID0gZWZmZWN0Lm9sZERlcHMsXG4gICAgICBjYWxsYmFjayA9IGVmZmVjdC5jYWxsYmFjaztcblxuXG4gIGlmICh0eXBlb2YgZGVwcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gIH0gZWxzZSBpZiAoZGVwcy5sZW5ndGggPT09IDApIHtcbiAgICBpZiAobm9kZS5lbGVtZW50LnVzZWQoKSA9PT0gMSkge1xuICAgICAgZWZmZWN0LmNsZWFuVXAgPSBjYWxsYmFjaygpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYXJlRXF1YWwgPSBkZXBzRXF1YWwob2xkRGVwcywgZGVwcyk7XG5cbiAgICBpZiAoIWFyZUVxdWFsKSB7XG4gICAgICBlZmZlY3QuY2xlYW5VcCA9IGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59XG5cbnZhciBjcmVhdGVVc2VFZmZlY3RIb29rID0gZnVuY3Rpb24gY3JlYXRlVXNlRWZmZWN0SG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBlbGVtZW50ID0gbm9kZS5lbGVtZW50O1xuXG4gICAgdmFyIHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICAgIHN0b3JhZ2UuZWZmZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChlZmZlY3QpIHtcbiAgICAgIGlmIChlZmZlY3QuY2xlYW5VcCkgZWZmZWN0LmNsZWFuVXAoKTtcbiAgICB9KTtcbiAgICBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHByb2Nlc3Nvci5vbk5vZGVPdXQoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICBpZiAoc3RvcmFnZS5lZmZlY3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHN0b3JhZ2UuZWZmZWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChlZmZlY3QpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVFZmZlY3Qobm9kZSwgZWZmZWN0KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIGRlcHMpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcblxuICAgIHZhciBzdG9yYWdlID0gU3RvcmFnZS5nZXQoZWxlbWVudCk7XG5cbiAgICAvLyBmaXJzdCBydW5cbiAgICBpZiAoZWxlbWVudC51c2VkKCkgPT09IDApIHtcbiAgICAgIHN0b3JhZ2UuZWZmZWN0cy5wdXNoKGNyZWF0ZUVmZmVjdChjYWxsYmFjaywgZGVwcykpO1xuXG4gICAgICAvLyBvdGhlciBydW5zXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpbmRleCA9IHN0b3JhZ2UuY29uc3VtZXI7XG5cbiAgICAgIHN0b3JhZ2UuY29uc3VtZXIgPSBpbmRleCA8IHN0b3JhZ2UuZWZmZWN0cy5sZW5ndGggLSAxID8gc3RvcmFnZS5jb25zdW1lciArIDEgOiAwO1xuICAgICAgdXBkYXRlRWZmZWN0KHN0b3JhZ2UuZWZmZWN0c1tpbmRleF0sIGNhbGxiYWNrLCBkZXBzKTtcbiAgICB9XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VFZmZlY3RIb29rO1xuXG5cbmNyZWF0ZVVzZUVmZmVjdEhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIFN0b3JhZ2UuZWxlbWVudHMgPSB7fTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBjcmVhdGVVc2VFbGVtZW50SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRIb29rKHByb2Nlc3Nvcikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICgwLCBfaXNWYWxpZEhvb2tDb250ZXh0Mi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuXG4gICAgcmV0dXJuIHByb2Nlc3Nvci5ub2RlKCkuZWxlbWVudDtcbiAgfTtcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGNyZWF0ZVVzZUVsZW1lbnRIb29rOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQgPSByZXF1aXJlKCcuL3V0aWxzL2lzVmFsaWRIb29rQ29udGV4dCcpO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1ZhbGlkSG9va0NvbnRleHQpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7IGlmIChrZXkgaW4gb2JqKSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgeyB2YWx1ZTogdmFsdWUsIGVudW1lcmFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7IH0gZWxzZSB7IG9ialtrZXldID0gdmFsdWU7IH0gcmV0dXJuIG9iajsgfSAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5cblxudmFyIGJyaWRnZU1ldGhvZE5hbWUgPSBmdW5jdGlvbiBicmlkZ2VNZXRob2ROYW1lKGtleXdvcmQpIHtcbiAgcmV0dXJuICdfX3JlcXVlc3RfXycgKyBrZXl3b3JkO1xufTtcblxudmFyIHJlc29sdmVQcm9kdWN0ID0gZnVuY3Rpb24gcmVzb2x2ZVByb2R1Y3QoYnJpZGdlTWV0aG9kLCBub2RlLCBnZXRFcnJvcikge1xuICBpZiAoIW5vZGUpIHtcbiAgICB0aHJvdyBnZXRFcnJvcigpO1xuICB9XG4gIHZhciBzb3VyY2UgPSB2b2lkIDA7XG5cbiAgaWYgKG5vZGVbYnJpZGdlTWV0aG9kXSkge1xuICAgIHNvdXJjZSA9IG5vZGU7XG4gIH0gZWxzZSB7XG4gICAgc291cmNlID0gbm9kZS5jaGlsZHJlbi5maW5kKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgcmV0dXJuICEhY2hpbGRbYnJpZGdlTWV0aG9kXTtcbiAgICB9KTtcbiAgfVxuICB2YXIgcHJvZHVjdCA9IHNvdXJjZSA/IHNvdXJjZVticmlkZ2VNZXRob2RdKCkgOiBudWxsO1xuXG4gIGlmIChwcm9kdWN0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHByb2R1Y3QudmFsdWU7XG4gIH1cbiAgcmV0dXJuIHJlc29sdmVQcm9kdWN0KGJyaWRnZU1ldGhvZCwgbm9kZS5wYXJlbnQsIGdldEVycm9yKTtcbn07XG5cbnZhciBnZXROb3RGb3VuZEVycm9yID0gZnVuY3Rpb24gZ2V0Tm90Rm91bmRFcnJvcihrZXl3b3JkLCBub2RlKSB7XG4gIHZhciBnZXRTdGFjayA9IGZ1bmN0aW9uIGdldFN0YWNrKG5vZGUpIHtcbiAgICB2YXIgc3RhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IFtdO1xuXG4gICAgc3RhY2sucHVzaChub2RlLmVsZW1lbnQubmFtZSk7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICByZXR1cm4gZ2V0U3RhY2sobm9kZS5wYXJlbnQsIHN0YWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xuXG4gIHJldHVybiBuZXcgRXJyb3IoJ1wiJyArIGtleXdvcmQgKyAnXCIgcHJvcCByZXF1ZXN0ZWQgYnkgXCInICsgbm9kZS5lbGVtZW50Lm5hbWUgKyAnXCIgY2FuIG5vdCBiZSBmb3VuZC5cXG5cXG5TdGFjazpcXG4nICsgZ2V0U3RhY2sobm9kZSkucmV2ZXJzZSgpLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgIHJldHVybiAnICA8JyArIG5hbWUgKyAnPic7XG4gIH0pLmpvaW4oJ1xcbicpKTtcbn07XG5cbnZhciBjcmVhdGVVc2VQcm9kdWN0SG9vayA9IGZ1bmN0aW9uIGNyZWF0ZVVzZVByb2R1Y3RIb29rKHByb2Nlc3Nvcikge1xuICBwcm9jZXNzb3Iub25Ob2RlRW50ZXIoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgcHJvcHMgPSBlbGVtZW50LnByb3BzO1xuXG4gICAgdmFyIHByb3BOYW1lcyA9IHByb3BzID8gT2JqZWN0LmtleXMocHJvcHMpIDogW107XG5cbiAgICBwcm9wTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAocHJvcE5hbWUpIHtcbiAgICAgIGlmIChwcm9wTmFtZS5jaGFyQXQoMCkgPT09ICckJykge1xuICAgICAgICB2YXIga2V5d29yZCA9IHByb3BOYW1lLnN1YnN0cigxLCBwcm9wTmFtZS5sZW5ndGgpO1xuICAgICAgICB2YXIgcHJvZHVjdFZhbHVlID0gcmVzb2x2ZVByb2R1Y3QoYnJpZGdlTWV0aG9kTmFtZShrZXl3b3JkKSwgbm9kZS5wYXJlbnQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0Tm90Rm91bmRFcnJvcihrZXl3b3JkLCBub2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZWxlbWVudC5tZXJnZVByb3BzKF9kZWZpbmVQcm9wZXJ0eSh7fSwga2V5d29yZCwgcHJvZHVjdFZhbHVlKSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSAnZXhwb3J0cycpIHtcbiAgICAgICAgbm9kZVticmlkZ2VNZXRob2ROYW1lKHByb3BzW3Byb3BOYW1lXSldID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBub2RlLl9fcHJvZHVjdCB9O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gICAgdmFyIG5vZGUgPSBwcm9jZXNzb3Iubm9kZSgpO1xuXG4gICAgbm9kZS5fX3Byb2R1Y3QgPSB2YWx1ZTtcbiAgICByZXR1cm4gW2Z1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgcmV0dXJuIG5vZGUuX19wcm9kdWN0ID0gbmV3VmFsdWU7XG4gICAgfV07XG4gIH07XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VQcm9kdWN0SG9vazsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VQdWJTdWJIb29rO1xuXG52YXIgX2lzVmFsaWRIb29rQ29udGV4dCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNWYWxpZEhvb2tDb250ZXh0Jyk7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzVmFsaWRIb29rQ29udGV4dCk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBzdWJzY3JpYmVycyA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVTdWJzY3JpYmVFbGVtZW50KHN1YnNjcmliZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgdHlwZSA9IF9yZWYudHlwZSxcbiAgICAgICAgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuXG4gICAgc3Vic2NyaWJlKHR5cGUsIGZ1bmN0aW9uIChwYXlsb2FkKSB7XG4gICAgICByZXR1cm4gY2hpbGRyZW4oeyBwYXlsb2FkOiBwYXlsb2FkIH0pO1xuICAgIH0pO1xuICB9O1xufTtcbmZ1bmN0aW9uIGNyZWF0ZVB1Ymxpc2hFbGVtZW50KHB1Ymxpc2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmMikge1xuICAgIHZhciB0eXBlID0gX3JlZjIudHlwZSxcbiAgICAgICAgcGF5bG9hZCA9IF9yZWYyLnBheWxvYWQ7XG5cbiAgICBwdWJsaXNoKHR5cGUsIHBheWxvYWQpO1xuICB9O1xufVxuXG52YXIgc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKGVsZW1lbnQsIHR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHN1YnNjcmliZXJzW3R5cGVdID0ge307XG4gIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdID0gY2FsbGJhY2s7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW2VsZW1lbnQuaWRdO1xuICB9O1xufTtcbnZhciBwdWJsaXNoID0gZnVuY3Rpb24gcHVibGlzaCh0eXBlLCBwYXlsb2FkKSB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHJldHVybjtcbiAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnNbdHlwZV0pLmZvckVhY2goZnVuY3Rpb24gKGlkKSB7XG4gICAgc3Vic2NyaWJlcnNbdHlwZV1baWRdKHBheWxvYWQpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVB1YlN1Ykhvb2socHJvY2Vzc29yKSB7XG4gIHByb2Nlc3Nvci5vbk5vZGVSZW1vdmUoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBPYmplY3Qua2V5cyhzdWJzY3JpYmVycykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgaWYgKHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF0pIHtcbiAgICAgICAgZGVsZXRlIHN1YnNjcmliZXJzW3R5cGVdW25vZGUuZWxlbWVudC5pZF07XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKHNjb3BlZEVsZW1lbnQpIHtcbiAgICAoMCwgX2lzVmFsaWRIb29rQ29udGV4dDIuZGVmYXVsdCkocHJvY2Vzc29yKTtcblxuICAgIHZhciBub2RlID0gcHJvY2Vzc29yLm5vZGUoKTtcbiAgICB2YXIgZWwgPSBzY29wZWRFbGVtZW50IHx8IG5vZGUuZWxlbWVudDtcbiAgICB2YXIgc3Vic2NyaWJlRnVuYyA9IGZ1bmN0aW9uIHN1YnNjcmliZUZ1bmMoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgcGFyYW1zID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIHBhcmFtc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHN1YnNjcmliZS5hcHBseSh1bmRlZmluZWQsIFtlbF0uY29uY2F0KHBhcmFtcykpO1xuICAgIH07XG4gICAgdmFyIHB1Ymxpc2hGdW5jID0gZnVuY3Rpb24gcHVibGlzaEZ1bmMoKSB7XG4gICAgICByZXR1cm4gcHVibGlzaC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdWJzY3JpYmU6IHN1YnNjcmliZUZ1bmMsXG4gICAgICBwdWJsaXNoOiBwdWJsaXNoRnVuYyxcbiAgICAgIHN1YnNjcmliZXJzOiBzdWJzY3JpYmVycyxcbiAgICAgIFN1YnNjcmliZTogY3JlYXRlU3Vic2NyaWJlRWxlbWVudChzdWJzY3JpYmVGdW5jKSxcbiAgICAgIFB1Ymxpc2g6IGNyZWF0ZVB1Ymxpc2hFbGVtZW50KHB1Ymxpc2hGdW5jKVxuICAgIH07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVB1YlN1Ykhvb2suY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gIHN1YnNjcmliZXJzID0ge307XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VSZWR1Y2VySG9vaztcblxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKG9iaiwga2V5cykgeyB2YXIgdGFyZ2V0ID0ge307IGZvciAodmFyIGkgaW4gb2JqKSB7IGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7IGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlOyB0YXJnZXRbaV0gPSBvYmpbaV07IH0gcmV0dXJuIHRhcmdldDsgfVxuXG5mdW5jdGlvbiBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGFjdGlvbiA9IF9yZWYuYWN0aW9uLFxuICAgICAgICBwcm9wc1RvQWN0aW9uID0gX3JlZi5wcm9wc1RvQWN0aW9uLFxuICAgICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKF9yZWYsIFsnYWN0aW9uJywgJ3Byb3BzVG9BY3Rpb24nXSk7XG5cbiAgICBpZiAoYWN0aW9uKSB7XG4gICAgICBkaXNwYXRjaChhY3Rpb24pO1xuICAgIH0gZWxzZSBpZiAocHJvcHNUb0FjdGlvbikge1xuICAgICAgZGlzcGF0Y2gocHJvcHNUb0FjdGlvbihyZXN0KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignPERpc3BhdGNoPiBleHBlY3RzIFwiYWN0aW9uXCIgb3IgXCJwcm9wc1RvQWN0aW9uXCIgcHJvcC4nKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVzZVJlZHVjZXJIb29rKHVzZVN0YXRlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgaW5pdGlhbFN0YXRlKSB7XG4gICAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKGluaXRpYWxTdGF0ZSksXG4gICAgICAgIF91c2VTdGF0ZTIgPSBfc2xpY2VkVG9BcnJheShfdXNlU3RhdGUsIDIpLFxuICAgICAgICBzdGF0ZSA9IF91c2VTdGF0ZTJbMF0sXG4gICAgICAgIHNldFN0YXRlID0gX3VzZVN0YXRlMlsxXTtcblxuICAgIHZhciBkaXNwYXRjaCA9IGZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICAgICAgcmV0dXJuIHNldFN0YXRlKHJlZHVjZXIoc3RhdGUoKSwgYWN0aW9uKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBbc3RhdGUsIGRpc3BhdGNoLCBjcmVhdGVEaXNwYXRjaEVsZW1lbnQoZGlzcGF0Y2gpLCAvLyA8RGlzcGF0Y2g+XG4gICAgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHN0YXRlKCk7XG4gICAgfSAvLyA8R2V0U3RhdGU+XG4gICAgXTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBjcmVhdGVVc2VTdGF0ZUhvb2s7XG5cbnZhciBfaXNWYWxpZEhvb2tDb250ZXh0ID0gcmVxdWlyZSgnLi91dGlscy9pc1ZhbGlkSG9va0NvbnRleHQnKTtcblxudmFyIF9pc1ZhbGlkSG9va0NvbnRleHQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNWYWxpZEhvb2tDb250ZXh0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoZWxlbWVudCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0gPSB7IHN0YXRlczogW10sIGNvbnN1bWVyOiAwIH07XG4gIH0sXG4gIGNsZWFuVXA6IGZ1bmN0aW9uIGNsZWFuVXAoaWQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tpZF0pIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICB9XG4gIH1cbn07IC8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hc3NpZ24gKi9cbmZ1bmN0aW9uIGNyZWF0ZVVzZVN0YXRlSG9vayhwcm9jZXNzb3IpIHtcbiAgcHJvY2Vzc29yLm9uTm9kZVJlbW92ZShmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBTdG9yYWdlLmNsZWFuVXAobm9kZS5lbGVtZW50LmlkKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoaW5pdGlhbFN0YXRlKSB7XG4gICAgKDAsIF9pc1ZhbGlkSG9va0NvbnRleHQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgICB2YXIgbm9kZSA9IHByb2Nlc3Nvci5ub2RlKCk7XG4gICAgdmFyIGVsZW1lbnQgPSBub2RlLmVsZW1lbnQ7XG5cbiAgICB2YXIgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gICAgdmFyIGluZGV4ID0gdm9pZCAwO1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlcy5wdXNoKGluaXRpYWxTdGF0ZSk7XG4gICAgICBpbmRleCA9IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDE7XG5cbiAgICAgIC8vIG90aGVyIHJ1bnNcbiAgICB9IGVsc2Uge1xuICAgICAgaW5kZXggPSBzdG9yYWdlLmNvbnN1bWVyO1xuICAgICAgc3RvcmFnZS5jb25zdW1lciA9IGluZGV4IDwgc3RvcmFnZS5zdGF0ZXMubGVuZ3RoIC0gMSA/IHN0b3JhZ2UuY29uc3VtZXIgKyAxIDogMDtcbiAgICB9XG5cbiAgICByZXR1cm4gW2Z1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdG9yYWdlLnN0YXRlc1tpbmRleF07XG4gICAgfSwgZnVuY3Rpb24gKG5ld1N0YXRlKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlc1tpbmRleF0gPSBuZXdTdGF0ZTtcbiAgICAgIGlmICghZWxlbWVudC5pc1J1bm5pbmcoKSkge1xuICAgICAgICBub2RlLnJlcnVuKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGU7XG4gICAgfV07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVN0YXRlSG9vay5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1ZhbGlkSG9va0NvbnRleHQ7XG5mdW5jdGlvbiBpc1ZhbGlkSG9va0NvbnRleHQocHJvY2Vzc29yKSB7XG4gIGlmICghcHJvY2Vzc29yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTb21ldGhpbmcgdGVycmlibHkgd3JvbmcgaGFwcGVuZWQuIFRoZSBob29rIGZhY3RvcnkgZnVuY3Rpb24gaXMgY2FsbGVkIHdpdGhvdXQgYSBwcm9jZXNzb3IuJyk7XG4gIH1cbiAgaWYgKCFwcm9jZXNzb3Iubm9kZSgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdIb29rcyBtdXN0IGJlIGNhbGxlZCBpbiB0aGUgY29udGV4dCBvZiBhbiBBY3RNTCBlbGVtZW50LicpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY3JlYXRlUnVudGltZSA9IGNyZWF0ZVJ1bnRpbWU7XG5cbnZhciBfUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9Qcm9jZXNzb3InKTtcblxudmFyIF9Qcm9jZXNzb3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfUHJvY2Vzc29yKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudCA9IHJlcXVpcmUoJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnKTtcblxudmFyIF9pc0FjdE1MRWxlbWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0FjdE1MRWxlbWVudCk7XG5cbnZhciBfQWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vQWN0RWxlbWVudCcpO1xuXG52YXIgX0FjdEVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0RWxlbWVudCk7XG5cbnZhciBfdXNlRWxlbWVudCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlRWxlbWVudCcpO1xuXG52YXIgX3VzZUVsZW1lbnQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWxlbWVudCk7XG5cbnZhciBfdXNlUHJvZHVjdCA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUHJvZHVjdCcpO1xuXG52YXIgX3VzZVByb2R1Y3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHJvZHVjdCk7XG5cbnZhciBfdXNlUHViU3ViID0gcmVxdWlyZSgnLi9ob29rcy91c2VQdWJTdWInKTtcblxudmFyIF91c2VQdWJTdWIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUHViU3ViKTtcblxudmFyIF91c2VTdGF0ZSA9IHJlcXVpcmUoJy4vaG9va3MvdXNlU3RhdGUnKTtcblxudmFyIF91c2VTdGF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF91c2VTdGF0ZSk7XG5cbnZhciBfdXNlUmVkdWNlciA9IHJlcXVpcmUoJy4vaG9va3MvdXNlUmVkdWNlcicpO1xuXG52YXIgX3VzZVJlZHVjZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlUmVkdWNlcik7XG5cbnZhciBfdXNlRWZmZWN0ID0gcmVxdWlyZSgnLi9ob29rcy91c2VFZmZlY3QnKTtcblxudmFyIF91c2VFZmZlY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdXNlRWZmZWN0KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlUnVudGltZSgpIHtcbiAgdmFyIHByb2Nlc3NvciA9ICgwLCBfUHJvY2Vzc29yMi5kZWZhdWx0KSgpO1xuXG4gIGZ1bmN0aW9uIEEoZnVuYywgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgY2hpbGRyZW4gPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBjaGlsZHJlbltfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfQWN0RWxlbWVudDIuZGVmYXVsdCkoZnVuYywgcHJvcHMsIGNoaWxkcmVuKTtcbiAgfVxuICBmdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICAgIGlmICghKDAsIF9pc0FjdE1MRWxlbWVudDIuZGVmYXVsdCkoZWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0TUwgZWxlbWVudCBleHBlY3RlZC4gSW5zdGVhZCAnICsgZWxlbWVudC50b1N0cmluZygpICsgJyBwYXNzZWQuJyk7XG4gICAgfVxuICAgIHJldHVybiBwcm9jZXNzb3IucnVuKGVsZW1lbnQpO1xuICB9XG4gIHZhciBGcmFnbWVudCA9IGZ1bmN0aW9uIEZyYWdtZW50KF9yZWYpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBfcmVmLmNoaWxkcmVuO1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfTtcbiAgdmFyIHVzZUVsZW1lbnQgPSAoMCwgX3VzZUVsZW1lbnQyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VTdGF0ZSA9ICgwLCBfdXNlU3RhdGUyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG4gIHZhciB1c2VQcm9kdWN0ID0gKDAsIF91c2VQcm9kdWN0Mi5kZWZhdWx0KShwcm9jZXNzb3IsIHVzZVN0YXRlKTtcbiAgdmFyIHVzZVB1YlN1YiA9ICgwLCBfdXNlUHViU3ViMi5kZWZhdWx0KShwcm9jZXNzb3IpO1xuICB2YXIgdXNlUmVkdWNlciA9ICgwLCBfdXNlUmVkdWNlcjIuZGVmYXVsdCkodXNlU3RhdGUpO1xuICB2YXIgdXNlRWZmZWN0ID0gKDAsIF91c2VFZmZlY3QyLmRlZmF1bHQpKHByb2Nlc3Nvcik7XG5cbiAgcmV0dXJuIHtcbiAgICBBOiBBLFxuICAgIHJ1bjogcnVuLFxuICAgIEZyYWdtZW50OiBGcmFnbWVudCxcbiAgICBwcm9jZXNzb3I6IHByb2Nlc3NvcixcbiAgICB1c2VFbGVtZW50OiB1c2VFbGVtZW50LFxuICAgIHVzZVByb2R1Y3Q6IHVzZVByb2R1Y3QsXG4gICAgdXNlUHViU3ViOiB1c2VQdWJTdWIsXG4gICAgdXNlU3RhdGU6IHVzZVN0YXRlLFxuICAgIHVzZVJlZHVjZXI6IHVzZVJlZHVjZXIsXG4gICAgdXNlRWZmZWN0OiB1c2VFZmZlY3RcbiAgfTtcbn1cblxudmFyIHJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcnVudGltZTtcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZVJ1bnRpbWUgPSBjcmVhdGVSdW50aW1lKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0FjdE1MRWxlbWVudDtcbmZ1bmN0aW9uIGlzQWN0TUxFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5fX2FjdG1sID09PSB0cnVlO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBrZXlMaXN0ID0gT2JqZWN0LmtleXM7XG52YXIgaGFzUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuICAgIHZhciBhcnJBID0gaXNBcnJheShhKVxuICAgICAgLCBhcnJCID0gaXNBcnJheShiKVxuICAgICAgLCBpXG4gICAgICAsIGxlbmd0aFxuICAgICAgLCBrZXk7XG5cbiAgICBpZiAoYXJyQSAmJiBhcnJCKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgICAgaWYgKCFlcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGFyckEgIT0gYXJyQikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGRhdGVBID0gYSBpbnN0YW5jZW9mIERhdGVcbiAgICAgICwgZGF0ZUIgPSBiIGluc3RhbmNlb2YgRGF0ZTtcbiAgICBpZiAoZGF0ZUEgIT0gZGF0ZUIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZUEgJiYgZGF0ZUIpIHJldHVybiBhLmdldFRpbWUoKSA9PSBiLmdldFRpbWUoKTtcblxuICAgIHZhciByZWdleHBBID0gYSBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgLCByZWdleHBCID0gYiBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgICBpZiAocmVnZXhwQSAhPSByZWdleHBCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHJlZ2V4cEEgJiYgcmVnZXhwQikgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG5cbiAgICB2YXIga2V5cyA9IGtleUxpc3QoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cbiAgICBpZiAobGVuZ3RoICE9PSBrZXlMaXN0KGIpLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgIGlmICghaGFzUHJvcC5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIWVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGEhPT1hICYmIGIhPT1iO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2FycmF5V2l0aG91dEhvbGVzKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRob3V0SG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXkoaXRlcikge1xuICBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChpdGVyKSB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaXRlcikgPT09IFwiW29iamVjdCBBcmd1bWVudHNdXCIpIHJldHVybiBBcnJheS5mcm9tKGl0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXk7IiwiZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkge1xuICB2YXIgX2FyciA9IFtdO1xuICB2YXIgX24gPSB0cnVlO1xuICB2YXIgX2QgPSBmYWxzZTtcbiAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgX2QgPSB0cnVlO1xuICAgIF9lID0gZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIF9hcnI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2l0ZXJhYmxlVG9BcnJheUxpbWl0OyIsImZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9ub25JdGVyYWJsZVJlc3Q7IiwiZnVuY3Rpb24gX25vbkl0ZXJhYmxlU3ByZWFkKCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIHNwcmVhZCBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX25vbkl0ZXJhYmxlU3ByZWFkOyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkMih0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSAlIDIpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuXG4gICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgc3ltKS5lbnVtZXJhYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIG93bktleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9vYmplY3RTcHJlYWQyOyIsInZhciBhcnJheVdpdGhIb2xlcyA9IHJlcXVpcmUoXCIuL2FycmF5V2l0aEhvbGVzXCIpO1xuXG52YXIgaXRlcmFibGVUb0FycmF5TGltaXQgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlMaW1pdFwiKTtcblxudmFyIG5vbkl0ZXJhYmxlUmVzdCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlUmVzdFwiKTtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7XG4gIHJldHVybiBhcnJheVdpdGhIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgbm9uSXRlcmFibGVSZXN0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3NsaWNlZFRvQXJyYXk7IiwidmFyIGFycmF5V2l0aG91dEhvbGVzID0gcmVxdWlyZShcIi4vYXJyYXlXaXRob3V0SG9sZXNcIik7XG5cbnZhciBpdGVyYWJsZVRvQXJyYXkgPSByZXF1aXJlKFwiLi9pdGVyYWJsZVRvQXJyYXlcIik7XG5cbnZhciBub25JdGVyYWJsZVNwcmVhZCA9IHJlcXVpcmUoXCIuL25vbkl0ZXJhYmxlU3ByZWFkXCIpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7XG4gIHJldHVybiBhcnJheVdpdGhvdXRIb2xlcyhhcnIpIHx8IGl0ZXJhYmxlVG9BcnJheShhcnIpIHx8IG5vbkl0ZXJhYmxlU3ByZWFkKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3RvQ29uc3VtYWJsZUFycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IEZvY3VzRmllbGQgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIENoZWNrRm9yRWRpdEZpZWxkKHsgdG9kb3MgfSkge1xuICByZXR1cm4gPEZvY3VzRmllbGQgaW5kZXg9eyB0b2Rvcy5maW5kSW5kZXgoKHsgZWRpdGluZyB9KSA9PiBlZGl0aW5nKSB9IC8+O1xufVxuIiwiaW1wb3J0IHsgdXNlQ2hpbGRyZW4gfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQge1xuICBUT0dHTEUsXG4gIE5FV19UT0RPLFxuICBERUxFVEUsXG4gIEVESVQsXG4gIEVESVRfVE9ETyxcbiAgQ0xFQVJfQ09NUExFVEVEXG59IGZyb20gJy4vU3RvcmUnO1xuXG5pbXBvcnQge1xuICBGSUxURVJfQUxMLFxuICBGSUxURVJfQUNUSVZFLFxuICBGSUxURVJfQ09NUExFVEVEXG59IGZyb20gJy4vRmlsdGVyJztcblxuY29uc3QgJCA9IChzZWxlY3RvcikgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5jb25zdCBsaXN0ID0gJCgnLnRvZG8tbGlzdCcpO1xuY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuXG5jb25zdCBFTlRFUiA9IDEzO1xuY29uc3QgRVNDID0gMjc7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQ29udGFpbmVyKHsgY2hpbGRyZW4gfSkge1xuICBsaXN0LmlubmVySFRNTCA9IGNoaWxkcmVuKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyKHsgb25Vc2VyQWN0aW9uIH0pIHtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdG9nZ2xlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihUT0dHTEUsIHRvZG9JbmRleCk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZGVsZXRlJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihERUxFVEUsIHRvZG9JbmRleCk7XG4gICAgfVxuICB9KTtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVQsIHRvZG9JbmRleCk7XG4gICAgfVxuICB9KTtcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIChlKSA9PiB7XG4gICAgY29uc3QgdG9kb0luZGV4ID0gcGFyc2VJbnQoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyksIDEwKTtcblxuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVF9UT0RPLCB7IGluZGV4OiB0b2RvSW5kZXgsIGxhYmVsOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICB9XG4gIH0pO1xuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuXG4gICAgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1lZGl0JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgb25Vc2VyQWN0aW9uKEVESVRfVE9ETywgeyBpbmRleDogdG9kb0luZGV4LCBsYWJlbDogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtZWRpdCcpICYmIGUua2V5Q29kZSA9PT0gRVNDKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRURJVCwgdG9kb0luZGV4KTtcbiAgICB9XG4gIH0pO1xuICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbmV3JykgJiYgZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgb25Vc2VyQWN0aW9uKE5FV19UT0RPLCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gRm9jdXNGaWVsZCh7IGluZGV4IH0pIHtcbiAgY29uc3QgZWwgPSAkKGAuZWRpdFtkYXRhLWluZGV4PVwiJHsgaW5kZXggfVwiXWApO1xuXG4gIGlmIChlbCkge1xuICAgIGVsLmZvY3VzKCk7XG4gICAgZWwuc2VsZWN0aW9uU3RhcnQgPSBlbC5zZWxlY3Rpb25FbmQgPSBlbC52YWx1ZS5sZW5ndGg7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gUHJvZ3Jlc3NDaGVja2VyKHsgdG9kb3MgfSkge1xuICBjb25zdCBjb21wbGV0ZWQgPSB0b2Rvcy5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IGNvbXBsZXRlZCkubGVuZ3RoO1xuICBjb25zdCBpdGVtc0xlZnQgPSB0b2Rvcy5sZW5ndGggLSBjb21wbGV0ZWQ7XG5cbiAgJCgnW2RhdGEtY291bnRdJykuaW5uZXJIVE1MID0gYFxuICAgIDxzdHJvbmc+JHsgaXRlbXNMZWZ0IH08L3N0cm9uZz4gJHsgaXRlbXNMZWZ0ID4gMSB8fCBpdGVtc0xlZnQgPT09IDAgPyAnaXRlbXMnIDogJ2l0ZW0nIH0gbGVmdFxuICBgO1xufTtcbmV4cG9ydCBmdW5jdGlvbiBGb290ZXIoeyBvblVzZXJBY3Rpb24gfSkge1xuICAkKCdbZGF0YS1maWx0ZXJdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWxsJykpIHtcbiAgICAgIG9uVXNlckFjdGlvbihGSUxURVJfQUxMKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnKSkge1xuICAgICAgb25Vc2VyQWN0aW9uKEZJTFRFUl9BQ1RJVkUpO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuaGFzQXR0cmlidXRlKCdkYXRhLWNvbXBsZXRlZCcpKSB7XG4gICAgICBvblVzZXJBY3Rpb24oRklMVEVSX0NPTVBMRVRFRCk7XG4gICAgfVxuICB9KTtcbiAgJCgnW2RhdGEtY2xlYXItY29tcGxldGVkXScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG9uVXNlckFjdGlvbihDTEVBUl9DT01QTEVURUQpO1xuICB9KTtcbn07XG5leHBvcnQgZnVuY3Rpb24gRmlsdGVyT3B0aW9uc1RhYnMoeyBmaWx0ZXIgfSkge1xuICAkKCdbZGF0YS1hbGxdJykuc2V0QXR0cmlidXRlKCdjbGFzcycsIGZpbHRlciA9PT0gRklMVEVSX0FMTCA/ICdzZWxlY3RlZCcgOiAnJyk7XG4gICQoJ1tkYXRhLWFjdGl2ZV0nKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZmlsdGVyID09PSBGSUxURVJfQUNUSVZFID8gJ3NlbGVjdGVkJyA6ICcnKTtcbiAgJCgnW2RhdGEtY29tcGxldGVkXScpLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBmaWx0ZXIgPT09IEZJTFRFUl9DT01QTEVURUQgPyAnc2VsZWN0ZWQnIDogJycpO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSwgRnJhZ21lbnQsIHVzZVByb2R1Y3QsIHVzZVB1YlN1YiwgdXNlU3RhdGUgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5leHBvcnQgY29uc3QgRklMVEVSX0FMTCA9ICdGSUxURVJfQUxMJztcbmV4cG9ydCBjb25zdCBGSUxURVJfQUNUSVZFID0gJ0ZJTFRFUl9BQ1RJVkUnO1xuZXhwb3J0IGNvbnN0IEZJTFRFUl9DT01QTEVURUQgPSAnRklMVEVSX0NPTVBMRVRFRCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEZpbHRlcih7IGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgWyBmaWx0ZXIsIHNldEZpbHRlciBdID0gdXNlU3RhdGUoRklMVEVSX0FMTCk7XG4gIGNvbnN0IHsgU3Vic2NyaWJlIH0gPSB1c2VQdWJTdWIoKTtcblxuICB1c2VQcm9kdWN0KGZpbHRlcigpKTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIHsgY2hpbGRyZW4gfVxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRklMVEVSX0FMTCB9PlxuICAgICAgICB7ICgpID0+IHNldEZpbHRlcihGSUxURVJfQUxMKSB9XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IEZJTFRFUl9BQ1RJVkUgfT5cbiAgICAgICAgeyAoKSA9PiBzZXRGaWx0ZXIoRklMVEVSX0FDVElWRSkgfVxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBGSUxURVJfQ09NUExFVEVEIH0+XG4gICAgICAgIHsgKCkgPT4gc2V0RmlsdGVyKEZJTFRFUl9DT01QTEVURUQpIH1cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuIiwiaW1wb3J0IHsgdXNlUHJvZHVjdCB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmltcG9ydCB7IFRvRG8gfSBmcm9tICcuL1N0b3JlJztcblxuY29uc3QgaW5pdGlhbFZhbHVlID0gSlNPTi5zdHJpbmdpZnkoW1xuICBUb0RvKHsgbGFiZWw6ICdBY3RNTCBpcyB1c2luZyBKU1gnIH0pLFxuICBUb0RvKHsgbGFiZWw6ICdJdCBpcyBsaWtlIFJlYWN0IGJ1dCBub3QgZm9yIHJlbmRlcmluZycgfSlcbl0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIFByb3ZpZGVyOiAoKSA9PiB7XG4gICAgdXNlUHJvZHVjdChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2RvcycpIHx8IGluaXRpYWxWYWx1ZSkpO1xuICB9LFxuICBTdG9yYWdlOiAoeyB0b2RvcyB9KSA9PiB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG9zJywgSlNPTi5zdHJpbmdpZnkodG9kb3MpKTtcbiAgfVxufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgeyBGaWxsQ29udGFpbmVyIH0gZnJvbSAnLi9ET00nO1xuaW1wb3J0IHsgRklMVEVSX0FMTCwgRklMVEVSX0FDVElWRSwgRklMVEVSX0NPTVBMRVRFRCB9IGZyb20gJy4vRmlsdGVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyZXIoeyB0b2RvcywgZmlsdGVyIH0pIHtcbiAgY29uc29sZS5sb2codG9kb3MsIGZpbHRlcik7XG4gIHJldHVybiAoXG4gICAgPEZpbGxDb250YWluZXI+XG4gICAgICB7XG4gICAgICAgICgpID0+IHRvZG9zXG4gICAgICAgIC5maWx0ZXIoKHsgY29tcGxldGVkIH0pID0+IHtcbiAgICAgICAgICBpZiAoZmlsdGVyID09PSBGSUxURVJfQUxMKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBpZiAoZmlsdGVyID09PSBGSUxURVJfQUNUSVZFKSByZXR1cm4gIWNvbXBsZXRlZDtcbiAgICAgICAgICBpZiAoZmlsdGVyID09PSBGSUxURVJfQ09NUExFVEVEKSByZXR1cm4gY29tcGxldGVkO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkubWFwKCh0b2RvLCBpKSA9PiB7XG4gICAgICAgICAgY29uc3QgbGlDbGFzcyA9IHRvZG8uZWRpdGluZyA/ICdlZGl0aW5nJyA6ICh0b2RvLmNvbXBsZXRlZCA/ICdjb21wbGV0ZWQnIDogJycpO1xuXG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxsaSBjbGFzcz0nJHsgbGlDbGFzcyB9Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLXRvZ2dsZVxuICAgICAgICAgICAgICAgICAgJHsgdG9kby5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJyB9PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBkYXRhLWluZGV4PVwiJHsgaSB9XCIgZGF0YS1sYWJlbD4keyB0b2RvLmxhYmVsIH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGVzdHJveVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtZGVsZXRlPjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWRpdFwiIHZhbHVlPVwiJHsgdG9kby5sYWJlbCB9XCIgZGF0YS1pbmRleD1cIiR7IGkgfVwiIGRhdGEtZWRpdD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgYDtcbiAgICAgICAgfSkuam9pbignJylcbiAgICAgIH1cbiAgICA8L0ZpbGxDb250YWluZXI+XG4gICk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSwgRnJhZ21lbnQsIHVzZVJlZHVjZXIsIHVzZVByb2R1Y3QsIHVzZVB1YlN1YiB9IGZyb20gJy4uLy4uLy4uL2xpYic7XG5cbmV4cG9ydCBjb25zdCBUT0dHTEUgPSAnVE9HR0xFJztcbmV4cG9ydCBjb25zdCBORVdfVE9ETyA9ICdORVdfVE9ETyc7XG5leHBvcnQgY29uc3QgREVMRVRFID0gJ0RFTEVURSc7XG5leHBvcnQgY29uc3QgRURJVCA9ICdFRElUJztcbmV4cG9ydCBjb25zdCBFRElUX1RPRE8gPSAnRURJVF9UT0RPJztcbmV4cG9ydCBjb25zdCBDTEVBUl9DT01QTEVURUQgPSAnQ0xFQVJfQ09NUExFVEVEJztcblxuY29uc3QgdG9nZ2xlID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogVE9HR0xFLCB0b2RvSW5kZXggfSk7XG5jb25zdCBkZWxldGVUb2RvID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogREVMRVRFLCB0b2RvSW5kZXggfSk7XG5jb25zdCBuZXdUb2RvID0gKGxhYmVsKSA9PiAoeyB0eXBlOiBORVdfVE9ETywgbGFiZWwgfSk7XG5jb25zdCBlZGl0ID0gKHRvZG9JbmRleCkgPT4gKHsgdHlwZTogRURJVCwgdG9kb0luZGV4IH0pO1xuY29uc3QgZWRpdFRvRG8gPSAoeyBpbmRleCwgbGFiZWwgfSkgPT4gKHsgdHlwZTogRURJVF9UT0RPLCBpbmRleCwgbGFiZWwgfSk7XG5jb25zdCBjbGVhckNvbXBsZXRlZCA9ICgpID0+ICh7IHR5cGU6IENMRUFSX0NPTVBMRVRFRCB9KTtcblxuZXhwb3J0IGNvbnN0IFRvRG8gPSAoeyBsYWJlbCB9KSA9PiAoeyBsYWJlbCwgY29tcGxldGVkOiBmYWxzZSwgZWRpdGluZzogZmFsc2UgfSk7XG5jb25zdCByZWR1Y2VyID0gZnVuY3Rpb24gKHRvZG9zLCBhY3Rpb24pIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgVE9HR0xFOlxuICAgICAgcmV0dXJuIHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSBhY3Rpb24udG9kb0luZGV4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICBjb21wbGV0ZWQ6ICF0b2RvLmNvbXBsZXRlZFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICB9KTtcbiAgICBjYXNlIEVESVQ6XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi50b2RvSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgIGVkaXRpbmc6ICF0b2RvLmVkaXRpbmdcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICBlZGl0aW5nOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgY2FzZSBFRElUX1RPRE86XG4gICAgICByZXR1cm4gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPT09IGFjdGlvbi5pbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgbGFiZWw6IGFjdGlvbi5sYWJlbCxcbiAgICAgICAgICAgIGVkaXRpbmc6IGZhbHNlXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgIH0pO1xuICAgIGNhc2UgTkVXX1RPRE86XG4gICAgICByZXR1cm4gWyAuLi50b2RvcywgVG9Ebyh7IGxhYmVsOiBhY3Rpb24ubGFiZWwgfSkgXTtcbiAgICBjYXNlIERFTEVURTpcbiAgICAgIHJldHVybiB0b2Rvcy5maWx0ZXIoKHRvZG8sIGluZGV4KSA9PiBpbmRleCAhPT0gYWN0aW9uLnRvZG9JbmRleCk7XG4gICAgY2FzZSBDTEVBUl9DT01QTEVURUQ6XG4gICAgICByZXR1cm4gdG9kb3MuZmlsdGVyKCh0b2RvKSA9PiAhdG9kby5jb21wbGV0ZWQpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdG9kb3M7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFN0b3JlKHsgaW5pdGlhbFZhbHVlLCBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFsgdG9kb3MsICwgRGlzcGF0Y2ggXSA9IHVzZVJlZHVjZXIocmVkdWNlciwgaW5pdGlhbFZhbHVlKTtcbiAgY29uc3QgeyBTdWJzY3JpYmUgfSA9IHVzZVB1YlN1YigpO1xuXG4gIHVzZVByb2R1Y3QodG9kb3MoKSk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICB7IGNoaWxkcmVuIH1cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IFRPR0dMRSB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQ6IHRvZG9JbmRleCB9KSA9PiB0b2dnbGUodG9kb0luZGV4KSB9IC8+XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT17IE5FV19UT0RPIH0+XG4gICAgICAgIDxEaXNwYXRjaCBwcm9wc1RvQWN0aW9uPXsgKHsgcGF5bG9hZDogbGFiZWwgfSkgPT4gbmV3VG9kbyhsYWJlbCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBERUxFVEUgfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkOiB0b2RvSW5kZXggfSkgPT4gZGVsZXRlVG9kbyh0b2RvSW5kZXgpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgRURJVCB9PlxuICAgICAgICA8RGlzcGF0Y2ggcHJvcHNUb0FjdGlvbj17ICh7IHBheWxvYWQ6IHRvZG9JbmRleCB9KSA9PiBlZGl0KHRvZG9JbmRleCkgfSAvPlxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9eyBFRElUX1RPRE8gfT5cbiAgICAgICAgPERpc3BhdGNoIHByb3BzVG9BY3Rpb249eyAoeyBwYXlsb2FkIH0pID0+IGVkaXRUb0RvKHBheWxvYWQpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgICAgPFN1YnNjcmliZSB0eXBlPXsgQ0xFQVJfQ09NUExFVEVEIH0+XG4gICAgICAgIDxEaXNwYXRjaCBhY3Rpb249eyBjbGVhckNvbXBsZXRlZCgpIH0gLz5cbiAgICAgIDwvU3Vic2NyaWJlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59XG4iLCIvKiogQGpzeCBBICovXG5pbXBvcnQgeyBBLCBydW4sIEZyYWdtZW50LCB1c2VQdWJTdWIgfSBmcm9tICcuLi8uLi8uLi9saWInO1xuXG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgQ2hlY2tGb3JFZGl0RmllbGQgZnJvbSAnLi9DaGVja0ZvckVkaXRGaWVsZCc7XG5pbXBvcnQgeyBQcm9ncmVzc0NoZWNrZXIsIEZpbHRlck9wdGlvbnNUYWJzLCBDb250YWluZXIsIEZvb3RlciB9IGZyb20gJy4vRE9NJztcbmltcG9ydCBGaWx0ZXIgZnJvbSAnLi9GaWx0ZXInO1xuaW1wb3J0IFBlcnNpc3QgZnJvbSAnLi9QZXJzaXN0JztcblxuZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCB7IHB1Ymxpc2ggfSA9IHVzZVB1YlN1YigpO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPENvbnRhaW5lciBvblVzZXJBY3Rpb249eyBwdWJsaXNoIH0gLz5cbiAgICAgIDxGb290ZXIgb25Vc2VyQWN0aW9uPXsgcHVibGlzaCB9Lz5cbiAgICAgIDxQZXJzaXN0LlByb3ZpZGVyIGV4cG9ydHM9J2luaXRpYWxWYWx1ZScgLz5cbiAgICAgIDxTdG9yZSBleHBvcnRzPSd0b2RvcycgJGluaXRpYWxWYWx1ZT5cbiAgICAgICAgPEZpbHRlciBleHBvcnRzPSdmaWx0ZXInPlxuICAgICAgICAgIDxSZW5kZXJlciAkdG9kb3MgJGZpbHRlciAvPlxuICAgICAgICAgIDxGaWx0ZXJPcHRpb25zVGFicyAkZmlsdGVyIC8+XG4gICAgICAgIDwvRmlsdGVyPlxuICAgICAgICA8Q2hlY2tGb3JFZGl0RmllbGQgJHRvZG9zIC8+XG4gICAgICAgIDxQcm9ncmVzc0NoZWNrZXIgJHRvZG9zIC8+XG4gICAgICAgIDxQZXJzaXN0LlN0b3JhZ2UgJHRvZG9zIC8+XG4gICAgICA8L1N0b3JlPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59O1xuXG5ydW4oPEFwcCAvPik7XG4iXSwic291cmNlUm9vdCI6IiJ9