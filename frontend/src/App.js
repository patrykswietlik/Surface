import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Redirect from './shared/components/Redirect/Redirect';
import AuthContextProvider from './shared/context/auth-context';
import RootLayout from './shared/layouts/RootLayout';
import Overview, { loader as userLoader } from './user/pages/Overview';
import Tasks, { loader as tasksLoader } from './tasks/pages/Tasks';
import Signup from './auth/pages/Signup';
import Login from './auth/pages/Login';
import Error from './shared/components/Error/Error';
import Team, { loader as teamLoader } from './team/pages/Team';

import './App.css';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			//{ index: true, element: <Redirect /> },
			{
				path: 'user',
				children: [{ path: ':userId/overview', element: <Overview />, loader: userLoader }],
			},
			{
				path: 'tasks',
				errorElement: <Error />,
				children: [{ path: ':userId', element: <Tasks />, loader: tasksLoader }],
			},
			{ path: 'team', children: [{ path: ':userId', loader: teamLoader, element: <Team /> }] },
			{
				path: 'auth',
				children: [
					{ index: true, element: <Login /> },
					{ path: 'signup', element: <Signup /> },
					{ path: 'login', element: <Login /> },
				],
			},
		],
	},
]);

function App() {
	return (
		<AuthContextProvider>
			<RouterProvider router={router} />
		</AuthContextProvider>
	);
}

export default App;
