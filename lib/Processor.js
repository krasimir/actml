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

var _hooks = require('./hooks');

var _hooks2 = _interopRequireDefault(_hooks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* eslint-disable no-use-before-define */


var process = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(branch) {

    // handling children
    var callChildren = function () {
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
                children = branch.element.children;

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
                return process(branch.addSubBranch(children[i]), stack);

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
                return process(branch.addSubBranch(funcResult), stack);

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
        }, _callee, this);
      }));

      return function callChildren() {
        return _ref2.apply(this, arguments);
      };
    }();

    var stack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var hooksProps, result, genResult, toGenValue;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            branch.initialize();

            hooksProps = (0, _hooks2.default)(branch, callChildren, stack, process);
            _context2.next = 4;
            return branch.element.run(hooksProps);

          case 4:
            result = _context2.sent;
            genResult = void 0, toGenValue = void 0;

            // updating the stack

            stack.push(branch.element);

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
            return process(branch.addSubBranch(genResult.value), stack);

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
            return process(branch.addSubBranch(genResult.value), stack);

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
            return process(branch.addSubBranch(result), stack);

          case 35:
            result = _context2.sent;

          case 36:
            if (!branch.element.shouldProcessChildrenAutomatically()) {
              _context2.next = 39;
              break;
            }

            _context2.next = 39;
            return callChildren();

          case 39:

            branch.cleanUp();

            return _context2.abrupt('return', result);

          case 41:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function process(_x) {
    return _ref.apply(this, arguments);
  };
}();

function createProcessor() {
  var tree = (0, _Tree2.default)();

  return {
    run: function run(elementPrimitive) {
      return process(tree.resolveRoot(elementPrimitive));
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