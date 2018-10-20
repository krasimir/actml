const flow = function (workers, done, context = {}) {
  if (workers.length === 0) {
    done();
  } else {
    try {
      (workers.shift())(context, () => flow(workers, done, context));
    } catch(error) {
      const { props } = context.element;

      if (props && props.onError) {
        props.onError.mergeToProps({ error });
        props.onError.run(context.element, () => flow(workers, done, context));
      } else {
        throw error;
      }
    }
  }
}

export const NOOP = (context, done) => done();
export default flow;