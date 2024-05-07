import TaskItem from './TaskItem';

import './TasksList.css';

const TasksList = ({ tasks, onTake }) => {
	if (tasks.length === 0) {
		return <p className='tasks__empty'>No tasks available.</p>;
	}

	return (
		<ul className='tasks__list'>
			{tasks.map(task => (
				<TaskItem key={task.id} {...task} onTake={onTake} />
			))}
		</ul>
	);
};

export default TasksList;
