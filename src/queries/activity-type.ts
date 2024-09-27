import { type EventDto } from '../models/api/event.model';
import { type ActivityTypeDto } from '../models/api/activity-type.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import { createActivityType, deleteActivityType, getActivityTypeById, getAllActivityTypesFromEvent, updateActivityType } from '../services/activity-type-service';
import { eventKeys } from './event';

export const activityTypeKeys = {
	all: (eventId: number) => ['activity-types', eventId] as QueryKey,
	detail: (id: number) => ['activity-types', 'detail', id] as QueryKey,
};

export const activityTypesOptions = (eventId: number, queryClient: QueryClient) => queryOptions({
	queryKey: activityTypeKeys.all(eventId),
	queryFn: async () => getAllActivityTypesFromEvent(eventId),
	initialData() {
		const queryData: EventDto | undefined = queryClient.getQueryData(eventKeys.detail(eventId, true));
		return queryData?.activityTypes;
	},
});

export function useGetActivityTypes(eventId: number) {
	const queryClient = useQueryClient();
	return useQuery(activityTypesOptions(eventId, queryClient));
}

export const activityTypeDetailOptions = (id: number) => queryOptions({
	queryKey: activityTypeKeys.detail(id),
	queryFn: async () => getActivityTypeById(id),
});

export function useActivityTypeDetail(
	id: number,
	eventId: number,
) {
	const queryClient = useQueryClient();
	return useQuery({
		...activityTypeDetailOptions(id),
		initialData() {
			const queryData: ActivityTypeDto[] | undefined = queryClient.getQueryData(
				activityTypeKeys.all(eventId),
			);
			return queryData?.find((d) => d.id === eventId);
		},
	});
}

export function useCreateActivityType(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createActivityType,
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(activityTypeKeys.detail(data.id ?? 0), data);
			}
			console.log('Invalidating queries for activity types and event details...');
			await queryClient.invalidateQueries({ queryKey: activityTypeKeys.all(eventId), exact: true });
			await queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId, true), exact: true });
			console.log('Queries invalidated.');
		},
	});
}

export function useUpdateActivityType(id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (activitytype: ActivityTypeDto) => updateActivityType(id, activitytype),
		async onSuccess(data) {
			queryClient.setQueryData(activityTypeKeys.detail(data?.id ?? 0), data);

			await queryClient.invalidateQueries({ queryKey: activityTypeKeys.all(data?.eventId ?? 0), exact: true });
			await queryClient.invalidateQueries({ queryKey: eventKeys.detail(data?.eventId ?? 0, true), exact: true });
		},
	});
}

export function useDeleteActivityType(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteActivityType,
		async onSuccess() {
			await queryClient.invalidateQueries({ queryKey: activityTypeKeys.all(eventId), exact: true });
			await queryClient.invalidateQueries({ queryKey: eventKeys.detail(eventId, true), exact: true });
		},
	});
}
