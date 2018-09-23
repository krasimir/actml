import { createDefaultPipeline } from './Pipeline';
import { getScopedVars, getFuncName } from './utils';

export default function Element(func, props, children) {
  return {
    func,
    props,
    children,
    scopedVars: getScopedVars(props),
    name: getFuncName(func),
    scope: {},
    pipeline: undefined,
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
        throw new Error('The Element can not be run without a parent.');
      }
      this.parent = parent;
      this.context = parent.context;
      this.pipeline = this.func.pipeline || createDefaultPipeline(this);

      if (typeof func === 'string') {
        this.func = this.context[func];
      }

      return await this.pipeline.process();
    }
  }
}

// Static
Element.isItAnElement = element => element && !!element.run;
Element.createRootElement = function (context) { 
  return {
    context,
    scope: {},
    dispatch(type, value){
      this.scope[type] = value;
    },
    readFromScope(key) {
      let value = this.scope[key];
      if (typeof value !== 'undefined') return value;

      value = this.context[key];
      if (typeof value !== 'undefined') return value;

      throw new Error(`"${ key }" is not defined in the global scope neither in the context.`);
    }
  }
}
Element.errors = {
  STOP_PROCESSING: 'STOP_PROCESSING',
  CONTINUE_PROCESSING: 'CONTINUE_PROCESSING'
};