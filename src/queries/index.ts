import {eventMutationKeys, eventQueryKeys} from './event';
import {activityTypeMutationKeys, activityTypeQueryKeys} from './activity-type';
import {boatMutationKeys, boatQueryKeys} from './boat';
import {timeSlotMutationKeys, timeSlotQueryKeys} from './time-slot';
import {bookingMutationKeys, bookingQueryKeys} from './booking';
import {searchKeys} from './search';
import {personMutationKeys} from './person';

export const queries = {
	event: eventQueryKeys,
	activityType: activityTypeQueryKeys,
	boat: boatQueryKeys,
	timeSlot: timeSlotQueryKeys,
	booking: bookingQueryKeys,
	search: searchKeys,
};

export const mutations = {
	activityType: activityTypeMutationKeys,
	boat: boatMutationKeys,
	event: eventMutationKeys,
	person: personMutationKeys,
	booking: bookingMutationKeys,
	timeSlot: timeSlotMutationKeys,
};
