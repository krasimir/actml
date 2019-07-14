![ActML](assets/logo.jpg)

# ActML

> :dizzy: ActML is a library that allows you to use JSX syntax outside of React world. It aims to provide the same experience in terms of composability and patterns.

```js
/** @jsx A */
import { A, run } from 'actml';

const Greeting = ({ name }) => {
  return `Hello ${ name }!`;
}
const Message = ({ user, children }) => {
  console.log(children(user));
}

run(
  <Message user={ { name: 'Emma' } }>
    <Greeting />
  </Message>
);
// Hello Emma!
```

(Try it yourself [here](https://poet.codes/e/XD26EjK9ECK).)

---

* [Basics](#basics)
* [Installation](#installation)

---

## Basics

ActML looks like [React](https://reactjs.org/) but it's not about rendering UI. It's just about executing your JavaScript.

```js
const Answer = () => 42;
run(<Answer />); // 42
```

So, why the hell I'll bring this language and instead of `Answer()` I do `<Answer />`? Well, same reason why you do `<Component />` instead of `React.createElement(Component, null)`.

## Installation

* `npm i actml` or `yarn install actml`
* ActML uses JSX so you need to have some sort of [Babel](https://babeljs.io) integration (or any other transpiler that understands [JSX](https://facebook.github.io/jsx/))
* ActML requires you to add `/** @jsx A */` at the top of the file. Otherwise the ActML elements will be transpiled to `React.createElement`

## 


