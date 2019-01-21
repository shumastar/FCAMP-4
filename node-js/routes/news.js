const express = require('express');
const news = require('../db/news');
const router = express.Router();

router.get('/', function (req, res, next) {
  const newsList = news.articles;

  if (!Array.isArray(newsList)) {
    return next('Something went wrong.');
  }

  res.send(newsList);
});

router.get('/:id', function (req, res, next) {
  const articles = news.articles.find(news => news.id === req.params.id);

  if (!articles) {
    return next('Nothing was found');
  }

  res.send(articles);
});

router.post('/', function(req, res) {
  const { id, name, url } = req.body;

  if (!id || !name || !url) {
    res.status(404).send('Required data: id, name, url');
  }

  news.articles.push({ ...req.body });

  res.status(200).send('New article was successfully added');
});

router.put('/:id', function(req, res) {
  const articles = news.articles.find(news => news.id === req.params.id);

  if (!articles) {
    res.next('No article was found');
  }

  news.articles = news.articles.map(news => {
    if (news.id !== req.params.id) {
      return news;
    }

    return { ...news, ...req.body };
  });

  res.status(200).send('Article was updated');
});

router.delete('/:id', function(req, res) {
  const articles = news.articles.find(news => news.id === req.params.id);

  if (!articles) {
    res.next('Nothing to delete');
  }

  news.articles = news.articles.filter(news => news.id !== req.params.id);

  res.status(200).send('Article was deleted');
});

module.exports = router;
