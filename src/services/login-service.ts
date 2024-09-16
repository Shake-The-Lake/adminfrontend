import axios from 'axios';
import {type EventDto} from '../models/api/event.model';
import {type LoginDto} from '../models/api/login.model';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const loginEvent = async (login: LoginDto): Promise<boolean> => {
	const response = await axios.post<EventDto>(`${baseUrl}/`, login);
	return true;
};
