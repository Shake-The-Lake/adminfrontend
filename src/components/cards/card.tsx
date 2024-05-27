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

export type StlCardProps = {
	id?: number;
	title?: string;
	description?: string;
	handleEdit: (id?: number) => Promise<void>;
	handleDelete: (id?: number) => Promise<boolean>;
};

const StlCard: React.FC<StlCardProps> = (props) => {
	const handleEdit = async () => {
		await props.handleEdit(props.id);
	};

	const handleDelete = async () => {
		await props.handleDelete(props.id);
	};

	return (
		<Card className="relative w-full max-w-full h-40">
			<div className="absolute top-2 right-2 flex space-x-2">
				<Button variant="ghost" size="icon" className="items-center" onClick={handleDelete}>
					<Trash className="cursor-pointer hover:text-red-600" />
				</Button>
			</div>
			<CardHeader className="flex justify-start items-start">
				<CardTitle>{props.title}</CardTitle>
			</CardHeader>
			<CardContent className="relative">
				<CardDescription>{props.description}</CardDescription>
			</CardContent>
			<Button variant="ghost" className="absolute bottom-0 right-0 mb-2 mr-2" size="icon" onClick={handleEdit}>
				<ArrowRight />
			</Button>
		</Card>
	);
};

export default StlCard;
