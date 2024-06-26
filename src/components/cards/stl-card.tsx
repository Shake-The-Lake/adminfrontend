import React from 'react';
import {ArrowRight, Trash} from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {Button} from '../ui/button';
import {useToast} from '../ui/use-toast';

export type StlCardProps = {
	id?: number;
	title?: string;
	description?: string;
	handleEdit: (id?: number) => Promise<void> | void;
	handleDelete: (id?: number) => Promise<boolean | string>;
};

const StlCard: React.FC<StlCardProps> = (props) => {
	const {toast} = useToast();

	const handleEdit = async () => {
		await props.handleEdit(props.id);
	};

	const handleDelete = async () => {
		const success = await props.handleDelete(props.id);
		if (success === true) {
			toast({
				description: 'Successfully deleted.',
			});
		} else if (typeof success === 'string') {
			toast({
				variant: 'destructive',
				title: 'There was an error when deleting.',
				description: success,
			});
		}
	};

	return (
		<Card className="relative w-full max-w-full h-40 hover:bg-slate-50">
			<div className="absolute top-2 right-2 flex space-x-2">
				<Button
					variant="ghost"
					size="icon"
					className="items-center"
					onClick={handleDelete}>
					<Trash className="cursor-pointer hover:text-red-600" />
				</Button>
			</div>
			<CardHeader className="flex justify-start items-start">
				<CardTitle>{props.title}</CardTitle>
			</CardHeader>
			<CardContent className="relative">
				<CardDescription>{props.description}</CardDescription>
			</CardContent>
			<Button
				variant="ghost"
				className="absolute bottom-0 right-0 mb-2 mr-2"
				size="icon"
				onClick={handleEdit}>
				<ArrowRight />
			</Button>
		</Card>
	);
};

export default StlCard;
