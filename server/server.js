const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./database/connection');
const router = require('./routes/index');

const app = express();

// body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() => {
        //console.log('Conexão ao banco realizada com sucesso!');
    })
    .catch((error) => {
        console.log('Houve um erro ao se conectar com o banco: ' + error);
    });

app.use(router);

const server = app.listen(3333, () => {
    console.log(`Aplicação rodando na porta ${server.address().port}`);
});