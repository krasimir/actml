/** @jsx A */

import { A, run, useEffect, processor } from '../../';
import { delay } from '../../__helpers__/utils';

describe('Given the ActML library', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('when use the useEffect hook', () => {
    it('should run the effect when the function is done (onNodeOut)', async () => {
      const order = [];
      const E = async () => {
        useEffect(() => order.push('c'));
        await delay(10, () => order.push('a'));
        await delay(15, () => order.push('b'));
      };
      const el = <E />;

      await run(el);

      expect(order).toStrictEqual(['a', 'b', 'c']);
    });
    it('should allow us to run the effect only once across re-runs', async () => {
      const mock = jest.fn();
      const E = () => {
        useEffect(mock, []);
      };
      const el = <E />;

      await run(el);
      await run(el);
      await run(el);

      expect(mock).toBeCalledTimes(1);
    });
    it('should run the effect only if the dependencies are changed', async () => {
      const mock = jest.fn();
      let counter = 0;
      const E = () => {
        counter += 1;
        useEffect(mock, ['a', 'b', counter < 2 ? 'c' : 'd']);
      };
      const el = <E />;

      await run(el);
      await run(el);
      await run(el);

      expect(mock).toBeCalledTimes(2);
    });
    it('should run the clean up function when the node is removed from the tree', async () => {
      let counter = 0;
      const mock = jest.fn();
      const E = () => {
        useEffect(() => {
          return mock;
        }, []);
      };
      const N = jest.fn();
      const T = () => {
        counter += 1;
        if (counter > 2) {
          return <N />;
        }
        return <E />;
      };
      const el = <T />;

      await run(el);
      await run(el);
      await run(el);
      await run(el);

      expect(mock).toBeCalledTimes(1);
    });
    it('should support handling of multiple effects', async () => {
      const mockA = jest.fn();
      const mockB = jest.fn();
      let counter = 0;
      const E = () => {
        counter += 1;
        useEffect(mockA);
        useEffect(mockB, [ counter <= 2 ? 'foo' : 'bar' ]);
      };
      const el = <E />;

      await run(el);
      await run(el);
      await run(el);
      await run(el);

      expect(mockA).toBeCalledTimes(4);
      expect(mockB).toBeCalledTimes(2);
    });
  });
});
