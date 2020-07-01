const Countries = require('../models/Countries');
const { response } = require('express');

exports.listAll = (req, res) => {
    Countries.findAll({
        order: [
            ['country', 'asc']
        ]
    }).then(countries => {
        res.json(countries);
    });
};