const express = require('express');

const teamsControllers = require('../controllers/teams-controllers');

const router = express.Router();

router.post('/new', teamsControllers.createTeam);

module.exports = router;
