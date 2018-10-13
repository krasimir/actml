/** @jsx A */
import { A, run, Redux } from 'actml';
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

export default function StartUp(context) {
  run(
    <A debug>
      <FetchPosts />    
      <Subscribe type={ NEW_POST } exports='post'>
        <addPost $post />
        <FetchPosts />
      </Subscribe>
      <Subscribe type={ GET_DETAILS }>
        <getPost exports='postWithDetails' $action={ ({ id }) => ({ id })}/>
        <Action type={ UPDATE_POST } $postWithDetails='data' />
      </Subscribe>
      <Subscribe type={ DELETE_POST }>
        <deletePost $action={ ({ id }) => ({ id })} />
        <FetchPosts />
      </Subscribe>
    </A>,
    context
  )
}