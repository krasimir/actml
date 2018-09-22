import { createDefaultPipeline } from './Pipeline';
import { createStorage } from './Storage';

const getFuncName = function(fun) {
  if (typeof fun === 'string') return fun;

  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}

export default function Element(func, props, children) {
  return {
    func,
    props,
    children,
    name: getFuncName(func),
    pipeline: func.pipeline || createDefaultPipeline(),
    result: undefined,
    context: undefined,
    scope: undefined,
    parent: undefined,

    mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    async run(parent) {
      this.context = parent.context;
      this.scope = createStorage();
      this.parent = parent;

      if (typeof func === 'string') {
        this.func = this.context.get(func);
      }

      this.pipeline.setScope(this);
      await this.pipeline.run();
      return this.result;
    },
    lookUp(key) {
      const { scope, parent } = this;
      const value = scope.get(key);

      if (typeof value !== 'undefined') return value;
      return parent.lookUp(key);
    }
  }
}

// Static
Element.isItAnElement = element => element && !!element.run;
Element.createRootElement = function (context) {
  return {
    context,
    scope: createStorage(),
    lookUp(key) {
      var value = this.scope.get(key);
      if (typeof value !== 'undefined') return value;

      value = this.context.get(key);
      if (typeof value !== 'undefined') return value;

      throw new Error(`There is no "${ key }" defined.`);
    }
  }
}
Element.errors = {
  STOP_PROCESSING: 'STOP_PROCESSING',
  CONTINUE_PROCESSING: 'CONTINUE_PROCESSING'
};