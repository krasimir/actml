/** @jsx D */
import { D, speak } from 'dactory';
import express from 'express';
import { GetPosts, GetPost } from './logic';


const app = express();

app.use(express.static(__dirname + '/../client'));

app.get('/api/posts', async function (req, res) {
  res.json(await speak(<GetPosts />));
});
app.get('/api/post/:id', async function (req, res) {
  res.json(await speak(<GetPost id={ req.params.id } />));
});

app.listen(4500, () => console.log('Example app listening on port 4500!'));