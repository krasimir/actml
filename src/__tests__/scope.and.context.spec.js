/** @jsx A */
import { A, run } from '..';

const fakeAsync = (resolveWith, delay) => new Promise(done => {
  setTimeout(() => done(resolveWith), delay);
});

describe('Given the ActML library', () => {
  describe('when using the scope api and the context', () => {
    it('should pass variables between elements', async () => {
      const Z = jest.fn();
      const CreatToken = () => 'xxx';
      const UseToken = ({ token }) => Z(token);

      await run(
        <CreatToken exports='token'>
          <UseToken $token />
        </CreatToken>
      );
      expect(Z).toBeCalledWith('xxx');
    });
    it('should disable the variable bubbling if there is scoping', async () => {
      const Z = jest.fn();
      const B = jest.fn();
      const C = jest.fn().mockImplementation(() => 'foo');
      const D = function D() {};
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
        expect(E).toBeCalledWith(expect.objectContaining({ faf: 'foo' }));
        expect(error.message).toBe('Undefined variable \"faf\" requested by <D>.');
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
    it('should provide an API for scoping everything', async () => {
      const B = jest.fn();
      const Z = jest.fn();
      const M = function M() {};
      const C = jest.fn().mockImplementation(() => 42);
      const D = jest.fn();

      return run(
        <B>
          <Z scope='*'>
            <C exports='foo'/>
            <C exports='bar'/>
            <D $foo $bar/>
          </Z>
          <M $foo />
        </B>
      ).catch(error => {
        expect(D).toBeCalledWith(expect.objectContaining({ foo: 42, bar: 42 }));
        expect(error.message).toBe("Undefined variable \"foo\" requested by <M>.");
      });
    });
    it('should allow renaming of a prop', async () => {
      const print = jest.fn();
      const GetToken = async () => fakeAsync('XXX', 50);
      const UseToken = ({ token }) => print(token);

      await run(
        <A>
          <GetToken exports='blah' />
          <UseToken $blah='token' />
        </A>
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

      expect(C).toBeCalledWith(expect.objectContaining({ foo: 'bar' }));
    });
    it('should be able to use the context as DI container', async () => {
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

      expect(context.getPosts).toBeCalledWith(expect.objectContaining({ url: 'foo', exports: 'posts' }));
      expect(Z).toBeCalledWith(expect.objectContaining({ posts: 'bar' }));
    });
    it('should accept a function for "exports" prop', async () => {
      const Z = () => 'Hello World';
      const B = jest.fn();
      const C = jest.fn();
      const transform = name => ({
        u: name.toUpperCase(),
        l: name.toLowerCase()
      });

      await run(
        <Z exports={ transform }>
          <B $u />
          <C $l />
        </Z>
      );

      expect(B).toBeCalledWith(expect.objectContaining({ u: 'HELLO WORLD' }));
      expect(C).toBeCalledWith(expect.objectContaining({ l: 'hello world' }));
    });
    it('should accept a function as value of a scope variable', async () => {
      const Z = () => 55;
      const B = jest.fn();

      await run(
        <Z exports='num'>
          <B $num={ n => ({ a: n, b: n})} />
        </Z>
      );

      expect(B).toBeCalledWith(expect.objectContaining({ a: 55, b: 55 }));
    });
    it('should scope variables to only parent by default', async () => {
      const Foo = () => 100;
      const Bar = () => fakeAsync(200, 10);
      const Delay = () => fakeAsync(null, 20);
      const Z1 = jest.fn();
      const Z2 = jest.fn();

      const { scope, context } = await run(
        <A>
          <Bar exports='answer'>
            <Z1 $answer/>
          </Bar>
          <Foo exports='answer'>
            <Delay />
            <Z2 $answer/>
          </Foo>
        </A>
      );

      expect(Z1).toBeCalledWith(expect.objectContaining({ answer: 200 }));
      expect(Z2).toBeCalledWith(expect.objectContaining({ answer: 100 }));
    });
  });
  describe('when using generators', () => {
    it('should be able to use the scope api', async () => {
      const Z = jest.fn();
      const B = jest.fn().mockImplementation(() => fakeAsync(42, 10));
      const C = jest.fn().mockImplementation(answer => `the answer is ${ answer }`);
      const E = jest.fn().mockImplementation(function({ message, answer }) {
        return { message, answer, contextData: this.context };
      });
      const Func = function * () {
        yield <Z foo='bar' />;
        const answer = yield <B bar='foo' exports='answer' />;
        const message = yield C(answer);
        return <E $answer message={ message } />;
      }

      await run(<Func scope='answer'/>);

      expect(Z).toBeCalledWith(expect.objectContaining({ foo: 'bar' }));
      expect(B).toBeCalledWith(expect.objectContaining(({ bar: 'foo', exports: 'answer' })));
      expect(C).toBeCalledWith(42);
      expect(E).toBeCalledWith(expect.objectContaining({ answer: 42, message: 'the answer is 42' }));
    });
  })
});