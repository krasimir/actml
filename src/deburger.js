export function debuggerIn(context, done) {
  const { element, normalizedProps } = context;

  if (console.group) {
    console.group(`<${ element.name }>`);
    console.log({ props: normalizedProps });
  } else {
    console.log(`<${ element.name }>`, { props });
  }
  done();
}
export function debuggerOut(context, done) {
  const { element, result } = context;

  console.log(`</${ element.name }>`, { scope: element.scope, result });
  if (console.groupEnd) {
    console.groupEnd();  
  }
  done();
}