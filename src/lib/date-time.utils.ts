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

export function toSwissLocaleTimeString(date: Date) {
	return date.toLocaleTimeString('de-CH', {hour: '2-digit', minute:'2-digit'});
}
