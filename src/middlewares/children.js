import Element from '../Element';

export default async function childrenMiddleware(element) {
  const { func, children, result } = element;

  // FACC pattern
  if (children && children.length === 1 && !Element.isItAnElement(children[0])) {
    const resultOfFACC = await children[0].call(element, result);
    if (Element.isItAnElement(resultOfFACC)) {
      await resultOfFACC.run(element);
    }
  
  // nested tags
  } else if (children && children.length > 0) {
    let pointer = 0;
    let parallelProcessing = !!func.processChildrenInParallel;

    while(pointer < children.length) {
      const w = children[pointer];

      try {
        if (parallelProcessing) {
          w.run(element);
        } else {
          await w.run(element);
        }
      } catch (error) {
        if (error.message === Element.errors.STOP_PROCESSING) {
          break;
        } else if(!(error.message === Element.errors.CONTINUE_PROCESSING)) {
          throw error;
        }
      }
      pointer++;
    }
  }
}