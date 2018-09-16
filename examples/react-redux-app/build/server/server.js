'use strict';

var _dactory = require('dactory');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logic = require('./logic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); /** @jsx D */


app.use(_express2.default.static(__dirname + '/../client'));

app.get('/api/posts', async function (req, res) {
  res.json((await (0, _dactory.speak)((0, _dactory.D)(_logic.GetPosts, null))));
});
app.get('/api/post/:id', async function (req, res) {
  var _ref = await (0, _dactory.speak)((0, _dactory.D)(_logic.GetPost, { id: req.params.id, onError: (0, _dactory.D)(_logic.HandleError, { exports: 'error' }) })),
      post = _ref.post,
      error = _ref.error;

  if (post) {
    res.json(post);
  } else {
    res.status(500).json(error);
  }
});

app.listen(4500, function () {
  return console.log('Example app listening on port 4500!');
});