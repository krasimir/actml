"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var MIDDLEWARE_NOT_RUN = "There are two possible options for this error:\na) You are running your ActML logic too soon. The Redux middleware is still not registered.\nb) You forgot to register ActML's Redux middleware.";

var Integration = {
  _listeners: [],
  getState: function getState() {
    throw new Error(MIDDLEWARE_NOT_RUN);
  },
  dispatch: function dispatch() {
    throw new Error(MIDDLEWARE_NOT_RUN);
  },
  addListener: function addListener(callback) {
    var _this = this;

    this._listeners.push(callback);

    var index = this._listeners.length - 1;

    return function () {
      return _this._listeners.splice(index, 1);
    };
  },
  actionDetected: function actionDetected(action) {
    this._listeners.forEach(function (l) {
      return l(action);
    });
  },
  reset: function reset() {
    this._listeners = [];
  }
};

exports.default = Integration;