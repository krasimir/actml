import { normalizeProps, execute, processChildren } from '../../Word';
import Integration from './Integration';

export default function Subscribe(props) {
  if (props && props.type) {
    const removeListener = Integration.addListener(action => {
      if (action.type === props.type) {
        processChildren({ ...this, result: action });
        removeListener();
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}
Subscribe.pipeline = [
  normalizeProps,
  execute
];