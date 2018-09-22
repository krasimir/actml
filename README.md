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

If you are old enough you'll remember the times when we were writing all of our JavaScript in a single file. Most of the time our logic was placed in the global scope with no ideas for architecture or separation. And it was fine because JavaScript was just sugar on top of HTML and CSS. Today is completely different. We put our logic in functions/classes and we organize them in a giant graph with dozen of branches. Let's take the following code snippet.

```js
async function getSeason(endpoint) {
  const result = await fetch(endpoint);
  const { season } = await result.json();
  return season;
}
async function getMySchedule(endpoint) {
  return (await getSeason(endpoint)) === 'summer' ? '🌴🍨🏄' : '⏰☕️💻';
}
async function amIGoingToTheBeach() {
  const schedule = await getMySchedule('https://www.mocky.io/v2/5ba2a2b52f00006a008d2e0d');
  console.log(schedule.indexOf('🏄') >= 0 ? '👍😎' : '👉😭');
}

amIGoingToTheBeach();
```

Tthe asynchronous `getSeason` is fetching the current season. Based on the season `getMySchedule` decides what will be the user's activities. Then we have some logic in `amIGoingToTheBeach` that uses the schedule to decide what emojis to print in the console. 

There are couple of problems with this code. Of course the biggest one is that the user will never go to the beach because the fake endpoint always returns `{"season": "not summer"}`. Besides that we have a dependency problem. `getMySchedule` not only needs the current season but also knows how to get it because it directly uses `getSeason`. Sure, we can use some more composition by getting the season in `amIGoingToTheBeach` and passing it as parameter to `getSeason` but wouldn't be cool if we can use a code like this:

```js
import { A, run } from 'actml';

async function GetSeason({ endpoint }) {
  const result = await fetch(endpoint);
  const { season } = await result.json();
  return season;
}
async function GetMySchedule({ season }) {
  return season === 'summer' ? '🌴🍨🏄' : '⏰☕️💻';
}
function AmIGoingToTheBeach({ schedule }) {
  console.log(schedule.indexOf('🏄') >= 0 ? '👍😎' : '👉😭');
}

run(
  <GetSeason endpoint="https://www.mocky.io/v2/5ba2a2b52f00006a008d2e0d">
    { season => (
      <GetMySchedule season={ season }>
        { schedule => <AmIGoingToTheBeach schedule={ schedule } /> }
      </GetMySchedule>
    )}
  </GetSeason>
);
```

Or if we use [ActML's context API](#context-api):

```js
run(
  <A>
    <GetSeason exports="season" endpoint="https://www.mocky.io/v2/5ba2a2b52f00006a008d2e0d" />
    <GetMySchedule $season exports="schedule" />
    <AmIGoingToTheBeach $schedule />
  </A>
);
```

Notice how `GetMySchedule` and `AmIGoingToTheBeach` became pure functions which only accept what they need. I know what you are thinking - "Do we really need such kung-fu to make those functions pure?". Well, we may achieve the same thing but we need a fourth function that act as a composition layer and wires everything. ActML is doing that and it comes with a lot more opportunities for composition. It is your glue layer where you say what needs to happen without specifying how.

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
