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
/* harmony import */ var _hooks_useElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks/useElement */ "../../src/hooks/useElement.js");
/* harmony import */ var _hooks_useChildren__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hooks/useChildren */ "../../src/hooks/useChildren.js");
/* harmony import */ var _hooks_useProduct__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hooks/useProduct */ "../../src/hooks/useProduct.js");
/* harmony import */ var _hooks_usePubSub__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hooks/usePubSub */ "../../src/hooks/usePubSub.js");
/* harmony import */ var _hooks_useState__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hooks/useState */ "../../src/hooks/useState.js");
/* harmony import */ var _hooks_elements__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hooks/elements */ "../../src/hooks/elements/index.js");
/* eslint-disable no-use-before-define */









function initializeHooks(branch, callChildren, stack, rerun) {
  const {
    element
  } = branch;
  const useElement = Object(_hooks_useElement__WEBPACK_IMPORTED_MODULE_2__["default"])(element);
  const useChildren = Object(_hooks_useChildren__WEBPACK_IMPORTED_MODULE_3__["default"])(element, callChildren);
  const [useProduct, resolvedProductProps] = Object(_hooks_useProduct__WEBPACK_IMPORTED_MODULE_4__["default"])(element, stack);
  const usePubSub = Object(_hooks_usePubSub__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  const useState = Object(_hooks_useState__WEBPACK_IMPORTED_MODULE_6__["default"])(element, () => process(branch, stack));
  return { ...resolvedProductProps,
    useChildren,
    useElement,
    useProduct,
    usePubSub,
    useState,
    useElements: () => Object(_hooks_elements__WEBPACK_IMPORTED_MODULE_7__["default"])(element)
  };
}

;

const process = async (branch, stack = []) => {
  branch.initialize();
  const hooksProps = initializeHooks(branch, callChildren, stack);
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
          _hooks_usePubSub__WEBPACK_IMPORTED_MODULE_5__["default"].clear();
          _hooks_useState__WEBPACK_IMPORTED_MODULE_6__["default"].clear();
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
          // console.log(`X! clean up ${ i } to ${ branch.children.length - i }`);
          this.children.splice(this.cursor, this.children.length - this.cursor);
        }
      }

    };
  }

  return {
    resolveRoot(element) {
      // console.log(`------------> ${ element.name }`);
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

function create(func, props, ...children) {
  return Object(_ActElement__WEBPACK_IMPORTED_MODULE_2__["default"])(func, props, children);
}

function run(element) {
  if (!Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
    throw new Error(`ActML element expected. Instead ${element.toString()} passed.`);
  }

  return processor.run(element);
}

const A = create;

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

var container = $('.todo-list');
function FillContainer(_ref) {
  var useChildren = _ref.useChildren;

  var _useChildren = useChildren(),
      _useChildren2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useChildren, 2),
      content = _useChildren2[1];

  container.innerHTML = content;
}
function Container(_ref2) {
  var useChildren = _ref2.useChildren;

  var _useChildren3 = useChildren(),
      _useChildren4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useChildren3, 1),
      children = _useChildren4[0];

  container.addEventListener('click', function (e) {
    var todoIndex = parseInt(e.target.getAttribute('data-index'), 10);
    var type = e.target.getAttribute('data-action');
    children(type, todoIndex);
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

var initialValue = [{
  label: 'First task',
  completed: false,
  editing: false
}, {
  label: 'Second task',
  completed: false,
  editing: false
}];
function Store(_ref) {
  var useState = _ref.useState,
      useProduct = _ref.useProduct,
      useElements = _ref.useElements;

  var _useState = useState(initialValue),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      todos = _useState2[0],
      setTodos = _useState2[1];

  var _useProduct = useProduct(todos),
      _useProduct2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useProduct, 1),
      setProduct = _useProduct2[0];

  var _useElements = useElements(),
      Subscribe = _useElements.Subscribe;

  return Object(_src__WEBPACK_IMPORTED_MODULE_2__["A"])(Subscribe, {
    type: "toggle"
  }, function (todoIndex) {
    console.log(todoIndex);
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
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL25vZGVfbW9kdWxlcy9mYXN0LWRlZXAtZXF1YWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvUHJvY2Vzc29yLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvVHJlZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL2VsZW1lbnRzL1B1Ymxpc2guanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9ob29rcy9lbGVtZW50cy9TdWJzY3JpYmUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9ob29rcy9lbGVtZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL3VzZUNoaWxkcmVuLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvaG9va3MvdXNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL3VzZVByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9ob29rcy91c2VQdWJTdWIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9ob29rcy91c2VTdGF0ZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvdXRpbHMvaXNBY3RNTEVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsicGFyc2VQcm9wcyIsInByb3BzIiwicHJvcE5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsInJlc3VsdCIsImRlcGVuZGVuY2llcyIsImV4cG9ydHNLZXl3b3JkIiwidW5kZWZpbmVkIiwiZm9yRWFjaCIsInByb3BOYW1lIiwiY2hhckF0IiwicHVzaCIsInN1YnN0ciIsImxlbmd0aCIsImV4cG9ydHMiLCJnZXRGdW5jTmFtZSIsImZ1bmMiLCJuYW1lIiwiZXhlYyIsInRvU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsImNoaWxkcmVuIiwiX19hY3RtbCIsIl9fdXNlZCIsIl9fcnVubmluZyIsIl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSIsImlkIiwiaW5pdGlhbGl6ZSIsInVzZWQiLCJtZXJnZVByb3BzIiwibmV3UHJvcHMiLCJhc3NpZ24iLCJpc1J1bm5pbmciLCJzaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5IiwidmFsdWUiLCJydW4iLCJvdGhlclByb3BzIiwiaW5pdGlhbGl6ZUhvb2tzIiwiYnJhbmNoIiwiY2FsbENoaWxkcmVuIiwic3RhY2siLCJyZXJ1biIsImVsZW1lbnQiLCJ1c2VFbGVtZW50IiwiY3JlYXRlVXNlRWxlbWVudEhvb2siLCJ1c2VDaGlsZHJlbiIsImNyZWF0ZVVzZUNoaWxkcmVuSG9vayIsInVzZVByb2R1Y3QiLCJyZXNvbHZlZFByb2R1Y3RQcm9wcyIsImNyZWF0ZVVzZVByb2R1Y3RIb29rIiwidXNlUHViU3ViIiwiY3JlYXRlVXNlUHViU3ViSG9vayIsInVzZVN0YXRlIiwiY3JlYXRlVXNlU3RhdGVIb29rIiwicHJvY2VzcyIsInVzZUVsZW1lbnRzIiwiY3JlYXRlVXNlRWxlbWVudHNIb29rIiwiaG9va3NQcm9wcyIsImdlblJlc3VsdCIsInRvR2VuVmFsdWUiLCJ0aGVuIiwibmV4dCIsImRvbmUiLCJpc0FjdE1MRWxlbWVudCIsImFkZFN1YkJyYW5jaCIsImFkZGl0aW9uYWxQcm9wcyIsImNoaWxkcmVuUmVzdWx0IiwiaSIsImZ1bmNSZXN1bHQiLCJjbGVhblVwIiwiY3JlYXRlUHJvY2Vzc29yIiwidHJlZSIsIlRyZWUiLCJlbGVtZW50UHJpbWl0aXZlIiwicmVzb2x2ZVJvb3QiLCJzeXN0ZW0iLCJyZXNldCIsImNsZWFyIiwicm9vdCIsImNyZWF0ZU5ld0JyYW5jaCIsImlkcyIsImdldElkIiwidXNlU2FtZUJyYW5jaCIsIm5ld0VsZW1lbnQiLCJ0cmVlRGlmZiIsIm9sZEVsZW1lbnQiLCJlcXVhbCIsImN1cnNvciIsInN1YkJyYW5jaCIsIm5ld1N1YkJyYW5jaCIsInNwbGljZSIsImdldE51bU9mRWxlbWVudHMiLCJkaWFnbm9zZSIsImxvb3BPdmVyIiwiaW5kIiwiYXJyIiwiY2hpbGQiLCJjcmVhdGVQdWJsaXNoRWxlbWVudCIsImhvc3RFbGVtZW50IiwidHlwZSIsInBheWxvYWQiLCJwdWJsaXNoIiwiY3JlYXRlU3Vic2NyaWJlRWxlbWVudCIsInN1YnNjcmliZSIsIlB1Ymxpc2giLCJTdWJzY3JpYmUiLCJyZXNvbHZlUHJvcCIsInByb3AiLCJzdGFja0luZGV4IiwiZXJyb3IiLCJwYXJlbnQiLCJwcm9kdWN0IiwicmVxdWVzdFByb2R1Y3QiLCJyZXNvbHZlUHJvZHVjdCIsImRhdGEiLCJFcnJvciIsIm1hcCIsImpvaW4iLCJpbml0aWFsVmFsdWUiLCJuZXdWYWx1ZSIsInN1YnNjcmliZXJzIiwiY2FsbGJhY2siLCJzY29wZWRFbGVtZW50IiwicGFyYW1zIiwiU3RvcmFnZSIsImVsZW1lbnRzIiwiZ2V0Iiwic3RhdGVzIiwiY29uc3VtZXIiLCJzdG9yYWdlIiwiaW5pdGlhbFN0YXRlIiwiaW5kZXgiLCJuZXdTdGF0ZSIsInByb2Nlc3NvciIsImNyZWF0ZSIsIkFjdEVsZW1lbnQiLCJBIiwiRnJhZ21lbnQiLCIkIiwic2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjb250YWluZXIiLCJGaWxsQ29udGFpbmVyIiwiY29udGVudCIsImlubmVySFRNTCIsIkNvbnRhaW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidG9kb0luZGV4IiwicGFyc2VJbnQiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJMaXN0ZW5lciIsIlJlbmRlcmVyIiwidG9kb3MiLCJ0b2RvIiwiY29tcGxldGVkIiwibGFiZWwiLCJlZGl0aW5nIiwiU3RvcmUiLCJzZXRUb2RvcyIsInNldFByb2R1Y3QiLCJjb25zb2xlIiwibG9nIiwiQXBwIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQixXQUFXO0FBQy9COztBQUVBLG9CQUFvQixXQUFXO0FBQy9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0REE7QUFBQSxTQUFTQSxVQUFULENBQW9CQyxLQUFwQixFQUEyQjtBQUN6QixRQUFNQyxTQUFTLEdBQUdELEtBQUssR0FBR0UsTUFBTSxDQUFDQyxJQUFQLENBQVlILEtBQVosQ0FBSCxHQUF3QixFQUEvQztBQUNBLFFBQU1JLE1BQU0sR0FBRztBQUNiQyxnQkFBWSxFQUFFLEVBREQ7QUFFYkMsa0JBQWMsRUFBRUM7QUFGSCxHQUFmO0FBS0FOLFdBQVMsQ0FBQ08sT0FBVixDQUFrQkMsUUFBUSxJQUFJO0FBQzVCLFFBQUlBLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQixDQUFoQixNQUF1QixHQUEzQixFQUFnQztBQUM5Qk4sWUFBTSxDQUFDQyxZQUFQLENBQW9CTSxJQUFwQixDQUF5QkYsUUFBUSxDQUFDRyxNQUFULENBQWdCLENBQWhCLEVBQW1CSCxRQUFRLENBQUNJLE1BQTVCLENBQXpCO0FBQ0QsS0FGRCxNQUVPLElBQUlKLFFBQVEsS0FBSyxTQUFqQixFQUE0QjtBQUNqQ0wsWUFBTSxDQUFDRSxjQUFQLEdBQXdCTixLQUFLLENBQUNjLE9BQTlCO0FBQ0QsS0FGTSxNQUVBO0FBQ0xWLFlBQU0sQ0FBQ0ssUUFBRCxDQUFOLEdBQW1CVCxLQUFLLENBQUNTLFFBQUQsQ0FBeEI7QUFDRDtBQUNGLEdBUkQ7QUFVQSxTQUFPTCxNQUFQO0FBQ0Q7O0FBQUE7O0FBRUQsU0FBU1csV0FBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDekIsTUFBSUEsSUFBSSxDQUFDQyxJQUFULEVBQWUsT0FBT0QsSUFBSSxDQUFDQyxJQUFaO0FBQ2YsTUFBSWIsTUFBTSxHQUFHLDZCQUE2QmMsSUFBN0IsQ0FBa0NGLElBQUksQ0FBQ0csUUFBTCxFQUFsQyxDQUFiO0FBRUEsU0FBT2YsTUFBTSxHQUFHQSxNQUFNLENBQUUsQ0FBRixDQUFULEdBQWlCLFNBQTlCO0FBQ0Q7O0FBQUE7O0FBRUQsTUFBTWdCLGFBQWEsR0FBRyxDQUFDSixJQUFELEVBQU9oQixLQUFQLEVBQWNxQixRQUFkLE1BQTRCO0FBQ2hEQyxTQUFPLEVBQUUsSUFEdUM7QUFFaERDLFFBQU0sRUFBRSxDQUZ3QztBQUdoREMsV0FBUyxFQUFFLEtBSHFDO0FBSWhEQyxnQ0FBOEIsRUFBRSxJQUpnQjtBQUtoREMsSUFBRSxFQUFFLElBTDRDO0FBTWhEMUIsT0FBSyxFQUFFRCxVQUFVLENBQUNDLEtBQUQsQ0FOK0I7QUFPaERpQixNQUFJLEVBQUVGLFdBQVcsQ0FBQ0MsSUFBRCxDQVArQjtBQVFoREssVUFSZ0Q7QUFTaERNLFlBQVUsRUFBRSxVQUFVRCxFQUFWLEVBQWNFLElBQUksR0FBRyxDQUFyQixFQUF3QjtBQUNsQyxTQUFLRixFQUFMLEdBQVVBLEVBQVY7QUFDQSxTQUFLSCxNQUFMLEdBQWNLLElBQWQ7QUFDQSxTQUFLSixTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsU0FBS0MsOEJBQUwsR0FBc0MsSUFBdEM7QUFDRCxHQWQrQzs7QUFlaERJLFlBQVUsQ0FBQ0MsUUFBRCxFQUFXO0FBQ25CLFNBQUs5QixLQUFMLEdBQWFFLE1BQU0sQ0FBQzZCLE1BQVAsQ0FBYyxFQUFkLEVBQWtCLEtBQUsvQixLQUF2QixFQUE4QjhCLFFBQTlCLENBQWI7QUFDRCxHQWpCK0M7O0FBa0JoRFgsVUFBUSxHQUFHO0FBQ1QsV0FBTyxLQUFLRixJQUFaO0FBQ0QsR0FwQitDOztBQXFCaERXLE1BQUksR0FBRztBQUNMLFdBQU8sS0FBS0wsTUFBWjtBQUNELEdBdkIrQzs7QUF3QmhEUyxXQUFTLEdBQUc7QUFDVixXQUFPLEtBQUtSLFNBQVo7QUFDRCxHQTFCK0M7O0FBMkJoRFMsb0NBQWtDLENBQUNDLEtBQUQsRUFBUTtBQUN4QyxRQUFJLE9BQU9BLEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDaEMsYUFBTyxLQUFLVCw4QkFBWjtBQUNEOztBQUNELFNBQUtBLDhCQUFMLEdBQXNDUyxLQUF0QztBQUNBLFdBQU9BLEtBQVA7QUFDRCxHQWpDK0M7O0FBa0NoRCxRQUFNQyxHQUFOLENBQVVDLFVBQVYsRUFBc0I7QUFDcEIsU0FBS1osU0FBTCxHQUFpQixJQUFqQjtBQUNBLFNBQUtDLDhCQUFMLEdBQXNDLElBQXRDO0FBRUEsVUFBTXJCLE1BQU0sR0FBRyxNQUFNWSxJQUFJLENBQUMsRUFDeEIsR0FBRyxLQUFLaEIsS0FEZ0I7QUFFeEIsU0FBR29DO0FBRnFCLEtBQUQsQ0FBekI7QUFLQSxTQUFLYixNQUFMLElBQWUsQ0FBZjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxXQUFPcEIsTUFBUDtBQUNEOztBQTlDK0MsQ0FBNUIsQ0FBdEI7O0FBaURlZ0IsNEVBQWYsRTs7Ozs7Ozs7Ozs7O0FDNUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNpQixlQUFULENBQXlCQyxNQUF6QixFQUFpQ0MsWUFBakMsRUFBK0NDLEtBQS9DLEVBQXNEQyxLQUF0RCxFQUE2RDtBQUMzRCxRQUFNO0FBQUVDO0FBQUYsTUFBY0osTUFBcEI7QUFDQSxRQUFNSyxVQUFVLEdBQUdDLGlFQUFvQixDQUFDRixPQUFELENBQXZDO0FBQ0EsUUFBTUcsV0FBVyxHQUFHQyxrRUFBcUIsQ0FBQ0osT0FBRCxFQUFVSCxZQUFWLENBQXpDO0FBQ0EsUUFBTSxDQUFFUSxVQUFGLEVBQWNDLG9CQUFkLElBQXVDQyxpRUFBb0IsQ0FBQ1AsT0FBRCxFQUFVRixLQUFWLENBQWpFO0FBQ0EsUUFBTVUsU0FBUyxHQUFHQyxnRUFBbUIsQ0FBQ1QsT0FBRCxDQUFyQztBQUNBLFFBQU1VLFFBQVEsR0FBR0MsK0RBQWtCLENBQUNYLE9BQUQsRUFBVSxNQUFNWSxPQUFPLENBQUNoQixNQUFELEVBQVNFLEtBQVQsQ0FBdkIsQ0FBbkM7QUFFQSxTQUFPLEVBQ0wsR0FBR1Esb0JBREU7QUFFTEgsZUFGSztBQUdMRixjQUhLO0FBSUxJLGNBSks7QUFLTEcsYUFMSztBQU1MRSxZQU5LO0FBT0xHLGVBQVcsRUFBRSxNQUFNQywrREFBcUIsQ0FBQ2QsT0FBRDtBQVBuQyxHQUFQO0FBU0Q7O0FBQUE7O0FBRUQsTUFBTVksT0FBTyxHQUFHLE9BQU9oQixNQUFQLEVBQWVFLEtBQUssR0FBRyxFQUF2QixLQUE4QjtBQUM1Q0YsUUFBTSxDQUFDWCxVQUFQO0FBRUEsUUFBTThCLFVBQVUsR0FBR3BCLGVBQWUsQ0FBQ0MsTUFBRCxFQUFTQyxZQUFULEVBQXVCQyxLQUF2QixDQUFsQztBQUNBLE1BQUlwQyxNQUFNLEdBQUcsTUFBTWtDLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlUCxHQUFmLENBQW1Cc0IsVUFBbkIsQ0FBbkI7QUFDQSxNQUFJQyxTQUFKLEVBQWVDLFVBQWYsQ0FMNEMsQ0FPNUM7O0FBQ0FuQixPQUFLLENBQUM3QixJQUFOLENBQVcyQixNQUFNLENBQUNJLE9BQWxCLEVBUjRDLENBVTVDOztBQUNBLE1BQUl0QyxNQUFNLElBQUlBLE1BQU0sQ0FBQ3dELElBQXJCLEVBQTJCO0FBQ3pCeEQsVUFBTSxHQUFHLE1BQU1BLE1BQWYsQ0FEeUIsQ0FHM0I7QUFDQyxHQUpELE1BSU8sSUFBSUEsTUFBTSxJQUFJLE9BQU9BLE1BQU0sQ0FBQ3lELElBQWQsS0FBdUIsVUFBckMsRUFBaUQ7QUFDdERILGFBQVMsR0FBR3RELE1BQU0sQ0FBQ3lELElBQVAsRUFBWjs7QUFDQSxXQUFPLENBQUNILFNBQVMsQ0FBQ0ksSUFBbEIsRUFBd0I7QUFDdEIsVUFBSUMscUVBQWMsQ0FBQ0wsU0FBUyxDQUFDeEIsS0FBWCxDQUFsQixFQUFxQztBQUNuQ3lCLGtCQUFVLEdBQUcsTUFBTUwsT0FBTyxDQUFDaEIsTUFBTSxDQUFDMEIsWUFBUCxDQUFvQk4sU0FBUyxDQUFDeEIsS0FBOUIsQ0FBRCxFQUF1Q00sS0FBdkMsQ0FBMUI7QUFDRDs7QUFDRGtCLGVBQVMsR0FBR3RELE1BQU0sQ0FBQ3lELElBQVAsQ0FBWUYsVUFBWixDQUFaO0FBQ0Q7O0FBQ0QsUUFBSUkscUVBQWMsQ0FBQ0wsU0FBUyxDQUFDeEIsS0FBWCxDQUFsQixFQUFxQztBQUNuQzlCLFlBQU0sR0FBRyxNQUFNa0QsT0FBTyxDQUFDaEIsTUFBTSxDQUFDMEIsWUFBUCxDQUFvQk4sU0FBUyxDQUFDeEIsS0FBOUIsQ0FBRCxFQUF1Q00sS0FBdkMsQ0FBdEI7QUFDRCxLQUZELE1BRU87QUFDTHBDLFlBQU0sR0FBR3NELFNBQVMsQ0FBQ3hCLEtBQW5CO0FBQ0QsS0FacUQsQ0FjeEQ7O0FBQ0MsR0FmTSxNQWVBLElBQUk2QixxRUFBYyxDQUFDM0QsTUFBRCxDQUFsQixFQUE0QjtBQUNqQ0EsVUFBTSxHQUFHLE1BQU1rRCxPQUFPLENBQUNoQixNQUFNLENBQUMwQixZQUFQLENBQW9CNUQsTUFBcEIsQ0FBRCxFQUE4Qm9DLEtBQTlCLENBQXRCO0FBQ0QsR0FoQzJDLENBa0M1Qzs7O0FBQ0EsaUJBQWVELFlBQWYsQ0FBNEIsR0FBRzBCLGVBQS9CLEVBQWdEO0FBQzlDLFVBQU1DLGNBQWMsR0FBRyxFQUF2QjtBQUNBLFVBQU07QUFBRTdDO0FBQUYsUUFBZWlCLE1BQU0sQ0FBQ0ksT0FBNUI7O0FBRUEsUUFBSXJCLFFBQVEsSUFBSUEsUUFBUSxDQUFDUixNQUFULEdBQWtCLENBQWxDLEVBQXFDO0FBQ25DLFdBQUssSUFBSXNELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc5QyxRQUFRLENBQUNSLE1BQTdCLEVBQXFDc0QsQ0FBQyxFQUF0QyxFQUEwQztBQUN4QyxZQUFJSixxRUFBYyxDQUFDMUMsUUFBUSxDQUFDOEMsQ0FBRCxDQUFULENBQWxCLEVBQWlDO0FBQy9COUMsa0JBQVEsQ0FBQzhDLENBQUQsQ0FBUixDQUFZdEMsVUFBWixDQUF1QixHQUFHb0MsZUFBMUI7QUFDQUMsd0JBQWMsQ0FBQ3ZELElBQWYsRUFBb0IsTUFBTTJDLE9BQU8sQ0FBQ2hCLE1BQU0sQ0FBQzBCLFlBQVAsQ0FBb0IzQyxRQUFRLENBQUM4QyxDQUFELENBQTVCLENBQUQsRUFBbUMzQixLQUFuQyxDQUFqQztBQUNELFNBSEQsTUFHTyxJQUFJLE9BQU9uQixRQUFRLENBQUM4QyxDQUFELENBQWYsS0FBdUIsVUFBM0IsRUFBdUM7QUFDNUMsZ0JBQU1DLFVBQVUsR0FBRyxNQUFNL0MsUUFBUSxDQUFDOEMsQ0FBRCxDQUFSLENBQVksR0FBR0YsZUFBZixDQUF6Qjs7QUFFQSxjQUFJRixxRUFBYyxDQUFDSyxVQUFELENBQWxCLEVBQWdDO0FBQzlCRiwwQkFBYyxDQUFDdkQsSUFBZixFQUFvQixNQUFNMkMsT0FBTyxDQUFDaEIsTUFBTSxDQUFDMEIsWUFBUCxDQUFvQkksVUFBcEIsQ0FBRCxFQUFrQzVCLEtBQWxDLENBQWpDO0FBQ0QsV0FGRCxNQUVPO0FBQ0wwQiwwQkFBYyxDQUFDdkQsSUFBZixDQUFvQnlELFVBQXBCO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsV0FBT0YsY0FBUDtBQUNEOztBQUVELE1BQUk1QixNQUFNLENBQUNJLE9BQVAsQ0FBZVQsa0NBQWYsRUFBSixFQUF5RDtBQUN2RCxVQUFNTSxZQUFZLEVBQWxCO0FBQ0Q7O0FBRURELFFBQU0sQ0FBQytCLE9BQVA7QUFFQSxTQUFPakUsTUFBUDtBQUNELENBbEVEOztBQW9FZSxTQUFTa0UsZUFBVCxHQUEyQjtBQUN4QyxRQUFNQyxJQUFJLEdBQUdDLHFEQUFJLEVBQWpCO0FBRUEsU0FBTztBQUNMckMsT0FBRyxDQUFDc0MsZ0JBQUQsRUFBbUI7QUFDcEIsYUFBT25CLE9BQU8sQ0FBQ2lCLElBQUksQ0FBQ0csV0FBTCxDQUFpQkQsZ0JBQWpCLENBQUQsQ0FBZDtBQUNELEtBSEk7O0FBSUxFLFVBQU0sR0FBRztBQUNQLGFBQU87QUFDTEosWUFESzs7QUFFTEssYUFBSyxHQUFHO0FBQ05MLGNBQUksQ0FBQ0ssS0FBTDtBQUNBekIsa0VBQW1CLENBQUMwQixLQUFwQjtBQUNBeEIsaUVBQWtCLENBQUN3QixLQUFuQjtBQUNEOztBQU5JLE9BQVA7QUFRRDs7QUFiSSxHQUFQO0FBZUQ7QUFBQSxDOzs7Ozs7Ozs7Ozs7QUNuSEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRWUsU0FBU0wsSUFBVCxHQUFnQjtBQUM3QixNQUFJTSxJQUFJLEdBQUdDLGVBQWUsRUFBMUI7QUFDQSxNQUFJQyxHQUFHLEdBQUcsQ0FBVjs7QUFFQSxXQUFTQyxLQUFULEdBQWlCO0FBQ2YsV0FBTyxNQUFPLEVBQUVELEdBQWhCO0FBQ0Q7O0FBQUE7O0FBQ0QsV0FBU0UsYUFBVCxDQUF1QjVDLE1BQXZCLEVBQStCNkMsVUFBL0IsRUFBMkM7QUFDekNBLGNBQVUsQ0FBQ3hELFVBQVgsQ0FBc0JXLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlaEIsRUFBckMsRUFBeUNZLE1BQU0sQ0FBQ0ksT0FBUCxDQUFlZCxJQUFmLEVBQXpDO0FBQ0FVLFVBQU0sQ0FBQ0ksT0FBUCxHQUFpQnlDLFVBQWpCO0FBQ0EsV0FBTzdDLE1BQVA7QUFDRDs7QUFDRCxXQUFTOEMsUUFBVCxDQUFrQkMsVUFBbEIsRUFBOEJGLFVBQTlCLEVBQTBDO0FBQ3hDLFFBQUlFLFVBQVUsSUFBSUEsVUFBVSxDQUFDcEUsSUFBWCxLQUFvQmtFLFVBQVUsQ0FBQ2xFLElBQWpELEVBQXVEO0FBQ3JELGFBQU9xRSxzREFBSyxDQUFDRCxVQUFVLENBQUNyRixLQUFaLEVBQW1CbUYsVUFBVSxDQUFDbkYsS0FBOUIsQ0FBWjtBQUNEOztBQUNELFdBQU8sS0FBUDtBQUNEOztBQUNELFdBQVMrRSxlQUFULENBQXlCckMsT0FBekIsRUFBa0M7QUFDaEMsUUFBSUEsT0FBSixFQUFhO0FBQUVBLGFBQU8sQ0FBQ2YsVUFBUixDQUFtQnNELEtBQUssRUFBeEI7QUFBOEI7O0FBQzdDLFdBQU87QUFDTHZDLGFBREs7QUFFTHJCLGNBQVEsRUFBRSxFQUZMO0FBR0xrRSxZQUFNLEVBQUUsQ0FISDs7QUFJTDVELGdCQUFVLEdBQUc7QUFDWCxhQUFLNEQsTUFBTCxHQUFjLENBQWQ7QUFDRCxPQU5JOztBQU9MdkIsa0JBQVksQ0FBQ21CLFVBQUQsRUFBYTtBQUN2QixjQUFNSyxTQUFTLEdBQUcsS0FBS25FLFFBQUwsQ0FBYyxLQUFLa0UsTUFBbkIsQ0FBbEIsQ0FEdUIsQ0FHdkI7O0FBQ0EsWUFBSUMsU0FBUyxJQUFJSixRQUFRLENBQUNJLFNBQVMsQ0FBQzlDLE9BQVgsRUFBb0J5QyxVQUFwQixDQUF6QixFQUEwRDtBQUN4RCxlQUFLSSxNQUFMLElBQWUsQ0FBZjtBQUNBLGlCQUFPTCxhQUFhLENBQUNNLFNBQUQsRUFBWUwsVUFBWixDQUFwQjtBQUNELFNBUHNCLENBU3ZCOzs7QUFDQSxjQUFNTSxZQUFZLEdBQUdWLGVBQWUsQ0FBQ0ksVUFBRCxDQUFwQztBQUVBLGFBQUs5RCxRQUFMLENBQWMsS0FBS2tFLE1BQW5CLElBQTZCRSxZQUE3QjtBQUNBLGFBQUtGLE1BQUwsSUFBZSxDQUFmO0FBQ0EsZUFBT0UsWUFBUDtBQUNELE9BdEJJOztBQXVCTHBCLGFBQU8sR0FBRztBQUNSO0FBQ0EsWUFBSSxLQUFLa0IsTUFBTCxHQUFjLEtBQUtsRSxRQUFMLENBQWNSLE1BQWhDLEVBQXdDO0FBQ3RDO0FBQ0EsZUFBS1EsUUFBTCxDQUFjcUUsTUFBZCxDQUFxQixLQUFLSCxNQUExQixFQUFrQyxLQUFLbEUsUUFBTCxDQUFjUixNQUFkLEdBQXVCLEtBQUswRSxNQUE5RDtBQUNEO0FBQ0Y7O0FBN0JJLEtBQVA7QUErQkQ7O0FBRUQsU0FBTztBQUNMYixlQUFXLENBQUNoQyxPQUFELEVBQVU7QUFDbkI7QUFDQSxhQUFPb0MsSUFBSSxHQUFJTSxRQUFRLENBQUNOLElBQUksQ0FBQ3BDLE9BQU4sRUFBZUEsT0FBZixDQUFSLEdBQ2J3QyxhQUFhLENBQUNKLElBQUQsRUFBT3BDLE9BQVAsQ0FEQSxHQUVicUMsZUFBZSxDQUFDckMsT0FBRCxDQUZqQjtBQUdELEtBTkk7O0FBT0xrQyxTQUFLLEdBQUc7QUFDTkUsVUFBSSxHQUFHQyxlQUFlLEVBQXRCO0FBQ0FDLFNBQUcsR0FBRyxDQUFOO0FBQ0QsS0FWSTs7QUFXTFcsb0JBQWdCLEdBQUc7QUFDakIsYUFBT1gsR0FBUDtBQUNELEtBYkk7O0FBY0xZLFlBQVEsR0FBRztBQUNULGFBQVEsU0FBU0MsUUFBVCxDQUFrQnZELE1BQWxCLEVBQTBCd0QsR0FBRyxHQUFHLENBQWhDLEVBQW1DO0FBQ3pDLFlBQUlDLEdBQUcsR0FBRyxFQUFWO0FBRUFBLFdBQUcsQ0FBQ3BGLElBQUosQ0FBUztBQUFFbUYsYUFBRjtBQUFPN0UsY0FBSSxFQUFFcUIsTUFBTSxDQUFDSSxPQUFQLENBQWV6QixJQUE1QjtBQUFrQ1csY0FBSSxFQUFFVSxNQUFNLENBQUNJLE9BQVAsQ0FBZWQsSUFBZixFQUF4QztBQUErREYsWUFBRSxFQUFFWSxNQUFNLENBQUNJLE9BQVAsQ0FBZWhCO0FBQWxGLFNBQVQ7O0FBQ0EsWUFBSVksTUFBTSxDQUFDakIsUUFBUCxDQUFnQlIsTUFBaEIsR0FBeUIsQ0FBN0IsRUFBZ0M7QUFDOUJ5QixnQkFBTSxDQUFDakIsUUFBUCxDQUFnQmIsT0FBaEIsQ0FBd0J3RixLQUFLLElBQUk7QUFDL0JELGVBQUcsQ0FBQ3BGLElBQUosQ0FBU2tGLFFBQVEsQ0FBQ0csS0FBRCxFQUFRRixHQUFHLEdBQUcsQ0FBZCxDQUFqQjtBQUNELFdBRkQ7QUFHRDs7QUFDRCxlQUFPQyxHQUFQO0FBQ0QsT0FWTSxDQVVKakIsSUFWSSxDQUFQO0FBV0Q7O0FBMUJJLEdBQVA7QUE0QkQ7QUFBQSxDOzs7Ozs7Ozs7Ozs7QUNwRkQ7QUFBQTtBQUFlLFNBQVNtQixvQkFBVCxDQUE4QkMsV0FBOUIsRUFBMkM7QUFDeEQsU0FBTyxDQUFDO0FBQUVDLFFBQUY7QUFBUUMsV0FBUjtBQUFpQmxEO0FBQWpCLEdBQUQsS0FBa0M7QUFDdkMsVUFBTSxHQUFJbUQsT0FBSixJQUFnQm5ELFNBQVMsQ0FBQ2dELFdBQUQsQ0FBL0I7QUFFQUcsV0FBTyxDQUFDRixJQUFELEVBQU9DLE9BQVAsQ0FBUDtBQUNELEdBSkQ7QUFLRCxDOzs7Ozs7Ozs7Ozs7QUNORDtBQUFBO0FBQWUsU0FBU0Usc0JBQVQsQ0FBZ0NKLFdBQWhDLEVBQTZDO0FBQzFELFNBQU8sQ0FBQztBQUFFQyxRQUFGO0FBQVF0RCxlQUFSO0FBQXFCSztBQUFyQixHQUFELEtBQXNDO0FBQzNDLFVBQU0sQ0FBRTdCLFFBQUYsSUFBZXdCLFdBQVcsRUFBaEM7QUFDQSxVQUFNLENBQUUwRCxTQUFGLElBQWdCckQsU0FBUyxDQUFDZ0QsV0FBRCxDQUEvQjtBQUVBSyxhQUFTLENBQUNKLElBQUQsRUFBTzlFLFFBQVAsQ0FBVDtBQUNELEdBTEQ7QUFNRDtBQUFBLEM7Ozs7Ozs7Ozs7OztBQ1BEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVlLFNBQVNtQyxxQkFBVCxDQUErQmQsT0FBL0IsRUFBd0M7QUFDckQsU0FBTztBQUNMOEQsV0FBTyxFQUFFUCx3REFBb0IsQ0FBQ3ZELE9BQUQsQ0FEeEI7QUFFTCtELGFBQVMsRUFBRUgsMERBQXNCLENBQUM1RCxPQUFEO0FBRjVCLEdBQVA7QUFJRCxDOzs7Ozs7Ozs7Ozs7QUNSRDtBQUFBLE1BQU1JLHFCQUFxQixHQUFHLENBQUNKLE9BQUQsRUFBVUgsWUFBVixLQUEyQixNQUFNO0FBQzdERyxTQUFPLENBQUNULGtDQUFSLENBQTJDLEtBQTNDO0FBQ0EsU0FBTyxDQUFFTSxZQUFGLEVBQWdCRyxPQUFPLENBQUNyQixRQUF4QixDQUFQO0FBQ0QsQ0FIRDs7QUFLZXlCLG9GQUFmLEU7Ozs7Ozs7Ozs7OztBQ0xBO0FBQUE7QUFBZSxTQUFTRixvQkFBVCxDQUE4QkYsT0FBOUIsRUFBdUM7QUFDcEQsU0FBTyxNQUFNLENBQUVBLE9BQUYsQ0FBYjtBQUNELEM7Ozs7Ozs7Ozs7OztBQ0ZEO0FBQUE7QUFBQTtBQUVBLE1BQU1nRSxXQUFXLEdBQUcsQ0FBQ0MsSUFBRCxFQUFPQyxVQUFQLEVBQW1CcEUsS0FBbkIsRUFBMEJxRSxLQUExQixLQUFvQztBQUN0RCxNQUFJRCxVQUFVLEdBQUcsQ0FBakIsRUFBb0I7QUFDbEIsVUFBTUMsS0FBTjtBQUNEOztBQUNELFFBQU1DLE1BQU0sR0FBR3RFLEtBQUssQ0FBRW9FLFVBQUYsQ0FBcEI7QUFDQSxRQUFNRyxPQUFPLEdBQUdELE1BQU0sQ0FBQ0UsY0FBUCxHQUF3QkYsTUFBTSxDQUFDRSxjQUFQLENBQXNCTCxJQUF0QixDQUF4QixHQUFzRCxJQUF0RTs7QUFFQSxNQUFJSSxPQUFPLEtBQUssSUFBaEIsRUFBc0I7QUFDcEIsV0FBT0EsT0FBTyxDQUFDN0UsS0FBZjtBQUNEOztBQUNELFNBQU93RSxXQUFXLENBQUNDLElBQUQsRUFBT0MsVUFBVSxHQUFHLENBQXBCLEVBQXVCcEUsS0FBdkIsRUFBOEJxRSxLQUE5QixDQUFsQjtBQUNELENBWEQ7O0FBYUEsU0FBU0ksY0FBVCxDQUF3QnZFLE9BQXhCLEVBQWlDRixLQUFqQyxFQUF3QztBQUN0QyxRQUFNO0FBQUVuQztBQUFGLE1BQW1CcUMsT0FBTyxDQUFDMUMsS0FBakM7QUFDQSxRQUFNa0gsSUFBSSxHQUFHLEVBQWI7O0FBRUEsTUFBSTdHLFlBQVksQ0FBQ1EsTUFBYixLQUF3QixDQUE1QixFQUErQjtBQUM3QixXQUFPLEVBQVA7QUFDRDs7QUFFRFIsY0FBWSxDQUFDRyxPQUFiLENBQXFCQyxRQUFRLElBQUk7QUFDL0J5RyxRQUFJLENBQUN6RyxRQUFELENBQUosR0FBaUJpRyxXQUFXLENBQzFCakcsUUFEMEIsRUFFMUIrQixLQUFLLENBQUMzQixNQUFOLEdBQWUsQ0FGVyxFQUcxQjJCLEtBSDBCLEVBSTFCLElBQUkyRSxLQUFKLENBQ0csSUFBSTFHLFFBQVUsd0JBQXdCaUMsT0FBTyxDQUFDekIsSUFBTSxpQ0FBckQsR0FDQSxDQUFFLEdBQUd1QixLQUFMLEVBQVlFLE9BQVosRUFBc0IwRSxHQUF0QixDQUEwQixDQUFDO0FBQUVuRztBQUFGLEtBQUQsS0FBZSxNQUFNQSxJQUFNLEdBQXJELEVBQXlEb0csSUFBekQsQ0FBOEQsSUFBOUQsQ0FGRixDQUowQixDQUE1QjtBQVNELEdBVkQ7QUFXQSxTQUFPSCxJQUFQO0FBQ0Q7O0FBQUE7QUFFYyxTQUFTakUsb0JBQVQsQ0FBOEJQLE9BQTlCLEVBQXVDRixLQUF2QyxFQUE4QztBQUMzRCxNQUFJdUUsT0FBSjtBQUNBLFFBQU0vRCxvQkFBb0IsR0FBR2lFLGNBQWMsQ0FBQ3ZFLE9BQUQsRUFBVUYsS0FBVixDQUEzQzs7QUFFQUUsU0FBTyxDQUFDc0UsY0FBUixHQUEwQnZHLFFBQUQsSUFBYztBQUNyQyxRQUFJaUMsT0FBTyxDQUFDMUMsS0FBUixDQUFjTSxjQUFkLElBQWdDb0MsT0FBTyxDQUFDMUMsS0FBUixDQUFjTSxjQUFkLEtBQWlDRyxRQUFyRSxFQUErRTtBQUM3RSxhQUFPO0FBQUV5QixhQUFLLEVBQUU2RTtBQUFULE9BQVA7QUFDRDs7QUFDRCxXQUFPLElBQVA7QUFDRCxHQUxEOztBQU9BLFNBQU8sQ0FDSk8sWUFBRCxJQUFrQjtBQUNoQixRQUFJLE9BQU9BLFlBQVAsS0FBd0IsV0FBNUIsRUFBeUM7QUFDdkNQLGFBQU8sR0FBR08sWUFBVjtBQUNEOztBQUNELFdBQU8sQ0FDTEMsUUFBUSxJQUFJO0FBQ1ZSLGFBQU8sR0FBR1EsUUFBVjtBQUNELEtBSEksQ0FBUDtBQUtELEdBVkksRUFXTHZFLG9CQVhLLENBQVA7QUFhRDtBQUFBLEM7Ozs7Ozs7Ozs7OztBQzdERDtBQUFBO0FBQUEsSUFBSXdFLFdBQVcsR0FBRyxFQUFsQjs7QUFFQSxNQUFNakIsU0FBUyxHQUFHLENBQUM3RCxPQUFELEVBQVV5RCxJQUFWLEVBQWdCc0IsUUFBaEIsS0FBNkI7QUFDN0MsTUFBSSxDQUFDRCxXQUFXLENBQUNyQixJQUFELENBQWhCLEVBQXdCcUIsV0FBVyxDQUFDckIsSUFBRCxDQUFYLEdBQW9CLEVBQXBCO0FBQ3hCcUIsYUFBVyxDQUFDckIsSUFBRCxDQUFYLENBQWtCekQsT0FBTyxDQUFDaEIsRUFBMUIsSUFBZ0MrRixRQUFoQztBQUNBLFNBQU8sTUFBTTtBQUNYLFdBQU9ELFdBQVcsQ0FBQ3JCLElBQUQsQ0FBWCxDQUFrQnpELE9BQU8sQ0FBQ2hCLEVBQTFCLENBQVA7QUFDRCxHQUZEO0FBR0QsQ0FORDs7QUFPQSxNQUFNMkUsT0FBTyxHQUFHLENBQUMzRCxPQUFELEVBQVV5RCxJQUFWLEVBQWdCQyxPQUFoQixLQUE0QjtBQUMxQyxNQUFJLENBQUNvQixXQUFXLENBQUNyQixJQUFELENBQWhCLEVBQXdCO0FBQ3hCakcsUUFBTSxDQUFDQyxJQUFQLENBQVlxSCxXQUFXLENBQUNyQixJQUFELENBQXZCLEVBQStCM0YsT0FBL0IsQ0FBdUNrQixFQUFFLElBQUk7QUFDM0M4RixlQUFXLENBQUNyQixJQUFELENBQVgsQ0FBa0J6RSxFQUFsQixFQUFzQjBFLE9BQXRCLEVBQStCMUQsT0FBL0I7QUFDRCxHQUZEO0FBR0QsQ0FMRDs7QUFPZSxTQUFTUyxtQkFBVCxDQUE2QlQsT0FBN0IsRUFBc0M7QUFDbkQsU0FBUWdGLGFBQUQsSUFBb0IsQ0FDekI7QUFDQSxHQUFDLEdBQUdDLE1BQUosS0FBZXBCLFNBQVMsQ0FBQ21CLGFBQWEsSUFBSWhGLE9BQWxCLEVBQTJCLEdBQUdpRixNQUE5QixDQUZDLEVBR3pCO0FBQ0EsR0FBQyxHQUFHQSxNQUFKLEtBQWV0QixPQUFPLENBQUNxQixhQUFhLElBQUloRixPQUFsQixFQUEyQixHQUFHaUYsTUFBOUIsQ0FKRyxFQUt6QjtBQUNBSCxhQU55QixDQUEzQjtBQVFEOztBQUVEckUsbUJBQW1CLENBQUMwQixLQUFwQixHQUE0QixNQUFNO0FBQ2hDMkMsYUFBVyxHQUFHLEVBQWQ7QUFDRCxDQUZELEM7Ozs7Ozs7Ozs7OztBQzNCQTtBQUFBO0FBQUE7QUFFQSxNQUFNSSxPQUFPLEdBQUc7QUFDZEMsVUFBUSxFQUFFLEVBREk7O0FBRWRDLEtBQUcsQ0FBQ3BGLE9BQUQsRUFBVTtBQUNYLFFBQUksS0FBS21GLFFBQUwsQ0FBY25GLE9BQU8sQ0FBQ2hCLEVBQXRCLENBQUosRUFBK0I7QUFDN0IsYUFBTyxLQUFLbUcsUUFBTCxDQUFjbkYsT0FBTyxDQUFDaEIsRUFBdEIsQ0FBUDtBQUNEOztBQUNELFdBQU8sS0FBS21HLFFBQUwsQ0FBY25GLE9BQU8sQ0FBQ2hCLEVBQXRCLElBQTRCO0FBQUVxRyxZQUFNLEVBQUUsRUFBVjtBQUFjQyxjQUFRLEVBQUU7QUFBeEIsS0FBbkM7QUFDRDs7QUFQYSxDQUFoQjtBQVVlLFNBQVMzRSxrQkFBVCxDQUE0QlgsT0FBNUIsRUFBcUNELEtBQXJDLEVBQTRDO0FBQ3pELFFBQU13RixPQUFPLEdBQUdMLE9BQU8sQ0FBQ0UsR0FBUixDQUFZcEYsT0FBWixDQUFoQjtBQUVBLFNBQVF3RixZQUFELElBQWtCO0FBQ3ZCLFFBQUlDLEtBQUosQ0FEdUIsQ0FHdkI7O0FBQ0EsUUFBSXpGLE9BQU8sQ0FBQ2QsSUFBUixPQUFtQixDQUF2QixFQUEwQjtBQUN4QnFHLGFBQU8sQ0FBQ0YsTUFBUixDQUFlcEgsSUFBZixDQUFvQnVILFlBQXBCO0FBQ0FDLFdBQUssR0FBR0YsT0FBTyxDQUFDRixNQUFSLENBQWVsSCxNQUFmLEdBQXdCLENBQWhDLENBRndCLENBSTFCO0FBQ0MsS0FMRCxNQUtPO0FBQ0xzSCxXQUFLLEdBQUdGLE9BQU8sQ0FBQ0QsUUFBaEI7QUFDQUMsYUFBTyxDQUFDRCxRQUFSLEdBQW1CRyxLQUFLLEdBQUdGLE9BQU8sQ0FBQ0YsTUFBUixDQUFlbEgsTUFBZixHQUF3QixDQUFoQyxHQUFvQ29ILE9BQU8sQ0FBQ0QsUUFBUixHQUFtQixDQUF2RCxHQUEyRCxDQUE5RTtBQUNEOztBQUVELFdBQU8sQ0FDTEMsT0FBTyxDQUFDRixNQUFSLENBQWVJLEtBQWYsQ0FESyxFQUVMQyxRQUFRLElBQUk7QUFDVkgsYUFBTyxDQUFDRixNQUFSLENBQWVJLEtBQWYsSUFBd0JDLFFBQXhCOztBQUNBLFVBQUksQ0FBQzFGLE9BQU8sQ0FBQ1YsU0FBUixFQUFMLEVBQTBCO0FBQ3hCUyxhQUFLO0FBQ047O0FBQ0QsYUFBTzJGLFFBQVA7QUFDRCxLQVJJLENBQVA7QUFVRCxHQXhCRDtBQXlCRDs7QUFFRC9FLGtCQUFrQixDQUFDd0IsS0FBbkIsR0FBMkIsTUFBTTtBQUMvQitDLFNBQU8sQ0FBQ0MsUUFBUixHQUFtQixFQUFuQjtBQUNELENBRkQsQzs7Ozs7Ozs7Ozs7O0FDMUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFFQSxNQUFNUSxTQUFTLEdBQUcvRCwwREFBZSxFQUFqQzs7QUFFQSxTQUFTZ0UsTUFBVCxDQUFnQnRILElBQWhCLEVBQXNCaEIsS0FBdEIsRUFBNkIsR0FBR3FCLFFBQWhDLEVBQTBDO0FBQ3hDLFNBQU9rSCwyREFBVSxDQUFDdkgsSUFBRCxFQUFPaEIsS0FBUCxFQUFjcUIsUUFBZCxDQUFqQjtBQUNEOztBQUNELFNBQVNjLEdBQVQsQ0FBYU8sT0FBYixFQUFzQjtBQUNwQixNQUFJLENBQUNxQixxRUFBYyxDQUFDckIsT0FBRCxDQUFuQixFQUE4QjtBQUM1QixVQUFNLElBQUl5RSxLQUFKLENBQVcsbUNBQW1DekUsT0FBTyxDQUFDdkIsUUFBUixFQUFvQixVQUFsRSxDQUFOO0FBQ0Q7O0FBQ0QsU0FBT2tILFNBQVMsQ0FBQ2xHLEdBQVYsQ0FBY08sT0FBZCxDQUFQO0FBQ0Q7O0FBRUQsTUFBTThGLENBQUMsR0FBR0YsTUFBVjs7QUFDQSxNQUFNRyxRQUFRLEdBQUcsTUFBTSxDQUFFLENBQXpCOzs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUFBO0FBQWUsU0FBUzFFLGNBQVQsQ0FBd0JyQixPQUF4QixFQUFpQztBQUM5QyxTQUFPQSxPQUFPLElBQUlBLE9BQU8sQ0FBQ3BCLE9BQVIsS0FBb0IsSUFBdEM7QUFDRDtBQUFBLEM7Ozs7Ozs7Ozs7O0FDRkQ7QUFDQTtBQUNBOztBQUVBLGlDOzs7Ozs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUM7Ozs7Ozs7Ozs7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QywrQkFBK0I7QUFDNUU7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsdUM7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7Ozs7Ozs7QUNKQSxxQkFBcUIsbUJBQU8sQ0FBQyxpRkFBa0I7O0FBRS9DO0FBQ0EsaUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEsK0I7Ozs7Ozs7Ozs7O0FDckJBLHFCQUFxQixtQkFBTyxDQUFDLGlGQUFrQjs7QUFFL0MsMkJBQTJCLG1CQUFPLENBQUMsNkZBQXdCOztBQUUzRCxzQkFBc0IsbUJBQU8sQ0FBQyxtRkFBbUI7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQSxnQzs7Ozs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBLHdDQUF3QyxXQUFXO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7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QUFBQSxNQUUzRE8sVUFGMkQ7O0FBQUEscUJBRzdDM0csV0FBVyxFQUhrQztBQUFBLE1BRzNEa0QsU0FIMkQsZ0JBRzNEQSxTQUgyRDs7QUFLbkUsU0FDRSwrQ0FBQyxTQUFEO0FBQVcsUUFBSSxFQUFDO0FBQWhCLEtBRUksVUFBQTRDLFNBQVMsRUFBSTtBQUNYYyxXQUFPLENBQUNDLEdBQVIsQ0FBWWYsU0FBWjtBQUNBLFFBQU1qQixRQUFRLEdBQUd1QixLQUFLLENBQUN2QyxHQUFOLENBQVUsVUFBQ3dDLElBQUQsRUFBT3pCLEtBQVAsRUFBaUI7QUFDMUMsVUFBSUEsS0FBSyxLQUFLa0IsU0FBZCxFQUF5QjtBQUN2Qiw4RkFDS08sSUFETDtBQUVFQyxtQkFBUyxFQUFFLENBQUNELElBQUksQ0FBQ0M7QUFGbkI7QUFJRDs7QUFDRCxhQUFPRCxJQUFQO0FBQ0QsS0FSZ0IsQ0FBakI7QUFVQUssWUFBUSxDQUFDN0IsUUFBRCxDQUFSO0FBQ0E4QixjQUFVLENBQUM5QixRQUFELENBQVY7QUFDRCxHQWhCTCxDQURGO0FBcUJELEM7Ozs7Ozs7Ozs7OztBQzNDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTaUMsR0FBVCxHQUFlO0FBQ2IsU0FDRSwrQ0FBQyw2Q0FBRCxRQUNFLCtDQUFDLGlEQUFELE9BREYsRUFFRSwrQ0FBQyw4Q0FBRDtBQUFPLFdBQU8sRUFBQztBQUFmLEtBQ0UsK0NBQUMsaURBQUQ7QUFBVSxVQUFNO0FBQWhCLElBREYsQ0FGRixDQURGO0FBUUQ7O0FBQUE7QUFFRGxJLGdEQUFHLENBQUMsK0NBQUMsR0FBRCxPQUFELENBQUgsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIga2V5TGlzdCA9IE9iamVjdC5rZXlzO1xudmFyIGhhc1Byb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVxdWFsKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlO1xuXG4gIGlmIChhICYmIGIgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIGIgPT0gJ29iamVjdCcpIHtcbiAgICB2YXIgYXJyQSA9IGlzQXJyYXkoYSlcbiAgICAgICwgYXJyQiA9IGlzQXJyYXkoYilcbiAgICAgICwgaVxuICAgICAgLCBsZW5ndGhcbiAgICAgICwga2V5O1xuXG4gICAgaWYgKGFyckEgJiYgYXJyQikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBpZiAobGVuZ3RoICE9IGIubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICAgIGlmICghZXF1YWwoYVtpXSwgYltpXSkpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChhcnJBICE9IGFyckIpIHJldHVybiBmYWxzZTtcblxuICAgIHZhciBkYXRlQSA9IGEgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAsIGRhdGVCID0gYiBpbnN0YW5jZW9mIERhdGU7XG4gICAgaWYgKGRhdGVBICE9IGRhdGVCKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGRhdGVBICYmIGRhdGVCKSByZXR1cm4gYS5nZXRUaW1lKCkgPT0gYi5nZXRUaW1lKCk7XG5cbiAgICB2YXIgcmVnZXhwQSA9IGEgaW5zdGFuY2VvZiBSZWdFeHBcbiAgICAgICwgcmVnZXhwQiA9IGIgaW5zdGFuY2VvZiBSZWdFeHA7XG4gICAgaWYgKHJlZ2V4cEEgIT0gcmVnZXhwQikgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChyZWdleHBBICYmIHJlZ2V4cEIpIHJldHVybiBhLnRvU3RyaW5nKCkgPT0gYi50b1N0cmluZygpO1xuXG4gICAgdmFyIGtleXMgPSBrZXlMaXN0KGEpO1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCAhPT0ga2V5TGlzdChiKS5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSAhPT0gMDspXG4gICAgICBpZiAoIWhhc1Byb3AuY2FsbChiLCBrZXlzW2ldKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgZm9yIChpID0gbGVuZ3RoOyBpLS0gIT09IDA7KSB7XG4gICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgaWYgKCFlcXVhbChhW2tleV0sIGJba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBhIT09YSAmJiBiIT09Yjtcbn07XG4iLCJmdW5jdGlvbiBwYXJzZVByb3BzKHByb3BzKSB7XG4gIGNvbnN0IHByb3BOYW1lcyA9IHByb3BzID8gT2JqZWN0LmtleXMocHJvcHMpIDogW107XG4gIGNvbnN0IHJlc3VsdCA9IHtcbiAgICBkZXBlbmRlbmNpZXM6IFtdLFxuICAgIGV4cG9ydHNLZXl3b3JkOiB1bmRlZmluZWRcbiAgfTtcblxuICBwcm9wTmFtZXMuZm9yRWFjaChwcm9wTmFtZSA9PiB7XG4gICAgaWYgKHByb3BOYW1lLmNoYXJBdCgwKSA9PT0gJyQnKSB7XG4gICAgICByZXN1bHQuZGVwZW5kZW5jaWVzLnB1c2gocHJvcE5hbWUuc3Vic3RyKDEsIHByb3BOYW1lLmxlbmd0aCkpO1xuICAgIH0gZWxzZSBpZiAocHJvcE5hbWUgPT09ICdleHBvcnRzJykge1xuICAgICAgcmVzdWx0LmV4cG9ydHNLZXl3b3JkID0gcHJvcHMuZXhwb3J0cztcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3Byb3BOYW1lXSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5mdW5jdGlvbiBnZXRGdW5jTmFtZShmdW5jKSB7XG4gIGlmIChmdW5jLm5hbWUpIHJldHVybiBmdW5jLm5hbWU7XG4gIGxldCByZXN1bHQgPSAvXmZ1bmN0aW9uXFxzKyhbXFx3XFwkXSspXFxzKlxcKC8uZXhlYyhmdW5jLnRvU3RyaW5nKCkpO1xuXG4gIHJldHVybiByZXN1bHQgPyByZXN1bHRbIDEgXSA6ICd1bmtub3duJztcbn07XG5cbmNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAoZnVuYywgcHJvcHMsIGNoaWxkcmVuKSA9PiAoe1xuICBfX2FjdG1sOiB0cnVlLFxuICBfX3VzZWQ6IDAsXG4gIF9fcnVubmluZzogZmFsc2UsXG4gIF9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTogdHJ1ZSxcbiAgaWQ6IG51bGwsXG4gIHByb3BzOiBwYXJzZVByb3BzKHByb3BzKSxcbiAgbmFtZTogZ2V0RnVuY05hbWUoZnVuYyksXG4gIGNoaWxkcmVuLFxuICBpbml0aWFsaXplOiBmdW5jdGlvbiAoaWQsIHVzZWQgPSAwKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMuX191c2VkID0gdXNlZDtcbiAgICB0aGlzLl9fcnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5ID0gdHJ1ZTtcbiAgfSxcbiAgbWVyZ2VQcm9wcyhuZXdQcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzLCBuZXdQcm9wcyk7XG4gIH0sXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH0sXG4gIHVzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX191c2VkO1xuICB9LFxuICBpc1J1bm5pbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX19ydW5uaW5nO1xuICB9LFxuICBzaG91bGRQcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5KHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl9fcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseTtcbiAgICB9XG4gICAgdGhpcy5fX3Byb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0sXG4gIGFzeW5jIHJ1bihvdGhlclByb3BzKSB7XG4gICAgdGhpcy5fX3J1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuX19wcm9jZXNzQ2hpbGRyZW5BdXRvbWF0aWNhbGx5ID0gdHJ1ZTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGZ1bmMoe1xuICAgICAgLi4udGhpcy5wcm9wcyxcbiAgICAgIC4uLm90aGVyUHJvcHNcbiAgICB9KTtcblxuICAgIHRoaXMuX191c2VkICs9IDE7XG4gICAgdGhpcy5fX3J1bm5pbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRWxlbWVudDtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQgaXNBY3RNTEVsZW1lbnQgZnJvbSAnLi91dGlscy9pc0FjdE1MRWxlbWVudCc7XG5pbXBvcnQgVHJlZSBmcm9tICcuL1RyZWUnO1xuaW1wb3J0IGNyZWF0ZVVzZUVsZW1lbnRIb29rIGZyb20gJy4vaG9va3MvdXNlRWxlbWVudCc7XG5pbXBvcnQgY3JlYXRlVXNlQ2hpbGRyZW5Ib29rIGZyb20gJy4vaG9va3MvdXNlQ2hpbGRyZW4nO1xuaW1wb3J0IGNyZWF0ZVVzZVByb2R1Y3RIb29rIGZyb20gJy4vaG9va3MvdXNlUHJvZHVjdCc7XG5pbXBvcnQgY3JlYXRlVXNlUHViU3ViSG9vayBmcm9tICcuL2hvb2tzL3VzZVB1YlN1Yic7XG5pbXBvcnQgY3JlYXRlVXNlU3RhdGVIb29rIGZyb20gJy4vaG9va3MvdXNlU3RhdGUnO1xuaW1wb3J0IGNyZWF0ZVVzZUVsZW1lbnRzSG9vayBmcm9tICcuL2hvb2tzL2VsZW1lbnRzJztcblxuZnVuY3Rpb24gaW5pdGlhbGl6ZUhvb2tzKGJyYW5jaCwgY2FsbENoaWxkcmVuLCBzdGFjaywgcmVydW4pIHtcbiAgY29uc3QgeyBlbGVtZW50IH0gPSBicmFuY2g7XG4gIGNvbnN0IHVzZUVsZW1lbnQgPSBjcmVhdGVVc2VFbGVtZW50SG9vayhlbGVtZW50KTtcbiAgY29uc3QgdXNlQ2hpbGRyZW4gPSBjcmVhdGVVc2VDaGlsZHJlbkhvb2soZWxlbWVudCwgY2FsbENoaWxkcmVuKTtcbiAgY29uc3QgWyB1c2VQcm9kdWN0LCByZXNvbHZlZFByb2R1Y3RQcm9wcyBdID0gY3JlYXRlVXNlUHJvZHVjdEhvb2soZWxlbWVudCwgc3RhY2spO1xuICBjb25zdCB1c2VQdWJTdWIgPSBjcmVhdGVVc2VQdWJTdWJIb29rKGVsZW1lbnQpO1xuICBjb25zdCB1c2VTdGF0ZSA9IGNyZWF0ZVVzZVN0YXRlSG9vayhlbGVtZW50LCAoKSA9PiBwcm9jZXNzKGJyYW5jaCwgc3RhY2spKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc29sdmVkUHJvZHVjdFByb3BzLFxuICAgIHVzZUNoaWxkcmVuLFxuICAgIHVzZUVsZW1lbnQsXG4gICAgdXNlUHJvZHVjdCxcbiAgICB1c2VQdWJTdWIsXG4gICAgdXNlU3RhdGUsXG4gICAgdXNlRWxlbWVudHM6ICgpID0+IGNyZWF0ZVVzZUVsZW1lbnRzSG9vayhlbGVtZW50KVxuICB9O1xufTtcblxuY29uc3QgcHJvY2VzcyA9IGFzeW5jIChicmFuY2gsIHN0YWNrID0gW10pID0+IHtcbiAgYnJhbmNoLmluaXRpYWxpemUoKTtcblxuICBjb25zdCBob29rc1Byb3BzID0gaW5pdGlhbGl6ZUhvb2tzKGJyYW5jaCwgY2FsbENoaWxkcmVuLCBzdGFjayk7XG4gIGxldCByZXN1bHQgPSBhd2FpdCBicmFuY2guZWxlbWVudC5ydW4oaG9va3NQcm9wcyk7XG4gIGxldCBnZW5SZXN1bHQsIHRvR2VuVmFsdWU7XG5cbiAgLy8gdXBkYXRpbmcgdGhlIHN0YWNrXG4gIHN0YWNrLnB1c2goYnJhbmNoLmVsZW1lbnQpO1xuXG4gIC8vIGhhbmRsaW5nIGEgcHJvbWlzZVxuICBpZiAocmVzdWx0ICYmIHJlc3VsdC50aGVuKSB7XG4gICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0O1xuXG4gIC8vIGhhbmRsaW5nIGEgZ2VuZXJhdG9yXG4gIH0gZWxzZSBpZiAocmVzdWx0ICYmIHR5cGVvZiByZXN1bHQubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGdlblJlc3VsdCA9IHJlc3VsdC5uZXh0KCk7XG4gICAgd2hpbGUgKCFnZW5SZXN1bHQuZG9uZSkge1xuICAgICAgaWYgKGlzQWN0TUxFbGVtZW50KGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgICAgdG9HZW5WYWx1ZSA9IGF3YWl0IHByb2Nlc3MoYnJhbmNoLmFkZFN1YkJyYW5jaChnZW5SZXN1bHQudmFsdWUpLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBnZW5SZXN1bHQgPSByZXN1bHQubmV4dCh0b0dlblZhbHVlKTtcbiAgICB9XG4gICAgaWYgKGlzQWN0TUxFbGVtZW50KGdlblJlc3VsdC52YWx1ZSkpIHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHByb2Nlc3MoYnJhbmNoLmFkZFN1YkJyYW5jaChnZW5SZXN1bHQudmFsdWUpLCBzdGFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGdlblJlc3VsdC52YWx1ZTtcbiAgICB9XG5cbiAgLy8gaGFuZGxpbmcgYW5vdGhlciBBY3RNTCBlbGVtZW50XG4gIH0gZWxzZSBpZiAoaXNBY3RNTEVsZW1lbnQocmVzdWx0KSkge1xuICAgIHJlc3VsdCA9IGF3YWl0IHByb2Nlc3MoYnJhbmNoLmFkZFN1YkJyYW5jaChyZXN1bHQpLCBzdGFjayk7XG4gIH1cblxuICAvLyBoYW5kbGluZyBjaGlsZHJlblxuICBhc3luYyBmdW5jdGlvbiBjYWxsQ2hpbGRyZW4oLi4uYWRkaXRpb25hbFByb3BzKSB7XG4gICAgY29uc3QgY2hpbGRyZW5SZXN1bHQgPSBbXTtcbiAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSBicmFuY2guZWxlbWVudDtcblxuICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpc0FjdE1MRWxlbWVudChjaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICBjaGlsZHJlbltpXS5tZXJnZVByb3BzKC4uLmFkZGl0aW9uYWxQcm9wcyk7XG4gICAgICAgICAgY2hpbGRyZW5SZXN1bHQucHVzaChhd2FpdCBwcm9jZXNzKGJyYW5jaC5hZGRTdWJCcmFuY2goY2hpbGRyZW5baV0pLCBzdGFjaykpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjaGlsZHJlbltpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNvbnN0IGZ1bmNSZXN1bHQgPSBhd2FpdCBjaGlsZHJlbltpXSguLi5hZGRpdGlvbmFsUHJvcHMpO1xuXG4gICAgICAgICAgaWYgKGlzQWN0TUxFbGVtZW50KGZ1bmNSZXN1bHQpKSB7XG4gICAgICAgICAgICBjaGlsZHJlblJlc3VsdC5wdXNoKGF3YWl0IHByb2Nlc3MoYnJhbmNoLmFkZFN1YkJyYW5jaChmdW5jUmVzdWx0KSwgc3RhY2spKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hpbGRyZW5SZXN1bHQucHVzaChmdW5jUmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRyZW5SZXN1bHQ7XG4gIH1cblxuICBpZiAoYnJhbmNoLmVsZW1lbnQuc2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSgpKSB7XG4gICAgYXdhaXQgY2FsbENoaWxkcmVuKCk7XG4gIH1cblxuICBicmFuY2guY2xlYW5VcCgpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVQcm9jZXNzb3IoKSB7XG4gIGNvbnN0IHRyZWUgPSBUcmVlKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBydW4oZWxlbWVudFByaW1pdGl2ZSkge1xuICAgICAgcmV0dXJuIHByb2Nlc3ModHJlZS5yZXNvbHZlUm9vdChlbGVtZW50UHJpbWl0aXZlKSk7XG4gICAgfSxcbiAgICBzeXN0ZW0oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmVlLFxuICAgICAgICByZXNldCgpIHtcbiAgICAgICAgICB0cmVlLnJlc2V0KCk7XG4gICAgICAgICAgY3JlYXRlVXNlUHViU3ViSG9vay5jbGVhcigpO1xuICAgICAgICAgIGNyZWF0ZVVzZVN0YXRlSG9vay5jbGVhcigpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSwgbm8tcmV0dXJuLWFzc2lnbiwgbWF4LWxlbiAqL1xuaW1wb3J0IGVxdWFsIGZyb20gJ2Zhc3QtZGVlcC1lcXVhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRyZWUoKSB7XG4gIHZhciByb290ID0gY3JlYXRlTmV3QnJhbmNoKCk7XG4gIHZhciBpZHMgPSAwO1xuXG4gIGZ1bmN0aW9uIGdldElkKCkge1xuICAgIHJldHVybiAnYScgKyAoKytpZHMpO1xuICB9O1xuICBmdW5jdGlvbiB1c2VTYW1lQnJhbmNoKGJyYW5jaCwgbmV3RWxlbWVudCkge1xuICAgIG5ld0VsZW1lbnQuaW5pdGlhbGl6ZShicmFuY2guZWxlbWVudC5pZCwgYnJhbmNoLmVsZW1lbnQudXNlZCgpKTtcbiAgICBicmFuY2guZWxlbWVudCA9IG5ld0VsZW1lbnQ7XG4gICAgcmV0dXJuIGJyYW5jaDtcbiAgfVxuICBmdW5jdGlvbiB0cmVlRGlmZihvbGRFbGVtZW50LCBuZXdFbGVtZW50KSB7XG4gICAgaWYgKG9sZEVsZW1lbnQgJiYgb2xkRWxlbWVudC5uYW1lID09PSBuZXdFbGVtZW50Lm5hbWUpIHtcbiAgICAgIHJldHVybiBlcXVhbChvbGRFbGVtZW50LnByb3BzLCBuZXdFbGVtZW50LnByb3BzKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGNyZWF0ZU5ld0JyYW5jaChlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHsgZWxlbWVudC5pbml0aWFsaXplKGdldElkKCkpOyB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGVsZW1lbnQsXG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBjdXJzb3I6IDAsXG4gICAgICBpbml0aWFsaXplKCkge1xuICAgICAgICB0aGlzLmN1cnNvciA9IDA7XG4gICAgICB9LFxuICAgICAgYWRkU3ViQnJhbmNoKG5ld0VsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc3ViQnJhbmNoID0gdGhpcy5jaGlsZHJlblt0aGlzLmN1cnNvcl07XG5cbiAgICAgICAgLy8gdXNpbmcgdGhlIHNhbWUgYnJhbmNoXG4gICAgICAgIGlmIChzdWJCcmFuY2ggJiYgdHJlZURpZmYoc3ViQnJhbmNoLmVsZW1lbnQsIG5ld0VsZW1lbnQpKSB7XG4gICAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgICByZXR1cm4gdXNlU2FtZUJyYW5jaChzdWJCcmFuY2gsIG5ld0VsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRpbmcgYSBuZXcgYnJhbmNoXG4gICAgICAgIGNvbnN0IG5ld1N1YkJyYW5jaCA9IGNyZWF0ZU5ld0JyYW5jaChuZXdFbGVtZW50KTtcblxuICAgICAgICB0aGlzLmNoaWxkcmVuW3RoaXMuY3Vyc29yXSA9IG5ld1N1YkJyYW5jaDtcbiAgICAgICAgdGhpcy5jdXJzb3IgKz0gMTtcbiAgICAgICAgcmV0dXJuIG5ld1N1YkJyYW5jaDtcbiAgICAgIH0sXG4gICAgICBjbGVhblVwKCkge1xuICAgICAgICAvLyBJZiB0aGVyZSdyZSBtb3JlIGJyYW5jaGVzIGluIHRoZSB0cmVlIHRoZW4gd2hhdCB3YXMgcHJvY2Vzc2VkXG4gICAgICAgIGlmICh0aGlzLmN1cnNvciA8IHRoaXMuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coYFghIGNsZWFuIHVwICR7IGkgfSB0byAkeyBicmFuY2guY2hpbGRyZW4ubGVuZ3RoIC0gaSB9YCk7XG4gICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UodGhpcy5jdXJzb3IsIHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gdGhpcy5jdXJzb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZVJvb3QoZWxlbWVudCkge1xuICAgICAgLy8gY29uc29sZS5sb2coYC0tLS0tLS0tLS0tLT4gJHsgZWxlbWVudC5uYW1lIH1gKTtcbiAgICAgIHJldHVybiByb290ID0gKHRyZWVEaWZmKHJvb3QuZWxlbWVudCwgZWxlbWVudCkgP1xuICAgICAgICB1c2VTYW1lQnJhbmNoKHJvb3QsIGVsZW1lbnQpIDpcbiAgICAgICAgY3JlYXRlTmV3QnJhbmNoKGVsZW1lbnQpKTtcbiAgICB9LFxuICAgIHJlc2V0KCkge1xuICAgICAgcm9vdCA9IGNyZWF0ZU5ld0JyYW5jaCgpO1xuICAgICAgaWRzID0gMDtcbiAgICB9LFxuICAgIGdldE51bU9mRWxlbWVudHMoKSB7XG4gICAgICByZXR1cm4gaWRzO1xuICAgIH0sXG4gICAgZGlhZ25vc2UoKSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3BPdmVyKGJyYW5jaCwgaW5kID0gMCkge1xuICAgICAgICBsZXQgYXJyID0gW107XG5cbiAgICAgICAgYXJyLnB1c2goeyBpbmQsIG5hbWU6IGJyYW5jaC5lbGVtZW50Lm5hbWUsIHVzZWQ6IGJyYW5jaC5lbGVtZW50LnVzZWQoKSwgaWQ6IGJyYW5jaC5lbGVtZW50LmlkIH0pO1xuICAgICAgICBpZiAoYnJhbmNoLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBicmFuY2guY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICBhcnIucHVzaChsb29wT3ZlcihjaGlsZCwgaW5kICsgMSkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnI7XG4gICAgICB9KShyb290KTtcbiAgICB9XG4gIH07XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlUHVibGlzaEVsZW1lbnQoaG9zdEVsZW1lbnQpIHtcbiAgcmV0dXJuICh7IHR5cGUsIHBheWxvYWQsIHVzZVB1YlN1YiB9KSA9PiB7XG4gICAgY29uc3QgWyAsIHB1Ymxpc2ggXSA9IHVzZVB1YlN1Yihob3N0RWxlbWVudCk7XG5cbiAgICBwdWJsaXNoKHR5cGUsIHBheWxvYWQpO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3Vic2NyaWJlRWxlbWVudChob3N0RWxlbWVudCkge1xuICByZXR1cm4gKHsgdHlwZSwgdXNlQ2hpbGRyZW4sIHVzZVB1YlN1YiB9KSA9PiB7XG4gICAgY29uc3QgWyBjaGlsZHJlbiBdID0gdXNlQ2hpbGRyZW4oKTtcbiAgICBjb25zdCBbIHN1YnNjcmliZSBdID0gdXNlUHViU3ViKGhvc3RFbGVtZW50KTtcblxuICAgIHN1YnNjcmliZSh0eXBlLCBjaGlsZHJlbik7XG4gIH07XG59O1xuIiwiaW1wb3J0IGNyZWF0ZVB1Ymxpc2hFbGVtZW50IGZyb20gJy4vUHVibGlzaCc7XG5pbXBvcnQgY3JlYXRlU3Vic2NyaWJlRWxlbWVudCBmcm9tICcuL1N1YnNjcmliZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRzSG9vayhlbGVtZW50KSB7XG4gIHJldHVybiB7XG4gICAgUHVibGlzaDogY3JlYXRlUHVibGlzaEVsZW1lbnQoZWxlbWVudCksXG4gICAgU3Vic2NyaWJlOiBjcmVhdGVTdWJzY3JpYmVFbGVtZW50KGVsZW1lbnQpXG4gIH07XG59XG4iLCJjb25zdCBjcmVhdGVVc2VDaGlsZHJlbkhvb2sgPSAoZWxlbWVudCwgY2FsbENoaWxkcmVuKSA9PiAoKSA9PiB7XG4gIGVsZW1lbnQuc2hvdWxkUHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseShmYWxzZSk7XG4gIHJldHVybiBbIGNhbGxDaGlsZHJlbiwgZWxlbWVudC5jaGlsZHJlbiBdO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVXNlQ2hpbGRyZW5Ib29rO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVXNlRWxlbWVudEhvb2soZWxlbWVudCkge1xuICByZXR1cm4gKCkgPT4gWyBlbGVtZW50IF07XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXNzaWduICovXG5cbmNvbnN0IHJlc29sdmVQcm9wID0gKHByb3AsIHN0YWNrSW5kZXgsIHN0YWNrLCBlcnJvcikgPT4ge1xuICBpZiAoc3RhY2tJbmRleCA8IDApIHtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuICBjb25zdCBwYXJlbnQgPSBzdGFja1sgc3RhY2tJbmRleCBdO1xuICBjb25zdCBwcm9kdWN0ID0gcGFyZW50LnJlcXVlc3RQcm9kdWN0ID8gcGFyZW50LnJlcXVlc3RQcm9kdWN0KHByb3ApIDogbnVsbDtcblxuICBpZiAocHJvZHVjdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBwcm9kdWN0LnZhbHVlO1xuICB9XG4gIHJldHVybiByZXNvbHZlUHJvcChwcm9wLCBzdGFja0luZGV4IC0gMSwgc3RhY2ssIGVycm9yKTtcbn07XG5cbmZ1bmN0aW9uIHJlc29sdmVQcm9kdWN0KGVsZW1lbnQsIHN0YWNrKSB7XG4gIGNvbnN0IHsgZGVwZW5kZW5jaWVzIH0gPSBlbGVtZW50LnByb3BzO1xuICBjb25zdCBkYXRhID0ge307XG5cbiAgaWYgKGRlcGVuZGVuY2llcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBkZXBlbmRlbmNpZXMuZm9yRWFjaChwcm9wTmFtZSA9PiB7XG4gICAgZGF0YVtwcm9wTmFtZV0gPSByZXNvbHZlUHJvcChcbiAgICAgIHByb3BOYW1lLFxuICAgICAgc3RhY2subGVuZ3RoIC0gMSxcbiAgICAgIHN0YWNrLFxuICAgICAgbmV3IEVycm9yKFxuICAgICAgICBgXCIkeyBwcm9wTmFtZSB9XCIgcHJvcCByZXF1ZXN0ZWQgYnkgXCIkeyBlbGVtZW50Lm5hbWUgfVwiIGNhbiBub3QgYmUgZm91bmQuXFxuXFxuU3RhY2s6XFxuYCArXG4gICAgICAgIFsgLi4uc3RhY2ssIGVsZW1lbnQgXS5tYXAoKHsgbmFtZSB9KSA9PiBgICA8JHsgbmFtZSB9PmApLmpvaW4oJ1xcbicpXG4gICAgICApXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVXNlUHJvZHVjdEhvb2soZWxlbWVudCwgc3RhY2spIHtcbiAgbGV0IHByb2R1Y3Q7XG4gIGNvbnN0IHJlc29sdmVkUHJvZHVjdFByb3BzID0gcmVzb2x2ZVByb2R1Y3QoZWxlbWVudCwgc3RhY2spO1xuXG4gIGVsZW1lbnQucmVxdWVzdFByb2R1Y3QgPSAocHJvcE5hbWUpID0+IHtcbiAgICBpZiAoZWxlbWVudC5wcm9wcy5leHBvcnRzS2V5d29yZCAmJiBlbGVtZW50LnByb3BzLmV4cG9ydHNLZXl3b3JkID09PSBwcm9wTmFtZSkge1xuICAgICAgcmV0dXJuIHsgdmFsdWU6IHByb2R1Y3QgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIFtcbiAgICAoaW5pdGlhbFZhbHVlKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGluaXRpYWxWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcHJvZHVjdCA9IGluaXRpYWxWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXG4gICAgICAgIG5ld1ZhbHVlID0+IHtcbiAgICAgICAgICBwcm9kdWN0ID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgIF07XG4gICAgfSxcbiAgICByZXNvbHZlZFByb2R1Y3RQcm9wc1xuICBdO1xufTtcbiIsInZhciBzdWJzY3JpYmVycyA9IHt9O1xuXG5jb25zdCBzdWJzY3JpYmUgPSAoZWxlbWVudCwgdHlwZSwgY2FsbGJhY2spID0+IHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgc3Vic2NyaWJlcnNbdHlwZV0gPSB7fTtcbiAgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF0gPSBjYWxsYmFjaztcbiAgcmV0dXJuICgpID0+IHtcbiAgICBkZWxldGUgc3Vic2NyaWJlcnNbdHlwZV1bZWxlbWVudC5pZF07XG4gIH07XG59O1xuY29uc3QgcHVibGlzaCA9IChlbGVtZW50LCB0eXBlLCBwYXlsb2FkKSA9PiB7XG4gIGlmICghc3Vic2NyaWJlcnNbdHlwZV0pIHJldHVybjtcbiAgT2JqZWN0LmtleXMoc3Vic2NyaWJlcnNbdHlwZV0pLmZvckVhY2goaWQgPT4ge1xuICAgIHN1YnNjcmliZXJzW3R5cGVdW2lkXShwYXlsb2FkLCBlbGVtZW50KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVVc2VQdWJTdWJIb29rKGVsZW1lbnQpIHtcbiAgcmV0dXJuIChzY29wZWRFbGVtZW50KSA9PiAoW1xuICAgIC8vIHN1YnNjcmliZVxuICAgICguLi5wYXJhbXMpID0+IHN1YnNjcmliZShzY29wZWRFbGVtZW50IHx8IGVsZW1lbnQsIC4uLnBhcmFtcyksXG4gICAgLy8gcHVibGlzaFxuICAgICguLi5wYXJhbXMpID0+IHB1Ymxpc2goc2NvcGVkRWxlbWVudCB8fCBlbGVtZW50LCAuLi5wYXJhbXMpLFxuICAgIC8vIGxpc3Qgb2YgYWxsIHN1YnNjcmliZXJzXG4gICAgc3Vic2NyaWJlcnNcbiAgXSk7XG59XG5cbmNyZWF0ZVVzZVB1YlN1Ykhvb2suY2xlYXIgPSAoKSA9PiB7XG4gIHN1YnNjcmliZXJzID0ge307XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuXG5jb25zdCBTdG9yYWdlID0ge1xuICBlbGVtZW50czoge30sXG4gIGdldChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudHNbZWxlbWVudC5pZF0pIHtcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2VsZW1lbnQuaWRdO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tlbGVtZW50LmlkXSA9IHsgc3RhdGVzOiBbXSwgY29uc3VtZXI6IDAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVXNlU3RhdGVIb29rKGVsZW1lbnQsIHJlcnVuKSB7XG4gIGNvbnN0IHN0b3JhZ2UgPSBTdG9yYWdlLmdldChlbGVtZW50KTtcblxuICByZXR1cm4gKGluaXRpYWxTdGF0ZSkgPT4ge1xuICAgIGxldCBpbmRleDtcblxuICAgIC8vIGZpcnN0IHJ1blxuICAgIGlmIChlbGVtZW50LnVzZWQoKSA9PT0gMCkge1xuICAgICAgc3RvcmFnZS5zdGF0ZXMucHVzaChpbml0aWFsU3RhdGUpO1xuICAgICAgaW5kZXggPSBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxO1xuXG4gICAgLy8gb3RoZXIgcnVuc1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IHN0b3JhZ2UuY29uc3VtZXI7XG4gICAgICBzdG9yYWdlLmNvbnN1bWVyID0gaW5kZXggPCBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxID8gc3RvcmFnZS5jb25zdW1lciArIDEgOiAwO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICBzdG9yYWdlLnN0YXRlc1tpbmRleF0sXG4gICAgICBuZXdTdGF0ZSA9PiB7XG4gICAgICAgIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XSA9IG5ld1N0YXRlO1xuICAgICAgICBpZiAoIWVsZW1lbnQuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgICByZXJ1bigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgIH1cbiAgICBdO1xuICB9O1xufVxuXG5jcmVhdGVVc2VTdGF0ZUhvb2suY2xlYXIgPSAoKSA9PiB7XG4gIFN0b3JhZ2UuZWxlbWVudHMgPSB7fTtcbn07XG4iLCJpbXBvcnQgY3JlYXRlUHJvY2Vzc29yIGZyb20gJy4vUHJvY2Vzc29yJztcbmltcG9ydCBpc0FjdE1MRWxlbWVudCBmcm9tICcuL3V0aWxzL2lzQWN0TUxFbGVtZW50JztcbmltcG9ydCBBY3RFbGVtZW50IGZyb20gJy4vQWN0RWxlbWVudCc7XG5cbmNvbnN0IHByb2Nlc3NvciA9IGNyZWF0ZVByb2Nlc3NvcigpO1xuXG5mdW5jdGlvbiBjcmVhdGUoZnVuYywgcHJvcHMsIC4uLmNoaWxkcmVuKSB7XG4gIHJldHVybiBBY3RFbGVtZW50KGZ1bmMsIHByb3BzLCBjaGlsZHJlbik7XG59XG5mdW5jdGlvbiBydW4oZWxlbWVudCkge1xuICBpZiAoIWlzQWN0TUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBBY3RNTCBlbGVtZW50IGV4cGVjdGVkLiBJbnN0ZWFkICR7IGVsZW1lbnQudG9TdHJpbmcoKSB9IHBhc3NlZC5gKTtcbiAgfVxuICByZXR1cm4gcHJvY2Vzc29yLnJ1bihlbGVtZW50KTtcbn1cblxuY29uc3QgQSA9IGNyZWF0ZTtcbmNvbnN0IEZyYWdtZW50ID0gKCkgPT4ge307XG5cbmV4cG9ydCB7XG4gIEEsXG4gIHJ1bixcbiAgRnJhZ21lbnQsXG4gIHByb2Nlc3NvclxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWN0TUxFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5fX2FjdG1sID09PSB0cnVlO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiY29uc3QgJCA9IChzZWxlY3RvcikgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5jb25zdCBjb250YWluZXIgPSAkKCcudG9kby1saXN0Jyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQ29udGFpbmVyKHsgdXNlQ2hpbGRyZW4gfSkge1xuICBjb25zdCBbICwgY29udGVudCBdID0gdXNlQ2hpbGRyZW4oKTtcblxuICBjb250YWluZXIuaW5uZXJIVE1MID0gY29udGVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIoeyB1c2VDaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFsgY2hpbGRyZW4gXSA9IHVzZUNoaWxkcmVuKCk7XG5cbiAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgIGNvbnN0IHR5cGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJyk7XG5cbiAgICBjaGlsZHJlbih0eXBlLCB0b2RvSW5kZXgpO1xuICB9KTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9zcmMnO1xuXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpc3RlbmVyKHsgdXNlRWxlbWVudHMgfSkge1xuICBjb25zdCB7IFB1Ymxpc2ggfSA9IHVzZUVsZW1lbnRzKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGFpbmVyPlxuICAgICAge1xuICAgICAgICAodHlwZSwgdG9kb0luZGV4KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIDxQdWJsaXNoIHR5cGU9eyB0eXBlIH0gcGF5bG9hZD17IHRvZG9JbmRleCB9IC8+O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgPC9Db250YWluZXI+XG4gICk7XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vc3JjJztcblxuaW1wb3J0IHsgRmlsbENvbnRhaW5lciB9IGZyb20gJy4vRE9NJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVuZGVyZXIoeyB0b2RvcyB9KSB7XG4gIHJldHVybiAoXG4gICAgPEZpbGxDb250YWluZXI+XG4gICAgICB7XG4gICAgICAgIHRvZG9zLm1hcCgodG9kbywgaSkgPT4ge1xuICAgICAgICAgIHJldHVybiBgXG4gICAgICAgICAgICA8bGkgY2xhc3M9JyR7IHRvZG8uY29tcGxldGVkID8gJ2NvbXBsZXRlZCcgOiAnJyB9Jz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZpZXdcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgXG4gICAgICAgICAgICAgICAgICBjbGFzcz1cInRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgZGF0YS1pbmRleD1cIiR7IGkgfVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWFjdGlvbj1cInRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgICAkeyB0b2RvLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnIH0+XG4gICAgICAgICAgICAgICAgPGxhYmVsPiR7IHRvZG8ubGFiZWwgfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJkZXN0cm95XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hY3Rpb249XCJkZWxldGVcIj48L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImVkaXRcIiB2YWx1ZT1cIlJ1bGUgdGhlIHdlYlwiPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICBgO1xuICAgICAgICB9KS5qb2luKCcnKVxuICAgICAgfVxuICAgIDwvRmlsbENvbnRhaW5lcj5cbiAgKTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG4vKiogQGpzeCBBICovXG5pbXBvcnQgeyBBIH0gZnJvbSAnLi4vLi4vLi4vc3JjJztcblxudmFyIGluaXRpYWxWYWx1ZSA9IFtcbiAge1xuICAgIGxhYmVsOiAnRmlyc3QgdGFzaycsXG4gICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICBlZGl0aW5nOiBmYWxzZVxuICB9LFxuICB7XG4gICAgbGFiZWw6ICdTZWNvbmQgdGFzaycsXG4gICAgY29tcGxldGVkOiBmYWxzZSxcbiAgICBlZGl0aW5nOiBmYWxzZVxuICB9XG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTdG9yZSh7IHVzZVN0YXRlLCB1c2VQcm9kdWN0LCB1c2VFbGVtZW50cyB9KSB7XG4gIGNvbnN0IFsgdG9kb3MsIHNldFRvZG9zIF0gPSB1c2VTdGF0ZShpbml0aWFsVmFsdWUpO1xuICBjb25zdCBbIHNldFByb2R1Y3QgXSA9IHVzZVByb2R1Y3QodG9kb3MpO1xuICBjb25zdCB7IFN1YnNjcmliZSB9ID0gdXNlRWxlbWVudHMoKTtcblxuICByZXR1cm4gKFxuICAgIDxTdWJzY3JpYmUgdHlwZT0ndG9nZ2xlJz5cbiAgICAgIHtcbiAgICAgICAgdG9kb0luZGV4ID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyh0b2RvSW5kZXgpO1xuICAgICAgICAgIGNvbnN0IG5ld1N0YXRlID0gdG9kb3MubWFwKCh0b2RvLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSB0b2RvSW5kZXgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi50b2RvLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZDogIXRvZG8uY29tcGxldGVkXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdG9kbztcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHNldFRvZG9zKG5ld1N0YXRlKTtcbiAgICAgICAgICBzZXRQcm9kdWN0KG5ld1N0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIDwvU3Vic2NyaWJlPlxuICApO1xufVxuIiwiLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSwgcnVuLCBGcmFnbWVudCB9IGZyb20gJy4uLy4uLy4uL3NyYyc7XG5cbmltcG9ydCBTdG9yZSBmcm9tICcuL1N0b3JlJztcbmltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBMaXN0ZW5lciBmcm9tICcuL0xpc3RlbmVyJztcblxuZnVuY3Rpb24gQXBwKCkge1xuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxMaXN0ZW5lciAvPlxuICAgICAgPFN0b3JlIGV4cG9ydHM9J3RvZG9zJz5cbiAgICAgICAgPFJlbmRlcmVyICR0b2RvcyAvPlxuICAgICAgPC9TdG9yZT5cbiAgICA8L0ZyYWdtZW50PlxuICApO1xufTtcblxucnVuKDxBcHAgLz4pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==