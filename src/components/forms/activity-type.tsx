import React, {useState} from 'react';
import {z} from 'zod';
import {
	type SubmitHandler,
	useForm,
	type SubmitErrorHandler,
} from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '../ui/tabs';
import {type ActivityTypeDto} from '../../models/api/activity-type.model';
import {defaultLocalizedStringDto} from '../../models/api/localized-string';
import {useParams} from 'react-router-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslation} from 'react-i18next';
import {Textarea} from '../ui/textarea';
import {onInvalidFormHandler, useEmitSuccessIfSucceeded} from '../../lib/utils';
import {type UseMutationResult} from '@tanstack/react-query';
import {MutationToaster} from '../common/mutation-toaster';

const localizedStringSchema = z.object({
	en: z.string(),
	de: z.string().optional(),
	swissGerman: z.string().optional(),
});

const activityTypeSchema = z.object({
	id: z.number().min(0).optional(),
	name: z.object({
		en: z.string().min(5).max(20),
		de: z.string().max(20).optional(),
		swissGerman: z.string().max(20).optional(),
	}),
	description: localizedStringSchema,
	checklist: localizedStringSchema,
	icon: z.string(),
	eventId: z.number().optional(),
});

export type ActivityTypeFormSchema = z.infer<typeof activityTypeSchema>;

type ActivityTypeFormProps = {
	model: ActivityTypeDto;
	mutation: UseMutationResult<any, Error, ActivityTypeDto>; // First any is return type, second is input
	isCreate: boolean;
	onSuccessfullySubmitted?: () => void; // Method triggers when onSubmit has run successfully (e.g. to close dialog outside)
};

const ActivityTypeForm: React.FC<ActivityTypeFormProps> = ({
	model,
	mutation,
	isCreate,
	onSuccessfullySubmitted,
}) => {
	const form = useForm<ActivityTypeFormSchema>({
		mode: 'onChange',
		defaultValues: model,
		resolver: zodResolver(activityTypeSchema),
	});

	const {i18n} = useTranslation();
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const [tabWithErrors, setTabWithErrors] = useState<string[]>([]);

	useEmitSuccessIfSucceeded(onSuccessfullySubmitted, mutation);

	const onSubmit: SubmitHandler<ActivityTypeFormSchema> = async (values) => {
		setTabWithErrors([]);

		const activityType: ActivityTypeDto = {
			...values,
			id: values.id ?? 0,
			eventId: model.eventId ?? eventId,
			// Avoid null values on localized strings
			name: {...defaultLocalizedStringDto, ...values.name},
			description: {...defaultLocalizedStringDto, ...values.description},
			checklist: {...defaultLocalizedStringDto, ...values.checklist},
		};

		await mutation.mutateAsync(activityType);
	};

	const onInvalid: SubmitErrorHandler<ActivityTypeFormSchema> = (errors) => {
		const englishErrors =
			errors.name?.en ?? errors.description?.en ?? errors.checklist?.en;
		const germanErrors =
			errors.name?.de ?? errors.description?.de ?? errors.checklist?.de;
		const swissGermanErrors =
			errors.name?.swissGerman ??
			errors.description?.swissGerman ??
			errors.checklist?.swissGerman;

		const errorLanguages = [
			englishErrors ? 'en' : '',
			germanErrors ? 'de' : '',
			swissGermanErrors ? 'gsw' : '',
		];

		setTabWithErrors(errorLanguages);

		onInvalidFormHandler.call(this, errors);
	};

	return (
		<>
			<MutationToaster
				type={isCreate ? 'create' : 'update'}
				mutation={mutation}
			/>
			<Form {...form}>
				<form
					className="p-1 space-y-4 w-full"
					id="activityType"
					onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
					<Tabs defaultValue={i18n.language}>
						<TabsList className="w-full justify-start">
							<TabsTrigger
								value="en"
								className={
									tabWithErrors.includes('en') ? 'text-destructive' : ''
								}>
								English
							</TabsTrigger>
							<TabsTrigger
								value="de"
								className={
									tabWithErrors.includes('de') ? 'text-destructive' : ''
								}>
								German
							</TabsTrigger>
							<TabsTrigger
								value="gsw"
								className={
									tabWithErrors.includes('gsw') ? 'text-destructive' : ''
								}>
								Swiss German
							</TabsTrigger>
						</TabsList>
						<TabsContent value="en">
							<p className="text-primary-dark-stroke mb-2 mt-2">
								Enter English content and content that does not belong to a
								specific language here.
							</p>
							<div className="space-y-4">
								<FormField
									name="name.en"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Name in English"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="description.en"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Description in English"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="icon"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<FormControl>
												<Input
													placeholder="Icon"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="checklist.en"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Checklist</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Checklist in English"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
							</div>
						</TabsContent>
						<TabsContent value="de">
							<p className="text-primary-dark-stroke mb-2 mt-2">
								Enter German content and content that does not belong to a
								specific language here.
							</p>
							<div className="space-y-4">
								<FormField
									name="name.de"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Name in German"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="description.de"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Description in German"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="icon"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<FormControl>
												<Input
													placeholder="Icon"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="checklist.de"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Checklist</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Checklist in German"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
							</div>
						</TabsContent>
						<TabsContent value="gsw">
							<p className="text-primary-dark-stroke mb-2 mt-2">
								Enter Swiss German content and content that does not belong to a
								specific language here.
							</p>
							<div className="space-y-4">
								<FormField
									name="name.swissGerman"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Name in Swiss German"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="description.swissGerman"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Description in Swiss German"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="icon"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<FormControl>
												<Input
													placeholder="Icon"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="checklist.swissGerman"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Checklist</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Checklist in Swiss German"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
							</div>
						</TabsContent>
					</Tabs>
					<div
						className="mt-16 flex justify-end w-full"
						style={isCreate ? {display: 'none'} : {}}>
						<Button type="submit">Save Changes</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default ActivityTypeForm;
