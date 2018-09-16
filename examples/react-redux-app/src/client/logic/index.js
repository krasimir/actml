/** @jsx D */
import { D, Redux } from 'dactory';
import {
  POSTS_LOADED,
  GETTING_POSTS_FAILED,
  NEW_POST
} from '../redux/constants';

const { Subscribe, Action } = Redux;

const ErrorHandler = () => true;
const FetchPosts = () => (
  <getPosts exports='posts' onError={
    <ErrorHandler>
      <Action type={ GETTING_POSTS_FAILED }/>
    </ErrorHandler>
  }>
    <Action type={ POSTS_LOADED } $posts />
  </getPosts>
);

export default function StartUp() {
  return (
    <D>
      <FetchPosts />    
      <Subscribe type={ NEW_POST } exports='newPostAction'>
        <Log $newPostAction />
        <addPost $newPostAction='data' />
        <FetchPosts />
      </Subscribe>
    </D>
  )
}