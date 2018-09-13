import Integration from './Integration';
import Word from '../../Word';

export default async function Select({ selector }) {
  if (Word.isItAWord(selector)) {
    const s = await selector.say(this.context);
    return s(Integration.getState());
  }
  return selector(Integration.getState());
}