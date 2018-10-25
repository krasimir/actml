/** @jsx A */
import { A, run } from '..';

describe('Given the ActML library', () => {
  describe('when using the `before` and `after` hooks', () => {
    it('should run the hooks before and after the other workers', async () => {
      const M = function ({ value }) {
        return value;
      }
      M.before = (context, done) => {
        context.element.props = { value: 42 }
        done();
      }
      M.after = (context, done) => {
        context.result = context.result * 2;
        done();
      }

      expect(await run(<M />)).toEqual(84);
    });
  });
});