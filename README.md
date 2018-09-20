# &lt;ActML /> :rocket: <!-- omit in toc -->

> You know what I really like in React - it teaches you how to build well encapsulated components that are also highly composable. The thing is that React and its JSX is for our UI. It is a view layer that renders stuff on the screen. I want something similar but for my business logic. Something that allows me to use the same patterns but helps me deal with the asynchronous nature of the front-end development. So, I did it. Meet **ActML** - like React but for your business logic. 

- [Concept](#concept)
- [What you need to use ActML](#what-you-need-to-use-actml)

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

We have this `getMySchedule` function which is using the asynchronous `getSeason` to get the current season. Based on the season `getMySchedule` decides what will be the user's activities. Then we have some logic in `amIGoingToTheBeach` that uses the schedule to decide what emojis to print in the console. 

There are couple of problems with this code. Of course the biggest one is that the user will never go to the beach because the fake endpoint always returns `{"season": "not summer"}`. Besides that we have a dependency problem. `getMySchedule` not only needs the current season but also it knows how to get it because it directly uses `getSeason`. Sure, we can use some more composition by getting the season in `amIGoingToTheBeach` and passing it as parameter to `getSeason` but wouldn't be cool if we can use a code like this:

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
  <A>
    <GetSeason exports="season" endpoint="https://www.mocky.io/v2/5ba2a2b52f00006a008d2e0d">
      { season => (
        <GetMySchedule season={ season }>
          { schedule => <AmIGoingToTheBeach schedule={ schedule } /> }
        </GetMySchedule>
      )}
    </GetSeason>
  </A>
);
```

Or if we use ActML's context API:

```js
run(
  <A>
    <GetSeason exports="season" endpoint="https://www.mocky.io/v2/5ba2a2b52f00006a008d2e0d" />
    <GetMySchedule $season exports="schedule" />
    <AmIGoingToTheBeach $schedule />
  </A>
);
```

Notice how `GetMySchedule` and `AmIGoingToTheBeach` became pure functions which only accept what they need. I know what you are thinking - "Do we really need such kung-fu to make those functions pure?". Well, we may achieve the same thing but we need a fourth function that act as a composition layer and wires everything. That is one of the benefits of ActML. It is your glue layer where you say what needs to happen without specifying how.

## What you need to use ActML

ActML uses React's JSX transpiler to convert markup to function calls. By default the transpiler translates every tag to a `React.createElement` call so to make your code works with ActML you have to add

```js
/** @jsx A */
import { A } from 'actml';
```

The first line is to say to the transpiler that we don't want `React.createElement()` but `A()`. The second line is there because otherwise you'll get `ReferenceError: A is not defined` error. And of course because the `A` function is defining the _actors_ of ActML.

From a tools perspective you probably need some sort of [Babel](https://babeljs.io/docs/en/babel-preset-react) integration. There's a Redux+ActML example app [here](https://github.com/krasimir/actml/tree/master/examples/react-redux-app) that you can check out.