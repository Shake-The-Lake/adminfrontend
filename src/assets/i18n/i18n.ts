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
				useQrCodes:
					'Use these QR Codes to enable customers and employees to enter the event',
				employeeQrCode: 'Employee QR Code',
				errorLoadingQrCode: 'Error while loading QR-Code...',
				customerQrCode: 'Customer QR Code',
				noEventsYet: 'No events yet',
			},
			langSwitcher: {
				toggleEnglish: 'Switch to English',
				ariaLabel: 'Switch Language',
				english: 'English',
				german: 'German',
				swissGerman: 'Swiss German',
				toggleGerman: 'Switch to German',
				toggleSwissGerman: 'Switch to Swiss German',
			},
			activityType: {
				infoText:
					'Enter English content and content that does not belong to a specific language here.',
				errorLoadingActivityType: 'Error while loading activity type...',
				title: 'Activity Type',
				noActivityTypes: 'No activity types found',
				failedToLoadActivityTypes: 'Failed to load activity types',
				createActivityType: 'Create Activity Type',
				description:
					'Parts of this entity will eventually be displayed to the end user, therefore certain fields need to be filled out in multiple languages. Simply change the tab to edit another language.',
				triggerLabel: 'Add new Activity Type',
				nameGerman: 'Name in German',
				nameEnglish: 'Name in English',
				nameSwissGerman: 'Name in Swiss German',
				descEnglish: 'Description in English',
				descGerman: 'Description in German',
				descSwissGerman: 'Description in Swiss German',
				checklistGerman: 'Checklist in German',
				checklistEnglish: 'Checklist in English',
				checklistSwissGerman: 'Checklist in Swiss German',
				descriptionGerman:
					'Enter German content and content that does not belong to a specific language here.',
				descriptionSwissGerman:
					'Enter Swiss German content and content that does not belong to a specific language here.',
				checklistDescription: 'This checklist will eventually be displayed to the user so they know what they have to do before they climb on board (e.g. change into swimwear, come to the hut when the boat is about to leave...)',
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
				seatsRider: 'Seats (Rider)',
				seatsViewer: 'Seats (Viewer)',
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
				editDescription: 'Caution when updating a time slot: changing the time will have an effect on all related bookings and may not be communicated transparently to the app user.',
				triggerLabel: 'Add new time slot',
				edit: 'Edit Time Slot',
				descriptionEdit: 'Edit time slots for the boat',
				triggerLabelEdit: 'Edit time slot',
				timeFormat: 'Time in the format HH:MM',
				status: 'Status',
				statusBreak: 'Break',
				statusAvailable: 'available for activities',
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
				enterContact:
					'Enter the contact data of the person wanting to do the booking.',
				edit: 'Edit Booking',
				descriptionEdit: 'Edit bookings for the boat',
				triggerLabelEdit: 'Edit booking',
				noTimeSlotSelected: 'Error while loading time slot...',
				success: 'Booking was successful',
				fail: 'Failed to submit booking: ',
				currentBooking: 'Current Booking',
				update: 'Update Booking',
				driverOrViewer: 'Driver Or Viewer?',
				isRider: 'is riding',
				isViewer: 'is viewing',
				free: 'free',
			},
			login: {
				username: 'Username',
				password: 'Password',
				login: 'Login',
				error: 'User or Password is wrong',
			},
			schedule: {
				title: 'Schedule',
				addBoat: 'Add a boat to view the schedule for its time slots.',
			},
			event: {
				create: 'Create Event',
				description: 'Add a new event by entering the basic meta data needed.',
				triggerLabel: 'Add new event',
				placeholder: 'Sommer Event 2024',
				date: 'Event Date',
			},
			from: 'From',
			to: 'To',
			type: 'Type',
			icon: 'Icon',
			search: 'Search',
			searchPlaceholder: 'Search...',
			noData: 'No data found',
			checklist: 'Checklist',
			tryAgain: 'Try again',
			clearValue: 'Clear Selected Value',
			welcomeMessage: 'Welcome to ti&m event planning.',
			description: 'Description',
			title: 'Title',
			select: 'Select',
			loading: 'Loading...',
			yes: 'Yes',
			no: 'No',
			delete: 'Delete',
			messages: {
				pageErrorOops: 'Oops! Something went wrong.',
				pageErrorNotFound: 'This page could not be found.',
				pageErrorNotAuthorized: 'You aren\'t authorized to see this.',
				pageErrorApiDown: 'Looks like our API is down.',
				pageErrorTeapot: 'Surfing makes thirsty 🍵.',
				page404NavigateHome: 'Let\'s get you back',
				successCreate: 'Item was created successfully!',
				successUpdate: 'Item was saved successfully!',
				successDelete: 'Item was deleted successfully!',
				errorSuccess: 'There was an error when creating.',
				errorUpdate: 'There was an error when saving.',
				errorDelete: 'There was an error when deleting.',
				validationErrorTitle: 'Could not be saved.',
				validationErrorDescription: 'There are validation errors in the form.',
				validationMessageDateFormat: 'invalid date format',
			},
			// Meta Data
			appName: 'Shake The Lake Admin App',
			shakeTheLake: 'Shake The Lake',
			// Navigation Names
			home: 'Home',
			events: 'Events',
			boats: 'Boats',
			logout: 'Logout',
			overview: 'Overview',
			activityTypes: 'Activity Types',
			bookings: 'Bookings',
			cancel: 'Cancel',
			save: 'Save',
			firstName: 'First Name',
			lastName: 'Last Name',
			activity: 'Activity',
			viewerSeats: 'Viewer Seats',
			riderSeats: 'Rider Seats',
			name: 'Name',
			email: 'Email',
			infoTextActivityTraceInfo: 'This are the people who last edited this item:',
			on: 'on',
			createdBy: 'Created by',
			modifiedBy: 'Modified by',
			phone: 'Phone Number',
			personType: 'Person Type',
			employee: 'Employee',
			customer: 'Customer',
			boatDriver: 'Boat Driver',
			rider: 'Rider',
			viewer: 'Viewer',
			pagerNumber: 'Pager Number',
			update: 'Update',
			manual: 'Manual',
		},
	},
	de: {
		translation: {
			eventOverview: {
				basicData: 'Grunddaten',
				enter: 'Geben Sie die Grunddaten für die Veranstaltung ein',
				qrCodes: 'QR-Codes',
				useQrCodes:
					'Verwenden Sie diese QR-Codes, um Kunden und Mitarbeitern den Zutritt zur Veranstaltung zu ermöglichen',
				employeeQrCode: 'Mitarbeiter-QR-Code',
				errorLoadingQrCode: 'Fehler beim Laden des QR-Codes...',
				customerQrCode: 'Kunden-QR-Code',
				noEventsYet: 'Noch keine Veranstaltungen',
			},
			langSwitcher: {
				toggleEnglish: 'Zu Englisch wechseln',
				english: 'Englisch',
				german: 'Deutsch',
				swissGerman: 'Schweizerdeutsch',
				ariaLabel: 'Sprache wechseln',
				toggleGerman: 'Zu Deutsch wechseln',
				toggleSwissGerman: 'Zu Schweizerdeutsch wechseln',
			},
			activityType: {
				infoText:
					'Geben Sie hier englische Inhalte und Inhalte ein, die keiner bestimmten Sprache zugeordnet sind.',
				errorLoadingActivityType: 'Fehler beim Laden des Aktivitätstyps...',
				title: 'Aktivitätstyp',
				noActivityTypes: 'Keine Aktivitätstypen gefunden',
				failedToLoadActivityTypes: 'Fehler beim Laden der Aktivitätstypen',
				createActivityType: 'Aktivitätstyp erstellen',
				description:
					'Teile dieses Elements werden dem Endbenutzer angezeigt, daher müssen bestimmte Felder in mehreren Sprachen ausgefüllt werden. Wechseln Sie einfach den Tab, um eine andere Sprache zu bearbeiten.',
				triggerLabel: 'Neuen Aktivitätstyp hinzufügen',
				nameEnglish: 'Name auf Englisch',
				nameGerman: 'Name auf Deutsch',
				nameSwissGerman: 'Name auf Schweizerdeutsch',
				descEnglish: 'Beschreibung auf Englisch',
				descGerman: 'Beschreibung auf Deutsch',
				descSwissGerman: 'Beschreibung auf Schweizerdeutsch',
				checklistGerman: 'Checkliste auf Deutsch',
				checklistEnglish: 'Checkliste auf Englisch',
				checklistSwissGerman: 'Checkliste auf Schweizerdeutsch',
				descriptionGerman:
					'Geben Sie hier deutsche Inhalte und Inhalte ein, die keiner bestimmten Sprache zugeordnet sind.',
				descriptionSwissGerman:
					'Geben Sie hier schweizerdeutsche Inhalte und Inhalte ein, die keiner bestimmten Sprache zugeordnet sind.',
				checklistDescription: 'Diese Checkliste wird dem Benutzer letztendlich angezeigt, damit er weiss, was er tun muss, bevor er an Bord geht (z. B. Badebekleidung anziehen, zur Hütte kommen, bevor das Boot ablegt...)',

			},
			boat: {
				errorLoadingBoat: 'Fehler beim Laden des Boots...',
				title: 'Boot',
				noBoatsYet: 'Noch keine Boote',
				create: 'Boot erstellen',
				description:
					'Fügen Sie ein neues Boot hinzu, indem Sie die erforderlichen Daten eingeben.',
				triggerLabel: 'Neues Boot hinzufügen',
				name: 'Bootsname',
				type: 'Bootstyp',
				seatsRider: 'Sitzplätze (Fahrer)',
				seatsViewer: 'Sitzplätze (Zuschauer)',
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
				editDescription: 'Vorsicht bei der Aktualisierung eines Zeitfensters: Die Änderung der Uhrzeit wirkt sich auf alle zugehörigen Buchungen aus und wird dem Nutzer der App möglicherweise nicht transparent mitgeteilt.',
				triggerLabel: 'Neues Zeitfenster hinzufügen',
				edit: 'Zeitfenster bearbeiten',
				descriptionEdit: 'Bearbeiten Sie Zeitfenster für das Boot',
				triggerLabelEdit: 'Zeitfenster bearbeiten',
				timeFormat: 'Zeit im Format HH:MM',
				status: 'Status',
				statusBreak: 'Pause',
				statusAvailable: 'verfügbar für Aktivitäten',
			},
			booking: {
				errorLoadingBooking: 'Fehler beim Laden der Buchung...',
				title: 'Buchung',
				noBookingsYet: 'Noch keine Buchungen',
				create: 'Buchung erstellen',
				viewerSeats: 'Sitzplätze für Zuschauer',
				riderSeats: 'Sitzplätze für Fahrer',
				description:
					'Fügen Sie eine neue Buchung hinzu, indem Sie die erforderlichen Daten eingeben.',
				triggerLabel: 'Neue Buchung hinzufügen',
				person: 'Personendaten',
				enterContact:
					'Geben Sie die Kontaktdaten der Person ein, die die Buchung durchführen möchte.',
				edit: 'Buchung bearbeiten',
				descriptionEdit: 'Buchungen für das Boot bearbeiten',
				triggerLabelEdit: 'Buchung bearbeiten',
				noTimeSlotSelected: 'Fehler beim Laden des Zeitfensters...',
				success: 'Die Buchung war erfolgreich',
				fail: 'Fehler beim Absenden der Buchung: ',
				update: 'Buchung anpassen',
				driverOrViewer: 'Fahrer oder Zuschauer?',
				isRider: 'fährt',
				isViewer: 'schaut zu',
				free: 'frei',
			},
			login: {
				username: 'Benutzername',
				password: 'Passwort',
				login: 'Anmelden',
				error: 'Benutzer oder Passwort ist falsch',
			},
			schedule: {
				title: 'Zeitplan',
				addBoat:
					'Fügen Sie ein Boot hinzu, um den Zeitplan für seine Zeitfenster anzuzeigen.',
			},
			event: {
				create: 'Veranstaltung erstellen',
				description:
					'Fügen Sie eine neue Veranstaltung hinzu, indem Sie die erforderlichen Metadaten eingeben.',
				triggerLabel: 'Neue Veranstaltung hinzufügen',
				placeholder: 'Sommer-Event 2024',
				date: 'Veranstaltungsdatum',
			},
			from: 'Von',
			to: 'Bis',
			type: 'Typ',
			clearValue: 'Lösche die Auswahl',
			icon: 'Symbol',
			search: 'Suche',
			searchPlaceholder: 'Suchen...',
			noData: 'Keine Daten gefunden',
			checklist: 'Checkliste',
			tryAgain: 'Erneut versuchen',
			welcomeMessage: 'Willkommen bei ti&m Veranstaltungsplanung.',
			description: 'Beschreibung',
			title: 'Titel',
			select: 'Selektieren',
			loading: 'Laden...',
			yes: 'Ja',
			no: 'Nein',
			delete: 'Löschen',
			messages: {
				pageErrorOops: 'Ups! Da ist etwas schiefgelaufen.',
				pageErrorNotFound: 'Diese Seite konnte nicht gefunden werden.',
				pageErrorNotAuthorized: 'Sie sind nicht berechtigt, dies zu sehen.',
				pageErrorApiDown: 'Es sieht so aus, als wäre unsere API nicht erreichbar.',
				pageErrorTeapot: 'Surfen macht durstig 🍵.',
				page404NavigateHome: 'Lassen Sie uns zurück gehen auf die ',
				successCreate: 'Das Element wurde erfolgreich erstellt!',
				successUpdate: 'Das Element wurde erfolgreich gespeichert!',
				successDelete: 'Das Element wurde erfolgreich gelöscht!',
				errorSuccess: 'Es gab einen Fehler beim Erstellen.',
				errorUpdate: 'Es gab einen Fehler beim Speichern.',
				errorDelete: 'Es gab einen Fehler beim Löschen.',
				validationErrorTitle: 'Konnte nicht gespeichert werden.',
				validationErrorDescription: 'Es gibt Validierungsfehler im Formular.',
				validationMessageDateFormat: 'ungültiges Datumsformat',
			},
			// Meta-Daten
			appName: 'Shake The Lake Admin App',
			shakeTheLake: 'Shake The Lake',
			// Navigationsnamen
			home: 'Startseite',
			events: 'Veranstaltungen',
			boats: 'Boote',
			logout: 'Abmelden',
			overview: 'Übersicht',
			activityTypes: 'Aktivitätstypen',
			bookings: 'Buchungen',
			cancel: 'Abbrechen',
			save: 'Speichern',
			firstName: 'Vorname',
			lastName: 'Nachname',
			activity: 'Aktivität',
			viewerSeats: 'Zuschauer Plätze',
			riderSeats: 'Rider Plätze',
			name: 'Name',
			email: 'E-Mail',
			infoTextActivityTraceInfo: 'Das sind die Personen, die diesen Eintrag als Letztes bearbeitet haben:',
			on: 'am',
			createdBy: 'Erstellt von',
			modifiedBy: 'Geändert von',
			phone: 'Telefonnummer',
			personType: 'Personentyp',
			employee: 'Mitarbeiter',
			customer: 'Kunde',
			boatDriver: 'Bootsfahrer',
			rider: 'Fahrer',
			viewer: 'Zuschauer',
			pagerNumber: 'Pager-Nummer',
			update: 'Aktualisieren',
			manual: 'Manuell',
		},
	},
	gsw: {
		translation: {
			eventOverview: {
				basicData: 'Grunddate',
				enter: 'Gib d Grunddate für d Veranstaltig ii',
				qrCodes: 'QR-Codes',
				useQrCodes:
					'Verwänd die QR-Codes, zum d Chunde und Mitarbeite de Zutritt zur Veranstaltig z ermöglichä',
				employeeQrCode: 'Mitarbeiter-QR-Code',
				errorLoadingQrCode: 'Fähler bim Lade vom QR-Code...',
				customerQrCode: 'Chunde-QR-Code',
				noEventsYet: 'No ke Veranstaltige',
			},
			langSwitcher: {
				toggleEnglish: 'Uf Englisch wächsle',
				english: 'Englisch',
				ariaLabel: 'Sprach wächslä',
				german: 'Deutsch',
				swissGerman: 'Schwiizerdütsch',
				toggleGerman: 'Uf Deutsch wächsle',
				toggleSwissGerman: 'Uf Schwiizerdütsch wächsle',
			},
			activityType: {
				infoText:
					'Gib do Englischi Inhalte ii und Inhalte, wo keini spezifischi Sproch hei.',
				errorLoadingActivityType: 'Fähler bim Lade vom Aktivitätstyp...',
				title: 'Aktivitätstyp',
				noActivityTypes: 'Kei Aktivitätstyp gfunde',
				failedToLoadActivityTypes: 'Aktivitätstyp chönd nöd glade werde',
				createActivityType: 'Aktivitätstyp erstelle',
				description:
					'Teili vo däm Element wärde am Enduser aazeigt, drum muesse gewüssi Fälder in mehri Sproche uusgfällt werde. Wechsle d Tab, zum en anderi Sproch z bearbeite.',
				triggerLabel: 'Neui Aktivitätstyp hinzfüege',
				nameEnglish: 'Name uf Englisch',
				nameGerman: 'Name uf Dütsch',
				nameSwissGerman: 'Name uf Schwiizerdütsch',
				descEnglish: 'Bschrybig uf Englisch',
				descGerman: 'Bschrybig uf Dütsch',
				descSwissGerman: 'Bschrybig uf Schwiizerdütsch',
				checklistGerman: 'Checklist uf Dütsch',
				checklistEnglish: 'Checklist uf Englisch',
				checklistSwissGerman: 'Checklist uf Schwiizerdütsch',
				descriptionGerman:
					'Gib do dütschi Inhalte ii und Inhalte, wo keini spezifischi Sproch hei.',
				descriptionSwissGerman:
					'Gib do schwiizerdütschi Inhalte ii und Inhalte, wo keini spezifischi Sproch hei.',
				checklistDescription: 'Die Checkliste wird dä Benutzer schlussändlech azeigt, damit si wüsse, was si müesse mache, bevor si a Bord göh (z. B. Badechleider azieh, zur Hüttä cho, bevor s Boot abfahrt...)',
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
				seatsRider: 'Sitzplätz (Fahrer)',
				seatsViewer: 'Sitzplätz (Zueschouer)',
				maxSeats: 'Maximal verfiegbari Sitzplätz für Fahrer',
				maxSeatsViewers: 'Maximal verfiegbari Sitzplätz für Zuächer',
				availableFrom: 'Boot verfüegbar ab',
				availableUntil: 'Boot verfüegbar bis',
			},
			timeSlot: {
				errorLoadingTimeSlot: 'Fähler bim Lade vom Ziitfenster...',
				title: 'Ziitfenster',
				noTimeSlotsYet: 'No kei Ziitfenster',
				create: 'Ziitfenster erstelle',
				description: 'Füeg es neus Ziitfenster hinzu, indem d nöötige Date iigähsch.',
				editDescription: 'Achtung bim Aktualisiere vo enem Zytfenster: D Änderig vo de Uhrzyt betrifft alli zueghörige Buchige und wird em App-Nutzer villech nöd transparent mitteilt.',
				triggerLabel: 'Neus Ziitfenster hinzfüege',
				edit: 'Ziitfenster bearbeite',
				descriptionEdit: 'Bearbeite d Ziitfenster für s Boot',
				triggerLabelEdit: 'Ziitfenster bearbeite',
				timeFormat: 'Ziit im Format HH:MM',
				status: 'Status',
				statusBreak: 'Pouse',
				statusAvailable: 'verfüegbar für Aktivitäte',
			},
			booking: {
				errorLoadingBooking: 'Fähler bim Lade vo de Buechig...',
				title: 'Buechig',
				noBookingsYet: 'No kei Buechige',
				create: 'Buechig erstelle',
				viewerSeats: 'Sitzplätz für Zueschouer',
				riderSeats: 'Sitzplätz für Fahrer',
				description:
					'Füeg e neui Buechig hinzu, indem d nöötige Date iigähsch.',
				triggerLabel: 'Neui Buechig hinzfüege',
				person: 'Persöndliche Date',
				enterContact:
					'Gib d Kontaktdate vo de Persoon ii, wo d Buechig mache will.',
				edit: 'Buechig bearbeite',
				descriptionEdit: 'Bearbeite d Buechige für s Boot',
				triggerLabelEdit: 'Buechig bearbeite',
				noTimeSlotSelected: 'Fähler bim Lade vom Ziitfenster...',
				success: 'D Buechig isch erfolgrych gsii',
				fail: 'Buechig gönd nöd: ',
				currentBooking: 'Derzeitige Buchungen',
				update: 'Buächig apasse',
				driverOrViewer: 'Fahrer oder Zueschouer?',
				isRider: 'duet fahre',
				isViewer: 'duet zueluege',
				free: 'frei',
			},
			login: {
				username: 'Benutzername',
				password: 'Passwort',
				login: 'Aamälde',
				error: 'Benutzer oder Passwort isch falsch',
			},
			schedule: {
				title: 'Ziitplan',
				addBoat:
					'Füeg es Boot hinzu, zum dr Ziitplan für d Ziitfenster aazzeige.',
			},
			event: {
				create: 'Veranstaltig erstelle',
				description:
					'Füeg e neui Veranstaltig hinzu, indem d nöötige Metadate iigähsch.',
				triggerLabel: 'Neui Veranstaltig hinzfüege',
				placeholder: 'Summer Event 2024',
				date: 'Veranstaltigsdatum',
			},
			from: 'Vo',
			to: 'Bis',
			type: 'Typ',
			icon: 'Icon',
			search: 'Sueche',
			searchPlaceholder: 'Sueche...',
			noData: 'Kei Date gfunde',
			checklist: 'Checklist',
			tryAgain: 'No einisch versueche',
			welcomeMessage: 'Willkomme bi ti&m Veranstaltigsplanig.',
			description: 'Bschrybig',
			title: 'Titel',
			select: 'Selektiärä',
			loading: 'Am Lade...',
			yes: 'Ja',
			no: 'Neii',
			delete: 'Löschä',
			messages: {
				pageErrorOops: 'Ohje! Öppis isch schiefglaufe.',
				pageErrorNotFound: 'Die Seite händ mir nöd gfunde.',
				pageErrorNotAuthorized: 'Dir sind nöd berechtigt, die Seite z aaluege.',
				pageErrorApiDown: 'Süsch wäge, üsi API isch im Momänt nöd verfüegbar.',
				pageErrorTeapot: 'Surfe macht durstig 🍵.',
				page404NavigateHome: 'Mir gönd zrugg uf d ',
				successCreate: 'Ds Element isch erfolgrich erstellt worde!',
				successUpdate: 'Ds Element isch erfolgrich gspicheret worde!',
				successDelete: 'Ds Element isch erfolgrich glöscht worde!',
				errorSuccess: 'Es isch en Fehler passiert bim Erstelle.',
				errorUpdate: 'Es isch en Fehler passiert bim Speichere.',
				errorDelete: 'Es isch en Fehler passiert bim Lösche.',
				validationErrorTitle: 'Hett nid chönne gspichert wärde.',
				validationErrorDescription: 'Es git Validierigsfähler im Formular.',
				validationMessageDateFormat: 'ungültigs Datumsformat',
			},
			// Meta-Daten
			appName: 'Shake The Lake Admin App',
			shakeTheLake: 'Shake The Lake',
			// Navigationsname
			home: 'Startsite',
			events: 'Veranstaltige',
			boats: 'Böt',
			logout: 'Abmälde',
			overview: 'Übersicht',
			activityTypes: 'Aktivitätstype',
			bookings: 'Buechige',
			cancel: 'Abbräche',
			save: 'Spychere',
			firstName: 'Vorname',
			lastName: 'Nachname',
			activity: 'Aktivität',
			viewerSeats: 'Zueschouer Plätz',
			riderSeats: 'Fahrer Plätz',
			name: 'Name',
			email: 'E-Mail',
			createdBy: 'Ersteut vo',
			modifiedBy: 'Gänderet vo',
			infoTextActivityTraceInfo: 'Das sii d Lüüt wo dä Iitrag us letschts bearbeitet heii:',
			on: 'am',
			clearValue: 'Lösch d Uswau',
			phone: 'Telefonnummer',
			personType: 'Personetyp',
			employee: 'Mitarbeiter',
			customer: 'Chund',
			boatDriver: 'Bootsfahrer',
			rider: 'Fahrer',
			viewer: 'Zueschouer',
			pagerNumber: 'Pager-Nummer',
			update: 'Aktualisierä',
			manual: 'Manuell',
			currentBooking: 'aktuelli Buechig',
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
