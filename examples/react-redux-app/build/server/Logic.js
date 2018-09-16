'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPosts = GetPosts;
exports.GetPost = GetPost;
exports.Add = Add;
exports.Delete = Delete;
var posts = [];

var ID = function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

function GetPosts() {
  return posts;
}
function GetPost(_ref) {
  var id = _ref.id;

  var post = posts.find(function (_ref2) {
    var postId = _ref2.id;
    return postId === id;
  });

  if (post) {
    return post;
  }
  throw new Error('Not found');
}
function Add(_ref3) {
  var title = _ref3.title,
      text = _ref3.text;

  var post = {
    id: ID(),
    title: title,
    text: text
  };

  posts.push(post);
  return post;
}
function Delete(_ref4) {
  var id = _ref4.id;

  posts = posts.filter(function (_ref5) {
    var postId = _ref5.id;
    return id !== postId;
  });
}