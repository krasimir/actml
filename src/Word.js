import Story from "./Story";

const normalizeProps = function (props, context) {
  props && Object.keys(props).forEach(prop => {
    if (context[prop] && props[prop] === true) {
      props[prop] = context[prop];
    }
  });
  return props;
};

const handleWordError = async function (error, props, context) {
  if (props && props.onError) {
    const onErrorStrategy = await props.onError.say(context, { error });

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

export default function Word(func, originalProps, children) {
  var props = originalProps;

  return {
    func,
    props,
    mergeToProps(additionalProps) {
      props = Object.assign({}, props, additionalProps);
    },
    say: async (context) => {
      const normalizedProps = normalizeProps(props, context);

      // before lifecycle
      if (func.before) await func.before(normalizedProps);

      // running the function + error handling
      let result;

      try {
        result = normalizedProps ? await func(normalizedProps) : await func();
    
        if (normalizedProps && normalizedProps.exports) {
          context[normalizedProps.exports] = result;
        }
      } catch (error) {
        await handleWordError(error, normalizedProps, context);
      }

      // after lifecycle
      if (func.after) await func.after(normalizedProps, result);

      // processing the result
      let shouldProcessResultFlag = true;
      if (func.shouldProcessResult) shouldProcessResultFlag = await func.shouldProcessResult(normalizedProps, result);
      if (shouldProcessResultFlag && Word.isItAWord(result)) {
        // when the result of a Word is another word
        await Story([ result ], context);
      }

      // shouldProcessChildren lifecycle
      let shouldProcessChildrenFlag = true;
      if (func.shouldProcessChildren) shouldProcessChildrenFlag = await func.shouldProcessChildren(normalizedProps, result);

      // processing children
      if (shouldProcessChildrenFlag) {
        // FACC pattern
        if (children && children.length === 1 && !Word.isItAWord(children[0])) {
          await Story([ Word(children[0], result) ], context);
        
        // nested tags
        } else if (children && children.length > 0) {
          await Story(children, context, !!func.processChildrenInParallel);
        }
      }

      return result;
    }
  }
}

// Static props
Word.isItAWord = word => word && !!word.say;
Word.errors = {
  STOP_PROCESSING: 'STOP_PROCESSING',
  CONTINUE_PROCESSING: 'CONTINUE_PROCESSING'
};