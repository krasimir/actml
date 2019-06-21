/** @jsx A */

import { A, run } from '../';

const delay = (ms, func) => new Promise(resolve => setTimeout(() => resolve(func()), ms));

describe('Given the ActML library', () => {
  describe('when we want to use the result of a function', () => {
    describe('and we use the scope API', () => {
      it('should allow export and import', async () => {
        function E() {
          return delay(20, () => 42);
        }
        const B = () => {};
        const C = jest.fn();

        await run(
          <E exports='data'>
            <B>
              <C $data/>
            </B>
          </E>
        );

        expect(C).toBeCalledWith({ data: 42 });
      });
      it('should throw an error if the prop is not found', async () => {
        const Root = () => {};
        const E = () => {};
        const B = () => {};
        const C = function C() {};

        try {
        await run(
          <Root>
            <E>
              <B>
                <C $foobar/>
              </B>
            </E>
          </Root>
        );
        } catch (error) {
          expect(error.message).toBe(`"foobar" prop requested by "C" can not be found.

Stack:
  <C>
  <B>
  <E>
  <Root>`);
        }
      });
    });
  });
});
