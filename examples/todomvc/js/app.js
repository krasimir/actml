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

/***/ "../../src/ActElement.js":
/*!*************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/ActElement.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createElement; });
/* harmony import */ var _utils_resolveProduct__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/resolveProduct */ "../../src/utils/resolveProduct.js");
/* harmony import */ var _utils_getMeta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getMeta */ "../../src/utils/getMeta.js");
/* harmony import */ var _utils_isActMLElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/isActMLElement */ "../../src/utils/isActMLElement.js");
/* harmony import */ var _hooks_utils_Product__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hooks/utils/Product */ "../../src/hooks/utils/Product.js");
/* harmony import */ var _utils_uid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uid */ "../../src/utils/uid.js");
/* harmony import */ var _hooks_useChildren__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hooks/useChildren */ "../../src/hooks/useChildren.js");
/* harmony import */ var _hooks_useElement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./hooks/useElement */ "../../src/hooks/useElement.js");
/* harmony import */ var _hooks_useProduct__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hooks/useProduct */ "../../src/hooks/useProduct.js");
/* harmony import */ var _hooks_usePubSub__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./hooks/usePubSub */ "../../src/hooks/usePubSub.js");
/* harmony import */ var _hooks_useState__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hooks/useState */ "../../src/hooks/useState.js");
/* harmony import */ var _hooks_useElements__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./hooks/useElements */ "../../src/hooks/useElements.js");
/* eslint-disable no-use-before-define, consistent-return */











function createElement(func, props, children) {
  const element = {
    __actml: true,
    id: Object(_utils_uid__WEBPACK_IMPORTED_MODULE_4__["default"])(),
    parent: null,
    meta: Object(_utils_getMeta__WEBPACK_IMPORTED_MODULE_1__["default"])(func, props),
    run,
    requestProduct,
    isUsed: false,
    isRunning: false
  };
  const product = Object(_hooks_utils_Product__WEBPACK_IMPORTED_MODULE_3__["createProduct"])(element);
  const {
    hook: useChildren,
    callChildren,
    processChildrenAutomatically
  } = Object(_hooks_useChildren__WEBPACK_IMPORTED_MODULE_5__["default"])(element, children);
  const useElement = Object(_hooks_useElement__WEBPACK_IMPORTED_MODULE_6__["default"])(element);
  const useProduct = Object(_hooks_useProduct__WEBPACK_IMPORTED_MODULE_7__["default"])(product);
  const usePubSub = Object(_hooks_usePubSub__WEBPACK_IMPORTED_MODULE_8__["default"])(element);
  const useState = Object(_hooks_useState__WEBPACK_IMPORTED_MODULE_9__["default"])(element);

  function requestProduct(propName) {
    const {
      exportsKeyword
    } = element.meta;

    if (exportsKeyword && exportsKeyword === propName) {
      return {
        value: product.get()
      };
    }
  }

  async function run(parent, additionalProps = {}) {
    element.parent = parent;
    element.isRunning = true;
    processChildrenAutomatically.process = true;
    let result = func({ ...props,
      ...additionalProps,
      ...Object(_utils_resolveProduct__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      useChildren,
      useElement,
      useProduct,
      usePubSub,
      useState,
      useElements: Object(_hooks_useElements__WEBPACK_IMPORTED_MODULE_10__["default"])(element)
    });
    let genResult, toGenValue;
    element.isRunning = false;
    element.isUsed = true; // handling a promise

    if (result && result.then) {
      result = await result; // handling a generator
    } else if (result && typeof result.next === 'function') {
      genResult = result.next();

      while (!genResult.done) {
        if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_2__["default"])(genResult.value)) {
          toGenValue = await genResult.value.run(element);
        }

        genResult = result.next(toGenValue);
      }

      if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_2__["default"])(genResult.value)) {
        result = await genResult.value.run(element);
      } else {
        result = genResult.value;
      } // handling another ActML element

    } else if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_2__["default"])(result)) {
      result = await result.run(element);
    } // handling children


    if (processChildrenAutomatically.process) {
      await callChildren();
    }

    return result;
  }

  return element;
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
    const [, publish] = usePubSub();
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

/***/ "../../src/hooks/useChildren.js":
/*!********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/useChildren.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUseChildrenHook; });
/* harmony import */ var _utils_isActMLElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/isActMLElement */ "../../src/utils/isActMLElement.js");

function createUseChildrenHook(element, children) {
  let processChildrenAutomatically = {
    process: true
  };

  async function callChildren(newProps, ...rest) {
    const result = [];

    if (children && children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_0__["default"])(children[i])) {
          result.push((await children[i].run(element, newProps)));
        } else if (typeof children[i] === 'function') {
          const funcResult = await children[i](newProps, ...rest);

          if (Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_0__["default"])(funcResult)) {
            result.push((await funcResult.run(element, newProps)));
          } else {
            result.push(funcResult);
          }
        }
      }
    }

    return result;
  }

  return {
    hook: () => {
      processChildrenAutomatically.process = false;
      return [callChildren, children];
    },
    callChildren,
    processChildrenAutomatically
  };
}
;

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

/***/ "../../src/hooks/useElements.js":
/*!********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/useElements.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createUseElementsHook; });
/* harmony import */ var _elements_Subscribe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/Subscribe */ "../../src/hooks/elements/Subscribe.js");
/* harmony import */ var _elements_Publish__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements/Publish */ "../../src/hooks/elements/Publish.js");


function createUseElementsHook(hostElement) {
  return () => ({
    Subscribe: Object(_elements_Subscribe__WEBPACK_IMPORTED_MODULE_0__["default"])(hostElement),
    Publish: Object(_elements_Publish__WEBPACK_IMPORTED_MODULE_1__["default"])(hostElement)
  });
}
;

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
function createUseProductHook(product) {
  return initialValue => {
    if (typeof initialValue !== 'undefined') {
      product.set(initialValue);
    }

    return [newValue => product.set(newValue)];
  };
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
  (...params) => publish(scopedElement || element, ...params), // clear
  () => {
    subscribers = {};
  }, // list of all subscribers
  subscribers];
}

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
function createUseStateHook(element) {
  const storage = {
    states: []
  };
  let consumer = 0;
  return initialState => {
    let index;

    if (!element.isUsed) {
      storage.states.push(initialState);
      index = storage.states.length - 1;
    } else {
      index = consumer;
      consumer = index < storage.states.length - 1 ? consumer + 1 : 0;
    }

    return [storage.states[index], newState => {
      storage.states[index] = newState;

      if (!element.isRunning) {
        element.run(element.parent);
      }

      return newState;
    }];
  };
}

