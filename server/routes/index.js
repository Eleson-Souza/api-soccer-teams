const express = require('express');
const router = express.Router();
const TeamsController = require('../controllers/TeamsController');
const LoginController = require('../controllers/LoginController');
const CountriesController = require('../controllers/CountriesControllers');
const authToken = require('../middleware/authToken');

router.get('/teams/country', TeamsController.filterCountry);
router.post('/teams', authToken.authByToken, TeamsController.create);
router.get('/teams', authToken.authByToken, TeamsController.index);
router.get('/teams/:id', authToken.authByToken, TeamsController.show);
router.delete('/teams/:id', authToken.authByToken, TeamsController.delete);
router.put('/teams/:id', authToken.authByToken, TeamsController.update);

router.post('/auth', LoginController.newLogin);

router.get('/countries/all', CountriesController.listAll);

module.exports = router;