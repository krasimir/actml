'use strict';

var _redux = require('redux');

var _ = require('../../');

/** @jsx D */
var middleware = _.Redux.middleware,
    Subscribe = _.Redux.Subscribe,
    SubscribeOnce = _.Redux.SubscribeOnce,
    Inspect = _.Redux.Inspect,
    Action = _.Redux.Action,
    Select = _.Redux.Select,
    reset = _.Redux.reset;


var nextTick = function nextTick() {
  return new Promise(function (done) {
    return setTimeout(done, 1);
  });
};
var setup = function setup() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var reducer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (s) {
    return s;
  };

  return (0, _redux.createStore)(reducer, initialState, (0, _redux.applyMiddleware)(middleware));
};

describe('Given the Redux integration', function () {
  beforeEach(function () {
    reset();
  });
  describe('when using the Subscribe word', function () {
    it('should subscribe to a Redux action', async function () {
      var store = setup({ answer: null }, function (state, action) {
        return action.type === 'ANSWER' ? { answer: action.value } : state;
      });
      var A = jest.fn();

      await (0, _.speak)((0, _.D)(
        Subscribe,
        { type: 'ANSWER' },
        function (_ref) {
          var value = _ref.value;
          return (0, _.D)(A, { value: value });
        }
      ));

      store.dispatch({ type: 'ANSWER', value: 100 });
      store.dispatch({ type: 'ANOTHER_ANSWER' });
      store.dispatch({ type: 'ANSWER', value: 200 });

      await nextTick();

      expect(A).toHaveBeenCalledTimes(2);
      expect(A).toBeCalledWith({ value: 200 });
      expect(A).toBeCalledWith({ value: 100 });
    });
  });
  describe('when using the SubscribeOnce word', function () {
    it('should subscribe to a Redux action only once', async function () {
      var store = setup({ answer: null }, function (state, action) {
        return action.type === 'ANSWER' ? { answer: action.value } : state;
      });
      var A = jest.fn();
      var B = jest.fn();

      await (0, _.speak)((0, _.D)(
        _.D,
        null,
        (0, _.D)(SubscribeOnce, { type: 'FOO' }),
        (0, _.D)(SubscribeOnce, { type: 'ZAR' }),
        (0, _.D)(
          SubscribeOnce,
          { type: 'ANSWER' },
          function (_ref2) {
            var value = _ref2.value;
            return (0, _.D)(
              _.D,
              null,
              (0, _.D)(A, { value: value }),
              (0, _.D)(
                Inspect,
                null,
                function (_ref3) {
                  var numOfSubscribes = _ref3.numOfSubscribes;
                  return (0, _.D)(B, { numOfSubscribes: numOfSubscribes });
                }
              )
            );
          }
        ),
        (0, _.D)(SubscribeOnce, { type: 'BAR' })
      ));

      store.dispatch({ type: 'ANSWER', value: 100 });
      store.dispatch({ type: 'ANOTHER_ANSWER' });
      store.dispatch({ type: 'ANSWER', value: 200 });

      await nextTick();

      expect(A).toHaveBeenCalledTimes(1);
      expect(A).toBeCalledWith({ value: 100 });
      expect(B).toBeCalledWith({ numOfSubscribes: 3 });
    });
  });
  describe('when using the Action word', function () {
    it('should dispatch an action', async function () {
      var store = setup({ counter: 0 }, function (state, action) {
        return action.type === 'INCREASE' ? { counter: state.counter + action.n } : state;
      });
      var A = function A() {
        return 2;
      };

      await (0, _.speak)((0, _.D)(
        _.D,
        null,
        (0, _.D)(A, { exports: 'amount' }),
        (0, _.D)(Action, { type: 'INCREASE', $amount: 'n' }),
        (0, _.D)(Action, { type: 'INCREASE', $amount: 'n' }),
        (0, _.D)(Action, { type: 'INCREASE', n: 10 })
      ));

      expect(store.getState().counter).toBe(14);
    });
  });
  describe('when using the Select word', function () {
    it('should get the data from the store', async function () {
      var store = setup({ user: { age: 40 } });
      var A = jest.fn();
      var selector = function selector(state) {
        return state.user.age;
      };

      await (0, _.speak)((0, _.D)(
        _.D,
        null,
        (0, _.D)(Select, { selector: selector, exports: 'age' }),
        (0, _.D)(A, { $age: true })
      ));

      expect(A).toBeCalledWith({ age: 40 });
    });
    describe('and we have parameterized selector', function () {
      it('should get the data from the store', async function () {
        var store = setup({ user: { age: 40 } });
        var App = function App() {
          return this.context;
        };
        var A = function A() {
          return 50;
        };
        var B = jest.fn();
        var IsItOver = function IsItOver(_ref4) {
          var over = _ref4.over;
          return function (_ref5) {
            var user = _ref5.user;

            return user.age > over;
          };
        };

        var context = await (0, _.speak)((0, _.D)(
          App,
          null,
          (0, _.D)(A, { exports: 'over' }),
          (0, _.D)(Select, { selector: (0, _.D)(IsItOver, { $over: true }), exports: 'answer' }),
          (0, _.D)(B, { $answer: true })
        ));

        expect(context).toMatchObject({ over: 50, answer: false });
        expect(B).toBeCalledWith({ answer: false });
      });
    });
  });
});