/***/ }),

/***/ "../../src/hooks/utils/Product.js":
/*!**********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/hooks/utils/Product.js ***!
  \**********************************************************************/
/*! exports provided: createProduct */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProduct", function() { return createProduct; });
/* eslint-disable no-return-assign */
const createProduct = () => {
  var state;
  return {
    set(value) {
      return state = value;
    },

    get() {
      return state;
    }

  };
};

/***/ }),

/***/ "../../src/index.js":
/*!********************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/index.js ***!
  \********************************************************/
/*! exports provided: A, run, Fragment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return A; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "run", function() { return run; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fragment", function() { return Fragment; });
/* harmony import */ var _ActElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActElement */ "../../src/ActElement.js");
/* harmony import */ var _utils_isActMLElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/isActMLElement */ "../../src/utils/isActMLElement.js");



function create(func, props, ...children) {
  return Object(_ActElement__WEBPACK_IMPORTED_MODULE_0__["default"])(func, props, children);
}

function run(element) {
  if (!Object(_utils_isActMLElement__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
    throw new Error(`ActML element expected. Instead ${element.toString()} passed.`);
  }

  return element.run();
}

const A = create;

const Fragment = () => {};



/***/ }),

/***/ "../../src/utils/getMeta.js":
/*!****************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/utils/getMeta.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getMeta; });
const getFuncName = func => {
  if (func.name) return func.name;
  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());
  return result ? result[1] : 'unknown';
};

function getMeta(func, props) {
  const propNames = props ? Object.keys(props) : [];
  const dependencies = [];
  let exportsKeyword;
  propNames.forEach(propName => {
    if (propName.charAt(0) === '$') {
      dependencies.push(propName.substr(1, propName.length));
    } else if (propName === 'exports') {
      exportsKeyword = props.exports;
    }
  });
  return {
    name: getFuncName(func),
    dependencies,
    exportsKeyword
  };
}
;

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

/***/ "../../src/utils/resolveProduct.js":
/*!***********************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/utils/resolveProduct.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return resolveProduct; });
const resolveProp = (prop, element, parent, errorMessage, stack) => {
  if (parent) {
    const productValue = parent.requestProduct(prop);

    if (productValue) {
      return productValue.value;
    } else if (parent.parent) {
      stack.push(parent.meta.name);
      return resolveProp(prop, element, parent.parent, errorMessage, stack);
    }

    stack.push(parent.meta.name);
  }

  throw new Error(errorMessage + '\n\nStack:\n' + stack.reverse().map(n => `  <${n}>`).join('\n'));
};

function resolveProduct(element) {
  const {
    dependencies,
    name: elementName
  } = element.meta;
  const data = {};

  if (dependencies.length === 0) {
    return {};
  }

  dependencies.forEach(propName => {
    data[propName] = resolveProp(propName, element, element.parent, `"${propName}" prop requested by "${elementName}" can not be found.`, [elementName]);
  });
  return data;
}
;

/***/ }),

