import Integration from './Integration';

async function Subscribe({ children, type }) {
  const { exports } = this.props;

  if (type) {
    Integration.addListener(action => {
      if (action.type === type) {
        children(action);
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}
Subscribe.ignoreChildren = true;

export default Subscribe;