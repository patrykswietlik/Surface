import ActionButton from '../../shared/components/UI/Buttons/ActionButton';
import { convertDate } from '../../shared/utils/date-converter';

import './TaskItem.css';

const TaskItem = ({ id, title, description, deadline, isTaken, user, displayOnly, onTake }) => {
	return (
		<li className={`task-item ${isTaken && 'task-item--picked'}`}>
			<h3>{title}</h3>
			<p>{description}</p>
			<p>
				<span>Due to:</span> {convertDate(deadline)}
			</p>
			<p>
				<span>{user && <span>Taken by: {user.name}</span>}</span>
			</p>

			{!displayOnly && (
				<p className='task-item__action-btn'>
					<ActionButton
						text={isTaken ? 'Taken' : 'Take'}
						disabled={isTaken}
						onClick={
							isTaken
								? () => {}
								: () => {
										onTake(id);
								  }
						}
					/>
				</p>
			)}
		</li>
	);
};

export default TaskItem;
