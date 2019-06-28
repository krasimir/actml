/* eslint-disable react/prop-types */
/** @jsx A */
import { A } from '../../../src';

import { Container } from './DOM';

export default function Listener({ useElements }) {
  const { Publish } = useElements();

  return (
    <Container>
      {
        (type, todoIndex) => <Publish type={ type } payload={ todoIndex } />
      }
    </Container>
  );
}
