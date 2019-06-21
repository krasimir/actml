const getFuncName = (func) => {
  if (func.name) return func.name;

  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[ 1 ] : 'unknown';
};

export default function getMeta(func, props) {
  return {
    name: getFuncName(func),
    props,
    propNames: props ? Object.keys(props) : null
  };
};
