const express = require('express');
const router = require('./routes/index');
const path = require('path');
const { dirname } = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

// EJS
app.set('view engine', 'ejs');

// Body-Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static
app.use(express.static(path.resolve(__dirname, 'public')));

// Session
app.use(session({
    secret: "passwordSecret", cookie: { maxAge: 3600000 },
    resave: true,
    saveUninitialized: true
}));

app.use(router);

app.listen(3334, () => {
    console.log('Aplicação funcionando na porta 3334!');
});