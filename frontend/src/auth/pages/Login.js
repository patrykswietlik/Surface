import { Form, json, redirect, useActionData } from 'react-router-dom';

import { useForm } from '../../shared/hooks/form-hook';
import Header from '../../shared/components/Header/Header';
import Wrapper from '../../shared/components/Layout/Wrapper';
import Input from '../../shared/components/UI/FormElements/Input';
import Button from '../../shared/components/UI/Buttons/Button';

import './Login.css';

const Login = () => {
	const [formState, validityHandler] = useForm(
		{
			email: false,
			password: false,
		},
		false
	);

	const errors = useActionData();

	return (
		<>
			<Header title='Login' text='Please provide your credentials.' />
			<main className='login'>
				<Wrapper>
					<Form method='post' className='login__form'>
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
						{errors && (
							<p className='login__errors'>
								{errors.message ? errors.message : 'Something went wrong. Please try again.'}
							</p>
						)}
						<Button text='Login' disabled={!formState.formValidity} type='submit' />
					</Form>
				</Wrapper>
			</main>
		</>
	);
};

export default Login;

export const action = async ({ request }) => {
	const userData = await request.formData();
	const email = userData.get('email');
	const password = userData.get('password');

	const response = await fetch('http://localhost:5000/api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	if (!response.ok) {
		return json({ message: 'Invalid credentials, please try again' }, { status: 500 });
	}

	const responseData = await response.json();

	localStorage.setItem('token', responseData.token);

	return redirect(`/user/${responseData.id}/overview`);
};
