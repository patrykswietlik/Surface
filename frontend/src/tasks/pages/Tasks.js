import { useContext } from 'react';
import { useLoaderData, redirect } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import Wrapper from '../../shared/components/Layout/Wrapper';
import Header from '../../shared/components/Header/Header';
import Card from '../../shared/components/UI/Cards/Card';
import TasksList from '../components/TasksList';
import BarChartComponent from '../../shared/components/Charts/BarChart';
import Task from '../components/Task';

import './Tasks.css';

const Tasks = () => {
	const authCtx = useContext(AuthContext);
	const tasksData = useLoaderData();

	return (
		<>
			<Header title='Ongoing Tasks' text='Manage tasks, modify their status and keep the deadline.' />
			<main className='tasks'>
				<Wrapper>
					<section className='tasks__section'>
						<Card type='card--half'>
							<h2 className='tasks__card-title'>Active</h2>
							<TasksList tasks={tasksData} />
						</Card>
						<Card type='card--half'>
							<h2 className='tasks__card-title'>Occupancy</h2>
							<BarChartComponent data={tasksData} />
						</Card>
					</section>
					<section className='tasks__section'>
						<ul className='tasks__user-tasks'>
							{tasksData
								.filter(task => task.user === authCtx.userId)
								.map(task => (
									<Card key={task.id} type='card--wide'>
										<Task {...task} />
									</Card>
								))}
						</ul>
					</section>
				</Wrapper>
			</main>
		</>
	);
};

export default Tasks;

export const loader = async ({ params }) => {
	const userId = params.userId;
	const { token } = JSON.parse(localStorage.getItem('userData'));

	const response = await fetch(`http://localhost:5000/api/tasks/${userId}`, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

	if (!response.ok) {
		return redirect('/auth/login');
	}

	const responseData = await response.json();
	return responseData;
};
