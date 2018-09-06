/** @jsx D */
import { D, speak } from '..';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the Dactory library', () => {
  describe('when running a simple function', () => {
    it('should run the function as it is a jsx syntax', async () => {
      const Func = jest.fn();

      await speak(Func);

      expect(Func).toBeCalled();
    });
    it('should run the function and its children as it is a jsx syntax', async () => {
      const A = jest.fn();
      const B = jest.fn();
      const Func = function () {
        return <D><A /><B /></D>;
      };

      await speak(Func);

      expect(A).toBeCalled();
      expect(B).toBeCalled();
    });
  });
  describe('when running a jsx function', () => {
    it('should execute the function with the given params', async () => {
      const Func = jest.fn();
      const Word = <Func foo={ 10 }/>;
      await speak(Word);

      expect(Func).toBeCalledWith({ foo: 10 });
    });
    it(`should execute the function with the given merged params
        return the result even if we use it as a tag`, async () => {
      const Func = jest.fn();
      const Word = <Func foo={ 10 }/>;
      await speak(<Word bar={ 20 }/>);

      expect(Func).toBeCalledWith({ foo: 10, bar: 20 });
    });
    it(`work continue processing dialects if we return such as a result`, async () => {
      const Bar = jest.fn();
      const Foo = jest.fn().mockImplementation(() => {
        return <Bar answer />;
      });
      const App = () => 42;

      await speak(
        <App exports='answer'>
          <Foo />
        </App>
      );

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalledWith({ answer: 42 });
    });
  });
  describe('when having nested functions', () => {
    it('should run the functions on every level', async () => {
      const Foo = jest.fn();
      const Bar = jest.fn();
      const Zar = jest.fn();
      const language = <Foo><Bar><Zar /></Bar></Foo>;
      await speak(language);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalled();
      expect(Zar).toBeCalled();
    });
    it('should run the siblings', async () => {
      const Foo = jest.fn();
      const Bar = jest.fn();
      const Zar = jest.fn();
      const language = <Foo><Bar /><Zar /></Foo>;

      await speak(language);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalled();
      expect(Zar).toBeCalled();
    });
  });
  describe('when using asynchronous functions', () => {
    it('should wait till the promise is resolved', async () => {
      let result = 0;
      const Foo = async function() { result = 42; };
      await speak(<Foo />);

      expect(result).toBe(42);
    });
    describe('and we have nested functions', () => {
      it('should wait till the promise is resolved before running the other nested functions', async () => {
        var x = 0;
        var total = 0;
        const Foo = async function() { x = 42; };
        const Bar = ({ answer }) => total = answer() * 2;

        await speak(<Foo><Bar answer={ () => x } /></Foo>);

        expect(total).toBe(84);
      });
      it('should handle multiple async children', async () => {
        const flow = [];
        const Logic = function () {}
        const A = async () => new Promise(done => setTimeout(() => {
          flow.push('a'); done();
        }, 10));
        const B = async function() { flow.push('b'); }
        const C = async () => new Promise(done => setTimeout(() => {
          flow.push('c'); done();
        }, 30));
        
        await speak(<Logic><A /><B /><C /></Logic>);

        expect(flow).toEqual(['a', 'b', 'c']);
      });
    });
  });
  describe('when using the context', () => {
    it('should pass variables between siblings', async () => {
      const print = jest.fn();
      const GetToken = async () => fakeAsync('XXX', 50);
      const UseToken = ({ token }) => print(token);
      const App = () => {};

      await speak(
        <App>
          <GetToken exports='token' />
          <UseToken token />
        </App>
      );
      expect(print).toBeCalledWith('XXX');
    });
    it('should return the context as a result of the async `speak` command', async () => {
      const GetAnswer = async () => fakeAsync(21, 20);
      const Calc = ({ answer }) => fakeAsync(answer * 2, 30);
      const App = () => {};
      const { result } = await speak(
        <App>
          <GetAnswer exports='answer' />
          <Calc answer exports='result' />
        </App>
      );

      expect(result).toBe(42);
    });
  });
  describe('when there is an error', () => {
    it('should fire the onError handler with the given error', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const App = function() {};
      const spy = jest.fn();
      const HandleError = ({ error }) => spy(error.message);
      
      await speak(
        <App>
          <Problem onError={ <HandleError /> } />
        </App>
      );
      expect(spy).toBeCalledWith('iDontExist is not defined');
    });
    it('should fire the onError handler with the same context', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const spy = jest.fn();
      const App = function() { return 42 };
      const HandleError = ({ answer }) => spy(answer);
      
      await speak(
        <App exports='answer'>
          <Problem onError={ <HandleError answer /> } />
        </App>
      );
      expect(spy).toBeCalledWith(42);
    });
    it('should stop the current execution (by default)', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const App = function() {};
      const HandleError = jest.fn();
      const AfterError = jest.fn();
      
      await speak(
        <App exports='answer'>
          <Problem onError={ <HandleError /> } />
          <AfterError />
        </App>
      );
      expect(HandleError).toBeCalled();
      expect(AfterError).not.toBeCalled();
    });
    it('should continue the current execution if the error handler returns `true`', async () => {
      const Problem = function() {
        return iDontExist; // throws an error "iDontExist is not defined"
      };
      const App = function() {};
      const HandleError = jest.fn().mockImplementation(() => true);
      const AfterError = jest.fn();
      
      await speak(
        <App exports='answer'>
          <Problem onError={ <HandleError /> } />
          <AfterError />
        </App>
      );
      expect(HandleError).toBeCalled();
      expect(AfterError).toBeCalled();
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
      
      await speak(
        <App exports='answer'>
          <Wrapper>
            <Problem onError={ <HandleErrorA><Dummy exports='answer' /></ HandleErrorA> } />
            <AfterErrorA />
          </Wrapper>
          <Wrapper>
            <B />
            <C answer/>
          </Wrapper>
        </App>
      );
      expect(HandleErrorA).toBeCalled();
      expect(AfterErrorA).not.toBeCalled();
      expect(B).toBeCalled();
      expect(C).toBeCalledWith({ answer: 42 });
    });
  });
  describe('when we have the FACC pattern', () => {
    it(`- should run the FACC with the return as a param
        - should continue processing the dialect returned by the FACC`, async () => {
      const A = jest.fn();
      const B = jest.fn();
      const Logic = async () => fakeAsync(false, 20);
      const App = () => {};
      await speak(
        <App>
          <Logic>
            {
              status => status ? <A /> : <B />
            }
          </Logic>
        </App>
      );

      expect(A).not.toBeCalled();
      expect(B).toBeCalled();
    });
  });
  describe('when working with the lifecyle methods', () => {
    it(`should run
        - before
        - after
        - shouldProcessResult
        - shouldProcessChildren`, async () => {
      const before = jest.fn();
      const after = jest.fn();
      const shouldProcessResult = jest.fn();
      const shouldProcessChildren = jest.fn();
      const Func = jest.fn().mockImplementation(() => 'result');

      Func.before = before;
      Func.after = after;
      Func.shouldProcessResult = shouldProcessResult;
      Func.shouldProcessChildren = shouldProcessChildren;

      await speak(<Func foo='bar' />);

      expect(before).toBeCalledWith({ foo: 'bar' });
      expect(after).toBeCalledWith({ foo: 'bar' }, 'result');
      expect(shouldProcessResult).toBeCalledWith({ foo: 'bar' }, 'result');
      expect(shouldProcessChildren).toBeCalledWith({ foo: 'bar' }, 'result');
    });
    it('should consider all the lifecycle hooks async functions', async () => {
      const temp = [];
      const before = () => new Promise((done) => {
        setTimeout(() => {
          temp.push('before');
          done();
        }, 20);
      });
      const after = () => new Promise((done) => {
        setTimeout(() => {
          temp.push('after');
          done();
        }, 20);
      });
      const shouldProcessResult = () => new Promise((done) => {
        setTimeout(() => {
          temp.push('shouldProcessResult');
          done(true);
        }, 20);
      });
      const shouldProcessChildren = () => new Promise((done) => {
        setTimeout(() => {
          temp.push('shouldProcessChildren');
          done(true);
        }, 20);
      });
      const Func = jest.fn().mockImplementation(() => <Foo />);
      const Foo = jest.fn().mockImplementation(() => temp.push('Foo'));
      const Bar = jest.fn().mockImplementation(() => temp.push('Bar'));

      Func.before = before;
      Func.after = after;
      Func.shouldProcessResult = shouldProcessResult;
      Func.shouldProcessChildren = shouldProcessChildren;

      await speak(<Func><Bar /></Func>);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalled();
      expect(temp).toEqual([
        'before',
        'after',
        'shouldProcessResult',
        'Foo',
        'shouldProcessChildren',
        'Bar'
      ]);
    });
    describe('and when `shouldProcessResult` returns `false`', () => {
      it('should not process the result', async () => {
        const A = jest.fn();
        const Func = function() {
          return <A />;
        }
        Func.shouldProcessResult = () => false;

        await speak(Func);

        expect(A).not.toBeCalled();
      });
    });
    describe('and when `shouldProcessChildren` returns `false`', () => {
      it('should not process the children', async () => {
        const A = jest.fn();
        const Func = jest.fn();
        Func.shouldProcessChildren = () => false;

        await speak(<D><Func><A /></Func></D>);

        expect(A).not.toBeCalled();
      });
    });
  });
});