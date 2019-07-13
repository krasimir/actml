/* eslint-disable no-sequences */
/** @jsx A */

import { A, run, processor, useChildren } from '../../';

const delay = (ms, func) => new Promise(resolve => setTimeout(() => resolve(func()), ms));

describe('Given the ActML library', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('when use the useChildren hook', () => {
    it(`should
      - give us the power to run the children manually
      - give us access to the children directly
      - do not run the children automatically`, async () => {
      const mock = jest.fn();

      async function E() {
        const [ children, childrenList ] = useChildren();
        const result = await children();

        return result.concat(childrenList.map(({ name }) => name));
      }
      const B = () => (mock(), 'b');
      const C = () => delay(40, () => (mock(), 'c'));
      const D = () => delay(20, () => (mock(), 'd'));

      const result = await run(
        <E>
          <B />
          <C />
          <D />
        </E>
      );

      expect(result).toStrictEqual(['b', 'c', 'd', 'B', 'C', 'D']);
      expect(mock).toBeCalledTimes(3);
    });
    it('should allow us to pass props when running the children', async () => {
      const E = async () => {
        const [ children ] = useChildren();

        await children({ x: 10 });
      };
      const B = jest.fn();
      const C = jest.fn();

      await run(
        <E>
          <B />
          <C />
        </E>
      );

      expect(B).toBeCalledTimes(1);
      expect(B).toBeCalledWith(expect.objectContaining({ x: 10 }));
      expect(C).toBeCalledTimes(1);
      expect(C).toBeCalledWith(expect.objectContaining({ x: 10 }));
    });
    describe('when the `children` is just a function', () => {
      it('should run the function with the given value', async () => {
        const E = async () => {
          const [ children ] = useChildren();

          children('foo');
        };
        const B = jest.fn();

        await run(
          <E>
            { B }
          </E>
        );

        expect(B).toBeCalledTimes(1);
        expect(B).toBeCalledWith('foo');
      });
      describe('and when the function returns another ActML element', () => {
        it('should run that element too', async () => {
          const E = async () => {
            const [ children ] = useChildren();

            children('foo');
          };
          const C = jest.fn();
          const B = jest.fn().mockImplementation((param) => <C param={ param }/>);

          await run(
            <E>
              { B }
            </E>
          );

          expect(C).toBeCalledTimes(1);
          expect(C).toBeCalledWith(expect.objectContaining({ param: 'foo' }));
        });
      });
    });
    it('should allow me to process the children and use the result of them (sync) ', async () => {
      const E = async () => {
        const [ children ] = useChildren();

        const r = children(5);

        return r.reduce((value, item) => {
          return value + item;
        }, 0);
      };
      const B = () => 10;
      const F = 40;

      const result = await run(
        <E>
          <B />
          { F }
          {
            (n) => n * 2
          }
        </E>
      );

      expect(result).toBe(60);
    });
    it('should allow me to process the children and use the result of them (async) ', async () => {
      const E = async () => {
        const [ children ] = useChildren();

        const r = await children(5);

        return r.reduce((value, item) => {
          return value + item;
        }, 0);
      };
      const B = () => 10;
      const C = async () => 20;
      const X = () => 1;
      const D = function * () {
        return 30 + (yield <X />);
      };
      const F = 40;

      const result = await run(
        <E>
          <B />
          <C />
          <D />
          { F }
          {
            (n) => n * 2
          }
        </E>
      );

      expect(result).toBe(111);
    });
  });
});
