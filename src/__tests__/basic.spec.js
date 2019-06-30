/* eslint-disable react/prop-types, no-sequences */
/** @jsx A */

import { A, run, Fragment, processor } from '../';
import { exerciseTree, delay } from '../__helpers__/utils';

describe('Given the ActML library', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('when representing a function as an ActML element', () => {
    it('should create new ActML', async () => {
      const B = () => {};
      const el1 = <B />;
      const el2 = <B />;

      expect(el1).not.toEqual(el2);
    });
    it.only('should re-run same elements if the tree is not changed', async () => {
      const mock = jest.fn();
      const B = () => mock();
      const C = () => {
        return (
          <Fragment>
            <B />
            <B />
          </Fragment>
        );
      };
      const el = <C />;

      await run(el);
      await run(el);

      expect(processor.system().tree.getNumOfElements()).toEqual(4);
      expect(mock).toBeCalledTimes(4);
    });
    it('should re-use only elements that are not changed', async () => {
      let value = 0;
      const mock = jest.fn();
      const B = () => mock();
      const C = () => {
        value += 1;
        return (
          <Fragment>
            {
              () => {
                if (value === 3) {
                  return (
                    <B />
                  );
                }
                return (
                  <Fragment>
                    <B />
                    <B />
                  </Fragment>
                );
              }
            }
          </Fragment>
        );
      };
      const el = <C />;

      await run(el);
      exerciseTree(processor, `
        C(1)
        Fragment(1)
        Fragment(1)
        B(1)
        B(1)
      `);
      await run(el);
      exerciseTree(processor, `
        C(2)
        Fragment(2)
        Fragment(2)
        B(2)
        B(2)
      `);
      await run(el);
      exerciseTree(processor, `
        C(3)
        Fragment(3)
        B(1)
      `);
    });
    it('should re-use elements in a list', async () => {
      let i = 0;
      const mock = jest.fn();
      const B = () => mock();
      const C = () => {
        i += 1;
        return (
          <Fragment>
            <B />
            <B i={ i }/>
            <B />
          </Fragment>
        );
      };
      const el = <C />;

      await run(el);
      await run(el);
      await run(el);

      exerciseTree(processor, `
        C(3)
        Fragment(3)
        B(3)
        B(1)
        B(3)
      `);
      expect(processor.system().tree.getNumOfElements()).toBe(7);
    });
    it('should clean up the tree after a change is found', async () => {
      let i = 0;
      const mock = jest.fn();
      const B = () => mock();
      const C = () => {
        i += 1;
        if (i === 3) {
          return (
            <Fragment>
              <B />
              <B i={ i }/>
            </Fragment>
          );
        }
        return (
          <Fragment>
            <B />
            <B />
            <B />
          </Fragment>
        );
      };
      const el = <C />;

      await run(el);
      await run(el);
      await run(el);

      exerciseTree(processor, `
        C(3)
        Fragment(3)
        B(3)
        B(1)
      `);
    });
    it('should create multiple tree branches if children hook is fired multiple times', async () => {
      const E = function () {};
      const N = function () {};
      const P = function * ({ useChildren }) {
        const [ children ] = useChildren();

        children();
        yield <N />;
        children();
        setTimeout(() => {
          children();
        }, 20);
      };

      await run(
        <P>
          <E />
        </P>
      );
      await delay(30);

      exerciseTree(processor, `
        P(1)
        E(1)
        N(1)
        E(1)
        E(1)
      `);
    });
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
    it('should create different ActML elements even if we use the same function', async () => {
      const ids = [];
      const C = jest.fn().mockImplementation(({ useElement }) => {
        const [ element ] = useElement();

        ids.push(element.id);
      });

      await run(
        <Fragment>
          <C />
          <C />
        </Fragment>
      );

      expect(C).toBeCalledTimes(2);
      expect(ids).toHaveLength(2);
      expect(ids[0] !== ids[1]).toBeTruthy();
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
    describe('and we return another ActML element', () => {
      it('should run it', async () => {
        const C = jest.fn().mockImplementation(() => 42);
        const D = jest.fn();
        const B = function * () {
          return <C><D /></C>;
        };

        expect(await run(<B />)).toBe(42);
        expect(C).toBeCalledTimes(1);
        expect(D).toBeCalledTimes(1);
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
