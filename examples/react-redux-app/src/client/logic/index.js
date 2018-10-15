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
      <Subscribe type={ NEW_POST }>
        {
          post => (
            <A>
              <addPost post={ post } />
              <FetchPosts />
            </A>
          )
        }        
      </Subscribe>
      <Subscribe type={ GET_DETAILS }>
        {
          ({ id }) => (
            <A>
              <getPost exports='postWithDetails' id={ id }/>
              <Action type={ UPDATE_POST } $postWithDetails='data' />
            </A>
          )
        }
      </Subscribe>
      <Subscribe type={ DELETE_POST }>
        {
          ({ id }) => (
            <A>
              <deletePost id={ id } />
              <FetchPosts />
            </A>
          )
        }
      </Subscribe>
    </A>,
    context
  )
}