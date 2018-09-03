export default async function Story(words, context) {
  let pointer = 0;

  while(pointer < words.length) {
    const word = words[pointer];

    await word.say(context);
    pointer++;
  }
  return context;
}