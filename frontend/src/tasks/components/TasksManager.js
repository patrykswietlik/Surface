import { useState } from 'react';

import TaskItem from './TaskItem';
import Spinner from '../../shared/components/UI/Spinner/Spinner';
import ActionButton from '../../shared/components/UI/Buttons/ActionButton';

import './TasksManager.css';

const TasksManager = ({ tasks, onComplete, onFlag, onRemove, onReset, revalidator }) => {
	const [isLoading, setIsLoading] = useState(false);

	const submitChangesHandler = async () => {
		setIsLoading(true);
		const response = await fetch('http://localhost:5000/api/tasks/patchAll', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(tasks),
		});
		const responseData = await response.json();
		setIsLoading(false);
		revalidator.revalidate();
	};

	const fitleredTasks = tasks.filter(task => task.isTaken);

	return (
		<div className='manager'>
			<div className='manager__actions'>
				<h2 className='manager__card-title'>Your tasks</h2>
				<ActionButton text='Save Changes' inverse onClick={submitChangesHandler} />
			</div>
			{revalidator.state === 'idle' && !isLoading && (
				<ul className='manager__list'>
					{fitleredTasks.map(task => (
						<div key={task.id} className='manager__item'>
							<div className='manager__item-main'>
								<TaskItem {...task} displayOnly />
								<p className='manager__item-status'>
									Status:{' '}
									<span
										className={`manager__item--default ${
											task.isCompleted ? 'manager__item--completed' : task.isFlagged ? 'manager__item--flagged' : ''
										}`}>
										{task.isCompleted ? 'Completed' : task.isFlagged ? 'Flagged' : 'Working on'}
									</span>
								</p>
							</div>
							<TaskManagerActions
								task={task}
								onComplete={onComplete}
								onFlag={onFlag}
								onRemove={onRemove}
								onReset={onReset}
							/>
						</div>
					))}
				</ul>
			)}
			{(revalidator.state === 'loading' || isLoading) && <Spinner />}
		</div>
	);
};

const TaskManagerActions = ({ task, onComplete, onFlag, onRemove, onReset }) => {
	return (
		<div className='manager__item-actions'>
			<ActionButton
				text='Complete'
				onClick={() => {
					onComplete(task.id);
				}}
			/>
			<ActionButton
				text='Flag'
				onClick={() => {
					onFlag(task.id);
				}}
			/>

			<ActionButton
				text='Reset'
				onClick={() => {
					onReset(task.id);
				}}
			/>

			<ActionButton
				text='Remove'
				onClick={() => {
					onRemove(task.id);
				}}
			/>
		</div>
	);
};

export default TasksManager;
