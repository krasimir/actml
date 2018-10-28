'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable consistent-return */


exports.default = execute;

var _utils = require('../utils');

function execute(execContext, done) {
  var element = execContext.element,
      processor = execContext.processor;

  var result = execContext.result = element.func.call(element, _extends({}, execContext.normalizedProps, {
    children: execContext.childrenProp
  }));

  if (result) {
    // another ActML element
    if ((0, _utils.isItAnElement)(result)) {
      processor.add(result, element, function (r) {
        execContext.result = r;
        done();
      });
      // promise
    } else if (result && result.then) {
      result.then(function (asyncResult) {
        if ((0, _utils.isItAnElement)(asyncResult)) {
          processor.add(asyncResult, element, function (r) {
            execContext.result = r;
            done();
          });
        } else {
          execContext.result = asyncResult;
          done();
        }
      }).catch(function (error) {
        return done(error);
      });
      // generator
    } else if (typeof result.next === 'function') {
      var gen = result;
      var genRes = { value: undefined, done: false };

      (function processGenerator() {
        if (genRes.done) {
          execContext.result = genRes.value;
          return done();
        }
        genRes = gen.next(genRes.value);
        if ((0, _utils.isItAnElement)(genRes.value)) {
          processor.add(genRes.value, element, function (newValue) {
            genRes.value = newValue;
            processGenerator();
          });
        } else {
          processGenerator();
        }
      })();
    } else {
      done();
    }
  } else {
    done();
  }
}