import { createContext, useCallback, useEffect, useState } from 'react';

export const AuthContext = createContext({
	userId: '',
	token: '',
	role: '',
	login: () => {},
	logout: () => {},
});

const AuthContextProvider = ({ children }) => {
	const [userId, setUserId] = useState();
	const [userToken, setUserToken] = useState();
	const [userRole, setUserRole] = useState();

	const loginHandler = useCallback((uid, token, role) => {
		setUserId(uid);
		setUserToken(token);
		setUserRole(role);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token,
				role,
			})
		);
	}, []);

	const logoutHandler = useCallback(() => {
		setUserId(null);
		setUserToken(null);
		setUserRole(null);
		localStorage.removeItem('userData');
	}, []);

	const authCtx = {
		userId,
		token: userToken,
		role: userRole,
		login: loginHandler,
		logout: logoutHandler,
	};

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));

		if (storedData && storedData.token && storedData.role) {
			loginHandler(storedData.userId, storedData.token, storedData.role);
		}
	}, [loginHandler]);

	return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
