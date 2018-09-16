export function createContext(initialData) {
  const data = initialData || {};

  return {
    get(key) {
      return data[key];
    },
    set(key, value) {
      if (data[key]) {
        console.warn(`"${ key }" is already defined in the current context. This may be completely fine if you know what you are doing.`)
      }
      data[key] = value;
    },
    dump() {
      return data;
    }
  }
}