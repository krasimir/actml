export const createState = (element) => {
  const subscribers = {};
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
      if (!subscribers[dependent.__actml]) {
        subscribers[dependent.__actml] = dependent;
      }
    }
  };
};
