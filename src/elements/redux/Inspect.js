import Integration from './Integration';
import execute from '../../middlewares/execute';

export default function Inspect({ children }) {
  const inspection = {
    numOfSubscribes: Integration._listeners.length
  }
  children(inspection);
}
Inspect.processor = [ execute ];