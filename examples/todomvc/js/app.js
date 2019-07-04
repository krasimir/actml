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

/***/ "../../src/ActElement.js":
/*!*************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/ActElement.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function parseProps(props) {
  const propNames = props ? Object.keys(props) : [];
  const result = {
    dependencies: [],
    exportsKeyword: undefined
  };
  propNames.forEach(propName => {
    if (propName.charAt(0) === '$') {
      result.dependencies.push(propName.substr(1, propName.length));
    } else if (propName === 'exports') {
      result.exportsKeyword = props.exports;
    } else {
      result[propName] = props[propName];
    }
  });
  return result;
}

;

function getFuncName(func) {
  if (func.name) return func.name;
  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());
  return result ? result[1] : 'unknown';
}

;

const createElement = (func, props, children) => ({
  __actml: true,
  __used: 0,
  __running: false,
  __processChildrenAutomatically: true,
  id: null,
  props: parseProps(props),
  name: getFuncName(func),
  children,
  initialize: function (id, used = 0) {
    this.id = id;
    this.__used = used;
    this.__running = false;
    this.__processChildrenAutomatically = true;
  },

  mergeProps(newProps) {
    this.props = Object.assign({}, this.props, newProps);
  },

  toString() {
    return this.name;
  },

  used() {
    return this.__used;
  },

  isRunning() {
    return this.__running;
  },

  shouldProcessChildrenAutomatically(value) {
    if (typeof value === 'undefined') {
      return this.__processChildrenAutomatically;
    }

    this.__processChildrenAutomatically = value;
    return value;
  },

  async run(otherProps) {
    this.__running = true;
    this.__processChildrenAutomatically = true;
    const result = await func({ ...this.props,
      ...otherProps
    });
    this.__used += 1;
    this.__running = false;
    return result;
  }

});

/* harmony default export */ __webpack_exports__["default"] = (createElement);

/***/ }),

/***/ "../../src/Processor.js":
/*!************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/Processor.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createProcessor; });
/* harmony import */ var _utils_isActMLElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/isActMLElement */ "../../src/utils/isActMLElement.js");
/* harmony import */ var _Tree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tree */ "../../src/Tree.js");
/* harmony import */ var _hooks_usePubSub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks/usePubSub */ "../../src/hooks/usePubSub.js");
/* harmony import */ var _hooks_useState__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hooks/useState */ "../../src/hooks/useState.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooks */ "../../src/hooks/index.js");
/* eslint-disable no-use-before-define */






const process = async (branch, stack = []) => {
  branch.initialize();
  const hooksProps = Object(_hooks__WEBPACK_IMPORTED_MODULE_4__["default"])(branch, callChildren, stack, process);
  let result = await branch.element.run(hooksProps);
  let genResult, toGenValue; // updating the stack

  stack.push(branch.element); // handling a promise

  if (result && result.then) {
    result = await result; // handling a generator
  } else if (result && typeof result.next === 'function') {
    genResult = result.next();

    while (!genResult.done) {
      if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_0__["default"])(genResult.value)) {
        toGenValue = await process(branch.addSubBranch(genResult.value), stack);
      }

      genResult = result.next(toGenValue);
    }

    if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_0__["default"])(genResult.value)) {
      result = await process(branch.addSubBranch(genResult.value), stack);
    } else {
      result = genResult.value;
    } // handling another ActML element

  } else if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_0__["default"])(result)) {
    result = await process(branch.addSubBranch(result), stack);
  } // handling children


  async function callChildren(...additionalProps) {
    const childrenResult = [];
    const {
      children
    } = branch.element;

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_0__["default"])(children[i])) {
          children[i].mergeProps(...additionalProps);
          childrenResult.push((await process(branch.addSubBranch(children[i]), stack)));
        } else if (typeof children[i] === 'function') {
          const funcResult = await children[i](...additionalProps);

          if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_0__["default"])(funcResult)) {
            childrenResult.push((await process(branch.addSubBranch(funcResult), stack)));
          } else {
            childrenResult.push(funcResult);
          }
        }
      }
    }

    return childrenResult;
  }

  if (branch.element.shouldProcessChildrenAutomatically()) {
    await callChildren();
  }

  branch.cleanUp();
  return result;
};

function createProcessor() {
  const tree = Object(_Tree__WEBPACK_IMPORTED_MODULE_1__["default"])();
  return {
    run(elementPrimitive) {
      return process(tree.resolveRoot(elementPrimitive));
    },

    system() {
      return {
        tree,

        reset() {
          tree.reset();
          _hooks_usePubSub__WEBPACK_IMPORTED_MODULE_2__["default"].clear();
          _hooks_useState__WEBPACK_IMPORTED_MODULE_3__["default"].clear();
        }

      };
    }

  };
}
;

/***/ }),

/***/ "../../src/Tree.js":
/*!*******************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/Tree.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tree; });
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-deep-equal */ "../../node_modules/fast-deep-equal/index.js");
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__);
/* eslint-disable no-use-before-define, no-return-assign, max-len */

function Tree() {
  var root = createNewBranch();
  var ids = 0;

  function getId() {
    return 'a' + ++ids;
  }

  ;

  function useSameBranch(branch, newElement) {
    newElement.initialize(branch.element.id, branch.element.used());
    branch.element = newElement;
    return branch;
  }

  function treeDiff(oldElement, newElement) {
    if (oldElement && oldElement.name === newElement.name) {
      return fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(oldElement.props, newElement.props);
    }

    return false;
  }

  function createNewBranch(element) {
    if (element) {
      element.initialize(getId());
    }

    return {
      element,
      children: [],
      cursor: 0,

      initialize() {
        this.cursor = 0;
      },

      addSubBranch(newElement) {
        const subBranch = this.children[this.cursor]; // using the same branch

        if (subBranch && treeDiff(subBranch.element, newElement)) {
          this.cursor += 1;
          return useSameBranch(subBranch, newElement);
        } // creating a new branch


        const newSubBranch = createNewBranch(newElement);
        this.children[this.cursor] = newSubBranch;
        this.cursor += 1;
        return newSubBranch;
      },

      cleanUp() {
        // If there're more branches in the tree then what was processed
        if (this.cursor < this.children.length) {
          this.children.splice(this.cursor, this.children.length - this.cursor);
        }
      }

    };
  }

  return {
    resolveRoot(element) {
      return root = treeDiff(root.element, element) ? useSameBranch(root, element) : createNewBranch(element);
    },

    reset() {
      root = createNewBranch();
      ids = 0;
    },

    getNumOfElements() {
      return ids;
    },

    diagnose() {
      return function loopOver(branch, ind = 0) {
        let arr = [];
        arr.push({
          ind,
          name: branch.element.name,
          used: branch.element.used(),
          id: branch.element.id
        });

        if (branch.children.length > 0) {
          branch.children.forEach(child => {
            arr.push(loopOver(child, ind + 1));
          });
        }

        return arr;
      }(root);
    }

  };
}
;

/***/ }),

/***/ "../../src/hooks/elements/Publish.js":
/*!*************************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/elements/Publish.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createPublishElement; });
function createPublishElement(hostElement) {
  return ({
    type,
    payload,
    usePubSub
  }) => {
    const [, publish] = usePubSub(hostElement);
    publish(type, payload);
  };
}

/***/ }),

/***/ "../../src/hooks/elements/Subscribe.js":
/*!***************************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/elements/Subscribe.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createSubscribeElement; });
function createSubscribeElement(hostElement) {
  return ({
    type,
    useChildren,
    usePubSub
  }) => {
    const [children] = useChildren();
    const [subscribe] = usePubSub(hostElement);
    subscribe(type, children);
  };
}
;

/***/ }),

/***/ "../../src/hooks/elements/index.js":
/*!***********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/elements/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUseElementsHook; });
/* harmony import */ var _Publish__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Publish */ "../../src/hooks/elements/Publish.js");
/* harmony import */ var _Subscribe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Subscribe */ "../../src/hooks/elements/Subscribe.js");


function createUseElementsHook(element) {
  return {
    Publish: Object(_Publish__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
    Subscribe: Object(_Subscribe__WEBPACK_IMPORTED_MODULE_1__["default"])(element)
  };
}

/***/ }),

/***/ "../../src/hooks/index.js":
/*!**************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/index.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initializeHooks; });
/* harmony import */ var _useElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useElement */ "../../src/hooks/useElement.js");
/* harmony import */ var _useChildren__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useChildren */ "../../src/hooks/useChildren.js");
/* harmony import */ var _useProduct__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useProduct */ "../../src/hooks/useProduct.js");
/* harmony import */ var _usePubSub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usePubSub */ "../../src/hooks/usePubSub.js");
/* harmony import */ var _useState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useState */ "../../src/hooks/useState.js");
/* harmony import */ var _useReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useReducer */ "../../src/hooks/useReducer.js");
/* harmony import */ var _elements__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./elements */ "../../src/hooks/elements/index.js");







function initializeHooks(branch, callChildren, stack, process) {
  const {
    element
  } = branch;
  const useElement = Object(_useElement__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  const useChildren = Object(_useChildren__WEBPACK_IMPORTED_MODULE_1__["default"])(element, callChildren);
  const [useProduct, resolvedProductProps] = Object(_useProduct__WEBPACK_IMPORTED_MODULE_2__["default"])(element, stack);
  const usePubSub = Object(_usePubSub__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  const useReducer = Object(_useReducer__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  const useState = Object(_useState__WEBPACK_IMPORTED_MODULE_4__["default"])(element, () => process(branch, stack));
  return { ...resolvedProductProps,
    useChildren,
    useElement,
    useProduct,
    usePubSub,
    useState,
    useReducer,
    useElements: () => Object(_elements__WEBPACK_IMPORTED_MODULE_6__["default"])(element)
  };
}
;

/***/ }),

/***/ "../../src/hooks/useChildren.js":
/*!********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/useChildren.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const createUseChildrenHook = (element, callChildren) => () => {
  element.shouldProcessChildrenAutomatically(false);
  return [callChildren, element.children];
};

/* harmony default export */ __webpack_exports__["default"] = (createUseChildrenHook);

/***/ }),

/***/ "../../src/hooks/useElement.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/useElement.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUseElementHook; });
function createUseElementHook(element) {
  return () => [element];
}

/***/ }),

/***/ "../../src/hooks/useProduct.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/useProduct.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUseProductHook; });
/* eslint-disable no-return-assign */
const resolveProp = (prop, stackIndex, stack, error) => {
  if (stackIndex < 0) {
    throw error;
  }

  const parent = stack[stackIndex];
  const product = parent.requestProduct ? parent.requestProduct(prop) : null;

  if (product !== null) {
    return product.value;
  }

  return resolveProp(prop, stackIndex - 1, stack, error);
};

function resolveProduct(element, stack) {
  const {
    dependencies
  } = element.props;
  const data = {};

  if (dependencies.length === 0) {
    return {};
  }

  dependencies.forEach(propName => {
    data[propName] = resolveProp(propName, stack.length - 1, stack, new Error(`"${propName}" prop requested by "${element.name}" can not be found.\n\nStack:\n` + [...stack, element].map(({
      name
    }) => `  <${name}>`).join('\n')));
  });
  return data;
}

;
function createUseProductHook(element, stack) {
  let product;
  const resolvedProductProps = resolveProduct(element, stack);

  element.requestProduct = propName => {
    if (element.props.exportsKeyword && element.props.exportsKeyword === propName) {
      return {
        value: product
      };
    }

    return null;
  };

  return [initialValue => {
    if (typeof initialValue !== 'undefined') {
      product = initialValue;
    }

    return [newValue => {
      product = newValue;
    }];
  }, resolvedProductProps];
}
;

/***/ }),

/***/ "../../src/hooks/usePubSub.js":
/*!******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/usePubSub.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUsePubSubHook; });
var subscribers = {};

const subscribe = (element, type, callback) => {
  if (!subscribers[type]) subscribers[type] = {};
  subscribers[type][element.id] = callback;
  return () => {
    delete subscribers[type][element.id];
  };
};

const publish = (element, type, payload) => {
  if (!subscribers[type]) return;
  Object.keys(subscribers[type]).forEach(id => {
    subscribers[type][id](payload, element);
  });
};

function createUsePubSubHook(element) {
  return scopedElement => [// subscribe
  (...params) => subscribe(scopedElement || element, ...params), // publish
  (...params) => publish(scopedElement || element, ...params), // list of all subscribers
  subscribers];
}

createUsePubSubHook.clear = () => {
  subscribers = {};
};

/***/ }),

/***/ "../../src/hooks/useReducer.js":
/*!*******************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/useReducer.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUseReducerHook; });
function createUseReducerHook(element) {}

/***/ }),

/***/ "../../src/hooks/useState.js":
/*!*****************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/useState.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUseStateHook; });
/* eslint-disable no-return-assign */
const Storage = {
  elements: {},

  get(element) {
    if (this.elements[element.id]) {
      return this.elements[element.id];
    }

    return this.elements[element.id] = {
      states: [],
      consumer: 0
    };
  }

};
function createUseStateHook(element, rerun) {
  const storage = Storage.get(element);
  return initialState => {
    let index; // first run

    if (element.used() === 0) {
      storage.states.push(initialState);
      index = storage.states.length - 1; // other runs
    } else {
      index = storage.consumer;
      storage.consumer = index < storage.states.length - 1 ? storage.consumer + 1 : 0;
    }

    return [storage.states[index], newState => {
      storage.states[index] = newState;

      if (!element.isRunning()) {
        rerun();
      }

      return newState;
    }];
  };
}

