const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const authToken = require('../middleware/authToken');

exports.newLogin = (req, res) => {
    const { email, password } = req.body;

    Users.findOne({ where: { email: email } }).then(user => {
        if(user) {

            if(user.password == password) {
                jwt.sign({
                        id: user.id,
                        name: user.name,
                        email: user.email
                }, authToken.JWTSecret, {expiresIn: '48h'}, (error, token) => {
                    if(error) {
                        res.json({error: 'Falha ao gerar token!'});
                        res.status(400);
                    } else {
                        // retirnando token
                        res.json({
                            token, 
                            id: user.id, 
                            name: user.name, 
                            email: user.email
                        });

                        // salvando token no banco
                        /* Users.update({
                            token
                        }, { where: {
                            id: user.id
                        }}); */

                        res.status(200);
                    }
                });
            } else {
                res.json({status: 'Senha incorreta!'});
                res.status(401);
            }

        } else {
            res.json({status: 'E-mail não registrado na base de dados!'});
            res.status(401);
        }
    });
};