const flow = function (workers, done, context = {}) {
  if (workers.length === 0) {
    done();
  } else {
    (workers.shift())(context, () => flow(workers, done, context));
  }
}

export const NOOP = (context, done) => done();
export default flow;