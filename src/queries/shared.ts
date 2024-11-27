import {type QueryClient, type QueryKey} from '@tanstack/react-query';
import {eventBasedBaseQueryKey, eventQueryKeys} from './event';
import {searchKeys} from './search';
import {bookingQueryKeys} from './booking';
import {timeSlotQueryKeys} from './time-slot';

export const getBaseQueryKey = (eventId: number, identifier: string) =>
	[...eventBasedBaseQueryKey(eventId), identifier] as QueryKey;

export function mutationKeyGenerator(identifier: string) {
	return {
		create: [identifier, 'create'],
		update: [identifier, 'update'],
		delete: [identifier, 'delete'],
	};
}

export const invalidateAllQueriesOfEventFor = async (
	identifier: string,
	eventId: number,
	queryClient: QueryClient,
) =>
	queryClient.invalidateQueries({
		queryKey: getBaseQueryKey(eventId, identifier), // Not exact to catch others as well
	});

export const invalidateFromNavigationStructureRelevantQuery = async (
	eventId: number,
	queryClient: QueryClient,
) =>
	queryClient.invalidateQueries({
		queryKey: eventQueryKeys.detail(eventId, true),
		exact: true,
	});

export const invalidateFromSelectSearchParamsRelevantQuery = async (
	eventId: number,
	queryClient: QueryClient,
) =>
	queryClient.invalidateQueries({
		queryKey: searchKeys.all(eventId),
	});

export const invalidateFromBookingMetaDataRelevantQuery = async (
	queryClient: QueryClient,
	eventId: number,
) => {
	// Bookings and the schedule view are impacted if an (activity type / boat) name changes
	// or gets deleted entirely, but not when a new one gets added.
	await queryClient.invalidateQueries({queryKey: bookingQueryKeys.all(eventId)});
	await queryClient.invalidateQueries({queryKey: timeSlotQueryKeys.all(eventId)});
};
