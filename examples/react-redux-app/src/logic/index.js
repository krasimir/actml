/** @jsx D */
import { D, Redux } from 'dactory';
import { GET_POSTS } from '../redux/constants';

const { Subscribe } = Redux;

const GetPosts = async function({ getPosts }) {
  return await getPosts();
}
const Print = function({ data }) {
  console.log(data);
}

export default function StartUp() {
  return (
    <D>
      <Subscribe type={ GET_POSTS }>
        <GetPosts $getPosts exports='posts' />
        <Print $posts='data' />
      </Subscribe>
    </D>
  )
}