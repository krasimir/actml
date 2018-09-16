/** @jsx D */
import { D, speak } from 'dactory';
import express from 'express';
import bodyParser from 'body-parser';

import { GetPosts, GetPost, AddPost, DeletePost, HandleError } from './logic';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 
app.use(express.static(__dirname + '/../client'));

app.get('/api/posts', async function (req, res) {
  res.json(await speak(<GetPosts />));
});
app.get('/api/post/:id', async function (req, res) {
  const { post, error } = await speak(
    <D>
      <GetPost id={ req.params.id } exports='post' onError={
        <HandleError exports='error' />
      }/>
    </D>
  );

  if (post) {
    res.json(post);
  } else {
    res.status(500).json({ error });
  }
});
app.post('/api/post', async function (req, res) {
  res.json(await speak(<AddPost { ...req.body } />));
});
app.delete('/api/post/:id', async function (req, res) {
  const { post, error } = await speak(
    <D>
      <DeletePost id={ req.params.id } exports='post' onError={
        <HandleError exports='error' />
      }/>
    </D>
  );

  if (post) {
    res.json({ status: 'success' });
  } else {
    res.status(500).json({ error });
  }
});

app.listen(4500, () => console.log('Example app listening on port 4500!'));