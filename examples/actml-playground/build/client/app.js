(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _src = require('../../../../src');

var GetHTMLElements = function GetHTMLElements() {
  return {
    step: document.querySelector('input'),
    button: document.querySelector('button'),
    counter: document.querySelector('p')
  };
}; /** @jsx A */

var InitializeButton = function InitializeButton(_ref) {
  var _ref$controls = _ref.controls,
      button = _ref$controls.button,
      step = _ref$controls.step,
      children = _ref.children;

  button.addEventListener('click', function () {
    children({ value: 10 });
  });
};
var UpdateCounter = function UpdateCounter(_ref2) {
  var counter = _ref2.controls.counter,
      value = _ref2.value;

  console.log('a');
  //   counter.innerHTML = 'a';
};

(0, _src.run)((0, _src.A)(_src.A, null, (0, _src.A)(GetHTMLElements, { exports: 'controls' }), (0, _src.A)(InitializeButton, { $controls: true }, '(', (0, _src.A)(UpdateCounter, { $value: true }), ')')));

},{"../../../../src":14}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = A;
/* eslint-disable max-len */

function A() {
  return this.scope;
}
A.after = function (context, done) {
  var _context$element = context.element,
      props = _context$element.props,
      scope = _context$element.scope;

  if (props && props.result) {
    if (!scope.hasOwnProperty(props.result)) {
      throw new Error("You are trying to return \"" + props.result + "\" as a result of an <A> element. However no one down the chain is exporting it.");
    }
    context.result = scope[props.result];
  }
  done();
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChildrenWrapper;

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function ChildrenWrapper(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  this.mergeToScope(props);
}

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Element;

var _utils = require('../utils');

function Element(func, props, children) {
  var scopedVars = props && props.scope ? props.scope.split(/, ?/) : [];

  var element = {
    __actml: true,
    id: (0, _utils.getId)(),
    func: func,
    children: children,
    name: (0, _utils.getFuncName)(func),
    props: props,
    scope: {},
    context: undefined,
    parent: undefined,
    debug: false,
    isErrorHandler: false,

    mergeToProps: function mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    mergeToScope: function mergeToScope(additionalProps) {
      this.scope = Object.assign({}, this.scope, additionalProps);
    },
    dispatch: function dispatch(type, value) {
      if (scopedVars.indexOf(type) >= 0 || scopedVars[0] === '*') {
        this.scope[type] = value;
      } else {
        this.parent.dispatch(type, value);
      }
    },
    readFromScope: function readFromScope(key, requester) {
      var scope = this.scope,
          parent = this.parent;

      if (scope.hasOwnProperty(key)) return scope[key];
      return parent.readFromScope(key, requester);
    },
    handleError: function handleError(error) {
      if (this.props && this.props.onError) {
        this.props.onError.mergeToProps({ error: error });
        this.props.onError.isErrorHandler = true;
        return this.props.onError;
      }
      return this.parent.handleError(error);
    },
    initialize: function initialize(parent) {
      if (!parent) {
        throw new Error('The Element can not be run with no parent.');
      }
      this.parent = parent;
      this.context = parent.context;
      this.debug = parent.debug;

      // setting the debug flag
      if (this.props && typeof this.props.debug !== 'undefined') {
        this.debug = true;
      }

      if (typeof func === 'string') {
        if (this.context[func]) {
          this.func = this.context[func];
          this.name = (0, _utils.getFuncName)(this.func);
        } else {
          throw new Error('"' + func + '" is missing in the context.');
        }
      }

      return this;
    }
  };

  return element;
}

},{"../utils":24}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRootElement;
function createRootElement(context) {
  return {
    __actml: true,
    context: context,
    scope: {},
    dispatch: function dispatch() {},
    readFromScope: function readFromScope(key, requester) {
      var value = this.scope[key];

      if (typeof value !== 'undefined') return value;

      value = this.context[key];
      if (typeof value !== 'undefined') return value;

      requester = requester === '' ? 'unknown' : requester;
      throw new Error('Undefined variable "' + key + '" requested by <' + requester + '>.');
    },
    handleError: function handleError() {}
  };
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Action;

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function Action(props) {
  _Integration2.default.dispatch(props);
}

},{"./Integration":8}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Inspect;

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function Inspect(_ref) {
  var children = _ref.children;

  var inspection = {
    numOfSubscribes: _Integration2.default._listeners.length
  };

  children(inspection);
}

},{"./Integration":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MIDDLEWARE_NOT_RUN = "There are two possible options for this error:\na) You are running your ActML logic too soon. The Redux middleware is still not registered.\nb) You forgot to register ActML's Redux middleware.";

var Integration = {
  _listeners: [],
  getState: function getState() {
    throw new Error(MIDDLEWARE_NOT_RUN);
  },
  dispatch: function dispatch() {
    throw new Error(MIDDLEWARE_NOT_RUN);
  },
  addListener: function addListener(callback) {
    var _this = this;

    this._listeners.push(callback);

    var index = this._listeners.length - 1;

    return function () {
      return _this._listeners.splice(index, 1);
    };
  },
  actionDetected: function actionDetected(action) {
    this._listeners.forEach(function (l) {
      return l(action);
    });
  },
  reset: function reset() {
    this._listeners = [];
  }
};

exports.default = Integration;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = async function Select(props) {
  return props.selector(_Integration2.default.getState());
};

},{"./Integration":8}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

