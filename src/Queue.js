const isPromise = obj => obj && typeof obj['then'] === 'function';
const isGenerator = obj => obj && typeof obj['next'] === 'function';
const createItem = (type, func) => ({
  type,
  func,
  result: undefined,
  consumed: false
});

export default function createQueue(node) {
  let items = [];
  let async = false;
  let release;

  return {
    _extractResult() {
      const returnedElement = this.get(this.RETURNED_ELEMENT);

      if (returnedElement) return returnedElement.result;
      return this.get(this.CONSUME).result;
    },
    add(type, func) {
      items.push(createItem(type, func));
    },
    addFirst(type, func) {
      items = [ createItem(type, func), ...items ];
    },
    process(done) {
      const item = items.find(({ consumed }) => consumed === false);

      if (!item) {
        console.log(`${ node.element.name }:Q:done`);
        done();
        if (release) release();
        return;
      }

      console.log(`${ node.element.name }:Q:${ item.type }`);
      item.result = item.func();

      if (isPromise(item.result)) {
        async = true;
        item.result.then(asyncResult => {
          item.consumed = true;
          item.result = asyncResult;
          this.process(done);
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
        return new Promise(done => {
          release = () => done(this._extractResult());
        });
      }
      return this._extractResult();
    },
    dump() {
      return items;
    },
    CONSUME: 'CONSUME',
    PROCESS_RESULT: 'PROCESS_RESULT',
    RETURNED_ELEMENT: 'RETURNED_ELEMENT',
    HANDLE_CHILDREN: 'HANDLE_CHILDREN',
    CHILD: 'CHILD'
  };
};
