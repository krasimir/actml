'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createProcessor;

var _isActMLElement = require('./utils/isActMLElement');

var _isActMLElement2 = _interopRequireDefault(_isActMLElement);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

var _usePubSub = require('./hooks/usePubSub');

var _usePubSub2 = _interopRequireDefault(_usePubSub);

var _useState = require('./hooks/useState');

var _useState2 = _interopRequireDefault(_useState);

var _useEffect = require('./hooks/useEffect');

var _useEffect2 = _interopRequireDefault(_useEffect);

var _Queue = require('./Queue');

var _Queue2 = _interopRequireDefault(_Queue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-use-before-define, consistent-return */
var CHILDREN = '__ACTML_CHILDREN__';
var CONSUME = 'CONSUME';
var PROCESS_RESULT = 'PROCESS_RESULT';
var RETURNED_ELEMENT = 'RETURNED_ELEMENT';
var CHILD = 'CHILD';

var isGenerator = function isGenerator(obj) {
  return obj && typeof obj['next'] === 'function';
};
var isPromise = function isPromise(obj) {
  return obj && typeof obj['then'] === 'function';
};

function createProcessor() {
  var tree = (0, _Tree2.default)();
  var currentNode = null;

  var processNode = function processNode(node) {
    currentNode = node;
    node.enter();
    node.rerun = function () {
      return processNode(node);
    };
    var children = function children() {
      var _arguments = arguments;
      var children = node.element.children;


      if (children && children.length > 0) {
        var queueItemsToAdd = [];
        var _results = [];
        var childrenQueue = (0, _Queue2.default)('  ' + node.element.name + ':children');

        var _loop = function _loop(i) {
          if ((0, _isActMLElement2.default)(children[i])) {
            var _children$i;

            (_children$i = children[i]).mergeProps.apply(_children$i, _arguments);
            queueItemsToAdd.push(function () {
              return processNode(node.addChildNode(children[i]));
            });
          } else if (typeof children[i] === 'function') {
            var funcResult = children[i].apply(children, _arguments);

            if ((0, _isActMLElement2.default)(funcResult)) {
              queueItemsToAdd.push(function () {
                return processNode(node.addChildNode(funcResult));
              });
            } else {
              _results.push(funcResult);
            }
          } else {
            _results.push(children[i]);
          }
        };

        for (var i = 0; i < children.length; i++) {
          _loop(i);
        }
        queueItemsToAdd.reverse().forEach(function (func) {
          childrenQueue.prependItem(CHILD, func, function (r) {
            return _results.push(r);
          });
        });
        childrenQueue.process();
        return childrenQueue.onDone(function () {
          return _results;
        });
      }
    };

    children[CHILDREN] = true;

    node.element.mergeProps({ children: children });

    var results = {};
    var queue = (0, _Queue2.default)(' ' + node.element.name);

    // CONSUME
    queue.add(CONSUME, function () {
      return node.element.consume();
    }, function (result) {
      return results[CONSUME] = result;
    });

    // PROCESS_RESULT
    queue.add(PROCESS_RESULT, function () {
      var consumption = results[CONSUME];

      // ActML element
      if ((0, _isActMLElement2.default)(consumption)) {
        queue.prependItem(RETURNED_ELEMENT, function () {
          return processNode(node.addChildNode(consumption));
        }, function (result) {
          return results[RETURNED_ELEMENT] = result;
        });

        // generator
      } else if (isGenerator(consumption)) {
        var generator = consumption;

        queue.prependItem(RETURNED_ELEMENT, function () {
          return new Promise(function (generatorDone) {
            var genResult = void 0;

            (function iterate(value) {
              genResult = generator.next(value);
              if (!genResult.done) {
                if ((0, _isActMLElement2.default)(genResult.value)) {
                  var res = processNode(node.addChildNode(genResult.value));

                  if (isPromise(res)) {
                    res.then(function (r) {
                      return iterate(r);
                    });
                  } else {
                    iterate(res);
                  }
                }
              } else {
                if ((0, _isActMLElement2.default)(genResult.value)) {
                  var _res = processNode(node.addChildNode(genResult.value));

                  if (isPromise(_res)) {
                    _res.then(function (r) {
                      return generatorDone(r);
                    });
                  } else {
                    generatorDone(_res);
                  }
                } else {
                  generatorDone(genResult.value);
                }
              }
            })();
          });
        }, function (result) {
          return results[RETURNED_ELEMENT] = result;
        });

        // children
      } else if (consumption && consumption[CHILDREN]) {
        queue.prependItem(RETURNED_ELEMENT, function () {
          return consumption();
        }, function (result) {
          results[RETURNED_ELEMENT] = result && result.length === 1 ? result[0] : result;
        });
      }
    });

    // Running the queue
    queue.process();

    // Getting the result. It is either a promise if there is
    // something asynchronous or a value
    return queue.onDone(function () {
      node.out();
      return RETURNED_ELEMENT in results ? results[RETURNED_ELEMENT] : results[CONSUME];
    });
  };

  return {
    node: function node() {
      return currentNode;
    },
    run: function run(element) {
      var rootNode = tree.resolveRoot(element);

      return processNode(rootNode);
    },
    onNodeEnter: function onNodeEnter(callback) {
      tree.addNodeEnterCallback(callback);
    },
    onNodeOut: function onNodeOut(callback) {
      tree.addNodeOutCallback(callback);
    },
    onNodeRemove: function onNodeRemove(callback) {
      tree.onNodeRemove(callback);
    },
    system: function system() {
      return {
        tree: tree,
        reset: function reset() {
          currentNode = null;
          tree.reset();
          _usePubSub2.default.clear();
          _useState2.default.clear();
          _useEffect2.default.clear();
        }
      };
    }
  };
};