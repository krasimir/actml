![ActML](assets/logo.jpg)

# ActML

> :dizzy: ActML is a library that allows you to use JSX syntax outside of React world. It aims to provide the same experience in terms of composability and patterns. :dizzy: 

```javascript
/** @jsx A */
import { A, run } from 'actml';

const Greeting = ({ name }) => {
	return `Hello ${ name },`;
}
const Question = ({ likes }) => {
  const randomItem = likes[Math.floor(Math.random() * likes.length)];
	return `Do you want some ${ randomItem }?`;
}
const Message = ({ user, children }) => {
	children(user).forEach(message => console.log(message));
}

run(
  <Message user={ { name: 'Emma', likes: ['coffee', 'cake', 'ice cream'] } }>
    <Greeting />
    <Question />
  </Message>
);
// Hello Emma,
// Do you want some <random item>?
```

(Try it yourself [here](https://poet.codes/e/XD26EjK9ECK).)

---

* [Installation](#installation)

---

## Installation

* `npm i actml` or `yarn install actml`
* ActML uses JSX so you need to have some sort of [Babel](https://babeljs.io) integration (or any other transpiler that understands [JSX](https://facebook.github.io/jsx/))
* ActML requires you to add `/** @jsx A */` at the top of the file. Otherwise the ActML elements will be transpiled to `React.createElement`

## 


