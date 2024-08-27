export function validateDate(value: string) {
	return !isNaN(Date.parse(value));
}

export function validateTime(value: string) {
	const [hours, minutes] = value.split(':').map(Number);
	return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}

export function getDisplayTimeFromBackend(value: string | undefined) {
	return value?.slice(0, 5) ?? '';
}
