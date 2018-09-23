import Pipeline from '../Pipeline';

const fakeAsync = delay => new Promise(done => {
  setTimeout(() => done(), delay);
});

describe('Given the Pipeline utility', () => {
  describe('when adding middlewares and running the pipeline', () => {
    it('should run every middleware', async () => {
      const temp = [];
      const scope = { foo: 'bar' };
      const Z = jest.fn();
      const B = jest.fn();
      const M1 = async function (element) {
        Z(element);
        await fakeAsync(40);
        temp.push('M1');
      }
      const M2 = async function (element) {
        B(element);
        await fakeAsync(10);
        temp.push('M2');
      }
      const pipeline = Pipeline();

      pipeline.add(M1);
      pipeline.add(M2);
      pipeline.setScope(scope);

      await pipeline.process();

      expect(Z).toBeCalledWith(scope);
      expect(B).toBeCalledWith(scope);
      expect(temp).toMatchObject(['M1', 'M2']);
    });
  });
  describe('when using the `find` method', () => {
    it('should return the specified middleware', async () => {
      const M = () => {};
      const pipeline = Pipeline();

      pipeline.add(M, 'mmm');

      expect(pipeline.find('mmm').func).toBe(M);
    });
    it('should thrown an error if the middleware is not there', async () => {
      const M = () => {};
      const pipeline = Pipeline();

      pipeline.add(M, 'foo');

      expect(() => pipeline.find('mmm')).toThrowError();
    });
  });
  describe('when disabling a middleware', () => {
    it('should not run the disabled middleware', async () => {
      const M1 = jest.fn();
      const M2 = jest.fn();
      const pipeline = Pipeline();

      pipeline.add(M1, 'm1');
      pipeline.add(M2, 'm2');
      pipeline.disable('m1');

      await pipeline.process();

      expect(M1).not.toBeCalled();
      expect(M2).toBeCalled();
    });
  });
  describe('when running a specific middleware', () => {
    it('should not run the disabled middleware', async () => {
      const M1 = jest.fn();
      const M2 = jest.fn();
      const scope = { foo: 'bar' };
      const pipeline = Pipeline();

      pipeline.setScope(scope);
      pipeline.add(M1, 'm1');
      pipeline.add(M2, 'm2');

      await pipeline('m2', 'test');

      expect(M2).toBeCalledWith({ foo: 'bar', result: 'test' });
    });
  });
});