![ActML](assets/logo.jpg)

# :dizzy: ActML <!-- omit in toc -->

> ActML is a library that allows you to use JSX syntax outside of React world. It aims to provide the same experience in terms of composability and patterns.

```javascript
/** @jsx A */

```

---

* [Installation](#installation)

---

## Installation

* `npm i actml` or `yarn install actml`
* ActML uses JSX so you need to have some sort of [Babel](https://babeljs.io) integration (or any other transpiler that understands [JSX](https://facebook.github.io/jsx/))
* ActML requires you to add `/** @jsx A */` at the top of the file. Otherwise the ActML elements will be transpiled to `React.createElement`


