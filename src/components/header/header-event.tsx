import React from 'react';
import {Menu} from 'lucide-react';
import {Button} from '../ui/button';
import {Sheet, SheetContent, SheetTrigger} from '../ui/sheet';
import {Link, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import NavigationMenuItem from '../navigation/navigation-menu-item';
import {NavigationStructureContext} from '../navigation/navigation-models';
import ShakeTheLakeIcon from '../icons/shake-the-lake-icon';

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
						<ShakeTheLakeIcon className="mr-2 h-10 w-10 text-primary" />
						<span className="heading-s-upper text-primary">
							{t('shakeTheLake')}
						</span>
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
		<header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[var(--header-height)] lg:px-6 backdrop-blur sticky top-0 z-10">
			<EventNavigationElements />
			<div className="w-full flex-1"></div>
			<Button
				variant="link"
				className="heading-s-upper text-primary"
				onClick={() => {
					navigate('/');
				}}>
				{t('events')}
			</Button>
			<Button
				variant="link"
				className="heading-s-upper text-primary"
				onClick={() => {
					navigate('/logout');
				}}>
				{t('logout')}
			</Button>
		</header>
	);
};

export default HeaderEvent;
