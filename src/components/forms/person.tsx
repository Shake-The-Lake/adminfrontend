import React from 'react';
import {useFormContext} from 'react-hook-form';
import {z} from 'zod'; // Import zod for validation
import {Input} from '../ui/input';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import {useTranslation} from 'react-i18next';
import StlSelect from '../select/stl-select';

// Define the Zod schema for Person
export const personSchema = z.object({
	firstName: z
		.string()
		.min(1, 'First name is required')
		.regex(/^[A-Za-z]+$/, 'First name must contain only letters'),
	lastName: z
		.string()
		.min(1, 'Last name is required')
		.regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
	emailAddress: z.string().email('Invalid email address'),
	phoneNumber: z
		.string()
		.min(1, 'Phone number is required')
		.regex(/^[0-9()+-]*$/, 'Phone number must contain only numbers'),
	personType: z.enum(['EMPLOYEE', 'BOAT_DRIVER', 'CUSTOMER'], {
		required_error: 'Please select a person type',
	}),
});

export type PersonFormSchema = z.infer<typeof personSchema>;

const PersonForm: React.FC = () => {
	const {t} = useTranslation();
	const {control} = useFormContext();

	return (
		<>
			<FormField
				name="person.firstName"
				control={control}
				render={({field}) => (
					<FormItem>
						<FormLabel>{t('firstName')}</FormLabel>
						<FormControl>
							<Input {...field} placeholder={t('firstName')} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name="person.lastName"
				control={control}
				render={({field}) => (
					<FormItem>
						<FormLabel>{t('lastName')}</FormLabel>
						<FormControl>
							<Input {...field} placeholder={t('lastName')} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name="person.emailAddress"
				control={control}
				render={({field}) => (
					<FormItem>
						<FormLabel>{t('email')}</FormLabel>
						<FormControl>
							<Input {...field} placeholder={t('email')} type="email" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name="person.phoneNumber"
				control={control}
				render={({field}) => (
					<FormItem>
						<FormLabel>{t('phone')}</FormLabel>
						<FormControl>
							<Input {...field} placeholder={t('phone')} type="tel" />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name="person.personType"
				control={control}
				render={({field}) => (
					<FormItem>
						<FormLabel>{t('personType')}</FormLabel>
						<FormControl>
							<StlSelect
								value={field.value}
								onValueChange={field.onChange}
								list={[
									{key: 'EMPLOYEE', label: t('employee')},
									{key: 'BOAT_DRIVER', label: t('boatDriver')},
									{key: 'CUSTOMER', label: t('customer')},
								]}
								getKey={(item) => item!.key}
								getLabel={(item) => item!.label}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
};

export default PersonForm;
