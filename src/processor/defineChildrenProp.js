/* eslint-disable max-len, consistent-return */
import { isItAnElement } from '../utils';
import { A } from '../';
import ChildrenWrapper from '../elements/ChildrenWrapper';

const WRONG_PARAMS_ERROR = 'The "children" prop expects an object (key-value pairs) as first argument and a callback as second argument.';

export default function defineChildrenProp(execContext, done) {
  const { element, processor } = execContext;
  const { children } = element;
  let childrenProp = null;

  // FACC
  if (children.length === 1 && !isItAnElement(children[0]) && typeof children[0] === 'function') {
    childrenProp = props => {
      if (typeof props !== 'undefined' && typeof props !== 'object') {
        throw new Error(WRONG_PARAMS_ERROR);
      }
      return new Promise(childDone => processor.add(A(children[0], props), element, childDone));
    };
  // an array of ActML elements
  } else if (children.length >= 3 && children[0] === '(' && children[ children.length - 1] === ')') {
    childrenProp = props => {
      if (typeof props !== 'undefined' && typeof props !== 'object') {
        throw new Error(WRONG_PARAMS_ERROR);
      }
      return new Promise(childrenDone => {
        processor.add(A(ChildrenWrapper, props, ...children.slice(1, -1)), element, childrenDone);
      });
    };
  }

  execContext.childrenProp = childrenProp;
  done();
}
