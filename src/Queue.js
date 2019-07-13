/* eslint-disable no-return-assign */
const LOGS = true;
const log = (...something) => LOGS ? console.log(...something) : null;
const isPromise = obj => obj && typeof obj['then'] === 'function';
const createItem = (type, func, onDone = () => {}) => ({
  type,
  func,
  onDone
});

export default function createQueue(node) {
  let items = [];
  let async = false;
  let release = () => {};

  return {
    add(type, func, onDone) {
      log(`${ node.element.name }:Q: <- ${ type }`);
      items.push(createItem(type, func, onDone));
    },
    prependItem(type, func, onDone) {
      log(`${ node.element.name }:Q: <-+ ${ type }`);
      items = [ createItem(type, func, onDone), ...items ];
    },
    process(lastResult) {
      if (items.length === 0) {
        log(`${ node.element.name }:Q:done`);
        release();
        return;
      }

      const item = items.shift();

      log(`${ node.element.name }:Q -> ${ item.type }`);
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
    dump() {
      return items;
    }
  };
};
