'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tree;

var _fastDeepEqual = require('fast-deep-equal');

var _fastDeepEqual2 = _interopRequireDefault(_fastDeepEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Tree() {
  var root = createNewBranch();
  var ids = 0;

  function getId() {
    return 'a' + ++ids;
  };
  function useSameBranch(branch, newElement) {
    newElement.initialize(branch.element.id, branch.element.used());
    branch.element = newElement;
    return branch;
  }
  function treeDiff(oldElement, newElement) {
    if (oldElement && oldElement.name === newElement.name) {
      return (0, _fastDeepEqual2.default)(oldElement.props, newElement.props);
    }
    return false;
  }
  function createNewBranch(element) {
    if (element) {
      element.initialize(getId());
    }
    return {
      element: element,
      children: [],
      cursor: 0,
      initialize: function initialize() {
        this.cursor = 0;
      },
      addSubBranch: function addSubBranch(newElement) {
        var subBranch = this.children[this.cursor];

        // using the same branch
        if (subBranch && treeDiff(subBranch.element, newElement)) {
          this.cursor += 1;
          return useSameBranch(subBranch, newElement);
        }

        // creating a new branch
        var newSubBranch = createNewBranch(newElement);

        this.children[this.cursor] = newSubBranch;
        this.cursor += 1;
        return newSubBranch;
      },
      cleanUp: function cleanUp() {
        // If there're more branches in the tree then what was processed
        if (this.cursor < this.children.length) {
          this.children.splice(this.cursor, this.children.length - this.cursor);
        }
      }
    };
  }

  return {
    resolveRoot: function resolveRoot(element) {
      return root = treeDiff(root.element, element) ? useSameBranch(root, element) : createNewBranch(element);
    },
    reset: function reset() {
      root = createNewBranch();
      ids = 0;
    },
    getNumOfElements: function getNumOfElements() {
      return ids;
    },
    diagnose: function diagnose() {
      return function loopOver(branch) {
        var ind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var arr = [];

        arr.push({ ind: ind, name: branch.element.name, used: branch.element.used(), id: branch.element.id });
        if (branch.children.length > 0) {
          branch.children.forEach(function (child) {
            arr.push(loopOver(child, ind + 1));
          });
        }
        return arr;
      }(root);
    }
  };
} /* eslint-disable no-use-before-define, no-return-assign, max-len */
;