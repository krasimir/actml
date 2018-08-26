const DIALECTICA_TYPE = '__dialectica';

class Dialect {
  constructor(func, params, children) {
    this.func = func;
    this.params = params;
    this.children = children;
    this[DIALECTICA_TYPE] = true;
  }
  annotate(params) {
    this.params = Object.assign({}, this.params, params);
  }
  static isItDialect(dialect) {
    return dialect[DIALECTICA_TYPE] === true
  }
}

function speak(dialect) {
  // console.log('-> ', dialect);
  if (!dialect) return;

  const { func, params, children } = dialect;

  if (typeof func === 'function') {
    const result = func.call(this, params);

    if (children) {
      if (children.length === 1 && !Dialect.isItDialect(children[0])) {
        return speak(children[0](result));
      } else {
        children.forEach(speak);
      }
    }
    return result;
  } else if (typeof func === 'object' && Dialect.isItDialect(func)) {
    func.annotate(params);
    return speak(func);
  }
}

export function Dialect() {}
export default function dialectica(func, params, ...children) {
  return new Dialect(func, params, children);
}

dialectica.speak = speak;