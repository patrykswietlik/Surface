import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ActionButton from '../../shared/components/UI/Buttons/ActionButton';

import './TaskItem.css';

const TaskItem = ({ id, title, description, deadline, displayOnly, onTake }) => {
	const [isPicked, setIsPicked] = useState(false);

	return (
		<li className={`task-item ${isPicked && 'task-item--picked'}`}>
			<h3>{title}</h3>
			<p>{description}</p>
			<p>
				<span>Due to:</span> {deadline}
			</p>

			{!displayOnly && (
				<p className='task-item__action-btn'>
					<ActionButton
						text='Take'
						onClick={() => {
							setIsPicked(true);
							onTake({
								id,
								title,
								description,
								deadline,
								isTaken: true,
								isCompleted: false,
								isFlagged: false,
							});
						}}
					/>
				</p>
			)}
		</li>
	);
};

export default TaskItem;
