/** @jsx dialectica */

import dialectica, { Dialect } from '../../src';

function MyLogic (props) {
  console.log('MyLogic a = ', props.a);
  return props.a * 4;
}
function Foo({ data }) {
  console.log('Foo parent = ' + data);
}
function Bar({ data }) {
  console.log('Bar parent = ' + data);
}

var dialect = (
  <MyLogic a={ 10 }>
    {
      result => (
        <Dialect>
          <Foo data={ result } />
          <Bar data={ result } />
        </Dialect>
      )
    }
  </MyLogic>
);

dialectica.speak(dialect);
