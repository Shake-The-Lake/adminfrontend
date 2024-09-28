import i18n, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { de, en, languages } from '../../constants';

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
			langSwitcher: {
				toggleEnglish: 'Switch to English',
				english: 'English',
				german: 'German',
				swissGerman: 'Swiss German',
				toggleGerman: 'Switch to German',
				toggleSwissGerman: 'Switch to Swiss German',
			},
			activityType: {
				infoText: 'Enter English content and content that does not belong to a specific language here.',
				errorLoadingActivityType: 'Error while loading activity type...',
				title: 'Activity Type',
				noActivityTypes: 'No activity types found',
				failedToLoadActivityTypes: 'Failed to load activity types',
				createActivityType: 'Create Activity Type',
				description: 'Parts of this entity will eventually be displayed to the end user, therefore certain fields need to be filled out in multiple languages. Simply change the tab to edit another language.',
				triggerLabel: 'Add new Activity Type',
				nameGerman: 'Name in German',
				nameEnglish: 'Name in English',
				descEnglish: 'Description in English',
				descGerman: 'Description in German',
				descSwissGerman: 'Description in Swiss German',
				checklistGerman: 'Checklist in German',
				checklistEnglish: 'Checklist in English',
				checklistSwissGerman: 'Checklist in Swiss German',
				nameSwissGerman: 'Name in Swiss German',
				descriptionGerman: 'Enter German content and content that does not belong to a specific language here.',
				descriptionSwissGerman: 'Enter Swiss German content and content that does not belong to a specific language here.',

			},
			boat: {
				errorLoadingBoat: 'Error while loading boat...',
				title: 'Boat',
				noBoatsYet: 'No boats yet',
				create: 'Create Boat',
				description: 'Add a new boat by entering the necessary data.',
				triggerLabel: 'Add new boat',
				name: 'Boat Name',
				type: 'Boat Typ',
				maxSeats: 'Max available seats for riders',
				maxSeatsViewers: 'Max available seats for viewers',
				availableFrom: 'Boat available from',
				availableUntil: 'Boat available until',
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
				timeFormat: 'Time in the format HH:MM',
			},
			booking: {
				errorLoadingBooking: 'Error while loading booking...',
				title: 'Booking',
				noBookingsYet: 'No bookings yet',
				create: 'Create Booking',
				viewerSeats: 'Viewer Seats',
				riderSeats: 'Rider Seats',
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
			icon: 'Icon',
			search: 'Search',
			searchPlaceholder: 'Search...',
			checklist: 'Checklist',
			tryAgain: 'Try again',
			clearValue: 'Clear Selected Value',
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
			activity: 'Activity',
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
			eventOverview: {
				basicData: 'Grunddaten',
				enter: 'Geben Sie die Grunddaten für die Veranstaltung ein',
				qrCodes: 'QR-Codes',
				useQrCodes: 'Verwenden Sie diese QR-Codes, um Kunden und Mitarbeitern den Zutritt zur Veranstaltung zu ermöglichen',
				employeeQrCode: 'Mitarbeiter-QR-Code',
				errorLoadingQrCode: 'Fehler beim Laden des QR-Codes...',
				customerQrCode: 'Kunden-QR-Code',
			},
			langSwitcher: {
				toggleEnglish: 'Zu Englisch wechseln',
				english: 'Englisch',
				german: 'Deutsch',
				swissGerman: 'Schweizerdeutsch',
				toggleGerman: 'Zu Deutsch wechseln',
				toggleSwissGerman: 'Zu Schweizerdeutsch wechseln',
			},
			activityType: {
				infoText: 'Geben Sie hier englische Inhalte und Inhalte ein, die keiner bestimmten Sprache zugeordnet sind.',
				errorLoadingActivityType: 'Fehler beim Laden des Aktivitätstyps...',
				title: 'Aktivitätstyp',
				noActivityTypes: 'Keine Aktivitätstypen gefunden',
				failedToLoadActivityTypes: 'Fehler beim Laden der Aktivitätstypen',
				createActivityType: 'Aktivitätstyp erstellen',
				description: 'Teile dieses Elements werden dem Endbenutzer angezeigt, daher müssen bestimmte Felder in mehreren Sprachen ausgefüllt werden. Wechseln Sie einfach den Tab, um eine andere Sprache zu bearbeiten.',
				triggerLabel: 'Neuen Aktivitätstyp hinzufügen',
				nameEnglish: 'Name auf Englisch',
				nameGerman: 'Name auf Deutsch',
				descEnglish: 'Beschreibung auf Englisch',
				descGerman: 'Beschreibung auf Deutsch',
				descSwissGerman: 'Beschreibung auf Schweizerdeutsch',
				checklistGerman: 'Checkliste auf Deutsch',
				checklistEnglish: 'Checkliste auf Englisch',
				checklistSwissGerman: 'Checkliste auf Schweizerdeutsch',
				nameSwissGerman: 'Name auf Schweizerdeutsch',
				descriptionGerman: 'Geben Sie hier deutsche Inhalte und Inhalte ein, die keiner bestimmten Sprache zugeordnet sind.',
				descriptionSwissGerman: 'Geben Sie hier schweizerdeutsche Inhalte und Inhalte ein, die keiner bestimmten Sprache zugeordnet sind.',
			},
			boat: {
				errorLoadingBoat: 'Fehler beim Laden des Boots...',
				title: 'Boot',
				noBoatsYet: 'Noch keine Boote',
				create: 'Boot erstellen',
				description: 'Fügen Sie ein neues Boot hinzu, indem Sie die erforderlichen Daten eingeben.',
				triggerLabel: 'Neues Boot hinzufügen',
				name: 'Bootsname',
				type: 'Bootstyp',
				maxSeats: 'Maximal verfügbare Sitzplätze für Fahrer',
				maxSeatsViewers: 'Maximal verfügbare Sitzplätze für Zuschauer',
				availableFrom: 'Boot verfügbar ab',
				availableUntil: 'Boot verfügbar bis',
			},
			timeSlot: {
				errorLoadingTimeSlot: 'Fehler beim Laden des Zeitfensters...',
				title: 'Zeitfenster',
				noTimeSlotsYet: 'Noch keine Zeitfenster',
				create: 'Zeitfenster erstellen',
				description: 'Fügen Sie ein neues Zeitfenster hinzu, indem Sie die erforderlichen Daten eingeben.',
				triggerLabel: 'Neues Zeitfenster hinzufügen',
				edit: 'Zeitfenster bearbeiten',
				descriptionEdit: 'Bearbeiten Sie Zeitfenster für das Boot',
				triggerLabelEdit: 'Zeitfenster bearbeiten',
				timeFormat: 'Zeit im Format HH:MM',
			},
			booking: {
				errorLoadingBooking: 'Fehler beim Laden der Buchung...',
				title: 'Buchung',
				noBookingsYet: 'Noch keine Buchungen',
				create: 'Buchung erstellen',
				viewerSeats: 'Sitzplätze für Zuschauer',
				riderSeats: 'Sitzplätze für Fahrer',
				description: 'Fügen Sie eine neue Buchung hinzu, indem Sie die erforderlichen Daten eingeben.',
				triggerLabel: 'Neue Buchung hinzufügen',
				person: 'Personendaten',
				enterContact: 'Geben Sie die Kontaktdaten der Person ein, die die Buchung durchführen möchte.',
				edit: 'Buchung bearbeiten',
				descriptionEdit: 'Buchungen für das Boot bearbeiten',
				triggerLabelEdit: 'Buchung bearbeiten',
				noTimeSlotSelected: 'Fehler beim Laden des Zeitfensters...',
				success: 'Die Buchung war erfolgreich',
				fail: 'Fehler beim Absenden der Buchung: ',
				noData: 'Keine Daten gefunden',
			},
			login: {
				username: 'Benutzername',
				password: 'Passwort',
				login: 'Anmelden',
				error: 'Benutzer oder Passwort ist falsch',
			},
			schedule: {
				title: 'Zeitplan',
				addBoat: 'Fügen Sie ein Boot hinzu, um den Zeitplan für seine Zeitfenster anzuzeigen.'
			},
			event: {
				create: 'Veranstaltung erstellen',
				description: 'Fügen Sie eine neue Veranstaltung hinzu, indem Sie die erforderlichen Metadaten eingeben.',
				triggerLabel: 'Neue Veranstaltung hinzufügen',
				placeholder: "Sommer-Event 2024",
				date: 'Veranstaltungsdatum',
			},
			from: 'Von',
			to: 'Bis',
			type: 'Typ',
			clearValue: 'Lösche die Auswahl',
			icon: 'Symbol',
			search: 'Suche',
			searchPlaceholder: 'Suchen...',
			checklist: 'Checkliste',
			tryAgain: 'Erneut versuchen',
			welcomeMessage: 'Willkommen bei ti&m Veranstaltungsplanung.',
			description: 'Beschreibung',
			title: 'Titel',
			loading: 'Laden...',
			pageErrorOops: 'Ups! Da ist etwas schiefgelaufen.',
			pageErrorNotFound: 'Diese Seite konnte nicht gefunden werden.',
			pageErrorNotAuthorized: 'Sie sind nicht berechtigt, dies zu sehen.',
			pageErrorApiDown: 'Es sieht so aus, als wäre unsere API nicht erreichbar.',
			pageErrorTeapot: 'Surfen macht durstig 🍵.',
			page404NavigateHome: 'Lassen Sie uns zurückgehen',
			// Meta-Daten
			appName: 'Shake The Lake Admin App',
			shakeTheLake: 'Shake The Lake',
			// Navigationsnamen
			home: 'Startseite',
			events: 'Veranstaltungen',
			boats: 'Boote',
			overview: 'Übersicht',
			activityTypes: 'Aktivitätstypen',
			bookings: 'Buchungen',
			cancel: 'Abbrechen',
			save: 'Speichern',
			firstName: 'Vorname',
			lastName: 'Nachname',
			activity: 'Aktivität',
			name: 'Name',
			email: 'E-Mail',
			phone: 'Telefonnummer',
			personType: 'Personentyp',
			employee: 'Mitarbeiter',
			customer: 'Kunde',
			boatDriver: 'Bootsfahrer',
			rider: 'Fahrer',
			pagerNumber: 'Pager-Nummer',
		},
	},
	gsw: {
		translation: {
			eventOverview: {
				basicData: 'Grunddate',
				enter: 'Gib d Grunddate für d Veranstaltig ii',
				qrCodes: 'QR-Codes',
				useQrCodes: 'Verwänd die QR-Codes, zum d Chunde und Mitarbeite de Zutritt zur Veranstaltig z ermöglichä',
				employeeQrCode: 'Mitarbeiter-QR-Code',
				errorLoadingQrCode: 'Fähler bim Lade vom QR-Code...',
				customerQrCode: 'Chunde-QR-Code',
			},
			langSwitcher: {
				toggleEnglish: 'Uf Englisch wächsle',
				english: 'Englisch',
				german: 'Deutsch',
				swissGerman: 'Schwiizerdütsch',
				toggleGerman: 'Uf Deutsch wächsle',
				toggleSwissGerman: 'Uf Schwiizerdütsch wächsle',
			},
			activityType: {
				infoText: 'Gib do Englischi Inhalte ii und Inhalte, wo keini spezifischi Sproch hei.',
				errorLoadingActivityType: 'Fähler bim Lade vom Aktivitätstyp...',
				title: 'Aktivitätstyp',
				noActivityTypes: 'Kei Aktivitätstyp gfunde',
				failedToLoadActivityTypes: 'Aktivitätstyp chönd nöd glade werde',
				createActivityType: 'Aktivitätstyp erstelle',
				description: 'Teili vo däm Element wärde am Enduser aazeigt, drum muesse gewüssi Fälder in mehri Sproche uusgfällt werde. Wechsle d Tab, zum en anderi Sproch z bearbeite.',
				triggerLabel: 'Neui Aktivitätstyp hinzfüege',
				nameEnglish: 'Name uf Englisch',
				nameGerman: 'Name uf Dütsch',
				descEnglish: 'Bschrybig uf Englisch',
				descGerman: 'Bschrybig uf Dütsch',
				descSwissGerman: 'Bschrybig uf Schwiizerdütsch',
				checklistGerman: 'Checklist uf Dütsch',
				checklistEnglish: 'Checklist uf Englisch',
				checklistSwissGerman: 'Checklist uf Schwiizerdütsch',
				nameSwissGerman: 'Name uf Schwiizerdütsch',
				descriptionGerman: 'Gib do dütschi Inhalte ii und Inhalte, wo keini spezifischi Sproch hei.',
				descriptionSwissGerman: 'Gib do schwiizerdütschi Inhalte ii und Inhalte, wo keini spezifischi Sproch hei.',
			},
			boat: {
				errorLoadingBoat: 'Fähler bim Lade vom Boot...',
				title: 'Boot',
				noBoatsYet: 'No kei Böt',
				create: 'Boot erstelle',
				description: 'Füeg es neus Boot hinzu, indem d nöötige Date iigähsch.',
				triggerLabel: 'Neus Boot hinzfüege',
				name: 'Bootsname',
				type: 'Bootstyp',
				maxSeats: 'Maximal verfiegbari Sitzplätz für Fahrer',
				maxSeatsViewers: 'Maximal verfiegbari Sitzplätz für Zuächer',
				availableFrom: 'Boot verfiegbar ab',
				availableUntil: 'Boot verfiegbar bis',
			},
			timeSlot: {
				errorLoadingTimeSlot: 'Fähler bim Lade vom Ziitfenster...',
				title: 'Ziitfenster',
				noTimeSlotsYet: 'No kei Ziitfenster',
				create: 'Ziitfenster erstelle',
				description: 'Füeg es neus Ziitfenster hinzu, indem d nöötige Date iigähsch.',
				triggerLabel: 'Neus Ziitfenster hinzfüege',
				edit: 'Ziitfenster bearbeite',
				descriptionEdit: 'Bearbeite d Ziitfenster für s Boot',
				triggerLabelEdit: 'Ziitfenster bearbeite',
				timeFormat: 'Ziit im Format HH:MM',
			},
			booking: {
				errorLoadingBooking: 'Fähler bim Lade vo de Buechig...',
				title: 'Buechig',
				noBookingsYet: 'No kei Buechige',
				create: 'Buechig erstelle',
				viewerSeats: 'Sitzplätz für Zuächer',
				riderSeats: 'Sitzplätz für Fahrer',
				description: 'Füeg e neui Buechig hinzu, indem d nöötige Date iigähsch.',
				triggerLabel: 'Neui Buechig hinzfüege',
				person: 'Persöndliche Date',
				enterContact: 'Gib d Kontaktdate vo de Persoon ii, wo d Buechig mache will.',
				edit: 'Buechig bearbeite',
				descriptionEdit: 'Bearbeite d Buechige für s Boot',
				triggerLabelEdit: 'Buechig bearbeite',
				noTimeSlotSelected: 'Fähler bim Lade vom Ziitfenster...',
				success: 'D Buechig isch erfolgrych gsii',
				fail: 'Buechig gönd nöd: ',
				noData: 'Kei Date gfunde',
			},
			login: {
				username: 'Benutzername',
				password: 'Passwort',
				login: 'Aamälde',
				error: 'Benutzer oder Passwort isch falsch',
			},
			schedule: {
				title: 'Ziitplan',
				addBoat: 'Füeg es Boot hinzu, zum dr Ziitplan für d Ziitfenster aazzeige.'
			},
			event: {
				create: 'Veranstaltig erstelle',
				description: 'Füeg e neui Veranstaltig hinzu, indem d nöötige Metadate iigähsch.',
				triggerLabel: 'Neui Veranstaltig hinzfüege',
				placeholder: "Summer Event 2024",
				date: 'Veranstaltigsdatum',
			},
			from: 'Vo',
			to: 'Bis',
			type: 'Typ',
			icon: 'Icon',
			search: 'Sueche',
			searchPlaceholder: 'Sueche...',
			checklist: 'Checklist',
			tryAgain: 'No einisch versueche',
			welcomeMessage: 'Willkomme bi ti&m Veranstaltigsplanig.',
			description: 'Bschrybig',
			title: 'Titel',
			loading: 'Am Lade...',
			pageErrorOops: 'Ohje! Öppis isch schiefglaufe.',
			pageErrorNotFound: 'Die Seite händ mir nöd gfunde.',
			pageErrorNotAuthorized: 'Dir sind nöd berechtigt, die Seite z aaluege.',
			pageErrorApiDown: 'Süsch wäge, üsi API isch im Momänt nöd verfiegbar.',
			pageErrorTeapot: 'Surfe macht durstig 🍵.',
			page404NavigateHome: 'Mir gönd zrugg uf d Startsite',
			// Meta-Daten
			appName: 'Shake The Lake Admin App',
			shakeTheLake: 'Shake The Lake',
			// Navigationsname
			home: 'Startsite',
			events: 'Veranstaltige',
			boats: 'Böt',
			overview: 'Übersicht',
			activityTypes: 'Aktivitätstype',
			bookings: 'Buechige',
			cancel: 'Abbräche',
			save: 'Spychere',
			firstName: 'Vorname',
			lastName: 'Nachname',
			activity: 'Aktivität',
			name: 'Name',
			email: 'E-Mail',
			clearValue: 'Lösch d Aswau',
			phone: 'Telefonnummer',
			personType: 'Persoonetyp',
			employee: 'Mitarbeiter',
			customer: 'Chund',
			boatDriver: 'Bootsfahrer',
			rider: 'Fahrer',
			pagerNumber: 'Pager-Nummer',
		},
	}

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
