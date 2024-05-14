import { useLoaderData } from 'react-router-dom';

import Header from '../../shared/components/Header/Header';
import Wrapper from '../../shared/components/Layout/Wrapper';
import Card from '../../shared/components/UI/Cards/Card';

import './Admin.css';
import TasksRecord from '../components/TasksRecord';

const Admin = () => {
	const tasks = useLoaderData().tasks;

	return (
		<>
			<Header title='Admin panel' text='Full access to tasks, employees and teams.' />
			<main className='admin'>
				<Wrapper>
					<div className='admin__records'>
						{tasks.map((task, index) => (
							<Card key={index} type='card--wide'>
								<TasksRecord team={task.team} tasks={task.tasks} />
							</Card>
						))}
					</div>
				</Wrapper>
			</main>
		</>
	);
};

export default Admin;

export const loader = async () => {
	const { token } = JSON.parse(localStorage.getItem('userData'));

	const response = await fetch('http://localhost:5000/api/tasks/teams', {
		headers: {
			Authorization: 'Baerer ' + token,
		},
	});

	if (!response.ok) {
		//something bad happen
	}

	const responseData = await response.json();
	return responseData;
};