async function Subscribe(_ref) {
  var children = _ref.children,
      type = _ref.type;

  if (type) {
    _Integration2.default.addListener(function (action) {
      if (action.type === type) {
        children(action);
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}

exports.default = Subscribe;

},{"./Integration":8}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function SubscribeOnce(_ref) {
  var children = _ref.children,
      type = _ref.type;

  if (type) {
    var removeListener = _Integration2.default.addListener(function (action) {
      if (action.type === type) {
        children(action);
        removeListener();
      }
    });
  } else {
    throw new Error('<SubscribeOnce> requires `type` prop.');
  }
}

exports.default = SubscribeOnce;

},{"./Integration":8}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reset = exports.middleware = exports.Select = exports.Action = exports.Inspect = exports.SubscribeOnce = exports.Subscribe = undefined;

var _Subscribe = require('./Subscribe');

Object.defineProperty(exports, 'Subscribe', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Subscribe).default;
  }
});

var _SubscribeOnce = require('./SubscribeOnce');

Object.defineProperty(exports, 'SubscribeOnce', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SubscribeOnce).default;
  }
});

var _Inspect = require('./Inspect');

Object.defineProperty(exports, 'Inspect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Inspect).default;
  }
});

var _Action = require('./Action');

Object.defineProperty(exports, 'Action', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Action).default;
  }
});

var _Select = require('./Select');

Object.defineProperty(exports, 'Select', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Select).default;
  }
});

var _middleware = require('./middleware');

Object.defineProperty(exports, 'middleware', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_middleware).default;
  }
});

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var reset = exports.reset = _Integration2.default.reset.bind(_Integration2.default);

},{"./Action":6,"./Inspect":7,"./Integration":8,"./Select":9,"./Subscribe":10,"./SubscribeOnce":11,"./middleware":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = actMLReduxMiddleware;

var _Integration = require('./Integration');

var _Integration2 = _interopRequireDefault(_Integration);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function actMLReduxMiddleware(_ref) {
  var getState = _ref.getState,
      dispatch = _ref.dispatch;

  _Integration2.default.getState = getState;
  _Integration2.default.dispatch = dispatch;
  return function (next) {
    return function (action) {
      var result = next(action);

      _Integration2.default.actionDetected(action);
      return result;
    };
  };
}

},{"./Integration":8}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Redux = exports.run = exports.A = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _redux = require('./elements/redux');

var ReduxMethods = _interopRequireWildcard(_redux);

var _Element = require('./elements/Element');

var _Element2 = _interopRequireDefault(_Element);

var _A = require('./elements/A');

var _A2 = _interopRequireDefault(_A);

