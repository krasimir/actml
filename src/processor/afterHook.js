export default function afterHook(execContext, done) {
  if (execContext.element.func.after) {
    execContext.element.func.after(execContext, done);
  } else {
    done();
  }
}
