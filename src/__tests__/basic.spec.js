/** @jsx A */
import { A, run } from '..';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the ActML library', () => {
  describe('when using a function', () => {
    it.only('should return the result of the function', async () => {
      const Func = jest.fn().mockImplementation(() => 'foo');

      const result = await run(<Func />);

      expect(result).toBe('foo');
    });
    it('should execute the function with the given params', async () => {
      const Func = jest.fn();
      const Z = <Func foo={ 10 }/>;

      await run(Z);

      expect(Func).toBeCalledWith(expect.objectContaining({ foo: 10 }));
    });
    it('should continue processing elements if we return such as a result', async () => {
      const Z = () => 'foo';
      const Foo = () => <Z />;
      const Bar = () => <Foo />;

      const result = await run(<Bar />);

      expect(result).toEqual('foo');
    });
  });
  describe('when using an asynchronous functions', () => {
    it('should wait till the promise is resolved', async () => {
      const Func = () => fakeAsync('foo', 42);

      const answer = await run(<Func />);

      expect(answer).toBe('foo');
    });
    it('should handle an async function as a result', async () => {
      const Bar = async function () { return 42; };
      const Foo = async function () { return <Bar />; };

      expect(await run(<Foo />)).toBe(42);
    });
  });
  describe('when using a generator', () => {
    it('should process the `yield`ed statements as ActML elements', async () => {
      const B = jest.fn();
      const C = jest.fn();
      const Func = function * ({ answer }) {
        yield <B answer={ answer } />;
        yield <C answer={ answer * 2 } />;
        return answer * 3;
      };

      const result = await run(<Func answer={ 42 }/>);

      expect(B).toBeCalledWith(expect.objectContaining({ answer: 42 }));
      expect(C).toBeCalledWith(expect.objectContaining({ answer: 84 }));
      expect(result).toBe(126);
    });
    it('should work if we pass a generator as a result', async () => {
      const Z = function * () { return 42; };
      const B = function * () { return yield <Z />; };
      const C = function * () { return <B />; };

      const result = await run(<C />);

      expect(result).toBe(42);
    });
  });
});
