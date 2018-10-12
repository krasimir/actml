/** @jsx A */
import { A, run } from '..';

describe('Given the Debugger utility', () => {
  describe('when we enable the debugger', () => {
    it('should print out logs', async () => {
      const logs = [];
      const customLogger = (...args) => {
        logs.push(args.map(a => {
          if (typeof a === 'string') return a.replace(/ +/, '');
          return a;
        }));
      }
      const Z = function Z() {};
      const B = function B() { return 42; };
      const C = function C() {};

      await run(
        <A debug={ { log: customLogger } }>
          <Z><B /></Z>
          <C />
          <B exports='resultOfB'/>
        </A>,
        {}
      );

      expect(logs).toStrictEqual([["<A>"], ["<Z>"], ["<B>"], ["</B>"], ["</Z>"], ["<C>"], ["</C>"], ["<B>"], ["</B>"],["</A>"]])
    });
  });
});