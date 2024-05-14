const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');
const authRoutes = require('./routes/auth-routes');
const tasksRoutes = require('./routes/tasks-routes');
const usersRoutes = require('./routes/users-routes');
const teamsRoutes = require('./routes/teams-routes');
const auth = require('./middleware/auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

	next();
});

app.use('/api/auth', authRoutes);
app.use(auth);
app.use('/api/tasks', tasksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/teams', teamsRoutes);

app.use((req, res, next) => {
	throw new HttpError('Could not find this route', 404);
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
	.connect(process.env.DB_CONNECT)
	.then(() => app.listen(5000))
	.catch(err => {
		console.log(err);
	});
