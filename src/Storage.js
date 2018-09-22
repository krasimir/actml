export function createStorage(initialData) {
  const data = {};

  if (initialData) {
    Object.keys(initialData).forEach(
      key => data[key] = initialData[key]
    );
  }

  return {
    get(key) {
      return data[key];
    },
    set(key, value) {
      data[key] = value;
    },
    dump() {
      return data;
    }
  }
}