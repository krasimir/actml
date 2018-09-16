export function createContext(initialData) {
  const data = initialData || {};

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