/** @jsx D */
import { D, Redux } from 'dactory';
import {
  POSTS_LOADED,
  VIEW_DETAILS,
  NEW_POST
} from '../redux/constants';

const { Subscribe, Action } = Redux;

const ErrorHandler = () => true;
const FetchPosts = () => (
  <getPosts exports='posts'>
    <Action type={ POSTS_LOADED } $posts />
  </getPosts>
);

export default function StartUp() {
  return (
    <D>
      <FetchPosts />    
      <Subscribe type={ NEW_POST } exports='post'>
        <addPost $post />
        <FetchPosts />
      </Subscribe>
      <Subscribe type={ VIEW_DETAILS } exports={ ({ id }) => ({ id })}>
        <getPost $id />
      </Subscribe>
    </D>
  )
}