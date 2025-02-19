import React, {useState} from 'react';
import {z} from 'zod';
import {
	type SubmitErrorHandler,
	type SubmitHandler,
	useForm,
} from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '../ui/tabs';
import {type ActivityTypeDto} from '../../models/api/activity-type.model';
import {defaultLocalizedStringDto} from '../../models/api/localized-string';
import {useParams} from 'react-router-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslation} from 'react-i18next';
import {Textarea} from '../ui/textarea';
import {onInvalidFormHandler, useEmitSuccessIfSucceeded} from '../../lib/utils';
import {type UseMutationResult} from '@tanstack/react-query';
import {useMutationToaster} from '../common/mutation-toaster';
import PageTransitionFadeIn from '../animations/page-transition-fade-in';

const requiredLocalizedStringSchema = z.object({
	en: z.string().optional(),
	de: z.string().min(1),
	swissGerman: z.string().optional(),
});

const localizedStringSchema = z.object({
	en: z.string().optional(),
	de: z.string(),
	swissGerman: z.string().optional(),
});

const activityTypeSchema = z.object({
	id: z.number().min(0).optional(),
	name: requiredLocalizedStringSchema,
	description: localizedStringSchema,
	checklist: localizedStringSchema,
	icon: z.string(), // Icon is currently not used, therefore we hide it in the form below
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

	const {t} = useTranslation();
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const [tabWithErrors, setTabWithErrors] = useState<string[]>([]);

	useEmitSuccessIfSucceeded(onSuccessfullySubmitted, mutation);

	useMutationToaster({type: isCreate ? 'create' : 'update', mutation});

	const onSubmit: SubmitHandler<ActivityTypeFormSchema> = async (values) => {
		setTabWithErrors([]);

		const activityType: ActivityTypeDto = {
			...values,
			id: values.id ?? 0,
			eventId: model.eventId === 0 ? eventId : model.eventId,
			// Avoid null values on localized strings
			name: {...defaultLocalizedStringDto, ...values.name},
			description: {...defaultLocalizedStringDto, ...values.description},
			checklist: {...defaultLocalizedStringDto, ...values.checklist},
		};

		await mutation.mutateAsync(activityType);
	};

	const onInvalid: SubmitErrorHandler<ActivityTypeFormSchema> = (errors) => {
		// Wish of customer not in release 1
		// Const englishErrors =
		// 	errors.name?.en ?? errors.description?.en ?? errors.checklist?.en;
		const germanErrors =
			errors.name?.de ?? errors.description?.de ?? errors.checklist?.de;
		// Wish of customer not in release 1
		// Const swissGermanErrors =
		// 	errors.name?.swissGerman ??
		// 	errors.description?.swissGerman ??
		// 	errors.checklist?.swissGerman;

		const errorLanguages = [
			// EnglishErrors ? 'en' : '',
			germanErrors ? 'de' : '',
			// SwissGermanErrors ? 'gsw' : '',
		];

		setTabWithErrors(errorLanguages);

		onInvalidFormHandler.call(this, errors);
	};

	// Only the german tab will be displayed due to Wish of customer not in release 1, the tab selection is hidden with the .hidden tailwind class instead of removing it completely
	return (
		<Form {...form}>
			<form
				className="p-1 space-y-4 w-full"
				id="activityType"
				role="form"
				onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
				{/* <Tabs defaultValue={i18n.language}> - Wish of customer not in release 1, therefore always german */}
				<Tabs defaultValue="de">
					<TabsList className="w-full hidden justify-start gap-1">
						<TabsTrigger
							value="en"
							className={
								tabWithErrors.includes('en') ? 'text-destructive' : ''
							}>
							{t('langSwitcher.english')}
						</TabsTrigger>
						<TabsTrigger
							value="de"
							className={
								tabWithErrors.includes('de') ? 'text-destructive' : ''
							}>
							{t('langSwitcher.german')}
						</TabsTrigger>
						<TabsTrigger
							value="gsw"
							className={
								tabWithErrors.includes('gsw') ? 'text-destructive' : ''
							}>
							{t('langSwitcher.swissGerman')}
						</TabsTrigger>
					</TabsList>
					<TabsContent value="en">
						<PageTransitionFadeIn>
							<p className="text-primary-dark-stroke mb-2 mt-2 hidden">
								{t('activityType.infoText')}
							</p>
							<div className="space-y-4">
								<FormField
									name="name.en"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>{t('name')}</FormLabel>
											<FormControl>
												<Input
													placeholder={t('activityType.nameEnglish')}
													{...field}
													className="input"
													data-testid="activityType.name"
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
											<FormLabel>{t('description')}</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t('activityType.descEnglish')}
													{...field}
													className="input"
													data-testid="activityType.description"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="icon"
									control={form.control}
									render={({field}) => (
										<FormItem className="hidden">
											<FormLabel>{t('icon')}</FormLabel>
											<FormControl>
												<Input
													placeholder={t('icon')}
													{...field}
													className="input"
													data-testid="activityType.icon"
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
											<FormLabel>{t('checklist')}</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t('activityType.checklistEnglish')}
													{...field}
													className="input"
													data-testid="activityType.checklist"
												/>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t('activityType.checklistDescription')}
											</FormDescription>
										</FormItem>
									)}></FormField>
							</div>
						</PageTransitionFadeIn>
					</TabsContent>
					<TabsContent value="de">
						<PageTransitionFadeIn>
							<p className="text-primary-dark-stroke mb-2 mt-2 hidden">
								{t('activityType.descriptionGerman')}
							</p>
							<div className="space-y-4">
								<FormField
									name="name.de"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>{t('name')}</FormLabel>
											<FormControl>
												<Input
													placeholder={t('activityType.nameGerman')}
													{...field}
													className="input"
													data-testid="activityType.name"
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
											<FormLabel>{t('description')}</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t('activityType.descGerman')}
													{...field}
													className="input"
													data-testid="activityType.description"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="icon"
									control={form.control}
									render={({field}) => (
										<FormItem className="hidden">
											<FormLabel>{t('icon')}</FormLabel>
											<FormControl>
												<Input
													placeholder={t('icon')}
													{...field}
													className="input"
													data-testid="activityType.icon"
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
											<FormLabel>{t('checklist')}</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t('activityType.checklistGerman')}
													{...field}
													className="input"
													data-testid="activityType.checklist"
												/>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t('activityType.checklistDescription')}
											</FormDescription>
										</FormItem>
									)}></FormField>
							</div>
						</PageTransitionFadeIn>
					</TabsContent>
					<TabsContent value="gsw">
						<PageTransitionFadeIn>
							<p className="text-primary-dark-stroke mb-2 mt-2">
								{t('activityType.descriptionSwissGerman')}
							</p>
							<div className="space-y-4">
								<FormField
									name="name.swissGerman"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>{t('name')}</FormLabel>
											<FormControl>
												<Input
													placeholder={t('activityType.nameSwissGerman')}
													{...field}
													className="input"
													data-testid="activityType.name"
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
											<FormLabel>{t('description')}</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t('activityType.descSwissGerman')}
													{...field}
													className="input"
													data-testid="activityType.description"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
								<FormField
									name="icon"
									control={form.control}
									render={({field}) => (
										<FormItem className="hidden">
											<FormLabel>{t('icon')}</FormLabel>
											<FormControl>
												<Input
													placeholder={t('icon')}
													{...field}
													className="input"
													data-testid="activityType.icon"
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
											<FormLabel>
												{t('activityType.checklistSwissGerman')}
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder={t('activityType.checklistSwissGerman')}
													{...field}
													className="input"
													data-testid="activityType.checklist"
												/>
											</FormControl>
											<FormMessage />
											<FormDescription>
												{t('activityType.checklistDescription')}
											</FormDescription>
										</FormItem>
									)}></FormField>
							</div>
						</PageTransitionFadeIn>
					</TabsContent>
				</Tabs>
				<div
					className="mt-16 flex justify-end w-full"
					data-testid="activityType.submit"
					style={isCreate ? {display: 'none'} : {}}>
					<Button type="submit">{t('save')}</Button>
				</div>
			</form>
		</Form>
	);
};

export default ActivityTypeForm;
