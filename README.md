# &lt;ActML /> :rocket: <!-- omit in toc -->

> You know what I really like in React - it teaches you how to build well encapsulated components that are also highly composable. The thing is that React and its JSX is for our UI. It is a view layer that renders stuff on the screen. I want something similar but for my business logic. Something that allows me to use the same patterns but helps me deal with the asynchronous nature of the front-end development. So, I did it. Meet **ActML** - like React but for your business logic. 

- [Concept](#concept)
- [What you need to use ActML](#what-you-need-to-use-actml)
- [What is an ActML element](#what-is-an-actml-element)
- [Getting in and out of your function/element](#getting-in-and-out-of-your-functionelement)
- [Context API](#context-api)
  - [Setting in and getting out from the context](#setting-in-and-getting-out-from-the-context)
  - [Setting initial context value](#setting-initial-context-value)
  - [Using the context API as a dependency management tool](#using-the-context-api-as-a-dependency-management-tool)
- [Predefined elements](#predefined-elements)
  - [Running elements in parallel](#running-elements-in-parallel)
- [Examples](#examples)

## Concept

Wouldn't be cool if we can define a function and execute it the same way as we render React component. Like for example:

```js
const Greeting = function () {
  return 'Hey!';
}

run(<Greeting />).then(
  message => console.log(message)
);
```

What if we have more functions, they depend on each other and some of them are asynchronous:

```js
const Greeting = function({ name }) {
  return `Hey ${name}!`;
};
async function GetProfile() {
  const response = await fetch('https://reqres.in/api/users/2');
  const { data: { first_name, last_name } } = await response.json();

  return first_name + ' ' + last_name;
}
function Print({ message }) {
  console.log(message);
}

run(
  <A>
    <GetProfile exports="name" />
    <Greeting $name>
      { message => <Print message={message} /> }
    </Greeting>
  </A>
);
```

Isn't it like writing React? Let's see step by step what ActML does.

1. The `<A>` element is just a wrapper.
2. `<GetProfile>` is an asynchronous function so ActML waits till the function is done. `<GetProfile>` also returns a result and has `exports` prop defined. That is a special prop which is saying "Export a variable with name "name" and make it available for other elements".
3. `<Greeting>` needs the name of the user and uses the special dollar sign annotation which to ActML processor means "Inject a variable with name "name" as a prop".
4. `<Greeting>` also has a function as child component and it sends its result there which in our case is the full message to the user.
5. `<Print>` just gets the message and prints it out in the console.

## What you need to use ActML

ActML uses React's JSX transpiler to convert markup to function calls. By default the transpiler translates every tag to a `React.createElement` call so to make your code works with ActML you have to add

```js
/** @jsx A */
import { A } from 'actml';
```

The first line is to say to the transpiler that we don't want `React.createElement()` but `A()`. The second line is there because otherwise you'll get `ReferenceError: A is not defined` error. And of course because the `A` function is defining the core unit of ActML - an ActML element.

From a tools perspective you need some sort of [Babel](https://babeljs.io/docs/en/babel-preset-react) integration. There's a Redux+ActML example app [here](https://github.com/krasimir/actml/tree/master/examples/react-redux-app) that you can check out.

## What is an ActML element

In the context of ActML the _element_ is a JavaScript function. The code below defines two different ActML elements:

```js
/** @jsx A */
import { A, run } from 'actml';

const Foo = function () { console.log('Foo'); }
const Bar = function () { console.log('Bar'); }

run(
  <A>
    <Foo />
    <Bar />
  </A>
);
// > Foo
// > Bar
```

To be more specific the element may be three things:

* A function
* An asynchronous function
* A generator

In general ActML runner assumes that every of the elements is asynchronous. It executes the functions from the outer to inner ones and from top to bottom. All the three types of elements may return another element. In the case of generator we may `yield` also another element. For example:

```js
function Print({ message }) {
  console.log(message);
}
async function GetSeason({ endpoint }) {
  const result = await fetch(endpoint);
  const { season } = await result.json();
  return season;
}
function * Logic() {
  const season = yield (
    <GetSeason endpoint="https://www.mocky.io/v2/5ba2a2b52f00006a008d2e0d" />
  );
  if (season === 'not summer') {
    yield <Print message="No beach!" />;
  } else {
    yield <Print message="Oh yeah!" />;
  }
}

run(<Logic />); // prints out: No beach!
```

## Getting in and out of your function/element

The input to your ActML is the attributes that we pass to the tag. They come as `props` to your function. For example:

```js
const Foo = function (props) {
  console.log(`Hello ${ props.name }`);
}

run(<Foo name='John' />); // outputs "Hello John"
```

The output or in other words the returned value of your element is available to its children via the [FACC (function as children pattern)](https://github.com/krasimir/react-in-patterns/blob/master/book/chapter-4/README.md#function-as-a-children-render-prop):

```js
const Foo = function (props) {
  return `Hello ${ props.name }`;
}

run(
  <Foo name='John'>
    { message => console.log(message) }
  </Foo>
);
// outputs again "Hello John"
```

Also the returned by a function value gets injected into the ActML's runner context and it can be fetched from there via the context API.

## Context API

Using the FACC pattern everywhere is not very convenient. So, there's a context object which is shared through all the elements in the currently executed set of elements. Think about it as a JavaScript object with `set` and `get` method. In one side we are registering stuff inside by using the `set` method and from another we are getting them using the `get` method.

### Setting in and getting out from the context

In order to register a variable inside the context we have to use the special prop `exports`. As a value we add the name of our variable. For example:

```js
const IKnowTheAnswer = function () {
  return 42;
}
const Print = function ({ answer }) {
  console.log(`The answer is ${ answer }`);
}

run(
  <A>
    <IKnowTheAnswer exports='answer' />
    <Print $answer />
  </A>
);
```

`exports='answer'` creates a variable with name `answer` and value whatever `IKnowTheAnswer` returns. Then later we use the `$` (dollar sign) plus the name of the variable to inject its value to the `Print` function.

Sometimes we don't want to use the same name of a variable so we can change it by setting an attribute value:

```js
const Print = function ({ data }) {
  console.log(`The answer is ${ data }`);
}

run(
  <A>
    <IKnowTheAnswer exports='answer' />
    <Print $answer='data' />
  </A>
);
```

We can go even further and provide a function which receives the value and returns a props object:

```js
const IKnowTheAnswer = function() {
  return 42;
};
const Print = function({ message }) {
  console.log(`The answer is ${message}`);
};
const formatMessage = a => ({
  message: a < 50 ? 'less then 50' : 'more then 50'
});

run(
  <A>
    <IKnowTheAnswer exports="answer" />
    <Print $answer={ formatMessage } />
  </A>
);
// Prints out: The answer is less then 50
```

### Setting initial context value

The `run` function accepts a second argument which is the initial state of the context. We can pass an object in the format of key-value pairs.

```js
const Print = function({ name }) {
  console.log(`Hello ${name}`);
};
const initialContext = {
  name: 'David'
};

run(<Print $name />, initialContext);
// Prints out: Hello David
```

### Using the context API as a dependency management tool

Because the context is available in every element we may use it to deliver dependencies. It works not only with variables but also with other elements. For example:

```js
// context.js
const initialContext = {
  async getSeason({ endpoint }) {
    const result = await fetch(endpoint);
    const { season } = await result.json();
    return season;
  },
  print({ season }) {
    console.log(`The season is ${season}`);
  }
};
export default initialContext;


// App.js
import initialContext from './context.js';

run(
  <A>
    <getSeason endpoint="https://www.mocky.io/v2/5ba2a2b52f00006a008d2e0d">
      { season => <print season={season} /> }
    </getSeason>
  </A>,
  initialContext
);
// Prints out: The season is not summer 
```

Notice how `getSeason` and `print` are only defined in the context and they don't exist in `App.js`. And here we have to mention that this is only possible because of the JSX transpiler. They both should start with a lowercase letter. That is really important because:

```js
<getSeason />
```

gets transpiled to

```js
A("getSeason", null);
```

while

```js
<GetSeason />
```

to

```js
A(GetSeason, null);
```

In the second case there **must** be a function `GetSeason` while in the first case there's just a string `getSeason` passed to ActML runner.

## Predefined elements

There are some predefined elements that come with ActML core package.

### Running elements in parallel

```js
import { A, run, Parallel } from 'actml';

const Z = await function () { ... }
const M = function () { ... }

run(<Parallel><Z /><M /></Parallel>);
```

`Z` and `M` run in parallel which means that `M` is not waiting for `Z` to finish.

## Examples

* [Codesandbox](https://codesandbox.io/s/qx667yqvj9)
* [React+Redux+ActML app](https://github.com/krasimir/actml/tree/master/examples/react-redux-app)
