const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', async (req, res) => {
  await userController.add(req.body);
  res.send();
});

router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!(username && password)) {
    return authenticationFailed(res);
  }

  const user = await userController.getByUsername(username);

  if (!user) {
    return authenticationFailed(res);
  }

  if (!(username === user.username && password === user.password)) {
    return res.send(403).json({
      success: false,
      message: 'Check entered username or password'
    });
  }
});

router.get('/login',
  function (req, res) {
    res.render('login');
  });

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user: req.user });
  });

function authenticationFailed(res) {
  return res.send(400).json({
    success: false,
    message: 'Access denied!'
  });
}

module.exports = router;