var _createRootElement = require('./elements/createRootElement');

var _createRootElement2 = _interopRequireDefault(_createRootElement);

var _utils = require('./utils');

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj.default = obj;return newObj;
  }
}

function create(func, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return func === create ? (0, _Element2.default)(_A2.default, _extends({ scope: '*' }, props), children) : (0, _Element2.default)(func, props, children);
}

function run(element) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return new Promise(function (done, reject) {
    if ((0, _utils.isItAnElement)(element)) {
      new _processor2.default(function (error, result) {
        error ? reject(error) : done(result);
      }).add(element, (0, _createRootElement2.default)(context));
    } else {
      throw new Error('`run` should be called with an ActML element. You are passing:', element);
    }
  });
}

var Redux = _extends({}, ReduxMethods);
var A = create;

exports.A = A;
exports.run = run;
exports.Redux = Redux;

},{"./elements/A":2,"./elements/Element":4,"./elements/createRootElement":5,"./elements/redux":12,"./processor":20,"./utils":24}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = afterHook;
function afterHook(execContext, done) {
  if (execContext.element.func.after) {
    execContext.element.func.after(execContext, done);
  } else {
    done();
  }
}

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = attemptToProcessChildren;

var _processChildren = require('./processChildren');

var _processChildren2 = _interopRequireDefault(_processChildren);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function attemptToProcessChildren(execContext, done, addNewWorker) {
  if (!execContext.childrenProp) {
    addNewWorker(_processChildren2.default);
  }
  done();
}

},{"./processChildren":22}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = beforeHook;
function beforeHook(execContext, done) {
  if (execContext.element.func.before) {
    execContext.element.func.before(execContext, done);
  } else {
    done();
  }
}

},{}],18:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
}; /* eslint-disable max-len, consistent-return */

exports.default = defineChildrenProp;

var _utils = require('../utils');

var _ = require('../');

var _ChildrenWrapper = require('../elements/ChildrenWrapper');

var _ChildrenWrapper2 = _interopRequireDefault(_ChildrenWrapper);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

var WRONG_PARAMS_ERROR = 'The "children" prop expects an object (key-value pairs) as first argument and a callback as second argument.';

function defineChildrenProp(execContext, done) {
  var element = execContext.element,
      processor = execContext.processor;
  var children = element.children;

  var childrenProp = null;

  // FACC
  if (children.length === 1 && !(0, _utils.isItAnElement)(children[0]) && typeof children[0] === 'function') {
    childrenProp = function childrenProp(props) {
      if (typeof props !== 'undefined' && (typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') {
        throw new Error(WRONG_PARAMS_ERROR);
      }
      return new Promise(function (childDone) {
        return processor.add((0, _.A)(children[0], props), element, childDone);
      });
    };
    // an array of ActML elements
  } else if (children.length >= 3 && children[0] === '(' && children[children.length - 1] === ')') {
    childrenProp = function childrenProp(props) {
      if (typeof props !== 'undefined' && (typeof props === 'undefined' ? 'undefined' : _typeof(props)) !== 'object') {
        throw new Error(WRONG_PARAMS_ERROR);
      }
      return new Promise(function (childrenDone) {
        processor.add(_.A.apply(undefined, [_ChildrenWrapper2.default, props].concat(_toConsumableArray(children.slice(1, -1)))), element, childrenDone);
      });
    };
  }

  execContext.childrenProp = childrenProp;
  done();
}

},{"../":14,"../elements/ChildrenWrapper":3,"../utils":24}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
}; /* eslint-disable consistent-return */

exports.default = execute;

var _utils = require('../utils');

