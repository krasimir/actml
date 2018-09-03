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
      try {
        if (Word.isItAWord(func)) {
          return await func.say(context, props);
        }
        const parameters = normalizeProps(
          additionalProps ? Object.assign({}, props, additionalProps) : props,
          context
        );
        const result = parameters ? await func(parameters) : await func();

        if (props && props.exports) {
          context[props.exports] = result;
        }
      } catch (error) {
        console.log(error);
      }
      
      if (children && children.length > 0) {
        await Story(children, context);
      }

      return context;
    }
  }
}

Word.isItAWord = word => !!word.say;