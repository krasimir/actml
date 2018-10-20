/** @jsx A */
import { A, run, Processor } from '..';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the ActML library', () => {
  describe('when running a simple function', () => {
    it('should return the result of the function', async () => {
      const Func = jest.fn().mockImplementation(() => 'foo');

      const result = await run(<Func />);

      expect(result).toBe('foo');
    });
    it('should run the function and its children', async () => {
      const Z = jest.fn();
      const B = jest.fn();
      const Func = function () {
        return <A><Z /><B /></A>;
      };

      await run(<Func />);

      expect(Z).toBeCalled();
      expect(B).toBeCalled();
    });
    it('should execute the function with the given params', async () => {
      const Func = jest.fn();
      const Z = <Func foo={ 10 }/>;

      await run(Z);

      expect(Func).toBeCalledWith(expect.objectContaining({ foo: 10 }));
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
      expect(Bar).toBeCalledWith(expect.objectContaining({ answer: 42 }));
    });
    it('should get the result of the returned element as a result of the currently executed element', async () => {
      const Z = () => 'foo';
      const Foo = () => <Z />;
      const Bar = () => <Foo />;

      const result = await run(<A><Bar exports='bar'/></A>);

      expect(result.bar).toEqual('foo');
    });
    it('should return the result of the function even if it is async', async () => {
      const Func = () => fakeAsync('foo', 42);

      const { answer } = await run(<A><Func exports='answer'/></A>);

      expect(answer).toBe('foo');
    });
  });
  describe('when using the wrapper <A />', () => {
    it('should work just fine :)', async () => {
      const F = jest.fn().mockImplementation(() => 42);
      const M = jest.fn();

      const result = await run(<A><F exports='answer'><M $answer /></F></A>);

      expect(F).toBeCalled();
      expect(M).toBeCalledWith(expect.objectContaining({ answer: 42 }));
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

      expect(M).toBeCalledWith(expect.objectContaining({ foo: 42, bar: 42 }));
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
        const Foo = async function() { return 42; };
        const Bar = ({ answer }) => (total = answer * 2);

        await run(<Foo exports='answer'><Bar $answer /></Foo>);

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
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const Z = jest.fn();
      const B = jest.fn();
      const Handler = jest.fn();

      await run(
        <A onError={ <Handler /> }>
          <Z />
          <Problem/>
          <B />
        </A>
      );

      expect(Z).toBeCalled();
      expect(B).toBeCalled();
      expect(Handler).toBeCalled();
    });
  });
  describe('when we work with the children prop', () => {
    it('should provide an access to the passed child', async () => {
      const Z = jest.fn();
      const Logic = function({ children }) {
        return <Z answer={ children.answer } />;
      }

      await run(<Logic>{{ answer: 20 }}</Logic>);

      expect(Z).toBeCalledWith(expect.objectContaining({ answer: 20 }));
    });
    it('should provide an access to the passed children', async () => {
      const Z = jest.fn();
      const Logic = function({ children }) {
        return <Z data={ children } />;
      }

      await run(<Logic>{ 20 }{ 30 }</Logic>);

      expect(Z).toBeCalledWith(expect.objectContaining({ data: [20, 30] }));
    });
    it('should continue processing the children as ActML', async () => {
      const Z = jest.fn();
      const Logic = function({ children }) {
        children(42);
      }

      await run(
        <Logic>
          {
            value => {
              return <Z value={ value }/>;
            }
          }
        </Logic>
      );

      expect(Z).toBeCalledWith(expect.objectContaining({ value: 42 }));
    });
    it('should still work even if we pass a generator', async () => {
      const Z = jest.fn();
      const B = () => fakeAsync(1, 20);
      const Logic = function({ children }) {
        return children(42);
      }

      const { result } = await run(
        <A>
          <Logic exports='result'>
            {
              function * (answer) {
                yield <Z answer={ answer } />;
                yield <B />;
                return 'foo';
              }
            }
          </Logic>
        </A>
      );

      expect(Z).toBeCalledWith(expect.objectContaining({ answer: 42 }));
      expect(result).toBe('foo')
    });
    it('should not process the children if some of them is not ActML element', async () => {
      const Z = jest.fn();
      const Logic = async function() {}

      await run(
        <Logic value={ false }>
          (<Z />)
        </Logic>
      );

      expect(Z).not.toBeCalled();
    });
    it('should allow us to process the children many times when they are ActML elements', async () => {
      const Logic = async function ({ children }) {
        await children(42);
        await children(100);
      }
      const Z = jest.fn();
      const ZWrapper = function ZWrapper({ answer }) {
        return <Z answer={ answer }/>
      }
      const B = jest.fn();
      const C = jest.fn();

      await run(
        <Logic exports='answer'>(
          <ZWrapper $answer/>
          <B $answer><C $answer/></B>
        )</Logic>
      );

      expect(Z).toBeCalledTimes(2);
      expect(B).toBeCalledTimes(2);
      expect(C).toBeCalledTimes(2);
      expect(Z).toBeCalledWith(expect.objectContaining({ answer: 42 }));
      expect(B).toBeCalledWith(expect.objectContaining({ answer: 42 }));
      expect(C).toBeCalledWith(expect.objectContaining({ answer: 42 }));
      expect(Z).toBeCalledWith(expect.objectContaining({ answer: 100 }));
      expect(B).toBeCalledWith(expect.objectContaining({ answer: 100 }));
      expect(C).toBeCalledWith(expect.objectContaining({ answer: 100 }));
    });
    it('should keep the context in the FACC', async () => {
      const Z = jest.fn();
      const Logic = async function({ children }) {
        await children(42);
      }
      const context = {
        myService: ({ value }) => value * 2
      }

      await run(
        <Logic>
          {
            value => {
              return <myService value={value} exports='answer'><Z $answer/></myService>;
            }
          }
        </Logic>,
        context
      );

      expect(Z).toBeCalledWith(expect.objectContaining({ answer: 84 }));
    });
  });
  describe('when we want to control the processing of the children', () => {
    it(`- should be possible to process the children many times
        - and pass data to them`, async () => {
      const store = {
        subscribe(callback) {
          setTimeout(callback, 20);
        }
      }
      const Func = async function ({ children }) {
        await children('foo');
        store.subscribe(async () => {
          await children('bar');
          await children();
        });
      }

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
      expect(Z).toBeCalledWith(expect.objectContaining({ data: 'foo' }));
      expect(B).toBeCalledWith(expect.objectContaining({ data: 'foo' }));
      expect(Z).toBeCalledWith(expect.objectContaining({ data: 'bar' }));
      expect(B).toBeCalledWith(expect.objectContaining({ data: 'bar' }));
      expect(Z).toBeCalledWith(expect.objectContaining({ data: undefined }));
      expect(B).toBeCalledWith(expect.objectContaining({ data: undefined }));
    });
  });
  describe('when the function is a generator', () => {
    it('should process the `yield`ed statements as elements', async () => {
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

      expect(Z).toBeCalledWith(expect.objectContaining({ foo: 'bar' }));
      expect(B).toBeCalledWith(expect.objectContaining(({ bar: 'foo', exports: 'answer' })));
      expect(C).toBeCalledWith(42);
      expect(E).toBeCalledWith(expect.objectContaining({ answer: 42, message: 'the answer is 42' }));
    });
  });
});