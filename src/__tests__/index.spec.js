/** @jsx dialectica */
import dialectica from '../';

describe('Given the Dialectica library', () => {
  describe('when running a simple dialect function', () => {
    it('should execute the function with the given params', () => {
      const Func = jest.fn();
      const dialect = <Func foo='bar'/>;

      dialectica.speak(dialect);

      expect(Func).toBeCalledWith({ foo: 'bar' });
    });
  });
  describe('when using the FACC pattern', () => {
    it('should pass the result of our function to the FACC function', done => {
      const Func = ({ a, b, c }) => a + b + c;
      const Dialect = (
        <Func c={ 5 }>
          {
            total => {
              expect(total).toBe(35);
              done();
            }
          }
        </Func>
      );

      dialectica.speak(<Dialect a={ 10 } b={ 20 }/>);
    });
    describe('and we have a nesting of dialects', () => {
      it('should continue speaking the dialect', () => {
        const Func = ({ a, b, c }) => a + b + c;
        const Mult = ({ a }) => a * 10;
        const Dialect = (
          <Func c={ 5 }>
            {
              total => <Mult a={ total } />
            }
          </Func>
        );

        expect(dialectica.speak(<Dialect a={ 10 } b={ 20 }/>)).toBe(350);
      });
    })
  });
});