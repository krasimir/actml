/** @jsx D */
import { D, Redux } from 'dactory';
import { GET_POSTS, GETTING_POSTS_FAILED } from '../redux/constants';

const { Subscribe, Action } = Redux;

const ErrorHandler = () => true;

export default function StartUp() {
  return (
    <D>
      <Subscribe type={ GET_POSTS }>
        <getPosts exports='posts' onError={
          <ErrorHandler>
            <Action type={ GETTING_POSTS_FAILED }/>
          </ErrorHandler>
        }/>
      </Subscribe>
      <Subscribe type={ GETTING_POSTS_FAILED }>
        
      </Subscribe>
    </D>
  )
}