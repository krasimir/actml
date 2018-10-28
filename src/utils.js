/* eslint-disable max-len */

var ids = 100;

export const NOOP = () => {};
export const getId = () => ids++;
export const isItAnElement = element => element && element.__actml;
export const getFuncName = function (func) {
  const result = /function\*?\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};
export function flow(workers, context = {}, done = NOOP, errorHandler = NOOP) {
  (function process(workers) {
    if (workers.length === 0) {
      done();
    } else {
      try {
        (workers.shift())(
          context,
          error => {
            if (error) {
              errorHandler(error, () => process(workers), error => done(error));
            } else {
              process(workers);
            }
          },
          newWorker => (workers = [ newWorker, ...workers ])
        );
      } catch (error) {
        errorHandler(error, () => process(workers), error => done(error));
      }
    }
  })(workers);
}
