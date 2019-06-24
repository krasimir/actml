/* eslint-disable no-unused-vars */
/** @jsx A */
import { A } from 'actml';

import { Container } from './DOM';

export default function * Listener({ usePubSub }) {
  const [ subscribe, publish ] = usePubSub();
  const container = yield <Container />;

  container.addEventListener('click', (e) => {
    const todoIndex = parseInt(e.target.getAttribute('data-index'), 10);
    const type = e.target.getAttribute('data-action');

    publish(type, todoIndex);
  });
}
