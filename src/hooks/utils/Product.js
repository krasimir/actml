/* eslint-disable no-return-assign */

export const createProduct = () => {
  var state;

  return {
    set(value) {
      return state = value;
    },
    get() {
      return state;
    }
  };
};
