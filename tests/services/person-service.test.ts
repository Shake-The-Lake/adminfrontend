import { createPerson, getPersonById } from '../../src/services/person-service';
import { type PersonDto } from '../../src/models/api/person.model';
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
describe('person-service', () => {
	describe('createPerson', () => {
		it('should create a new person', async () => {
			const person: PersonDto = { id: 1, personType: 'CUSTOMER', firstName: 'John', lastName: 'Doe', emailAddress: 'john.doe@example.com', phoneNumber: '1234567890' };
			axiosInstance.post.mockResolvedValue({ data: person });
			const result = await createPerson(person);
			expect(result).toEqual(person);
			expect(axiosInstance.post).toHaveBeenCalledWith('/person', person);
		});
	});

	describe('getPersonById', () => {
		it('should return person by id', async () => {
			const person: PersonDto = { id: 1, personType: 'CUSTOMER', firstName: 'John', lastName: 'Doe', emailAddress: 'john.doe@example.com', phoneNumber: '1234567890' };
			axiosInstance.get.mockResolvedValue({ data: person });
			const result = await getPersonById(1);
			expect(result).toEqual(person);
			expect(axiosInstance.get).toHaveBeenCalledWith('/person/1');
		});
	});
});