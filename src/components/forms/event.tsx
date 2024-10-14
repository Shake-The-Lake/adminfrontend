import React from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from '../ui/form';
import {Input} from '../ui/input';
import {type EventDto} from '../../models/api/event.model';
import {zodResolver} from '@hookform/resolvers/zod';
import {onInvalidFormHandler} from '../../lib/utils';
import {type UseMutationResult} from '@tanstack/react-query';
import {MutationToaster} from '../common/mutation-toaster';
import {Button} from '../ui/button';
import {validateDate} from '../../lib/date-time.utils';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';

// Schema definition
export const eventFormSchema = z.object({
	title: z.string().min(5).max(20),
	description: z.string(),
	date: z
		.string()
		.refine((val) => validateDate(val), {
			message: t('messages.validationMessageDateFormat'),
		})
		.transform((val) => new Date(val)),
});

export type EventFormSchema = z.infer<typeof eventFormSchema>;

type EventFormProps = {
	model: EventDto;
	mutation: UseMutationResult<any, Error, EventDto>; // First any is return type, second is input
	isCreate: boolean;
};

const EventForm: React.FC<EventFormProps> = ({model, mutation, isCreate}) => {
	const form = useForm<EventFormSchema>({
		mode: 'onChange',
		defaultValues: {
			title: model.title,
			description: model.description,
			date: model.date,
		},
		resolver: zodResolver(eventFormSchema),
	});
	const {t} = useTranslation();

	const onSubmit: SubmitHandler<EventFormSchema> = async (values) => {
		const event: EventDto = {
			...model,
			...values,
			title: values.title,
			date: values.date,
		};

		await mutation.mutateAsync(event);
	};

	return (
		<>
			<MutationToaster
				type={isCreate ? 'create' : 'update'}
				mutation={mutation}
			/>
			<Form {...form}>
				<form
					className="p-1 space-y-4"
					onSubmit={form.handleSubmit(onSubmit, onInvalidFormHandler)}
					id="event">
					<FormField
						name="title"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>{t('title')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('event.placeholder')}
										{...field}
										className="input"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="description"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>{t('description')}</FormLabel>
								<FormControl>
									<Input
										placeholder={t('description')}
										{...field}
										className="input"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						name="date"
						control={form.control}
						render={({field}) => (
							<FormItem>
								<FormLabel>{t('event.date')}</FormLabel>
								<FormControl>
									<Input type="date" {...field} className="input" />
								</FormControl>
							</FormItem>
						)}
					/>

					<div
						className="mt-16 flex justify-end w-full"
						style={isCreate ? {display: 'none'} : {}}>
						<Button type="submit">{t('save')}</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default EventForm;
