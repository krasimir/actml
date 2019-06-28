export const getFuncName = (func) => {
  if (func.name) return func.name;

  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[ 1 ] : 'unknown';
};

export function parseProps(props) {
  const propNames = props ? Object.keys(props) : [];
  const result = {
    dependencies: [],
    exportsKeyword: undefined
  };

  propNames.forEach(propName => {
    if (propName.charAt(0) === '$') {
      result.dependencies.push(propName.substr(1, propName.length));
    } else if (propName === 'exports') {
      result.exportsKeyword = props.exports;
    } else {
      result[propName] = props[propName];
    }
  });

  return result;
};
