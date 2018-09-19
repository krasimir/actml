'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Actor;

var _Pipeline = require('./Pipeline');

function Actor(func, props, children) {
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
Actor.isItAnActor = function (actor) {
  return actor && !!actor.run;
};
Actor.errors = {
  STOP_PROCESSING: 'STOP_PROCESSING',
  CONTINUE_PROCESSING: 'CONTINUE_PROCESSING'
};