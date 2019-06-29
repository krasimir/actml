import equal from 'fast-deep-equal';

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

export function createTree() {
  return {
    element: null,
    used: 1,
    children: []
  };
};
export function resetTree() {
  ids = 0;
}
export function getNumOfElements() {
  return ids;
}
export function processTree(branch, element) {
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
}
export function drawTree(tree) {
  return (function loopOver(branch, ind = '') {
    let str = '';

    if (branch.children.length > 0) {
      str = ind + `<${ branch.element.name }> (${ branch.used })\n`;
      branch.children.forEach(child => {
        str += loopOver(child, ind + '  ');
      });
      str += ind + `</${ branch.element.name }>\n`;
    } else {
      str += ind + `<${ branch.element.name } /> (${ branch.used })\n`;
    }
    return str;
  })(tree);
}
