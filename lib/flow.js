"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var flow = function flow(workers, done) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (workers.length === 0) {
    done();
  } else {
    workers.shift()(context, function () {
      return flow(workers, done, context);
    });
  }
};

var NOOP = exports.NOOP = function NOOP(context, done) {
  return done();
};
exports.default = flow;