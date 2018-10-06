import { isItAnElement } from '../utils';

export default async function resultMiddleware (element) {
  const { result } = element;

  if (result) {
    // Another ActML element
    if (isItAnElement(result)) {
      return await result.run(element);
    }
    // Generator
    if (typeof result.next === 'function') {
      const gen = result;
      let genRes = { value: undefined, done: false };

      while(!genRes.done) {
        genRes = gen.next(genRes.value);
        if (isItAnElement(genRes.value)) {
          genRes.value = await genRes.value.run(element);
        }
      }
      element.result = genRes.value;
    }
  }
}