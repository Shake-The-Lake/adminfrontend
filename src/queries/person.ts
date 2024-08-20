import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createPerson} from '../services/person-service';

export function useCreatePerson() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: createPerson,
		async onSuccess(data) {
			if (data) {
				// QueryClient.setQueryData(keys.detail(data.id ?? 0, false), data);
				// TODO
			}

			// Await queryClient.invalidateQueries({queryKey: keys.all(), exact: true});
			// TODO
		},
	});
}
