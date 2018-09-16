'use strict';

var _dactory = require('dactory');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _logic = require('./logic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx D */
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use(_express2.default.static(__dirname + '/../client'));

app.get('/api/posts', async function (req, res) {
  res.json((await (0, _dactory.speak)((0, _dactory.D)(_logic.GetPosts, null))));
});
app.get('/api/post/:id', async function (req, res) {
  var _ref = await (0, _dactory.speak)((0, _dactory.D)(
    _dactory.D,
    null,
    (0, _dactory.D)(_logic.GetPost, { id: req.params.id, exports: 'post', onError: (0, _dactory.D)(_logic.HandleError, { exports: 'error' }) })
  )),
      post = _ref.post,
      error = _ref.error;

  if (post) {
    res.json(post);
  } else {
    res.status(500).json({ error: error });
  }
});
app.post('/api/post', async function (req, res) {
  res.json((await (0, _dactory.speak)((0, _dactory.D)(_logic.AddPost, req.body))));
});
app.delete('/api/post/:id', async function (req, res) {
  var _ref2 = await (0, _dactory.speak)((0, _dactory.D)(
    _dactory.D,
    null,
    (0, _dactory.D)(_logic.DeletePost, { id: req.params.id, exports: 'post', onError: (0, _dactory.D)(_logic.HandleError, { exports: 'error' }) })
  )),
      post = _ref2.post,
      error = _ref2.error;

  if (post) {
    res.json({ status: 'success' });
  } else {
    res.status(500).json({ error: error });
  }
});

app.listen(4500, function () {
  return console.log('Example app listening on port 4500!');
});