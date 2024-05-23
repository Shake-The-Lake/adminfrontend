import React from 'react';
import {ArrowRight, Trash} from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {useNavigate} from 'react-router-dom';
import {Button} from '../ui/button';

export type StlCardProps = {
	id: number;
	title: string;
	description?: string;
	path: string;
	handleDelete: (id: number) => Promise<void>;
};

const StlCard: React.FC<StlCardProps> = (props) => {
	const navigate = useNavigate();
	const handleNavigate = () => {
		navigate(props.path);
	};

	const handleDelete = async () => {
		await props.handleDelete(props.id);
	};

	return (
		<Card className="relative w-full max-w-full">
			<div className="absolute top-2 right-2 flex space-x-2">
				<Button variant="ghost" size="icon" onClick={handleDelete}>
					<Trash className="cursor-pointer mt-2 mr-2 hover:text-red-600" />
				</Button>
			</div>
			<CardHeader className="flex justify-start items-start">
				<CardTitle>{props.title}</CardTitle>
			</CardHeader>
			<CardContent className="relative">
				<CardDescription>{props.description}</CardDescription>
				<Button variant="ghost" size="icon" onClick={handleNavigate}>
					<ArrowRight className="cursor-pointer absolute bottom-0 right-0 mb-2 mr-2" />
				</Button>
			</CardContent>
		</Card>
	);
};

export default StlCard;
