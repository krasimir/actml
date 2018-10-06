import Integration from './Integration';
import execute from '../../middlewares/execute';

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
Subscribe.processor = [ execute ];

export default Subscribe;