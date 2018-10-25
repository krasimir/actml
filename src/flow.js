function identifyTheError(error, sourceElement) {
  if (error.toString().match(/children is not a function/)) {
    return new Error(`You are trying to use "children" prop as a function in <${ sourceElement }> but it is not. Did you forget to wrap its children in round brackets. Like for example <${ sourceElement }>(<Child />)</${ sourceElement }>?`);
  }
  return error;
}

const flow = function (workers, done, context = {}) {
  if (workers.length === 0) {
    done();
  } else {
    try {
      (workers.shift())(context, () => flow(workers, done, context));
    } catch(error) {
      const { props } = context.element;
      error = identifyTheError(error, context.element.name);

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