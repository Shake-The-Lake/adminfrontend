import {QueryKey} from '@tanstack/react-query';
import {keys as eventKeys} from './event';
import {keys as activityTypeKeys} from './activity-type';
import {keys as boatKeys} from './boat';

export const queries = {
	event: eventKeys,
	activityType: activityTypeKeys,
	boat: boatKeys,
};
