const { useContext, useEffect } = require('react');
const { useNavigate } = require('react-router-dom');

const { AuthContext } = require('../../context/auth-context');

const Redirect = () => {
	const authCtx = useContext(AuthContext);
	const navigate = useNavigate();
	console.log(authCtx);
	useEffect(() => {
		if (!authCtx || !authCtx.userId || !authCtx.token) {
			return navigate('/auth/login');
		}

		navigate(`/user/${authCtx.userId}/overview`);
	}, []);

	return null;
};

export default Redirect;
