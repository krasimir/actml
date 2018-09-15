/** @jsx D */
import { D, speak, Parallel } from '../..';

const delay = (what, delay) => new Promise(done => {
  setTimeout(() => (what(), done()), delay);
});

describe('Given the Dactory dictionary', () => {
  describe('when using the wrapper <D />', () => {
    it('should work just fine :)', async () => {
      const F = jest.fn().mockImplementation(() => 42);

      const result = await speak(<D><F exports='answer' /></D>);

      expect(F).toBeCalled();
      expect(result).toMatchObject({ answer: 42 });
    });
  });
  describe('when using Parallel', () => {
    it('should run its children in parallel', async () => {
      const temp = [];
      const A = jest.fn().mockImplementation(() => delay(() => temp.push('a'), 50));
      const B = jest.fn().mockImplementation(() => delay(() => temp.push('b'), 30));

      await speak(<Parallel><A /><B /></Parallel>);

      expect(temp).toEqual([]);

      await delay(() => {
        expect(temp).toEqual(['b', 'a']);
      }, 60);
    });
  });
});
