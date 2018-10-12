import { isItAnElement } from '../utils';

export default async function childrenMiddleware(element) {
  const { children } = element;
  
  if (children && Array.isArray(children) && children.length > 0) {
    let pointer = 0;

    while(pointer < children.length) {
      if (isItAnElement(children[pointer])) {
        await children[pointer].run(element);
      }
      pointer++;
    }
  }
}