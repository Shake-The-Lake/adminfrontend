const timeZone = 'Europe/Zurich';

export function validateDate(value: string) {
	return !isNaN(Date.parse(value));
}

export function validateTime(value: string | undefined) {
	if (value === undefined) {
		return true;
	}

	const [hours, minutes] = value.split(':').map(Number);
	return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export function getDisplayTimeFromBackend(value: string | undefined) {
	return value?.slice(0, 5) ?? '';
}

export function toSwissLocalDateTimeString(date: Date) {
	return `${toSwissLocaleDateString(date)} ${toSwissLocaleTimeString(date)}`;
}

export function toSwissLocaleDateString(date: Date) {
	return new Date(date).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone });
}

export function toSwissLocaleTimeString(date: Date) {
	return new Date(date).toLocaleTimeString('de-CH', { hour: '2-digit', minute: '2-digit', timeZone });
}

export const fromTimeToDateTime = (date: Date, time: string): Date => {
	// Get the current date
	const currentDate = new Date(date);

	// Split the time string into hours, minutes, and seconds
	const [hours, minutes, seconds] = time.split(':').map(Number);

	// Set the hours, minutes, and seconds of the current date
	currentDate.setHours(hours);
	currentDate.setMinutes(minutes);
	currentDate.setSeconds(seconds);
	currentDate.setMilliseconds(0);

	return currentDate;
};

export const addOneHourToTime = (time: string | undefined): string => {
	// Get the current date
	const currentDate = new Date();

	if (time !== undefined) {
		// Split the time string into hours, minutes, and seconds
		const [hours, minutes, seconds] = time.split(':').map(Number);

		// Set the hours, minutes, and seconds of the current date
		currentDate.setHours(hours + 1);
		currentDate.setMinutes(minutes);
		currentDate.setSeconds(seconds);
		currentDate.setMilliseconds(0);
	}

	return toSwissLocaleTimeString(currentDate);
};
