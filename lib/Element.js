'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Element;

var _Pipeline = require('./Pipeline');

function Element(func, props, children) {
  return {

    func: func,
    props: props,
    children: children,
    pipeline: func.pipeline || (0, _Pipeline.createDefaultPipeline)(),
    result: undefined,
    context: undefined,

    mergeToProps: function mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    run: async function run(context) {
      this.context = context;

      if (typeof func === 'string') {
        this.func = this.context.get(func);
      }

      this.pipeline.setScope(this);
      await this.pipeline.run();
      return this.result;
    }
  };
}

// Static props
Element.isItAnElement = function (element) {
  return element && !!element.run;
};
Element.errors = {
  STOP_PROCESSING: 'STOP_PROCESSING',
  CONTINUE_PROCESSING: 'CONTINUE_PROCESSING'
};