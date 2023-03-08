const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'your_secret_key',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// app.use((req, res, next) => {
//     res.locals.isAuthenticated = req.session.isLoggedIn;
//     next();
// })

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// route to display the new post form:
    // note no need to use withAuth middleware b/c its called in the Post model
app.get('/posts/new', (req, res) => {
    res.render('new-post', { pageTitle: 'New Post' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Server now listening'));
});