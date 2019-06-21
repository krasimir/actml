/* eslint-disable no-sequences */
/** @jsx A */

import { A, run } from '../';

const delay = (ms, func) => new Promise(resolve => setTimeout(() => resolve(func()), ms));

describe('Given the ActML library', () => {
  describe('and we use the useChildren hoo', () => {
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
  });
});
