const getFuncName = (func) => {
  if (func.name) return func.name;

  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[ 1 ] : 'unknown';
};

export default function getMeta(func, props) {
  const propNames = props ? Object.keys(props) : [];
  const dependencies = [];
  let exportsKeyword;

  propNames.forEach(propName => {
    if (propName.charAt(0) === '$') {
      dependencies.push(propName.substr(1, propName.length));
    } else if (propName === 'exports') {
      exportsKeyword = props.exports;
    }
  });

  return {
    name: getFuncName(func),
    dependencies,
    exportsKeyword
  };
};
