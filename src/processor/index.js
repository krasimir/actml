/* eslint-disable max-len */

// import { flow } from '../utils';
// import beforeHook from './beforeHook';
// import afterHook from './afterHook';
// import normalizeProps from './normalizeProps';
// import execute from './execute';
// import resolveExports from './resolveExports';
// import processChildren from './processChildren';

// function identifyTheError(error, sourceElement) {
//   if (error.toString().match(/children is not a function/)) {
//     return new Error(`You are trying to use "children" prop as a function in <${ sourceElement }> but it is not. Did you forget to wrap its children in round brackets. Like for example <${ sourceElement }>(<Child />)</${ sourceElement }>?`);
//   }
//   return error;
// }

export function createProcessor(done) {
  // const execContext = { element };

  // flow()
  //   .withContext(execContext)
  //   .done(() => done(execContext.result))
  //   .withErrorHandler((error, continueProcessing) => {
  //     const { props } = element;
  //     const identifiedError = identifyTheError(error, element.name);

  //     if (props && props.onError) {
  //       props.onError.mergeToProps({ error });
  //       props.onError.run(element, continueProcessing);
  //     } else {
  //       throw identifiedError;
  //     }
  //   })
  //   .run([
  //     beforeHook,
  //     normalizeProps,
  //     execute,
  //     resolveExports,
  //     (execContext, done) => execContext.normalizedProps.children ? done() : processChildren(execContext, done),
  //     afterHook
  //   ]);

  const processor = {
    _ids: 0,
    _running: false,
    _onFinish: done,
    _bucket: [],
    _processing: [],
    _processElement(task) {
      this._processing.push(task);
    },
    _createTask(element, parent) {
      return { element, parent, id: this._ids++ };
    },
    add(...params) {
      this._bucket.push(this._createTask(...params));
      if (!this._running) {
        this._processElement(this._bucket.shift());
      }
      return this;
    }
  };

  return processor;
}
