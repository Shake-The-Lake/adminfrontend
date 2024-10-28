import {type EventDto} from '../models/api/event.model';
import {type ActivityTypeDto} from '../models/api/activity-type.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {
	createActivityType,
	deleteActivityType,
	getActivityTypeById,
	getAllActivityTypesFromEvent,
	updateActivityType,
} from '../services/activity-type-service';
import {eventQueryKeys} from './event';
import {
	getBaseQueryKey,
	invalidateAllQueriesOfEventFor,
	invalidateFromNavigationStructureRelevantQuery,
	invalidateFromSelectSearchParamsRelevantQuery,
	mutationKeyGenerator,
} from './shared';

const identifier = 'activity-types';

const baseQueryKey = (eventId: number) => getBaseQueryKey(eventId, identifier);

export const activityTypeQueryKeys = {
	all: baseQueryKey,
	detail: (eventId: number, id: number) =>
		[...baseQueryKey(eventId), 'detail', id] as QueryKey,
};

export const activityTypeMutationKeys = mutationKeyGenerator(identifier);

export const activityTypesOptions = (
	eventId: number,
	queryClient: QueryClient,
) =>
	queryOptions({
		queryKey: activityTypeQueryKeys.all(eventId),
		queryFn: async () => getAllActivityTypesFromEvent(eventId),
		initialData() {
			const queryData: EventDto | undefined = queryClient.getQueryData(
				eventQueryKeys.detail(eventId, true),
			);
			return queryData?.activityTypes;
		},
	});

export function useGetActivityTypes(eventId: number) {
	const queryClient = useQueryClient();
	return useQuery(activityTypesOptions(eventId, queryClient));
}

export const activityTypeDetailOptions = (eventId: number, id: number) =>
	queryOptions({
		queryKey: activityTypeQueryKeys.detail(eventId, id),
		queryFn: async () => getActivityTypeById(id),
	});

export function useActivityTypeDetail(eventId: number, id: number) {
	const queryClient = useQueryClient();

	return useQuery({
		...activityTypeDetailOptions(eventId, id),
		initialData() {
			const queryData: ActivityTypeDto[] | undefined = queryClient.getQueryData(
				activityTypeQueryKeys.all(eventId),
			);
			return queryData?.find((d) => d.id === eventId);
		},
	});
}

export function useCreateActivityType(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: activityTypeMutationKeys.create,
		mutationFn: createActivityType,
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(
				queryClient,
				eventId,
				data?.id ?? 0,
				data,
			);
		},
	});
}

export function useUpdateActivityType(eventId: number, id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: activityTypeMutationKeys.update,
		mutationFn: async (activitytype: ActivityTypeDto) =>
			updateActivityType(id, activitytype),
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(queryClient, eventId, id, data);
		},
	});
}

export function useDeleteActivityType(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: activityTypeMutationKeys.delete,
		mutationFn: deleteActivityType,
		async onSuccess() {
			await queriesToInvalidateOnCrud(queryClient, eventId);
		},
	});
}

async function queriesToInvalidateOnCrud(
	queryClient: QueryClient,
	eventId: number,
	activityTypeId?: number,
	data?: ActivityTypeDto,
) {
	await invalidateAllQueriesOfEventFor(identifier, eventId, queryClient);

	if (activityTypeId) {
		queryClient.setQueryData(
			activityTypeQueryKeys.detail(eventId, activityTypeId),
			data,
		);
	}

	await invalidateFromNavigationStructureRelevantQuery(eventId, queryClient);

	await invalidateFromSelectSearchParamsRelevantQuery(eventId, queryClient);
}
