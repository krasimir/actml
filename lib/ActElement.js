'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createElement;

var _resolveBindings = require('./utils/resolveBindings');

var _resolveBindings2 = _interopRequireDefault(_resolveBindings);

var _getMeta = require('./utils/getMeta');

var _getMeta2 = _interopRequireDefault(_getMeta);

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _Product = require('./hooks/utils/Product');

var _uid = require('./utils/uid');

var _uid2 = _interopRequireDefault(_uid);

var _useChildren = require('./hooks/useChildren');

var _useChildren2 = _interopRequireDefault(_useChildren);

var _useElement = require('./hooks/useElement');

var _useElement2 = _interopRequireDefault(_useElement);

var _useProduct = require('./hooks/useProduct');

var _useProduct2 = _interopRequireDefault(_useProduct);

var _usePubSub = require('./hooks/usePubSub');

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = require('./hooks/useState');

var _useState2 = _interopRequireDefault(_useState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-use-before-define, consistent-return */

function createElement(func, props, children) {
  var run = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent) {
      var additionalProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var result, genResult, toGenValue;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              element.parent = parent;
              element.isRunning = true;
              processChildrenAutomatically.process = true;

              result = func(_extends({}, props, additionalProps, (0, _resolveBindings2.default)(element), {
                useChildren: useChildren,
                useElement: useElement,
                useProduct: useProduct,
                usePubSub: usePubSub,
                useState: useState
              }));
              genResult = void 0, toGenValue = void 0;


              element.isRunning = false;
              element.isUsed = true;

              // handling a promise

              if (!(result && result.then)) {
                _context.next = 13;
                break;
              }

              _context.next = 10;
              return result;

            case 10:
              result = _context.sent;
              _context.next = 30;
              break;

            case 13:
              if (!(result && typeof result.next === 'function')) {
                _context.next = 26;
                break;
              }

              genResult = result.next();

            case 15:
              if (genResult.done) {
                _context.next = 23;
                break;
              }

              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context.next = 20;
                break;
              }

              _context.next = 19;
              return genResult.value.run(element);

            case 19:
              toGenValue = _context.sent;

            case 20:
              genResult = result.next(toGenValue);
              _context.next = 15;
              break;

            case 23:
              result = genResult.value;

              // handling another ActML element
              _context.next = 30;
              break;

            case 26:
              if (!(0, _isActMLElement2.default)(result)) {
                _context.next = 30;
                break;
              }

              _context.next = 29;
              return result.run(element);

            case 29:
              result = _context.sent;

            case 30:
              if (!processChildrenAutomatically.process) {
                _context.next = 33;
                break;
              }

              _context.next = 33;
              return callChildren();

            case 33:
              return _context.abrupt('return', result);

            case 34:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function run(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var element = {
    __actml: (0, _uid2.default)(),
    parent: null,
    meta: (0, _getMeta2.default)(func, props),
    run: run,
    requestProduct: requestProduct,
    isUsed: false,
    isRunning: false
  };
  var product = (0, _Product.createProduct)(element);

  var _createUseChildrenHoo = (0, _useChildren2.default)(element, children),
      useChildren = _createUseChildrenHoo.hook,
      callChildren = _createUseChildrenHoo.callChildren,
      processChildrenAutomatically = _createUseChildrenHoo.processChildrenAutomatically;

  var useElement = (0, _useElement2.default)(element);
  var useProduct = (0, _useProduct2.default)(product);
  var usePubSub = (0, _usePubSub2.default)(element);
  var useState = (0, _useState2.default)(element);

  function requestProduct(propName, dependent) {
    var exportsKeyword = element.meta.exportsKeyword;


    if (exportsKeyword && exportsKeyword === propName) {
      product.subscribe(dependent);
      return { value: product.get() };
    }
  }

  return element;
};