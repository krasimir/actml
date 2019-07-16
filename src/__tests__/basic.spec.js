/* eslint-disable react/prop-types, no-sequences */
/** @jsx A */

import { A, run, Fragment, processor, useElement, createContext } from '../';
import { exerciseTree, delay } from '../__helpers__/utils';

describe('Given the ActML library', () => {
  beforeEach(() => {
    processor.system().reset();
  });
  describe('when running an ActML element', () => {
    it('should run our function and return its result', () => {
      const E = function () {
        return 42;
      };

      expect(run(<E />)).toBe(42);
    });
    describe('and we use a promise as a result', () => {
      it('should run our function, wait for the promise to be resolved and return its result', async () => {
        const E = async function () {
          return 42;
        };

        expect(await run(<E />)).toBe(42);
      });
    });
    describe('and we return another ActML element', () => {
      it('should run that element too', () => {
        const B = () => 42;
        const E = () => <B />;

        expect(run(<E />)).toBe(42);
      });
      describe('and that other element is an async function', () => {
        it('should wait for the result', async () => {
          const B = async () => 42;
          const E = async () => <B />;

          expect(await run(<E />)).toBe(42);
        });
      });
    });
    describe('and we have a child', () => {
      it('should run the child', () => {
        const B = jest.fn().mockImplementation(() => 42);
        const E = ({ children }) => children;

        expect(run(<E><B /></E>)).toBe(42);
        expect(B).toBeCalledTimes(1);
      });
      describe('and some of the children are async', () => {
        it('should wait for the child to finish', async () => {
          const B = jest.fn().mockImplementation(() => 42);
          const C = async () => <B />;
          const E = ({ children }) => children;

          expect(await run(<E><C /></E>)).toBe(42);
          expect(B).toBeCalledTimes(1);
        });
      });
      describe('and run the children manually with a delay', () => {
        it('should run the children', async () => {
          const B = jest.fn();
          const E = function ({ children }) {
            delay(20, () => {
              children();
            });
          };

          run(<E><B /></E>);
          await delay(30);

          expect(B).toBeCalledTimes(1);
        });
      });
      describe('and run the children manually within a generator', () => {
        it('should run the children', async () => {
          const B = function B() {};
          const C = function C() {};
          const E = function * ({ children }) {

            children();
            yield <B />;
          };

          await run(<E><C /></E>);

          exerciseTree(processor, `
            E(1)
            C(1)
            B(1)
          `);
        });
      });
      describe('and run the children manually within a sync function', () => {
        it('should run the children at the time of children() call', () => {
          const B = function B() {};
          const C = function C() {};
          const E = function ({ children }) {
            children();
            return <B />;
          };

          run(<E><C /></E>);

          exerciseTree(processor, `
            E(1)
            C(1)
            B(1)
          `);
        });
      });
    });
    describe('and we have a multiple nested children', () => {
      it('should run the child too', () => {
        const B = jest.fn().mockImplementation(({ children }) => children);
        const C = jest.fn().mockImplementation(() => 'foo');
        const E = ({ children }) => children;

        expect(run(
          <E>
            <B />
            <B>
              <C />
              <C />
            </B>
          </E>
        )).toStrictEqual([
          undefined,
          [ 'foo', 'foo' ]
        ]);
        expect(B).toBeCalledTimes(2);
        expect(C).toBeCalledTimes(2);
      });
    });
    describe('and we have a generator as a result', () => {
      describe('and we yield an ActML element', () => {
        it('should run it', async () => {
          const C = () => 42;
          const D = ({ children }) => children;
          const E = jest.fn().mockImplementation(({ a }) => a * 2);

          const B = function * () {
            const v = yield <C />;
            const result = yield <D><E a={ v }/></D>;

            return result * 2;
          };

          expect(await run(<B />)).toEqual(168);
          expect(E).toBeCalledWith(expect.objectContaining({ a: 42 }));
        });
      });
      describe('and we return another ActML element', () => {
        it('should run it', async () => {
          const C = jest.fn().mockImplementation(({ children }) => children);
          const D = jest.fn().mockImplementation(() => 42);
          const B = function * () {
            return <C><D /></C>;
          };

          expect(await run(<B />)).toBe(42);
          expect(C).toBeCalledTimes(1);
          expect(D).toBeCalledTimes(1);
        });
      });
    });
  });
  describe('when representing a function as an ActML element', () => {
    it('should create new ActML', async () => {
      const B = () => {};
      const el1 = <B />;
      const el2 = <B />;

      expect(el1).not.toEqual(el2);
    });
    it('should re-run same elements if the tree is not changed', async () => {
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
            <B key={ i }/>
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
              <B key={ i }/>
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
      const C = jest.fn().mockImplementation(() => {
        const element = useElement();

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
      const B = () => delay(30, spyB);
      const C = () => delay(10, spyC);
      const D = () => delay(20, spyD);
      const F = function F({ children }) { return children; };

      await run(
        <F>
          <B />
          <C />
          <D />
        </F>
      );
      await delay(40);

      expect(value).toStrictEqual(['B', 'C', 'D']);
    });
  });
  describe('and we have a generator as a result', () => {
    describe('and we yield an ActML element', () => {
      it('should run it', async () => {
        const C = () => 42;
        const D = ({ children }) => children;
        const E = jest.fn().mockImplementation(({ v }) => v * 2);
        const B = function * () {
          const v = yield <C />;
          const result = yield <D><E v={ v } /></D>;

          return result * 2;
        };

        expect(await run(<B />)).toEqual(168);
        expect(E).toBeCalledTimes(1);
      });
    });
    describe('and we return another ActML element', () => {
      it('should run it', async () => {
        const C = jest.fn().mockImplementation(({ children }) => children);
        const D = jest.fn().mockImplementation(() => 42);
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
      (values) => ({ children }) => {
        values.push('a');
        return children;
      }
    ],
    [
      'promise',
      (values) => ({ children }) => {
        return new Promise(done => {
          setTimeout(() => (values.push('a'), done(), children()), 20);
        });
      }
    ],
    [
      'generator',
      (values) => {
        const D = () => delay(20, () => values.push('a'));
        const E = function * ({ children }) {
          yield <D />;
          children();
        };

        return E;
      }
    ],
    [
      'another ActML element containing the children',
      (values) => {
        const D = ({ children }) => delay(20, () => (values.push('a'), children));
        const E = function ({ children }) {
          return <D>{ children }</D>;
        };

        return E;
      }
    ]
  ])('when running a %s', (_, createElement) => {
    it('should always run the element and its children', async () => {
      const values = [];
      const C = jest.fn().mockImplementation(() => values.push('b'));
      const E = createElement(values);

      await run(<E><C /></E>);

      expect(values).toStrictEqual(['a', 'b']);
    });
  });
  describe('when we use the tree\'s lifecycle callbacks', () => {
    it('should call in and out callbacks', async () => {
      const E = () => {
        return <B><C /></B>;
      };
      const B = ({ children }) => children;
      const C = () => {};
      const calls = [];
      const inCallback = node => calls.push(`<${ node.element.name }>`);
      const out = node => calls.push(`</${ node.element.name }>`);

      processor.onNodeIn(inCallback);
      processor.onNodeOut(out);

      await run(<E />);

      expect(calls).toStrictEqual(['<E>', '<B>', '<C>', '</C>', '</B>', '</E>']);
    });
    it('should call the destroy callback when a node gets replaced', async () => {
      let i = 0;
      const B = () => {};
      const C = () => {};
      const E = () => {
        i += 1;
        return (
          <Fragment>
            { i === 1 ? <B /> : <C /> }
          </Fragment>
        );
      };
      const el = <E />;
      const destroyCallback = jest.fn();

      processor.onNodeRemove(destroyCallback);

      await run(el);
      await run(el);

      expect(destroyCallback).toBeCalledWith(
        expect.objectContaining({ element: expect.objectContaining({ name: 'B' })}
      ));
    });
    it('should call the destroy callback when a node gets flushed out', async () => {
      let i = 0;
      const B = () => {};
      const C = () => {};
      const D = () => {};
      const E = () => {
        i += 1;
        if (i === 1) {
          return (
            <Fragment>
              <B />
              <C />
              <D />
            </Fragment>
          );
        }
        return (
          <Fragment>
            <B />
          </Fragment>
        );
      };
      const el = <E />;
      const destroyCallback = jest.fn();

      processor.onNodeRemove(destroyCallback);

      await run(el);
      await run(el);

      expect(destroyCallback).toBeCalledTimes(2);
      expect(destroyCallback).toBeCalledWith(
        expect.objectContaining({ element: expect.objectContaining({ name: 'C' })}
      ));
      expect(destroyCallback).toBeCalledWith(
        expect.objectContaining({ element: expect.objectContaining({ name: 'D' })}
      ));
    });
  });
  describe('when using a context', () => {
    it('should allow to consume data from the context', async () => {
      const Context = createContext();
      const { Provider, Consumer } = Context;
      const mock = jest.fn();
      const F = () => {
        return (
          <Consumer>
            { mock }
          </Consumer>
        );
      };

      run(
        <Provider value='foo'>
          <F />
        </Provider>
      );

      expect(mock).toBeCalledWith('foo');
    });
    it('should throw an error if there is no provider and should return the intial value', async () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const mock = jest.fn();
      const Context = createContext('boo');
      const { Consumer } = Context;
      const B = ({ children }) => children;
      const F = () => {
        return (
          <Consumer>
            { mock }
          </Consumer>
        );
      };

      run(<B><F /></B>);
      expect(spy).toBeCalledWith(`A context consumer is used with no provider.
  Stack:
    <Consumer>
    <F>
    <B>`);
      expect(mock).toBeCalledWith('boo');
      spy.mockRestore();
    });
  });
});
