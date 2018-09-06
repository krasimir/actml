import Story from "./Story";

const normalizeProps = function (props, context) {
  props && Object.keys(props).forEach(prop => {
    if (context[prop] && props[prop] === true) {
      props[prop] = context[prop];
    }
  });
  return props;
};

const sayIt = async function (func, props, context) {
  let result;

  try {
    if (Word.isItAWord(func)) {
      return await func.say(context, props);
    }

    result = props ? await func(props) : await func();

    if (props && props.exports) {
      context[props.exports] = result;
    }
  } catch (error) {
    if (props && props.onError) {
      if (await props.onError.say(context, { error }) !== true) {
        throw error;
      }
    }
  }

  return result;
}

export default function Word(func, originalProps, children) {
  return {
    say: async (context, additionalProps) => {
      const props = normalizeProps(
        additionalProps ? Object.assign({}, originalProps, additionalProps) : originalProps,
        context
      );

      // before lifecycle
      if (func.before) func.before(props);

      // running the function + error handling
      const result = await sayIt(func, props, context);

      // after lifecycle
      if (func.after) func.after(props, result);

      // shouldProcessResult lifecycle
      let shouldProcessResultFlag = true;
      if (func.shouldProcessResult) shouldProcessResultFlag = func.shouldProcessResult(props, result);

      // when the result of a Word is another word
      if (shouldProcessResultFlag && Word.isItAWord(result)) {
        await Story([ result ], context);
      }

      // shouldProcessChildren lifecycle
      let shouldProcessChildrenFlag = true;
      if (func.shouldProcessChildren) shouldProcessChildrenFlag = func.shouldProcessChildren(props, result);

      // processing children
      if (shouldProcessChildrenFlag) {
        // FACC pattern
        if (children && children.length === 1 && !Word.isItAWord(children[0])) {
          await Story([ Word(children[0], result) ], context);
        
        // nested tags
        } else if (children && children.length > 0) {
          await Story(children, context);
        }
      }

      return result;
    }
  }
}

Word.isItAWord = word => word && !!word.say;