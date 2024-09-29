import {
	CalendarCheck2,
	CalendarDays,
	CalendarRange,
	FolderCog,
	Sailboat,
} from 'lucide-react';
import {eventBaseRoute, eventDetailRoutes} from '../../constants';
import {type MenuItemProperties} from './navigation-menu-item';
import {type EventDto} from '../../models/api/event.model';
import {getTranslation} from '../../lib/utils';
import {createContext} from 'react';
import './navigation.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NavigationStructureContext = createContext(
	[] as MenuItemProperties[],
);

export function getNavigationItemsForEvent(
	event: EventDto | undefined,
	language: string,
): MenuItemProperties[] {
	if (!event) {
		return [];
	}

	const eventBasePath = eventBaseRoute + event.id;
	const activityTypes = event.activityTypes ? event.activityTypes : [];
	const boats = event.boats ? event.boats : [];
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
			needsFullMatch: false,
			subNavigations: activityTypes.map((activity) => ({
				link: `${eventBasePath}/${eventDetailRoutes.activityTypes}/${activity.id}`,
				labelKey: getTranslation(language, activity.name),
				needsFullMatch: true,
			})),
		},
		{
			link: `${eventBasePath}/${eventDetailRoutes.boats}`,
			labelKey: 'boats',
			icon: Sailboat,
			needsFullMatch: false,
			subNavigations: boats.map((boat) => ({
				link: `${eventBasePath}/${eventDetailRoutes.boats}/${boat.id}`,
				labelKey: boat.name,
				needsFullMatch: true,
			})),
		},
		{
			link: `${eventBasePath}/${eventDetailRoutes.schedule}`,
			labelKey: 'schedule.title',
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