function execute(execContext, done) {
  var element = execContext.element,
      processor = execContext.processor;

  var result = execContext.result = element.func.call(element, _extends({}, execContext.normalizedProps, {
    children: execContext.childrenProp
  }));

  if (result) {
    // another ActML element
    if ((0, _utils.isItAnElement)(result)) {
      processor.add(result, element, function (r) {
        execContext.result = r;
        done();
      });
      // promise
    } else if (result && result.then) {
      result.then(function (asyncResult) {
        if ((0, _utils.isItAnElement)(asyncResult)) {
          processor.add(asyncResult, element, function (r) {
            execContext.result = r;
            done();
          });
        } else {
          execContext.result = asyncResult;
          done();
        }
      }).catch(function (error) {
        return done(error);
      });
      // generator
    } else if (typeof result.next === 'function') {
      var gen = result;
      var genRes = { value: undefined, done: false };

      (function processGenerator() {
        if (genRes.done) {
          execContext.result = genRes.value;
          return done();
        }
        genRes = gen.next(genRes.value);
        if ((0, _utils.isItAnElement)(genRes.value)) {
          processor.add(genRes.value, element, function (newValue) {
            genRes.value = newValue;
            processGenerator();
          });
        } else {
          processGenerator();
        }
      })();
    } else {
      done();
    }
  } else {
    done();
  }
}

},{"../utils":24}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}(); /* eslint-disable max-len, no-use-before-define */

var _utils = require('../utils');

var _beforeHook = require('./beforeHook');

var _beforeHook2 = _interopRequireDefault(_beforeHook);

var _afterHook = require('./afterHook');

var _afterHook2 = _interopRequireDefault(_afterHook);

var _normalizeProps = require('./normalizeProps');

var _normalizeProps2 = _interopRequireDefault(_normalizeProps);

var _execute = require('./execute');

var _execute2 = _interopRequireDefault(_execute);

var _resolveExports = require('./resolveExports');

var _resolveExports2 = _interopRequireDefault(_resolveExports);

var _attemptToProcessChildren = require('./attemptToProcessChildren');

var _attemptToProcessChildren2 = _interopRequireDefault(_attemptToProcessChildren);

var _defineChildrenProp = require('./defineChildrenProp');

var _defineChildrenProp2 = _interopRequireDefault(_defineChildrenProp);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var DEBUG_ENABLED = true;

function identifyTheError(error, sourceElement) {
  if (error.toString().match(/children is not a function/)) {
    return new Error('You are trying to use "children" prop as a function in <' + sourceElement + '> but it is not. Did you forget to wrap its children into parentheses. Like for example <' + sourceElement + '>(<Child />)</' + sourceElement + '>?');
  }
  return error;
}

var Processor = function () {
  function Processor(done) {
    _classCallCheck(this, Processor);

    this.ids = 0;
    this.onFinish = done;
    this.queue = {};
  }

  _createClass(Processor, [{
    key: 'exit',
    value: function exit(error, result) {
      this.debug('(|) exit | error: ' + (error ? 'yes' : 'no'));
      this.queue = [];
      this.onFinish(error, result);
    }
  }, {
    key: 'debug',
    value: function debug(whatHappened, element) {
      if (DEBUG_ENABLED) {
        var _console;

        for (var _len = arguments.length, reset = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          reset[_key - 2] = arguments[_key];
        }

        (_console = console).log.apply(_console, [whatHappened + ' ' + (element ? element.name : '') + ' | queue: ' + Object.keys(this.queue).length].concat(reset));
      }
    }
  }, {
    key: 'elementProcessed',
    value: function elementProcessed(task) {
      var id = task.id;

      if (this.queue[id]) {
        delete this.queue[id];
      } else {
        throw new Error('The processor just finished queue an element but it is already removed from the list.');
      }

      this.debug('<-', task.element);

      if (task.done) {
        task.done(task.result);
      }

      // exit if we don't have any more elements to process
      if (Object.keys(this.queue).length === 0) {
        this.exit(null, task.result);
      }
    }
  }, {
    key: 'createProcessorErrorHandler',
    value: function createProcessorErrorHandler(element) {
      var _this = this;

      return function (error, continueFlow, stopFlow) {
        _this.debug('!', element, error.message);

        var Handler = element.handleError(error);

        if (Handler && !element.isErrorHandler) {
          _this.add(Handler, element, continueFlow);
        } else {
          stopFlow(identifyTheError(error, element.name));
        }
      };
    }
  }, {
    key: 'add',
    value: function add(element, parent, done) {
      var _this2 = this;

      var task = {
        id: this.ids++,
        element: element.initialize(parent),
        parent: parent,
        done: done,
        result: undefined,
        processor: this
      };
      var onProcessingFinished = function onProcessingFinished(error) {
        error ? _this2.exit(error) : _this2.elementProcessed(task, task);
      };

      this.queue[task.id] = task;
      this.debug('->', element);

      (0, _utils.flow)([_beforeHook2.default, _normalizeProps2.default, _defineChildrenProp2.default, _execute2.default, _resolveExports2.default, _attemptToProcessChildren2.default, _afterHook2.default], task, onProcessingFinished, this.createProcessorErrorHandler(element));
    }
  }]);

  return Processor;
}();

