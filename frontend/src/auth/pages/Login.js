import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import Header from '../../shared/components/Header/Header';
import Wrapper from '../../shared/components/Layout/Wrapper';
import Input from '../../shared/components/UI/FormElements/Input';
import Button from '../../shared/components/UI/Buttons/Button';

import './Login.css';

const Login = () => {
	const [error, setError] = useState(undefined);
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	const [formState, validityHandler] = useForm(
		{
			email: {
				valid: false,
				value: '',
			},
			password: {
				valid: false,
				value: '',
			},
		},
		false
	);

	useEffect(() => {
		authCtx.logout();
	}, []);

	const onLogin = async event => {
		event.preventDefault();
		const email = formState.inputs.email.value;
		const password = formState.inputs.password.value;

		const response = await fetch('http://localhost:5000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			setError('Invalid credentials, please try again');
			return;
		}

		const responseData = await response.json();
		console.log(responseData);
		authCtx.login(responseData.userId, responseData.token);
		navigate(`/user/${responseData.userId}/overview`);
	};

	return (
		<>
			<Header title='Login' text='Please provide your credentials.' />
			<main className='login'>
				<Wrapper>
					<form method='post' className='login__form' onSubmit={onLogin}>
						<Input
							label='E-mail'
							type='email'
							name='email'
							placeholder='Ensure your email includes an "@" symbol and a valid domain name.'
							errorText='Please provide a valid e-mail.'
							validators={['EMAIL']}
							onInput={validityHandler}
						/>
						<Input
							label='Password'
							type='password'
							name='password'
							placeholder='The password needs to be at least 8 characters long.'
							errorText='Please provide a valid password.'
							validators={['MIN-LENGTH']}
							onInput={validityHandler}
						/>
						{error && <p className='login__errors'>{error ? error : 'Something went wrong. Please try again.'}</p>}
						<Button text='Login' disabled={!formState.formValidity} type='submit' />
					</form>
				</Wrapper>
			</main>
		</>
	);
};

export default Login;
