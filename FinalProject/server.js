const express = require('express');
const session = require('express-session');
const MySQLStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const db = require('./db');
const routes = require('./routes');
const requireLogin = require('./middleware/auth');
const app = express();
const PORT = 3000;

require('dotenv').config();
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('CMS', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection failed:', err));

const sessionStore = new MySQLStore({ db: sequelize });

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
sessionStore.sync();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Login/Register
app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));


app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
app.use('/', routes);

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        return res.render('dashboard', { user: req.session.user });
    }
    res.redirect('/login');
});

// Logout route
app.get('/users/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Unable to log out');
        }
        res.redirect('/login');
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('/error.ejs');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