exports.default = Processor;

},{"../utils":24,"./afterHook":15,"./attemptToProcessChildren":16,"./beforeHook":17,"./defineChildrenProp":18,"./execute":19,"./normalizeProps":21,"./resolveExports":23}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

exports.default = normalizeProps;
/* eslint-disable consistent-return */

function normalizeProps(execContext, done) {
  var element = execContext.element;
  var props = element.props,
      name = element.name;

  var normalizedProps = _extends({}, props);

  if (!props) return done();

  Object.keys(props).forEach(function (propName) {
    if (propName.charAt(0) === '$') {
      var prop = propName.substr(1, propName.length);
      var value = element.readFromScope(prop, name);

      if (typeof value !== 'undefined') {
        if (typeof props[propName] === 'string') {
          normalizedProps[props[propName]] = value;
        } else if (typeof props[propName] === 'function') {
          normalizedProps = _extends({}, normalizedProps, props[propName](value));
        } else {
          normalizedProps[prop] = value;
        }
        delete normalizedProps[propName];
      }
    }
  });

  execContext.normalizedProps = normalizedProps;
  done();
}

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processChildren;

var _utils = require('../utils');

function processChildren(execContext, done) {
  var element = execContext.element,
      processor = execContext.processor;

  var children = element.children;

  if (children && Array.isArray(children) && children.length > 0) {
    var i = -1;

    (function process() {
      i++;
      i === children.length ? done() : (0, _utils.isItAnElement)(children[i]) ? processor.add(children[i], element, process) : process();
    })();
  } else {
    done();
  }
} /* eslint-disable consistent-return */

},{"../utils":24}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveExports;
function resolveExports(execContext, done) {
  var element = execContext.element,
      result = execContext.result;
  var props = element.props,
      scope = element.scope;

  if (props && props.exports) {
    if (typeof props.exports === 'function') {
      var exportedProps = props.exports(result);

      if (exportedProps) {
        Object.keys(exportedProps).forEach(function (key) {
          scope[key] = exportedProps[key];
          element.dispatch(key, exportedProps[key]);
        });
      }
    } else {
      scope[props.exports] = result;
      element.dispatch(props.exports, result);
    }
  }
  done();
}

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flow = flow;

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}

/* eslint-disable max-len */

var ids = 100;

var NOOP = exports.NOOP = function NOOP() {};
var getId = exports.getId = function getId() {
  return ids++;
};
var isItAnElement = exports.isItAnElement = function isItAnElement(element) {
  return element && element.__actml;
};
var getFuncName = exports.getFuncName = function getFuncName(func) {
  var result = /function\*?\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};
function flow(workers) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOOP;
  var errorHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : NOOP;

  (function process(workers) {
    if (workers.length === 0) {
      done();
    } else {
      try {
        workers.shift()(context, function (error) {
          if (error) {
            errorHandler(error, function () {
              return process(workers);
            }, function (error) {
              return done(error);
            });
          } else {
            process(workers);
          }
        }, function (newWorker) {
          return workers = [newWorker].concat(_toConsumableArray(workers));
        });
      } catch (error) {
        errorHandler(error, function () {
          return process(workers);
        }, function (error) {
          return done(error);
        });
      }
    }
  })(workers);
}

},{}]},{},[1]);
