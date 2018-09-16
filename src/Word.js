import { createDefaultPipeline } from './Pipeline';

export default function Word(func, props, children) {
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
    async say(context) {
      this.context = context;

      if (typeof func === 'string') {
        if (this.context[func]) {
          this.func = this.context[func];
        } else {
          throw new Error(`"${ func }" is not defined in the current context.`);
        }
      }

      this.pipeline.setScope(this);
      await this.pipeline.run();
      return this.result;
    }
  }
}

// Static props
Word.isItAWord = word => word && !!word.say;
Word.errors = {
  STOP_PROCESSING: 'STOP_PROCESSING',
  CONTINUE_PROCESSING: 'CONTINUE_PROCESSING'
};