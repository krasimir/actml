const resolveProp = (prop, element, parent, errorMessage, stack) => {
  if (parent) {
    const binding = parent.requestBinding(prop, element);

    if (binding) {
      return binding.value;
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

export default function resolveBindings(element) {
  const { bindings, name: elementName } = element.meta;
  const boundData = {};

  if (bindings.length === 0) {
    return {};
  }

  bindings.forEach(propName => {
    boundData[propName] = resolveProp(
      propName,
      element,
      element.parent,
      `"${ propName }" prop requested by "${ elementName }" can not be found.`,
      [ elementName ]
    );
  });
  return boundData;
};
