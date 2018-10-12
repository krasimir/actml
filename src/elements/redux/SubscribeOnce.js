import Integration from './Integration';
import execute from '../../middlewares/execute';

function SubscribeOnce({ children, type }) {
  const { exports } = this.props;

  if (type) {
    const removeListener = Integration.addListener(action => {
      if (action.type === type) {
        if (exports && typeof exports === 'string') {
          children({ [exports]: action });
        } else {
          children({ action });
        }
        removeListener();
      }
    });
  } else {
    throw new Error('<SubscribeOnce> requires `type` prop.');
  }
}
SubscribeOnce.processor = [ execute ];

export default SubscribeOnce;
