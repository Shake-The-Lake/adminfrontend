import i18n, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, languages } from '../../constants';

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
			},
			from: 'From',
			to: 'To',
			type: 'Type',
			// Messages
			welcomeMessage: 'Welcome to ti&m event planning.',
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
			schedule: 'Schedule',
			bookings: 'Bookings',
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
