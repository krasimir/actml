'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createProcessor;

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _usePubSub = require('./hooks/usePubSub');

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = require('./hooks/useState');

var _useState2 = _interopRequireDefault(_useState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-use-before-define */


// import initializeHooks from './hooks';

function createProcessor() {
  var _this = this;

  var tree = (0, _Tree2.default)();
  var currentNode = null;

  var processNode = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(node, stack) {
      var result, genResult, toGenValue;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              currentNode = node;
              stack = [].concat(_toConsumableArray(stack), [node.element]);
              node.enter(stack);
              node.rerun = function () {
                return processNode(node, stack);
              };
              node.callChildren = function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var childrenResult,
                      children,
                      i,
                      _children$i,
                      funcResult,
                      _args = arguments;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          childrenResult = [];
                          children = node.element.children;

                          if (!(children && children.length > 0)) {
                            _context.next = 30;
                            break;
                          }

                          i = 0;

                        case 4:
                          if (!(i < children.length)) {
                            _context.next = 30;
                            break;
                          }

                          if (!(0, _isActMLElement2.default)(children[i])) {
                            _context.next = 14;
                            break;
                          }

                          (_children$i = children[i]).mergeProps.apply(_children$i, _args);
                          _context.t0 = childrenResult;
                          _context.next = 10;
                          return processNode(node.addChildNode(children[i]), stack);

                        case 10:
                          _context.t1 = _context.sent;

                          _context.t0.push.call(_context.t0, _context.t1);

                          _context.next = 27;
                          break;

                        case 14:
                          if (!(typeof children[i] === 'function')) {
                            _context.next = 27;
                            break;
                          }

                          _context.next = 17;
                          return children[i].apply(children, _args);

                        case 17:
                          funcResult = _context.sent;

                          if (!(0, _isActMLElement2.default)(funcResult)) {
                            _context.next = 26;
                            break;
                          }

                          _context.t2 = childrenResult;
                          _context.next = 22;
                          return processNode(node.addChildNode(funcResult), stack);

                        case 22:
                          _context.t3 = _context.sent;

                          _context.t2.push.call(_context.t2, _context.t3);

                          _context.next = 27;
                          break;

                        case 26:
                          childrenResult.push(funcResult);

                        case 27:
                          i++;
                          _context.next = 4;
                          break;

                        case 30:
                          return _context.abrupt('return', childrenResult);

                        case 31:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function () {
                  return _ref2.apply(this, arguments);
                };
              }();

              // actual call of the ActML element
              result = node.element.enter();
              genResult = void 0, toGenValue = void 0;

              // handling a promise

              if (!(result && result.then)) {
                _context2.next = 13;
                break;
              }

              _context2.next = 10;
              return result;

            case 10:
              result = _context2.sent;
              _context2.next = 36;
              break;

            case 13:
              if (!(result && typeof result.next === 'function')) {
                _context2.next = 32;
                break;
              }

              genResult = result.next();

            case 15:
              if (genResult.done) {
                _context2.next = 23;
                break;
              }

              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 20;
                break;
              }

              _context2.next = 19;
              return processNode(node.addChildNode(genResult.value), stack);

            case 19:
              toGenValue = _context2.sent;

            case 20:
              genResult = result.next(toGenValue);
              _context2.next = 15;
              break;

            case 23:
              if (!(0, _isActMLElement2.default)(genResult.value)) {
                _context2.next = 29;
                break;
              }

              _context2.next = 26;
              return processNode(node.addChildNode(genResult.value), stack);

            case 26:
              result = _context2.sent;
              _context2.next = 30;
              break;

            case 29:
              result = genResult.value;

            case 30:
              _context2.next = 36;
              break;

            case 32:
              if (!(0, _isActMLElement2.default)(result)) {
                _context2.next = 36;
                break;
              }

              _context2.next = 35;
              return processNode(node.addChildNode(result), stack);

            case 35:
              result = _context2.sent;

            case 36:
              if (!node.element.shouldProcessChildrenAutomatically()) {
                _context2.next = 39;
                break;
              }

              _context2.next = 39;
              return node.callChildren();

            case 39:

              node.element.out();
              node.out();
              currentNode = null;

              return _context2.abrupt('return', result);

            case 43:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function processNode(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    node: function node() {
      return currentNode;
    },
    run: function run(element) {
      var resolvedRootNode = tree.resolveRoot(element);

      return processNode(resolvedRootNode, []);
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
          tree.reset();
          _usePubSub2.default.clear();
          _useState2.default.clear();
        }
      };
    }
  };
};