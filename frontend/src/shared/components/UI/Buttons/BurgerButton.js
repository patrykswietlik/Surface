import './BurgerButton.css';

const BurgerButton = ({ onClick, fixed }) => {
	return (
		<button className={`burger-btn ${fixed ? 'burger__fixed' : ''}`} onClick={onClick}>
			<div className='burger-btn__line'></div>
			<div className='burger-btn__line'></div>
			<div className='burger-btn__line'></div>
		</button>
	);
};

export default BurgerButton;
