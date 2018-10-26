export default function beforeHook(execContext, done) {
  if (execContext.element.func.before) {
    execContext.element.func.before(execContext, done);
  } else {
    done();
  }
}
