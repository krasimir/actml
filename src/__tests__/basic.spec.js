/** @jsx A */

import { A, run } from '../';

describe('Given the ActML library', () => {
  describe('when representing a function as an ActML element', () => {
    it('should run the function and return its result', () => {
      const spy = jest.fn();
      const X = function ({ foo }) {
        spy(foo);
        return foo + 5;
      };

      const result = run(<X foo={ 10 } />);

      expect(spy).toBeCalledWith(10);
      expect(result).toEqual(15);
    });
    describe('and the function returns a promise', () => {
      it('should run the function and receive the promise', async () => {
        const spy = jest.fn();
        const X = function ({ foo }) {
          spy(foo);
          return Promise.resolve(foo + 5);
        };

        const result = await run(<X foo={ 10 } />);

        expect(spy).toBeCalledWith(10);
        expect(result).toEqual(15);
      });
    });
    describe('and the function returns another ActML element', () => {
      it('should run the element too and return its result', () => {
        const Y = function ({ foo, by }) {
          return foo * by;
        };
        const X = function (props) {
          return <Y {...props} by={ 3 }/>;
        };

        const result = run(<X foo={ 10 } />);

        expect(result).toEqual(30);
      });
    });
  });
});
