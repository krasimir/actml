import Integration from './Integration';
import Word from '../../Word';

export default async function Select(props) {
  if (props && Word.isItAWord(props.selector)) {
    const s = await props.selector.say(this.context);
    return s(Integration.getState());
  }
  return props.selector(Integration.getState());
}