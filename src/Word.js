import Story from "./Story";

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

// pipeline functions

export function normalizeProps({ props }, context) {
  props && Object.keys(props).forEach(prop => {
    if (context[prop] && props[prop] === true) {
      props[prop] = context[prop];
    }
  });
};
export async function beforeHook({ func, props }, context) {
  if (func.before) await func.before(props);
}
export async function execute(word, context) {
  const { func, props } = word;

  try {
    word.result = await func(props);

    if (props && props.exports) {
      context[props.exports] = word.result;
    }
  } catch (error) {
    await handleWordError(error, props, context);
  }
}
export async function afterHook({ func, props, result }, context) {
  if (func.after) await func.after(props, result);
}
export async function processingResult({ func, result, props }, context) {
  if (result) {
    let shouldProcessResultFlag = true;
    if (func.shouldProcessResult) shouldProcessResultFlag = await func.shouldProcessResult(props, result);
    if (shouldProcessResultFlag && Word.isItAWord(result)) {
      await Story([ result ], context);
    }
  }
}
export async function processChildren({ func, props, children, result }, context) {
  // shouldProcessChildren lifecycle
  let shouldProcessChildrenFlag = true;
  if (func.shouldProcessChildren) shouldProcessChildrenFlag = await func.shouldProcessChildren(props, result);

  // processing children
  if (shouldProcessChildrenFlag) {
    // FACC pattern
    if (children && children.length === 1 && !Word.isItAWord(children[0])) {
      await Story([ Word(children[0], result, undefined, Word.defaultPipeline) ], context);
    
    // nested tags
    } else if (children && children.length > 0) {
      await Story(children, context, !!func.processChildrenInParallel);
    }
  }
}

export default function Word(func, props, children, pipeline) {
  return {

    func,
    props,
    children,
    pipeline,
    result: undefined,

    mergeToProps(additionalProps) {
      this.props = Object.assign({}, this.props, additionalProps);
    },
    async say(context) {
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