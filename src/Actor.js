import { createDefaultPipeline } from './Pipeline';

export default function Actor(func, props, children) {
  return {

    func,
    props,
    children,
    pipeline: func.pipeline || createDefaultPipeline(),
    result: undefined,
    context: undefined,

    mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    async run(context) {
      this.context = context;

      if (typeof func === 'string') {
          this.func = this.context.get(func);
      }

      this.pipeline.setScope(this);
      await this.pipeline.run();
      return this.result;
    }
  }
}

// Static props
Actor.isItAnActor = actor => actor && !!actor.run;
Actor.errors = {
  STOP_PROCESSING: 'STOP_PROCESSING',
  CONTINUE_PROCESSING: 'CONTINUE_PROCESSING'
};