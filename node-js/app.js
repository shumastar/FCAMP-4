
const bodyParser = require('body-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./logger/logger');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const userController= require('./controllers/userController');

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const newsRouter = require('./routes/news');

const app = express();

passport.use(new BasicStrategy(
  function (username, password, cb) {
    userController.getByUsername(username)
      .then(user => {
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      })
      .catch(err => cb(err));
  })
);

passport.use(new BearerStrategy(
  function (token, done) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) { return done(err); }
      return done(null, decoded, { scope: 'all' });
    })
  }
));

passport.serializeUser(async function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(async function (obj, cb) {
  cb(null, obj);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
  logger.log(
    'info',
    `method: ${req.method}, params: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}`,
  );

  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news', newsRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
