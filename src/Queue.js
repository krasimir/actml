const createItem = (type, func) => ({ type, func });

export default function createQueue() {
  let items = [];

  return {
    add(type, func) {
      items.push(createItem(type, func));
    },
    addFirst(type, func) {
      items = [ createItem(type, func), ...items ];
    }
  };
};
