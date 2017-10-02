import express from 'express';
var router = express.Router();
import pgpFactory from 'pg-promise';
const pgp = pgpFactory();
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = pgp(process.env[config.use_env_variable]);

//Mocks
import authorMock from '../mocks/author.json';

//classes
import Post from '../class/post';

router.get('/api/author', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(authorMock));
});

router.get('/api/posts', function(req, res) {
  db.any('SELECT name, content FROM "Posts"')
    .then(function(data) {
      res.setHeader('Content-Type', 'application/json');
      const Posts = data.map((elem) => new Post(elem.name).content(elem.content));
      res.send(JSON.stringify(Posts));
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

router.post('/api/posts', function(req, res) {
  req.accepts('application/json');
  var NewPost = new Post(req.body[0].name).content(req.body[0].content);
  db.query('INSERT INTO "Posts" (name, content, created_at, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (content) DO NOTHING',
   [NewPost.getName(), NewPost.getContent()])
    .then(function() {
      res.status(201).send();
    })
    .catch(function(error) {
      res.status(404).send();
    });
});

router.delete('/api/postremove', function(req, res) {
  req.accepts('application/json');
  db.none('DELETE FROM "Posts" WHERE NAME = $1', req.body[0].name)
    .then(function() {
      res.status(204).send();
    })
    .catch(function(error) {
      res.status(409).send();
    });
});

export default router;
