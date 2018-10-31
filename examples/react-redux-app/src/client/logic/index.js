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
    <A>
      <FetchPosts />
      <Subscribe type={ NEW_POST }>
        {
          ({ action }) => {
            return (<A>
              <addPost post={ action } />
              <FetchPosts />
            </A>);
          }
        }
      </Subscribe>
      <Subscribe type={ GET_DETAILS }>
        {
          ({ action }) => (
            <A>
              <getPost exports='postWithDetails' id={ action.id }/>
              <Action type={ UPDATE_POST } $postWithDetails='data' />
            </A>
          )
        }
      </Subscribe>
      <Subscribe type={ DELETE_POST }>
        {
          ({ action }) => (
            <A>
              <deletePost id={ action.id } />
              <FetchPosts />
            </A>
          )
        }
      </Subscribe>
    </A>,
    context
  );
}
