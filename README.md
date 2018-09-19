# &lt;ActML /> :rocket: <!-- omit in toc -->

> You know what I really like in React - it teaches you how to build well encapsulated components that are also highly composable. The thing is that React and its JSX is for our UI. It is a view layer that renders stuff on the screen. I want something similar but for my business logic. Something that allows me to use the same patterns but helps me deal with the asynchronous nature of the front-end development. So, I did it. Meet **ActML** - like React but for your business logic. 

## Concept

If you are old enough you'll remember the times when we were writing all of our JavaScript in a single file. Most of the time our logic was placed in the global scope with no ideas for architecture or separation. And it was fine because JavaScript was just sugar on top of HTML and CSS. Today is completely different. We put our logic in functions/classes and we organize them in a giant graph with dozen of branches. Let's take the following code snippet.

```js
async function getMySchedule(endpoint) {
  const result = await fetch(endpoint);
  const { season } = await result.json();

  if (season === 'summer') {
    return '🌴🍨🏄';
  } else {
    return '⏰☕️💻';
  }
}

getMySchedule('https://www.mocky.io/v2/5ba29a732f000057008d2dee').then(
  schedule => {
    console.log(schedule.indexOf('🏄') >= 0 ? '😎' : '😭');
  }
);
```

