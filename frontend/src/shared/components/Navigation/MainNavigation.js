import { NavLink, useNavigate, useParams } from 'react-router-dom';

import Wrapper from '../Layout/Wrapper';
import { getToken } from '../../utils/auth';
import ActionButton from '../UI/Buttons/ActionButton';

import './MainNavigation.css';

const MainNavigation = () => {
	const userId = useParams().userId;
	const navigate = useNavigate();
	const token = getToken();

	let navContent;
	if (token) {
		navContent = (
			<ul className='nav__content-links'>
				<NavLink to={`users/${userId}/overview`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
					Overview
				</NavLink>
				<NavLink to={`tasks/${userId}`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
					Tasks
				</NavLink>
				<NavLink to={`user/${userId}/team`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
					Team
				</NavLink>
			</ul>
		);
	} else {
		navContent = (
			<ul className='nav__content-links'>
				<NavLink to='auth/login' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
					Authorization
				</NavLink>
			</ul>
		);
	}

	const logoutHandler = () => {
		localStorage.removeItem('token');
		navigate('/auth/login');
	};

	return (
		<nav className='nav'>
			<Wrapper>
				<header className='nav__content'>
					{navContent}
					<div className='nav__content-actions'>
						{token && <ActionButton text='Logout' inverse onClick={logoutHandler} />}
					</div>
				</header>
			</Wrapper>
		</nav>
	);
};

export default MainNavigation;
