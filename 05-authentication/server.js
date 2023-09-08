const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const sessionSecret = process.env.SESSION_SECRET || 'mark it zero';
const adminPassword = process.env.ADMIN_PASSWORD || 'iamthewalrus';

const api = require('./api');
const middleware = require('./middleware');

const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());
app.use(
  require('express-session')({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy((username, password, done) => {
    if (username === 'admin' && password === adminPassword) {
      return done(null, { username: 'admin' });
    } else {
      return done(null, false, { message: 'Incorrect username or password.' });
    }
  })
);

app.post('/login', passport.authenticate('local'), function (req, res) {
  return res.json({ success: true });
});

app.get('/products', api.listProducts);
app.post('/products', ensureAdmin, api.createProduct);
app.get('/products/:id', api.getProduct);
app.put('/products/:id', ensureAdmin, api.editProduct);
app.delete('/products/:id', ensureAdmin, api.deleteProduct);

app.get('/orders', ensureAdmin, api.listOrders);
app.post('/orders', ensureAdmin, api.createOrder);

app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => console.log(`Server listening on port ${port}`));

function ensureAdmin(req, res, next) {
  const isAdmin = req.user && req.user.username === 'admin';
  if (isAdmin) return next();

  res.status(401).json({ error: 'Unauthorized' });
}
