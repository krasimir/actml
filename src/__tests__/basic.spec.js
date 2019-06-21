/* eslint-disable react/prop-types, no-sequences */
/** @jsx A */

import { A, run } from '../';

const delay = (ms, func) => new Promise(resolve => setTimeout(() => resolve(func()), ms));

describe('Given the ActML library', () => {
  describe('when representing a function as an ActML element', () => {
    it('should run the function and return its result', async () => {
      const spy = jest.fn();
      const X = function ({ foo }) {
        spy(foo);
        return foo + 5;
      };
      const elementA = <X foo={ 10 } />;
      const elementB = <X foo={ 20 } />;

      expect([await run(elementA), await run(elementB)]).toStrictEqual([ 15, 25 ]);
      expect(spy).toBeCalledWith(10);
      expect(spy).toBeCalledWith(20);
    });
    describe('and the function returns a promise', () => {
      it('should still work', async () => {
        const X = function ({ foo }) {
          return Promise.resolve(foo + 5);
        };

        expect(await run(<X foo={ 10 } />)).toEqual(15);
      });
    });
    describe('and the function returns a promise that gets rejected', () => {
      it('should throw an error', async () => {
        const X = function () {
          return Promise.reject(new Error('Ops'));
        };

        try {
          await run(<X foo={ 10 } />);
        } catch (error) {
          expect(error.message).toBe('Ops');
        }
      });
    });
    describe('and the function returns another ActML element', () => {
      it('should run that element too and return its result', async () => {
        const Y = function ({ foo, by }) {
          return foo * by;
        };
        const X = function ({ foo }) {
          return <Y foo={ foo } by={ 3 }/>;
        };

        const result = await run(<X foo={ 10 } />);

        expect(result).toEqual(30);
      });
    });
  });
  describe('when we have children', () => {
    it('should run the children one after each other in the proper order', async () => {
      const value = [];
      const spyB = jest.fn().mockImplementation(() => value.push('B'));
      const spyC = jest.fn().mockImplementation(() => value.push('C'));
      const spyD = jest.fn().mockImplementation(() => value.push('D'));
      const B = () => delay(50, spyB);
      const C = () => delay(30, spyC);
      const D = () => delay(40, spyD);
      const F = jest.fn();

      await run(
        <F>
          <B /><C /><D />
        </F>
      );

      expect(value).toStrictEqual(['B', 'C', 'D']);
    });
  });
  describe('and we have a generator as a result', () => {
    describe('and we yield an ActML element', () => {
      it('should run it', async () => {
        const C = () => 42;
        const D = ({ v }) => v * 2;
        const E = jest.fn();
        const B = function * () {
          const v = yield <C />;
          const result = yield <D v={ v }><E /></D>;

          return result * 2;
        };

        expect(await run(<B />)).toEqual(168);
        expect(E).toBeCalledTimes(1);
      });
    });
  });
  describe.each([
    [
      'sync func',
      (values) => () => {
        values.push('a');
        return 42;
      }
    ],
    [
      'promise',
      (values) => () => {
        return new Promise(done => {
          setTimeout(() => (values.push('a'), done()), 20);
        });
      }
    ],
    [
      'generator',
      (values) => {
        const D = () => delay(20, () => values.push('a'));
        const E = function * () {
          yield <D />;
        };

        return E;
      }
    ],
    [
      'another ActML element',
      (values) => {
        const D = () => delay(20, () => values.push('a'));
        const E = function () {
          return <D />;
        };

        return E;
      }
    ]
  ])('when running a %s', (_, createElement) => {
    it('should always run the element and then its children', async () => {
      const values = [];
      const C = jest.fn().mockImplementation(() => values.push('b'));
      const E = createElement(values);

      await run(<E><C /></E>);

      expect(values).toStrictEqual(['a', 'b']);
    });
  });
});
