/* eslint-disable no-sequences */
/** @jsx A */

import { A, run, processor, useProduct, Fragment } from '../../';
import { delay } from '../../__helpers__/utils';

describe('Given the ActML library', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('and we use the useProduct hook', () => {
    it('should set the product of the element', async () => {
      async function E({ children }) {
        useProduct('foo');
        return children;
      };

      const C = jest.fn();

      await run(<Fragment><E exports='bar'><C $bar/></E></Fragment>);
      expect(C).toBeCalledWith(expect.objectContaining({ bar: 'foo' }));
    });
    it('should provide a way to update the value', async () => {
      async function E({ children }) {
        const [ setValue ] = useProduct('foo');

        await delay(20, () => setValue('bar'));
        return children;
      };

      const C = jest.fn();

      await run(<Fragment><E exports='bar'><C $bar/></E></Fragment>);
      await delay(30);
      expect(C).toBeCalledWith(expect.objectContaining({ bar: 'bar' }));
    });
    it('should allow export and import', async () => {
      function E({ children }) {
        const [ setValue ] = useProduct();

        return delay(20, () => (setValue(42), children));
      }
      const B = ({ children }) => children;
      const C = jest.fn();

      await run(
        <E exports='data'>
          <B>
            <C $data/>
          </B>
        </E>
      );

      expect(C).toBeCalledWith(expect.objectContaining({ data: 42 }));
    });
    it('should throw an error if the prop is not found', async () => {
      const Root = ({ children }) => children;
      const E = ({ children }) => children;
      const B = ({ children }) => children;
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
  <Root>
  <E>
  <B>
  <C>`);
      }
    });
    it('should pass down undefined if that is the value of the scoped variable', async () => {
      async function E({ children }) {
        return await delay(100, () => children);
      }
      const C = jest.fn();

      await run(<E exports='user'><C $user/></E>);

      expect(C).toBeCalledWith(expect.objectContaining({ user: undefined }));
    });
    it('should throw an error if the value is not exported', async () => {
      function E() {
        useProduct('foo');
      }

      const C = jest.fn();

      try {
        await run(<E><C $bar/></E>);
      } catch (error) {
        expect(error.message).toMatch('"bar" prop requested');
      }
    });
    it('should access products on parent siblings', async () => {
      function B() {
        useProduct('foo');
      }
      function C({ children }) { return children; }
      function D({ children }) { return children; }

      const X = jest.fn();

      await run(
        <Fragment>
          <B exports='bar' />
          <C>
            <D>
              <X $bar />
            </D>
          </C>
        </Fragment>
      );

      expect(X).toBeCalledWith(expect.objectContaining({ bar: 'foo' }));
    });
  });
});
