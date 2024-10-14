import React from 'react';
import {useFormContext} from 'react-hook-form';
import {z} from 'zod';
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
import {personTypeOptions} from '../../constants/constants';

export const personSchema = z.object({
	id: z.number().optional(),
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	emailAddress: z.string().email('Invalid email address'),
	phoneNumber: z
		.string()
		.min(1, 'Phone number is required')
		.regex(/^[0-9()+-]*$/, 'Phone number must contain only numbers'),
	personType: z.enum(['EMPLOYEE', 'BOAT_DRIVER', 'CUSTOMER'], {
		required_error: 'Person type is required',
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
								list={personTypeOptions(t)}
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
