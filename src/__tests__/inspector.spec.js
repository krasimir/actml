/* eslint-disable no-unused-vars */
/** @jsx A */

import { A, run, Fragment, processor, useReducer, useEffect, useState } from '../';
import { delay } from '../__helpers__/utils';
import inspector from '../../packages/inspector';

describe('Given the inspector', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('when using the inspector', () => {
    it.skip('should log out nicely the work of ActML', async () => {
      const initialState = { count: 0 };
      const mock = jest.fn();
      let lock = false;

      inspector(processor, { style: false });
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

      const B = function ({ children }) {
        const [ value, setValue ] = useState(0);

        useEffect(() => {
          // ...
        }, []);
        return children;
      };

      const C = function () {
        const [ state, dispatch ] = useReducer(reducer, initialState);

        mock(state());
        if (!lock) {
          lock = true;
          delay(10, () => dispatch({ type: 'increment' }));
        }
      };

      await run(
        <Fragment>
          <B>
            <C />
          </B>
        </Fragment>
      );
      await delay(20);
    });
  });
});
