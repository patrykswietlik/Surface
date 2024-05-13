import { useContext } from 'react';
import { useNavigate, useRevalidator } from 'react-router-dom';

import TaskItem from './TaskItem';
import { AuthContext } from '../../shared/context/auth-context';

import './TasksList.css';

const TasksList = ({ tasks }) => {
	const authCtx = useContext(AuthContext);
	const revalidator = useRevalidator();
	const navigate = useNavigate();

	const takeTaskHandler = async tid => {
		const userId = authCtx.userId;
		const response = await fetch(`http://localhost:5000/api/tasks/${tid}/assign`, {
			method: 'PATCH',
			headers: {
				Authorization: 'Baerer ' + authCtx.token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userId }),
		});

		if (!response.ok) {
			authCtx.logout();
			navigate('/auth/login');
		}

		await response.json();
		revalidator.revalidate();
	};

	if (tasks.length === 0) {
		return <p className='tasks__empty'>No tasks available.</p>;
	}

	return (
		<ul className='tasks__list'>
			{tasks.map(task => (
				<TaskItem key={task.id} {...task} onTake={takeTaskHandler} />
			))}
		</ul>
	);
};

export default TasksList;
