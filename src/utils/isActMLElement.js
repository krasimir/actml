export default function isActMLElement(element) {
  return element && element.scope && element.meta;
};
