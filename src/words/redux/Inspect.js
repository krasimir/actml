import Integration from './Integration';

export default function Inspect(props) {
  const inspection = {
    numOfSubscribes: Integration._listeners.length
  }
  this.pipeline('children', inspection);
}