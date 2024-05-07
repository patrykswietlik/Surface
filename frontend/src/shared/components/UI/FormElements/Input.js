import { useEffect, useReducer } from 'react';

import { validate } from '../../../utils/validate';

import './Input.css';

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			const validation = validate(action.value, action.validators);
			return {
				...state,
				value: action.value,
				isValid: validation.isValid,
				error: validation.isValid ? undefined : validation.message,
			};
		case 'TOUCH':
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

const Input = ({ label, type, name, placeholder, errorText, validators, onInput }) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: '',
		isValid: false,
		isTouched: false,
		error: undefined,
	});

	useEffect(() => {
		onInput(name, inputState.isValid);
	}, [name, inputState.isValid, onInput]);

	const inputValueChangeHandler = event => {
		dispatch({
			type: 'CHANGE',
			value: event.target.value,
			validators,
		});
	};

	const inputTouchHandler = () => {
		dispatch({
			type: 'TOUCH',
		});
	};

	return (
		<div className='input'>
			<p className='input__content'>
				<label htmlFor={name}>{label}</label>
				<input
					className={!inputState.isValid && inputState.isTouched ? 'input--invalid' : 'input--valid'}
					type={type}
					name={name}
					placeholder={placeholder}
					onChange={inputValueChangeHandler}
					onBlur={inputTouchHandler}
					value={inputState.value}
				/>
			</p>
			{!inputState.isValid && inputState.isTouched && (
				<p className='input__error'>{inputState.error ? inputState.error : errorText}</p>
			)}
		</div>
	);
};

export default Input;
