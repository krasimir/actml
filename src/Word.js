const handleWordError = async function (error, props, context) {
  if (props && props.onError) {
    props.onError.mergeToProps({ error });

    const onErrorStrategy = await props.onError.say(context);

    if (onErrorStrategy === false) {
      throw new Error(Word.errors.STOP_PROCESSING);
    } else if (onErrorStrategy === true) {
      throw new Error(Word.errors.CONTINUE_PROCESSING);
    } else {
      throw error;
    }      
  } else {
    throw error;
  }
}

export function normalizeProps({ props, context }) {
  props && Object.keys(props).forEach(prop => {
    if (context[prop] && props[prop] === true) {
      props[prop] = context[prop];
    }
  });
};
export async function beforeHook({ func, props }) {
  if (func.before) await func.before(props);
}
export async function execute(word) {
  const { func, props, context } = word;

  try {
    word.result = await func.call(word, props);

    if (props && props.exports) {
      context[props.exports] = word.result;
    }
  } catch (error) {
    await handleWordError(error, props, context);
  }
}
export async function afterHook({ func, props, result }) {
  if (func.after) await func.after(props, result);
}
export async function processingResult({ func, result, props, context }) {
  if (result) {
    let shouldProcessResultFlag = true;
    if (func.shouldProcessResult) shouldProcessResultFlag = await func.shouldProcessResult(props, result);
    if (shouldProcessResultFlag && Word.isItAWord(result)) {
      await result.say(context);
    }
  }
}
export async function processChildren({ func, props, children, result, context }) {
  // shouldProcessChildren lifecycle
  let shouldProcessChildrenFlag = true;
  if (func.shouldProcessChildren) shouldProcessChildrenFlag = await func.shouldProcessChildren(props, result);

  // processing children
  if (shouldProcessChildrenFlag) {
    // FACC pattern
    if (children && children.length === 1 && !Word.isItAWord(children[0])) {
      await Word(children[0], result, undefined, Word.defaultPipeline).say(context);
    
    // nested tags
    } else if (children && children.length > 0) {
      let pointer = 0;
      let parallelProcessing = !!func.processChildrenInParallel;

      while(pointer < children.length) {
        const w = children[pointer];

        try {
          if (parallelProcessing) {
            w.say(context);
          } else {
            await w.say(context);
          }
        } catch (error) {
          if (error.message === Word.errors.STOP_PROCESSING) {
            break;
          } else if(!(error.message === Word.errors.CONTINUE_PROCESSING)) {
            throw error;
          }
        }
        pointer++;
      }
    }
  }
}

export default function Word(func, props, children) {
  return {

    func,
    props,
    children,
    pipeline: func.pipeline || Word.defaultPipeline,
    result: undefined,
    context: undefined,

    mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    async say(context) {
      this.context = context;

      let pointer = 0;
      while(pointer < this.pipeline.length) {
        await this.pipeline[pointer](this, context);
        pointer++;
      }

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
Word.defaultPipeline = [
  normalizeProps,
  beforeHook,
  execute,
  afterHook,
  processingResult,
  processChildren
];