const resolveProp = (prop, parent, errorMessage, stack) => {
  if (prop in parent.exported) {
    return parent.exported[prop];
  } else if (parent.parent) {
    stack.push(parent.meta.name);
    return resolveProp(prop, parent.parent, errorMessage, stack);
  }
  stack.push(parent.meta.name);
  throw new Error(errorMessage + '\n\nStack:\n' + stack.reverse().map(n => `  <${ n }>`).join('\n'));
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
      element.parent,
      `"${ propName }" prop requested by "${ elementName }" can not be found.`,
      [ elementName ]
    );
  });
  return boundData;
};
