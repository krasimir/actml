"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var api = {
    exists: function exists(propName, func) {
      if (props && props[propName]) {
        func(props[propName]);
      }
    }
  };

  return api;
};

;