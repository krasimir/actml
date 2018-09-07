import Word from './Word';

export default async function Story(words, context, parallelProcessing = false) {
  let pointer = 0;

  while(pointer < words.length) {
    const word = words[pointer];

    try {
      if (parallelProcessing) {
        word.say(context);
      } else {
        await word.say(context);
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
  return context;
}