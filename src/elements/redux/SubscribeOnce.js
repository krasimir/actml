import Integration from './Integration';
import execute from '../../middlewares/execute';

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
SubscribeOnce.processor = [ execute ];

export default SubscribeOnce;
