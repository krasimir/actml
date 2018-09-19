/** @jsx A */
import { A, run, Parallel } from '../..';

const delay = (what, delay) => new Promise(done => {
  setTimeout(() => (what(), done()), delay);
});

describe('Given the Parallel actor', () => {
  describe('when using Parallel', () => {
    it('should run its children in parallel', async () => {
      const temp = [];
      const Z = jest.fn().mockImplementation(() => delay(() => temp.push('a'), 50));
      const B = jest.fn().mockImplementation(() => delay(() => temp.push('b'), 30));

      await run(<Parallel><Z /><B /></Parallel>);

      expect(temp).toEqual([]);

      await delay(() => {
        expect(temp).toEqual(['b', 'a']);
      }, 60);
    });
  });
});
