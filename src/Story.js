export default async function Story(words, context) {
  let pointer = 0;

  while(pointer < words.length) {
    const word = words[pointer];

    try {
      await word.say(context);
    } catch (error) {
      break;
    }
    pointer++;
  }
  return context;
}