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

        mock(state);
        delay(10, () => dispatch({ type: 'increment' }));
        delay(20, () => dispatch({ type: 'increment' }));
        delay(30, () => dispatch({ type: 'decrement' }));
      };

      await run(
        <Fragment>
          <C />
        </Fragment>
      );
      await delay(40);
    });
  });
});
