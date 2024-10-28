import {
	type QueryKey,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {createPerson, getPersonById, updatePerson} from '../services/person-service';
import {eventBasedBaseQueryKey} from './event';
import {mutationKeyGenerator} from '../lib/utils';
import {type PersonDto} from '../models/api/person.model';

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

			queryClient.setQueryData(personQueryKeys.detail(eventId, data.id!), data);

			await queryClient.invalidateQueries({
				queryKey: personQueryKeys.all(eventId),
				exact: true,
			});
		},
	});
}

export function useUpdatePerson(eventId: number, id: number) {
	const queryClient = useQueryClient();

	return useMutation({
		async mutationFn(updatedPerson: PersonDto) {
			return updatePerson(id, updatedPerson);
		},

		async onSuccess(data: PersonDto) {
			if (data.id === null) {
				console.warn('Updated person has no ID, cannot update cache.');
				return;
			}

			queryClient.setQueryData(personQueryKeys.detail(eventId, data.id!), data);

			await queryClient.invalidateQueries({
				queryKey: personQueryKeys.all(eventId),
				exact: true,
			});
		},

		onError(error) {
			console.error('Error updating person:', error);
		},
	});
}