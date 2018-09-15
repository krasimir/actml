'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.speak = speak;

var _Word = require('./Word');

var _Word2 = _interopRequireDefault(_Word);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function create(func, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // using D as a dymmy component
  if (func === create) return (0, _Word2.default)(function () {
    return this.context;
  }, props, children);
  return (0, _Word2.default)(func, props, children);
}
async function speak(word) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (_Word2.default.isItAWord(word)) {
    if (_Word2.default.isItAWord(word.func)) {
      word.func.mergeToProps(word.props);
      return await word.func.say(context);
    }
    return await word.say(context);
  }
  return await create(word, null).say(context);
}