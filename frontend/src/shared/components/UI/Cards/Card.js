import './Card.css';

const Card = ({ children, type }) => {
	return <div className={`card ${type}`}>{children}</div>;
};

export default Card;
