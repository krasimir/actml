'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getFuncName(func) {
  if (func.name) return func.name;
  var result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};

var createElement = function createElement(func, props, children) {
  return {
    __actml: true,
    __used: 0,
    __running: false,
    __processChildrenAutomatically: true,
    id: null,
    props: props,
    name: getFuncName(func),
    children: children,
    initialize: function initialize(id) {
      var used = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this.id = id;
      this.__used = used;
      this.__running = false;
      this.__processChildrenAutomatically = true;
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
    shouldProcessChildrenAutomatically: function shouldProcessChildrenAutomatically(value) {
      if (typeof value === 'undefined') {
        return this.__processChildrenAutomatically;
      }
      this.__processChildrenAutomatically = value;
      return value;
    },
    run: function run() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.__running = true;
                _this.__processChildrenAutomatically = true;

                _context.next = 4;
                return func(_this.props);

              case 4:
                result = _context.sent;


                _this.__used += 1;
                _this.__running = false;
                return _context.abrupt('return', result);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };
};

exports.default = createElement;