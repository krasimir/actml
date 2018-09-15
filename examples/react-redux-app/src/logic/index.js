/** @jsx D */
import { D, Redux } from 'dactory';
import { GET_POSTS } from '../redux/constants';

const { Subscribe } = Redux;

function Test(props) {
  console.log(props);
}

export default function StartUp() {
  return (
    <Subscribe type={ GET_POSTS } exports='action'>
      <Test $action />
    </Subscribe>
  )
}