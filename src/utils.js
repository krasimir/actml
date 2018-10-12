export const getFuncName = function (func) {
  const result = /function\*?\s+([\w\$]+)\s*\(/.exec(func.toString());
  return result ? result[1] : '';
}
export const getScopedVars = function (props) {
  let scoped = [];
  if (props && props.scope) {
    scoped = props.scope.split(/, ?/);
  }
  return scoped;
}

export const isItAnElement = element => element && !!element.run;

var ids = 100;
export const getId = () => ids++;