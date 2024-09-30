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
import {type UseMutationResult} from '@tanstack/react-query';

export type StlCardProps = {
	id?: number;
	title?: string;
	description?: string;
	onArrowClick: (id?: number) => Promise<void> | void;
	deleteMutation: UseMutationResult<any, Error, number>; // First any is return type, second is input
};

const StlCard: React.FC<StlCardProps> = (props) => {
	const handleEdit = async () => {
		await props.onArrowClick(props.id);
	};

	const handleDelete = async () => {
		props.deleteMutation.mutate(props.id ?? 0);
	};

	return (
		<Card
			className="relative w-full max-w-full h-40 hover:bg-slate-50"
			onClick={handleEdit}>
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
				size="icon">
				<ArrowRight />
			</Button>
		</Card>
	);
};

export default StlCard;
