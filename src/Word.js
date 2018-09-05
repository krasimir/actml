import Story from "./Story";

const normalizeProps = (props, context) => {
  props && Object.keys(props).forEach(prop => {
    if (context[prop] && props[prop] === true) {
      props[prop] = context[prop];
    }
  });
  return props;
};

export default function Word(func, props, children) {
  return {
    say: async (context, additionalProps) => {
      let result;

      try {
        if (Word.isItAWord(func)) {
          return await func.say(context, props);
        }
        const parameters = normalizeProps(
          additionalProps ? Object.assign({}, props, additionalProps) : props,
          context
        );

        result = parameters ? await func(parameters) : await func();

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

      // when the result of a Word is another word
      if (Word.isItAWord(result)) {
        await Story([ result ], context);
      }

      // FACC pattern
      if (children && children.length === 1 && !Word.isItAWord(children[0])) {
        await Story([ Word(children[0], result) ], context);
      
      // processing the children
      } else if (children && children.length > 0) {
        await Story(children, context);
      }

      return result;
    }
  }
}

Word.isItAWord = word => word && !!word.say;