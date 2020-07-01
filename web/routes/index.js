const express = require('express');
const router = express.Router();
const api = require('../services/api');
const axios = require('axios');

const authLogin = require('../middlewares/authLogin');

router.get('/', authLogin.isLogged, async (req, res) => {
    const responseCountries = await axios.get('http://localhost:3333/countries/all');
    api.get('/teams', req.session.axiosConfig).then((response) => {
        res.render('pages/Home', { 
            data: response.data, 
            countries: responseCountries.data
        });
    });
});

router.get('/login', (req, res) => {
    res.render('pages/Login');
});

router.post('/login', (req, res) => {
    const {email, password} = req.body;

    api.post('/auth', {email, password}).then((response) => {
        const token = response.data.token;
        
        if(token) {
            
            req.session.axiosConfig = {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }

            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
});

router.get('/novo-time', authLogin.isLogged, async (req, res) => {
    const responseCountries = await axios.get('http://localhost:3333/countries/all');
    const responseUfs = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');

    res.render('pages/newTeam', {
        apiCountries: responseCountries.data,
        apiUfs: responseUfs.data
    });
});

router.post('/novo-time', (req, res) => {
    const { name, stadium, coach, country, uf, city } = req.body;

    let configHeader = req.session.axiosConfig;
    let data = {
        name,
        stadium,
        coach, 
        country, 
        uf, 
        city
    }
    api.post('/teams', data, configHeader).then(response => {

        if(response.data) {
            res.redirect('/');
        } else {
            res.redirect('/novo-time');
        }
    });
});

router.get('/edicao-time/:id', authLogin.isLogged, async (req, res) => {
    const id = req.params.id;

    const team = await api.get(`/teams/${id}`, req.session.axiosConfig);
    const responseCountries = await axios.get('http://localhost:3333/countries/all');
    const responseUfs = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');


    res.render('pages/editTeam', {
        team: team.data,
        apiCountries: responseCountries.data,
        apiUfs: responseUfs.data
    });
});

router.post('/edicao-time/:id', authLogin.isLogged, (req, res) => {
    const { name, stadium, coach, country, uf, city } = req.body;
    const id = req.params.id;

    const data = {
        name,
        stadium,
        coach,
        country,
        uf,
        city
    };

    api.put(`/teams/${id}`, data, req.session.axiosConfig).then(response => {
        if(response.status == 200) {
            res.redirect('/');
        } else {
            res.redirect(`/teams/${id}`);
        }
    });
});

router.post('/delecao-time', (req, res) => {
    const id = req.body.id;

    api.delete(`/teams/${id}`, req.session.axiosConfig).then(response => {
        if(response.status == 200) {
            res.redirect('/');
        }
    });
});

router.get('/pais', async (req, res) => {
    const country = req.query.country;
    
    const responseCountries = await axios.get('http://localhost:3333/countries/all');
    api.get(`/teams/country?country=${country}`).then((response) => {
        res.render('pages/Home', {
            data: response.data,
            countries: responseCountries.data
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.axiosConfig = undefined;
    res.redirect('/login');
});

module.exports = router;