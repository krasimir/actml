/* eslint-disable react/prop-types */
/** @jsx A */
import { A, usePubSub } from '../../../lib';

import { Container } from './DOM';

export default function Listener() {
  const { publish } = usePubSub();

  return <Container onUserAction={ publish } />;
}
