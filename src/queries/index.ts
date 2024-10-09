import {eventMutationKeys, eventQueryKeys} from './event';
import {activityTypeMutationKeys, activityTypeQueryKeys} from './activity-type';
import {boatMutationKeys, boatQueryKeys} from './boat';
import {timeSlotKeys} from './time-slot';
import {bookingKeys} from './booking';
import {searchKeys} from './search';

export const queries = {
	event: eventQueryKeys,
	activityType: activityTypeQueryKeys,
	boat: boatQueryKeys,
	timeSlot: timeSlotKeys,
	booking: bookingKeys,
	search: searchKeys,
};

export const mutations = {
	activityType: activityTypeMutationKeys,
	boat: boatMutationKeys,
	event: eventMutationKeys,
}
