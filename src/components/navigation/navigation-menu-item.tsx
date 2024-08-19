import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
	ChevronDownIcon,
	ChevronRightIcon,
	ShieldAlertIcon,
	type LucideIcon,
} from 'lucide-react';
import {Button} from '../ui/button';
import {useState} from 'react';
import {cn} from '../../lib/utils';
import './navigation.css';

export type MenuItemProperties = {
	labelKey: string;
	link: string;
	needsFullMatch: boolean;
	isMobileView?: boolean;
	icon?: LucideIcon;
	subNavigations?: MenuItemProperties[];
};

const SubNavigationMenuItem = (props: MenuItemProperties) => {
	const {t} = useTranslation();
	const isMobileView = props.isMobileView ?? false;
	const iconClass = isMobileView ? 'h-5 w-5' : 'h-4 w-4';
	const viewSpecificLinkClass = isMobileView
		? 'mx-[-0.65rem] gap-4 rounded-xl text-muted-foreground hover:text-foreground'
		: 'gap-3 rounded-lg hover:text-primary';
	const linkClass = cn(
		'flex items-center px-3 py-2 transition-all',
		viewSpecificLinkClass,
	);

	return (
		<NavLink
			to={props.link}
			end={props.needsFullMatch}
			className={({isActive, isPending, isTransitioning}) =>
				[
					isPending ? 'pending' : '',
					isActive
						? 'active bg-border text-primary hover:text-muted-foreground hover:bg-slate-300'
						: 'text-muted-foreground hover:bg-slate-200',
					isTransitioning ? 'transitioning' : '',
				].join(' ') + linkClass
			}>
			<div className="flex items-center gap-3">
				<div className={iconClass} />
				{t(props.labelKey)}
			</div>
		</NavLink>
	);
};

const NavigationMenuItem = (props: MenuItemProperties) => {
	const {t} = useTranslation();
	const [isOpen, setIsOpen] = useState(false);

	const hasChildren =
		props.subNavigations?.length !== undefined &&
		props.subNavigations.length > 0;
	const childItems = hasChildren
		? props.subNavigations!.map((child) => (
			<SubNavigationMenuItem key={child.link} {...child} />
		))
		: undefined;

	const isMobileView = props.isMobileView ?? false;
	const iconClass = isMobileView ? 'h-5 w-5' : 'h-4 w-4';
	const viewSpecificLinkClass = isMobileView
		? 'mx-[-0.65rem] gap-4 rounded-xl text-muted-foreground hover:text-foreground'
		: 'gap-3 rounded-lg hover:text-primary';
	const linkClass = cn(
		'flex items-center px-3 py-2 transition-all',
		viewSpecificLinkClass,
	);

	const subNavClass =
		props.subNavigations && props.subNavigations.length > 0 ? ' parent' : '';

	return (
		<>
			<NavLink
				to={props.link}
				end={props.needsFullMatch}
				className={({isActive, isPending, isTransitioning}) =>
					[
						isPending ? 'pending' : '',
						isActive
							? 'active bg-muted text-primary hover:bg-slate-200' + subNavClass
							: 'text-muted-foreground',
						isTransitioning ? 'transitioning' : '',
					].join(' ') + linkClass
				}>
				<div className="flex items-center gap-3">
					{props.icon === undefined ? (
						<ShieldAlertIcon className={iconClass} />
					) : (
						<props.icon className={iconClass} />
					)}
					{t(props.labelKey)}
				</div>
				{hasChildren && (
					<Button
						variant="ghost"
						className="flex h-6 w-6 shrink-0 items-center justify-center -my-2 -mr-3 ml-auto py-4"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setIsOpen(!isOpen);
						}}>
						{isOpen ? (
							<ChevronDownIcon className="h-4 w-4 text-primary -m-4" />
						) : (
							<ChevronRightIcon className="h-4 w-4 text-primary -m-4" />
						)}
					</Button>
				)}
			</NavLink>
			{isOpen && <div className="grid">{childItems}</div>}
		</>
	);
};

export default NavigationMenuItem;
