require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('conectado ao db');
        app.emit('pronto');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require(path.resolve(__dirname, 'src', 'middlewares', 'middleware.js'));

app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'asldkjf asldkfjalsfsd fsdfs(( sdaklflsd dkdkd dkfjasldkfj s ()a sdfkj',
    store: new MongoStore({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//Meus próprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, '0.0.0.0', () => {
        console.log('Servidor executando na porta 3000');
        console.log('Acessar http://<IP-da-VM>:3000');
    });
});
