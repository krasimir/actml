/* eslint-disable no-return-assign */

export const createProduct = (element) => {
  var state;

  return {
    set(value) {
      return state = value;
    },
    get() {
      return state;
    },
    clear() {
      state = undefined;
    }
  };
};
