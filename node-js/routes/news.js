const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('News');
  });
  
  router.get('/:id', (req, res) => {
    res.send(`News ${req.params.id}`);
  });
  
  router.post('/', (req, res) => {
    const news = req.body;
    data.push(news);
    res.status(201).send('Added');
  });
  
  router.put('/:id', (req, res) => {
    const put_id = req.params.id;
    const news = req.body;
    res.send('Etided');
  });
  
  router.delete('/:id', (req, res) => {
    const del_id = req.params.id;
    res.send(`Deleted ${req.params.id}`);
  });
  
  module.exports = router;
