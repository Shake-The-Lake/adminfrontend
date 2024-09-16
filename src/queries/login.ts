import {type EventDto} from '../models/api/event.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {loginEvent} from '../services/login-service';


export function useLoginEvent() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: loginEvent,
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(['loged in'], data);
			}
		},
	});
}
