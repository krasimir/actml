import Integration from './Integration';

async function Subscribe({ children, type }) {
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

export default Subscribe;