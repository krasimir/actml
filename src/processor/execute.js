/* eslint-disable consistent-return */
import { isItAnElement } from '../utils';

export default function execute(execContext, done) {
  const { element } = execContext;
  const result = execContext.result = element.func.call(element, execContext.normalizedProps);

  if (result) {
    // another ActML element
    if (isItAnElement(result)) {
      return result.run(element, r => {
        execContext.result = r;
        done();
      });
    // promise
    } else if (result && result.then) {
      return result.then(asyncResult => {
        if (isItAnElement(asyncResult)) {
          return asyncResult.run(element, r => {
            execContext.result = r;
            done();
          });
        }
        execContext.result = asyncResult;
        done();
      }).catch(error => {
        throw error;
      });
    // generator
    } else if (typeof result.next === 'function') {
      const gen = result;
      let genRes = { value: undefined, done: false };
      let processGenerator = function () {
        if (genRes.done) {
          execContext.result = genRes.value;
          return done();
        }
        genRes = gen.next(genRes.value);
        if (isItAnElement(genRes.value)) {
          return genRes.value.run(element, newValue => {
            genRes.value = newValue;
            processGenerator();
          });
        }
        processGenerator();
      };

      return processGenerator();
    }
  }
  done();
}
