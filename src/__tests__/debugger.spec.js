/** @jsx A */
import { A, run } from '..';
import deburger from '../deburger';

jest.mock('../deburger');

describe('Given the Debugger utility', () => {
  afterAll(() => {
    deburger.mockRestore();
  });
  describe('when we enable the debugger', () => {
    it('should print out logs', async () => {
      const logs = [];
      deburger.mockImplementation((element, type) => {
        logs.push({
          name: element.name,
          type
        })
      });
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

      expect(logs).toStrictEqual(
        [
          {
            name: 'A',
            type: 'IN'
          },
          {
            name: 'Z',
            type: 'IN'
          },
          {
            name: 'B',
            type: 'IN'
          },
          {
            name: 'B',
            type: 'OUT'
          },
          {
            name: 'Z',
            type: 'OUT'
          },
          {
            name: 'C',
            type: 'IN'
          },
          {
            name: 'C',
            type: 'OUT'
          },
          {
            name: 'B',
            type: 'IN'
          },
          {
            name: 'B',
            type: 'OUT'
          },
          {
            name: 'A',
            type: 'OUT'
          }
        ]
      )
    });
  });
});