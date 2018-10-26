/* eslint-disable max-len */

var ids = 100;

export const getId = () => ids++;
export const isItAnElement = element => element && element.__actml;
export const getFuncName = function (func) {
  const result = /function\*?\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[1] : 'unknown';
};
export function flow() {
  const api = {
    context: {},
    errorHandler(error) {
      throw error;
    },
    doneFunc() {},
    withContext(c) {
      this.context = c;
      return this;
    },
    done(d) {
      this.doneFunc = d;
      return this;
    },
    withErrorHandler(e) {
      this.errorHandler = e;
      return this;
    },
    run(workers) {
      if (workers.length === 0) {
        this.doneFunc();
      } else {
        try {
          const worker = workers.shift();

          worker(this.context, () => flow().withContext(this.context).done(this.doneFunc).run(workers));
        } catch (error) {
          this.errorHandler(error, () => flow().withContext(this.context).done(this.doneFunc).run(workers));
        }
      }
    }
  };

  return api;
}
