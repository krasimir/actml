/* eslint-disable consistent-return */
const CONTEXT_KEY = '__CONTEXT_KEY__';

export const PUBLIC_CONTEXT_KEY = '__PUBLIC_CONTEXT_KEY__';

var ids = 0;

function getId() {
  return 'c' + (++ids);
};
function resolveContext(node, id, stack = []) {
  stack.push(node.element.name);
  if (node[CONTEXT_KEY] && id in node[CONTEXT_KEY]) {
    return node[CONTEXT_KEY][id];
  } else if (node.parent) {
    return resolveContext(node.parent, id, stack);
  }
  console.warn(`A context consumer is used with no provider.
  Stack:
${ stack.map(name => `    <${ name }>`).join('\n') }`);
}

export default function createContextFactory(processor) {
  return function createContext(initialValue) {
    const id = getId();

    const Provider = ({ value, children }) => {
      const node = processor.node();

      if (!node[CONTEXT_KEY]) {
        node[CONTEXT_KEY] = {};
      }
      node[CONTEXT_KEY][id] = value;

      return children;
    };
    const Consumer = ({ children }) => {
      const node = processor.node();

      children(resolveContext(node, id) || initialValue);
    };

    return {
      [PUBLIC_CONTEXT_KEY]: () => {
        const node = processor.node();

        return resolveContext(node, id) || initialValue;
      },
      Provider,
      Consumer
    };
  };
};
