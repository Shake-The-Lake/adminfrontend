export type BoatDto = {
	id: number;
	name: string;
	type: string;
	seatsRider: string;
	seatsViewer: string;
	operator: string;
	slotDurationInMins?: number;
	availableFrom: string;
	availableUntil: string;
	timeSlotIds?: Set<number>;
	activityTypeId?: number;
	eventId?: number;
};
