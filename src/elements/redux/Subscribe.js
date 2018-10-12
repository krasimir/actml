import Integration from './Integration';
import execute from '../../middlewares/execute';

async function Subscribe({ children, type }) {
  const { exports } = this.props;

  if (type) {
    Integration.addListener(action => {
      if (action.type === type) {
        if (exports && typeof exports === 'string') {
          children({ [exports]: action });
        } else {
          children({ action });
        }
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}
Subscribe.processor = [ execute ];

export default Subscribe;