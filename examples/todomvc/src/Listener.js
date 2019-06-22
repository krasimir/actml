/** @jsx A */
import { A } from 'actml';

import { Container } from './DOM';

export default function * Listener({ useChildren }) {
  const [ children ] = useChildren();
  const container = yield <Container />;

  container.addEventListener('click', (e) => {
    const todoIndex = parseInt(e.target.getAttribute('data-index'), 10);
    const type = e.target.getAttribute('data-action');

    children({
      action: { type, todoIndex }
    });
  });
}
