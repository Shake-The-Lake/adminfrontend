import {
	type QueryKey,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {createPerson, getPersonById} from '../services/person-service';
import {eventBasedBaseQueryKey} from './event';
import {mutationKeyGenerator} from '../lib/utils';

const identifier = 'persons';

const baseQueryKey = (eventId: number) =>
	[...eventBasedBaseQueryKey(eventId), identifier] as QueryKey;

export const personQueryKeys = {
	all: baseQueryKey,
	detail: (eventId: number, id: number) =>
		[...baseQueryKey(eventId), 'detail', id] as QueryKey,
};

export const personMutationKeys = mutationKeyGenerator(identifier);

export function useGetPerson(eventId: number, id: number) {
	return useQuery({
		queryKey: personQueryKeys.detail(eventId, id),
		queryFn: async () => getPersonById(id),
	});
}

export function useCreatePerson(eventId: number) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: personMutationKeys.create,
		mutationFn: createPerson,
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(
					personQueryKeys.detail(eventId, data.id ?? 0),
					data,
				);
			}

			await queryClient.invalidateQueries({
				queryKey: personQueryKeys.all(eventId),
				exact: true,
			});
		},
	});
}
