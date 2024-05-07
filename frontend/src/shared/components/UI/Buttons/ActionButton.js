import './ActionButton.css';

const ActionButton = ({ text, inverse, ...props }) => {
	return (
		<button className={`action-button action-button${inverse ? '--inverse' : '--normal'}`} {...props}>
			{text}
		</button>
	);
};

export default ActionButton;
