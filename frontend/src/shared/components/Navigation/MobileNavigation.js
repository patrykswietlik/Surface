import { createPortal } from 'react-dom';
import { NavLink, useParams } from 'react-router-dom';

import BurgerButton from '../UI/Buttons/BurgerButton';
import { getToken } from '../../utils/auth';

import './MobileNavigation.css';
import { useState } from 'react';

const MobileNavigation = () => {
	const [isShown, setIsShown] = useState(false);
	const userId = useParams().userId;
	const token = getToken();

	const toggleNavHandler = () => {
		setIsShown(prevState => {
			return !prevState;
		});
	};

	let navContent;
	if (token) {
		navContent = (
			<>
				<ul className={`nav__links ${isShown ? 'isShown' : ''}`}>
					<NavLink
						to={`users/${userId}/overview`}
						className={({ isActive }) => (isActive ? 'active' : 'inactive')}
						onClick={toggleNavHandler}>
						Overview
					</NavLink>
					<NavLink
						to={`tasks/${userId}`}
						className={({ isActive }) => (isActive ? 'active' : 'inactive')}
						onClick={toggleNavHandler}>
						Tasks
					</NavLink>
					<NavLink to={`user/${userId}/team`} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
						Team
					</NavLink>
				</ul>
			</>
		);
	} else {
		navContent = (
			<ul className='nav__links'>
				<NavLink to='auth/login' className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
					Authorization
				</NavLink>
			</ul>
		);
	}

	return createPortal(
		<nav className='nav__mobile'>
			<BurgerButton onClick={toggleNavHandler} fixed={isShown} />
			{navContent}
		</nav>,
		document.getElementById('nav')
	);
};

export default MobileNavigation;
