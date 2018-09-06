/** @jsx D */
import { D, speak } from '..';

describe('Given the Dactory collection', () => {
  describe('when using the dummy wrapper', () => {
    it('should work just fine :)', async () => {
      const F = jest.fn();

      await speak(<D><F /></D>);

      expect(F).toBeCalled();
    });
  });
});
