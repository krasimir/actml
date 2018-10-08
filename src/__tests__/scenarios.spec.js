/** @jsx A */
import { A, run, Parallel } from '..';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the ActML library', () => {
  describe('when we have elements running in parallel but also we use the scope API', () => {
    it('must handle the async processes in the correct order', async () => {
      const storage = [];
      const Z = function ZZ() { return fakeAsync(42, 40); }
      const B = jest.fn();
      const C = jest.fn().mockImplementation(() => fakeAsync(null, 10));
      const D = jest.fn().mockImplementation(() => fakeAsync(null, 10));
      const E = jest.fn();

      await run(
        <A scope='newIdx' debug>
          <Parallel>
            <Z exports='newIdx' />
            <B>
              <C />
              <D />
            </B>
          </Parallel>
          <A $newIdx>{ ({ newIdx }) => <E newIdx={ newIdx } /> }</A>
        </A>
      );

      expect(E).toBeCalledWith({ newIdx: 42 });
    });
  });
});