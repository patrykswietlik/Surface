import './TasksRecord.css';

import { convertDate } from '../../shared/utils/date-converter';

const TasksRecord = ({ team, tasks }) => {
	return (
		<div className='tasks-record'>
			<h3>Team: {team}</h3>
			<ul className='tasks-record__list'>
				{tasks.length === 0 && <p>No tasks.</p>}
				{tasks.map(task => (
					<li key={task._id} className='tasks-record__task'>
						<h4>{task.title}</h4>
						<p>{task.description}</p>
						<p>{convertDate(task.deadline)}</p>
						{task.user ? <p>Taken by: {task.user.name}</p> : <p>Available</p>}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TasksRecord;
