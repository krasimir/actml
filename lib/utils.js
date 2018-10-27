'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flow = flow;
/* eslint-disable max-len */

var ids = 100;

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
function flow() {
  var api = {
    context: {},
    errorHandler: function errorHandler(error) {
      throw error;
    },
    doneFunc: function doneFunc() {},
    withContext: function withContext(c) {
      this.context = c;
      return this;
    },
    done: function done(d) {
      this.doneFunc = d;
      return this;
    },
    withErrorHandler: function withErrorHandler(e) {
      this.errorHandler = e;
      return this;
    },
    run: function run(workers) {
      var _this = this;

      if (workers.length === 0) {
        this.doneFunc();
      } else {
        try {
          var worker = workers.shift();

          worker(this.context, function () {
            return flow().withContext(_this.context).done(_this.doneFunc).run(workers);
          });
        } catch (error) {
          this.errorHandler(error, function () {
            return flow().withContext(_this.context).done(_this.doneFunc).run(workers);
          });
        }
      }
    }
  };

  return api;
}