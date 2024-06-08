export type TimeSlotDto = {
	id?: number;
	status: 'AVAILABLE' | 'ON_BREAK';
	fromTime?: Date; // Assuming ISO string format for LocalDateTime
	untilTime?: Date; // Assuming ISO string format for LocalDateTime
	boatId?: number;
	bookingIds?: Set<number>;
};
