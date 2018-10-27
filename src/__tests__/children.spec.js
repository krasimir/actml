/* eslint-disable max-len */
/** @jsx A */
import { A, run } from '..';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the ActML library', () => {
  describe('when passing ActML elements as children', () => {
    it('should run the function and its children', async () => {
      const Z = jest.fn();
      const B = jest.fn();
      const Func = jest.fn();

      await run(<Func><Z /><B /></Func>);

      expect(Func).toBeCalled();
      expect(Z).toBeCalled();
      expect(B).toBeCalled();
    });
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
    it('should run the children from top to bottom', async () => {
      const result = [];
      const Foo = () => result.push('foo');
      const Bar = () => result.push('bar');
      const Zar = () => result.push('zar');

      await run(<Foo><Bar /><Zar /></Foo>);

      expect(result).toStrictEqual(['foo', 'bar', 'zar']);
    });
    it('should keep the order of execution if it deals with async functions or generators', async () => {
      const result = [];
      const Foo = async () => result.push('foo');
      const Bar = async () => result.push(await fakeAsync('bar', 10));
      const Moo = function * () { result.push(yield <Bar />); }
      const Zar = async () => result.push(await fakeAsync('zar', 20));

      await run(<Foo><Bar /><Moo /><Zar /></Foo>);

      expect(result).toStrictEqual(['foo', 'bar', 'bar', 3, 'zar']);
    });
  });
  describe('when using the `children` prop', () => {
    it('should not process the children if we wrap them in rounded brackets', async () => {
      const Z = jest.fn();
      const Logic = async function() {}

      run(
        <Logic value={ false }>
          (<Z />)
        </Logic>
      );

      await fakeAsync(null, 20);

      expect(Z).not.toBeCalled();
    });
    it('should throw an error if we forgot to wrap the children in brackets', () => {
      const Z = jest.fn();
      const Logic = function ({ children }) {
        children(42);
      };

      return run(
        <Logic exports='answer'>
          <Z $answer />
        </Logic>
      ).catch((error) => {
        expect(error.message).toBe('You are trying to use "children" prop as a function in <Logic> but it is not. Did you forget to wrap its children in round brackets. Like for example <Logic>(<Child />)</Logic>?');
      });
    });
    it('should throw an error if we pass non-object as an argument to the `children` prop', () => {
      const Z = jest.fn();
      const B = jest.fn();
      const Logic = function({ children }) {
        children('foo');
      }

      return run(
        <Logic>
          (
            <Z />
          )
        </Logic>
      ).catch(error => {
        expect(error.message).toBe('The "children" prop expects an object (key-value pairs) as first argument and a callback as second argument.');
      });
    });
    it('should run the ActML elements and make some data available for them', async () => {
      const Z = jest.fn();
      const B = jest.fn();
      const Logic = function({ children }) {
        children({ answer: 42 });
      }

      await run(
        <Logic>
          (
            <Z $answer />
            <B $answer />
          )
        </Logic>
      );

      expect(Z).toBeCalledWith(expect.objectContaining({ answer: 42 }));
      expect(B).toBeCalledWith(expect.objectContaining({ answer: 42 }));
    });
    it('should allow the FaCC pattern', async () => {
      const Z = ({ value }) => value * 2;
      const Logic = function({ children }) {
        return children({ value: 42 });
      }

      expect(await run(
        <Logic>
          {
            ({ value }) => {
              return <Z value={ value }/>;
            }
          }
        </Logic>
      )).toBe(84);
    });
    it('should allow the FaCC pattern even if we pass a generator', async () => {
      const Z = function Z({ answer }) { return answer * 2; }
      const B = function B(){ return 4; }
      const Logic = function Logic({ children }) {
        return children({ answer: 2 });
      }

      const res = await run(
        <Logic exports='res'>
          {
            function * FaCC({ answer }) {
              const a = yield <Z answer={ answer } />;
              const b = yield <B />;

              return a + b;
            }
          }
        </Logic>
      );

      expect(res).toBe(8);
    });
    it('should handle async FaCC child', async () => {
      const Z = async function ({ answer }) {
        await fakeAsync(null, 20);
        return answer * 2;
      };
      const Logic = async function ({ children }) {
        const a = await children({ answer: 5 });
        const b = await children({ answer: 3 });

        return a + b;
      };

      const finalAnswer = await run(
        <Logic>
          {
            ({ answer }) => <Z answer={ answer } />
          }
        </Logic>
      );

      expect(finalAnswer).toBe(16);
    });
    it.skip('should handle async manual children', async () => {
      const Z = async function ({ answer }) {
        await fakeAsync(null, 20);
        return answer * 2;
      };
      const B = async function ({ doubledAnswer }) {
        await fakeAsync(null, 20);
        return doubledAnswer / 10;
      }
      const Logic = async function({ children }) {
        await children(42);
        await children(10);
      }

      const finalAnswer = await run(
        <A result='finalAnswer'>
          <Logic exports='answer'>
            (
              <Z $answer exports='doubledAnswer'/>
              <B $doubledAnswer exports='finalAnswer'/>
            )
          </Logic>
        </A>
      );

      expect(finalAnswer).toBe(2);
    });
    it.skip('should finalize the parent only if its function is fully executed', async () => {
      const Z = jest.fn().mockImplementation(function ({ answer }) {
        return 'foo ' + answer;
      });
      const Logic = function({ children }) {
        children('a');
        children('b');
        children('c');
      }

      const result = await run(
        <A result='bar'>
          <Logic exports='answer'>
            (<Z exports='bar' $answer/>)
          </Logic>
        </A>
      );

      expect(result).toEqual('foo c');
      expect(Z).toBeCalledTimes(3);
      expect(Z).toBeCalledWith(expect.objectContaining({ answer: 'a' }));
      expect(Z).toBeCalledWith(expect.objectContaining({ answer: 'b' }));
      expect(Z).toBeCalledWith(expect.objectContaining({ answer: 'c' }));
    });
    it.skip('should allow us to process the children many times when they are ActML elements', async () => {
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
    it.skip('should keep the context in the FACC', async () => {
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
    it.skip(`- should be possible to process the children many times
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
});