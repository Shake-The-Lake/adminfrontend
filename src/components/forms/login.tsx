import React from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {onInvalidFormHandler} from '../../lib/utils';
import {type UseMutationResult} from '@tanstack/react-query';
import {MutationToaster} from '../common/mutation-toaster';
import {Button} from '../ui/button';
import {type LoginDto} from '../../models/api/login.model';
import {useNavigate, useLocation} from 'react-router-dom'; // Added useLocation
import {useAuth} from '../../AuthContext';
import {useCreateLogin} from '../../queries/login';

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
	const location = useLocation(); // UseLocation to capture where user is coming from
	const {login} = useAuth();

	const loginMutation = useCreateLogin();

	// Get the "from" state or default to the home page
	const from = location.state?.from?.pathname as string || '/';

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
			await loginMutation.mutateAsync(loginData);

			const token = 'login token';
			login(token);

			// Redirect to the page the user initially tried to access
			navigate(from, {replace: true});
		} catch (error) {
			// Handle login failure (if needed)
			console.error('Login failed', error);
		}
	};

	return (
		<>
			<MutationToaster
				type='create'
				mutation={loginMutation}
			/>
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
