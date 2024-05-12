import ActionButton from '../../shared/components/UI/Buttons/ActionButton';

import './TaskItem.css';

const TaskItem = ({ id, title, description, deadline, isTaken, displayOnly, onTake }) => {
	return (
		<li className={`task-item ${isTaken && 'task-item--picked'}`}>
			<h3>{title}</h3>
			<p>{description}</p>
			<p>
				<span>Due to:</span> {deadline}
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
