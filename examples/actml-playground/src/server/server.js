import express from 'express';

const app = express();

app.use(express.static(__dirname + '/../client'));

app.listen(4500, () => console.log('Example app listening on port 4500!'));
