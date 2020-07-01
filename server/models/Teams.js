const sequelize = require('sequelize');
const connection = require('../database/connection');

const Teams = connection.define('teams', {
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    stadium: {
        type: sequelize.STRING,
        allowNull: false
    },
    coach: {
        type: sequelize.STRING,
        allowNull: true
    },
    country: {
        type: sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: sequelize.STRING,
        allowNull: true
    },
    city: {
        type: sequelize.STRING,
        allowNull: false
    },
});

//Teams.sync({force: false});

module.exports = Teams;