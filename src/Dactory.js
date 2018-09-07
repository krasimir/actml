import Word from './Word';

export function create(func, props, ...children) {
  // using D as a dymmy component
  if (func === create) return Word(() => {}, props, children);
  return Word(func, props, children);
}
export async function speak(word, context = {}) {
  if (Word.isItAWord(word)) {
    if (Word.isItAWord(word.func)) {
      word.func.mergeToProps(word.props);
      await word.func.say(context);
      return context;
    }
    await word.say(context);
    return context;
  }
  await create(word, null).say(context);
  return context;
}