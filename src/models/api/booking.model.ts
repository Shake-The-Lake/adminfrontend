export type BookingDto = {
	id: number;
	isRider: boolean;
	isManual: boolean;
	pagerNumber?: number;
	personId: number;
	timeSlotId: number;
};

export const defaultBooking: BookingDto = {
	id: 0,
	isRider: false,
	isManual: false,
	pagerNumber: undefined,
	personId: 0,
	timeSlotId: 0,
};
