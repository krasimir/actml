import Integration from './Integration';
import Actor from '../../Actor';

export default async function Select(props) {
  if (props && Actor.isItAnActor(props.selector)) {
    const s = await props.selector.run(this.context);
    return s(Integration.getState());
  }
  return props.selector(Integration.getState());
}