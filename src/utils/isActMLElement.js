export default function isActMLElement(element) {
  return element && typeof element === 'object' && 'state' in element && 'meta' in element;
};
