import Word from './Word';

export default async function Story(words, context, parallelProcessing = false) {
  let pointer = 0;

  while(pointer < words.length) {
    const word = words[pointer];

    try {
      if (Word.isItAWord(word)) {
        if (parallelProcessing) {
          word.say(context);
        } else {
          await word.say(context);
        }
      } else {
        await Story([ Word(word, null) ], context);
      }
    } catch (error) {
      break;
    }
    pointer++;
  }
  return context;
}