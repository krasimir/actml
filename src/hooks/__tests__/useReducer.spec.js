/* eslint-disable no-unused-vars */
/** @jsx A */

import { A, run, Fragment, processor, useReducer } from '../../';
import { delay } from '../../__helpers__/utils';

describe('Given the useReducer hook', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('when we use the hook', () => {
    it('should be possible to keep state and control it via actions', async () => {
      const initialState = { count: 0 };
      const mock = jest.fn();
      let lock = false;

      function reducer(state, action) {
        switch (action.type) {
          case 'increment':
            return {count: state.count + 1};
          case 'decrement':
            return {count: state.count - 1};
          default:
            throw new Error();
        }
      }
      const C = function () {
        const [ state, dispatch ] = useReducer(reducer, initialState);

        mock(state());
        if (!lock) {
          lock = true;
          delay(10, () => dispatch({ type: 'increment' }));
          delay(20, () => dispatch({ type: 'increment' }));
          delay(30, () => dispatch({ type: 'increment' }));
        }
      };

      await run(
        <Fragment>
          <C />
        </Fragment>
      );
      await delay(40);
      expect(mock).toBeCalledTimes(4);
      expect(mock).toBeCalledWith({ count: 0 });
      expect(mock).toBeCalledWith({ count: 1 });
      expect(mock).toBeCalledWith({ count: 2 });
      expect(mock).toBeCalledWith({ count: 3 });
    });
  });
  describe('when we use the Dispatch element', () => {
    it('should dispatch an action', async () => {
      const initialState = { count: 0 };

      function reducer(state, action) {
        switch (action.type) {
          case 'increment':
            return { count: state.count + 1};
          case 'decrement':
            return { count: state.count - 1};
          default:
            throw new Error();
        }
      }
      const G = function * () {
        const [ ,, Dispatch, GetState ] = useReducer(reducer, initialState);

        yield <Dispatch action={ { type: 'increment' } } />;
        yield <Dispatch action={ { type: 'increment' } } />;
        yield <Dispatch action={ { type: 'increment' } } />;
        yield <Dispatch action={ { type: 'increment' } } />;

        return <GetState />;
      };

      const result = await run(<G />);

      expect(result).toStrictEqual({ count: 4 });
    });
  });
});
