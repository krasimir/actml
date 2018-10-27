'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = execute;

var _utils = require('../utils');

function execute(execContext, done) {
  var element = execContext.element;

  var result = execContext.result = element.func.call(element, execContext.normalizedProps);

  if (result) {
    // another ActML element
    if ((0, _utils.isItAnElement)(result)) {
      return result.run(element, function (r) {
        execContext.result = r;
        done();
      });
      // promise
    } else if (result && result.then) {
      return result.then(function (asyncResult) {
        if ((0, _utils.isItAnElement)(asyncResult)) {
          return asyncResult.run(element, function (r) {
            execContext.result = r;
            done();
          });
        }
        execContext.result = asyncResult;
        done();
      }).catch(function (error) {
        throw error;
      });
      // generator
    } else if (typeof result.next === 'function') {
      var gen = result;
      var genRes = { value: undefined, done: false };
      var processGenerator = function processGenerator() {
        if (genRes.done) {
          execContext.result = genRes.value;
          return done();
        }
        genRes = gen.next(genRes.value);
        if ((0, _utils.isItAnElement)(genRes.value)) {
          return genRes.value.run(element, function (newValue) {
            genRes.value = newValue;
            processGenerator();
          });
        }
        processGenerator();
      };

      return processGenerator();
    }
  }

  done();
} /* eslint-disable consistent-return */