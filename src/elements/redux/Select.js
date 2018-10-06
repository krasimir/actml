import Integration from './Integration';
import { isItAnElement } from '../../utils';

export default async function Select(props) {
  if (props && isItAnElement(props.selector)) {
    const s = await props.selector.run(this);
    return s(Integration.getState());
  }
  return props.selector(Integration.getState());
}