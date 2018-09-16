import React from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions';

function Header({ getPosts }) {
  return <button onClick={ getPosts }>Get posts</button>;
}

export default connect(
  null,
  dispatch => ({
    getPosts: () => dispatch(getPosts())
  })
)(Header);