createUseStateHook.clear = () => {
  Storage.elements = {};
};

/***/ }),

/***/ "../../src/index.js":
/*!********************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/index.js ***!
  \********************************************************/
/*! exports provided: A, run, Fragment, processor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run", function() { return run; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processor", function() { return processor; });
/* harmony import */ var _Processor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Processor */ "../../src/Processor.js");
/* harmony import */ var _utils_isActMLElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/isActMLElement */ "../../src/utils/isActMLElement.js");
/* harmony import */ var _ActElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ActElement */ "../../src/ActElement.js");



const processor = Object(_Processor__WEBPACK_IMPORTED_MODULE_0__["default"])();

function A(func, props, ...children) {
  return Object(_ActElement__WEBPACK_IMPORTED_MODULE_2__["default"])(func, props, children);
}

function run(element) {
  if (!Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
    throw new Error(`ActML element expected. Instead ${element.toString()} passed.`);
  }

  return processor.run(element);
}

const Fragment = () => {};



/***/ }),

/***/ "../../src/utils/isActMLElement.js":
/*!***********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/utils/isActMLElement.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isActMLElement; });
function isActMLElement(element) {
  return element && element.__actml === true;
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

/***/ "./node_modules/@babel/runtime/helpers/objectSpread.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectSpread.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
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
  }

  return target;
}

module.exports = _objectSpread;

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

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/*! exports provided: FillContainer, Container */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FillContainer", function() { return FillContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);


var $ = function $(selector) {
  return document.querySelector(selector);
};

var list = $('.todo-list');
var header = $('.header');
var ENTER = 13;
function FillContainer(_ref) {
  var useChildren = _ref.useChildren;

  var _useChildren = useChildren(),
      _useChildren2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useChildren, 2),
      content = _useChildren2[1];

  list.innerHTML = content;
}
function Container(_ref2) {
  var useChildren = _ref2.useChildren;

  var _useChildren3 = useChildren(),
      _useChildren4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useChildren3, 1),
      children = _useChildren4[0];

  list.addEventListener('click', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);
    var type = e.target.getAttribute('data-action');
    children(type, todoIndex);
  });
  header.addEventListener('keyup', function (e) {
    if (e.keyCode === ENTER) {
      children(e.target.getAttribute('data-action'), e.target.value);
      e.target.value = '';
    }
  });
}

/***/ }),

/***/ "./src/Listener.js":
/*!*************************!*\
  !*** ./src/Listener.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Listener; });
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src */ "../../src/index.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* eslint-disable react/prop-types */

/** @jsx A */


function Listener(_ref) {
  var useElements = _ref.useElements;

  var _useElements = useElements(),
      Publish = _useElements.Publish;

  return Object(_src__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["Container"], null, function (type, todoIndex) {
    return Object(_src__WEBPACK_IMPORTED_MODULE_0__["A"])(Publish, {
      type: type,
      payload: todoIndex
    });
  });
}

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
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src */ "../../src/index.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");
/* eslint-disable react/prop-types */

/** @jsx A */


function Renderer(_ref) {
  var todos = _ref.todos;
  return Object(_src__WEBPACK_IMPORTED_MODULE_0__["A"])(_DOM__WEBPACK_IMPORTED_MODULE_1__["FillContainer"], null, todos.map(function (todo, i) {
    return "\n            <li class='".concat(todo.completed ? 'completed' : '', "'>\n              <div class=\"view\">\n                <input \n                  class=\"toggle\"\n                  type=\"checkbox\"\n                  data-index=\"").concat(i, "\"\n                  data-action=\"toggle\"\n                  ").concat(todo.completed ? 'checked' : '', ">\n                <label>").concat(todo.label, "</label>\n                <button\n                  class=\"destroy\"\n                  data-index=\"").concat(i, "\"\n                  data-action=\"delete\"></button>\n              </div>\n              <input class=\"edit\" value=\"Rule the web\">\n            </li>\n          ");
  }).join(''));
}
;

/***/ }),

/***/ "./src/Store.js":
/*!**********************!*\
  !*** ./src/Store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "./node_modules/@babel/runtime/helpers/objectSpread.js");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../src */ "../../src/index.js");



/* eslint-disable react/prop-types */

/** @jsx A */


var ToDo = function ToDo(_ref) {
  var label = _ref.label;
  return {
    label: label,
    completed: false,
    editing: false
  };
};

var initialValue = [ToDo({
  label: 'First task'
}), ToDo({
  label: 'Second task'
})];
function Store(_ref2) {
  var useState = _ref2.useState,
      useProduct = _ref2.useProduct,
      useElements = _ref2.useElements;

  var _useState = useState(initialValue),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      todos = _useState2[0],
      setTodos = _useState2[1];

  var _useProduct = useProduct(todos),
      _useProduct2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useProduct, 1),
      setProduct = _useProduct2[0];

  var _useElements = useElements(),
      Subscribe = _useElements.Subscribe;

  return Object(_src__WEBPACK_IMPORTED_MODULE_2__["A"])(_src__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, Object(_src__WEBPACK_IMPORTED_MODULE_2__["A"])(Subscribe, {
    type: "toggle"
  }, function (todoIndex) {
    var newState = todos.map(function (todo, index) {
      if (index === todoIndex) {
        return _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, todo, {
          completed: !todo.completed
        });
      }

      return todo;
    });
    setTodos(newState);
    setProduct(newState);
  }), Object(_src__WEBPACK_IMPORTED_MODULE_2__["A"])(Subscribe, {
    type: "new"
  }, function (label) {
    todos.push(ToDo({
      label: label
    }));
    setTodos(todos);
    setProduct(todos);
  }));
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
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src */ "../../src/index.js");
/* harmony import */ var _Store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Store */ "./src/Store.js");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Renderer */ "./src/Renderer.js");
/* harmony import */ var _Listener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Listener */ "./src/Listener.js");
/** @jsx A */





function App() {
  return Object(_src__WEBPACK_IMPORTED_MODULE_0__["A"])(_src__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, Object(_src__WEBPACK_IMPORTED_MODULE_0__["A"])(_Listener__WEBPACK_IMPORTED_MODULE_3__["default"], null), Object(_src__WEBPACK_IMPORTED_MODULE_0__["A"])(_Store__WEBPACK_IMPORTED_MODULE_1__["default"], {
    exports: "todos"
  }, Object(_src__WEBPACK_IMPORTED_MODULE_0__["A"])(_Renderer__WEBPACK_IMPORTED_MODULE_2__["default"], {
    $todos: true
  })));
}

