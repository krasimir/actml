import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux/selectors';
import { getDetails, deletePost } from '../redux/actions';

function Header({ posts, getDetails, deletePost }) {
  let message = '...';
  let List;

  if (posts) {
    message = `Total posts: ${ posts.length }`
    List = (
      <ul>
        {
          posts.map(({ id, title, text }) => (
            <li key={ id }>
              { title }
              { text && text }
              <button onClick={ () => getDetails(id) }>
                view details
              </button>
              <button onClick={ () => deletePost(id) }>
                delete
              </button>
            </li>
          ))
        }
      </ul>
    )
  }
  return (
    <header>
      { message }
      { List }
      <hr />
    </header>
  );
}

export default connect(
  state => ({
    posts: getPosts(state)
  }),
  dispatch => ({
    getDetails: id => dispatch(getDetails(id)),
    deletePost: id => dispatch(deletePost(id))
  })
)(Header);