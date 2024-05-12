import { useState } from 'react';
import { useRevalidator } from 'react-router-dom';

import ActionButton from '../../shared/components/UI/Buttons/ActionButton';
import Tag from './Tag';

import './Task.css';

const Task = ({ id, title, description, isTaken, isCompleted, isFlagged }) => {
	const [isOpen, setIsOpen] = useState(false);
	const revalidator = useRevalidator();

	const changeTaskStateHandler = async actionType => {
		let value;
		switch (actionType) {
			case 'COMPLETE':
				value = !isCompleted;
				break;
			case 'FLAG':
				value = !isFlagged;
				break;
			case 'REMOVE':
				value = !isTaken;
				break;
		}
		const response = await fetch(`http://localhost:5000/api/tasks/${id}/edit`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ type: actionType, value }),
		});

		if (!response.ok) {
			//TODO: error handling
		}

		await response.json();
		revalidator.revalidate();
	};

	const toggleDetailsHandler = () => {
		setIsOpen(prevState => !prevState);
	};

	return (
		<li className='task' onClick={toggleDetailsHandler}>
			<h3>{title}</h3>
			<div className='task__tags'>
				{isCompleted && <Tag text='Completed' />}
				{isFlagged && <Tag text='Flagged' />}
			</div>
			{isOpen && (
				<div className='task__details'>
					<p>{description}</p>
					<div className='task__actions'>
						<ActionButton
							text='Done'
							onClick={() => {
								changeTaskStateHandler('COMPLETE');
							}}
						/>
						<ActionButton
							text='Flag'
							onClick={() => {
								changeTaskStateHandler('FLAG');
							}}
						/>
						<ActionButton
							text='Remove'
							onClick={() => {
								changeTaskStateHandler('REMOVE');
							}}
						/>
					</div>
				</div>
			)}
		</li>
	);
};

export default Task;
