const express = require('express');

const teamsControllers = require('../controllers/teams-controllers');

const router = express.Router();

router.post('/new', teamsControllers.createTeam);
router.get('/:userId', teamsControllers.getTeamByUserId);

module.exports = router;
