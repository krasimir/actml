import Integration from './Integration';

export default function SubscribeOnce(props) {
  this.pipeline.disable('result');
  this.pipeline.disable('children');
  if (props && props.type) {
    const removeListener = Integration.addListener(action => {
      if (action.type === props.type) {
        this.pipeline('result', action);
        this.pipeline('children', action);
        removeListener();
      }
    });
  } else {
    throw new Error('<SubscribeOnce> requires `type` prop.');
  }
}