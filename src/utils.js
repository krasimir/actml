export const getFuncName = function (func) {
  const result = /function\*?\s+([\w\$]+)\s*\(/.exec(func.toString());
  return result ? result[1] : 'unknown';
}

export const isItAnElement = element => element && element.__actml;

var ids = 100;
export const getId = () => ids++;
