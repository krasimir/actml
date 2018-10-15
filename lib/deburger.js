'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (element, type) {
  var props = element.props,
      scope = element.scope,
      result = element.result;


  switch (type) {
    case 'IN':
      if (console.group) {
        console.group('<' + element.name + '>');
        console.log({ props: props });
      } else {
        console.log('<' + element.name + '>', { props: props });
      }
      break;
    case 'OUT':
      console.log('</' + element.name + '>', { scope: scope, result: result });
      if (console.groupEnd) {
        console.groupEnd();
      }
      break;
    default:
      console.log('<' + element.name + '>(' + type + ')');
  }
};