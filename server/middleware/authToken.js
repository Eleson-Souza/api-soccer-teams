const jwt = require('jsonwebtoken');
const JWTSecret = 'O%6Xe?AE3[TL';
const Users = require('../models/Users');

function authByToken(req, res, next) {
    var token = req.headers['authorization'];
    token = token.split(' ')[1];
    
    if(token) {
        jwt.verify(token, JWTSecret, (error, data) => {
            if(error) {
                res.json({error: 'Token inválido!'});
                res.status(401);
                return;
            } else {
                req.token = token;
                req.userLogged = {
                    id: data.id,
                    name: data.name,
                    email: data.email
                }
                res.status(200);
                next();
            }
        });

    } else {
        res.json({error: 'Token vazio!'});
        res.status(401);
    }
}

module.exports = {
    authByToken,
    JWTSecret
}