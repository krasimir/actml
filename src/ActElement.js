function getFuncName(func) {
  if (func.name) return func.name;
  let result = /^function\s+([\w\$]+)\s*\(/.exec(func.toString());

  return result ? result[ 1 ] : 'unknown';
};

const createElement = (func, props, children) => ({
  __actml: true,
  __used: 0,
  __running: false,
  __processChildrenAutomatically: true,
  id: null,
  props,
  name: getFuncName(func),
  children,
  initialize: function (id, used = 0) {
    this.id = id;
    this.__used = used;
    this.__running = false;
    this.__processChildrenAutomatically = true;
  },
  mergeProps(newProps) {
    this.props = Object.assign({}, this.props, newProps);
  },
  toString() {
    return this.name;
  },
  used() {
    return this.__used;
  },
  isRunning() {
    return this.__running;
  },
  shouldProcessChildrenAutomatically(value) {
    if (typeof value === 'undefined') {
      return this.__processChildrenAutomatically;
    }
    this.__processChildrenAutomatically = value;
    return value;
  },
  async run() {
    this.__running = true;
    this.__processChildrenAutomatically = true;

    const result = await func(this.props);

    this.__used += 1;
    this.__running = false;
    return result;
  }
});

export default createElement;