;
Object(_src__WEBPACK_IMPORTED_MODULE_0__["run"])(Object(_src__WEBPACK_IMPORTED_MODULE_0__["A"])(App, null));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL25vZGVfbW9kdWxlcy9mYXN0LWRlZXAtZXF1YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvUHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL2VsZW1lbnRzL1B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9ob29rcy9lbGVtZW50cy9TdWJzY3JpYmUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9ob29rcy9lbGVtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL2luZGV4LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvaG9va3MvdXNlQ2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9ob29rcy91c2VFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvaG9va3MvdXNlUHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL3VzZVB1YlN1Yi5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL3VzZVJlZHVjZXIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9ob29rcy91c2VTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvdXRpbHMvaXNBY3RNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsicGFyc2VQcm9wcyIsInByb3BzIiwicHJvcE5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsInJlc3VsdCIsImRlcGVuZGVuY2llcyIsImV4cG9ydHNLZXl3b3JkIiwidW5kZWZpbmVkIiwiZm9yRWFjaCIsInByb3BOYW1lIiwiY2hhckF0IiwicHVzaCIsInN1YnN0ciIsImxlbmd0aCIsImV4cG9ydHMiLCJnZXRGdW5jTmFtZSIsImZ1bmMiLCJuYW1lIiwiZXhlYyIsInRvU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsImNoaWxkcmVuIiwiX19hY3RtbCIsIl9fdXNlZCIsIl9fcnVubmluZyIsIl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSIsImlkIiwiaW5pdGlhbGl6ZSIsInVzZWQiLCJtZXJnZVByb3BzIiwibmV3UHJvcHMiLCJhc3NpZ24iLCJpc1J1bm5pbmciLCJzaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5IiwidmFsdWUiLCJydW4iLCJvdGhlclByb3BzIiwicHJvY2VzcyIsImJyYW5jaCIsInN0YWNrIiwiaG9va3NQcm9wcyIsImluaXRpYWxpemVIb29rcyIsImNhbGxDaGlsZHJlbiIsImVsZW1lbnQiLCJnZW5SZXN1bHQiLCJ0b0dlblZhbHVlIiwidGhlbiIsIm5leHQiLCJkb25lIiwiaXNBY3RNTEVsZW1lbnQiLCJhZGRTdWJCcmFuY2giLCJhZGRpdGlvbmFsUHJvcHMiLCJjaGlsZHJlblJlc3VsdCIsImkiLCJmdW5jUmVzdWx0IiwiY2xlYW5VcCIsImNyZWF0ZVByb2Nlc3NvciIsInRyZWUiLCJUcmVlIiwiZWxlbWVudFByaW1pdGl2ZSIsInJlc29sdmVSb290Iiwic3lzdGVtIiwicmVzZXQiLCJjcmVhdGVVc2VQdWJTdWJIb29rIiwiY2xlYXIiLCJjcmVhdGVVc2VTdGF0ZUhvb2siLCJyb290IiwiY3JlYXRlTmV3QnJhbmNoIiwiaWRzIiwiZ2V0SWQiLCJ1c2VTYW1lQnJhbmNoIiwibmV3RWxlbWVudCIsInRyZWVEaWZmIiwib2xkRWxlbWVudCIsImVxdWFsIiwiY3Vyc29yIiwic3ViQnJhbmNoIiwibmV3U3ViQnJhbmNoIiwic3BsaWNlIiwiZ2V0TnVtT2ZFbGVtZW50cyIsImRpYWdub3NlIiwibG9vcE92ZXIiLCJpbmQiLCJhcnIiLCJjaGlsZCIsImNyZWF0ZVB1Ymxpc2hFbGVtZW50IiwiaG9zdEVsZW1lbnQiLCJ0eXBlIiwicGF5bG9hZCIsInVzZVB1YlN1YiIsInB1Ymxpc2giLCJjcmVhdGVTdWJzY3JpYmVFbGVtZW50IiwidXNlQ2hpbGRyZW4iLCJzdWJzY3JpYmUiLCJjcmVhdGVVc2VFbGVtZW50c0hvb2siLCJQdWJsaXNoIiwiU3Vic2NyaWJlIiwidXNlRWxlbWVudCIsImNyZWF0ZVVzZUVsZW1lbnRIb29rIiwiY3JlYXRlVXNlQ2hpbGRyZW5Ib29rIiwidXNlUHJvZHVjdCIsInJlc29sdmVkUHJvZHVjdFByb3BzIiwiY3JlYXRlVXNlUHJvZHVjdEhvb2siLCJ1c2VSZWR1Y2VyIiwiY3JlYXRlVXNlUmVkdWNlckhvb2siLCJ1c2VTdGF0ZSIsInVzZUVsZW1lbnRzIiwicmVzb2x2ZVByb3AiLCJwcm9wIiwic3RhY2tJbmRleCIsImVycm9yIiwicGFyZW50IiwicHJvZHVjdCIsInJlcXVlc3RQcm9kdWN0IiwicmVzb2x2ZVByb2R1Y3QiLCJkYXRhIiwiRXJyb3IiLCJtYXAiLCJqb2luIiwiaW5pdGlhbFZhbHVlIiwibmV3VmFsdWUiLCJzdWJzY3JpYmVycyIsImNhbGxiYWNrIiwic2NvcGVkRWxlbWVudCIsInBhcmFtcyIsIlN0b3JhZ2UiLCJlbGVtZW50cyIsImdldCIsInN0YXRlcyIsImNvbnN1bWVyIiwicmVydW4iLCJzdG9yYWdlIiwiaW5pdGlhbFN0YXRlIiwiaW5kZXgiLCJuZXdTdGF0ZSIsInByb2Nlc3NvciIsIkEiLCJBY3RFbGVtZW50IiwiRnJhZ21lbnQiLCIkIiwic2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsaXN0IiwiaGVhZGVyIiwiRU5URVIiLCJGaWxsQ29udGFpbmVyIiwiY29udGVudCIsImlubmVySFRNTCIsIkNvbnRhaW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidG9kb0luZGV4IiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJrZXlDb2RlIiwiTGlzdGVuZXIiLCJSZW5kZXJlciIsInRvZG9zIiwidG9kbyIsImNvbXBsZXRlZCIsImxhYmVsIiwiVG9EbyIsImVkaXRpbmciLCJTdG9yZSIsInNldFRvZG9zIiwic2V0UHJvZHVjdCIsIkFwcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFdBQVc7QUFDakM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxvQkFBb0IsV0FBVztBQUMvQjs7QUFFQSxvQkFBb0IsV0FBVztBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdERBO0FBQUEsU0FBU0EsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkI7QUFDekIsUUFBTUMsU0FBUyxHQUFHRCxLQUFLLEdBQUdFLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxLQUFaLENBQUgsR0FBd0IsRUFBL0M7QUFDQSxRQUFNSSxNQUFNLEdBQUc7QUFDYkMsZ0JBQVksRUFBRSxFQUREO0FBRWJDLGtCQUFjLEVBQUVDO0FBRkgsR0FBZjtBQUtBTixXQUFTLENBQUNPLE9BQVYsQ0FBa0JDLFFBQVEsSUFBSTtBQUM1QixRQUFJQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0IsQ0FBaEIsTUFBdUIsR0FBM0IsRUFBZ0M7QUFDOUJOLFlBQU0sQ0FBQ0MsWUFBUCxDQUFvQk0sSUFBcEIsQ0FBeUJGLFFBQVEsQ0FBQ0csTUFBVCxDQUFnQixDQUFoQixFQUFtQkgsUUFBUSxDQUFDSSxNQUE1QixDQUF6QjtBQUNELEtBRkQsTUFFTyxJQUFJSixRQUFRLEtBQUssU0FBakIsRUFBNEI7QUFDakNMLFlBQU0sQ0FBQ0UsY0FBUCxHQUF3Qk4sS0FBSyxDQUFDYyxPQUE5QjtBQUNELEtBRk0sTUFFQTtBQUNMVixZQUFNLENBQUNLLFFBQUQsQ0FBTixHQUFtQlQsS0FBSyxDQUFDUyxRQUFELENBQXhCO0FBQ0Q7QUFDRixHQVJEO0FBVUEsU0FBT0wsTUFBUDtBQUNEOztBQUFBOztBQUVELFNBQVNXLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLE1BQUlBLElBQUksQ0FBQ0MsSUFBVCxFQUFlLE9BQU9ELElBQUksQ0FBQ0MsSUFBWjtBQUNmLE1BQUliLE1BQU0sR0FBRyw2QkFBNkJjLElBQTdCLENBQWtDRixJQUFJLENBQUNHLFFBQUwsRUFBbEMsQ0FBYjtBQUVBLFNBQU9mLE1BQU0sR0FBR0EsTUFBTSxDQUFFLENBQUYsQ0FBVCxHQUFpQixTQUE5QjtBQUNEOztBQUFBOztBQUVELE1BQU1nQixhQUFhLEdBQUcsQ0FBQ0osSUFBRCxFQUFPaEIsS0FBUCxFQUFjcUIsUUFBZCxNQUE0QjtBQUNoREMsU0FBTyxFQUFFLElBRHVDO0FBRWhEQyxRQUFNLEVBQUUsQ0FGd0M7QUFHaERDLFdBQVMsRUFBRSxLQUhxQztBQUloREMsZ0NBQThCLEVBQUUsSUFKZ0I7QUFLaERDLElBQUUsRUFBRSxJQUw0QztBQU1oRDFCLE9BQUssRUFBRUQsVUFBVSxDQUFDQyxLQUFELENBTitCO0FBT2hEaUIsTUFBSSxFQUFFRixXQUFXLENBQUNDLElBQUQsQ0FQK0I7QUFRaERLLFVBUmdEO0FBU2hETSxZQUFVLEVBQUUsVUFBVUQsRUFBVixFQUFjRSxJQUFJLEdBQUcsQ0FBckIsRUFBd0I7QUFDbEMsU0FBS0YsRUFBTCxHQUFVQSxFQUFWO0FBQ0EsU0FBS0gsTUFBTCxHQUFjSyxJQUFkO0FBQ0EsU0FBS0osU0FBTCxHQUFpQixLQUFqQjtBQUNBLFNBQUtDLDhCQUFMLEdBQXNDLElBQXRDO0FBQ0QsR0FkK0M7O0FBZWhESSxZQUFVLENBQUNDLFFBQUQsRUFBVztBQUNuQixTQUFLOUIsS0FBTCxHQUFhRSxNQUFNLENBQUM2QixNQUFQLENBQWMsRUFBZCxFQUFrQixLQUFLL0IsS0FBdkIsRUFBOEI4QixRQUE5QixDQUFiO0FBQ0QsR0FqQitDOztBQWtCaERYLFVBQVEsR0FBRztBQUNULFdBQU8sS0FBS0YsSUFBWjtBQUNELEdBcEIrQzs7QUFxQmhEVyxNQUFJLEdBQUc7QUFDTCxXQUFPLEtBQUtMLE1BQVo7QUFDRCxHQXZCK0M7O0FBd0JoRFMsV0FBUyxHQUFHO0FBQ1YsV0FBTyxLQUFLUixTQUFaO0FBQ0QsR0ExQitDOztBQTJCaERTLG9DQUFrQyxDQUFDQyxLQUFELEVBQVE7QUFDeEMsUUFBSSxPQUFPQSxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO0FBQ2hDLGFBQU8sS0FBS1QsOEJBQVo7QUFDRDs7QUFDRCxTQUFLQSw4QkFBTCxHQUFzQ1MsS0FBdEM7QUFDQSxXQUFPQSxLQUFQO0FBQ0QsR0FqQytDOztBQWtDaEQsUUFBTUMsR0FBTixDQUFVQyxVQUFWLEVBQXNCO0FBQ3BCLFNBQUtaLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxTQUFLQyw4QkFBTCxHQUFzQyxJQUF0QztBQUVBLFVBQU1yQixNQUFNLEdBQUcsTUFBTVksSUFBSSxDQUFDLEVBQ3hCLEdBQUcsS0FBS2hCLEtBRGdCO0FBRXhCLFNBQUdvQztBQUZxQixLQUFELENBQXpCO0FBS0EsU0FBS2IsTUFBTCxJQUFlLENBQWY7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsV0FBT3BCLE1BQVA7QUFDRDs7QUE5QytDLENBQTVCLENBQXRCOztBQWlEZWdCLDRFQUFmLEU7Ozs7Ozs7Ozs7OztBQzVFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNaUIsT0FBTyxHQUFHLE9BQU9DLE1BQVAsRUFBZUMsS0FBSyxHQUFHLEVBQXZCLEtBQThCO0FBQzVDRCxRQUFNLENBQUNYLFVBQVA7QUFFQSxRQUFNYSxVQUFVLEdBQUdDLHNEQUFlLENBQUNILE1BQUQsRUFBU0ksWUFBVCxFQUF1QkgsS0FBdkIsRUFBOEJGLE9BQTlCLENBQWxDO0FBQ0EsTUFBSWpDLE1BQU0sR0FBRyxNQUFNa0MsTUFBTSxDQUFDSyxPQUFQLENBQWVSLEdBQWYsQ0FBbUJLLFVBQW5CLENBQW5CO0FBQ0EsTUFBSUksU0FBSixFQUFlQyxVQUFmLENBTDRDLENBTzVDOztBQUNBTixPQUFLLENBQUM1QixJQUFOLENBQVcyQixNQUFNLENBQUNLLE9BQWxCLEVBUjRDLENBVTVDOztBQUNBLE1BQUl2QyxNQUFNLElBQUlBLE1BQU0sQ0FBQzBDLElBQXJCLEVBQTJCO0FBQ3pCMUMsVUFBTSxHQUFHLE1BQU1BLE1BQWYsQ0FEeUIsQ0FHM0I7QUFDQyxHQUpELE1BSU8sSUFBSUEsTUFBTSxJQUFJLE9BQU9BLE1BQU0sQ0FBQzJDLElBQWQsS0FBdUIsVUFBckMsRUFBaUQ7QUFDdERILGFBQVMsR0FBR3hDLE1BQU0sQ0FBQzJDLElBQVAsRUFBWjs7QUFDQSxXQUFPLENBQUNILFNBQVMsQ0FBQ0ksSUFBbEIsRUFBd0I7QUFDdEIsVUFBSUMscUVBQWMsQ0FBQ0wsU0FBUyxDQUFDVixLQUFYLENBQWxCLEVBQXFDO0FBQ25DVyxrQkFBVSxHQUFHLE1BQU1SLE9BQU8sQ0FBQ0MsTUFBTSxDQUFDWSxZQUFQLENBQW9CTixTQUFTLENBQUNWLEtBQTlCLENBQUQsRUFBdUNLLEtBQXZDLENBQTFCO0FBQ0Q7O0FBQ0RLLGVBQVMsR0FBR3hDLE1BQU0sQ0FBQzJDLElBQVAsQ0FBWUYsVUFBWixDQUFaO0FBQ0Q7O0FBQ0QsUUFBSUkscUVBQWMsQ0FBQ0wsU0FBUyxDQUFDVixLQUFYLENBQWxCLEVBQXFDO0FBQ25DOUIsWUFBTSxHQUFHLE1BQU1pQyxPQUFPLENBQUNDLE1BQU0sQ0FBQ1ksWUFBUCxDQUFvQk4sU0FBUyxDQUFDVixLQUE5QixDQUFELEVBQXVDSyxLQUF2QyxDQUF0QjtBQUNELEtBRkQsTUFFTztBQUNMbkMsWUFBTSxHQUFHd0MsU0FBUyxDQUFDVixLQUFuQjtBQUNELEtBWnFELENBY3hEOztBQUNDLEdBZk0sTUFlQSxJQUFJZSxxRUFBYyxDQUFDN0MsTUFBRCxDQUFsQixFQUE0QjtBQUNqQ0EsVUFBTSxHQUFHLE1BQU1pQyxPQUFPLENBQUNDLE1BQU0sQ0FBQ1ksWUFBUCxDQUFvQjlDLE1BQXBCLENBQUQsRUFBOEJtQyxLQUE5QixDQUF0QjtBQUNELEdBaEMyQyxDQWtDNUM7OztBQUNBLGlCQUFlRyxZQUFmLENBQTRCLEdBQUdTLGVBQS9CLEVBQWdEO0FBQzlDLFVBQU1DLGNBQWMsR0FBRyxFQUF2QjtBQUNBLFVBQU07QUFBRS9CO0FBQUYsUUFBZWlCLE1BQU0sQ0FBQ0ssT0FBNUI7O0FBRUEsUUFBSXRCLFFBQVEsSUFBSUEsUUFBUSxDQUFDUixNQUFULEdBQWtCLENBQWxDLEVBQXFDO0FBQ25DLFdBQUssSUFBSXdDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdoQyxRQUFRLENBQUNSLE1BQTdCLEVBQXFDd0MsQ0FBQyxFQUF0QyxFQUEwQztBQUN4QyxZQUFJSixxRUFBYyxDQUFDNUIsUUFBUSxDQUFDZ0MsQ0FBRCxDQUFULENBQWxCLEVBQWlDO0FBQy9CaEMsa0JBQVEsQ0FBQ2dDLENBQUQsQ0FBUixDQUFZeEIsVUFBWixDQUF1QixHQUFHc0IsZUFBMUI7QUFDQUMsd0JBQWMsQ0FBQ3pDLElBQWYsRUFBb0IsTUFBTTBCLE9BQU8sQ0FBQ0MsTUFBTSxDQUFDWSxZQUFQLENBQW9CN0IsUUFBUSxDQUFDZ0MsQ0FBRCxDQUE1QixDQUFELEVBQW1DZCxLQUFuQyxDQUFqQztBQUNELFNBSEQsTUFHTyxJQUFJLE9BQU9sQixRQUFRLENBQUNnQyxDQUFELENBQWYsS0FBdUIsVUFBM0IsRUFBdUM7QUFDNUMsZ0JBQU1DLFVBQVUsR0FBRyxNQUFNakMsUUFBUSxDQUFDZ0MsQ0FBRCxDQUFSLENBQVksR0FBR0YsZUFBZixDQUF6Qjs7QUFFQSxjQUFJRixxRUFBYyxDQUFDSyxVQUFELENBQWxCLEVBQWdDO0FBQzlCRiwwQkFBYyxDQUFDekMsSUFBZixFQUFvQixNQUFNMEIsT0FBTyxDQUFDQyxNQUFNLENBQUNZLFlBQVAsQ0FBb0JJLFVBQXBCLENBQUQsRUFBa0NmLEtBQWxDLENBQWpDO0FBQ0QsV0FGRCxNQUVPO0FBQ0xhLDBCQUFjLENBQUN6QyxJQUFmLENBQW9CMkMsVUFBcEI7QUFDRDtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxXQUFPRixjQUFQO0FBQ0Q7O0FBRUQsTUFBSWQsTUFBTSxDQUFDSyxPQUFQLENBQWVWLGtDQUFmLEVBQUosRUFBeUQ7QUFDdkQsVUFBTVMsWUFBWSxFQUFsQjtBQUNEOztBQUVESixRQUFNLENBQUNpQixPQUFQO0FBRUEsU0FBT25ELE1BQVA7QUFDRCxDQWxFRDs7QUFvRWUsU0FBU29ELGVBQVQsR0FBMkI7QUFDeEMsUUFBTUMsSUFBSSxHQUFHQyxxREFBSSxFQUFqQjtBQUVBLFNBQU87QUFDTHZCLE9BQUcsQ0FBQ3dCLGdCQUFELEVBQW1CO0FBQ3BCLGFBQU90QixPQUFPLENBQUNvQixJQUFJLENBQUNHLFdBQUwsQ0FBaUJELGdCQUFqQixDQUFELENBQWQ7QUFDRCxLQUhJOztBQUlMRSxVQUFNLEdBQUc7QUFDUCxhQUFPO0FBQ0xKLFlBREs7O0FBRUxLLGFBQUssR0FBRztBQUNOTCxjQUFJLENBQUNLLEtBQUw7QUFDQUMsa0VBQW1CLENBQUNDLEtBQXBCO0FBQ0FDLGlFQUFrQixDQUFDRCxLQUFuQjtBQUNEOztBQU5JLE9BQVA7QUFRRDs7QUFiSSxHQUFQO0FBZUQ7QUFBQSxDOzs7Ozs7Ozs7Ozs7QUM3RkQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRWUsU0FBU04sSUFBVCxHQUFnQjtBQUM3QixNQUFJUSxJQUFJLEdBQUdDLGVBQWUsRUFBMUI7QUFDQSxNQUFJQyxHQUFHLEdBQUcsQ0FBVjs7QUFFQSxXQUFTQyxLQUFULEdBQWlCO0FBQ2YsV0FBTyxNQUFPLEVBQUVELEdBQWhCO0FBQ0Q7O0FBQUE7O0FBQ0QsV0FBU0UsYUFBVCxDQUF1QmhDLE1BQXZCLEVBQStCaUMsVUFBL0IsRUFBMkM7QUFDekNBLGNBQVUsQ0FBQzVDLFVBQVgsQ0FBc0JXLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlakIsRUFBckMsRUFBeUNZLE1BQU0sQ0FBQ0ssT0FBUCxDQUFlZixJQUFmLEVBQXpDO0FBQ0FVLFVBQU0sQ0FBQ0ssT0FBUCxHQUFpQjRCLFVBQWpCO0FBQ0EsV0FBT2pDLE1BQVA7QUFDRDs7QUFDRCxXQUFTa0MsUUFBVCxDQUFrQkMsVUFBbEIsRUFBOEJGLFVBQTlCLEVBQTBDO0FBQ3hDLFFBQUlFLFVBQVUsSUFBSUEsVUFBVSxDQUFDeEQsSUFBWCxLQUFvQnNELFVBQVUsQ0FBQ3RELElBQWpELEVBQXVEO0FBQ3JELGFBQU95RCxzREFBSyxDQUFDRCxVQUFVLENBQUN6RSxLQUFaLEVBQW1CdUUsVUFBVSxDQUFDdkUsS0FBOUIsQ0FBWjtBQUNEOztBQUNELFdBQU8sS0FBUDtBQUNEOztBQUNELFdBQVNtRSxlQUFULENBQXlCeEIsT0FBekIsRUFBa0M7QUFDaEMsUUFBSUEsT0FBSixFQUFhO0FBQUVBLGFBQU8sQ0FBQ2hCLFVBQVIsQ0FBbUIwQyxLQUFLLEVBQXhCO0FBQThCOztBQUM3QyxXQUFPO0FBQ0wxQixhQURLO0FBRUx0QixjQUFRLEVBQUUsRUFGTDtBQUdMc0QsWUFBTSxFQUFFLENBSEg7O0FBSUxoRCxnQkFBVSxHQUFHO0FBQ1gsYUFBS2dELE1BQUwsR0FBYyxDQUFkO0FBQ0QsT0FOSTs7QUFPTHpCLGtCQUFZLENBQUNxQixVQUFELEVBQWE7QUFDdkIsY0FBTUssU0FBUyxHQUFHLEtBQUt2RCxRQUFMLENBQWUsS0FBS3NELE1BQXBCLENBQWxCLENBRHVCLENBR3ZCOztBQUNBLFlBQUlDLFNBQVMsSUFBSUosUUFBUSxDQUFDSSxTQUFTLENBQUNqQyxPQUFYLEVBQW9CNEIsVUFBcEIsQ0FBekIsRUFBMEQ7QUFDeEQsZUFBS0ksTUFBTCxJQUFlLENBQWY7QUFDQSxpQkFBT0wsYUFBYSxDQUFDTSxTQUFELEVBQVlMLFVBQVosQ0FBcEI7QUFDRCxTQVBzQixDQVN2Qjs7O0FBQ0EsY0FBTU0sWUFBWSxHQUFHVixlQUFlLENBQUNJLFVBQUQsQ0FBcEM7QUFFQSxhQUFLbEQsUUFBTCxDQUFlLEtBQUtzRCxNQUFwQixJQUErQkUsWUFBL0I7QUFDQSxhQUFLRixNQUFMLElBQWUsQ0FBZjtBQUNBLGVBQU9FLFlBQVA7QUFDRCxPQXRCSTs7QUF1Qkx0QixhQUFPLEdBQUc7QUFDUjtBQUNBLFlBQUksS0FBS29CLE1BQUwsR0FBYyxLQUFLdEQsUUFBTCxDQUFjUixNQUFoQyxFQUF3QztBQUN0QyxlQUFLUSxRQUFMLENBQWN5RCxNQUFkLENBQXFCLEtBQUtILE1BQTFCLEVBQWtDLEtBQUt0RCxRQUFMLENBQWNSLE1BQWQsR0FBdUIsS0FBSzhELE1BQTlEO0FBQ0Q7QUFDRjs7QUE1QkksS0FBUDtBQThCRDs7QUFFRCxTQUFPO0FBQ0xmLGVBQVcsQ0FBQ2pCLE9BQUQsRUFBVTtBQUNuQixhQUFPdUIsSUFBSSxHQUFJTSxRQUFRLENBQUNOLElBQUksQ0FBQ3ZCLE9BQU4sRUFBZUEsT0FBZixDQUFSLEdBQ2IyQixhQUFhLENBQUNKLElBQUQsRUFBT3ZCLE9BQVAsQ0FEQSxHQUVid0IsZUFBZSxDQUFDeEIsT0FBRCxDQUZqQjtBQUdELEtBTEk7O0FBTUxtQixTQUFLLEdBQUc7QUFDTkksVUFBSSxHQUFHQyxlQUFlLEVBQXRCO0FBQ0FDLFNBQUcsR0FBRyxDQUFOO0FBQ0QsS0FUSTs7QUFVTFcsb0JBQWdCLEdBQUc7QUFDakIsYUFBT1gsR0FBUDtBQUNELEtBWkk7O0FBYUxZLFlBQVEsR0FBRztBQUNULGFBQVEsU0FBU0MsUUFBVCxDQUFrQjNDLE1BQWxCLEVBQTBCNEMsR0FBRyxHQUFHLENBQWhDLEVBQW1DO0FBQ3pDLFlBQUlDLEdBQUcsR0FBRyxFQUFWO0FBRUFBLFdBQUcsQ0FBQ3hFLElBQUosQ0FBUztBQUFFdUUsYUFBRjtBQUFPakUsY0FBSSxFQUFFcUIsTUFBTSxDQUFDSyxPQUFQLENBQWUxQixJQUE1QjtBQUFrQ1csY0FBSSxFQUFFVSxNQUFNLENBQUNLLE9BQVAsQ0FBZWYsSUFBZixFQUF4QztBQUErREYsWUFBRSxFQUFFWSxNQUFNLENBQUNLLE9BQVAsQ0FBZWpCO0FBQWxGLFNBQVQ7O0FBQ0EsWUFBSVksTUFBTSxDQUFDakIsUUFBUCxDQUFnQlIsTUFBaEIsR0FBeUIsQ0FBN0IsRUFBZ0M7QUFDOUJ5QixnQkFBTSxDQUFDakIsUUFBUCxDQUFnQmIsT0FBaEIsQ0FBd0I0RSxLQUFLLElBQUk7QUFDL0JELGVBQUcsQ0FBQ3hFLElBQUosQ0FBU3NFLFFBQVEsQ0FBQ0csS0FBRCxFQUFRRixHQUFHLEdBQUcsQ0FBZCxDQUFqQjtBQUNELFdBRkQ7QUFHRDs7QUFDRCxlQUFPQyxHQUFQO0FBQ0QsT0FWTSxDQVVKakIsSUFWSSxDQUFQO0FBV0Q7O0FBekJJLEdBQVA7QUEyQkQ7QUFBQSxDOzs7Ozs7Ozs7Ozs7QUNsRkQ7QUFBQTtBQUFlLFNBQVNtQixvQkFBVCxDQUE4QkMsV0FBOUIsRUFBMkM7QUFDeEQsU0FBTyxDQUFDO0FBQUVDLFFBQUY7QUFBUUMsV0FBUjtBQUFpQkM7QUFBakIsR0FBRCxLQUFrQztBQUN2QyxVQUFNLEdBQUlDLE9BQUosSUFBZ0JELFNBQVMsQ0FBQ0gsV0FBRCxDQUEvQjtBQUVBSSxXQUFPLENBQUNILElBQUQsRUFBT0MsT0FBUCxDQUFQO0FBQ0QsR0FKRDtBQUtELEM7Ozs7Ozs7Ozs7OztBQ05EO0FBQUE7QUFBZSxTQUFTRyxzQkFBVCxDQUFnQ0wsV0FBaEMsRUFBNkM7QUFDMUQsU0FBTyxDQUFDO0FBQUVDLFFBQUY7QUFBUUssZUFBUjtBQUFxQkg7QUFBckIsR0FBRCxLQUFzQztBQUMzQyxVQUFNLENBQUVwRSxRQUFGLElBQWV1RSxXQUFXLEVBQWhDO0FBQ0EsVUFBTSxDQUFFQyxTQUFGLElBQWdCSixTQUFTLENBQUNILFdBQUQsQ0FBL0I7QUFFQU8sYUFBUyxDQUFDTixJQUFELEVBQU9sRSxRQUFQLENBQVQ7QUFDRCxHQUxEO0FBTUQ7QUFBQSxDOzs7Ozs7Ozs7Ozs7QUNQRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFZSxTQUFTeUUscUJBQVQsQ0FBK0JuRCxPQUEvQixFQUF3QztBQUNyRCxTQUFPO0FBQ0xvRCxXQUFPLEVBQUVWLHdEQUFvQixDQUFDMUMsT0FBRCxDQUR4QjtBQUVMcUQsYUFBUyxFQUFFTCwwREFBc0IsQ0FBQ2hELE9BQUQ7QUFGNUIsR0FBUDtBQUlELEM7Ozs7Ozs7Ozs7OztBQ1JEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRWUsU0FBU0YsZUFBVCxDQUF5QkgsTUFBekIsRUFBaUNJLFlBQWpDLEVBQStDSCxLQUEvQyxFQUFzREYsT0FBdEQsRUFBK0Q7QUFDNUUsUUFBTTtBQUFFTTtBQUFGLE1BQWNMLE1BQXBCO0FBQ0EsUUFBTTJELFVBQVUsR0FBR0MsMkRBQW9CLENBQUN2RCxPQUFELENBQXZDO0FBQ0EsUUFBTWlELFdBQVcsR0FBR08sNERBQXFCLENBQUN4RCxPQUFELEVBQVVELFlBQVYsQ0FBekM7QUFDQSxRQUFNLENBQUUwRCxVQUFGLEVBQWNDLG9CQUFkLElBQXVDQywyREFBb0IsQ0FBQzNELE9BQUQsRUFBVUosS0FBVixDQUFqRTtBQUNBLFFBQU1rRCxTQUFTLEdBQUcxQiwwREFBbUIsQ0FBQ3BCLE9BQUQsQ0FBckM7QUFDQSxRQUFNNEQsVUFBVSxHQUFHQywyREFBb0IsQ0FBQzdELE9BQUQsQ0FBdkM7QUFDQSxRQUFNOEQsUUFBUSxHQUFHeEMseURBQWtCLENBQUN0QixPQUFELEVBQVUsTUFBTU4sT0FBTyxDQUFDQyxNQUFELEVBQVNDLEtBQVQsQ0FBdkIsQ0FBbkM7QUFFQSxTQUFPLEVBQ0wsR0FBRzhELG9CQURFO0FBRUxULGVBRks7QUFHTEssY0FISztBQUlMRyxjQUpLO0FBS0xYLGFBTEs7QUFNTGdCLFlBTks7QUFPTEYsY0FQSztBQVFMRyxlQUFXLEVBQUUsTUFBTVoseURBQXFCLENBQUNuRCxPQUFEO0FBUm5DLEdBQVA7QUFVRDtBQUFBLEM7Ozs7Ozs7Ozs7OztBQzNCRDtBQUFBLE1BQU13RCxxQkFBcUIsR0FBRyxDQUFDeEQsT0FBRCxFQUFVRCxZQUFWLEtBQTJCLE1BQU07QUFDN0RDLFNBQU8sQ0FBQ1Ysa0NBQVIsQ0FBMkMsS0FBM0M7QUFDQSxTQUFPLENBQUVTLFlBQUYsRUFBZ0JDLE9BQU8sQ0FBQ3RCLFFBQXhCLENBQVA7QUFDRCxDQUhEOztBQUtlOEUsb0ZBQWYsRTs7Ozs7Ozs7Ozs7O0FDTEE7QUFBQTtBQUFlLFNBQVNELG9CQUFULENBQThCdkQsT0FBOUIsRUFBdUM7QUFDcEQsU0FBTyxNQUFNLENBQUVBLE9BQUYsQ0FBYjtBQUNELEM7Ozs7Ozs7Ozs7OztBQ0ZEO0FBQUE7QUFBQTtBQUVBLE1BQU1nRSxXQUFXLEdBQUcsQ0FBQ0MsSUFBRCxFQUFPQyxVQUFQLEVBQW1CdEUsS0FBbkIsRUFBMEJ1RSxLQUExQixLQUFvQztBQUN0RCxNQUFJRCxVQUFVLEdBQUcsQ0FBakIsRUFBb0I7QUFDbEIsVUFBTUMsS0FBTjtBQUNEOztBQUNELFFBQU1DLE1BQU0sR0FBR3hFLEtBQUssQ0FBRXNFLFVBQUYsQ0FBcEI7QUFDQSxRQUFNRyxPQUFPLEdBQUdELE1BQU0sQ0FBQ0UsY0FBUCxHQUF3QkYsTUFBTSxDQUFDRSxjQUFQLENBQXNCTCxJQUF0QixDQUF4QixHQUFzRCxJQUF0RTs7QUFFQSxNQUFJSSxPQUFPLEtBQUssSUFBaEIsRUFBc0I7QUFDcEIsV0FBT0EsT0FBTyxDQUFDOUUsS0FBZjtBQUNEOztBQUNELFNBQU95RSxXQUFXLENBQUNDLElBQUQsRUFBT0MsVUFBVSxHQUFHLENBQXBCLEVBQXVCdEUsS0FBdkIsRUFBOEJ1RSxLQUE5QixDQUFsQjtBQUNELENBWEQ7O0FBYUEsU0FBU0ksY0FBVCxDQUF3QnZFLE9BQXhCLEVBQWlDSixLQUFqQyxFQUF3QztBQUN0QyxRQUFNO0FBQUVsQztBQUFGLE1BQW1Cc0MsT0FBTyxDQUFDM0MsS0FBakM7QUFDQSxRQUFNbUgsSUFBSSxHQUFHLEVBQWI7O0FBRUEsTUFBSTlHLFlBQVksQ0FBQ1EsTUFBYixLQUF3QixDQUE1QixFQUErQjtBQUM3QixXQUFPLEVBQVA7QUFDRDs7QUFFRFIsY0FBWSxDQUFDRyxPQUFiLENBQXFCQyxRQUFRLElBQUk7QUFDL0IwRyxRQUFJLENBQUMxRyxRQUFELENBQUosR0FBaUJrRyxXQUFXLENBQzFCbEcsUUFEMEIsRUFFMUI4QixLQUFLLENBQUMxQixNQUFOLEdBQWUsQ0FGVyxFQUcxQjBCLEtBSDBCLEVBSTFCLElBQUk2RSxLQUFKLENBQ0csSUFBSTNHLFFBQVUsd0JBQXdCa0MsT0FBTyxDQUFDMUIsSUFBTSxpQ0FBckQsR0FDQSxDQUFFLEdBQUdzQixLQUFMLEVBQVlJLE9BQVosRUFBc0IwRSxHQUF0QixDQUEwQixDQUFDO0FBQUVwRztBQUFGLEtBQUQsS0FBZSxNQUFNQSxJQUFNLEdBQXJELEVBQXlEcUcsSUFBekQsQ0FBOEQsSUFBOUQsQ0FGRixDQUowQixDQUE1QjtBQVNELEdBVkQ7QUFXQSxTQUFPSCxJQUFQO0FBQ0Q7O0FBQUE7QUFFYyxTQUFTYixvQkFBVCxDQUE4QjNELE9BQTlCLEVBQXVDSixLQUF2QyxFQUE4QztBQUMzRCxNQUFJeUUsT0FBSjtBQUNBLFFBQU1YLG9CQUFvQixHQUFHYSxjQUFjLENBQUN2RSxPQUFELEVBQVVKLEtBQVYsQ0FBM0M7O0FBRUFJLFNBQU8sQ0FBQ3NFLGNBQVIsR0FBMEJ4RyxRQUFELElBQWM7QUFDckMsUUFBSWtDLE9BQU8sQ0FBQzNDLEtBQVIsQ0FBY00sY0FBZCxJQUFnQ3FDLE9BQU8sQ0FBQzNDLEtBQVIsQ0FBY00sY0FBZCxLQUFpQ0csUUFBckUsRUFBK0U7QUFDN0UsYUFBTztBQUFFeUIsYUFBSyxFQUFFOEU7QUFBVCxPQUFQO0FBQ0Q7O0FBQ0QsV0FBTyxJQUFQO0FBQ0QsR0FMRDs7QUFPQSxTQUFPLENBQ0pPLFlBQUQsSUFBa0I7QUFDaEIsUUFBSSxPQUFPQSxZQUFQLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3ZDUCxhQUFPLEdBQUdPLFlBQVY7QUFDRDs7QUFDRCxXQUFPLENBQ0xDLFFBQVEsSUFBSTtBQUNWUixhQUFPLEdBQUdRLFFBQVY7QUFDRCxLQUhJLENBQVA7QUFLRCxHQVZJLEVBV0xuQixvQkFYSyxDQUFQO0FBYUQ7QUFBQSxDOzs7Ozs7Ozs7Ozs7QUM3REQ7QUFBQTtBQUFBLElBQUlvQixXQUFXLEdBQUcsRUFBbEI7O0FBRUEsTUFBTTVCLFNBQVMsR0FBRyxDQUFDbEQsT0FBRCxFQUFVNEMsSUFBVixFQUFnQm1DLFFBQWhCLEtBQTZCO0FBQzdDLE1BQUksQ0FBQ0QsV0FBVyxDQUFDbEMsSUFBRCxDQUFoQixFQUF3QmtDLFdBQVcsQ0FBQ2xDLElBQUQsQ0FBWCxHQUFvQixFQUFwQjtBQUN4QmtDLGFBQVcsQ0FBQ2xDLElBQUQsQ0FBWCxDQUFrQjVDLE9BQU8sQ0FBQ2pCLEVBQTFCLElBQWdDZ0csUUFBaEM7QUFDQSxTQUFPLE1BQU07QUFDWCxXQUFPRCxXQUFXLENBQUNsQyxJQUFELENBQVgsQ0FBa0I1QyxPQUFPLENBQUNqQixFQUExQixDQUFQO0FBQ0QsR0FGRDtBQUdELENBTkQ7O0FBT0EsTUFBTWdFLE9BQU8sR0FBRyxDQUFDL0MsT0FBRCxFQUFVNEMsSUFBVixFQUFnQkMsT0FBaEIsS0FBNEI7QUFDMUMsTUFBSSxDQUFDaUMsV0FBVyxDQUFDbEMsSUFBRCxDQUFoQixFQUF3QjtBQUN4QnJGLFFBQU0sQ0FBQ0MsSUFBUCxDQUFZc0gsV0FBVyxDQUFDbEMsSUFBRCxDQUF2QixFQUErQi9FLE9BQS9CLENBQXVDa0IsRUFBRSxJQUFJO0FBQzNDK0YsZUFBVyxDQUFDbEMsSUFBRCxDQUFYLENBQWtCN0QsRUFBbEIsRUFBc0I4RCxPQUF0QixFQUErQjdDLE9BQS9CO0FBQ0QsR0FGRDtBQUdELENBTEQ7O0FBT2UsU0FBU29CLG1CQUFULENBQTZCcEIsT0FBN0IsRUFBc0M7QUFDbkQsU0FBUWdGLGFBQUQsSUFBb0IsQ0FDekI7QUFDQSxHQUFDLEdBQUdDLE1BQUosS0FBZS9CLFNBQVMsQ0FBQzhCLGFBQWEsSUFBSWhGLE9BQWxCLEVBQTJCLEdBQUdpRixNQUE5QixDQUZDLEVBR3pCO0FBQ0EsR0FBQyxHQUFHQSxNQUFKLEtBQWVsQyxPQUFPLENBQUNpQyxhQUFhLElBQUloRixPQUFsQixFQUEyQixHQUFHaUYsTUFBOUIsQ0FKRyxFQUt6QjtBQUNBSCxhQU55QixDQUEzQjtBQVFEOztBQUVEMUQsbUJBQW1CLENBQUNDLEtBQXBCLEdBQTRCLE1BQU07QUFDaEN5RCxhQUFXLEdBQUcsRUFBZDtBQUNELENBRkQsQzs7Ozs7Ozs7Ozs7O0FDM0JBO0FBQUE7QUFBZSxTQUFTakIsb0JBQVQsQ0FBOEI3RCxPQUE5QixFQUF1QyxDQUVyRCxDOzs7Ozs7Ozs7Ozs7QUNGRDtBQUFBO0FBQUE7QUFFQSxNQUFNa0YsT0FBTyxHQUFHO0FBQ2RDLFVBQVEsRUFBRSxFQURJOztBQUVkQyxLQUFHLENBQUNwRixPQUFELEVBQVU7QUFDWCxRQUFJLEtBQUttRixRQUFMLENBQWNuRixPQUFPLENBQUNqQixFQUF0QixDQUFKLEVBQStCO0FBQzdCLGFBQU8sS0FBS29HLFFBQUwsQ0FBY25GLE9BQU8sQ0FBQ2pCLEVBQXRCLENBQVA7QUFDRDs7QUFDRCxXQUFPLEtBQUtvRyxRQUFMLENBQWNuRixPQUFPLENBQUNqQixFQUF0QixJQUE0QjtBQUFFc0csWUFBTSxFQUFFLEVBQVY7QUFBY0MsY0FBUSxFQUFFO0FBQXhCLEtBQW5DO0FBQ0Q7O0FBUGEsQ0FBaEI7QUFVZSxTQUFTaEUsa0JBQVQsQ0FBNEJ0QixPQUE1QixFQUFxQ3VGLEtBQXJDLEVBQTRDO0FBQ3pELFFBQU1DLE9BQU8sR0FBR04sT0FBTyxDQUFDRSxHQUFSLENBQVlwRixPQUFaLENBQWhCO0FBRUEsU0FBUXlGLFlBQUQsSUFBa0I7QUFDdkIsUUFBSUMsS0FBSixDQUR1QixDQUd2Qjs7QUFDQSxRQUFJMUYsT0FBTyxDQUFDZixJQUFSLE9BQW1CLENBQXZCLEVBQTBCO0FBQ3hCdUcsYUFBTyxDQUFDSCxNQUFSLENBQWVySCxJQUFmLENBQW9CeUgsWUFBcEI7QUFDQUMsV0FBSyxHQUFHRixPQUFPLENBQUNILE1BQVIsQ0FBZW5ILE1BQWYsR0FBd0IsQ0FBaEMsQ0FGd0IsQ0FJMUI7QUFDQyxLQUxELE1BS087QUFDTHdILFdBQUssR0FBR0YsT0FBTyxDQUFDRixRQUFoQjtBQUNBRSxhQUFPLENBQUNGLFFBQVIsR0FBbUJJLEtBQUssR0FBR0YsT0FBTyxDQUFDSCxNQUFSLENBQWVuSCxNQUFmLEdBQXdCLENBQWhDLEdBQW9Dc0gsT0FBTyxDQUFDRixRQUFSLEdBQW1CLENBQXZELEdBQTJELENBQTlFO0FBQ0Q7O0FBRUQsV0FBTyxDQUNMRSxPQUFPLENBQUNILE1BQVIsQ0FBZUssS0FBZixDQURLLEVBRUxDLFFBQVEsSUFBSTtBQUNWSCxhQUFPLENBQUNILE1BQVIsQ0FBZUssS0FBZixJQUF3QkMsUUFBeEI7O0FBQ0EsVUFBSSxDQUFDM0YsT0FBTyxDQUFDWCxTQUFSLEVBQUwsRUFBMEI7QUFDeEJrRyxhQUFLO0FBQ047O0FBQ0QsYUFBT0ksUUFBUDtBQUNELEtBUkksQ0FBUDtBQVVELEdBeEJEO0FBeUJEOztBQUVEckUsa0JBQWtCLENBQUNELEtBQW5CLEdBQTJCLE1BQU07QUFDL0I2RCxTQUFPLENBQUNDLFFBQVIsR0FBbUIsRUFBbkI7QUFDRCxDQUZELEM7Ozs7Ozs7Ozs7OztBQzFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUEsTUFBTVMsU0FBUyxHQUFHL0UsMERBQWUsRUFBakM7O0FBRUEsU0FBU2dGLENBQVQsQ0FBV3hILElBQVgsRUFBaUJoQixLQUFqQixFQUF3QixHQUFHcUIsUUFBM0IsRUFBcUM7QUFDbkMsU0FBT29ILDJEQUFVLENBQUN6SCxJQUFELEVBQU9oQixLQUFQLEVBQWNxQixRQUFkLENBQWpCO0FBQ0Q7O0FBQ0QsU0FBU2MsR0FBVCxDQUFhUSxPQUFiLEVBQXNCO0FBQ3BCLE1BQUksQ0FBQ00scUVBQWMsQ0FBQ04sT0FBRCxDQUFuQixFQUE4QjtBQUM1QixVQUFNLElBQUl5RSxLQUFKLENBQVcsbUNBQW1DekUsT0FBTyxDQUFDeEIsUUFBUixFQUFvQixVQUFsRSxDQUFOO0FBQ0Q7O0FBQ0QsU0FBT29ILFNBQVMsQ0FBQ3BHLEdBQVYsQ0FBY1EsT0FBZCxDQUFQO0FBQ0Q7O0FBQ0QsTUFBTStGLFFBQVEsR0FBRyxNQUFNLENBQUUsQ0FBekI7Ozs7Ozs7Ozs7Ozs7O0FDZkE7QUFBQTtBQUFlLFNBQVN6RixjQUFULENBQXdCTixPQUF4QixFQUFpQztBQUM5QyxTQUFPQSxPQUFPLElBQUlBLE9BQU8sQ0FBQ3JCLE9BQVIsS0FBb0IsSUFBdEM7QUFDRDtBQUFBLEM7Ozs7Ozs7Ozs7O0FDRkQ7QUFDQTtBQUNBOztBQUVBLGlDOzs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUM7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QywrQkFBK0I7QUFDNUU7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUM7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7Ozs7Ozs7QUNKQSxxQkFBcUIsbUJBQU8sQ0FBQyxpRkFBa0I7O0FBRS9DO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEsK0I7Ozs7Ozs7Ozs7O0FDckJBLHFCQUFxQixtQkFBTyxDQUFDLGlGQUFrQjs7QUFFL0MsMkJBQTJCLG1CQUFPLENBQUMsNkZBQXdCOztBQUUzRCxzQkFBc0IsbUJBQU8sQ0FBQyxtRkFBbUI7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQSxnQzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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RCxTQUFTLEVBQUk7QUFDWCxRQUFNbEIsUUFBUSxHQUFHeUIsS0FBSyxDQUFDMUMsR0FBTixDQUFVLFVBQUMyQyxJQUFELEVBQU8zQixLQUFQLEVBQWlCO0FBQzFDLFVBQUlBLEtBQUssS0FBS21CLFNBQWQsRUFBeUI7QUFDdkIsOEZBQ0tRLElBREw7QUFFRUMsbUJBQVMsRUFBRSxDQUFDRCxJQUFJLENBQUNDO0FBRm5CO0FBSUQ7O0FBQ0QsYUFBT0QsSUFBUDtBQUNELEtBUmdCLENBQWpCO0FBVUFNLFlBQVEsQ0FBQ2hDLFFBQUQsQ0FBUjtBQUNBaUMsY0FBVSxDQUFDakMsUUFBRCxDQUFWO0FBQ0QsR0FmTCxDQURGLEVBbUJFLCtDQUFDLFNBQUQ7QUFBVyxRQUFJLEVBQUM7QUFBaEIsS0FFSSxVQUFBNEIsS0FBSyxFQUFJO0FBQ1BILFNBQUssQ0FBQ3BKLElBQU4sQ0FBV3dKLElBQUksQ0FBQztBQUFFRCxXQUFLLEVBQUxBO0FBQUYsS0FBRCxDQUFmO0FBQ0FJLFlBQVEsQ0FBQ1AsS0FBRCxDQUFSO0FBQ0FRLGNBQVUsQ0FBQ1IsS0FBRCxDQUFWO0FBQ0QsR0FOTCxDQW5CRixDQURGO0FBK0JELEM7Ozs7Ozs7Ozs7OztBQy9DRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTUyxHQUFULEdBQWU7QUFDYixTQUNFLCtDQUFDLDZDQUFELFFBQ0UsK0NBQUMsaURBQUQsT0FERixFQUVFLCtDQUFDLDhDQUFEO0FBQU8sV0FBTyxFQUFDO0FBQWYsS0FDRSwrQ0FBQyxpREFBRDtBQUFVLFVBQU07QUFBaEIsSUFERixDQUZGLENBREY7QUFRRDs7QUFBQTtBQUVEckksZ0RBQUcsQ0FBQywrQ0FBQyxHQUFELE9BQUQsQ0FBSCxDIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBrZXlMaXN0ID0gT2JqZWN0LmtleXM7XG52YXIgaGFzUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXF1YWwoYSwgYikge1xuICBpZiAoYSA9PT0gYikgcmV0dXJuIHRydWU7XG5cbiAgaWYgKGEgJiYgYiAmJiB0eXBlb2YgYSA9PSAnb2JqZWN0JyAmJiB0eXBlb2YgYiA9PSAnb2JqZWN0Jykge1xuICAgIHZhciBhcnJBID0gaXNBcnJheShhKVxuICAgICAgLCBhcnJCID0gaXNBcnJheShiKVxuICAgICAgLCBpXG4gICAgICAsIGxlbmd0aFxuICAgICAgLCBrZXk7XG5cbiAgICBpZiAoYXJyQSAmJiBhcnJCKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggIT0gYi5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgICAgaWYgKCFlcXVhbChhW2ldLCBiW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGFyckEgIT0gYXJyQikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIGRhdGVBID0gYSBpbnN0YW5jZW9mIERhdGVcbiAgICAgICwgZGF0ZUIgPSBiIGluc3RhbmNlb2YgRGF0ZTtcbiAgICBpZiAoZGF0ZUEgIT0gZGF0ZUIpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoZGF0ZUEgJiYgZGF0ZUIpIHJldHVybiBhLmdldFRpbWUoKSA9PSBiLmdldFRpbWUoKTtcblxuICAgIHZhciByZWdleHBBID0gYSBpbnN0YW5jZW9mIFJlZ0V4cFxuICAgICAgLCByZWdleHBCID0gYiBpbnN0YW5jZW9mIFJlZ0V4cDtcbiAgICBpZiAocmVnZXhwQSAhPSByZWdleHBCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHJlZ2V4cEEgJiYgcmVnZXhwQikgcmV0dXJuIGEudG9TdHJpbmcoKSA9PSBiLnRvU3RyaW5nKCk7XG5cbiAgICB2YXIga2V5cyA9IGtleUxpc3QoYSk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG5cbiAgICBpZiAobGVuZ3RoICE9PSBrZXlMaXN0KGIpLmxlbmd0aClcbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tICE9PSAwOylcbiAgICAgIGlmICghaGFzUHJvcC5jYWxsKGIsIGtleXNbaV0pKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoIWVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGEhPT1hICYmIGIhPT1iO1xufTtcbiIsImZ1bmN0aW9uIHBhcnNlUHJvcHMocHJvcHMpIHtcbiAgY29uc3QgcHJvcE5hbWVzID0gcHJvcHMgPyBPYmplY3Qua2V5cyhwcm9wcykgOiBbXTtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIGRlcGVuZGVuY2llczogW10sXG4gICAgZXhwb3J0c0tleXdvcmQ6IHVuZGVmaW5lZFxuICB9O1xuXG4gIHByb3BOYW1lcy5mb3JFYWNoKHByb3BOYW1lID0+IHtcbiAgICBpZiAocHJvcE5hbWUuY2hhckF0KDApID09PSAnJCcpIHtcbiAgICAgIHJlc3VsdC5kZXBlbmRlbmNpZXMucHVzaChwcm9wTmFtZS5zdWJzdHIoMSwgcHJvcE5hbWUubGVuZ3RoKSk7XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gJ2V4cG9ydHMnKSB7XG4gICAgICByZXN1bHQuZXhwb3J0c0tleXdvcmQgPSBwcm9wcy5leHBvcnRzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRbcHJvcE5hbWVdID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmZ1bmN0aW9uIGdldEZ1bmNOYW1lKGZ1bmMpIHtcbiAgaWYgKGZ1bmMubmFtZSkgcmV0dXJuIGZ1bmMubmFtZTtcbiAgbGV0IHJlc3VsdCA9IC9eZnVuY3Rpb25cXHMrKFtcXHdcXCRdKylcXHMqXFwoLy5leGVjKGZ1bmMudG9TdHJpbmcoKSk7XG5cbiAgcmV0dXJuIHJlc3VsdCA/IHJlc3VsdFsgMSBdIDogJ3Vua25vd24nO1xufTtcblxuY29uc3QgY3JlYXRlRWxlbWVudCA9IChmdW5jLCBwcm9wcywgY2hpbGRyZW4pID0+ICh7XG4gIF9fYWN0bWw6IHRydWUsXG4gIF9fdXNlZDogMCxcbiAgX19ydW5uaW5nOiBmYWxzZSxcbiAgX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5OiB0cnVlLFxuICBpZDogbnVsbCxcbiAgcHJvcHM6IHBhcnNlUHJvcHMocHJvcHMpLFxuICBuYW1lOiBnZXRGdW5jTmFtZShmdW5jKSxcbiAgY2hpbGRyZW4sXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uIChpZCwgdXNlZCA9IDApIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5fX3VzZWQgPSB1c2VkO1xuICAgIHRoaXMuX19ydW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB0cnVlO1xuICB9LFxuICBtZXJnZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgfSxcbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfSxcbiAgdXNlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fX3VzZWQ7XG4gIH0sXG4gIGlzUnVubmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3J1bm5pbmc7XG4gIH0sXG4gIHNob3VsZFByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5O1xuICAgIH1cbiAgICB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSA9IHZhbHVlO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgYXN5bmMgcnVuKG90aGVyUHJvcHMpIHtcbiAgICB0aGlzLl9fcnVubmluZyA9IHRydWU7XG4gICAgdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB0cnVlO1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZnVuYyh7XG4gICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgLi4ub3RoZXJQcm9wc1xuICAgIH0pO1xuXG4gICAgdGhpcy5fX3VzZWQgKz0gMTtcbiAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFbGVtZW50O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbmltcG9ydCBpc0FjdE1MRWxlbWVudCBmcm9tICcuL3V0aWxzL2lzQWN0TUxFbGVtZW50JztcbmltcG9ydCBUcmVlIGZyb20gJy4vVHJlZSc7XG5pbXBvcnQgY3JlYXRlVXNlUHViU3ViSG9vayBmcm9tICcuL2hvb2tzL3VzZVB1YlN1Yic7XG5pbXBvcnQgY3JlYXRlVXNlU3RhdGVIb29rIGZyb20gJy4vaG9va3MvdXNlU3RhdGUnO1xuaW1wb3J0IGluaXRpYWxpemVIb29rcyBmcm9tICcuL2hvb2tzJztcblxuY29uc3QgcHJvY2VzcyA9IGFzeW5jIChicmFuY2gsIHN0YWNrID0gW10pID0+IHtcbiAgYnJhbmNoLmluaXRpYWxpemUoKTtcblxuICBjb25zdCBob29rc1Byb3BzID0gaW5pdGlhbGl6ZUhvb2tzKGJyYW5jaCwgY2FsbENoaWxkcmVuLCBzdGFjaywgcHJvY2Vzcyk7XG4gIGxldCByZXN1bHQgPSBhd2FpdCBicmFuY2guZWxlbWVudC5ydW4oaG9va3NQcm9wcyk7XG4gIGxldCBnZW5SZXN1bHQsIHRvR2VuVmFsdWU7XG5cbiAgLy8gdXBkYXRpbmcgdGhlIHN0YWNrXG4gIHN0YWNrLnB1c2goYnJhbmNoLmVsZW1lbnQpO1xuXG4gIC8vIGhhbmRsaW5nIGEgcHJvbWlzZVxuICBpZiAocmVzdWx0ICYmIHJlc3VsdC50aGVuKSB7XG4gICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0O1xuXG4gIC8vIGhhbmRsaW5nIGEgZ2VuZXJhdG9yXG4gIH0gZWxzZSBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGdlblJlc3VsdCA9IHJlc3VsdC5uZXh0KCk7XG4gICAgd2hpbGUgKCFnZW5SZXN1bHQuZG9uZSkge1xuICAgICAgaWYgKGlzQWN0TUxFbGVtZW50KGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgdG9HZW5WYWx1ZSA9IGF3YWl0IHByb2Nlc3MoYnJhbmNoLmFkZFN1YkJyYW5jaChnZW5SZXN1bHQudmFsdWUpLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBnZW5SZXN1bHQgPSByZXN1bHQubmV4dCh0b0dlblZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGlzQWN0TUxFbGVtZW50KGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHByb2Nlc3MoYnJhbmNoLmFkZFN1YkJyYW5jaChnZW5SZXN1bHQudmFsdWUpLCBzdGFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGdlblJlc3VsdC52YWx1ZTtcbiAgICB9XG5cbiAgLy8gaGFuZGxpbmcgYW5vdGhlciBBY3RNTCBlbGVtZW50XG4gIH0gZWxzZSBpZiAoaXNBY3RNTEVsZW1lbnQocmVzdWx0KSkge1xuICAgIHJlc3VsdCA9IGF3YWl0IHByb2Nlc3MoYnJhbmNoLmFkZFN1YkJyYW5jaChyZXN1bHQpLCBzdGFjayk7XG4gIH1cblxuICAvLyBoYW5kbGluZyBjaGlsZHJlblxuICBhc3luYyBmdW5jdGlvbiBjYWxsQ2hpbGRyZW4oLi4uYWRkaXRpb25hbFByb3BzKSB7XG4gICAgY29uc3QgY2hpbGRyZW5SZXN1bHQgPSBbXTtcbiAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSBicmFuY2guZWxlbWVudDtcblxuICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpc0FjdE1MRWxlbWVudChjaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICBjaGlsZHJlbltpXS5tZXJnZVByb3BzKC4uLmFkZGl0aW9uYWxQcm9wcyk7XG4gICAgICAgICAgY2hpbGRyZW5SZXN1bHQucHVzaChhd2FpdCBwcm9jZXNzKGJyYW5jaC5hZGRTdWJCcmFuY2goY2hpbGRyZW5baV0pLCBzdGFjaykpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjaGlsZHJlbltpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNvbnN0IGZ1bmNSZXN1bHQgPSBhd2FpdCBjaGlsZHJlbltpXSguLi5hZGRpdGlvbmFsUHJvcHMpO1xuXG4gICAgICAgICAgaWYgKGlzQWN0TUxFbGVtZW50KGZ1bmNSZXN1bHQpKSB7XG4gICAgICAgICAgICBjaGlsZHJlblJlc3VsdC5wdXNoKGF3YWl0IHByb2Nlc3MoYnJhbmNoLmFkZFN1YkJyYW5jaChmdW5jUmVzdWx0KSwgc3RhY2spKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hpbGRyZW5SZXN1bHQucHVzaChmdW5jUmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRyZW5SZXN1bHQ7XG4gIH1cblxuICBpZiAoYnJhbmNoLmVsZW1lbnQuc2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSgpKSB7XG4gICAgYXdhaXQgY2FsbENoaWxkcmVuKCk7XG4gIH1cblxuICBicmFuY2guY2xlYW5VcCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVQcm9jZXNzb3IoKSB7XG4gIGNvbnN0IHRyZWUgPSBUcmVlKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBydW4oZWxlbWVudFByaW1pdGl2ZSkge1xuICAgICAgcmV0dXJuIHByb2Nlc3ModHJlZS5yZXNvbHZlUm9vdChlbGVtZW50UHJpbWl0aXZlKSk7XG4gICAgfSxcbiAgICBzeXN0ZW0oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmVlLFxuICAgICAgICByZXNldCgpIHtcbiAgICAgICAgICB0cmVlLnJlc2V0KCk7XG4gICAgICAgICAgY3JlYXRlVXNlUHViU3ViSG9vay5jbGVhcigpO1xuICAgICAgICAgIGNyZWF0ZVVzZVN0YXRlSG9vay5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgbm8tcmV0dXJuLWFzc2lnbiwgbWF4LWxlbiAqL1xuaW1wb3J0IGVxdWFsIGZyb20gJ2Zhc3QtZGVlcC1lcXVhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRyZWUoKSB7XG4gIHZhciByb290ID0gY3JlYXRlTmV3QnJhbmNoKCk7XG4gIHZhciBpZHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGdldElkKCkge1xuICAgIHJldHVybiAnYScgKyAoKytpZHMpO1xuICB9O1xuICBmdW5jdGlvbiB1c2VTYW1lQnJhbmNoKGJyYW5jaCwgbmV3RWxlbWVudCkge1xuICAgIG5ld0VsZW1lbnQuaW5pdGlhbGl6ZShicmFuY2guZWxlbWVudC5pZCwgYnJhbmNoLmVsZW1lbnQudXNlZCgpKTtcbiAgICBicmFuY2guZWxlbWVudCA9IG5ld0VsZW1lbnQ7XG4gICAgcmV0dXJuIGJyYW5jaDtcbiAgfVxuICBmdW5jdGlvbiB0cmVlRGlmZihvbGRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgaWYgKG9sZEVsZW1lbnQgJiYgb2xkRWxlbWVudC5uYW1lID09PSBuZXdFbGVtZW50Lm5hbWUpIHtcbiAgICAgIHJldHVybiBlcXVhbChvbGRFbGVtZW50LnByb3BzLCBuZXdFbGVtZW50LnByb3BzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld0JyYW5jaChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHsgZWxlbWVudC5pbml0aWFsaXplKGdldElkKCkpOyB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGVsZW1lbnQsXG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBjdXJzb3I6IDAsXG4gICAgICBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLmN1cnNvciA9IDA7XG4gICAgICB9LFxuICAgICAgYWRkU3ViQnJhbmNoKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc3ViQnJhbmNoID0gdGhpcy5jaGlsZHJlblsgdGhpcy5jdXJzb3IgXTtcblxuICAgICAgICAvLyB1c2luZyB0aGUgc2FtZSBicmFuY2hcbiAgICAgICAgaWYgKHN1YkJyYW5jaCAmJiB0cmVlRGlmZihzdWJCcmFuY2guZWxlbWVudCwgbmV3RWxlbWVudCkpIHtcbiAgICAgICAgICB0aGlzLmN1cnNvciArPSAxO1xuICAgICAgICAgIHJldHVybiB1c2VTYW1lQnJhbmNoKHN1YkJyYW5jaCwgbmV3RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGluZyBhIG5ldyBicmFuY2hcbiAgICAgICAgY29uc3QgbmV3U3ViQnJhbmNoID0gY3JlYXRlTmV3QnJhbmNoKG5ld0VsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuY2hpbGRyZW5bIHRoaXMuY3Vyc29yIF0gPSBuZXdTdWJCcmFuY2g7XG4gICAgICAgIHRoaXMuY3Vyc29yICs9IDE7XG4gICAgICAgIHJldHVybiBuZXdTdWJCcmFuY2g7XG4gICAgICB9LFxuICAgICAgY2xlYW5VcCgpIHtcbiAgICAgICAgLy8gSWYgdGhlcmUncmUgbW9yZSBicmFuY2hlcyBpbiB0aGUgdHJlZSB0aGVuIHdoYXQgd2FzIHByb2Nlc3NlZFxuICAgICAgICBpZiAodGhpcy5jdXJzb3IgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKHRoaXMuY3Vyc29yLCB0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIHRoaXMuY3Vyc29yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc29sdmVSb290KGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiByb290ID0gKHRyZWVEaWZmKHJvb3QuZWxlbWVudCwgZWxlbWVudCkgP1xuICAgICAgICB1c2VTYW1lQnJhbmNoKHJvb3QsIGVsZW1lbnQpIDpcbiAgICAgICAgY3JlYXRlTmV3QnJhbmNoKGVsZW1lbnQpKTtcbiAgICB9LFxuICAgIHJlc2V0KCkge1xuICAgICAgcm9vdCA9IGNyZWF0ZU5ld0JyYW5jaCgpO1xuICAgICAgaWRzID0gMDtcbiAgICB9LFxuICAgIGdldE51bU9mRWxlbWVudHMoKSB7XG4gICAgICByZXR1cm4gaWRzO1xuICAgIH0sXG4gICAgZGlhZ25vc2UoKSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3BPdmVyKGJyYW5jaCwgaW5kID0gMCkge1xuICAgICAgICBsZXQgYXJyID0gW107XG5cbiAgICAgICAgYXJyLnB1c2goeyBpbmQsIG5hbWU6IGJyYW5jaC5lbGVtZW50Lm5hbWUsIHVzZWQ6IGJyYW5jaC5lbGVtZW50LnVzZWQoKSwgaWQ6IGJyYW5jaC5lbGVtZW50LmlkIH0pO1xuICAgICAgICBpZiAoYnJhbmNoLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBicmFuY2guY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICBhcnIucHVzaChsb29wT3ZlcihjaGlsZCwgaW5kICsgMSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgICB9KShyb290KTtcbiAgICB9XG4gIH07XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlUHVibGlzaEVsZW1lbnQoaG9zdEVsZW1lbnQpIHtcbiAgcmV0dXJuICh7IHR5cGUsIHBheWxvYWQsIHVzZVB1YlN1YiB9KSA9PiB7XG4gICAgY29uc3QgWyAsIHB1Ymxpc2ggXSA9IHVzZVB1YlN1Yihob3N0RWxlbWVudCk7XG5cbiAgICBwdWJsaXNoKHR5cGUsIHBheWxvYWQpO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3Vic2NyaWJlRWxlbWVudChob3N0RWxlbWVudCkge1xuICByZXR1cm4gKHsgdHlwZSwgdXNlQ2hpbGRyZW4sIHVzZVB1YlN1YiB9KSA9PiB7XG4gICAgY29uc3QgWyBjaGlsZHJlbiBdID0gdXNlQ2hpbGRyZW4oKTtcbiAgICBjb25zdCBbIHN1YnNjcmliZSBdID0gdXNlUHViU3ViKGhvc3RFbGVtZW50KTtcblxuICAgIHN1YnNjcmliZSh0eXBlLCBjaGlsZHJlbik7XG4gIH07XG59O1xuIiwiaW1wb3J0IGNyZWF0ZVB1Ymxpc2hFbGVtZW50IGZyb20gJy4vUHVibGlzaCc7XG5pbXBvcnQgY3JlYXRlU3Vic2NyaWJlRWxlbWVudCBmcm9tICcuL1N1YnNjcmliZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRzSG9vayhlbGVtZW50KSB7XG4gIHJldHVybiB7XG4gICAgUHVibGlzaDogY3JlYXRlUHVibGlzaEVsZW1lbnQoZWxlbWVudCksXG4gICAgU3Vic2NyaWJlOiBjcmVhdGVTdWJzY3JpYmVFbGVtZW50KGVsZW1lbnQpXG4gIH07XG59XG4iLCJpbXBvcnQgY3JlYXRlVXNlRWxlbWVudEhvb2sgZnJvbSAnLi91c2VFbGVtZW50JztcbmltcG9ydCBjcmVhdGVVc2VDaGlsZHJlbkhvb2sgZnJvbSAnLi91c2VDaGlsZHJlbic7XG5pbXBvcnQgY3JlYXRlVXNlUHJvZHVjdEhvb2sgZnJvbSAnLi91c2VQcm9kdWN0JztcbmltcG9ydCBjcmVhdGVVc2VQdWJTdWJIb29rIGZyb20gJy4vdXNlUHViU3ViJztcbmltcG9ydCBjcmVhdGVVc2VTdGF0ZUhvb2sgZnJvbSAnLi91c2VTdGF0ZSc7XG5pbXBvcnQgY3JlYXRlVXNlUmVkdWNlckhvb2sgZnJvbSAnLi91c2VSZWR1Y2VyJztcbmltcG9ydCBjcmVhdGVVc2VFbGVtZW50c0hvb2sgZnJvbSAnLi9lbGVtZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpemVIb29rcyhicmFuY2gsIGNhbGxDaGlsZHJlbiwgc3RhY2ssIHByb2Nlc3MpIHtcbiAgY29uc3QgeyBlbGVtZW50IH0gPSBicmFuY2g7XG4gIGNvbnN0IHVzZUVsZW1lbnQgPSBjcmVhdGVVc2VFbGVtZW50SG9vayhlbGVtZW50KTtcbiAgY29uc3QgdXNlQ2hpbGRyZW4gPSBjcmVhdGVVc2VDaGlsZHJlbkhvb2soZWxlbWVudCwgY2FsbENoaWxkcmVuKTtcbiAgY29uc3QgWyB1c2VQcm9kdWN0LCByZXNvbHZlZFByb2R1Y3RQcm9wcyBdID0gY3JlYXRlVXNlUHJvZHVjdEhvb2soZWxlbWVudCwgc3RhY2spO1xuICBjb25zdCB1c2VQdWJTdWIgPSBjcmVhdGVVc2VQdWJTdWJIb29rKGVsZW1lbnQpO1xuICBjb25zdCB1c2VSZWR1Y2VyID0gY3JlYXRlVXNlUmVkdWNlckhvb2soZWxlbWVudCk7XG4gIGNvbnN0IHVzZVN0YXRlID0gY3JlYXRlVXNlU3RhdGVIb29rKGVsZW1lbnQsICgpID0+IHByb2Nlc3MoYnJhbmNoLCBzdGFjaykpO1xuXG4gIHJldHVybiB7XG4gICAgLi4ucmVzb2x2ZWRQcm9kdWN0UHJvcHMsXG4gICAgdXNlQ2hpbGRyZW4sXG4gICAgdXNlRWxlbWVudCxcbiAgICB1c2VQcm9kdWN0LFxuICAgIHVzZVB1YlN1YixcbiAgICB1c2VTdGF0ZSxcbiAgICB1c2VSZWR1Y2VyLFxuICAgIHVzZUVsZW1lbnRzOiAoKSA9PiBjcmVhdGVVc2VFbGVtZW50c0hvb2soZWxlbWVudClcbiAgfTtcbn07XG4iLCJjb25zdCBjcmVhdGVVc2VDaGlsZHJlbkhvb2sgPSAoZWxlbWVudCwgY2FsbENoaWxkcmVuKSA9PiAoKSA9PiB7XG4gIGVsZW1lbnQuc2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseShmYWxzZSk7XG4gIHJldHVybiBbIGNhbGxDaGlsZHJlbiwgZWxlbWVudC5jaGlsZHJlbiBdO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVXNlQ2hpbGRyZW5Ib29rO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVXNlRWxlbWVudEhvb2soZWxlbWVudCkge1xuICByZXR1cm4gKCkgPT4gWyBlbGVtZW50IF07XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5cbmNvbnN0IHJlc29sdmVQcm9wID0gKHByb3AsIHN0YWNrSW5kZXgsIHN0YWNrLCBlcnJvcikgPT4ge1xuICBpZiAoc3RhY2tJbmRleCA8IDApIHtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuICBjb25zdCBwYXJlbnQgPSBzdGFja1sgc3RhY2tJbmRleCBdO1xuICBjb25zdCBwcm9kdWN0ID0gcGFyZW50LnJlcXVlc3RQcm9kdWN0ID8gcGFyZW50LnJlcXVlc3RQcm9kdWN0KHByb3ApIDogbnVsbDtcblxuICBpZiAocHJvZHVjdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBwcm9kdWN0LnZhbHVlO1xuICB9XG4gIHJldHVybiByZXNvbHZlUHJvcChwcm9wLCBzdGFja0luZGV4IC0gMSwgc3RhY2ssIGVycm9yKTtcbn07XG5cbmZ1bmN0aW9uIHJlc29sdmVQcm9kdWN0KGVsZW1lbnQsIHN0YWNrKSB7XG4gIGNvbnN0IHsgZGVwZW5kZW5jaWVzIH0gPSBlbGVtZW50LnByb3BzO1xuICBjb25zdCBkYXRhID0ge307XG5cbiAgaWYgKGRlcGVuZGVuY2llcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBkZXBlbmRlbmNpZXMuZm9yRWFjaChwcm9wTmFtZSA9PiB7XG4gICAgZGF0YVtwcm9wTmFtZV0gPSByZXNvbHZlUHJvcChcbiAgICAgIHByb3BOYW1lLFxuICAgICAgc3RhY2subGVuZ3RoIC0gMSxcbiAgICAgIHN0YWNrLFxuICAgICAgbmV3IEVycm9yKFxuICAgICAgICBgXCIkeyBwcm9wTmFtZSB9XCIgcHJvcCByZXF1ZXN0ZWQgYnkgXCIkeyBlbGVtZW50Lm5hbWUgfVwiIGNhbiBub3QgYmUgZm91bmQuXFxuXFxuU3RhY2s6XFxuYCArXG4gICAgICAgIFsgLi4uc3RhY2ssIGVsZW1lbnQgXS5tYXAoKHsgbmFtZSB9KSA9PiBgICA8JHsgbmFtZSB9PmApLmpvaW4oJ1xcbicpXG4gICAgICApXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVXNlUHJvZHVjdEhvb2soZWxlbWVudCwgc3RhY2spIHtcbiAgbGV0IHByb2R1Y3Q7XG4gIGNvbnN0IHJlc29sdmVkUHJvZHVjdFByb3BzID0gcmVzb2x2ZVByb2R1Y3QoZWxlbWVudCwgc3RhY2spO1xuXG4gIGVsZW1lbnQucmVxdWVzdFByb2R1Y3QgPSAocHJvcE5hbWUpID0+IHtcbiAgICBpZiAoZWxlbWVudC5wcm9wcy5leHBvcnRzS2V5d29yZCAmJiBlbGVtZW50LnByb3BzLmV4cG9ydHNLZXl3b3JkID09PSBwcm9wTmFtZSkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHByb2R1Y3QgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIFtcbiAgICAoaW5pdGlhbFZhbHVlKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGluaXRpYWxWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcHJvZHVjdCA9IGluaXRpYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXG4gICAgICAgIG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICBwcm9kdWN0ID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgfSxcbiAgICByZXNvbHZlZFByb2R1Y3RQcm9wc1xuICBdO1xufTtcbiIsInZhciBzdWJzY3JpYmVycyA9IHt9O1xuXG5jb25zdCBzdWJzY3JpYmUgPSAoZWxlbWVudCwgdHlwZSwgY2FsbGJhY2spID0+IHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgc3Vic2NyaWJlcnNbdHlwZV0gPSB7fTtcbiAgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF0gPSBjYWxsYmFjaztcbiAgcmV0dXJuICgpID0+IHtcbiAgICBkZWxldGUgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF07XG4gIH07XG59O1xuY29uc3QgcHVibGlzaCA9IChlbGVtZW50LCB0eXBlLCBwYXlsb2FkKSA9PiB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHJldHVybjtcbiAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnNbdHlwZV0pLmZvckVhY2goaWQgPT4ge1xuICAgIHN1YnNjcmliZXJzW3R5cGVdW2lkXShwYXlsb2FkLCBlbGVtZW50KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVVc2VQdWJTdWJIb29rKGVsZW1lbnQpIHtcbiAgcmV0dXJuIChzY29wZWRFbGVtZW50KSA9PiAoW1xuICAgIC8vIHN1YnNjcmliZVxuICAgICguLi5wYXJhbXMpID0+IHN1YnNjcmliZShzY29wZWRFbGVtZW50IHx8IGVsZW1lbnQsIC4uLnBhcmFtcyksXG4gICAgLy8gcHVibGlzaFxuICAgICguLi5wYXJhbXMpID0+IHB1Ymxpc2goc2NvcGVkRWxlbWVudCB8fCBlbGVtZW50LCAuLi5wYXJhbXMpLFxuICAgIC8vIGxpc3Qgb2YgYWxsIHN1YnNjcmliZXJzXG4gICAgc3Vic2NyaWJlcnNcbiAgXSk7XG59XG5cbmNyZWF0ZVVzZVB1YlN1Ykhvb2suY2xlYXIgPSAoKSA9PiB7XG4gIHN1YnNjcmliZXJzID0ge307XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVXNlUmVkdWNlckhvb2soZWxlbWVudCkge1xuXG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5cbmNvbnN0IFN0b3JhZ2UgPSB7XG4gIGVsZW1lbnRzOiB7fSxcbiAgZ2V0KGVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSkge1xuICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdID0geyBzdGF0ZXM6IFtdLCBjb25zdW1lcjogMCB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVVc2VTdGF0ZUhvb2soZWxlbWVudCwgcmVydW4pIHtcbiAgY29uc3Qgc3RvcmFnZSA9IFN0b3JhZ2UuZ2V0KGVsZW1lbnQpO1xuXG4gIHJldHVybiAoaW5pdGlhbFN0YXRlKSA9PiB7XG4gICAgbGV0IGluZGV4O1xuXG4gICAgLy8gZmlyc3QgcnVuXG4gICAgaWYgKGVsZW1lbnQudXNlZCgpID09PSAwKSB7XG4gICAgICBzdG9yYWdlLnN0YXRlcy5wdXNoKGluaXRpYWxTdGF0ZSk7XG4gICAgICBpbmRleCA9IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDE7XG5cbiAgICAvLyBvdGhlciBydW5zXG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4ID0gc3RvcmFnZS5jb25zdW1lcjtcbiAgICAgIHN0b3JhZ2UuY29uc3VtZXIgPSBpbmRleCA8IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDEgPyBzdG9yYWdlLmNvbnN1bWVyICsgMSA6IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XSxcbiAgICAgIG5ld1N0YXRlID0+IHtcbiAgICAgICAgc3RvcmFnZS5zdGF0ZXNbaW5kZXhdID0gbmV3U3RhdGU7XG4gICAgICAgIGlmICghZWxlbWVudC5pc1J1bm5pbmcoKSkge1xuICAgICAgICAgIHJlcnVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1N0YXRlO1xuICAgICAgfVxuICAgIF07XG4gIH07XG59XG5cbmNyZWF0ZVVzZVN0YXRlSG9vay5jbGVhciA9ICgpID0+IHtcbiAgU3RvcmFnZS5lbGVtZW50cyA9IHt9O1xufTtcbiIsImltcG9ydCBjcmVhdGVQcm9jZXNzb3IgZnJvbSAnLi9Qcm9jZXNzb3InO1xuaW1wb3J0IGlzQWN0TUxFbGVtZW50IGZyb20gJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnO1xuaW1wb3J0IEFjdEVsZW1lbnQgZnJvbSAnLi9BY3RFbGVtZW50JztcblxuY29uc3QgcHJvY2Vzc29yID0gY3JlYXRlUHJvY2Vzc29yKCk7XG5cbmZ1bmN0aW9uIEEoZnVuYywgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XG4gIHJldHVybiBBY3RFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbik7XG59XG5mdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICBpZiAoIWlzQWN0TUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBBY3RNTCBlbGVtZW50IGV4cGVjdGVkLiBJbnN0ZWFkICR7IGVsZW1lbnQudG9TdHJpbmcoKSB9IHBhc3NlZC5gKTtcbiAgfVxuICByZXR1cm4gcHJvY2Vzc29yLnJ1bihlbGVtZW50KTtcbn1cbmNvbnN0IEZyYWdtZW50ID0gKCkgPT4ge307XG5cbmV4cG9ydCB7XG4gIEEsXG4gIHJ1bixcbiAgRnJhZ21lbnQsXG4gIHByb2Nlc3NvclxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWN0TUxFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5fX2FjdG1sID09PSB0cnVlO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiY29uc3QgJCA9IChzZWxlY3RvcikgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5jb25zdCBsaXN0ID0gJCgnLnRvZG8tbGlzdCcpO1xuY29uc3QgaGVhZGVyID0gJCgnLmhlYWRlcicpO1xuXG5jb25zdCBFTlRFUiA9IDEzO1xuXG5leHBvcnQgZnVuY3Rpb24gRmlsbENvbnRhaW5lcih7IHVzZUNoaWxkcmVuIH0pIHtcbiAgY29uc3QgWyAsIGNvbnRlbnQgXSA9IHVzZUNoaWxkcmVuKCk7XG5cbiAgbGlzdC5pbm5lckhUTUwgPSBjb250ZW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIENvbnRhaW5lcih7IHVzZUNoaWxkcmVuIH0pIHtcbiAgY29uc3QgWyBjaGlsZHJlbiBdID0gdXNlQ2hpbGRyZW4oKTtcblxuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgIGNvbnN0IHR5cGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJyk7XG5cbiAgICBjaGlsZHJlbih0eXBlLCB0b2RvSW5kZXgpO1xuICB9KTtcbiAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICBpZiAoZS5rZXlDb2RlID09PSBFTlRFUikge1xuICAgICAgY2hpbGRyZW4oZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWFjdGlvbicpLCBlLnRhcmdldC52YWx1ZSk7XG4gICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgIH1cbiAgfSk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vc3JjJztcblxuaW1wb3J0IHsgQ29udGFpbmVyIH0gZnJvbSAnLi9ET00nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMaXN0ZW5lcih7IHVzZUVsZW1lbnRzIH0pIHtcbiAgY29uc3QgeyBQdWJsaXNoIH0gPSB1c2VFbGVtZW50cygpO1xuXG4gIHJldHVybiAoXG4gICAgPENvbnRhaW5lcj5cbiAgICAgIHtcbiAgICAgICAgKHR5cGUsIHRvZG9JbmRleCkgPT4gPFB1Ymxpc2ggdHlwZT17IHR5cGUgfSBwYXlsb2FkPXsgdG9kb0luZGV4IH0gLz5cbiAgICAgIH1cbiAgICA8L0NvbnRhaW5lcj5cbiAgKTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9zcmMnO1xuXG5pbXBvcnQgeyBGaWxsQ29udGFpbmVyIH0gZnJvbSAnLi9ET00nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZW5kZXJlcih7IHRvZG9zIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8RmlsbENvbnRhaW5lcj5cbiAgICAgIHtcbiAgICAgICAgdG9kb3MubWFwKCh0b2RvLCBpKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICAgIDxsaSBjbGFzcz0nJHsgdG9kby5jb21wbGV0ZWQgPyAnY29tcGxldGVkJyA6ICcnIH0nPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlld1wiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYWN0aW9uPVwidG9nZ2xlXCJcbiAgICAgICAgICAgICAgICAgICR7IHRvZG8uY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJycgfT5cbiAgICAgICAgICAgICAgICA8bGFiZWw+JHsgdG9kby5sYWJlbCB9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cImRlc3Ryb3lcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZWRpdFwiIHZhbHVlPVwiUnVsZSB0aGUgd2ViXCI+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgIGA7XG4gICAgICAgIH0pLmpvaW4oJycpXG4gICAgICB9XG4gICAgPC9GaWxsQ29udGFpbmVyPlxuICApO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIEZyYWdtZW50IH0gZnJvbSAnLi4vLi4vLi4vc3JjJztcblxuY29uc3QgVG9EbyA9ICh7IGxhYmVsIH0pID0+ICh7IGxhYmVsLCBjb21wbGV0ZWQ6IGZhbHNlLCBlZGl0aW5nOiBmYWxzZSB9KTtcblxudmFyIGluaXRpYWxWYWx1ZSA9IFtcbiAgVG9Ebyh7IGxhYmVsOiAnRmlyc3QgdGFzaycgfSksXG4gIFRvRG8oeyBsYWJlbDogJ1NlY29uZCB0YXNrJyB9KVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RvcmUoeyB1c2VTdGF0ZSwgdXNlUHJvZHVjdCwgdXNlRWxlbWVudHMgfSkge1xuICBjb25zdCBbIHRvZG9zLCBzZXRUb2RvcyBdID0gdXNlU3RhdGUoaW5pdGlhbFZhbHVlKTtcbiAgY29uc3QgWyBzZXRQcm9kdWN0IF0gPSB1c2VQcm9kdWN0KHRvZG9zKTtcbiAgY29uc3QgeyBTdWJzY3JpYmUgfSA9IHVzZUVsZW1lbnRzKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8U3Vic2NyaWJlIHR5cGU9J3RvZ2dsZSc+XG4gICAgICAgIHtcbiAgICAgICAgICB0b2RvSW5kZXggPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB0b2Rvcy5tYXAoKHRvZG8sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdG9kb0luZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIC4uLnRvZG8sXG4gICAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6ICF0b2RvLmNvbXBsZXRlZFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0VG9kb3MobmV3U3RhdGUpO1xuICAgICAgICAgICAgc2V0UHJvZHVjdChuZXdTdGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICA8L1N1YnNjcmliZT5cbiAgICAgIDxTdWJzY3JpYmUgdHlwZT0nbmV3Jz5cbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsID0+IHtcbiAgICAgICAgICAgIHRvZG9zLnB1c2goVG9Ebyh7IGxhYmVsIH0pKTtcbiAgICAgICAgICAgIHNldFRvZG9zKHRvZG9zKTtcbiAgICAgICAgICAgIHNldFByb2R1Y3QodG9kb3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgPC9TdWJzY3JpYmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIHJ1biwgRnJhZ21lbnQgfSBmcm9tICcuLi8uLi8uLi9zcmMnO1xuXG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi9MaXN0ZW5lcic7XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8TGlzdGVuZXIgLz5cbiAgICAgIDxTdG9yZSBleHBvcnRzPSd0b2Rvcyc+XG4gICAgICAgIDxSZW5kZXJlciAkdG9kb3MgLz5cbiAgICAgIDwvU3RvcmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbnJ1big8QXBwIC8+KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=