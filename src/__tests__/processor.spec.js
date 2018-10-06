import createProcessor from '../createProcessor';

const fakeAsync = delay => new Promise(done => {
  setTimeout(() => done(), delay);
});
const createElement = () => ({

});

describe('Given the processor utility', () => {
  describe('when adding middlewares and running the processor', () => {
    it('should run every middleware', async () => {
      const temp = [];
      const element = {};
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
      const processor = createProcessor(element, [ M1, M2 ]);

      await processor();

      expect(Z).toBeCalledWith(element);
      expect(B).toBeCalledWith(element);
      expect(temp).toMatchObject(['M1', 'M2']);
    });
  });
  describe('when running a specific middleware manually', () => {
    it('should disable the middleware', async () => {
      const M1 = jest.fn().mockImplementation(element => (element.result = 'test'));
      const M2 = jest.fn();
      const processor = createProcessor({ foo: 'bar' }, [ M1, M2 ]);

      await processor();

      expect(M2).toBeCalledWith({ foo: 'bar', result: 'test' });
      expect(M2).toHaveBeenCalledTimes(1);
    });
  });
});