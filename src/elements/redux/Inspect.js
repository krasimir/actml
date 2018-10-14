import Integration from './Integration';

export default function Inspect({ children }) {
  const inspection = {
    numOfSubscribes: Integration._listeners.length
  }
  children(inspection);
}