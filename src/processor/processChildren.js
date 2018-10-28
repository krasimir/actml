/* eslint-disable consistent-return */
import { isItAnElement } from '../utils';

export default function processChildren(execContext, done) {
  const { element, processor } = execContext;
  const children = element.children;

  if (children && Array.isArray(children) && children.length > 0) {
    let i = -1;

    (function process() {
      i++;
      i === children.length ?
        done() :
        isItAnElement(children[i]) ? processor.add(children[i], element, process) : process();
    })();
  } else {
    done();
  }
}
