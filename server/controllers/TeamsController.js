const Teams = require('../models/Teams');
const sequelize = require('sequelize');

// Criar novo time
exports.create = async (req, res) => {
    const { name, stadium, coach, country, uf, city } = req.body;
    
    if(!name || !stadium || !country || !city) {
        res.status(400);
        res.json({status: 'Campos obrigatórios não preenchidos!'});
        return;
    }

    try {

        await Teams.create({
            name,
            stadium,
            coach,
            country,
            uf,
            city,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        
        const team = await 
            Teams.findOne({
                order: [
                    ['id', 'desc']
                ]
            });
        
            res.json(team);
            res.status(200);

    } catch(error) {
        res.sendStatus(400);
    }
};

// listar todos os times
exports.index = async (req, res) => {
    try {
        const teams = await Teams.findAll();

        res.json(teams);
    } catch(error) {
        res.sendStatus(404);
    }
};

// Listar time específico
exports.show = async (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)) {
        res.sendStatus(400);
        return;
    }

    try {
        const team = await Teams.findByPk(id);

        if(team) {
            res.json(team);
        } else {
            res.status(404);
            res.json({ status: 'Não encontrado!' });
        }
    } catch(error) {
        res.sendStatus(400);
    }
};

// deletar time específico
exports.delete = async (req, res) => {
    const id = Number(req.params.id);

    if(isNaN(id)) {
        res.sendStatus(400);
        return;
    }

    try {
        const team = await Teams.findByPk(id);
        if(team) {
            await Teams.destroy({where: {id: id}});
            res.sendStatus(200);
        } else {
            res.status(404);
            res.json({status: 'Não encontrado!'});
        }
    } catch(error) {
        res.sendStatus(400);
    }
};

// atualizar um time
exports.update = async (req, res) => {
    const id = Number(req.params.id);
    const { name, stadium, coach, country, uf, city } = req.body;

    if(isNaN(id)) {
        res.status(400);
        res.json({status: 'id inválido!'});
        return;
    }

    if(!name || !stadium || !country || !city) {
        res.status(400);
        res.json({status: 'Campos obrigatórios não preenchidos!'});
        return;
    }

    try {
        const team = await Teams.findByPk(id);

        if(team) {
            await Teams.update({
                name,
                stadium,
                coach,
                country,
                uf,
                city,
                updatedAt: Date.now()
            }, {
                where: {id: id}
            });
        
            res.sendStatus(200);
        } else {
            res.status(404);
            res.json({status: 'Não encontrado!'});
        }
    } catch(error) {
        res.sendStatus(400);
    }
}

// filtrar times por país
exports.filterCountry = async (req, res) => {
    const { country } = req.query;
    
    const teamsByCountry = await Teams.findAll({
        where: {
            country: country
        },
        order: [
            ['name', 'asc']
        ]
    });

    res.json(teamsByCountry);
}