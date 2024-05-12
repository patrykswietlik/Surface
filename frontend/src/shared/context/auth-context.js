import { createContext, useCallback, useEffect, useState } from 'react';

export const AuthContext = createContext({
	userId: '',
	token: '',
	login: () => {},
	logout: () => {},
});

const AuthContextProvider = ({ children }) => {
	const [userId, setUserId] = useState();
	const [userToken, setUserToken] = useState();

	const loginHandler = useCallback((uid, token) => {
		setUserId(uid);
		setUserToken(token);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token,
			})
		);
	}, []);

	const logoutHandler = useCallback(() => {
		setUserId(null);
		setUserToken(null);
		localStorage.removeItem('userData');
	}, []);

	const authCtx = {
		userId,
		token: userToken,
		login: loginHandler,
		logout: logoutHandler,
	};

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));

		if (storedData && storedData.token) {
			loginHandler(storedData.userId, storedData.token);
		}
	}, [loginHandler]);

	return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
