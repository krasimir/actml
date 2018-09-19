/** @jsx A */
import { A, Redux } from 'actml';
import {
  POSTS_LOADED,
  GET_DETAILS,
  NEW_POST,
  UPDATE_POST,
  DELETE_POST
} from '../redux/constants';

const { Subscribe, Action } = Redux;

const FetchPosts = () => (
  <getPosts exports='posts'>
    <Action type={ POSTS_LOADED } $posts />
  </getPosts>
);

export default function StartUp() {
  return (
    <A>
      <FetchPosts />    
      <Subscribe type={ NEW_POST } exports='post'>
        <addPost $post />
        <FetchPosts />
      </Subscribe>
      <Subscribe type={ GET_DETAILS } exports={ ({ id }) => ({ id })}>
        <getPost $id exports='postWithDetails'/>
        <Action type={ UPDATE_POST } $postWithDetails='data' />
      </Subscribe>
      <Subscribe type={ DELETE_POST } exports={ ({ id }) => ({ id })}>
        <deletePost $id />
        <FetchPosts />
      </Subscribe>
    </A>
  )
}