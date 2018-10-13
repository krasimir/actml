/** @jsx A */
import { A, run } from '..';
import deburger from '../deburger';
import { formatElement } from '../deburger';

jest.mock('../deburger');

describe('Given the Debugger utility', () => {
  describe('when we enable the debugger', () => {
    afterAll(() => {
      jest.unmock('../deburger');
    });
    it('should print out logs', async () => {
      const logs = [];
      deburger.mockImplementation((element, type) => {
        logs.push({
          name: element.name,
          type
        })
      });
      const Z = function Z() {};
      const B = function B() { return 42; };
      const C = function C() {};

      await run(
        <A debug>
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
    it('should display function names of functions passed via context', async () => {
      const logs = [];
      deburger.mockImplementation((element, type) => {
        logs.push({
          name: element.name,
          type
        })
      });
      const context = {
        getData: () => {

        }
      }

      await run(
        <A debug>
          <getData />
        </A>,
        context
      );

      expect(logs).toStrictEqual(
        [
          {
            name: 'A',
            type: 'IN'
          },
          {
            name: 'getData',
            type: 'IN'
          },
          {
            name: 'getData',
            type: 'OUT'
          },
          {
            name: 'A',
            type: 'OUT'
          }
        ]
      );
    });
  });
});