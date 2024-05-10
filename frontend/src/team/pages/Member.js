import ActionButton from '../../shared/components/UI/Buttons/ActionButton';
import Card from '../../shared/components/UI/Cards/Card';

import './Member.css';

const Member = ({ name, email }) => {
	return (
		<Card type='card--third'>
			<div className='member'>
				<div className='member__info'>
					<h3>{name}</h3>
					<p>E-mail: {email}</p>
					<p>Phone: 999-999-999</p>
					<p>Working hours: 08:00 - 17:00</p>
				</div>
				<ActionButton text='Contact' />
			</div>
		</Card>
	);
};

export default Member;
