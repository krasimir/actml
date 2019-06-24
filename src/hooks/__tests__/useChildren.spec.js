/* eslint-disable no-sequences */
/** @jsx A */

import { A, run } from '../../';

const delay = (ms, func) => new Promise(resolve => setTimeout(() => resolve(func()), ms));

describe('Given the ActML library', () => {
  describe('when use the useChildren hook', () => {
    it(`should
      - give us the power to run the children manually
      - give us access to the children directly
      - do not run the children automatically`, async () => {
      const mock = jest.fn();

      async function E({ useChildren }) {
        const [ children, childrenList ] = useChildren();
        const result = await children();

        return result.concat(childrenList.map(({ meta }) => meta.name));
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
      const E = async ({ useChildren, useElement }) => {
        const [ children, childrenList ] = useChildren();
        const [ element ] = useElement();

        await children({ x: 10 });
        await childrenList[1].run(element, { x: 20 });
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
      expect(C).toBeCalledTimes(2);
      expect(C).toBeCalledWith(expect.objectContaining({ x: 10 }));
      expect(C).toBeCalledWith(expect.objectContaining({ x: 20 }));
    });
  });
});
