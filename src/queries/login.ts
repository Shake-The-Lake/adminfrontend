import {type EventDto} from '../models/api/event.model';
import {
	type QueryClient,
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query';
import {type LoginDto} from '../models/api/login.model';
import {login} from '../services/login-service';

export const loginKey = {
	detail: (name: string) => ['login', 'detail', name] as QueryKey,
};

export function useCreateLogin() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: login,
		async onSuccess(data) {
			if (data) {
				queryClient.setQueryData(loginKey.detail(data ?? ''), data);
			}
		},
	});
}
