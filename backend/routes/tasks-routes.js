const express = require('express');

const tasksControllers = require('../controllers/tasks-controllers');

const router = express.Router();

router.get('/', tasksControllers.getTasks);
router.post('/new', tasksControllers.addTask);
router.patch('/patchAll', tasksControllers.patchAllTasks);
router.get('/:userId', tasksControllers.getTasksByUserTeam);
router.post('/:taskId/assign', tasksControllers.assignTaskToUser);

module.exports = router;
