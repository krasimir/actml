# Dactory

> **D**ialect  f**ACTORY**

---

*Dactory* is a library that allows you to use React's transpiler for different purpose. React is our view layer. It takes care for the rendering part. *Dactory* is opposite. It is dealing with the business logic of our applications. It allows us to write our own [dialect](https://en.wikipedia.org/wiki/Dialect) based on the [JSX syntax](https://facebook.github.io/jsx/).

```js
/** @jsx dialect */
import { dialect, speak } from 'dactory';

const Foo = function ({ name }) {
  console.log(`Hello dear ${ name }!`);
}

speak(<Foo name='programmer'/>); // Hello dear programmer!
```

*You **must** add the `@jsx` comment at the top of your files. And you **must** import `dialect` function. Otherwise Dactory will not work.*

## How it works

The code that we write follows the [JSX syntax](https://facebook.github.io/jsx/). You don't have to learn anything new. If you ever worked with React you already know how to write code that Dactory understands. Grab the library by running `npm install dactory` or `yarn install dactory` and you are ready to go. Dactory assumes that you already have setup that transpiles JSX.

### Core API

The core API of Dactory is just two functions. `dialect` is the first one and it is not used directly. Every tag that we write gets transpiled to `dialect()` calls similarly to `React.createElement`. The more interesting one is `speak`. It accepts a markup-like code which we will define as **dialect**. The dialect describes in a declarative fashion what our program must do.

### Order of execution

The order of the execution is from top to bottom and from outer to inner element.

```js
const Foo = () => console.log('Foo');
const Bar = () => console.log('Bar');
const Mar = () => console.log('Mar');

speak(
  <Foo>
    <Bar />
    <Mar />
  </Foo>
);

/* Outputs:
Foo 
Bar 
Mar
*/
```

### Handling asynchronous processes

The `speak` function is always asynchronous. It returns a promise. The dialect that we pass could be also made of asynchronous functions. Like for example:

```js
const Fetch = async ({ url }) => (await fetch(url)).json();
const App = () => {};

await speak(
  <App>
    <Fetch url="https://jsonplaceholder.typicode.com/posts" />
    <Fetch url="https://jsonplaceholder.typicode.com/users" />
  </App>
);
```

If there are multiple asynchronous functions they are executed one after each other. If you need to run something in parallel keep reading. There's a built-in helper for that. 

### Passing data around

Every dialect gets executed with a given context. The context in Dactory is just a plain JavaScript object. The `speak` function accepts one as a second argument and we also receive it when the promise returned by `speak` is resolved. Which means that if want to get something back we have to inject it into the context because that's the only one output of the `speak`'s call. This happen by using the special `export` prop like so:

```js
const GetSettings = async () => {
  return { answer: 42 };
};

speak(<GetSettings exports="settings" />)
  .then(context => {
    console.log(context.settings.answer); // 42
  });
```

Passing data between functions happens by adding a prop with no value and same name. For example:

```js
const GetSettings = async () => {
  return { answer: 42 };
};
const Print = ({ settings }) => {
  console.log(`The answer is ${settings.answer}.`);
}
const App = () => {};

speak(
  <App>
    <GetSettings exports="settings" />
    <Print settings />
  </App>
);
```