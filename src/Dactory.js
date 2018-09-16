import Word from './Word';
import { createContext } from './Context';

export function create(func, props, ...children) {
  // using D as a dymmy component
  if (func === create) return Word(function() { return this.context; }, props, children);
  return Word(func, props, children);
}
export async function speak(word, contextData) {
  const context = createContext(contextData);

  if (Word.isItAWord(word)) {
    if (Word.isItAWord(word.func)) {
      word.func.mergeToProps(word.props);
      return await word.func.say(context);
    }
    return await word.say(context);
  }
  return await create(word, null).say(context);
}