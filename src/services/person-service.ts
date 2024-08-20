import axios from 'axios';
import {type PersonDto} from '../models/api/person.model';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const createPerson = async (person: PersonDto): Promise<PersonDto> => {
	const response = await axios.post<PersonDto>(`${baseUrl}/person`, person);
	return response.data;
};
