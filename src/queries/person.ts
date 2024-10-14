import {
	type QueryKey,
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

export const personKeys = {
	all: () => ['persons'] as QueryKey,
	detail: (id: number) => ['persons', 'detail', id] as QueryKey,
};

export function useGetPersonDetails(id: number) {
	return useQuery({
		queryKey: personKeys.detail(id),
		queryFn: async () => getPersonById(id),
	});
}

export function useCreatePerson() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (personData: PersonDto) => createPerson(personData),
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(personKeys.detail(data.id!), data);
				await queryClient.invalidateQueries({
					queryKey: personKeys.all(),
					exact: true,
				});
			}
		},
	});
}

export function useUpdatePerson(id: number) {
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

			queryClient.setQueryData(personKeys.detail(data.id!), data);

			await queryClient.invalidateQueries({
				queryKey: personKeys.all(),
				exact: true,
			});
		},
	});
}
