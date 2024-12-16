import React from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { useTranslation } from 'react-i18next';
import StlSelect, { StlSelectDefaultLabelKey } from '../select/stl-select';
import { personTypeOptions } from '../../constants/constants';

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
		// eslint-disable-next-line @typescript-eslint/naming-convention
		required_error: 'Person type is required',
	}),
});

export type PersonFormSchema = z.infer<typeof personSchema>;

const PersonForm: React.FC = () => {
	const { t } = useTranslation();
	const { control } = useFormContext();

	return (
		<>
			<FormField
				name="person.firstName"
				control={control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('firstName')}</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder={t('firstName')}
								data-testid="person-first-name"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name="person.lastName"
				control={control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('lastName')}</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder={t('lastName')}
								data-testid="person-last-name"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name="person.emailAddress"
				control={control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('email')}</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder={t('email')}
								type="email"
								data-testid="person-email"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name="person.phoneNumber"
				control={control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('phone')}</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder={t('phone')}
								type="tel"
								data-testid="person-phone"
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				name="person.personType"
				control={control}
				render={({ field }) => (
					<FormItem>
						<FormLabel>{t('personType')}</FormLabel>
						<FormControl>
							<StlSelect
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								value={field.value ?? ''}
								onValueChange={field.onChange}
								list={personTypeOptions(t)}
								getKey={(item) => item?.key?.toString()}
								getLabel={(item) => item?.label ?? t(StlSelectDefaultLabelKey)}
								dataTestId="personTypeDropdown"
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
