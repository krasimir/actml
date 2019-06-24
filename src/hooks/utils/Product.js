export const createProduct = (element) => {
  var subscribers = {};
  var state;

  return {
    set(value) {
      state = value;
      Object.keys(subscribers).forEach(id => {
        subscribers[id].run(element);
      });
      return value;
    },
    get() {
      return state;
    },
    subscribe(dependent) {
      if (!(dependent.__actml in subscribers)) {
        subscribers[dependent.__actml] = dependent;
      }
    },
    clear() {
      subscribers = {};
      state = undefined;
    }
  };
};
