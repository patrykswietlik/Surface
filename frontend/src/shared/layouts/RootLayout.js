import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/Navigation/MainNavigation';
import MobileNavigation from '../components/Navigation/MobileNavigation';

const RootLayout = () => {
	return (
		<>
			<MainNavigation />
			<MobileNavigation />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
