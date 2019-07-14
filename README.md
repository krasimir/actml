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
const Foo = () => 'bar';
run(<Foo />); // bar
```

You'll probably wonder why using ActML and instead writing `Foo()` we do `<Foo />`? The answer is same reason we you do `<Component />` instead of `React.createElement(Component, null)`. We are declarative instead of imperative. It's much better to say what we want to happen instead of how it happens. Being declarative means having more options for composition.

### Children

Every function run by ActML receives a `children` prop. Similarly to React that prop represents the children of the element. Here we have two use case - we can call `children` as a function or we can return it as a result.

```js
const X = ({ children }) => {
  children();
  children();
};
const Y = ({ children }) => {
  return children;
}
const Message = () => {
 	console.log('Hello') 
};
run(<X><Message /></X>); // prints Hello twice
run(<Y><Message /></Y>); // prints Hello once
```

If we are calling `children` we are getting back an array containing the results of the nested elements.

```js
const X = () => 'foo';
const Y = () => 'bar';
const Results = ({ children }) => {
	console.log(JSON.stringify(children()));
};
run(<Results><X /><Y /></Results>); // prints ["foo","bar"]
```

## Installation

* `npm i actml` or `yarn install actml`
* ActML uses JSX so you need to have some sort of [Babel](https://babeljs.io) integration (or any other transpiler that understands [JSX](https://facebook.github.io/jsx/))
* ActML requires you to add `/** @jsx A */` at the top of the file. Otherwise the ActML elements will be transpiled to `React.createElement`

## 


