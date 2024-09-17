import {type LoginDto} from '../models/api/login.model';

const baseUrl = import.meta.env.VITE_APP_BASE_URL as string;

export const login = async (login: LoginDto): Promise<string> => 
	// Const response = await axios.post<EventDto>(`${baseUrl}/`, login);
	 'logged in'
;
