import React from 'react';
import {z} from 'zod';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import {zodResolver} from '@hookform/resolvers/zod';
import {type UseMutationResult} from '@tanstack/react-query';
import {MutationToaster} from '../common/mutation-toaster';
import {type PersonDto} from '../../models/api/person.model';
import {Input} from '../ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';

const PersonSchema = z.object({
	id: z.number(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	phoneNumber: z.number(),
	personType: z.enum(['employee', 'customer']),
	pagerNumber: z.string(),
});

export type PersonFormSchema = z.infer<typeof PersonSchema>;

type PersonFormProps = {
	model: PersonDto;
	mutation: UseMutationResult<any, Error, PersonDto>;
	isCreate: boolean;
};

const PersonForm: React.FC<PersonFormProps> = ({model, mutation, isCreate}) => {
	const form = useForm<PersonFormSchema>({
		mode: 'onChange',
		defaultValues: {
			id: model.id ?? 0,
			firstName: model.firstName ?? '',
			lastName: model.lastName ?? '',
			email: model.emailAddress ?? '',
			phoneNumber: model.phoneNumber ?? 0,
			personType: 'customer',
		},
		resolver: zodResolver(PersonSchema),
	});

	const onSubmit: SubmitHandler<PersonFormSchema> = async (values) => {
		const person: PersonDto = {
			...values,
			id: values.id ?? model.id,
		};

		try {
			await mutation.mutateAsync(person);
		} catch (error) {
			console.error('Failed to submit form:', error);
		}
	};

	return (
		<>
			<MutationToaster
				type={isCreate ? 'create' : 'update'}
				mutation={mutation}
			/>
			<Form {...form}>
				<form
					id="personForm"
					className="p-1 space-y-4 w-full"
					onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						name="firstName"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input
										placeholder="First Name"
										{...field}
										className="input"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="lastName"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Last Name" {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="email"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Email"
										{...field}
										className="input"
										type="email"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="phoneNumber"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input
										placeholder="Phone Number"
										{...field}
										className="input"
										type="tel"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="personType"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Person Type</FormLabel>
								<FormControl>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger>
											<SelectValue placeholder="Select Person Type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="employee">Employee</SelectItem>
											<SelectItem value="customer">Customer</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="pagerNumber"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>Pager Number</FormLabel>
								<FormControl>
									<Input placeholder="XC23832" {...field} className="input" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</>
	);
};

export default PersonForm;
