/* eslint-disable no-use-before-define, no-return-assign, max-len */
import equal from 'fast-deep-equal';

export default function Tree() {
  var root = createNewBranch();
  var ids = 0;

  function getId() {
    return 'a' + (++ids);
  };
  function createNewBranch(element = null) {
    if (element) { element.initialize(getId()); }
    return {
      element,
      used: 1,
      children: []
    };
  }
  function reUse(branch, newElement) {
    branch.used += 1;
    branch.element.reUse(newElement);
    return branch;
  }
  function treeDiff(oldElement, newElement) {
    if (oldElement && oldElement.name === newElement.name) {
      return equal(oldElement.props, newElement.props);
    }
    return false;
  }

  return {
    resolveRoot(element) {
      if (treeDiff(root.element, element)) {
        return reUse(root, element);
      }
      return root = createNewBranch(element);
    },
    createChildBranchFactory(branch) {
      let i = 0;

      return (newElement) => {
        const childBranch = branch.children[i];

        if (childBranch && treeDiff(childBranch.element, newElement)) {
          i += 1;
          return reUse(childBranch, newElement);
        }
        branch.children[i] = createNewBranch(newElement);
        i += 1;
        return branch.children[i - 1];
      };
    },
    reset() {
      root = createNewBranch();
      ids = 0;
    },
    getNumOfElements() {
      return ids;
    },
    diagnose() {
      return (function loopOver(branch, ind = 0) {
        let arr = [];

        arr.push({ ind, name: branch.element.name, used: branch.used });
        if (branch.children.length > 0) {
          branch.children.forEach(child => {
            arr.push(loopOver(child, ind + 1));
          });
        }
        return arr;
      })(root);
    }
  };
};
