# Dialectica

*Dialectica* is a library that allows you to use React's transpiler for different purpose. React is our view layer. It takes care for the rendering part. *Dialectica* is opposite. It is dealing with the business logic of our applications. It allows us to write our own [dialect](https://en.wikipedia.org/wiki/Dialect) based on the [JSX syntax](https://facebook.github.io/jsx/).

```js
/** @jsx dialect */
import { dialect, speak } from 'dialectica';

const Foo = function ({ name }) {
  console.log(`Hello dear ${ name }!`);
}

speak(<Foo name='programmer'/>); // Hello dear programmer!
```
