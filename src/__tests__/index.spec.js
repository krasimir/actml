/** @jsx A */
import { A, run, Parallel, pipeline } from '..';
import Element from '../Element';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the ActML library', () => {
  describe('when running a simple function', () => {
    it('should run the function as it is a jsx syntax', async () => {
      const Func = jest.fn();

      await run(Func);

      expect(Func).toBeCalled();
    });
    it('should return the result of the function', async () => {
      const Func = jest.fn().mockImplementation(() => 'foo');

      const result = await run(Func);

      expect(result).toBe('foo');
    });
    it('should return the result of the function even if it is async', async () => {
      const Func = jest.fn().mockImplementation(() => fakeAsync('foo', 30));

      const result = await run(Func);

      expect(result).toBe('foo');
    });
    it('should run the function and its children as it is a jsx syntax', async () => {
      const Z = jest.fn();
      const B = jest.fn();
      const Func = function () {
        return <A><Z /><B /></A>;
      };

      await run(Func);

      expect(Z).toBeCalled();
      expect(B).toBeCalled();
    });
  });
  describe('when running a jsx function', () => {
    it('should execute the function with the given params', async () => {
      const Func = jest.fn();
      const Z = <Func foo={ 10 }/>;

      await run(Z);

      expect(Func).toBeCalledWith({ foo: 10 });
    });
    it(`- should execute the function with the given merged params
        - return the result even if we use it as a tag`, async () => {
      const Func = jest.fn();
      const Z = <Func foo={ 10 }/>;
      await run(<Z bar={ 20 }/>);

      expect(Func).toBeCalledWith({ foo: 10, bar: 20 });
    });
    it(`should continue processing elements if we return such as a result`, async () => {
      const Bar = jest.fn();
      const Foo = jest.fn().mockImplementation(() => {
        return <Bar $answer />;
      });
      const App = () => 42;

      await run(
        <App exports='answer'>
          <Foo />
        </App>
      );

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalledWith({ answer: 42 });
    });
  });
  describe('when using the wrapper <A />', () => {
    it('should work just fine :)', async () => {
      const F = jest.fn().mockImplementation(() => 42);
      const M = jest.fn();

      const result = await run(<A><F exports='answer'><M $answer /></F></A>);

      expect(F).toBeCalled();
      expect(M).toBeCalledWith({ answer: 42 });
    });
    it('should should scope everything by default', async () => {
      const F = jest.fn().mockImplementation(() => 42);
      const M = jest.fn();

      const result = await run(
        <A>
          <F exports='foo' />
          <F exports='bar' />
          <A>
            <A>
              <M $foo $bar />
            </A>
          </A>
        </A>
      );

      expect(M).toBeCalledWith({ foo: 42, bar: 42 });
    });
  });
  describe('when having nested functions', () => {
    it('should run the functions on every level', async () => {
      const Foo = jest.fn();
      const Bar = jest.fn();
      const Zar = jest.fn();
      const language = <Foo><Bar><Zar /></Bar></Foo>;
      await run(language);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalled();
      expect(Zar).toBeCalled();
    });
    it('should run the siblings', async () => {
      const Foo = jest.fn();
      const Bar = jest.fn();
      const Zar = jest.fn();
      const language = <Foo><Bar /><Zar /></Foo>;

      await run(language);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalled();
      expect(Zar).toBeCalled();
    });
  });
  describe('when using asynchronous functions', () => {
    it('should wait till the promise is resolved', async () => {
      let result = 0;
      const Foo = async function() { result = 42; };
      await run(<Foo />);

      expect(result).toBe(42);
    });
    describe('and we have nested functions', () => {
      it('should wait till the promise is resolved before running the other nested functions', async () => {
        var x = 0;
        var total = 0;
        const Foo = async function() { x = 42; };
        const Bar = ({ answer }) => total = answer() * 2;

        await run(<Foo><Bar answer={ () => x } /></Foo>);

        expect(total).toBe(84);
      });
      it('should handle multiple async children', async () => {
        const flow = [];
        const Logic = function () {}
        const Z = async () => new Promise(done => setTimeout(() => {
          flow.push('a'); done();
        }, 10));
        const B = async function() { flow.push('b'); }
        const C = async () => new Promise(done => setTimeout(() => {
          flow.push('c'); done();
        }, 30));
        
        await run(<Logic><Z /><B /><C /></Logic>);

        expect(flow).toEqual(['a', 'b', 'c']);
      });
    });
  });
  describe('when there is an error', () => {
    it('should swallow the error and stop the execution by default', async () => {
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
      expect(B).not.toBeCalled();
      expect(Handler).toBeCalled();
    });
    it('should continue processing if the error handler returns `true`', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const App = function() {};
      const HandleError = jest.fn().mockImplementation(() => true);
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
    it('should stop the current execution (by default) only in the current children branch', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const App = function() {};
      const Wrapper = function() {};
      const Dummy = () => 42;
      const HandleErrorA = jest.fn();
      const AfterErrorA = jest.fn();
      const B = jest.fn();
      const C = jest.fn();
      
      await run(
        <App exports='answer'>
          <Wrapper>
            <Problem onError={ <HandleErrorA><Dummy exports='answer' /></ HandleErrorA> } />
            <AfterErrorA />
          </Wrapper>
          <Wrapper>
            <B />
            <C/>
          </Wrapper>
        </App>
      );
      expect(HandleErrorA).toBeCalled();
      expect(AfterErrorA).not.toBeCalled();
      expect(B).toBeCalled();
      expect(C).toBeCalled();
    });
  });
  describe('when we have the FACC pattern', () => {
    it(`- should run the FACC with the return as a param
        - should continue processing the dialect returned by the FACC`, async () => {
      const Z = jest.fn();
      const B = jest.fn();
      const C = () => 'bar';
      const Logic = async () => fakeAsync({ status: false, answer: 42 }, 20);

      await run(
        <A>
          <C exports='foo' />
          <Logic>
            {
              ({ status, answer }) => {
                return status ? <Z /> : <B answer={ answer } $foo/>
              }
            }
          </Logic>
        </A>
      );

      expect(Z).not.toBeCalled();
      expect(B).toBeCalledWith({ answer: 42, foo: 'bar' });
    });
  });
  describe('when working with the pipeline', () => {
    it.only(`- should be possible to process the children many times
        - and pass data to them`, async () => {
      const store = {
        subscribe(callback) {
          setTimeout(callback, 20);
        }
      }
      const Func = async function () {
        // await this.pipeline('children', 'foo');
        store.subscribe(async () => {
          // await this.pipeline('children', 'bar');
          // await this.pipeline('children');
        });
      }
      Func.middlewares = [
        { func: pipeline.middlewares.execute, enabled: true },
        { func: pipeline.middlewares.processChildren, enabled: false }
      ];
      const Z = jest.fn();
      const B = jest.fn();

      await run(
        <A>
          <Func>
            {
              data => (
                <A>
                  <Z data={ data }/>
                  <B data={ data }/>
                </A>
              )
            }
          </Func>
        </A>
      );
      await new Promise(done => setTimeout(done, 30));

      expect(Z).toHaveBeenCalledTimes(3);
      expect(B).toHaveBeenCalledTimes(3);
      expect(Z).toBeCalledWith({ data: 'foo' });
      expect(B).toBeCalledWith({ data: 'foo' });
      expect(Z).toBeCalledWith({ data: 'bar' });
      expect(B).toBeCalledWith({ data: 'bar' });
      expect(Z).toBeCalledWith({ data: undefined });
      expect(B).toBeCalledWith({ data: undefined });
    });
  });
  describe('when we want control the logic flow', () => {
    describe('and we want to stop the current branch', () => {
      it('should stop the current branch if there is a Element.errors.STOP_PROCESSING thrown', async () => {
        const App = () => {}
        const Z = jest.fn();
        const B = jest.fn().mockImplementation(() => {
          throw new Error(Element.errors.STOP_PROCESSING);
        });
        const C = jest.fn();

        await run(
          <App>
            <Z />
            <B />
            <C />
          </App>
        );

        expect(Z).toBeCalled();
        expect(B).toBeCalled();
        expect(C).not.toBeCalled();
      });
    });
    describe('and we want to prevent the children processing', () => {
      it('should stop the children processing using the pipeline', async () => {
        const App = () => {}
        const Z = jest.fn();
        const B = jest.fn().mockImplementation(function (props) {
          if (!props || props.flag !== true) {
            this.pipeline.disable('children');
          }
        });
        const C = jest.fn();
        const E = jest.fn();
        const F = jest.fn();

        await run(
          <App>
            <Z />
            <B>
              <C />
            </B>
            <B>
              {
                () => E()
              }
            </B>
            <B flag>
              <F />
            </B>
          </App>
        );

        expect(Z).toBeCalled();
        expect(B).toHaveBeenCalledTimes(3);
        expect(C).not.toBeCalled();
        expect(E).not.toBeCalled();
        expect(F).toBeCalled();
      });
    });
  });
  describe('when the word is a generator', () => {
    it('should process the `yield`ed statements as words', async () => {
      const Z = jest.fn();
      const B = jest.fn().mockImplementation(() => fakeAsync(42, 10));
      const C = jest.fn().mockImplementation(answer => `the answer is ${ answer }`);
      const E = jest.fn().mockImplementation(function({ message, answer }) {
        return { message, answer, contextData: this.context };
      });
      const Func = function *() {
        yield <Z foo='bar' />;
        const answer = yield <B bar='foo' exports='answer' />;
        const message = yield C(answer);
        return <E $answer message={ message } />;
      }

      await run(<A><Func /></A>);

      expect(Z).toBeCalledWith({ foo: 'bar' });
      expect(B).toBeCalledWith({ bar: 'foo', exports: 'answer' });
      expect(C).toBeCalledWith(42);
      expect(E).toBeCalledWith({ answer: 42, message: 'the answer is 42' });
    });
  });
});