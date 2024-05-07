import { redirect } from 'react-router-dom';

export const getToken = () => {
	return localStorage.getItem('token');
};

export const checkAuth = () => {
	const token = getToken();

	if (!token) {
		return redirect('/auth/login');
	}

	return token;
};

export const loader = () => {
	return checkAuth();
};
