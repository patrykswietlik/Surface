import './ActionButton.css';

const ActionButton = ({ text, inverse, disabled, ...props }) => {
	return (
		<button
			className={`action-button action-button${inverse ? '--inverse' : '--normal'} ${
				disabled && 'action-button--blocked'
			}`}
			disabled={disabled}
			{...props}>
			{text}
		</button>
	);
};

export default ActionButton;
