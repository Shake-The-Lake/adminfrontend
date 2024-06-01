import i18n, {type Resource} from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, languages} from '../../constants';

const resources: Resource = {
	en: {
		translation: {
			// Messages
			welcomeMessage: 'Welcome to ti&m event planning.',
			loading: 'Loading...',
			page404Oops: 'Oops! Looks like you\'re lost.',
			pageNotFound: 'This page could not be found.',
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
			// Activity Type Texts
			activityType: 'Activity Type',
			// Boat Texts
			boat: 'Boat',
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
		// Lng: 'de',
		keySeparator: false,
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
