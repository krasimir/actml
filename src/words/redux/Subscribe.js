import Integration from './Integration';

export default function Subscribe(props) {
  this.pipeline.disable('children');
  if (props && props.type) {
    Integration.addListener(action => {
      if (action.type === props.type) {
        this.pipeline('children', action);
      }
    });
  } else {
    throw new Error('<Subscribe> requires `type` prop.');
  }
}