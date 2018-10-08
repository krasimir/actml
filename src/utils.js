export const getFuncName = function(fun) {
  if (typeof fun === 'string') return fun;

  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));

  if (ret === '') return 'unknown';
  return ret;
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