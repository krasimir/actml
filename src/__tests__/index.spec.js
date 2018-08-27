/** @jsx dialect */
import { dialect, speak } from '../';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the Dialectica library', () => {
  describe('when running a simple function', () => {
    it('should execute the function with the given params and return the result', async () => {
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
  });
  describe('when having nested functions', () => {
    it('should run the functions on every level', async () => {
      const Foo = jest.fn();
      const Bar = jest.fn();
      const Zar = jest.fn();
      const language = <Foo><Bar><Zar /></Bar></Foo>;
      const result = await speak(language);

      expect(Foo).toBeCalled();
      expect(Bar).toBeCalled();
      expect(Zar).toBeCalled();
    });
    it('should run the siblings', async () => {
      const Foo = jest.fn();
      const Bar = jest.fn();
      const Zar = jest.fn();
      const language = <Foo><Bar /><Zar /></Foo>;
      const result = await speak(language);

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
      const GetToken = async () => fakeAsync('XXX', 50);
      const print = jest.fn();
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
    it('should return the context as a result of the async speak command', async () => {
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
});