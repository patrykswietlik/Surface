const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/:userId', usersControllers.getUserById);
router.post('/:userId/assign', usersControllers.assignUserToTeam);

module.exports = router;
