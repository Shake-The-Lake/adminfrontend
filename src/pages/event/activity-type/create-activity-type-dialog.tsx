import React, {useRef, useState} from 'react';
import {type SubmitHandler, useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate, useParams} from 'react-router-dom';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../components/ui/form';
import {Input} from '../../../components/ui/input';
import {Button} from '../../../components/ui/button';
import {
	DialogHeader,
	DialogFooter,
	DialogClose,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '../../../components/ui/dialog';
import {type ActivityTypeDto} from '../../../models/api/activity-type.model';
import {createActivityType, getAllActivityTypes} from '../../../services/activity-type-serivce';
import {Plus} from 'lucide-react';
import {changeLanguage} from 'i18next';
import {type LocalizedStringDto} from '../../../models/api/localized-string';

const formSchema = z.object({
	titleDe: z.string().min(5).max(20),
	titleEn: z.string().min(5).max(20), 
	descriptionDe: z.string(),
	descriptionEn: z.string(),
	icon: z.string(),
	checklistDe: z.string(),
	checklistEn: z.string(),
});
export type StlActivityTypeProps = {
	isActivityTypeDialogOpen: boolean;
	openActivityTypeDialog: () => void;
	closeActivityTypeDialog: () => void;
	currentActivityType?: ActivityTypeDto;
	setActivityType: (activityType: ActivityTypeDto[]) => void;
};
const ActiveTypeDialog: React.FC<StlActivityTypeProps> = (props) => {
	const [currentLanguage, setCurrentLanguage] = useState('de');
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
		// TODO update the values when the form is opened with the current activity type
		// defaultValues: {
		// 	titleDe: props.currentActivityType?.name?.de ?? '',
		// 	titleEn: props.currentActivityType?.name?.en ?? '',
		// 	descriptionDe: props.currentActivityType?.description?.de ?? '',
		// 	descriptionEn: props.currentActivityType?.description?.en ?? '',
		// 	icon: props.currentActivityType?.icon ?? '',
		// 	checklistDe: props.currentActivityType?.checklist?.de ?? '',
		// 	checklistEn: props.currentActivityType?.checklist?.en ?? '',
		// },
	});
	const {id} = useParams<{eventId: string}>();
	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (values) => {
		// TODO sync for design/prototyp update: how to implement further form inputs for location properties
		const description: LocalizedStringDto = {
			de: values.descriptionDe,
			en: values.descriptionEn,
			swissGerman: '',
		};
		const name: LocalizedStringDto = {
			de: values.titleDe,
			en: values.titleEn,
			swissGerman: '',
		};
		const checklist: LocalizedStringDto = {
			de: values.checklistDe,
			en: values.checklistEn,
			swissGerman: '',
		};
		const activeType: ActivityTypeDto = {
			name,
			description,
			icon: values.icon,
			checklist,
			eventId: Number(id),
		};
		try {
			await createActivityType(activeType);
			props.closeActivityTypeDialog();
			const newActivityTypeList: ActivityTypeDto[] = await getAllActivityTypes();
			setActivityType(newActivityTypeList);
		} catch (error) {
			console.error('Failed to active type event:', error);
		}
	};

	return (
		<Dialog open={props.isActivityTypeDialogOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Create Active Type</DialogTitle>
					<DialogDescription>
						Parts of this entity will eventually be displayed to the end user, therefore certain fields need to be filled out in multiple languages. Simply change the tab to edit another language.
					</DialogDescription>
				</DialogHeader>
				<div className="grow-0 overflow-auto min-h-32">
					<Form {...form}>
						<form className="p-1">
							<div className="bg-primary-stroke rounded-lg p-1 mb-1">
								<Button 
									type="button"
									className={`hover:bg-primary-dark-stroke transition-colors duration-300 text-primary-blue-dark ${currentLanguage === 'en' ? 'bg-white' : 'bg-primary-stroke'}`} 
									onClick={async () => {
										const isValid = await form.trigger(['checklistDe', 'descriptionDe', 'titleDe']);
										if (isValid) {
											setCurrentLanguage('en'); 
										}
									}}
								>English</Button>
								<Button 
									type="button"
									className={`hover:bg-primary-dark-stroke transition-colors duration-300 text-primary-blue-dark ${currentLanguage === 'de' ? 'bg-white' : 'bg-primary-stroke'}`} 
									onClick={async () => {
										const isValid = await form.trigger(['checklistEn', 'descriptionEn', 'titleEn']);
										if (isValid) {
											setCurrentLanguage('de');
										}
									}}
								>German</Button>
							</div>
							<p className="text-primary-dark-stroke mb-2 mt-2">Enter English content and content that does not belong to a specific language here.</p>
							<div							
								className={`${currentLanguage === 'en' ? '' : 'hidden'}`} ><FormField
									name="titleEn"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Title En</FormLabel>
											<FormControl>
												<Input
													placeholder="Title in English"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
							</div>
							<div							
								className={`${currentLanguage === 'de' ? '' : 'hidden'}`} >
								<FormField
									name="titleDe"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Title De</FormLabel>
											<FormControl>
												<Input
													placeholder="Title in German"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
							</div>
							<div							
								className={`${currentLanguage === 'en' ? '' : 'hidden'}`} >
								<FormField
									name="descriptionEn"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Description En</FormLabel>
											<FormControl>
												<Input
													placeholder="Title in English"
													{...field}
													className="input"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}></FormField>
							</div>
							<div							
								className={`${currentLanguage === 'de' ? '' : 'hidden'}`} >
								<FormField
									name="descriptionDe"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Description de</FormLabel>
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
							</div>
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
							<div							
								className={`${currentLanguage === 'en' ? '' : 'hidden'}`} >
								<FormField
									name="checklistEn"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Checklist En</FormLabel>
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
								
							<div							
								className={`${currentLanguage === 'de' ? '' : 'hidden'}`} >
								<FormField
									name="checklistDe"
									control={form.control}
									render={({field}) => (
										<FormItem>
											<FormLabel>Checklist De</FormLabel>
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
						</form>
					</Form>
				</div>
				<DialogFooter className="justify-end items-end">
					<DialogClose asChild>
						<Button type="button" variant="secondary"
							onClick={()=> {
								props.closeActivityTypeDialog();
							}}>
							Cancel
						</Button>
					</DialogClose>
					<Button
						type="button"
						onClick={async ()=> {
							await form.handleSubmit(onSubmit)();
						}}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ActiveTypeDialog;
