const getFuncName = (func) => {
  if (func.name) return func.name;

  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[ 1 ] : 'unknown';
};
const resolveExportsProp = (props, propNames) => {
  if (!props) return null;

  const found = propNames.find(p => p === 'exports');

  if (!found) return null;
  return props.exports;
};

export default function getMeta(func, props) {
  const propNames = props ? Object.keys(props) : null;

  return {
    name: getFuncName(func),
    props,
    propNames,
    exportsKeyword: resolveExportsProp(props, propNames)
  };
};
