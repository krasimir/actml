'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseProductHook;
function createUseProductHook(product) {
  return function (initialValue) {
    product.clear();
    if (typeof initialValue !== 'undefined') {
      product.set(initialValue);
    }
    return [function (newValue) {
      return product.set(newValue);
    }];
  };
};