'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getIndent = function getIndent(level) {
  return [].concat(_toConsumableArray(Array(level))).join('  ');
};

var DEFAULT_OPTIONS = {
  log: function log() {
    var _console;

    return (_console = console).log.apply(_console, arguments);
  },
  severity: {
    IN: true,
    OUT: true,
    EXECUTE_IN: false,
    EXECUTE_OUT: false,
    EXPORTS_IN: false,
    EXPORTS_OUT: false,
    RESULTS_IN: false,
    RESULTS_OUT: false,
    CHILDREN_IN: false,
    CHILDREN_OUT: false
  }
};

exports.default = function (customOptions) {
  var options = Object.assign({}, DEFAULT_OPTIONS, customOptions);
  var log = options.log;

  return function (element, level) {
    return function (type) {
      var indent = getIndent(level);

      if (options.severity[type]) {
        if (type === 'IN') {
          log(indent + '<' + element.name + '>');
          element.props && log(indent + 'props:', element.props);
        } else if (type === 'OUT') {
          log(indent + '</' + element.name + '>');
          element.result && log(indent + 'result:', element.result);
        } else {
          log(indent + '<' + element.name + '>(' + type + ')');
        }
      }
    };
  };
};