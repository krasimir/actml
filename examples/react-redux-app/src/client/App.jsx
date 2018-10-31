import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import Header from './components/Header';
import NewPost from './components/NewPost';
import logic from './logic';
import { getPosts, addPost, getPost, deletePost } from './services/posts';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NewPost />
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={ createStore() }><App /></Provider>,
  document.querySelector('#content')
);

logic({
  getPosts: getPosts('/api/posts'),
  addPost: addPost('/api/post'),
  getPost: getPost('/api/post/'),
  deletePost: deletePost('/api/post/')
});
