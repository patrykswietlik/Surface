const express = require('express');

const usersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get('/:userId', usersControllers.getUserById);
router.patch('/:userId/assign', usersControllers.assignUserToTeam);
router.patch('/:userId/role', usersControllers.changeUserRole);

module.exports = router;
