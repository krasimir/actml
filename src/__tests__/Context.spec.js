/** @jsx D */
import { D, speak } from '..';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the Context', () => {
  describe('when using the context', () => {
    it('should pass variables between siblings', async () => {
      const print = jest.fn();
      const GetToken = async () => fakeAsync('XXX', 50);
      const UseToken = ({ token }) => print(token);
      const App = () => {};

      await speak(
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

      await speak(
        <App>
          <GetToken exports='blah' />
          <UseToken $blah='token' />
        </App>
      );
      expect(print).toBeCalledWith('XXX');
    });
    it('should keep the same context', async () => {
      const A = jest.fn();
      const B = jest.fn();
      const C = jest.fn();
      const c = { foo: 'bar' };

      await speak(
        <A $foo>
          <B $foo>
            <C $foo/>
          </B>
        </A>,
        c
      );

      expect(A).toBeCalledWith({ foo: 'bar' });
      expect(B).toBeCalledWith({ foo: 'bar' });
      expect(C).toBeCalledWith({ foo: 'bar' });
    });
    it('should be able the use the context as DI container', async () => {
      const context = {
        getPosts: jest.fn().mockImplementation(() => 'bar')
      };
      const A = jest.fn();

      await speak(
        <D>
          <getPosts url='foo' exports='posts'/>
          <A $posts />
        </D>,
        context
      );

      expect(context.getPosts).toBeCalledWith({ url: 'foo', exports: 'posts' });
      expect(A).toBeCalledWith({ posts: 'bar' });
    });
    it('should warn if we try to override an already defined key', async () => {
      const A = () => 'a';
      const B = () => 'b';
      const warn = jest.fn();

      await speak(<D><A exports='foo'></A><B exports='foo'></B></D>);
    });
    it('should provide a method for getting all the data', async () => {
      const A = () => 'bar';
      
      const context = await speak(
        <D>
          <A exports='foo' />
        </D>
      );

      expect(context.dump()).toStrictEqual({ foo: 'bar' });
    });
  });
});