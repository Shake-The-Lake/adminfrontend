export const en = 'en';
export const de = 'de';
export const ch = 'gsw';

export const languages = [
	{ label: 'German', code: de },
	{ label: 'English', code: en },
	{ label: 'Swiss-German', code: ch },
];

export const eventBaseRoute = '/event/';

export const eventDetailRoutes = {
	id: ':id',
	activityTypes: 'activity-types',
	activityTypeId: ':activityTypeId',
	boats: 'boats',
	boatId: ':boatId',
	schedule: 'schedule',
	timeSlotId: ':timeSlotId',
	bookings: 'bookings',
	addBooking: 'new',
	editBooking: 'edit/:bookingId',
	bookingId: ':bookingId',
};

export const bookingsRoute = (eventId: number) => `/event/${eventId}/bookings`;

export const iconPaths = {
	tiAndM: '/ti-and-m-logo.svg',
	shakeTheLake: '/shake-the-lake-icon.svg',
};
