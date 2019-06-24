'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseChildrenHook;

var _isActMLElement = require('../utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function createUseChildrenHook(element, children) {
  var callChildren = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(newProps) {
      var result, i;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              result = [];

              if (!(children && children.length > 0)) {
                _context.next = 13;
                break;
              }

              i = 0;

            case 3:
              if (!(i < children.length)) {
                _context.next = 13;
                break;
              }

              if (!(0, _isActMLElement2.default)(children[i])) {
                _context.next = 10;
                break;
              }

              _context.t0 = result;
              _context.next = 8;
              return children[i].run(element, newProps);

            case 8:
              _context.t1 = _context.sent;

              _context.t0.push.call(_context.t0, _context.t1);

            case 10:
              i++;
              _context.next = 3;
              break;

            case 13:
              return _context.abrupt('return', result);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function callChildren(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var processChildrenAutomatically = { process: true };

  return {
    hook: function hook() {
      processChildrenAutomatically.process = false;
      return [callChildren, children];
    },
    callChildren: callChildren,
    processChildrenAutomatically: processChildrenAutomatically
  };
};