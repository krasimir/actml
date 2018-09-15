'use strict';

var _Pipeline = require('../Pipeline');

var _Pipeline2 = _interopRequireDefault(_Pipeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeAsync = function fakeAsync(delay) {
  return new Promise(function (done) {
    setTimeout(function () {
      return done();
    }, delay);
  });
};

describe('Given the Pipeline utility', function () {
  describe('when adding middlewares and running the pipeline', function () {
    it('should run every middleware', async function () {
      var temp = [];
      var scope = { foo: 'bar' };
      var A = jest.fn();
      var B = jest.fn();
      var M1 = async function M1(word) {
        A(word);
        await fakeAsync(40);
        temp.push('M1');
      };
      var M2 = async function M2(word) {
        B(word);
        await fakeAsync(10);
        temp.push('M2');
      };
      var pipeline = (0, _Pipeline2.default)();

      pipeline.add(M1);
      pipeline.add(M2);
      pipeline.setScope(scope);

      await pipeline.run();

      expect(A).toBeCalledWith(scope);
      expect(B).toBeCalledWith(scope);
      expect(temp).toMatchObject(['M1', 'M2']);
    });
  });
  describe('when using the `find` method', function () {
    it('should return the specified middleware', async function () {
      var M = function M() {};
      var pipeline = (0, _Pipeline2.default)();

      pipeline.add(M, 'mmm');

      expect(pipeline.find('mmm').func).toBe(M);
    });
    it('should thrown an error if the middleware is not there', async function () {
      var M = function M() {};
      var pipeline = (0, _Pipeline2.default)();

      pipeline.add(M, 'foo');

      expect(function () {
        return pipeline.find('mmm');
      }).toThrowError();
    });
  });
  describe('when disabling a middleware', function () {
    it('should not run the disabled middleware', async function () {
      var M1 = jest.fn();
      var M2 = jest.fn();
      var pipeline = (0, _Pipeline2.default)();

      pipeline.add(M1, 'm1');
      pipeline.add(M2, 'm2');
      pipeline.disable('m1');

      await pipeline.run();

      expect(M1).not.toBeCalled();
      expect(M2).toBeCalled();
    });
  });
  describe('when running a specific middleware', function () {
    it('should not run the disabled middleware', async function () {
      var M1 = jest.fn();
      var M2 = jest.fn();
      var scope = { foo: 'bar' };
      var pipeline = (0, _Pipeline2.default)();

      pipeline.setScope(scope);
      pipeline.add(M1, 'm1');
      pipeline.add(M2, 'm2');

      await pipeline('m2', 'test');

      expect(M2).toBeCalledWith({ foo: 'bar', result: 'test' });
    });
  });
});