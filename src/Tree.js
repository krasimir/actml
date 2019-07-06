/* eslint-disable no-use-before-define, no-return-assign, max-len */
import equal from 'fast-deep-equal';

export default function Tree() {
  var onNodeEnter = [];
  var onNodeOut = [];
  var onNodeRemove = [];
  var root = createNewNode();
  var ids = 0;

  function getId() {
    return 'a' + (++ids);
  };
  function useSameNode(node, newElement) {
    newElement.initialize(node.element.id, node.element.used());
    node.element = newElement;
    return node;
  }
  function treeDiff(oldElement, newElement) {
    if (oldElement && oldElement.name === newElement.name) {
      return equal(oldElement.props, newElement.props);
    }
    return false;
  }
  function createNewNode(element, parent) {
    if (element) { element.initialize(getId()); }
    return {
      element,
      children: [],
      parent,
      cursor: 0,
      enter() {
        onNodeEnter.forEach(c => c(this));
      },
      out() {
        // If there're more nodes in the tree than what was processed
        if (this.cursor < this.children.length) {
          this.children
            .splice(this.cursor, this.children.length - this.cursor)
            .forEach(removedNode => onNodeRemove.forEach(c => c(removedNode)));
        }
        this.cursor = 0;
        onNodeOut.forEach(c => c(this));
      },
      addChildNode(newElement) {
        const childNode = this.children[ this.cursor ];

        // using the same node
        if (childNode && treeDiff(childNode.element, newElement)) {
          this.cursor += 1;
          return useSameNode(childNode, newElement);
        }

        // creating a new node
        const newChildNode = createNewNode(newElement, this);

        if (this.children[ this.cursor ]) {
          onNodeRemove.forEach(c => c(this.children[ this.cursor ]));
        }
        this.children[ this.cursor ] = newChildNode;
        this.cursor += 1;
        return newChildNode;
      }
    };
  }

  return {
    resolveRoot(element) {
      return root = (treeDiff(root.element, element) ?
        useSameNode(root, element) :
        createNewNode(element));
    },
    reset() {
      root = createNewNode();
      ids = 0;
    },
    getNumOfElements() {
      return ids;
    },
    diagnose() {
      return (function loopOver(node, ind = 0) {
        // console.log(node.element.name, node.children.length);
        return {
          ind,
          name: node.element.name,
          used: node.element.used(),
          id: node.element.id,
          children: node.children.map(child => loopOver(child, ind + 1))
        };
      })(root);
    },
    addNodeEnterCallback(callback) {
      onNodeEnter.push(callback);
    },
    addNodeOutCallback(callback) {
      onNodeOut.push(callback);
    },
    onNodeRemove(callback) {
      onNodeRemove.push(callback);
    }
  };
};
