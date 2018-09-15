'use strict';

var _ = require('..');

var _Word = require('../Word');

var _Word2 = _interopRequireDefault(_Word);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeAsync = function fakeAsync(resolveWith, delay) {
  return new Promise(function (done) {
    setTimeout(function () {
      return done(resolveWith);
    }, delay);
  });
}; /** @jsx D */


describe('Given the Dactory library', function () {
  describe('when running a simple function', function () {
    it('should run the function as it is a jsx syntax', async function () {
      var Func = jest.fn();

      await (0, _.speak)(Func);

      expect(Func).toBeCalled();
    });
    it('should return the result of the function', async function () {
      var Func = jest.fn().mockImplementation(function () {
        return 'foo';
      });

      var result = await (0, _.speak)(Func);

      expect(result).toBe('foo');
    });
    it('should return the result of the function even if it is async', async function () {
      var Func = jest.fn().mockImplementation(function () {
        return fakeAsync('foo', 30);
      });

      var result = await (0, _.speak)(Func);

      expect(result).toBe('foo');
    });
    it('should run the function and its children as it is a jsx syntax', async function () {
      var A = jest.fn();
      var B = jest.fn();
      var Func = function Func() {
        return (0, _.D)(
          _.D,
          null,
          (0, _.D)(A, null),
          (0, _.D)(B, null)
        );
      };

      await (0, _.speak)(Func);

      expect(A).toBeCalled();
      expect(B).toBeCalled();
    });
  });
  describe('when running a jsx function', function () {
    it('should execute the function with the given params', async function () {
      var Func = jest.fn();
      var Word = (0, _.D)(Func, { foo: 10 });

      await (0, _.speak)(Word);

      expect(Func).toBeCalledWith({ foo: 10 });
    });
    it('- should execute the function with the given merged params\n        - return the result even if we use it as a tag', async function () {
      var Func = jest.fn();
      var Word = (0, _.D)(Func, { foo: 10 });
      await (0, _.speak)((0, _.D)(Word, { bar: 20 }));

      expect(Func).toBeCalledWith({ foo: 10, bar: 20 });
    });
    it('work continue processing dialects if we return such as a result', async function () {
      var Bar = jest.fn();
      var Foo = jest.fn().mockImplementation(function () {
        return (0, _.D)(Bar, { $answer: true });
      });
      var App = function App() {
        return 42;
      };

      await (0, _.speak)((0, _.D)(
        App,
        { exports: 'answer' },
        (0, _.D)(Foo, null)
      ));

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalledWith({ answer: 42 });
    });
  });
  describe('when having nested functions', function () {
    it('should run the functions on every level', async function () {
      var Foo = jest.fn();
      var Bar = jest.fn();
      var Zar = jest.fn();
      var language = (0, _.D)(
        Foo,
        null,
        (0, _.D)(
          Bar,
          null,
          (0, _.D)(Zar, null)
        )
      );
      await (0, _.speak)(language);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalled();
      expect(Zar).toBeCalled();
    });
    it('should run the siblings', async function () {
      var Foo = jest.fn();
      var Bar = jest.fn();
      var Zar = jest.fn();
      var language = (0, _.D)(
        Foo,
        null,
        (0, _.D)(Bar, null),
        (0, _.D)(Zar, null)
      );

      await (0, _.speak)(language);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalled();
      expect(Zar).toBeCalled();
    });
  });
  describe('when using asynchronous functions', function () {
    it('should wait till the promise is resolved', async function () {
      var result = 0;
      var Foo = async function Foo() {
        result = 42;
      };
      await (0, _.speak)((0, _.D)(Foo, null));

      expect(result).toBe(42);
    });
    describe('and we have nested functions', function () {
      it('should wait till the promise is resolved before running the other nested functions', async function () {
        var x = 0;
        var total = 0;
        var Foo = async function Foo() {
          x = 42;
        };
        var Bar = function Bar(_ref) {
          var answer = _ref.answer;
          return total = answer() * 2;
        };

        await (0, _.speak)((0, _.D)(
          Foo,
          null,
          (0, _.D)(Bar, { answer: function answer() {
              return x;
            } })
        ));

        expect(total).toBe(84);
      });
      it('should handle multiple async children', async function () {
        var flow = [];
        var Logic = function Logic() {};
        var A = async function A() {
          return new Promise(function (done) {
            return setTimeout(function () {
              flow.push('a');done();
            }, 10);
          });
        };
        var B = async function B() {
          flow.push('b');
        };
        var C = async function C() {
          return new Promise(function (done) {
            return setTimeout(function () {
              flow.push('c');done();
            }, 30);
          });
        };

        await (0, _.speak)((0, _.D)(
          Logic,
          null,
          (0, _.D)(A, null),
          (0, _.D)(B, null),
          (0, _.D)(C, null)
        ));

        expect(flow).toEqual(['a', 'b', 'c']);
      });
    });
  });
  describe('when using the context', function () {
    it('should pass variables between siblings', async function () {
      var print = jest.fn();
      var GetToken = async function GetToken() {
        return fakeAsync('XXX', 50);
      };
      var UseToken = function UseToken(_ref2) {
        var token = _ref2.token;
        return print(token);
      };
      var App = function App() {};

      await (0, _.speak)((0, _.D)(
        App,
        null,
        (0, _.D)(GetToken, { exports: 'token' }),
        (0, _.D)(UseToken, { $token: true })
      ));
      expect(print).toBeCalledWith('XXX');
    });
    it('should allow renaming of a prop', async function () {
      var print = jest.fn();
      var GetToken = async function GetToken() {
        return fakeAsync('XXX', 50);
      };
      var UseToken = function UseToken(_ref3) {
        var token = _ref3.token;
        return print(token);
      };
      var App = function App() {};

      await (0, _.speak)((0, _.D)(
        App,
        null,
        (0, _.D)(GetToken, { exports: 'blah' }),
        (0, _.D)(UseToken, { $blah: 'token' })
      ));
      expect(print).toBeCalledWith('XXX');
    });
    it('should be able to return the context as a result of a function', async function () {
      var GetAnswer = async function GetAnswer() {
        return fakeAsync(21, 20);
      };
      var Calc = function Calc(_ref4) {
        var answer = _ref4.answer;
        return fakeAsync(answer * 2, 30);
      };
      var App = function App() {
        return this.context;
      };

      var _ref5 = await (0, _.speak)((0, _.D)(
        App,
        null,
        (0, _.D)(GetAnswer, { exports: 'answer' }),
        (0, _.D)(Calc, { $answer: true, exports: 'result' })
      )),
          result = _ref5.result;

      expect(result).toBe(42);
    });
  });
  describe('when there is an error', function () {
    it('should bubble up the error if the handler returns `undefined`', async function () {
      var Problem = function Problem() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      var A = function A() {};
      var B = function B() {};

      try {
        await (0, _.speak)((0, _.D)(
          _.D,
          null,
          (0, _.D)(
            A,
            null,
            (0, _.D)(
              B,
              null,
              (0, _.D)(Problem, null)
            )
          )
        ));
      } catch (error) {
        expect(error.toString()).toEqual('ReferenceError: iDontExist is not defined');
      }
    });
    it('should stop processing if the error handler returns `false`', async function () {
      var Problem = function Problem() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      var App = function App() {};
      var HandleError = jest.fn().mockImplementation(function () {
        return false;
      });
      var AfterError = jest.fn();

      await (0, _.speak)((0, _.D)(
        App,
        { exports: 'answer' },
        (0, _.D)(Problem, { onError: (0, _.D)(HandleError, null) }),
        (0, _.D)(AfterError, null)
      ));
      expect(HandleError).toBeCalled();
      expect(AfterError).not.toBeCalled();
    });
    it('should continue processing if the error handler returns `true`', async function () {
      var Problem = function Problem() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      var App = function App() {};
      var HandleError = jest.fn().mockImplementation(function () {
        return true;
      });
      var AfterError = jest.fn();

      await (0, _.speak)((0, _.D)(
        App,
        { exports: 'answer' },
        (0, _.D)(Problem, { onError: (0, _.D)(HandleError, null) }),
        (0, _.D)(AfterError, null)
      ));
      expect(HandleError).toBeCalled();
      expect(AfterError).toBeCalled();
    });
    it('should fire the onError handler with the given error', async function () {
      var Problem = function Problem() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      var App = function App() {};
      var spy = jest.fn();
      var HandleError = function HandleError(_ref6) {
        var error = _ref6.error;
        return spy(error.message), false;
      };

      await (0, _.speak)((0, _.D)(
        App,
        null,
        (0, _.D)(Problem, { onError: (0, _.D)(HandleError, null) })
      ));
      expect(spy).toBeCalledWith('iDontExist is not defined');
    });
    it('should fire the onError handler with the same context', async function () {
      var Problem = function Problem() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      var spy = jest.fn();
      var App = function App() {
        return 42;
      };
      var HandleError = function HandleError(_ref7) {
        var answer = _ref7.answer;
        return spy(answer), false;
      };

      await (0, _.speak)((0, _.D)(
        App,
        { exports: 'answer' },
        (0, _.D)(Problem, { onError: (0, _.D)(HandleError, { $answer: true }) })
      ));
      expect(spy).toBeCalledWith(42);
    });
    it('should stop the current execution (by default) only in the current children branch', async function () {
      var Problem = function Problem() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      var App = function App() {};
      var Wrapper = function Wrapper() {};
      var Dummy = function Dummy() {
        return 42;
      };
      var HandleErrorA = jest.fn().mockImplementation(function () {
        return false;
      });
      var AfterErrorA = jest.fn();
      var B = jest.fn();
      var C = jest.fn();

      await (0, _.speak)((0, _.D)(
        App,
        { exports: 'answer' },
        (0, _.D)(
          Wrapper,
          null,
          (0, _.D)(Problem, { onError: (0, _.D)(
              HandleErrorA,
              null,
              (0, _.D)(Dummy, { exports: 'answer' })
            ) }),
          (0, _.D)(AfterErrorA, null)
        ),
        (0, _.D)(
          Wrapper,
          null,
          (0, _.D)(B, null),
          (0, _.D)(C, { $answer: true })
        )
      ));
      expect(HandleErrorA).toBeCalled();
      expect(AfterErrorA).not.toBeCalled();
      expect(B).toBeCalled();
      expect(C).toBeCalledWith({ answer: 42 });
    });
  });
  describe('when we have the FACC pattern', function () {
    it('- should run the FACC with the return as a param\n        - should continue processing the dialect returned by the FACC', async function () {
      var A = jest.fn();
      var B = jest.fn();
      var Logic = async function Logic() {
        return fakeAsync(false, 20);
      };
      var App = function App() {};
      await (0, _.speak)((0, _.D)(
        App,
        null,
        (0, _.D)(
          Logic,
          null,
          function (status) {
            return status ? (0, _.D)(A, null) : (0, _.D)(B, null);
          }
        )
      ));

      expect(A).not.toBeCalled();
      expect(B).toBeCalled();
    });
  });
  describe('when working with the pipeline', function () {
    it('- should be possible to process the children many times\n        - and pass data to them', async function () {
      var store = {
        subscribe: function subscribe(callback) {
          setTimeout(callback, 20);
        }
      };
      var Func = async function Func() {
        var _this = this;

        await this.pipeline('children', 'foo');
        store.subscribe(async function () {
          await _this.pipeline('children', 'bar');
          await _this.pipeline('children');
        });
      };
      var A = jest.fn();
      var B = jest.fn();

      await (0, _.speak)((0, _.D)(
        _.D,
        null,
        (0, _.D)(
          Func,
          null,
          function (data) {
            return (0, _.D)(
              _.D,
              null,
              (0, _.D)(A, { data: data }),
              (0, _.D)(B, { data: data })
            );
          }
        )
      ));
      await new Promise(function (done) {
        return setTimeout(done, 30);
      });

      expect(A).toHaveBeenCalledTimes(3);
      expect(B).toHaveBeenCalledTimes(3);
      expect(A).toBeCalledWith({ data: 'foo' });
      expect(B).toBeCalledWith({ data: 'foo' });
      expect(A).toBeCalledWith({ data: 'bar' });
      expect(B).toBeCalledWith({ data: 'bar' });
      expect(A).toBeCalledWith({ data: undefined });
      expect(B).toBeCalledWith({ data: undefined });
    });
  });
  describe('when we want control the logic flow', function () {
    describe('and we want to stop the current branch', function () {
      it('should stop the current branch if there is a Word.errors.STOP_PROCESSING thrown', async function () {
        var App = function App() {};
        var A = jest.fn();
        var B = jest.fn().mockImplementation(function () {
          throw new Error(_Word2.default.errors.STOP_PROCESSING);
        });
        var C = jest.fn();

        await (0, _.speak)((0, _.D)(
          App,
          null,
          (0, _.D)(A, null),
          (0, _.D)(B, null),
          (0, _.D)(C, null)
        ));

        expect(A).toBeCalled();
        expect(B).toBeCalled();
        expect(C).not.toBeCalled();
      });
    });
    describe('and we want to prevent the children processing', function () {
      it('should stop the children processing using the pipeline', async function () {
        var App = function App() {};
        var A = jest.fn();
        var B = jest.fn().mockImplementation(function (props) {
          if (!props || props.flag !== true) {
            this.pipeline.disable('children');
          }
        });
        var C = jest.fn();
        var E = jest.fn();
        var F = jest.fn();

        await (0, _.speak)((0, _.D)(
          App,
          null,
          (0, _.D)(A, null),
          (0, _.D)(
            B,
            null,
            (0, _.D)(C, null)
          ),
          (0, _.D)(
            B,
            null,
            function () {
              return E();
            }
          ),
          (0, _.D)(
            B,
            { flag: true },
            (0, _.D)(F, null)
          )
        ));

        expect(A).toBeCalled();
        expect(B).toHaveBeenCalledTimes(3);
        expect(C).not.toBeCalled();
        expect(E).not.toBeCalled();
        expect(F).toBeCalled();
      });
    });
  });
  describe('when the word is a generator', function () {
    it('should process the `yield`ed statements as words', async function () {
      var A = jest.fn();
      var B = jest.fn().mockImplementation(function () {
        return fakeAsync(42, 10);
      });
      var C = jest.fn().mockImplementation(function (answer) {
        return 'the answer is ' + answer;
      });
      var E = jest.fn().mockImplementation(function (_ref8) {
        var message = _ref8.message,
            answer = _ref8.answer;

        return { message: message, answer: answer, context: this.context };
      });
      var Func = /*#__PURE__*/regeneratorRuntime.mark(function Func() {
        var answer, message;
        return regeneratorRuntime.wrap(function Func$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _.D)(A, { foo: 'bar' });

              case 2:
                _context.next = 4;
                return (0, _.D)(B, { bar: 'foo', exports: 'answer' });

              case 4:
                answer = _context.sent;
                _context.next = 7;
                return C(answer);

              case 7:
                message = _context.sent;
                return _context.abrupt('return', (0, _.D)(E, { $answer: true, message: message }));

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, Func, this);
      });

      var result = await (0, _.speak)(Func);

      expect(A).toBeCalledWith({ foo: 'bar' });
      expect(B).toBeCalledWith({ bar: 'foo', exports: 'answer' });
      expect(C).toBeCalledWith(42);
      expect(E).toBeCalledWith({ answer: 42, message: 'the answer is 42' });
      expect(result).toMatchObject({
        message: 'the answer is 42',
        answer: 42,
        context: { answer: 42 }
      });
    });
  });
});