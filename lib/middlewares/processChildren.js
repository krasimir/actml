'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Element = require('../Element');

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function processChildren(element) {
  var func = element.func,
      children = element.children,
      result = element.result;

  // FACC pattern

  if (children && children.length === 1 && !_Element2.default.isItAnElement(children[0])) {
    var resultOfFACC = await children[0].call(element, result);
    if (_Element2.default.isItAnElement(resultOfFACC)) {
      await resultOfFACC.run(element);
    }

    // nested tags
  } else if (children && children.length > 0) {
    var pointer = 0;
    var parallelProcessing = !!func.processChildrenInParallel;

    while (pointer < children.length) {
      var w = children[pointer];

      try {
        if (parallelProcessing) {
          w.run(element);
        } else {
          await w.run(element);
        }
      } catch (error) {
        if (error.message === _Element2.default.errors.STOP_PROCESSING) {
          break;
        } else if (!(error.message === _Element2.default.errors.CONTINUE_PROCESSING)) {
          throw error;
        }
      }
      pointer++;
    }
  }
};