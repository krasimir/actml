/* eslint-disable no-return-assign */
const LOGS = false;
const log = (...something) => LOGS ? console.log(...something) : null;
const isPromise = obj => obj && typeof obj['then'] === 'function';
const createItem = (type, func, onDone = () => {}) => ({
  type,
  func,
  onDone
});

export default function createQueue(context) {
  let items = [];
  let async = false;
  let running = false;
  let release = () => {};

  return {
    add(type, func, onDone) {
      log(`${ context }:Q: [...${ type }] (${ items.length + 1 } total)`);
      items.push(createItem(type, func, onDone));
    },
    prependItem(type, func, onDone) {
      log(`${ context }:Q: [${ type }...] (${ items.length + 1 } total)`);
      items = [ createItem(type, func, onDone), ...items ];
    },
    process(lastResult) {
      running = true;
      if (items.length === 0) {
        log(`${ context }:Q:done`);
        running = false;
        release();
        return;
      }

      const item = items.shift();

      log(`${ context }:Q: ${ item.type }() (${ items.length } left)`);
      const result = item.func(lastResult);

      if (isPromise(result)) {
        async = true;
        result.then(asyncResult => {
          item.onDone(asyncResult);
          this.process(asyncResult);
        }).catch(error => {
          release(error);
        });
      } else {
        item.onDone(result);
        this.process(result);
      }
    },
    onDone(getResult) {
      if (async) {
        return new Promise((done, reject) => {
          release = (error) => {
            if (error) {
              reject(error);
            } else {
              done(getResult());
            }
          };
        });
      }
      return getResult();
    },
    isRunning() {
      return running;
    }
  };
};
