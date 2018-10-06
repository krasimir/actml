import createProcessor from './createProcessor';
import { getScopedVars, getFuncName } from './utils';

export default function Element(func, props, children) {
  return {
    func,
    props,
    children,
    scopedVars: getScopedVars(props),
    name: getFuncName(func),
    scope: {},
    processor: undefined,
    result: undefined,
    context: undefined,
    parent: undefined,

    mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    dispatch(type, value) {
      if (this.scopedVars.indexOf(type) >= 0 || this.scopedVars[0] === '*') {
        this.scope[type] = value;
      } else {
        this.parent.dispatch(type, value);
      }
    },
    readFromScope(key) {
      const { scope, parent } = this;
      const value = scope[key];

      if (typeof value !== 'undefined') return value;
      return parent.readFromScope(key);
    },
    async run(parent) {
      if (!parent) {
        throw new Error('The Element can not be run with no parent.');
      }
      this.parent = parent;
      this.context = parent.context;

      if (!this.processor) {
        this.processor = createProcessor(this, this.func.processor);
      }

      if (typeof func === 'string') {
        if (this.context[func]) {
          this.func = this.context[func];
        } else {
          throw new Error(`"${ func }" is missing in the context.`);
        }
      }

      return await this.processor();
    }
  }
}

// Static
Element.createRootElement = function (context) { 
  return {
    context,
    scope: {},
    dispatch(){},
    readFromScope(key) {
      let value = this.scope[key];
      if (typeof value !== 'undefined') return value;

      value = this.context[key];
      if (typeof value !== 'undefined') return value;

      throw new Error(`Undefined variable "${ key }".`);
    }
  }
}