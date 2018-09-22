import Integration from './Integration';
import Element from '../../Element';

export default async function Select(props) {
  if (props && Element.isItAnElement(props.selector)) {
    const s = await props.selector.run(this);
    return s(Integration.getState());
  }
  return props.selector(Integration.getState());
}