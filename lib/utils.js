'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flow = flow;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* eslint-disable max-len */

var ids = 100;

var NOOP = exports.NOOP = function NOOP() {};
var getId = exports.getId = function getId() {
  return ids++;
};
var isItAnElement = exports.isItAnElement = function isItAnElement(element) {
  return element && element.__actml;
};
var getFuncName = exports.getFuncName = function getFuncName(func) {
  var result = /function\*?\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};
function flow(workers) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOOP;
  var errorHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : NOOP;

  (function process(workers) {
    if (workers.length === 0) {
      done();
    } else {
      try {
        workers.shift()(context, function (error) {
          if (error) {
            errorHandler(error, function () {
              return process(workers);
            }, function (error) {
              return done(error);
            });
          } else {
            process(workers);
          }
        }, function (newWorker) {
          return workers = [newWorker].concat(_toConsumableArray(workers));
        });
      } catch (error) {
        errorHandler(error, function () {
          return process(workers);
        }, function (error) {
          return done(error);
        });
      }
    }
  })(workers);
}