/** @jsx A */

import { A, run, useElement } from '../../';

describe('Given the ActML library', () => {
  describe('when use the useElement hook', () => {
    it('should allow us to pass props when running the children', async () => {
      const E = async () => {
        const element = useElement();

        return element.name;
      };

      expect(await run(<E />)).toBe('E');
    });
  });
});
