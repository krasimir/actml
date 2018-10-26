/* eslint-disable consistent-return */
import { flow } from '../utils';
import { isItAnElement } from '../utils';

export default function processChildren(execContext, done) {
  const { element } = execContext;
  const children = element.children;

  if (children && Array.isArray(children) && children.length > 0) {
    return flow(children.map(child => {
      if (!isItAnElement(child)) return (execContext, childDone) => childDone();
      return (execContext, childDone) => child.run(element, childDone);
    }), done, execContext);
  }
  done();
}
