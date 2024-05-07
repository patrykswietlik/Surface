import { useEffect, useReducer } from 'react';
import { useLoaderData, useParams, useRevalidator, json, redirect } from 'react-router-dom';

import Wrapper from '../../shared/components/Layout/Wrapper';
import Header from '../../shared/components/Header/Header';
import Card from '../../shared/components/UI/Cards/Card';
import TasksList from '../components/TasksList';
import BarChartComponent from '../../shared/components/Charts/BarChart';
import TasksManager from '../components/TasksManager';

import './Tasks.css';

const DUMMY_TASKS = [
	{
		id: 't1',
		title: 'Home Page CSS Styling',
		description: 'Apply CSS styling to the home page to improve its appearance and layout.',
		deadline: '2024-01-05',
		teamId: 'te1',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't2',
		title: 'Database Migration',
		description: 'Migrate data to new database schema',
		deadline: '2024-04-10',
		teamId: 'te2',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't3',
		title: 'User Authentication',
		description: 'Implement user authentication system',
		deadline: '2024-02-15',
		teamId: 'te1',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't4',
		title: 'Bug Fixes',
		description: 'Resolve reported bugs in the application',
		deadline: '2024-11-20',
		teamId: 'te3',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't5',
		title: 'Feature Development',
		description: 'Add new features to enhance user experience',
		deadline: '2024-12-25',
		teamId: 'te2',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't6',
		title: 'Home Page CSS Styling',
		description: 'Apply CSS styling to the home page to improve its appearance and layout.',
		deadline: '2024-05-05',
		teamId: 'te1',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't7',
		title: 'Database Migration',
		description: 'Migrate data to new database schema',
		deadline: '2024-08-10',
		teamId: 'te2',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't8',
		title: 'User Authentication',
		description: 'Implement user authentication system',
		deadline: '2024-06-15',
		teamId: 'te1',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't9',
		title: 'Bug Fixes',
		description: 'Resolve reported bugs in the application',
		deadline: '2024-01-20',
		teamId: 'te3',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't10',
		title: 'Feature Development',
		description: 'Add new features to enhance user experience',
		deadline: '2024-02-25',
		teamId: 'te2',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't11',
		title: 'Home Page CSS Styling',
		description: 'Apply CSS styling to the home page to improve its appearance and layout.',
		deadline: '2024-03-05',
		teamId: 'te1',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't12',
		title: 'Database Migration',
		description: 'Migrate data to new database schema',
		deadline: '2024-04-10',
		teamId: 'te2',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't13',
		title: 'User Authentication',
		description: 'Implement user authentication system',
		deadline: '2024-05-15',
		teamId: 'te1',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't14',
		title: 'Bug Fixes',
		description: 'Resolve reported bugs in the application',
		deadline: '2024-06-20',
		teamId: 'te3',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't15',
		title: 'Feature Development',
		description: 'Add new features to enhance user experience',
		deadline: '2024-09-25',
		teamId: 'te2',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't16',
		title: 'Home Page CSS Styling',
		description: 'Apply CSS styling to the home page to improve its appearance and layout.',
		deadline: '2024-05-05',
		teamId: 'te1',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't17',
		title: 'Database Migration',
		description: 'Migrate data to new database schema',
		deadline: '2024-11-10',
		teamId: 'te2',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't18',
		title: 'User Authentication',
		description: 'Implement user authentication system',
		deadline: '2024-05-15',
		teamId: 'te1',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't19',
		title: 'Bug Fixes',
		description: 'Resolve reported bugs in the application',
		deadline: '2024-05-20',
		teamId: 'te3',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't20',
		title: 'Feature Development',
		description: 'Add new features to enhance user experience',
		deadline: '2024-05-25',
		teamId: 'te2',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
	{
		id: 't21',
		title: 'Home Page CSS Styling',
		description: 'Apply CSS styling to the home page to improve its appearance and layout.',
		deadline: '2024-05-05',
		teamId: 'te1',
		isTaken: false,
		isCompleted: false,
		isFlagged: false,
		userId: undefined,
	},
];

const tasksReducer = (state, action) => {
	const existingTasks = { ...state };
	let existingTaskIndex = undefined;
	let updatedTask = undefined;

	switch (action.type) {
		case 'INIT':
			return {
				tasks: action.payload.tasks,
			};

		case 'TAKE':
			const existingTask = existingTasks.tasks.find(task => task.id === action.payload.task.id);
			if (existingTask) {
				return existingTasks;
			}

			existingTasks.tasks.push(action.payload.task);

			return existingTasks;

		case 'COMPLETE':
			existingTaskIndex = existingTasks.tasks.findIndex(task => task.id === action.payload.id);

			if (existingTaskIndex === -1) {
				return existingTasks;
			}

			updatedTask = existingTasks.tasks[existingTaskIndex];
			updatedTask.isFlagged = false;
			updatedTask.isCompleted = true;

			existingTasks.tasks[existingTaskIndex] = updatedTask;
			return existingTasks;

		case 'FLAG':
			existingTaskIndex = existingTasks.tasks.findIndex(task => task.id === action.payload.id);

			if (existingTaskIndex === -1) {
				return existingTasks;
			}

			updatedTask = existingTasks.tasks[existingTaskIndex];
			updatedTask.isCompleted = false;
			updatedTask.isFlagged = true;

			existingTasks.tasks[existingTaskIndex] = updatedTask;
			return existingTasks;

		case 'REMOVE':
			existingTaskIndex = existingTasks.tasks.findIndex(task => task.id === action.payload.id);

			if (existingTaskIndex === -1) {
				return existingTasks;
			}

			updatedTask = existingTasks.tasks[existingTaskIndex];
			updatedTask.isTaken = false;
			updatedTask.isCompleted = false;
			updatedTask.isFlagged = false;

			existingTasks.tasks[existingTaskIndex] = updatedTask;
			return existingTasks;

		case 'RESET':
			existingTaskIndex = existingTasks.tasks.findIndex(task => task.id === action.payload.id);

			if (existingTaskIndex === -1) {
				return existingTasks;
			}

			updatedTask = existingTasks.tasks[existingTaskIndex];
			updatedTask.isTaken = true;
			updatedTask.isCompleted = false;
			updatedTask.isFlagged = false;

			existingTasks.tasks[existingTaskIndex] = updatedTask;
			return existingTasks;

		default:
			return { ...state };
	}
};

const Tasks = () => {
	const [managerState, dispatch] = useReducer(tasksReducer, {
		tasks: [],
	});

	const userId = useParams().userId;
	const tasksData = useLoaderData();
	const revalidator = useRevalidator();

	const takeTaskHandler = task => {
		dispatch({
			type: 'TAKE',
			payload: {
				task,
			},
		});
	};

	const completeTaskHandler = id => {
		dispatch({
			type: 'COMPLETE',
			payload: {
				id,
			},
		});
	};

	const flagTaskHandler = id => {
		dispatch({
			type: 'FLAG',
			payload: {
				id,
			},
		});
	};

	const removeTaskHandler = id => {
		dispatch({
			type: 'REMOVE',
			payload: {
				id,
			},
		});
	};

	const resetTaskHandler = id => {
		dispatch({
			type: 'RESET',
			payload: {
				id,
			},
		});
	};

	useEffect(() => {
		dispatch({
			type: 'INIT',
			payload: {
				tasks: tasksData.filter(task => task.isTaken),
			},
		});
	}, [tasksData]);

	return (
		<>
			<Header title='Ongoing Tasks' text='Manage tasks, modify their status and keep the deadline.' />
			<main className='tasks'>
				<Wrapper>
					<section className='tasks__section'>
						<Card type='card--half'>
							<h2 className='tasks__card-title'>Active</h2>
							<TasksList tasks={tasksData.filter(task => !task.isTaken)} onTake={takeTaskHandler} />
						</Card>
						<Card type='card--half'>
							<h2 className='tasks__card-title'>Occupancy</h2>
							<BarChartComponent data={tasksData} />
						</Card>
					</section>
					<section className='tasks__section'>
						<Card type='card--full'>
							<TasksManager
								key={revalidator.state}
								tasks={managerState.tasks}
								onComplete={completeTaskHandler}
								onFlag={flagTaskHandler}
								onRemove={removeTaskHandler}
								onReset={resetTaskHandler}
								revalidator={revalidator}
							/>
						</Card>
					</section>
				</Wrapper>
			</main>
		</>
	);
};

export default Tasks;

export const loader = async ({ params }) => {
	const userId = params.userId;
	const response = await fetch(`http://localhost:5000/api/tasks/${userId}`);

	if (!response.ok) {
		localStorage.removeItem('token');
		return redirect('/auth/login');
	}

	const responseData = await response.json();
	return responseData.tasks;
};
