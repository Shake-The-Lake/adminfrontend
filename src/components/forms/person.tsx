import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {FormControl, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import StlSelect from '../select/stl-select';
import {useTranslation} from 'react-i18next';

const PersonForm: React.FC = () => {
	const {
		control,
		formState: {errors},
	} = useFormContext();
	const {t} = useTranslation();

	const getErrorMessage = (error: any) => {
		return typeof error?.message === 'string' ? error.message : '';
	};

	return (
		<>
			<FormItem>
				<FormLabel>{t('firstName')}</FormLabel>
				<FormControl>
					<Controller
						name="firstName"
						control={control}
						render={({field}) => <Input {...field} placeholder="First Name" />}
					/>
				</FormControl>
				<FormMessage>{getErrorMessage(errors.firstName)}</FormMessage>
			</FormItem>

			<FormItem>
				<FormLabel>{t('lastName')}</FormLabel>
				<FormControl>
					<Controller
						name="lastName"
						control={control}
						render={({field}) => <Input {...field} placeholder="Last Name" />}
					/>
				</FormControl>
				<FormMessage>{getErrorMessage(errors.lastName)}</FormMessage>
			</FormItem>

			<FormItem>
				<FormLabel>{t('email')}</FormLabel>
				<FormControl>
					<Controller
						name="emailAddress"
						control={control}
						render={({field}) => (
							<Input {...field} placeholder="Email Address" type="email" />
						)}
					/>
				</FormControl>
				<FormMessage>{getErrorMessage(errors.emailAddress)}</FormMessage>
			</FormItem>

			<FormItem>
				<FormLabel>{t('phone')}</FormLabel>
				<FormControl>
					<Controller
						name="phoneNumber"
						control={control}
						render={({field}) => (
							<Input {...field} placeholder="Phone Number" type="tel" />
						)}
					/>
				</FormControl>
				<FormMessage>{getErrorMessage(errors.phoneNumber)}</FormMessage>
			</FormItem>

			<FormItem>
				<FormLabel>{t('personType')}</FormLabel>
				<FormControl>
					<Controller
						name="personType"
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
								getKey={(item) => item?.key}
								getLabel={(item) => item?.label ?? ''}
							/>
						)}
					/>
				</FormControl>
				<FormMessage>{getErrorMessage(errors.personType)}</FormMessage>
			</FormItem>

			<FormItem>
				<FormLabel>{t('driverOrViewer')}</FormLabel>
				<FormControl>
					<Controller
						name="isRider"
						control={control}
						render={({field}) => (
							<StlSelect
								value={field.value ? 'true' : 'false'}
								onValueChange={(value) => field.onChange(value === 'true')}
								defaultValue="false"
								list={[
									{key: 'true', label: t('rider')},
									{key: 'false', label: t('viewer')},
								]}
								getKey={(item) => item?.key}
								getLabel={(item) => item!.label}
							/>
						)}
					/>
				</FormControl>
				<FormMessage>{getErrorMessage(errors.isRider)}</FormMessage>
			</FormItem>

			<FormItem>
				<FormLabel>{t('pagerNumber')}</FormLabel>
				<FormControl>
					<Controller
						name="pagerNumber"
						control={control}
						render={({field}) => (
							<Input {...field} placeholder="Pager Number" type="number" />
						)}
					/>
				</FormControl>
				<FormMessage>{getErrorMessage(errors.pagerNumber)}</FormMessage>
			</FormItem>
		</>
	);
};

export default PersonForm;
