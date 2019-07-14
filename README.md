![ActML](assets/logo.jpg)

# ActML

> :dizzy: ActML is a library that allows you to use JSX syntax outside of React world. It aims to provide the same experience in terms of composability and patterns.

```js
/** @jsx A */
import { A, run } from 'actml';

const Message = ({ user, children }) => {
  console.log(children(user));
}
const Greeting = (user) => {
  return `Hello ${ user.name }!`;
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
  * [Children](#children)
  * [Asynchronous](#asynchronous)
* [Installation](#installation)
* [API](#api)
  * [useState](#usestate)
  * [useEffect](#useeffect)

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

### Asynchronous

ActML runtime supports both asynchronous and synchronous elements. You can mix them in a single expression. As soon as there is something asynchronous ActML marks the call as such and the result of it is a promise. For example:

```js
const App = async ({ children }) => {
  const message = await children();
  
  return message.join(' ');
}
const Greeting = () => 'Hey';
const GetUserFirstName = async () => {
  const { data: { first_name }} = await (await fetch('https://reqres.in/api/users/2')).json();
  return first_name;
}
const FavoriteColor = () => 'your favorite color is';
const GetFavoriteColor = async () => {
  const { data: { color }} = await (await fetch('https://reqres.in/api/products/3')).json();
  return color;
}

run(
  <App>
    <Greeting />
    <GetUserFirstName />
    <FavoriteColor />
    <GetFavoriteColor />
  </App>
).then(message => console.log(message));

// outputs: Hey Janet your favorite color is #BF1932
```

(online demo [here](https://poet.codes/e/ZLOngMd8liP))

Notice that `<Greeting>` and `<FavoriteColor>` are synchronous. ActML waits for all the children to be processed and they resolves the promise returned by the `children` call. If all the elements were synchronous they we'll get an array straight away.

## Installation

* `npm i actml` or `yarn install actml`
* ActML uses JSX so you need to have some sort of [Babel](https://babeljs.io) integration (or any other transpiler that understands [JSX](https://facebook.github.io/jsx/))
* ActML requires you to add `/** @jsx A */` at the top of the file. Otherwise the ActML elements will be transpiled to `React.createElement`

## API

### useState

```js
import { A, useState } from 'actml';

const E = () => {
  const [ setState, getState ] = useState(initialState);
}
```

Returns two functions for setting and retrieving a state value. In the original [React docs](https://reactjs.org/docs/hooks-reference.html#usestate) the first item is the state value directly but here ActML diverges a little bit by providing a function. It is done to provide a mechanism for immediate retrieval of the update value.

### useEffect

```js
import { A, useEffect } from 'actml';

const E = () => {
  useEffect(function sideEffect() {
    // ...
    return function onElementRemoved() {
      // ...
    }
  }, [ dependencyA, dependencyB ]);
}
```

The function `sideEffect` is fired after the function `E` finishes. After that it gets fired only if some of the `dependencyA` or `dependencyB` are changed. If we pass an empty array we are creating a side effect that is fired only once no matter how many times `E` is executed. The function that we pass to `useEffect` may return another function that is invoked when the element is removed from the tree.

_ActML's `useEffect` mimics [React's `useEffect`](https://reactjs.org/docs/hooks-reference.html#useeffect)_

### useReducer

```js
import { A, useEffect } from 'actml';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}
const E = function () {
  const [ getState, dispatch ] = useReducer(reducer, initialState);
  //...
  dispatch({ type: 'increment' })
}
```

Very similar to [`useState`](#usestate). In fact `useReducer` internally uses `useState. The mechanism for updating the state is by using actions which are `dispatch`ed and then processed by the `reducer` which returns the new version of the state.

_ActML's `useReducer` mimics [React's `useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer)_