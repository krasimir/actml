'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

async function resultMiddleware(element) {
  var result = element.result;


  if (result) {
    // Another ActML element
    if ((0, _utils.isItAnElement)(result)) {
      return await result.run(element);
    }
    // Generator
    if (typeof result.next === 'function') {
      var gen = result;
      var genRes = { value: undefined, done: false };

      while (!genRes.done) {
        genRes = gen.next(genRes.value);
        if ((0, _utils.isItAnElement)(genRes.value)) {
          genRes.value = await genRes.value.run(element);
        }
      }
      element.result = genRes.value;
    }
  }
}

resultMiddleware._name = 'RESULTS';

exports.default = resultMiddleware;