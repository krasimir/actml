/** @jsx D */
import { D, Redux } from 'dactory';
import { GET_POSTS } from '../redux/constants';

const { Subscribe } = Redux;

const Print = function({ data }) {
  console.log(data);
}
const ErrorHandler = () => true;
const UseFakeData = function() {
  return [{foo:'bar'}];
}

export default function StartUp() {
  return (
    <D>
      <Subscribe type={ GET_POSTS }>
        <getPosts exports='posts' onError={ <ErrorHandler><UseFakeData exports='posts'/></ErrorHandler> }/>
        <Print $posts='data' />
      </Subscribe>
    </D>
  )
}