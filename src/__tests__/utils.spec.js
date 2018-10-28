import { flow } from '../utils';

describe('Giving the utilities of ActML', () => {
  describe('when using the `flow` helper', () => {
    it('should run the given workers by passing the same context object', done => {
      const W1 = jest.fn().mockImplementation((context, d) => d());
      const W2 = jest.fn().mockImplementation((context, d) => {
        context.foo = 'bar';
        d();
      });
      const W3 = jest.fn().mockImplementation((context, d) => d());
      const context = {};

      flow([ W1, W2, W3 ], context, () => {
        expect(W1).toBeCalled();
        expect(W2).toBeCalled();
        expect(W3).toBeCalled();
        expect(context).toStrictEqual({ foo: 'bar' });
        done();
      });
    });
    it('should run the given error handler and give an option to continue working', done => {
      const errorHandler = (error, d) => {
        expect(error.message).toBe('Ops!');
        d();
      };
      const W1 = jest.fn().mockImplementation((context, d) => d());
      const W2 = jest.fn().mockImplementation((context, d) => {
        throw new Error('Ops!');
      });
      const W3 = jest.fn().mockImplementation((context, d) => {
        context.foo = 'bar';
        d();
      });
      const context = {};

      flow([ W1, W2, W3 ], context, () => {
        expect(W1).toBeCalled();
        expect(W2).toBeCalled();
        expect(W3).toBeCalled();
        expect(context).toStrictEqual({ foo: 'bar' });
        done();
      }, errorHandler);
    });
    it('should allow dynamically added worker', done => {
      const M = function M(context, d) {
        context.data.push('M');
        d();
      };
      const W1 = function W1(context, d) {
        context.data.push('W1');
        d();
      };
      const W2 = function W2(context, d, addWorker) {
        context.data.push('W2');
        addWorker(M);
        d();
      };
      const W3 = function W3(context, d) {
        context.data.push('W3');
        d();
      };
      const context = { data: [] };

      flow([ W1, W2, W3 ], context, () => {
        expect(context.data).toStrictEqual([ 'W1', 'W2', 'M', 'W3' ]);
        done();
      });
    });
  });
});
