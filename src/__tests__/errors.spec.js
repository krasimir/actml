/** @jsx A */
import { A, run } from '..';

describe('Given the ActML library', () => {
  describe('when there is an error', () => {
    it('should swallow the error by default', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const Z = jest.fn();
      const B = jest.fn();
      const Handler = jest.fn();

      await run(
        <A>
          <Z />
          <Problem onError={ <Handler /> }/>
          <B />
        </A>
      );

      expect(Z).toBeCalled();
      expect(B).toBeCalled();
      expect(Handler).toBeCalled();
    });
    it('should continue processing the siblings', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const App = function() {};
      const HandleError = jest.fn();
      const AfterError = jest.fn();
      
      await run(
        <App exports='answer'>
          <Problem onError={ <HandleError /> } />
          <AfterError />
        </App>
      );
      expect(HandleError).toBeCalled();
      expect(AfterError).toBeCalled();
    });
    it('should fire the onError handler with the given error', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const App = function() {};
      const spy = jest.fn();
      const HandleError = ({ error }) => (spy(error.message), false);
      
      await run(
        <App>
          <Problem onError={ <HandleError /> } />
        </App>
      );
      expect(spy).toBeCalledWith('iDontExist is not defined');
    });
    it('should allow the handler to access scoped variables', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const spy = jest.fn();
      const App = function() { return 42 };
      const HandleError = ({ answer }) => (spy(answer), false);
      
      await run(
        <App exports='answer'>
          <Problem onError={ <HandleError $answer /> } />
        </App>
      );
      expect(spy).toBeCalledWith(42);
    });
    it('should continue the execution if the error is handled', async () => {
      const Problem = () => iDontExist();
      const CatchError = () => {};
      const Foo = function*() {
        return 'foo';
      };
      const Bar = function*() {
        return (
          <Problem onError={<CatchError />}>
            <Foo exports="foo" />
          </Problem>
        );
      };
      const result = await run(<A><Bar /></A>);

      expect(result.foo).toEqual('foo');
    });
    it('should handle the error of the children', async () => {
      const Problem = function * () {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      function * WithProblem() {
        return (
          <A>
            <Problem />
          </A>
        )
      }
      function Wrapper() {
        return <A><WithProblem /></A>;
      }
      const Z = jest.fn();
      const B = jest.fn();
      const Handler = jest.fn();

      await run(
        <A onError={ <Handler /> }>
          <Z />
          <Wrapper />
          <B />
        </A>
      );

      expect(Z).toBeCalled();
      expect(B).toBeCalled();
      expect(Handler).toBeCalled();
    });
  });
});