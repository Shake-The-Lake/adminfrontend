import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {z} from 'zod';
import {FormControl, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';
import {useTranslation} from 'react-i18next';
import StlSelect from '../select/stl-select';

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

const PersonForm: React.FC = () => {
	const {
		control,
		formState: {errors},
	} = useFormContext();
	
	const {t} = useTranslation();
	const getErrorMessage = (error: any) =>
		typeof error?.message === 'string' ? error.message : '';

	return (
		<>
			<FormItem>
				<FormLabel>{t('firstName')}</FormLabel>
				<FormControl>
					<Controller
						name="person.firstName"
						control={control}
						render={({field}) => (
							<Input {...field} placeholder={t('firstName')} />
						)}
					/>
				</FormControl>
			</FormItem>

			<FormItem>
				<FormLabel>{t('lastName')}</FormLabel>
				<FormControl>
					<Controller
						name="person.lastName"
						control={control}
						render={({field}) => (
							<Input {...field} placeholder={t('lastName')} />
						)}
					/>
				</FormControl>
			</FormItem>

			<FormItem>
				<FormLabel>{t('email')}</FormLabel>
				<FormControl>
					<Controller
						name="person.emailAddress"
						control={control}
						render={({field}) => (
							<Input {...field} placeholder={t('email')} type="email" />
						)}
					/>
				</FormControl>
			</FormItem>

			<FormItem>
				<FormLabel>{t('phone')}</FormLabel>
				<FormControl>
					<Controller
						name="person.phoneNumber"
						control={control}
						render={({field}) => (
							<Input {...field} placeholder={t('phone')} type="tel" />
						)}
					/>
				</FormControl>
			</FormItem>

			<FormItem>
				<FormLabel>{t('personType')}</FormLabel>
				<FormControl>
					<Controller
						name="person.personType"
						control={control}
						render={({field}) => (
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
						)}
					/>
				</FormControl>
			</FormItem>
		</>
	);
};

export default PersonForm;
