(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('regenerator-runtime/runtime')) :
  typeof define === 'function' && define.amd ? define(['exports', 'regenerator-runtime/runtime'], factory) :
  (factory((global.dialectica = {})));
}(this, (function (exports) { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Word =
  /*#__PURE__*/
  function () {
    function Word(func, params, children) {
      _classCallCheck(this, Word);

      this.func = func;
      this.params = params;
      this.children = children;
      this.__D = true;
    }

    _createClass(Word, [{
      key: "say",
      value: function say(context) {
        if (Word.isItAWord(this.func)) {
          return this.func.mergeParams(this.params).say(context);
        }

        return this.contextifyParams(context).func(this.params);
      }
    }, {
      key: "mergeParams",
      value: function mergeParams(params) {
        this.params = Object.assign({}, this.params, params);
        return this;
      }
    }, {
      key: "contextifyParams",
      value: function contextifyParams(context) {
        var _this = this;

        this.params && Object.keys(this.params).forEach(function (param) {
          if (context[param]) _this.params[param] = context[param];
        });
        return this;
      }
    }], [{
      key: "isItAWord",
      value: function isItAWord(word) {
        return word && word.__D === true;
      }
    }]);

    return Word;
  }();

  var Dialect =
  /*#__PURE__*/
  function () {
    function Dialect() {
      _classCallCheck(this, Dialect);
    }

    _createClass(Dialect, [{
      key: "speak",
      value: function () {
        var _speak = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2(word) {
          var context,
              result,
              process,
              pointer,
              self,
              _args2 = arguments;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  context = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

                  if (!Word.isItAWord(word)) {
                    _context2.next = 15;
                    break;
                  }

                  _context2.next = 4;
                  return word.say(context);

                case 4:
                  result = _context2.sent;

                  // registering exports in the current context
                  if (word.params && word.params['exports']) {
                    context[word.params.exports] = result;
                  }

                  if (!(word.children && word.children.length > 0)) {
                    _context2.next = 12;
                    break;
                  }

                  process =
                  /*#__PURE__*/
                  function () {
                    var _ref = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee(w) {
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return self.speak(w, context);

                            case 2:
                              if (!(++pointer < word.children.length)) {
                                _context.next = 4;
                                break;
                              }

                              return _context.abrupt("return", process(word.children[pointer]));

                            case 4:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, this);
                    }));

                    return function process(_x2) {
                      return _ref.apply(this, arguments);
                    };
                  }();

                  pointer = 0;
                  self = this;
                  _context2.next = 12;
                  return process(word.children[0]);

                case 12:
                  return _context2.abrupt("return", context);

                case 15:
                  throw new Error('Unexpected word! word = ' + word);

                case 16:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function speak(_x) {
          return _speak.apply(this, arguments);
        };
      }()
    }, {
      key: "create",
      value: function create(func, params) {
        for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          children[_key - 2] = arguments[_key];
        }

        return new Word(func, params, children);
      }
    }]);

    return Dialect;
  }();

  var d = new Dialect();
  var dialect = d.create.bind(d);
  var speak = d.speak.bind(d);

  exports.dialect = dialect;
  exports.speak = speak;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
