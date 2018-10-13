'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var log = function log() {
  var _console;

  return (_console = console).log.apply(_console, arguments);
};

exports.default = function (element, type) {
  if (type === 'IN') {
    log('<' + element.name + '>');
  } else if (type === 'OUT') {
    log('</' + element.name + '>');
  } else {
    log('<' + element.name + '>(' + type + ')');
  }
};