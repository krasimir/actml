import Integration from './Integration';

export default function SubscribeOnce(props) {
  this.pipeline.disable('children');
  if (props && props.type) {
    const removeListener = Integration.addListener(action => {
      if (action.type === props.type) {
        this.pipeline('children', action);
        removeListener();
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}