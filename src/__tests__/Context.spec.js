/** @jsx A */
import { A, run } from '..';
import { createContext } from '../Context';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the Context', () => {
  describe('when using the context', () => {
    it('should provide methods for setting, getting and dumping data', async () => {
      const context = createContext({ foo: 'bar' });

      context.set('a', 'b');

      expect(context.get('a')).toBe('b');
      expect(context.dump()).toStrictEqual({ foo: 'bar', a: 'b' });
    });
    it('should pass variables between siblings', async () => {
      const print = jest.fn();
      const GetToken = async () => fakeAsync('XXX', 50);
      const UseToken = ({ token }) => print(token);
      const App = () => {};

      await run(
        <App>
          <GetToken exports='token' />
          <UseToken $token />
        </App>
      );
      expect(print).toBeCalledWith('XXX');
    });
    it('should allow renaming of a prop', async () => {
      const print = jest.fn();
      const GetToken = async () => fakeAsync('XXX', 50);
      const UseToken = ({ token }) => print(token);
      const App = () => {};

      await run(
        <App>
          <GetToken exports='blah' />
          <UseToken $blah='token' />
        </App>
      );
      expect(print).toBeCalledWith('XXX');
    });
    it('should keep the same context', async () => {
      const Z = jest.fn();
      const B = jest.fn();
      const C = jest.fn();
      const c = { foo: 'bar' };

      await run(
        <Z $foo>
          <B $foo>
            <C $foo/>
          </B>
        </Z>,
        c
      );

      expect(Z).toBeCalledWith({ foo: 'bar' });
      expect(B).toBeCalledWith({ foo: 'bar' });
      expect(C).toBeCalledWith({ foo: 'bar' });
    });
    it('should be able the use the context as DI container', async () => {
      const context = {
        getPosts: jest.fn().mockImplementation(() => 'bar')
      };
      const Z = jest.fn();

      await run(
        <A>
          <getPosts url='foo' exports='posts'/>
          <Z $posts />
        </A>,
        context
      );

      expect(context.getPosts).toBeCalledWith({ url: 'foo', exports: 'posts' });
      expect(Z).toBeCalledWith({ posts: 'bar' });
    });
    it('should warn if we try to override an already defined key', async () => {
      const Z = () => 'a';
      const B = () => 'b';
      const warn = jest.fn();

      await run(<A><Z exports='foo'></Z><B exports='foo'></B></A>);
    });
    it('should accept a function for "exports" prop', async () => {
      const Z = () => ({ type: 'foo', total: 47 });
      const B = jest.fn();

      await run(
        <A>
          <Z exports={ ({ total }) => ({ num: total }) } />
          <B $num />
        </A>
      );

      expect(B).toBeCalledWith({ num: 47 });
    });
  });
});