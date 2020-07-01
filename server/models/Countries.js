const sequelize = require('sequelize');
const connection = require('../database/connection');

const Countries = connection.define('countries', {
    country: {
        type: sequelize.STRING,
        allowNull: false
    },
});

module.exports = Countries;