# &lt;ActML /> :rocket: <!-- omit in toc -->

> You know what I really like in React - it teaches you how to build well encapsulated components that are also highly composable. The thing is that React and its JSX is for our UI. It is a view layer that renders stuff on the screen. I want something similar but for my business logic. Something that allows me to use the same patterns but helps me deal with the asynchronous nature of the front-end development. So, I did it. Meet **ActML** - like React but for your business logic. 

- [Concept](#concept)
- [What you need to use ActML](#what-you-need-to-use-actml)
- [What is an ActML element](#what-is-an-actml-element)
- [Getting in and out of your function/element](#getting-in-and-out-of-your-functionelement)
- [Scope API](#scope-api)
  - [Understanding "exports" and "scope" props](#understanding-%22exports%22-and-%22scope%22-props)
  - [Catching all the variables](#catching-all-the-variables)
  - [More advanced export and import](#more-advanced-export-and-import)
- [Context API](#context-api)
- [Predefined elements](#predefined-elements)
  - [Wrapper that scopes everything](#wrapper-that-scopes-everything)
- [Error handling](#error-handling)
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
const Greeting = function({ name, children }) {
  children(`Hey ${name}!`);
};
async function GetProfileName() {
  const response = await fetch('https://reqres.in/api/users/2');
  const { data: { first_name, last_name } } = await response.json();

  return first_name + ' ' + last_name;
}
function Print({ message }) {
  console.log(message);
}

run(
  <A>
    <GetProfileName exports="name" />
    <Greeting $name>
      { message => <Print message={message} /> }
    </Greeting>
  </A>
);
```

Let's see step by step what ActML does:

1. The `<A>` element is just a wrapper.
2. `<GetProfileName>` is an asynchronous function so ActML waits till its promise is resolved. It also returns a result and has `exports` prop defined. That is a special prop which is saying "Export a variable with name `name` and make it available for other elements".
3. `<Greeting>` needs that `name` variable and uses the special dollar sign notation which to ActML processor means "Inject a variable with name `name` as a prop".
4. `<Greeting>` also has a function as child and it sends its result there which in our case is the full message.
5. `<Print>` just gets the message and prints it out in the console.

_Here is a working [Codesandbox](https://codesandbox.io/s/341xn5vrlq) of the code above._

So, that is the concept of ActML. It allows us to define in a declarative fashion our business logic. Same as our UI. There is nothing (almost) imperative. In fact all the code that we pass to the `run` function is nothing but definitions of _what_ should happen. It is not saying _how_. This is extremely powerful concept because it shifts the responsibility to another levels and makes the development a lot more easier. We use composition over raw implementation. If you like this way of thinking then ActML may be your way to deal with asynchronous logic.

## What you need to use ActML

ActML uses React's JSX transpiler to convert markup to function calls. By default the transpiler translates every tag to a `React.createElement` call so to make your code works with ActML you have to add

```js
/** @jsx A */
import { A } from 'actml';
```

The first line is to say to the transpiler that we don't want `React.createElement()` but `A()`. The second line is there because otherwise you'll get `ReferenceError: A is not defined` error. And of course because the `A` function is defining the core unit of ActML - an ActML element.

From a tools perspective you need some sort of [Babel](https://babeljs.io/docs/en/babel-preset-react) integration. There's a React+Redux+ActML example app [here](https://github.com/krasimir/actml/tree/master/examples/react-redux-app) that you can check.

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

ActML processor assumes that every of the elements is asynchronous. It executes the functions from the outer to inner ones and from top to bottom. All the three types of elements may return another element. In the case of generator we may `yield` also another element. For example:

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

_[Codesandbox](https://codesandbox.io/s/o41140ro85) with the example._

## Getting in and out of your function/element

The input to your ActML element is the attributes that we pass to the tag or if we have to make a parallel with React - the `props`. For example:

```js
const Foo = function (props) {
  console.log(`Hello ${ props.name }`);
}

run(<Foo name='John' />); // outputs "Hello John"
```

The output or in other words the returned value of your element is available to its children via the [FACC (function as children pattern)](https://github.com/krasimir/react-in-patterns/blob/master/book/chapter-4/README.md#function-as-a-children-render-prop):

```js
const Foo = function ({ name, children }) {
  children(`Hello ${ name }`);
}

run(
  <Foo name='John'>
    { message => console.log(message) }
  </Foo>
);
// outputs again "Hello John"
```

Another way to pass data between elements is the Scope API.

## Scope API

The scope API is a primary mechanism for transferring data between ActML elements.

### Understanding "exports" and "scope" props

Using the FACC pattern everywhere is not very convenient. So there is a Scope API that can keep data and share it with other elements. Let's take the following example:

```js
const Foo = () => 'Jon Snow';
const App = () => {};
const Zoo = ({ name }) => console.log('Zar: ' + name);
const Bar = ({ name }) => console.log('Bar: ' + name);

<App>
  <Foo exports='name'>
    <Zoo $name />
  </Foo>
  <Bar $name />
</App>
```

Every ActML element has a `scope` object. It is really just a plain JavaScript object `{}` and every time when we use `exports` we are saving something there. For example the `scope` object of the `Foo` element is equal to `{ name: 'Jon Snow' }`. Together with creating the `name` variable in the `scope` of `Foo` we are also _sending_ an event to the parent `App` element. Then the `App` element should decide if it is interested in that variable or not. If yes then it keeps it in its scope. In the example above that is not happening so the `name` variable is only set in the scope of `<Foo>`. That is why in this latest example we will get `Zar: Jon Snow` followed by the error `Undefined variable "name" requested by <Bar>.`.

To solve the problem we have to instruct `<App>` element to _catch_ the `name` variable and also keeps it in its scope. This happens by the special prop called `scope`:

```js
const Foo = () => 'Jon Snow';
const App = () => {};
const Zoo = ({ name }) => console.log('Zar: ' + name);
const Bar = ({ name }) => console.log('Bar: ' + name);

<App scope='name'>
  <Foo exports='name'>
    <Zoo $name />
  </Foo>
  <Bar $name />
</App>
```

Now the result of `<Foo>` is available for `<Bar>` element too. The value of `name` is consistent across the different scopes. Changing it in one place means that it is updated in the other ones too.

Another important note here is that once a variable gets caught it doesn't bubble up. So if there are other elements as parents they will not receive it. 

### Catching all the variables

There is a special `*` (star) value that we can pass to the `scope` prop which means "Catch all the variables". The example above will look like this:

```js
<App scope='*'>
  <Foo exports='name'>
    <Zoo $name />
  </Foo>
  <Bar $name />
</App>
```

For convenience the element `<A>` has its `scope` property set to `*` by default. So `<App scope='*'>` could be just replaced by `<A>`. Or in other words if we want to catch all the variables we may use `<A>` directly.

### More advanced export and import

The `exports` prop may also accept a function. The function receives the result of the function and **must** return an object (key-value pairs). This approach is useful when we want to apply some transformation of the element's result without modifying the actual element. For example:

```js
const Foo = () => 'Jon Snow';
const transform = name => ({
  originalName: name,
  lowercaseName: name.toLowerCase(),
  uppercaseName: name.toUpperCase()
});

run(
  <A>
    <Foo exports={ transform }>
      <Zoo $lowercaseName />
    </Foo>
    <Bar $uppercaseName />
  </A>
);
```

`<Zoo>` and `<Bar>` now accept `lowercaseName` and `uppercaseName` as props. This however may be too long for typing. We can rename those like so:

```js
run(
  <A>
    <Foo exports={ transform }>
      <Zoo $lowercaseName="name" />
    </Foo>
    <Bar $uppercaseName="name" />
  </A>
);
```

We can also pass a function and apply some transformation of the data before importing.

```js
<Bar $uppercaseName={ name => ({ len: name.length }) } />
```

`<Bar>` element will receive a prop called `len` which contains the number of letters in the `uppercaseName` variable.

## Context API

Now when you know about the scope API we could make a parallel with the context API. The scope API is more like a local placeholder of information. While the context API is globally available and it is more about injecting elements.

The `run` function accepts a second argument which is the initial context. We can pass an object in the format of key-value pairs. For example:

```js
const Zoo = ({ message }) => console.log('The message is: ' + message);
const context = {
  getMessage({ name }) {
    return `Hello ${name}!`;
  }
};

run(
  <getMessage name="Jon Snow" exports="message">
    <Zoo $message />
  </getMessage>,
  context
);

// Prints out: The message is: Hello Jon Snow!
```

Notice how `getMessage` is defined in the context. We have to stress out that this is only possible because of the JSX transpiler. Everything that goes into the context must start with a lower case letter. That is because:

```js
<getMessage />
```

gets transpiled to

```js
A("getMessage", null);
```

while

```js
<GetMessage />
```

to

```js
A(GetMessage, null);
```

In the second case there **must** be a function called `GetMessage` while in the first case there's just a string `getMessage` passed to ActML processor. This may looks weird but is really powerful API for delivering dependencies deep down your ActML tree. Imagine how you define your context once and then write your logic distributed between different files.

## Predefined elements

There are some predefined elements that come with ActML core package.

### Wrapper that scopes everything

The `<A>` element has the ability to scope everything. So if you need that functionality and you a wrapper this is a good element to use.

## Error handling

Because `run` returns a promise we can just `catch` the error at a _global_ level:

```js
const Problem = function() {
  return iDontExist; // throws an error "iDontExist is not defined"
};
const App = function() {};

run(
  <App>
    <Problem />
  </App>
).catch(error => {
  console.log('Ops, an error: ', error.message);
  // Ops, an error:  iDontExist is not defined
});
```

That's all fine but it is not really practical. What we may want is to handle the error inside our ActML. In such cases we have the special `onError` prop. It accepts another ActML element which receives the error as a prop.

```js
const Problem = function() {
  return iDontExist;
};
const App = function() {};
const HandleError = ({ error }) => console.log(error.message); // logs "iDontExist is not defined"

run(
  <App>
    <Problem onError={ <HandleError /> } />
  </App>
);
```

ActML stops the execution of the current logic. However, if our handler returns `true` it continues. For example:

```js
const Problem = function() {
  return iDontExist;
};
const App = function() {};
const HandleError = () => true;
const AfterError = () => console.log('I am still here :)');

run(
  <App exports='answer'>
    <Problem onError={ <HandleError /> } />
    <AfterError />
  </App>
);
// outputs "I am still here :)" even tho there's an error
```

And by stopping the execution we mean only the current branch. For example:

```js
const Problem = function() {
  return iDontExist;
};
const App = function() {};
const Wrapper = function() {};
const HandleError = () => {};
const Z = () => console.log('Z');
const B = () => console.log('B');
const C = () => console.log('C');

await run(
  <App exports='answer'>
    <Wrapper onError={ <HandleError /> }>
      <Problem/>
      <Z />
    </Wrapper>
    <Wrapper>
      <B />
      <C />
    </Wrapper>
  </App>
);
```

We will see `B` followed by `C` but not `Z` because there's an error at that level. Here is a [Codesandbox](https://codesandbox.io/s/qlpwp2nn06) with an example.

## Examples

* [Codesandbox](https://codesandbox.io/s/qx667yqvj9)
* [React+Redux+ActML app](https://github.com/krasimir/actml/tree/master/examples/react-redux-app)
