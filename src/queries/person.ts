import {
	type QueryKey,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import {createPerson, getPersonById} from '../services/person-service';
import {PersonDto} from '../models/api/person.model';

export const personKeys = {
	all: () => ['persons'] as QueryKey,
	detail: (id: number) => ['persons', 'detail', id] as QueryKey,
};

export function useGetPerson(id: number) {
	return useQuery({
		queryKey: personKeys.detail(id),
		queryFn: async () => getPersonById(id),
	});
}

export function useCreatePerson() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (personData: PersonDto) => createPerson(personData),
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(personKeys.detail(data.id ?? 0), data);
			}

			await queryClient.invalidateQueries({
				queryKey: personKeys.all(),
				exact: true,
			});
		},
	});
}
