import {
	CalendarCheck2,
	CalendarDays,
	CalendarRange,
	FolderCog,
	Sailboat,
} from 'lucide-react';
import {eventBaseRoute, eventDetailRoutes} from '../../constants';
import {type MenuItemProperties} from './navigation-menu-item';

export type NavigationEventDto = {
	id: number;
	title: string;
	activityTypes: NavigationActivityTypeDto[];
	boats: NavigationBoatDto[];
};

export type NavigationActivityTypeDto = {
	id: number;
	localizedName: string;
};

export type NavigationBoatDto = {
	id: number;
	name: string;
};

export function getNavigationItemsForEvent(
	event: NavigationEventDto,
): MenuItemProperties[] {
	const eventBasePath = eventBaseRoute + event.id;
	return [
		{
			link: eventBasePath,
			labelKey: 'overview',
			icon: CalendarDays,
			needsFullMatch: true,
		},
		{
			link: `${eventBasePath}/${eventDetailRoutes.activityTypes}`,
			labelKey: 'activityTypes',
			icon: FolderCog,
			needsFullMatch: true,
			subNavigations: event.activityTypes.map((activity) => ({
				link: `${eventBasePath}/${eventDetailRoutes.activityTypes}/${activity.id}`,
				labelKey: activity.localizedName,
				needsFullMatch: true,
			})),
		},
		{
			link: `${eventBasePath}/${eventDetailRoutes.boats}`,
			labelKey: 'boats',
			icon: Sailboat,
			needsFullMatch: true,
			subNavigations: event.boats.map((boat) => ({
				link: `${eventBasePath}/${eventDetailRoutes.boats}/${boat.id}`,
				labelKey: boat.name,
				needsFullMatch: true,
			})),
		},
		{
			link: `${eventBasePath}/${eventDetailRoutes.schedule}`,
			labelKey: 'schedule',
			icon: CalendarRange,
			needsFullMatch: false,
		},
		{
			link: `${eventBasePath}/${eventDetailRoutes.bookings}`,
			labelKey: 'bookings',
			icon: CalendarCheck2,
			needsFullMatch: false,
		},
	];
}
