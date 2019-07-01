/* eslint-disable no-use-before-define, no-return-assign, max-len */
import equal from 'fast-deep-equal';

export default function Tree() {
  var root = createNewBranch();
  var ids = 0;

  function getId() {
    return 'a' + (++ids);
  };
  function useSameBranch(branch, newElement) {
    newElement.initialize(branch.element.id, branch.element.used());
    branch.element = newElement;
    return branch;
  }
  function treeDiff(oldElement, newElement) {
    if (oldElement && oldElement.name === newElement.name) {
      return equal(oldElement.props, newElement.props);
    }
    return false;
  }
  function createNewBranch(element) {
    if (element) { element.initialize(getId()); }
    return {
      element,
      children: [],
      cursor: 0,
      initialize() {
        this.cursor = 0;
      },
      addSubBranch(newElement) {
        const subBranch = this.children[ this.cursor ];

        // using the same branch
        if (subBranch && treeDiff(subBranch.element, newElement)) {
          this.cursor += 1;
          return useSameBranch(subBranch, newElement);
        }

        // creating a new branch
        const newSubBranch = createNewBranch(newElement);

        this.children[ this.cursor ] = newSubBranch;
        this.cursor += 1;
        return newSubBranch;
      },
      cleanUp() {
        // If there're more branches in the tree then what was processed
        if (this.cursor < this.children.length) {
          this.children.splice(this.cursor, this.children.length - this.cursor);
        }
      }
    };
  }

  return {
    resolveRoot(element) {
      return root = (treeDiff(root.element, element) ?
        useSameBranch(root, element) :
        createNewBranch(element));
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
