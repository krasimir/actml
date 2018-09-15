'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Word;

var _Pipeline = require('./Pipeline');

function Word(func, props, children) {
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
    say: async function say(context) {
      this.context = context;
      this.pipeline.setScope(this);
      await this.pipeline.run();
      return this.result;
    }
  };
}

// Static props
Word.isItAWord = function (word) {
  return word && !!word.say;
};
Word.errors = {
  STOP_PROCESSING: 'STOP_PROCESSING',
  CONTINUE_PROCESSING: 'CONTINUE_PROCESSING'
};