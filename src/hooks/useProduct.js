export default function createUseProductHook(product) {
  return (initialValue) => {
    if (typeof initialValue !== 'undefined') {
      product.set(initialValue);
    }
    return [
      newValue => product.set(newValue)
    ];
  };
};
