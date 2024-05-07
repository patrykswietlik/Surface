import Wrapper from '../Layout/Wrapper';

import './Header.css';

const Header = ({ title, text }) => {
	return (
		<header className='header'>
			<Wrapper>
				<h1 className='header__title'>{title}</h1>
				<p className='header__text'>{text}</p>
			</Wrapper>
		</header>
	);
};

export default Header;
