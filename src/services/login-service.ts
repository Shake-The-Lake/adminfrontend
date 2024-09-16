import axios from 'axios';
import {type EventDto} from '../models/api/event.model';
import {type LoginDto} from '../models/api/login.model';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const login = async (login: LoginDto): Promise<string> => {
	console.log('login', login);
	const response = await axios.post<EventDto>(`${baseUrl}/`, login);
	return 'logged in';
};
