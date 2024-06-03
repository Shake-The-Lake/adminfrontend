export type TimeSlotDto = {
	id?: number;
	status: 'AVAILABLE' | 'ON_BREAK';
	fromTime?: string; // Assuming ISO string format for LocalDateTime
	untilTime?: string; // Assuming ISO string format for LocalDateTime
	boatId?: number;
	bookingIds?: Set<number>;
};