/***/ "../../src/utils/uid.js":
/*!************************************************************!*\
  !*** /Users/krasimir/Work/Krasimir/actml/src/utils/uid.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getId; });
var i = 0;
function getId() {
  return 'a' + ++i;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy9BY3RFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvaG9va3MvZWxlbWVudHMvUHVibGlzaC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL2VsZW1lbnRzL1N1YnNjcmliZS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL3VzZUNoaWxkcmVuLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvaG9va3MvdXNlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL3VzZUVsZW1lbnRzLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvaG9va3MvdXNlUHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL3VzZVB1YlN1Yi5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2hvb2tzL3VzZVN0YXRlLmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvaG9va3MvdXRpbHMvUHJvZHVjdC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvdXRpbHMvZ2V0TWV0YS5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2tyYXNpbWlyL1dvcmsvS3Jhc2ltaXIvYWN0bWwvc3JjL3V0aWxzL2lzQWN0TUxFbGVtZW50LmpzIiwid2VicGFjazovLy8vVXNlcnMva3Jhc2ltaXIvV29yay9LcmFzaW1pci9hY3RtbC9zcmMvdXRpbHMvcmVzb2x2ZVByb2R1Y3QuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9rcmFzaW1pci9Xb3JrL0tyYXNpbWlyL2FjdG1sL3NyYy91dGlscy91aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXJyYXlXaXRoSG9sZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvaXRlcmFibGVUb0FycmF5TGltaXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvbm9uSXRlcmFibGVSZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL29iamVjdFNwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTGlzdGVuZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1JlbmRlcmVyLmpzIiwid2VicGFjazovLy8uL3NyYy9TdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiY3JlYXRlRWxlbWVudCIsImZ1bmMiLCJwcm9wcyIsImNoaWxkcmVuIiwiZWxlbWVudCIsIl9fYWN0bWwiLCJpZCIsImdldElkIiwicGFyZW50IiwibWV0YSIsImdldE1ldGEiLCJydW4iLCJyZXF1ZXN0UHJvZHVjdCIsImlzVXNlZCIsImlzUnVubmluZyIsInByb2R1Y3QiLCJjcmVhdGVQcm9kdWN0IiwiaG9vayIsInVzZUNoaWxkcmVuIiwiY2FsbENoaWxkcmVuIiwicHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseSIsImNyZWF0ZVVzZUNoaWxkcmVuSG9vayIsInVzZUVsZW1lbnQiLCJjcmVhdGVVc2VFbGVtZW50SG9vayIsInVzZVByb2R1Y3QiLCJjcmVhdGVVc2VQcm9kdWN0SG9vayIsInVzZVB1YlN1YiIsImNyZWF0ZVVzZVB1YlN1Ykhvb2siLCJ1c2VTdGF0ZSIsImNyZWF0ZVVzZVN0YXRlSG9vayIsInByb3BOYW1lIiwiZXhwb3J0c0tleXdvcmQiLCJ2YWx1ZSIsImdldCIsImFkZGl0aW9uYWxQcm9wcyIsInByb2Nlc3MiLCJyZXN1bHQiLCJyZXNvbHZlUHJvZHVjdCIsInVzZUVsZW1lbnRzIiwiY3JlYXRlVXNlRWxlbWVudHNIb29rIiwiZ2VuUmVzdWx0IiwidG9HZW5WYWx1ZSIsInRoZW4iLCJuZXh0IiwiZG9uZSIsImlzQWN0TUxFbGVtZW50IiwiY3JlYXRlUHVibGlzaEVsZW1lbnQiLCJob3N0RWxlbWVudCIsInR5cGUiLCJwYXlsb2FkIiwicHVibGlzaCIsImNyZWF0ZVN1YnNjcmliZUVsZW1lbnQiLCJzdWJzY3JpYmUiLCJuZXdQcm9wcyIsInJlc3QiLCJsZW5ndGgiLCJpIiwicHVzaCIsImZ1bmNSZXN1bHQiLCJTdWJzY3JpYmUiLCJQdWJsaXNoIiwiaW5pdGlhbFZhbHVlIiwic2V0IiwibmV3VmFsdWUiLCJzdWJzY3JpYmVycyIsImNhbGxiYWNrIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJzY29wZWRFbGVtZW50IiwicGFyYW1zIiwic3RvcmFnZSIsInN0YXRlcyIsImNvbnN1bWVyIiwiaW5pdGlhbFN0YXRlIiwiaW5kZXgiLCJuZXdTdGF0ZSIsInN0YXRlIiwiY3JlYXRlIiwiQWN0RWxlbWVudCIsIkVycm9yIiwidG9TdHJpbmciLCJBIiwiRnJhZ21lbnQiLCJnZXRGdW5jTmFtZSIsIm5hbWUiLCJleGVjIiwicHJvcE5hbWVzIiwiZGVwZW5kZW5jaWVzIiwiY2hhckF0Iiwic3Vic3RyIiwiZXhwb3J0cyIsInJlc29sdmVQcm9wIiwicHJvcCIsImVycm9yTWVzc2FnZSIsInN0YWNrIiwicHJvZHVjdFZhbHVlIiwicmV2ZXJzZSIsIm1hcCIsIm4iLCJqb2luIiwiZWxlbWVudE5hbWUiLCJkYXRhIiwiJCIsInNlbGVjdG9yIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY29udGFpbmVyIiwiRmlsbENvbnRhaW5lciIsImNvbnRlbnQiLCJpbm5lckhUTUwiLCJDb250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRvZG9JbmRleCIsInBhcnNlSW50IiwidGFyZ2V0IiwiZ2V0QXR0cmlidXRlIiwiTGlzdGVuZXIiLCJSZW5kZXJlciIsInRvZG9zIiwidG9kbyIsImNvbXBsZXRlZCIsImxhYmVsIiwiZWRpdGluZyIsIlN0b3JlIiwic2V0VG9kb3MiLCJzZXRQcm9kdWN0IiwiY29uc29sZSIsImxvZyIsIkFwcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFp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O0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFD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QUFDdEIsR0FBTixDQUFVLFVBQUN1QixJQUFELEVBQU85QyxLQUFQLEVBQWlCO0FBQzFDLFVBQUlBLEtBQUssS0FBS3VDLFNBQWQsRUFBeUI7QUFDdkIsOEZBQ0tPLElBREw7QUFFRUMsbUJBQVMsRUFBRSxDQUFDRCxJQUFJLENBQUNDO0FBRm5CO0FBSUQ7O0FBQ0QsYUFBT0QsSUFBUDtBQUNELEtBUmdCLENBQWpCO0FBVUFLLFlBQVEsQ0FBQ2xELFFBQUQsQ0FBUjtBQUNBbUQsY0FBVSxDQUFDbkQsUUFBRCxDQUFWO0FBQ0QsR0FoQkwsQ0FERjtBQXFCRCxDOzs7Ozs7Ozs7Ozs7QUMzQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsU0FBU3NELEdBQVQsR0FBZTtBQUNiLFNBQ0UsK0NBQUMsNkNBQUQsUUFDRSwrQ0FBQyxpREFBRCxPQURGLEVBRUUsK0NBQUMsOENBQUQ7QUFBTyxXQUFPLEVBQUM7QUFBZixLQUNFLCtDQUFDLGlEQUFEO0FBQVUsVUFBTTtBQUFoQixJQURGLENBRkYsQ0FERjtBQVFEOztBQUFBO0FBRUR2SCxnREFBRyxDQUFDLCtDQUFDLEdBQUQsT0FBRCxDQUFILEMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBjb25zaXN0ZW50LXJldHVybiAqL1xuXG5pbXBvcnQgcmVzb2x2ZVByb2R1Y3QgZnJvbSAnLi91dGlscy9yZXNvbHZlUHJvZHVjdCc7XG5pbXBvcnQgZ2V0TWV0YSBmcm9tICcuL3V0aWxzL2dldE1ldGEnO1xuaW1wb3J0IGlzQWN0TUxFbGVtZW50IGZyb20gJy4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnO1xuaW1wb3J0IHsgY3JlYXRlUHJvZHVjdCB9IGZyb20gJy4vaG9va3MvdXRpbHMvUHJvZHVjdCc7XG5pbXBvcnQgZ2V0SWQgZnJvbSAnLi91dGlscy91aWQnO1xuaW1wb3J0IGNyZWF0ZVVzZUNoaWxkcmVuSG9vayBmcm9tICcuL2hvb2tzL3VzZUNoaWxkcmVuJztcbmltcG9ydCBjcmVhdGVVc2VFbGVtZW50SG9vayBmcm9tICcuL2hvb2tzL3VzZUVsZW1lbnQnO1xuaW1wb3J0IGNyZWF0ZVVzZVByb2R1Y3RIb29rIGZyb20gJy4vaG9va3MvdXNlUHJvZHVjdCc7XG5pbXBvcnQgY3JlYXRlVXNlUHViU3ViSG9vayBmcm9tICcuL2hvb2tzL3VzZVB1YlN1Yic7XG5pbXBvcnQgY3JlYXRlVXNlU3RhdGVIb29rIGZyb20gJy4vaG9va3MvdXNlU3RhdGUnO1xuaW1wb3J0IGNyZWF0ZVVzZUVsZW1lbnRzSG9vayBmcm9tICcuL2hvb2tzL3VzZUVsZW1lbnRzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChmdW5jLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgY29uc3QgZWxlbWVudCA9IHtcbiAgICBfX2FjdG1sOiB0cnVlLFxuICAgIGlkOiBnZXRJZCgpLFxuICAgIHBhcmVudDogbnVsbCxcbiAgICBtZXRhOiBnZXRNZXRhKGZ1bmMsIHByb3BzKSxcbiAgICBydW4sXG4gICAgcmVxdWVzdFByb2R1Y3QsXG4gICAgaXNVc2VkOiBmYWxzZSxcbiAgICBpc1J1bm5pbmc6IGZhbHNlXG4gIH07XG4gIGNvbnN0IHByb2R1Y3QgPSBjcmVhdGVQcm9kdWN0KGVsZW1lbnQpO1xuICBjb25zdCB7XG4gICAgaG9vazogdXNlQ2hpbGRyZW4sXG4gICAgY2FsbENoaWxkcmVuLFxuICAgIHByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHlcbiAgfSA9IGNyZWF0ZVVzZUNoaWxkcmVuSG9vayhlbGVtZW50LCBjaGlsZHJlbik7XG4gIGNvbnN0IHVzZUVsZW1lbnQgPSBjcmVhdGVVc2VFbGVtZW50SG9vayhlbGVtZW50KTtcbiAgY29uc3QgdXNlUHJvZHVjdCA9IGNyZWF0ZVVzZVByb2R1Y3RIb29rKHByb2R1Y3QpO1xuICBjb25zdCB1c2VQdWJTdWIgPSBjcmVhdGVVc2VQdWJTdWJIb29rKGVsZW1lbnQpO1xuICBjb25zdCB1c2VTdGF0ZSA9IGNyZWF0ZVVzZVN0YXRlSG9vayhlbGVtZW50KTtcblxuICBmdW5jdGlvbiByZXF1ZXN0UHJvZHVjdChwcm9wTmFtZSkge1xuICAgIGNvbnN0IHsgZXhwb3J0c0tleXdvcmQgfSA9IGVsZW1lbnQubWV0YTtcblxuICAgIGlmIChleHBvcnRzS2V5d29yZCAmJiBleHBvcnRzS2V5d29yZCA9PT0gcHJvcE5hbWUpIHtcbiAgICAgIHJldHVybiB7IHZhbHVlOiBwcm9kdWN0LmdldCgpIH07XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gcnVuKHBhcmVudCwgYWRkaXRpb25hbFByb3BzID0ge30pIHtcbiAgICBlbGVtZW50LnBhcmVudCA9IHBhcmVudDtcbiAgICBlbGVtZW50LmlzUnVubmluZyA9IHRydWU7XG4gICAgcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseS5wcm9jZXNzID0gdHJ1ZTtcblxuICAgIGxldCByZXN1bHQgPSBmdW5jKHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgLi4uYWRkaXRpb25hbFByb3BzLFxuICAgICAgLi4ucmVzb2x2ZVByb2R1Y3QoZWxlbWVudCksXG4gICAgICB1c2VDaGlsZHJlbixcbiAgICAgIHVzZUVsZW1lbnQsXG4gICAgICB1c2VQcm9kdWN0LFxuICAgICAgdXNlUHViU3ViLFxuICAgICAgdXNlU3RhdGUsXG4gICAgICB1c2VFbGVtZW50czogY3JlYXRlVXNlRWxlbWVudHNIb29rKGVsZW1lbnQpXG4gICAgfSk7XG4gICAgbGV0IGdlblJlc3VsdCwgdG9HZW5WYWx1ZTtcblxuICAgIGVsZW1lbnQuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgZWxlbWVudC5pc1VzZWQgPSB0cnVlO1xuXG4gICAgLy8gaGFuZGxpbmcgYSBwcm9taXNlXG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHQudGhlbikge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0O1xuXG4gICAgLy8gaGFuZGxpbmcgYSBnZW5lcmF0b3JcbiAgICB9IGVsc2UgaWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0Lm5leHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGdlblJlc3VsdCA9IHJlc3VsdC5uZXh0KCk7XG4gICAgICB3aGlsZSAoIWdlblJlc3VsdC5kb25lKSB7XG4gICAgICAgIGlmIChpc0FjdE1MRWxlbWVudChnZW5SZXN1bHQudmFsdWUpKSB7XG4gICAgICAgICAgdG9HZW5WYWx1ZSA9IGF3YWl0IGdlblJlc3VsdC52YWx1ZS5ydW4oZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2VuUmVzdWx0ID0gcmVzdWx0Lm5leHQodG9HZW5WYWx1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNBY3RNTEVsZW1lbnQoZ2VuUmVzdWx0LnZhbHVlKSkge1xuICAgICAgICByZXN1bHQgPSBhd2FpdCBnZW5SZXN1bHQudmFsdWUucnVuKGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0gZ2VuUmVzdWx0LnZhbHVlO1xuICAgICAgfVxuXG4gICAgLy8gaGFuZGxpbmcgYW5vdGhlciBBY3RNTCBlbGVtZW50XG4gICAgfSBlbHNlIGlmIChpc0FjdE1MRWxlbWVudChyZXN1bHQpKSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCByZXN1bHQucnVuKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIGhhbmRsaW5nIGNoaWxkcmVuXG4gICAgaWYgKHByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkucHJvY2Vzcykge1xuICAgICAgYXdhaXQgY2FsbENoaWxkcmVuKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVB1Ymxpc2hFbGVtZW50KGhvc3RFbGVtZW50KSB7XG4gIHJldHVybiAoeyB0eXBlLCBwYXlsb2FkLCB1c2VQdWJTdWIgfSkgPT4ge1xuICAgIGNvbnN0IFsgLCBwdWJsaXNoIF0gPSB1c2VQdWJTdWIoKTtcblxuICAgIHB1Ymxpc2godHlwZSwgcGF5bG9hZCk7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdWJzY3JpYmVFbGVtZW50KGhvc3RFbGVtZW50KSB7XG4gIHJldHVybiAoeyB0eXBlLCB1c2VDaGlsZHJlbiwgdXNlUHViU3ViIH0pID0+IHtcbiAgICBjb25zdCBbIGNoaWxkcmVuIF0gPSB1c2VDaGlsZHJlbigpO1xuICAgIGNvbnN0IFsgc3Vic2NyaWJlIF0gPSB1c2VQdWJTdWIoaG9zdEVsZW1lbnQpO1xuXG4gICAgc3Vic2NyaWJlKHR5cGUsIGNoaWxkcmVuKTtcbiAgfTtcbn07XG4iLCJpbXBvcnQgaXNBY3RNTEVsZW1lbnQgZnJvbSAnLi4vdXRpbHMvaXNBY3RNTEVsZW1lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVVc2VDaGlsZHJlbkhvb2soZWxlbWVudCwgY2hpbGRyZW4pIHtcbiAgbGV0IHByb2Nlc3NDaGlsZHJlbkF1dG9tYXRpY2FsbHkgPSB7IHByb2Nlc3M6IHRydWUgfTtcblxuICBhc3luYyBmdW5jdGlvbiBjYWxsQ2hpbGRyZW4obmV3UHJvcHMsIC4uLnJlc3QpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpc0FjdE1MRWxlbWVudChjaGlsZHJlbltpXSkpIHtcbiAgICAgICAgICByZXN1bHQucHVzaChhd2FpdCBjaGlsZHJlbltpXS5ydW4oZWxlbWVudCwgbmV3UHJvcHMpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2hpbGRyZW5baV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBjb25zdCBmdW5jUmVzdWx0ID0gYXdhaXQgY2hpbGRyZW5baV0obmV3UHJvcHMsIC4uLnJlc3QpO1xuXG4gICAgICAgICAgaWYgKGlzQWN0TUxFbGVtZW50KGZ1bmNSZXN1bHQpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChhd2FpdCBmdW5jUmVzdWx0LnJ1bihlbGVtZW50LCBuZXdQcm9wcykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChmdW5jUmVzdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaG9vazogKCkgPT4ge1xuICAgICAgcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseS5wcm9jZXNzID0gZmFsc2U7XG4gICAgICByZXR1cm4gWyBjYWxsQ2hpbGRyZW4sIGNoaWxkcmVuIF07XG4gICAgfSxcbiAgICBjYWxsQ2hpbGRyZW4sXG4gICAgcHJvY2Vzc0NoaWxkcmVuQXV0b21hdGljYWxseVxuICB9O1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVVzZUVsZW1lbnRIb29rKGVsZW1lbnQpIHtcbiAgcmV0dXJuICgpID0+IFsgZWxlbWVudCBdO1xufSIsImltcG9ydCBjcmVhdGVTdWJzY3JpYmVFbGVtZW50IGZyb20gJy4vZWxlbWVudHMvU3Vic2NyaWJlJztcbmltcG9ydCBjcmVhdGVQdWJsaXNoRWxlbWVudCBmcm9tICcuL2VsZW1lbnRzL1B1Ymxpc2gnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVVc2VFbGVtZW50c0hvb2soaG9zdEVsZW1lbnQpIHtcbiAgcmV0dXJuICgpID0+ICh7XG4gICAgU3Vic2NyaWJlOiBjcmVhdGVTdWJzY3JpYmVFbGVtZW50KGhvc3RFbGVtZW50KSxcbiAgICBQdWJsaXNoOiBjcmVhdGVQdWJsaXNoRWxlbWVudChob3N0RWxlbWVudClcbiAgfSk7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVXNlUHJvZHVjdEhvb2socHJvZHVjdCkge1xuICByZXR1cm4gKGluaXRpYWxWYWx1ZSkgPT4ge1xuICAgIGlmICh0eXBlb2YgaW5pdGlhbFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcHJvZHVjdC5zZXQoaW5pdGlhbFZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIFtcbiAgICAgIG5ld1ZhbHVlID0+IHByb2R1Y3Quc2V0KG5ld1ZhbHVlKVxuICAgIF07XG4gIH07XG59O1xuIiwidmFyIHN1YnNjcmliZXJzID0ge307XG5cbmNvbnN0IHN1YnNjcmliZSA9IChlbGVtZW50LCB0eXBlLCBjYWxsYmFjaykgPT4ge1xuICBpZiAoIXN1YnNjcmliZXJzW3R5cGVdKSBzdWJzY3JpYmVyc1t0eXBlXSA9IHt9O1xuICBzdWJzY3JpYmVyc1t0eXBlXVtlbGVtZW50LmlkXSA9IGNhbGxiYWNrO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGRlbGV0ZSBzdWJzY3JpYmVyc1t0eXBlXVtlbGVtZW50LmlkXTtcbiAgfTtcbn07XG5jb25zdCBwdWJsaXNoID0gKGVsZW1lbnQsIHR5cGUsIHBheWxvYWQpID0+IHtcbiAgaWYgKCFzdWJzY3JpYmVyc1t0eXBlXSkgcmV0dXJuO1xuICBPYmplY3Qua2V5cyhzdWJzY3JpYmVyc1t0eXBlXSkuZm9yRWFjaChpZCA9PiB7XG4gICAgc3Vic2NyaWJlcnNbdHlwZV1baWRdKHBheWxvYWQsIGVsZW1lbnQpO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVVzZVB1YlN1Ykhvb2soZWxlbWVudCkge1xuICByZXR1cm4gKHNjb3BlZEVsZW1lbnQpID0+IChbXG4gICAgLy8gc3Vic2NyaWJlXG4gICAgKC4uLnBhcmFtcykgPT4gc3Vic2NyaWJlKHNjb3BlZEVsZW1lbnQgfHwgZWxlbWVudCwgLi4ucGFyYW1zKSxcbiAgICAvLyBwdWJsaXNoXG4gICAgKC4uLnBhcmFtcykgPT4gcHVibGlzaChzY29wZWRFbGVtZW50IHx8IGVsZW1lbnQsIC4uLnBhcmFtcyksXG4gICAgLy8gY2xlYXJcbiAgICAoKSA9PiB7XG4gICAgICBzdWJzY3JpYmVycyA9IHt9O1xuICAgIH0sXG4gICAgLy8gbGlzdCBvZiBhbGwgc3Vic2NyaWJlcnNcbiAgICBzdWJzY3JpYmVyc1xuICBdKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVVzZVN0YXRlSG9vayhlbGVtZW50KSB7XG4gIGNvbnN0IHN0b3JhZ2UgPSB7XG4gICAgc3RhdGVzOiBbXVxuICB9O1xuICBsZXQgY29uc3VtZXIgPSAwO1xuXG4gIHJldHVybiAoaW5pdGlhbFN0YXRlKSA9PiB7XG4gICAgbGV0IGluZGV4O1xuXG4gICAgaWYgKCFlbGVtZW50LmlzVXNlZCkge1xuICAgICAgc3RvcmFnZS5zdGF0ZXMucHVzaChpbml0aWFsU3RhdGUpO1xuICAgICAgaW5kZXggPSBzdG9yYWdlLnN0YXRlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IGNvbnN1bWVyO1xuICAgICAgY29uc3VtZXIgPSBpbmRleCA8IHN0b3JhZ2Uuc3RhdGVzLmxlbmd0aCAtIDEgPyBjb25zdW1lciArIDEgOiAwO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICBzdG9yYWdlLnN0YXRlc1tpbmRleF0sXG4gICAgICBuZXdTdGF0ZSA9PiB7XG4gICAgICAgIHN0b3JhZ2Uuc3RhdGVzW2luZGV4XSA9IG5ld1N0YXRlO1xuICAgICAgICBpZiAoIWVsZW1lbnQuaXNSdW5uaW5nKSB7XG4gICAgICAgICAgZWxlbWVudC5ydW4oZWxlbWVudC5wYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdGF0ZTtcbiAgICAgIH1cbiAgICBdO1xuICB9O1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUHJvZHVjdCA9ICgpID0+IHtcbiAgdmFyIHN0YXRlO1xuXG4gIHJldHVybiB7XG4gICAgc2V0KHZhbHVlKSB7XG4gICAgICByZXR1cm4gc3RhdGUgPSB2YWx1ZTtcbiAgICB9LFxuICAgIGdldCgpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH07XG59O1xuIiwiaW1wb3J0IEFjdEVsZW1lbnQgZnJvbSAnLi9BY3RFbGVtZW50JztcbmltcG9ydCBpc0FjdE1MRWxlbWVudCBmcm9tICcuL3V0aWxzL2lzQWN0TUxFbGVtZW50JztcblxuZnVuY3Rpb24gY3JlYXRlKGZ1bmMsIHByb3BzLCAuLi5jaGlsZHJlbikge1xuICByZXR1cm4gQWN0RWxlbWVudChmdW5jLCBwcm9wcywgY2hpbGRyZW4pO1xufVxuZnVuY3Rpb24gcnVuKGVsZW1lbnQpIHtcbiAgaWYgKCFpc0FjdE1MRWxlbWVudChlbGVtZW50KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgQWN0TUwgZWxlbWVudCBleHBlY3RlZC4gSW5zdGVhZCAkeyBlbGVtZW50LnRvU3RyaW5nKCkgfSBwYXNzZWQuYCk7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucnVuKCk7XG59XG5cbmNvbnN0IEEgPSBjcmVhdGU7XG5jb25zdCBGcmFnbWVudCA9ICgpID0+IHt9O1xuXG5leHBvcnQge1xuICBBLFxuICBydW4sXG4gIEZyYWdtZW50XG59O1xuIiwiY29uc3QgZ2V0RnVuY05hbWUgPSAoZnVuYykgPT4ge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuXG4gIGxldCByZXN1bHQgPSAvXmZ1bmN0aW9uXFxzKyhbXFx3XFwkXSspXFxzKlxcKC8uZXhlYyhmdW5jLnRvU3RyaW5nKCkpO1xuXG4gIHJldHVybiByZXN1bHQgPyByZXN1bHRbIDEgXSA6ICd1bmtub3duJztcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE1ldGEoZnVuYywgcHJvcHMpIHtcbiAgY29uc3QgcHJvcE5hbWVzID0gcHJvcHMgPyBPYmplY3Qua2V5cyhwcm9wcykgOiBbXTtcbiAgY29uc3QgZGVwZW5kZW5jaWVzID0gW107XG4gIGxldCBleHBvcnRzS2V5d29yZDtcblxuICBwcm9wTmFtZXMuZm9yRWFjaChwcm9wTmFtZSA9PiB7XG4gICAgaWYgKHByb3BOYW1lLmNoYXJBdCgwKSA9PT0gJyQnKSB7XG4gICAgICBkZXBlbmRlbmNpZXMucHVzaChwcm9wTmFtZS5zdWJzdHIoMSwgcHJvcE5hbWUubGVuZ3RoKSk7XG4gICAgfSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gJ2V4cG9ydHMnKSB7XG4gICAgICBleHBvcnRzS2V5d29yZCA9IHByb3BzLmV4cG9ydHM7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6IGdldEZ1bmNOYW1lKGZ1bmMpLFxuICAgIGRlcGVuZGVuY2llcyxcbiAgICBleHBvcnRzS2V5d29yZFxuICB9O1xufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzQWN0TUxFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgJiYgZWxlbWVudC5fX2FjdG1sID09PSB0cnVlO1xufTtcbiIsImNvbnN0IHJlc29sdmVQcm9wID0gKHByb3AsIGVsZW1lbnQsIHBhcmVudCwgZXJyb3JNZXNzYWdlLCBzdGFjaykgPT4ge1xuICBpZiAocGFyZW50KSB7XG4gICAgY29uc3QgcHJvZHVjdFZhbHVlID0gcGFyZW50LnJlcXVlc3RQcm9kdWN0KHByb3ApO1xuXG4gICAgaWYgKHByb2R1Y3RWYWx1ZSkge1xuICAgICAgcmV0dXJuIHByb2R1Y3RWYWx1ZS52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHBhcmVudC5wYXJlbnQpIHtcbiAgICAgIHN0YWNrLnB1c2gocGFyZW50Lm1ldGEubmFtZSk7XG4gICAgICByZXR1cm4gcmVzb2x2ZVByb3AocHJvcCwgZWxlbWVudCwgcGFyZW50LnBhcmVudCwgZXJyb3JNZXNzYWdlLCBzdGFjayk7XG4gICAgfVxuICAgIHN0YWNrLnB1c2gocGFyZW50Lm1ldGEubmFtZSk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgIGVycm9yTWVzc2FnZSArICdcXG5cXG5TdGFjazpcXG4nICtcbiAgICBzdGFjay5yZXZlcnNlKCkubWFwKG4gPT4gYCAgPCR7IG4gfT5gKS5qb2luKCdcXG4nKVxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVzb2x2ZVByb2R1Y3QoZWxlbWVudCkge1xuICBjb25zdCB7IGRlcGVuZGVuY2llcywgbmFtZTogZWxlbWVudE5hbWUgfSA9IGVsZW1lbnQubWV0YTtcbiAgY29uc3QgZGF0YSA9IHt9O1xuXG4gIGlmIChkZXBlbmRlbmNpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgZGVwZW5kZW5jaWVzLmZvckVhY2gocHJvcE5hbWUgPT4ge1xuICAgIGRhdGFbcHJvcE5hbWVdID0gcmVzb2x2ZVByb3AoXG4gICAgICBwcm9wTmFtZSxcbiAgICAgIGVsZW1lbnQsXG4gICAgICBlbGVtZW50LnBhcmVudCxcbiAgICAgIGBcIiR7IHByb3BOYW1lIH1cIiBwcm9wIHJlcXVlc3RlZCBieSBcIiR7IGVsZW1lbnROYW1lIH1cIiBjYW4gbm90IGJlIGZvdW5kLmAsXG4gICAgICBbIGVsZW1lbnROYW1lIF1cbiAgICApO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwidmFyIGkgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRJZCgpIHtcbiAgcmV0dXJuICdhJyArICgrK2kpO1xufTtcbiIsImZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXJyYXlXaXRoSG9sZXM7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2RlZmluZVByb3BlcnR5OyIsImZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHtcbiAgdmFyIF9hcnIgPSBbXTtcbiAgdmFyIF9uID0gdHJ1ZTtcbiAgdmFyIF9kID0gZmFsc2U7XG4gIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICB0cnkge1xuICAgIGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIF9kID0gdHJ1ZTtcbiAgICBfZSA9IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBfYXJyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pdGVyYWJsZVRvQXJyYXlMaW1pdDsiLCJmdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkge1xuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfbm9uSXRlcmFibGVSZXN0OyIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuL2RlZmluZVByb3BlcnR5XCIpO1xuXG5mdW5jdGlvbiBfb2JqZWN0U3ByZWFkKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHt9O1xuICAgIHZhciBvd25LZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcblxuICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24gKHN5bSkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX29iamVjdFNwcmVhZDsiLCJ2YXIgYXJyYXlXaXRoSG9sZXMgPSByZXF1aXJlKFwiLi9hcnJheVdpdGhIb2xlc1wiKTtcblxudmFyIGl0ZXJhYmxlVG9BcnJheUxpbWl0ID0gcmVxdWlyZShcIi4vaXRlcmFibGVUb0FycmF5TGltaXRcIik7XG5cbnZhciBub25JdGVyYWJsZVJlc3QgPSByZXF1aXJlKFwiLi9ub25JdGVyYWJsZVJlc3RcIik7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkge1xuICByZXR1cm4gYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBpdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IG5vbkl0ZXJhYmxlUmVzdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zbGljZWRUb0FycmF5OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZVt0b1N0cmluZ1RhZ1N5bWJvbF0gPVxuICAgIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIHByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbiA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIHZhciBjdG9yID0gdHlwZW9mIGdlbkZ1biA9PT0gXCJmdW5jdGlvblwiICYmIGdlbkZ1bi5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gY3RvclxuICAgICAgPyBjdG9yID09PSBHZW5lcmF0b3JGdW5jdGlvbiB8fFxuICAgICAgICAvLyBGb3IgdGhlIG5hdGl2ZSBHZW5lcmF0b3JGdW5jdGlvbiBjb25zdHJ1Y3RvciwgdGhlIGJlc3Qgd2UgY2FuXG4gICAgICAgIC8vIGRvIGlzIHRvIGNoZWNrIGl0cyAubmFtZSBwcm9wZXJ0eS5cbiAgICAgICAgKGN0b3IuZGlzcGxheU5hbWUgfHwgY3Rvci5uYW1lKSA9PT0gXCJHZW5lcmF0b3JGdW5jdGlvblwiXG4gICAgICA6IGZhbHNlO1xuICB9O1xuXG4gIGV4cG9ydHMubWFyayA9IGZ1bmN0aW9uKGdlbkZ1bikge1xuICAgIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihnZW5GdW4sIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2VuRnVuLl9fcHJvdG9fXyA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICAgICAgaWYgKCEodG9TdHJpbmdUYWdTeW1ib2wgaW4gZ2VuRnVuKSkge1xuICAgICAgICBnZW5GdW5bdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JGdW5jdGlvblwiO1xuICAgICAgfVxuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGdlbmVyYXRvclttZXRob2RdLCBnZW5lcmF0b3IsIGFyZyk7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICByZWplY3QocmVjb3JkLmFyZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzdWx0ID0gcmVjb3JkLmFyZztcbiAgICAgICAgdmFyIHZhbHVlID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgJiZcbiAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKSkge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgZXhwb3J0cy5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgZXhwb3J0cy5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiY29uc3QgJCA9IChzZWxlY3RvcikgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5jb25zdCBjb250YWluZXIgPSAkKCcudG9kby1saXN0Jyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQ29udGFpbmVyKHsgdXNlQ2hpbGRyZW4gfSkge1xuICBjb25zdCBbICwgY29udGVudCBdID0gdXNlQ2hpbGRyZW4oKTtcblxuICBjb250YWluZXIuaW5uZXJIVE1MID0gY29udGVudDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDb250YWluZXIoeyB1c2VDaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFsgY2hpbGRyZW4gXSA9IHVzZUNoaWxkcmVuKCk7XG5cbiAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICBjb25zdCB0b2RvSW5kZXggPSBwYXJzZUludChlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSwgMTApO1xuICAgIGNvbnN0IHR5cGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aW9uJyk7XG5cbiAgICBjaGlsZHJlbih0eXBlLCB0b2RvSW5kZXgpO1xuICB9KTtcbn1cbiIsIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEgfSBmcm9tICcuLi8uLi8uLi9zcmMnO1xuXG5pbXBvcnQgeyBDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExpc3RlbmVyKHsgdXNlRWxlbWVudHMgfSkge1xuICBjb25zdCB7IFB1Ymxpc2ggfSA9IHVzZUVsZW1lbnRzKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udGFpbmVyPlxuICAgICAge1xuICAgICAgICAodHlwZSwgdG9kb0luZGV4KSA9PiA8UHVibGlzaCB0eXBlPXsgdHlwZSB9IHBheWxvYWQ9eyB0b2RvSW5kZXggfSAvPlxuICAgICAgfVxuICAgIDwvQ29udGFpbmVyPlxuICApO1xufVxuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL3NyYyc7XG5cbmltcG9ydCB7IEZpbGxDb250YWluZXIgfSBmcm9tICcuL0RPTSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFJlbmRlcmVyKHsgdG9kb3MgfSkge1xuICByZXR1cm4gKFxuICAgIDxGaWxsQ29udGFpbmVyPlxuICAgICAge1xuICAgICAgICB0b2Rvcy5tYXAoKHRvZG8sIGkpID0+IHtcbiAgICAgICAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGxpIGNsYXNzPSckeyB0b2RvLmNvbXBsZXRlZCA/ICdjb21wbGV0ZWQnIDogJycgfSc+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWV3XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtaW5kZXg9XCIkeyBpIH1cIlxuICAgICAgICAgICAgICAgICAgZGF0YS1hY3Rpb249XCJ0b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgJHsgdG9kby5jb21wbGV0ZWQgPyAnY2hlY2tlZCcgOiAnJyB9PlxuICAgICAgICAgICAgICAgIDxsYWJlbD4keyB0b2RvLmxhYmVsIH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGVzdHJveVwiXG4gICAgICAgICAgICAgICAgICBkYXRhLWluZGV4PVwiJHsgaSB9XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCI+PC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJlZGl0XCIgdmFsdWU9XCJSdWxlIHRoZSB3ZWJcIj5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgYDtcbiAgICAgICAgfSkuam9pbignJylcbiAgICAgIH1cbiAgICA8L0ZpbGxDb250YWluZXI+XG4gICk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyoqIEBqc3ggQSAqL1xuaW1wb3J0IHsgQSB9IGZyb20gJy4uLy4uLy4uL3NyYyc7XG5cbnZhciBpbml0aWFsVmFsdWUgPSBbXG4gIHtcbiAgICBsYWJlbDogJ0ZpcnN0IHRhc2snLFxuICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgZWRpdGluZzogZmFsc2VcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnU2Vjb25kIHRhc2snLFxuICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgZWRpdGluZzogZmFsc2VcbiAgfVxuXTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RvcmUoeyB1c2VTdGF0ZSwgdXNlUHJvZHVjdCwgdXNlRWxlbWVudHMgfSkge1xuICBjb25zdCBbIHRvZG9zLCBzZXRUb2RvcyBdID0gdXNlU3RhdGUoaW5pdGlhbFZhbHVlKTtcbiAgY29uc3QgWyBzZXRQcm9kdWN0IF0gPSB1c2VQcm9kdWN0KHRvZG9zKTtcbiAgY29uc3QgeyBTdWJzY3JpYmUgfSA9IHVzZUVsZW1lbnRzKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3Vic2NyaWJlIHR5cGU9J3RvZ2dsZSc+XG4gICAgICB7XG4gICAgICAgIHRvZG9JbmRleCA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2codG9kb0luZGV4KTtcbiAgICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHRvZG9zLm1hcCgodG9kbywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdG9kb0luZGV4KSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4udG9kbyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQ6ICF0b2RvLmNvbXBsZXRlZFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRvZG87XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzZXRUb2RvcyhuZXdTdGF0ZSk7XG4gICAgICAgICAgc2V0UHJvZHVjdChuZXdTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICA8L1N1YnNjcmliZT5cbiAgKTtcbn1cbiIsIi8qKiBAanN4IEEgKi9cbmltcG9ydCB7IEEsIHJ1biwgRnJhZ21lbnQgfSBmcm9tICcuLi8uLi8uLi9zcmMnO1xuXG5pbXBvcnQgU3RvcmUgZnJvbSAnLi9TdG9yZSc7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgTGlzdGVuZXIgZnJvbSAnLi9MaXN0ZW5lcic7XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgcmV0dXJuIChcbiAgICA8RnJhZ21lbnQ+XG4gICAgICA8TGlzdGVuZXIgLz5cbiAgICAgIDxTdG9yZSBleHBvcnRzPSd0b2Rvcyc+XG4gICAgICAgIDxSZW5kZXJlciAkdG9kb3MgLz5cbiAgICAgIDwvU3RvcmU+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn07XG5cbnJ1big8QXBwIC8+KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=