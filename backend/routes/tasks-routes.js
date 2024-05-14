const express = require('express');

const tasksControllers = require('../controllers/tasks-controllers');

const router = express.Router();

router.get('/', tasksControllers.getTasks);
router.post('/new', tasksControllers.addTask);
router.patch('/patchAll', tasksControllers.patchAllTasks);
router.patch('/:taskId/assign', tasksControllers.assignUserToTask);
router.patch('/:taskId/edit', tasksControllers.editTaskState);
router.get('/teams', tasksControllers.getTasksForTeams);
router.get('/:userId', tasksControllers.getTasksForTeam);

module.exports = router;
