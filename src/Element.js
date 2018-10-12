import Processor from './Processor';
import { getScopedVars, getFuncName, getId } from './utils';

export default function Element(func, props, children) {
  return {
    id: getId(),
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
    debug: undefined,

    mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    mergeToScope(additionalProps) {
      this.scope = Object.assign({}, this.scope, additionalProps);
    },
    dispatch(type, value) {
      if (this.scopedVars.indexOf(type) >= 0 || this.scopedVars[0] === '*') {
        this.scope[type] = value;
      } else {
        this.parent.dispatch(type, value);
      }
    },
    readFromScope(key, requester) {
      const { scope, parent } = this;
      const value = scope[key];

      if (typeof value !== 'undefined') return value;
      return parent.readFromScope(key, requester);
    },
    async run(parent) {
      if (!parent) {
        throw new Error('The Element can not be run with no parent.');
      }
      this.parent = parent;
      this.context = parent.context;
      
      if (!this.processor) {
        this.processor = Processor(this, this.func.processor);
        
        if (typeof func === 'string') {
          if (this.context[func]) {
            this.func = this.context[func];
          } else {
            throw new Error(`"${ func }" is missing in the context.`);
          }
        }
      }

      return await this.processor();
    }
  }
}
