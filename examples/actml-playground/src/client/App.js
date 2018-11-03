/** @jsx A */
import { A, run } from '../../../../src';

const GetHTMLElements = function () {
  return {
    step: document.querySelector('input'),
    button: document.querySelector('button'),
    counter: document.querySelector('p')
  };
};
const InitializeButton = function ({ controls: { button, step }, children }) {
  button.addEventListener('click', () => {
    children({ value: 10 });
  });
};
const UpdateCounter = function ({ controls: { counter }, value }) {
  console.log('a');
  //   counter.innerHTML = 'a';
};

run(
  <A>
    <GetHTMLElements exports="controls" />
    <InitializeButton $controls>
      (<UpdateCounter $value />)
    </InitializeButton>
  </A>
);
