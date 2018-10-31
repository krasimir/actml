import React from 'react';
import { connect } from 'react-redux';
import { addPost } from '../redux/actions';

class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: ''
    };
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }
  onChangeText(e) {
    this.setState({ text: e.target.value });
  }
  onSubmit() {
    this.props.submit(this.state.title, this.state.text);
    this.setState({ title: '', text: '' });
  }
  render() {
    return (
      <div>
        <input
          type='text'
          value={ this.state.title }
          placeholder='title'
          onChange={ this.onChangeTitle } />
        <input
          type='text'
          value={ this.state.text }
          placeholder='text'
          onChange={ this.onChangeText }/>
        <button onClick={ this.onSubmit }>save</button>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    submit: (title, text) => dispatch(addPost(title, text))
  })
)(NewPost);
