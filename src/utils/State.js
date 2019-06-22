export const createState = () => {
  const subscribers = [];
  var state;

  return {
    set(value) {
      state = value;
      subscribers.forEach(s => s(value));
      return value;
    },
    get() {
      return state;
    },
    subscribe(dependent) {
      if (subscribers.indexOf(dependent) < 0) {
        subscribers.push(dependent);
      }
    }
  };
};
