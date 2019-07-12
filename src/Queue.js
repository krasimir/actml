/* eslint-disable no-return-assign */
const LOGS = true;
const log = (...something) => LOGS ? console.log(...something) : null;
const isPromise = obj => obj && typeof obj['then'] === 'function';
const createItem = (type, func) => ({
  type,
  func,
  result: undefined,
  consumed: false
});

export default function createQueue(node, extractResult) {
  let items = [];
  let async = false;
  let destroy = () => (items = []);
  let release = () => {};
  let promise;

  return {
    add(type, func) {
      items.push(createItem(type, func));
    },
    prependItems(type, ...toAdd) {
      log(`${ node.element.name }:Q: + ${ type }[${ toAdd.length }]`);
      items = [ ...toAdd.map(func => createItem(type, func)), ...items ];
    },
    process(done) {
      const item = items.find(({ consumed }) => consumed === false);

      if (!item) {
        log(`${ node.element.name }:Q:done`);
        done();
        release();
        return;
      }

      log(`${ node.element.name }:Q:${ item.type }`);
      item.result = item.func();

      if (isPromise(item.result)) {
        async = true;
        item.result.then(asyncResult => {
          item.consumed = true;
          item.result = asyncResult;
          this.process(done);
        }).catch(error => {
          release(error);
        });
      } else {
        item.consumed = true;
        this.process(done);
      }
    },
    get(t) {
      return items.find(({ type }) => type === t);
    },
    result() {
      if (async) {
        return promise ? promise : promise = new Promise((done, reject) => {
          release = (error) => {
            if (error) {
              reject(error);
            } else {
              done(extractResult(this));
            }
          };
        });
      }
      return extractResult(this);
    },
    dump() {
      return items;
    }
  };
};
