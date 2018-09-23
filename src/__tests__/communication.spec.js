/** @jsx A */
import { A, run, Parallel } from '..';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});
const delay = (what, delay) => new Promise(done => {
  setTimeout(() => (what(), done()), delay);
});

describe('Given the ActML library', () => {
  describe('when dealing with elements communication', () => {
    it('should pass variables between elements by using the global scope', async () => {
      const print = jest.fn();
      const Z = jest.fn();
      const GetToken = async () => fakeAsync('XXX', 50);
      const UseToken = ({ token }) => print(token);
      const App = () => {};

      await run(
        <App>
          <A>
            <A>
              <GetToken exports='token'>
                <Z $token />
              </GetToken>
            </A>
          </A>
          <UseToken $token />
        </App>
      );
      expect(Z).toBeCalledWith({ token: 'XXX' });
      expect(print).toBeCalledWith('XXX');
    });
    it('should disable the variable bubbling if there is scoping', async () => {
      const Z = jest.fn();
      const B = jest.fn();
      const C = jest.fn().mockImplementation(() => 'foo');
      const D = jest.fn();
      const E = jest.fn();

      return run(
        <A>
          <Z scope='faf'>
            <B>
              <C exports='faf' />
            </B>
            <E $faf/>
          </Z>
          <D $faf />
        </A>
      ).catch(error => {
        expect(E).toBeCalledWith({ faf: 'foo' });
        expect(error.message).toBe('\"faf\" is not defined in the global scope neither in the context.');
      });
    });
    it('should support comma separated scoped variables', async () => {
      var ZScope;
      const Z = jest.fn().mockImplementation(function () { ZScope = this.scope });
      const B = jest.fn();
      const C = jest.fn().mockImplementation(() => 'foo');
      const D = jest.fn().mockImplementation(() => 'bar');

      await run(
        <Z scope='f, b'>
          <B>
            <C exports='f'>
              <D exports='b' />
            </C>
          </B>
        </Z>
      );

      expect(ZScope).toStrictEqual({ f: 'foo', b: 'bar' });
    });
    it('should allow renaming of a prop', async () => {
      const print = jest.fn();
      const GetToken = async () => fakeAsync('XXX', 50);
      const UseToken = ({ token }) => print(token);
      const App = () => {};

      await run(
        <App scope='blah'>
          <GetToken exports='blah' />
          <UseToken $blah='token' />
        </App>
      );
      expect(print).toBeCalledWith('XXX');
    });
    it('should fallback to the context if the variable is missing in the scope', async () => {
      const Z = jest.fn();
      const B = jest.fn();
      const C = jest.fn();
      const c = { foo: 'bar' };

      await run(
        <Z>
          <B>
            <C $foo/>
          </B>
        </Z>,
        c
      );

      expect(C).toBeCalledWith({ foo: 'bar' });
    });
    it('should be able the use the context as DI container', async () => {
      const context = {
        getPosts: jest.fn().mockImplementation(() => 'bar')
      };
      const Z = jest.fn();

      await run(
        <A scope='posts'>
          <getPosts url='foo' exports='posts'/>
          <Z $posts />
        </A>,
        context
      );

      expect(context.getPosts).toBeCalledWith({ url: 'foo', exports: 'posts' });
      expect(Z).toBeCalledWith({ posts: 'bar' });
    });
    it('should accept a function for "exports" prop', async () => {
      const Z = () => ({ type: 'foo', total: 47 });
      const B = jest.fn();

      await run(
        <A scope='num'>
          <Z exports={ ({ total }) => ({ num: total }) } />
          <B $num />
        </A>
      );

      expect(B).toBeCalledWith({ num: 47 });
    });
    it('should accept a function as value of a scope variable', async () => {
      const Z = () => 55;
      const B = jest.fn();

      await run(
        <A scope='num'>
          <Z exports='num' />
          <B $num={ n => ({ a: n, b: n})} />
        </A>
      );

      expect(B).toBeCalledWith({ a: 55, b: 55 });
    });
    it('should scope variables to only parent by default', async () => {
      const Foo = () => 100;
      const Bar = () => fakeAsync(200, 10);
      const Delay = () => fakeAsync(undefined, 20);
      const Z1 = jest.fn();
      const Z2 = jest.fn();

      await run(
        <A>
          <Parallel>
            <Bar exports='answer'>
              <Z1 $answer/>
            </Bar>
            <Foo exports='answer'>
              <Delay />
              <Z2 $answer/>
            </Foo>
          </Parallel>
        </A>
      );

      await delay(() => {
        expect(Z1).toBeCalledWith({ answer: 200 });
        expect(Z2).toBeCalledWith({ answer: 100 });
      }, 50);
    });
  });
});