import Word from './Word';

export default async function Story(words, context) {
  let pointer = 0;

  while(pointer < words.length) {
    const word = words[pointer];

    try {
      if (Word.isItAWord(word)) {
        await word.say(context);
      } else {
        console.log(word.toString());
      }
    } catch (error) {
      break;
    }
    pointer++;
  }
  return context;
}