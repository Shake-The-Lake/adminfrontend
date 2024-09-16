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

// Schema definition
export const loginFormSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

type LoginFormProps = {
	model: LoginDto;
	mutation: UseMutationResult<any, Error, LoginDto>; // First any is return type, second is input
};

const LoginForm: React.FC<LoginFormProps> = ({model, mutation}) => {
	const form = useForm<LoginFormSchema>({
		mode: 'onChange',
		defaultValues: {
			username: model.username,
			password: model.password,
		},
		resolver: zodResolver(loginFormSchema),
	});

	const onSubmit: SubmitHandler<LoginFormSchema> = async (values) => {
		const login: LoginDto = {
			...values,
			username: values.username,
			password: values.password,
		};

		await mutation.mutateAsync(login);
	};

	return (
		<>
			<MutationToaster
				type='create'
				mutation={mutation}
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
										placeholder="password"
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
