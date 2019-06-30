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
      children: []
    };
  }
  function reUse(branch, newElement) {
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
      // console.log(`------------> ${ element.name }`);
      return root = treeDiff(root.element, element) ?
        reUse(root, element) :
        createNewBranch(element);
    },
    createChildBranchFactory(branch) {
      let i = 0;

      return [
        (newElement) => {
          const childBranch = branch.children[i];

          // console.log(`${ childBranch ? childBranch.element.name : '.' } === ${ newElement.name }`);
          if (childBranch && treeDiff(childBranch.element, newElement)) {
            i += 1;
            return reUse(childBranch, newElement);
          }
          branch.children[i] = createNewBranch(newElement);
          i += 1;
          return branch.children[i - 1];
        },
        () => {
          // If there're more branches in the tree then what was processed
          if (i < branch.children.length) {
            // console.log(`X! clean up ${ i } to ${ branch.children.length - i }`);
            branch.children.splice(i, branch.children.length - i);
          }
        }
      ];
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

        arr.push({ ind, name: branch.element.name, used: branch.element.used(), id: branch.element.id });
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
