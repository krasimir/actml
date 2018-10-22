import Integration from './Integration';

function SubscribeOnce({ children, type }) {
  if (type) {
    const removeListener = Integration.addListener(action => {
      if (action.type === type) {
        children(action);
        removeListener();
      }
    });
  } else {
    throw new Error('<SubscribeOnce> requires `type` prop.');
  }
}

export default SubscribeOnce;
