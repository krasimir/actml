'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.GetPosts = GetPosts;
exports.GetPost = GetPost;
exports.AddPost = AddPost;
exports.DeletePost = DeletePost;
exports.HandleError = HandleError;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var posts = [];

var ID = function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

function GetPosts() {
  return posts.map(function (_ref) {
    var text = _ref.text,
        other = _objectWithoutProperties(_ref, ['text']);

    return _extends({}, other);
  });
}
function GetPost(_ref2) {
  var id = _ref2.id;

  var post = posts.find(function (_ref3) {
    var postId = _ref3.id;
    return postId === id;
  });

  if (post) {
    return post;
  }
  throw new Error('Not found');
}
function AddPost(_ref4) {
  var title = _ref4.title,
      text = _ref4.text;

  var post = {
    id: ID(),
    title: title,
    text: text
  };

  posts.push(post);
  return post;
}
function DeletePost(_ref5) {
  var id = _ref5.id;

  var deleted = false;

  posts = posts.filter(function (_ref6) {
    var postId = _ref6.id;

    if (id !== postId) {
      return true;
    }
    deleted = true;
    return false;
  });

  if (!deleted) {
    throw new Error('Not found');
  }
}
function HandleError(_ref7) {
  var error = _ref7.error;

  return error.message;
}