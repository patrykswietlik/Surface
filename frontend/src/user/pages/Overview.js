import { json, redirect, useLoaderData } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Header from '../../shared/components/Header/Header';
import Wrapper from '../../shared/components/Layout/Wrapper';

import './Overview.css';

const DUMMY_USERS = [
	{ id: 'dawdawdawdawdawd', name: 'Patryk', email: 's193130@student.pg.edu.pl', password: 'testtest' },
	{ id: 'dawdawgghcccccc', name: 'Patrykk', email: 'ss193130@student.pg.edu.pl', password: 'testtestt' },
	{ id: 'adsadasdad', name: 'Patrykkk', email: 'sss193130@student.pg.edu.pl', password: 'testtesttt' },
];

const DUMMY_TASKS = [
	{
		id: 't1',
		title: 'Home Page CSS Styling',
		description: 'Apply CSS styling to the home page to improve its appearance and layout.',
		deadline: '2024-05-05',
		teamId: 'te1',
	},
	{
		id: 't2',
		title: 'Database Migration',
		description: 'Migrate data to new database schema',
		deadline: '2024-05-10',
		teamId: 'te2',
	},
	{
		id: 't3',
		title: 'User Authentication',
		description: 'Implement user authentication system',
		deadline: '2024-05-15',
		teamId: 'te1',
	},
	{
		id: 't4',
		title: 'Bug Fixes',
		description: 'Resolve reported bugs in the application',
		deadline: '2024-05-20',
		teamId: 'te3',
	},
	{
		id: 't5',
		title: 'Feature Development',
		description: 'Add new features to enhance user experience',
		deadline: '2024-05-25',
		teamId: 'te2',
	},
];

const Overview = () => {
	const user = useLoaderData();

	return (
		<>
			<Header
				title={`Welcome Back, ${user.name}!`}
				text='Nice to see you again, please check out the latest tasks assigned to you.'
			/>
			<main className='overview section-padding'>
				<Wrapper>
					<p>{user.email}</p>
				</Wrapper>
			</main>
		</>
	);
};

export default Overview;

export const loader = async ({ params }) => {
	const userId = params.userId;
	const { token } = JSON.parse(localStorage.getItem('userData'));

	const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
		headers: {
			Authorization: 'Bearer ' + token,
		},
	});

	if (!response.ok) {
		throw json({ message: 'Could not fetch user, please try again.' }, { status: 500 });
	}

	const responseData = await response.json();

	return responseData;
};
