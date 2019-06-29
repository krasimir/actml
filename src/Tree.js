import equal from 'fast-deep-equal';

function branch(element = null) {
  return {
    element,
    used: 1,
    children: []
  };
}

export default function Tree() {
  var root = branch();
  var ids = 0;

  function getId() {
    return 'a' + (++ids);
  };
  function createNewBranch(branch) {
    const newBranch = {};

    branch.children.push(newBranch);
    newBranch.used = 1;
    return newBranch;
  };
  function useCurrentBranch(branch) {
    const children = [ ...branch.children ];

    branch.used += 1;
    return (t) => {
      const c = children.shift();

      return c ? c : createNewBranch(t);
    };
  };
  function treeDiff(branch, element) {
    if (branch.element && element.name === branch.element.name) {
      return equal(branch.element.props, element.props);
    }
    return false;
  }

  return {
    get() {
      return root;
    },
    process(branch, element) {
      if (treeDiff(branch, element)) {
        return {
          element: branch.element,
          createBranch: useCurrentBranch(branch)
        };
      }
      element.initialize(getId());
      branch.element = element;
      branch.children = [];
      return {
        element,
        createBranch: createNewBranch
      };
    },
    reset() {
      root = branch();
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
