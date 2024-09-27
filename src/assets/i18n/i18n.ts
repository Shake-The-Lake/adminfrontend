import i18n, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { de, en, languages } from '../../constants';
import { first } from 'lodash-es';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';
import { title } from 'process';

const resources: Resource = {
	en: {
		translation: {
			eventOverview: {
				basicData: 'Basic Data',
				enter: 'Enter the basic data for the event',
				qrCodes: 'QR Codes',
				useQrCodes: 'Use these QR Codes to enable customers and employees to enter the event',
				employeeQrCode: 'Employee QR Code',
				errorLoadingQrCode: 'Error while loading QR-Code...',
				customerQrCode: 'Customer QR Code',
			},
			activityType: {
				errorLoadingActivityType: 'Error while loading activity type...',
				title: 'Activity Type',
				noActivityTypes: 'No activity types found',
				failedToLoadActivityTypes: 'Failed to load activity types',
				createActivityType: 'Create Activity Type',
				description: 'Parts of this entity will eventually be displayed to the end user, therefore certain fields need to be filled out in multiple languages. Simply change the tab to edit another language.',
				triggerLabel: 'Add new Activity Type',
			},
			boat: {
				errorLoadingBoat: 'Error while loading boat...',
				title: 'Boat',
				noBoatsYet: 'No boats yet',
				create: 'Create Boat',
				description: 'Add a new boat by entering the necessary data.',
				triggerLabel: 'Add new boat',
			},
			timeSlot: {
				errorLoadingTimeSlot: 'Error while loading time slot...',
				title: 'Time Slot',
				noTimeSlotsYet: 'No time slots yet',
				create: 'Create Time Slot',
				description: 'Add a new time slot by entering the necessary data.',
				triggerLabel: 'Add new time slot',
				edit: 'Edit Time Slot',
				descriptionEdit: 'Edit time slots for the boat',
				triggerLabelEdit: 'Edit time slot',
				timeFormat: 'Time in the format HH:mm',
			},
			booking: {
				errorLoadingBooking: 'Error while loading booking...',
				title: 'Booking',
				noBookingsYet: 'No bookings yet',
				create: 'Create Booking',
				description: 'Add a new booking by entering the necessary data.',
				triggerLabel: 'Add new booking',
				person: 'Person Data',
				enterContact: 'Enter the contact data of the person wanting to do the booking.',
				edit: 'Edit Booking',
				descriptionEdit: 'Edit bookings for the boat',
				triggerLabelEdit: 'Edit booking',
				noTimeSlotSelected: 'Error while loading time slot...',
				success: 'Booking was successful',
				fail: 'Failed to submit booking: ',
				noData: 'No data found',
			},
			login: {
				username: 'Username',
				password: 'Password',
				login: 'Login',
				error: 'User or Password is wrong',
			},
			schedule: {
				title: 'Schedule',
				addBoat: 'Add a boat to view the schedule for its time slots.'
			},
			event: {
				create: 'Create Event',
				description: 'Add a new event by entering the basic meta data needed.',
				triggerLabel: 'Add new event',
				placeholder: "Sommer Event 2024",
				date: 'Event Date',
			},
			from: 'From',
			to: 'To',
			type: 'Type',
			tryAgain: 'Try again',
			// Messages
			welcomeMessage: 'Welcome to ti&m event planning.',
			description: 'Description',
			title: 'Title',
			loading: 'Loading...',
			pageErrorOops: 'Oops! Something went wrong.',
			pageErrorNotFound: 'This page could not be found.',
			pageErrorNotAuthorized: 'You aren\'t authorized to see this.',
			pageErrorApiDown: 'Looks like our API is down.',
			pageErrorTeapot: 'Surfen macht durstig 🍵.',
			page404NavigateHome: 'Let\'s get you back',
			// Meta Data
			appName: 'Shake The Lake Admin App',
			shakeTheLake: 'Shake The Lake',
			// Navigation Names
			home: 'Home',
			events: 'Events',
			boats: 'Boats',
			overview: 'Overview',
			activityTypes: 'Activity Types',
			bookings: 'Bookings',
			cancel: 'Cancel',
			save: 'Save',
			firstName: 'First Name',
			lastName: 'Last Name',
			name: 'Name',
			email: 'Email',
			phone: 'Phone Number',
			personType: 'Person Type',
			employee: 'Employee',
			customer: 'Customer',
			boatDriver: 'Boat Driver',
			rider: 'Rider',
			pagerNumber: 'Pager Number',
		},
	},
	de: {
		translation: {
			welcomeMessage: 'Willkommen bei ti&m Event-Planung',
		},
	},
	gsw: {
		translation: {
			welcomeMessage: 'Wiukommä bir ti&m Event-Planig.',
		},
	},
};

i18n
	.use(initReactI18next)
	.init({
		resources,
		interpolation: {
			escapeValue: false,
		},
		// The default language
		fallbackLng: en,
		// It shows the supported languages
		supportedLngs: languages.map((l) => l.code),
	})
	.then(() => 'obligatory for @typescript-eslint/no-floating-promises')
	.catch(() => 'obligatory for @typescript-eslint/no-floating-promises');

export default i18n;
