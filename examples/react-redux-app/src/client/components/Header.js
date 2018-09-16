import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux/selectors';

function Header({ posts }) {
  let message = '...';
  let List;

  if (posts) {
    message = `Total posts: ${ posts.length }`
    List = (
      <ul>
        {
          posts.map(({ id, title }) => (
            <li key={ id }>{ title }</li>
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
  })
)(Header);