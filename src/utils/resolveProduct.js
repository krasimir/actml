const resolveProp = (prop, element, parent, errorMessage, stack) => {
  if (parent) {
    const productValue = parent.requestProduct(prop);

    if (productValue) {
      return productValue.value;
    } else if (parent.parent) {
      stack.push(parent.meta.name);
      return resolveProp(prop, element, parent.parent, errorMessage, stack);
    }
    stack.push(parent.meta.name);
  }
  throw new Error(
    errorMessage + '\n\nStack:\n' +
    stack.reverse().map(n => `  <${ n }>`).join('\n')
  );
};

export default function resolveProduct(element) {
  const { dependencies, name: elementName } = element.meta;
  const data = {};

  if (dependencies.length === 0) {
    return {};
  }

  dependencies.forEach(propName => {
    data[propName] = resolveProp(
      propName,
      element,
      element.parent,
      `"${ propName }" prop requested by "${ elementName }" can not be found.`,
      [ elementName ]
    );
  });
  return data;
};
