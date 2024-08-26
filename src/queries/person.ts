import {
	type QueryKey,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import {createPerson} from '../services/person-service';

export const personKeys = {
	all: () => ['persons'] as QueryKey,
	detail: (id: number) => ['persons', 'detail', id] as QueryKey,
};

export function useCreatePerson() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createPerson,
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
