/** @jsx A */

import { A, run } from '../';

const delay = (ms, func) => new Promise(resolve => setTimeout(() => resolve(func()), ms));

describe('Given the ActML library', () => {
  describe('and we use the state API', () => {
    it('should use the initial state', async () => {
      function E({ useState }) {
        const [ state ] = useState('foo');

        expect(state).toBe('foo');
      }

      const C = jest.fn();

      await run(<E exports='bar'><C $bar/></E>);
      expect(C).toBeCalledWith(expect.objectContaining({ bar: 'foo' }));
    });
    it('should provide a way to update the state', async () => {
      async function E({ useState }) {
        const [ state, setState ] = useState('foo');

        expect(state).toBe('foo');
        await delay(20, () => setState('bar'));
      };

      const C = jest.fn();

      await run(<E exports='bar'><C $bar/></E>);
      expect(C).toBeCalledWith(expect.objectContaining({ bar: 'bar' }));
    });
    it('should allow export and import', async () => {
      function E({ useState }) {
        const [ _, setState ] = useState();

        return delay(20, () => setState(42));
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

      expect(C).toBeCalledWith(expect.objectContaining({ data: 42 }));
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
  <Root>
  <E>
  <B>
  <C>`);
      }
    });
    it('should pass down undefined if that is the value of the scoped variable', async () => {
      async function E() {
        return await delay(100, () => {});
      }
      const C = jest.fn();

      await run(<E exports='user'><C $user/></E>);

      expect(C).toBeCalledWith(expect.objectContaining({ user: undefined }));
    });
    it('should throw an error if the state is not exported', async () => {
      function E({ useState }) {
        useState('foo');
      }

      const C = jest.fn();

      try {
        await run(<E><C $bar/></E>);
      } catch (error) {
        expect(error.message).toMatch('"bar" prop requested');
      }
    });
    xit('should have our child re-run if the data is changed (binding)', async () => {
      async function E({ useState }) {
        let [ state, setState ] = useState(2);

        await delay(20, () => (state = setState(state * 2)));
        delay(10, () => (state = setState(state * 2)));
        delay(30, () => (state = setState(state * 2)));
        delay(20, () => (state = setState(state * 2)));
      }

      const C = jest.fn();

      await run(
        <E exports='foo'>
          <C $foo/>
        </E>
      );

      await delay(200, () => {});

      expect(C).toBeCalledTimes(4);
      // expect(C).toBeCalledWith(expect.objectContaining({ foo: 4 }));
      // expect(C).toBeCalledWith(expect.objectContaining({ foo: 8 }));
      // expect(C).toBeCalledWith(expect.objectContaining({ foo: 16 }));
      // expect(C).toBeCalledWith(expect.objectContaining({ foo: 32 }));
    });
  });
});
