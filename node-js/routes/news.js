const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const passport = require('passport');

router.get('/', async (req, res) => res.json(await newsController.getAll()));

router.get('/:id', async (req, res) => {
  const result = await newsController.getById(req.params.id);
  if (!result) {
    req.next();
    return;
  }
  res.json(result);
});

router.post('/',
  passport.authenticate('bearer', { session: false }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      await newsController.add(req.body);
    } catch (err) {
      next(err);
    }
    res.send();
  }
);

router.put('/:id',
  passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const id = req.params.id;
    const newsToUpdate = await newsController.getById(id);
    if (!newsToUpdate) {
      req.next();
      return;
    }

    try {
      await newsController.update(id, req.body);
    } catch (err) {
      next(err);
    }
    res.send();
  }
);

router.delete('/:id',
  passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    const id = req.params.id;
    const newsToDelete = await newsController.getById(id);
    if (!newsToDelete) {
      req.next();
      return;
    }
    await newsService.delete(id);
    res.send();
  });

router.delete('/',
  passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    await newsController.deleteAll();
    res.send();
  });

module.exports = router;
