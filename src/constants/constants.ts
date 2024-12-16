import { TimeSlotType } from '../models/api/time-slot.model';

export const personTypeOptions = (t: (key: string) => string) => [
	{ key: 'EMPLOYEE', label: t('employee') },
	{ key: 'CUSTOMER', label: t('customer') },
];

export const getIsRiderOptions = (t: (key: string) => string) => [
	{ key: 'rider', label: t('rider') },
	{ key: 'viewer', label: t('viewer') },
];

export const timeSlotTypeOptions = (t: (key: string) => string) => [
	{ key: TimeSlotType.AVAILABLE, label: t('timeSlot.statusAvailable') },
	{ key: TimeSlotType.ON_BREAK, label: t('timeSlot.statusBreak') },
];
