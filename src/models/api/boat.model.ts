export type BoatDto = {
	id: number;
	boatDriverId?: number;
	name: string;
	type: string;
	seatsRider: number;
	seatsViewer: number;
	slotDurationInMins: number;
	availableFrom: string;
	availableUntil: string;
	timeSlotIds: Set<number>;
	activityTypeId?: number;
	eventId?: number;
};
