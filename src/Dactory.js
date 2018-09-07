import Word from './Word';
import Story from './Story';

export function create(func, props, ...children) {
  // using D as a dymmy component
  if (func === create) return Word(() => {}, props, children);
  return Word(func, props, children);
}
export async function speak(word, context = {}) {
  if (Word.isItAWord(word)) {
    if (Word.isItAWord(word.func)) {
      word.func.mergeToProps(word.props);
      return await Story([ word.func ], context);
    }
    return await Story([ word ], context);
  }
  return await Story([ create(word, null) ], context);
}