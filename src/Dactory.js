import Word from "./Word";
import Story from './Story';

export function create(func, props, ...children) {
  // using D as a dymmy component
  if (func === create) return Word(() => {}, props, children);

  return Word(func, props, children);
}
export async function speak(word, context = {}) {
  return await Story([ word ], context);
}