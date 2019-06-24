'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createUseProductHook;
function createUseProductHook(product) {
  return function (initialValue) {
    if (typeof initialValue !== 'undefined') {
      product.set(initialValue);
    }
    return [product.get(), function (newValue) {
      return product.set(newValue);
    }];
  };
};