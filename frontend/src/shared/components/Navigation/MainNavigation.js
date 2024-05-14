import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { NavLink, useNavigate } from 'react-router-dom';

import Wrapper from '../Layout/Wrapper';
import ActionButton from '../UI/Buttons/ActionButton';

import './MainNavigation.css';

const MainNavigation = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();

	let navContent;
	if (authCtx.token) {
		navContent = (
			<ul className='nav__content-links'>
				<NavLink
					to={`user/${authCtx.userId}/overview`}
					className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
					Overview
				</NavLink>
				<NavLink to={`tasks/${authCtx.userId}`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
					Tasks
				</NavLink>
				<NavLink to={`team/${authCtx.userId}`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
					Team
				</NavLink>
				{authCtx.role === 'ADMIN' && (
					<NavLink to='admin' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
						Admin
					</NavLink>
				)}
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
		authCtx.logout();
		navigate('/auth/login');
	};

	return (
		<nav className='nav'>
			<Wrapper>
				<header className='nav__content'>
					{navContent}
					<div className='nav__content-actions'>
						{authCtx.token && <ActionButton text='Logout' inverse onClick={logoutHandler} />}
					</div>
				</header>
			</Wrapper>
		</nav>
	);
};

export default MainNavigation;
