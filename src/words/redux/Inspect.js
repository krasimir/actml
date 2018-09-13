import { normalizeProps, execute, processChildren } from '../../Word';
import Integration from './Integration';

export default function Inspect(props) {
  const inspection = {
    numOfSubscribes: Integration._listeners.length
  }
  processChildren({ ...this, result: inspection });
}
Inspect.pipeline = [
  normalizeProps,
  execute
];