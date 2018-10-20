/** @jsx A */
import { A, run } from '..';
import { debuggerIn, debuggerOut } from '../deburger';

jest.mock('../deburger');

describe('Given the Debugger utility', () => {
  describe('when we enable the debugger', () => {
    afterAll(() => {
      jest.unmock('../deburger');
    });
    it('should print out logs', async () => {
      const logs = [];
      debuggerIn.mockImplementation((context, done) => {
        logs.push({
          name: context.element.name,
          type: 'IN'
        });
        done();
      });
      debuggerOut.mockImplementation((context, done) => {
        logs.push({
          name: context.element.name,
          type: 'OUT'
        });
        done();
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
      debuggerIn.mockImplementation((context, done) => {
        logs.push({
          name: context.element.name,
          type: 'IN'
        });
        done();
      });
      debuggerOut.mockImplementation((context, done) => {
        logs.push({
          name: context.element.name,
          type: 'OUT'
        });
        done();
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