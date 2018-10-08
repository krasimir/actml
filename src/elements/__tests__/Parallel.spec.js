/** @jsx A */
import { A, run, Parallel } from '../..';

const delay = (what, delay) => new Promise(done => {
  setTimeout(() => (what(), done()), delay);
});

describe('Given the Parallel element', () => {
  describe('when using Parallel', () => {
    it('should run its children in parallel', async () => {
      const temp = [];
      const Z = jest.fn().mockImplementation(() => delay(() => temp.push('a'), 50));
      const B = jest.fn().mockImplementation(() => delay(() => temp.push('b'), 30));

      await run(<Parallel><Z /><B /></Parallel>);

      expect(temp).toEqual(['b', 'a']);
    });
    it('should use Promise.all to resolve all the elements inside', async () => {
      const temp = [];
      const Z = jest.fn().mockImplementation(() => temp.push('Z'));
      const ZE = jest.fn().mockImplementation(() => {
        return delay(Z, 100);
      });
      const B = jest.fn().mockImplementation(() => temp.push('B'));
      const BE = jest.fn().mockImplementation(() => {
        return delay(B, 40);
      });
      const C = jest.fn().mockImplementation(() => temp.push('C'));

      await run(
        <A>
          <Parallel>
            <ZE />
            <BE />
          </Parallel>
          <C />
        </A>
      );

      expect(Z).toBeCalled();
      expect(B).toBeCalled();
      expect(C).toBeCalled();
      expect(temp).toStrictEqual(['B', 'Z', 'C']);
    });
    it('should handle errors properly', async () => {
      const Z = jest.fn().mockImplementation(() => delay(() => problem(), 50));
      const B = jest.fn();
      const Handler = jest.fn();

      await run(<Parallel onError={ <Handler /> }><Z /><B /></Parallel>);

      expect(B).toBeCalled();
      expect(Handler).toBeCalled();
    });
  });
});
