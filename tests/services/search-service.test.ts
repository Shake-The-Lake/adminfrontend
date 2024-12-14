import { getSearchParams } from '../../src/services/search-service';
import { type SearchParameterDto } from '../../src/models/api/search.model';
import axiosInstance from '../../src/services/axiosInstance';
import { vi } from 'vitest';

vi.mock('../../src/services/axiosInstance');
vi.mock('../../src/config/firebaseConfig', () => ({
	auth: {
		currentUser: { uid: 'test-user' },
		signInWithEmailAndPassword: vi.fn(),
		signOut: vi.fn(),
	},
}));
describe('search-service', () => {
	describe('getSearchParams', () => {
		it('should return search parameters for a given event ID', async () => {
			const searchParams: SearchParameterDto = { param1: 'value1', param2: 'value2' };
			axiosInstance.get.mockResolvedValue({ data: searchParams });
			const result = await getSearchParams(1);
			expect(result).toEqual(searchParams);
			expect(axiosInstance.get).toHaveBeenCalledWith('/search/1/parameters');
		});
	});
});