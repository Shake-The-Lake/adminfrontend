export type BoatDto = {
	id: number;
	boatDriverId?: number;
	name: string;
	type: string;
	seatsRider: string;
	seatsViewer: string;
	slotDurationInMins?: number;
	availableFrom: string;
	availableUntil: string;
	timeSlotIds?: Set<number>;
	activityTypeId?: number;
	eventId?: number;
};
