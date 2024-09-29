import React from 'react';
import {Controller} from 'react-hook-form';
import {FormControl, FormItem, FormLabel, FormMessage} from '../ui/form';
import {Input} from '../ui/input';
import StlSelect from '../select/stl-select';

type PersonFormProps = {
	control: any;
	errors: any;
};

const PersonForm: React.FC<PersonFormProps> = ({control, errors}) => {
	return (
		<>
			<FormItem>
				<FormLabel>First Name</FormLabel>
				<FormControl>
					<Controller
						name="firstName"
						control={control}
						render={({field}) => <Input {...field} placeholder="First Name" />}
					/>
				</FormControl>
				{errors.firstName && (
					<FormMessage>{errors.firstName.message}</FormMessage>
				)}
			</FormItem>

			<FormItem>
				<FormLabel>Last Name</FormLabel>
				<FormControl>
					<Controller
						name="lastName"
						control={control}
						render={({field}) => <Input {...field} placeholder="Last Name" />}
					/>
				</FormControl>
				{errors.lastName && (
					<FormMessage>{errors.lastName.message}</FormMessage>
				)}
			</FormItem>

			<FormItem>
				<FormLabel>Email</FormLabel>
				<FormControl>
					<Controller
						name="emailAddress"
						control={control}
						render={({field}) => (
							<Input {...field} placeholder="Email Address" type="email" />
						)}
					/>
				</FormControl>
				{errors.emailAddress && (
					<FormMessage>{errors.emailAddress.message}</FormMessage>
				)}
			</FormItem>

			<FormItem>
				<FormLabel>Phone Number</FormLabel>
				<FormControl>
					<Controller
						name="phoneNumber"
						control={control}
						render={({field}) => (
							<Input {...field} placeholder="Phone Number" type="tel" />
						)}
					/>
				</FormControl>
				{errors.phoneNumber && (
					<FormMessage>{errors.phoneNumber.message}</FormMessage>
				)}
			</FormItem>

			<FormItem>
				<FormLabel>Person Type</FormLabel>
				<FormControl>
					<Controller
						name="personType"
						control={control}
						render={({field}) => (
							<StlSelect
								value={field.value}
								onValueChange={field.onChange}
								list={[
									{key: 'EMPLOYEE', label: 'Employee'},
									{key: 'BOAT_DRIVER', label: 'Boat Driver'},
									{key: 'CUSTOMER', label: 'Customer'},
								]}
								getKey={(item) => item?.key}
								getLabel={(item) => item?.label ?? ''}
							/>
						)}
					/>
				</FormControl>
				{errors.personType && (
					<FormMessage>{errors.personType.message}</FormMessage>
				)}
			</FormItem>

			<FormItem>
				<FormLabel>Is Rider?</FormLabel>
				<FormControl>
					<Controller
						name="isRider"
						control={control}
						render={({field}) => (
							<StlSelect
								value={field.value ? 'true' : 'false'}
								onValueChange={(value) => field.onChange(value === 'true')}
								list={[
									{key: 'true', label: 'Yes'},
									{key: 'false', label: 'No'},
								]}
								getKey={(item) => item!.key}
								getLabel={(item) => item!.label}
							/>
						)}
					/>
				</FormControl>
				{errors.isRider && <FormMessage>{errors.isRider.message}</FormMessage>}
			</FormItem>

			<FormItem>
				<FormLabel>Pager Number</FormLabel>
				<FormControl>
					<Controller
						name="pagerNumber"
						control={control}
						render={({field}) => (
							<Input
								{...field}
								placeholder="Pager Number"
								type="number"
								min={0}
							/>
						)}
					/>
				</FormControl>
				{errors.pagerNumber && (
					<FormMessage>{errors.pagerNumber.message}</FormMessage>
				)}
			</FormItem>
		</>
	);
};

export default PersonForm;
