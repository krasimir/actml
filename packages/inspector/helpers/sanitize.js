import CircularJSON from './vendor/CircularJSON';
import SerializeError from './vendor/SerializeError';

const { stringify } = CircularJSON;

export default function sanitize(something, showErrorInConsole = false) {
  var result;

  try {
    result = JSON.parse(stringify(something, function (key, value) {
      if (typeof value === 'function') {
        return value.name === '' ? '<anonymous>' : `function ${ value.name }()`;
      }
      if (value instanceof Error) {
        return SerializeError(value);
      }
      return value;
    }, undefined, true));
  } catch (error) {
    if (showErrorInConsole) {
      console.log(error);
    }
    result = null;
  }
  return result;
}