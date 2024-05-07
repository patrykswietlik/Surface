import './Button.css';

const Button = ({ text, disabled, ...props }) => {
	return (
		<button className={`button button${disabled ? '--disabled' : '--valid'}`} disabled={disabled} {...props}>
			{text}
		</button>
	);
};

export default Button;
