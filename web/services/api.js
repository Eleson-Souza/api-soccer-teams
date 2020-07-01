const axios = require('axios');

// criando base da url, para evitar repetições.
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

module.exports = api;