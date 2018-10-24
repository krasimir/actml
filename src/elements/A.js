export default function A() {
  return this.scope;
}
A.after = function (context, done) {
  const { props, scope } = context.element;

  if (props && props.result) {
    if (!scope.hasOwnProperty(props.result)) {
      throw new Error(`You are trying to return "${ props.result }" as a result of an <A> element. However no one down the chain is exporting it.`);
    }
    context.result = scope[props.result];
  }
  done();
}