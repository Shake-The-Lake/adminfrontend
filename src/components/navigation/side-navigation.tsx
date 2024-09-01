import * as React from 'react';

import {Link} from 'react-router-dom';
import NavigationMenuItem from './navigation-menu-item';
import {useTranslation} from 'react-i18next';
import {NavigationStructureContext} from './navigation-models';
import './navigation.css';
import ShakeTheLakeIcon from '../icons/shake-the-lake-icon';

const SideNavigation: React.FC = () => {
	const {t} = useTranslation();

	// Todo! rerender when list changes from 0 to 1
	const navigationStructure = React.useContext(NavigationStructureContext);
	const navigationItems = navigationStructure.map((item) => (
		<NavigationMenuItem key={item.link} {...item} isMobileView={false} />
	));

	return (
		<div className="hidden md:block">
			<div className="flex h-full max-h-screen flex-col sticky top-0">
				<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<Link to="/" className="flex items-center gap-2 font-semibold">
						<ShakeTheLakeIcon className="mr-2 h-10 w-10 text-primary" />
						<span className="heading-s-upper text-primary">
							{t('shakeTheLake')}
						</span>
					</Link>
				</div>
				<div className="side-navigation-container flex-1 border-r">
					<nav className="grid items-start px-2 mt-4 text-sm font-medium lg:px-4">
						{navigationItems}
					</nav>
				</div>
			</div>
		</div>
	);
};

export default SideNavigation;
