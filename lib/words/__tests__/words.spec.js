'use strict';

var _ = require('../..');

var delay = function delay(what, _delay) {
  return new Promise(function (done) {
    setTimeout(function () {
      return what(), done();
    }, _delay);
  });
}; /** @jsx D */


describe('Given the Dactory dictionary', function () {
  describe('when using the wrapper <D />', function () {
    it('should work just fine :)', async function () {
      var F = jest.fn().mockImplementation(function () {
        return 42;
      });

      var result = await (0, _.speak)((0, _.D)(
        _.D,
        null,
        (0, _.D)(F, { exports: 'answer' })
      ));

      expect(F).toBeCalled();
      expect(result).toMatchObject({ answer: 42 });
    });
  });
  describe('when using Parallel', function () {
    it('should run its children in parallel', async function () {
      var temp = [];
      var A = jest.fn().mockImplementation(function () {
        return delay(function () {
          return temp.push('a');
        }, 50);
      });
      var B = jest.fn().mockImplementation(function () {
        return delay(function () {
          return temp.push('b');
        }, 30);
      });

      await (0, _.speak)((0, _.D)(
        _.Parallel,
        null,
        (0, _.D)(A, null),
        (0, _.D)(B, null)
      ));

      expect(temp).toEqual([]);

      await delay(function () {
        expect(temp).toEqual(['b', 'a']);
      }, 60);
    });
  });
});