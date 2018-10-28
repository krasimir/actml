/* eslint-disable consistent-return */
import { isItAnElement } from '../utils';

export default function execute(execContext, done) {
  const { element, processor } = execContext;
  const result = execContext.result = element.func.call(
    element,
    {
      ...execContext.normalizedProps,
      children: execContext.childrenProp
    }
  );

  if (result) {
    // another ActML element
    if (isItAnElement(result)) {
      processor.add(result, element, r => {
        execContext.result = r;
        done();
      });
    // promise
    } else if (result && result.then) {
      result.then(asyncResult => {
        if (isItAnElement(asyncResult)) {
          processor.add(asyncResult, element, r => {
            execContext.result = r;
            done();
          });
        } else {
          execContext.result = asyncResult;
          done();
        }
      }).catch(error => done(error));
    // generator
    } else if (typeof result.next === 'function') {
      const gen = result;
      let genRes = { value: undefined, done: false };

      (function processGenerator() {
        if (genRes.done) {
          execContext.result = genRes.value;
          return done();
        }
        genRes = gen.next(genRes.value);
        if (isItAnElement(genRes.value)) {
          processor.add(genRes.value, element, newValue => {
            genRes.value = newValue;
            processGenerator();
          });
        } else {
          processGenerator();
        }
      })();
    } else {
      done();
    }
  } else {
    done();
  }
}
