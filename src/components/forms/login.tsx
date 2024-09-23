import React from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {onInvalidFormHandler} from '../../lib/utils';
import {Button} from '../ui/button';
import {type LoginDto} from '../../models/api/login.model'; // Added useLocation
import {useAuth} from '../../AuthContext';
import {toast} from 'sonner';
import {useNavigate} from 'react-router-dom';

// Schema definition
export const loginFormSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

type LoginFormProps = {
	model: LoginDto;
};

const LoginForm: React.FC<LoginFormProps> = ({model}) => {
	const navigate = useNavigate();
	const {login} = useAuth();

	const form = useForm<LoginFormSchema>({
		mode: 'onChange',
		defaultValues: {
			username: model.username,
			password: model.password,
		},
		resolver: zodResolver(loginFormSchema),
	});

	const onSubmit: SubmitHandler<LoginFormSchema> = async (values) => {
		const loginData: LoginDto = {
			...values,
			username: values.username,
			password: values.password,
		};
		try {
			const loggedIn = true; // Replace this with the actual login logic
			if (!loggedIn) throw new Error('User or Password is wrong');

			login(loginData.username, loginData.password);

			const redirectTo = localStorage.getItem('redirectAfterLogin');

			if (!redirectTo || redirectTo === '/login') {
				navigate('/', {replace: true});
			} else {
				navigate(redirectTo, {replace: true});
			}
		} catch (error) {
			toast.error('Try again', {
				description: 'User or Password is wrong',
			});
			form.reset();
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					className="p-1 space-y-4"
					onSubmit={form.handleSubmit(onSubmit, onInvalidFormHandler)}
					id="event">
					<FormField
						name="username"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										placeholder="Username"
										{...field}
										className="input"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="password"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="Password"
										{...field}
										className="input"
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<div
						className="mt-16 flex justify-end w-full">
						<Button type="submit">Login</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default LoginForm;
