export type LoginDto = {
	username: string;
	password: string;
};

export const defaultLoginDto: LoginDto = {
	username: '',
	password: '',
};
