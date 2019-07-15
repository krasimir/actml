/* eslint-disable no-use-before-define, no-return-assign, max-len */
const LOGS = false;
const log = (...something) => LOGS ? console.log(...something) : null;

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
      if (oldElement.props && newElement.props) {
        return oldElement.props.key === newElement.props.key;
      }
      return true;
    }
    return false;
  }
  function createNewNode(element, parent) {
    if (element) { element.initialize(getId()); }

    const node = {
      element,
      children: [],
      parent,
      cursor: 0,
      enter() {
        if (__DEV__) {
          if (this.logs) this.logs = [];
        }
        log(`-> ${ this.element.name }`);
        this.element.enter();
        onNodeEnter.forEach(c => c(this));
      },
      out() {
        log(`<- ${ this.element.name }`);
        this.element.out();
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

    if (__DEV__) {
      node.log = (type, meta) => {
        if (!('logs' in node)) node.logs = [];
        node.logs.push({ type, meta });
      };
    }

    return node;
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
      if (__DEV__) {
        return (function loopOver(node, ind = 0) {
          const { children, ...rest } = node.element.props ? node.element.props : {}; // eslint-disable-line no-unused-vars

          return {
            ind,
            name: node.element.name,
            logs: node.logs,
            props: {
              children: '<function children>',
              ...rest
            },
            used: node.element.used(),
            id: node.element.id,
            children: node.children.map(child => loopOver(child, ind + 1))
          };
        })(root);
      }
      throw new Error('Not available in production mode');
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
