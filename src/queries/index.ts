import {eventKeys} from './event';
import {activityTypeMutationKeys, activityTypeQueryKeys} from './activity-type';
import {boatKeys} from './boat';
import {timeSlotKeys} from './time-slot';
import {bookingKeys} from './booking';
import {searchKeys} from './search';

export const queries = {
	event: eventKeys,
	activityType: activityTypeQueryKeys,
	boat: boatKeys,
	timeSlot: timeSlotKeys,
	booking: bookingKeys,
	search: searchKeys,
};

export const mutations = {
	activityType: activityTypeMutationKeys
}
