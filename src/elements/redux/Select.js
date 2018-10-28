import Integration from './Integration';

export default async function Select(props) {
  return props.selector(Integration.getState());
}
