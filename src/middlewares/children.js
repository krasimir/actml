import { STOP_PROCESSING, CONTINUE_PROCESSING } from '../constants';
import { isItAnElement } from '../utils';

async function childrenMiddleware(element) {
  const { func, children, result } = element;

  // FACC pattern
  if (children && children.length === 1 && !isItAnElement(children[0])) {
    const resultOfFACC = await children[0].call(element, result);

    if (isItAnElement(resultOfFACC)) {
      await resultOfFACC.run(element);
    }
  
  // nested tags
  } else if (children && children.length > 0) {
    let pointer = 0;

    while(pointer < children.length) {
      await children[pointer].run(element);
      pointer++;
    }
  }
}
childrenMiddleware._name = 'CHILDREN';

export default childrenMiddleware;