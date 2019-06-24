export default function createUseProductHook(product) {
  return (initialValue) => {
    if (typeof initialValue !== 'undefined') {
      product.set(initialValue);
    }
    return [
      product.get(),
      newValue => product.set(newValue)
    ];
  };
};
