function getFuncName(func) {
  if (func.name) return func.name;
  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[ 1 ] : 'unknown';
};

const createElement = (func, props, children) => {
  if (typeof func !== 'function') {
    throw new Error(`ActML element expects a function. "${ func }" given instead.`);
  }
  return {
    __actml: true,
    __used: 0,
    __running: false,
    id: null,
    props,
    name: getFuncName(func),
    children,
    initialize: function (id, used = 0) {
      this.id = id;
      this.__used = used;
      this.__running = false;
    },
    mergeProps(newProps) {
      this.props = Object.assign({}, this.props, newProps);
    },
    used() {
      return this.__used;
    },
    isRunning() {
      return this.__running;
    },
    enter() {
      this.__running = true;
    },
    consume() {
      return func(this.props);
    },
    out() {
      this.__used += 1;
      this.__running = false;
    }
  };
};

export default createElement;
