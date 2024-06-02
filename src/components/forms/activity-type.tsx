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
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {Tabs, TabsList, TabsTrigger, TabsContent} from '../ui/tabs';
import {type ActivityTypeDto} from '../../models/api/activity-type.model';
import {type LocalizedStringDto} from '../../models/api/localized-string';
import {useParams} from 'react-router-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {useTranslation} from 'react-i18next';

const localizedStringSchema = z.object({
	en: z.string().optional(),
	de: z.string(),
	swissGerman: z.string().optional(),
});

const activityTypeSchema = z.object({
	id: z.number().optional(),
	name: z.object({
		en: z.string().min(5).max(20),
		de: z.string().min(5).max(20),
		swissGerman: z.string().min(5).max(20).optional(),
	}),
	description: localizedStringSchema,
	checklist: localizedStringSchema,
	icon: z.string(),
	eventId: z.number().optional(),
});

export type ActivityTypeFormSchema = z.infer<typeof activityTypeSchema>;

type ActivityTypeFormProps = {
	onSubmit: (dto: ActivityTypeDto) => Promise<boolean>; // True if successfully saved
	model: ActivityTypeDto;
};

const ActivityTypeForm: React.FC<ActivityTypeFormProps> = ({
	model,
	onSubmit,
}) => {
	const form = useForm<ActivityTypeFormSchema>({
		mode: 'onChange',
		defaultValues: model,
		resolver: zodResolver(activityTypeSchema),
	});

	const {i18n} = useTranslation();
	const {id} = useParams<{id: string}>();
	const eventId = Number(id);

	const onPrepareSubmit: SubmitHandler<ActivityTypeFormSchema> = async (
		values,
	) => {
		const activityType: ActivityTypeDto = {
			...values,
			id: values.id ?? 0,
			name: values.name as LocalizedStringDto,
			description: values.description as LocalizedStringDto,
			checklist: values.checklist as LocalizedStringDto,
			eventId: model.eventId ?? eventId,
		};

		return onSubmit(activityType);
	};

	return (
		<Form {...form}>
			<form
				className="p-1 space-y-4"
				onSubmit={form.handleSubmit(onPrepareSubmit)}>
				<Tabs defaultValue={i18n.language} className="w-[400px]">
					<TabsList>
						<TabsTrigger value="en">English</TabsTrigger>
						<TabsTrigger value="de">German</TabsTrigger>
						<TabsTrigger value="gsw">Swiss German</TabsTrigger>
					</TabsList>
					<TabsContent value="en">
						<p className="text-primary-dark-stroke mb-2 mt-2">
							Enter English content and content that does not belong to a
							specific language here.
						</p>
						<div>
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
											<Input
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
											<Input placeholder="Icon" {...field} className="input" />
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
											<Input
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
						<div>
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
											<Input
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
											<Input placeholder="Icon" {...field} className="input" />
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
											<Input
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
							Not yet implemented :)
						</p>
					</TabsContent>
				</Tabs>
				<Button type="submit" style={{display: 'none'}} />
			</form>
		</Form>
	);
};

export default ActivityTypeForm;
