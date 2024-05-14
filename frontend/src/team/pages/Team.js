import { json, redirect, useLoaderData } from 'react-router-dom';

import Header from '../../shared/components/Header/Header';
import Wrapper from '../../shared/components/Layout/Wrapper';
import Member from './Member';

import './Team.css';

const Team = () => {
	const teamData = useLoaderData();

	return (
		<>
			<Header title={teamData.name} text='You can learn more about your team here.' />
			<main className='team'>
				<Wrapper>
					<ul className='team__members-list'>
						{teamData.members.map(member => (
							<Member key={member.id} name={member.name} email={member.email} />
						))}
					</ul>
				</Wrapper>
			</main>
		</>
	);
};

export default Team;

export const loader = async ({ params }) => {
	const userId = params.userId;
	const { token } = JSON.parse(localStorage.getItem('userData'));

	const response = await fetch(`http://localhost:5000/api/teams/${userId}`, {
		headers: {
			Authorization: 'Baerer ' + token,
		},
	});

	if (!response.ok) {
		return redirect('/auth/login');
	}

	const responseData = await response.json();
	return responseData;
};
