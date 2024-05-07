import { createContext, useState } from 'react';

export const AuthContext = createContext({
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
});

const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const loginHandler = () => {
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		setIsLoggedIn(false);
	};

	const authCtx = {
		isLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
