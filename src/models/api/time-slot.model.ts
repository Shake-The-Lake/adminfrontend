export type TimeSlotDto = {
	id?: number;
	fromTime?: string; // Assuming ISO string format for LocalDateTime
	untilTime?: string; // Assuming ISO string format for LocalDateTime
	boatId?: number;
	bookingIds?: Set<number>;
};
