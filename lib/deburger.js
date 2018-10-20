"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debuggerIn = debuggerIn;
exports.debuggerOut = debuggerOut;
function debuggerIn(context, done) {
  var element = context.element,
      normalizedProps = context.normalizedProps;


  if (console.group) {
    console.group("<" + element.name + ">");
    console.log({ props: normalizedProps });
  } else {
    console.log("<" + element.name + ">", { props: props });
  }
  done();
}
function debuggerOut(context, done) {
  var element = context.element,
      result = context.result;


  console.log("</" + element.name + ">", { scope: element.scope, result: result });
  if (console.groupEnd) {
    console.groupEnd();
  }
  done();
}