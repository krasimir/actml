import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import Header from './components/Header';
import { speak } from 'dactory';
import Logic from './logic';
import getPosts from './services/getPosts';

class App extends React.Component {
  render() {
    return (
      <Header />
    );
  }
}

ReactDOM.render(
  <Provider store={ createStore() }><App /></Provider>,
  document.querySelector('#content')
);

const context = {
  getPosts
}

speak(Logic, context);