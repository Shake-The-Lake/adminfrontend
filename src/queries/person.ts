import {
	type QueryClient,
	type QueryKey,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {
	createPerson,
	getPersonById,
	updatePerson,
} from '../services/person-service';
import {type PersonDto} from '../models/api/person.model';
import {
	getBaseQueryKey,
	invalidateAllQueriesOfEventFor,
	mutationKeyGenerator,
} from './shared';

const identifier = 'persons';

const baseQueryKey = (eventId: number) => getBaseQueryKey(eventId, identifier);

export const personQueryKeys = {
	all: baseQueryKey,
	detail: (eventId: number, id: number) =>
		[...baseQueryKey(eventId), 'detail', id] as QueryKey,
};

export const personMutationKeys = mutationKeyGenerator(identifier);

export const personDetailOptions = (eventId: number, id: number) =>
	queryOptions({
		queryKey: personQueryKeys.detail(eventId, id),
		queryFn: async () => getPersonById(id),
	});

export function usePersonDetail(eventId: number, id: number) {
	return useQuery(personDetailOptions(eventId, id));
}

export function useCreatePerson(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: personMutationKeys.create,
		mutationFn: createPerson,
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

export function useUpdatePerson(eventId: number, id: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: personMutationKeys.update,
		mutationFn: async (booking: PersonDto) => updatePerson(id, booking),
		async onSuccess(data) {
			await queriesToInvalidateOnCrud(queryClient, eventId, id, data);
		},
	});
}

async function queriesToInvalidateOnCrud(
	queryClient: QueryClient,
	eventId: number,
	personId?: number,
	data?: PersonDto,
) {
	// It is a conscious choice not to invalidate more queries here, as from the current business perspective
	// an update/create operation of a person always happens simultaneously with a booking.
	// Therefore we don't want to do the invalidation twice.
	
	await invalidateAllQueriesOfEventFor(identifier, eventId, queryClient);
}
