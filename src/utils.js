/* eslint-disable max-len */

var ids = 100;

export const getId = () => ids++;
export const isItAnElement = element => element && element.__actml;
export const getFuncName = function (func) {
  const result = /function\*?\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};
export function flow(
  workers,
  context = {},
  done = () => {},
  errorHandler = (error, notused) => { throw error; }
  ) {
  (function process(workers) {
    if (workers.length === 0) {
      done();
    } else {
      try {
        (workers.shift())(context, () => process(workers));
      } catch (error) {
        errorHandler(error, () => process(workers));
      }
    }
  })(workers);
}
