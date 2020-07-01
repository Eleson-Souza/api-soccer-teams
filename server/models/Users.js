const sequelize = require('sequelize');
const connection = require('../database/connection');

const Users = connection.define('users', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    token: {
        type: sequelize.STRING,
        allowNull: true
    }
});

module.exports = Users;