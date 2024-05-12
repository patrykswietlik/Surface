import './Tag.css';

const Tag = ({ text }) => {
	return <div className={`tag tag--${text.toLowerCase()}`}>{text}</div>;
};

export default Tag;
