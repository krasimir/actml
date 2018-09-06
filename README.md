# Dactory :speak_no_evil: :factory: <!-- omit in toc -->

> **D**ialect  f**ACTORY**

---

- [The concept](#the-concept)
- [Installation and setup](#installation-and-setup)
- [Fundamentals](#fundamentals)
  - [Core API](#core-api)
  - [Order of execution](#order-of-execution)
  - [Everything is considered asynchronous](#everything-is-considered-asynchronous)
  - [Passing data around](#passing-data-around)
  - [Error handling](#error-handling)
  - [Branching your logic](#branching-your-logic)
  - [Livecycle hooks](#livecycle-hooks)
- [Build-in helpers](#build-in-helpers)
  - [Wrapper (`D`)](#wrapper-d)

---

## The concept

*Dactory* is a library that allows you to use React's transpiler for different purpose. React is a view layer. It takes care for the rendering part and the actual DOM. *Dactory* is opposite. It is dealing with the business logic of our applications. It allows us to write markup and basically create our own [dialect](https://en.wikipedia.org/wiki/Dialect) based on the [JSX syntax](https://facebook.github.io/jsx/).

```js
/** @jsx D */
import { D, speak } from 'dactory';

const Greeting = function({ name }) {
  console.log(`Hello dear ${name}!`);
};
const Text = function({ what }) {
  console.log(`Have in mind that, ${what}.`);
};

speak(
  <D>
    <Greeting name="Jon Snow" />
    <Text what="winter is coming" />
  </D>
);
/* Outputs:
Hello dear Jon Snow! 
Have in mind that, winter is coming.
*/
```

*You **must** add the `@jsx` comment at the top of your files. And you **must** import `D` function. Otherwise Dactory will not work.*

## Installation and setup

Grab the library by running `npm install dactory` or `yarn install dactory`. Dactory uses JSX as a base so you have to have some sort of [Babel](https://babeljs.io/repl/) transpilation setup. Check out the [examples](https://github.com/krasimir/dactory/tree/master/examples) folder to get an idea how to do it.

## Fundamentals

The code that we write follows the [JSX syntax](https://facebook.github.io/jsx/). You don't have to learn anything new. If you ever worked with React you already know how to write code that Dactory understands.

### Core API

The core API of Dactory is just two functions. `D` is the first one. Every tag that we write gets transpiled to `D()` calls similarly to `React.createElement`. The more interesting one is `speak`. It accepts a markup-like code which we will define as **dialect** and every tag inside as a **Word**. The dialect describes in a declarative fashion what our program does.

### Order of execution

The order of the execution is from top to bottom and from outer to inner words.

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

### Everything is considered asynchronous

The `speak` function is asynchronous. Dactory makes an assumption that all the words in our dialect are also asynchronous. For example:

```js
const Fetch = async function ({ url }) {
  return await fetch(url);
}
const App = function () {}

await speak(
  <App>
    <Fetch url="https://jsonplaceholder.typicode.com/posts" />
    <Fetch url="https://jsonplaceholder.typicode.com/users" />
  </App>
);
```

If there are multiple asynchronous functions they are executed one after each other. If you need to run something in parallel keep reading. There's a [built-in helper](#build-in-helpers) for that. 

### Passing data around

Every dialect gets executed with a given context. The context is just a plain JavaScript object. In fact the `speak` function accepts one as a second argument (by default set to `{}`). We also receive the context when the promise returned by `speak` is resolved. Which means that if we want to get something back we have to inject it into the context because that's the only one output of the `speak`'s call. This happens by using the special `exports` prop like so:

```js
const GetAnswer = async function () {
  // this gets assigned to `answer` prop in the context
  return 42;
};

speak(<GetAnswer exports="answer" />)
  .then(context => {
    console.log(context.answer); // 42
  });
```

Think about `exports` as something that defines a property in context. The value of that newly defined property is what our word returns.

Passing data between words happens by adding a prop with no value and same name. For example:

```js
const GetAnswer = async function() {
  return 42;
};
const Print = function({ answer }) {
  console.log(`The answer is ${answer}.`);
};
const App = function() {};

speak(
  <App>
    <GetAnswer exports="answer" />
    <Print answer />
  </App>
);
```

`GetAnswer` defines a property `answer` in our context which becomes `{ answer: 42 }`. Later `Print` _says_ "I need `answer` prop from the context.


That's not the only one way to pass data around. The [function as children pattern](https://github.com/krasimir/react-in-patterns/blob/master/book/chapter-4/README.md#function-as-a-children-render-prop) works here too:

```js
function GetTitle() {
  return 'developer';
}
function PrintUser({ title, name }) {
  console.log(`Hello ${name} ${title}!`);
}
function App() {
  return 'Boobooo';
}

speak(
  <App exports="name">
    <GetTitle>{ title => <PrintUser title={title} name /> }</GetTitle>
  </App>
);
```

`PrintUser` receives two props `title` and `name`. `title` comes from what `GetTitle` returns while `name` comes from the context.

It's just easier to write it as markup:

```js
speak(
  <App exports="name">
    <GetTitle exports="title">
      <PrintUser title name />
    </GetTitle>
  </App>
);
```

### Error handling

Because `speak` returns a promise we can just `catch` the error at a _global_ level:

```js
const Problem = function() {
  return iDontExist; // throws an error "iDontExist is not defined"
};
const App = function() {};

speak(
  <App>
    <Problem />
  </App>
).catch(error => {
  console.log('Ops, an error: ', error.message);
  // Ops, an error:  iDontExist is not defined
});
```

That's all fine but it is not really flexible. What we may want is to handle the error inside our dialect. In such cases we have the special `onError` prop. It accepts another dialect which receives the error as a prop.

```js
const Problem = function() {
  return iDontExist;
};
const App = function() {};
const HandleError = ({ error }) => console.log(error.message); // logs "iDontExist is not defined"

speak(
  <App>
    <Problem onError={ <HandleError /> } />
  </App>
);
```

Usually Dactory stops the execution of the current dialect. However, if our handler returns `true` it continues. For example:

```js
const Problem = function() {
  return iDontExist;
};
const App = function() {};
const HandleError = () => true;
const AfterError = () => console.log('I am still here :)');

await speak(
  <App exports='answer'>
    <Problem onError={ <HandleError /> } />
    <AfterError />
  </App>
);
// outputs "I am still here :)" even tho there's an error
```

And by stopping the execution we mean only the current branch of the dialect. For example:

```js
const Problem = function() {
  return iDontExist;
};
const App = function() {};
const Wrapper = function() {};
const HandleError = () => {};
const A = () => console.log('A');
const B = () => console.log('B');
const C = () => console.log('C');

await speak(
  <App exports='answer'>
    <Wrapper>
      <Problem onError={ <HandleError /> } />
      <A />
    </Wrapper>
    <Wrapper>
      <B />
      <C />
    </Wrapper>
  </App>
);
```

We will see `B` followed by `C` but not `A` because there's an error at that level.

### Branching your logic

Obviously we don't have a straight business logic. It has branches. Dactory has no API  for this. The first solution is the [function as children pattern](https://github.com/krasimir/react-in-patterns/blob/master/book/chapter-4/README.md#function-as-a-children-render-prop):

```js
function MyLogic({ answer }) {
  if (answer === 42) {
    return true;
  }
  return false;
}
function PrintCorrectAnswer() {
  console.log('Correct!');
}
function PrintWrongAnswer() {
  console.log('Wrong!');
}
function App() {}

await speak(
  <App>
    <MyLogic answer={ 42 }>
      {
        isCorrect => isCorrect ? <PrintCorrectAnswer /> : <PrintWrongAnswer />
      }
    </MyLogic>
  </App>
);

```

The [livecycle hooks](#livecycle-hooks) become also handy if we want to stop processing or prevent the running of nested words.

### Livecycle hooks

## Build-in helpers

### Wrapper (`D`)

So far in the examples above we had to define a wrapper function like `function App() {}`. Instead we can simply use `<D />`. For example:

```js
/** @jsx D */
import { D, speak } from 'dactory';

const Foo = function () {
  console.log(`Hello world!`);
}

speak(<D><Foo /></D>);
```