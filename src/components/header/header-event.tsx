import React from 'react';
import {Menu} from 'lucide-react';
import {Button} from '../ui/button';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';
import {Link, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import NavigationMenuItem from '../navigation/navigation-menu-item';
import {iconPaths} from '../../constants';
import {NavigationStructureContext} from '../navigation/navigation-models';

// Todo! translate all texts

const EventNavigationElements = () => {
	const {t} = useTranslation();

	const navigationStructure = React.useContext(NavigationStructureContext);
	const navigationItems = navigationStructure.map((item) => (
		<NavigationMenuItem key={item.link} {...item} isMobileView={true} />
	));

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon" className="shrink-0 md:hidden">
					<Menu className="h-5 w-5" />
					<span className="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="flex flex-col">
				<nav className="grid gap-2 text-lg font-medium">
					<Link
						to="/"
						className="flex items-center gap-2 text-lg font-semibold">
						<img
							src={iconPaths.shakeTheLake}
							alt="Website Logo"
							className="mr-2 h-10 w-10"
						/>
						<span className="heading-xs">{t('shakeTheLake')}</span>
					</Link>
					{navigationItems}
				</nav>
			</SheetContent>
		</Sheet>
	);
};

const HeaderEvent: React.FC = () => {
	const {t} = useTranslation();
	const navigate = useNavigate();

	return (
		<header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 backdrop-blur sticky top-0">
			<EventNavigationElements />
			<div className="w-full flex-1"></div>
			<Button
				variant="link"
				className="heading-xs"
				onClick={() => {
					navigate('/');
				}}>
				{t('events')}
			</Button>
		</header>
	);
};

export default HeaderEvent;
