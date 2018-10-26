export const getFuncName = function (func) {
  const result = /function\*?\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};

export const isItAnElement = element => element && element.__actml;

var ids = 100;

export const getId = () => ids++;

function identifyTheError(error, sourceElement) {
  if (error.toString().match(/children is not a function/)) {
    return new Error(`You are trying to use "children" prop as a function in <${ sourceElement }> but it is not. Did you forget to wrap its children in round brackets. Like for example <${ sourceElement }>(<Child />)</${ sourceElement }>?`);
  }
  return error;
}

export function flow(workers, done, context) {
  if (workers.length === 0) {
    done();
  } else {
    try {
      const worker = workers.shift();

      worker(context, () => {
        flow(workers, done, context);
      });
    } catch (error) {
      const { props } = context.element;
      const identifiedError = identifyTheError(error, context.element.name);

      if (props && props.onError) {
        props.onError.mergeToProps({ error: identifiedError });
        props.onError.run(context.element, () => flow(workers, done, context));
      } else {
        throw error;
      }
    }
  }
};
