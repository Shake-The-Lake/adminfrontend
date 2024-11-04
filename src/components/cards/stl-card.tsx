import React from 'react';
import { ArrowRight, Trash } from 'lucide-react';

import { Link } from 'react-router-dom';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { type UseMutationResult } from '@tanstack/react-query';

export type StlCardProps = {
	id?: number;
	title?: string;
	description?: string;
	link: string;
	deleteMutation: UseMutationResult<any, Error, number>; // First any is return type, second is input
};

const StlCard: React.FC<StlCardProps> = (props) => {

	const handleDelete = async () => {
		props.deleteMutation.mutate(props.id ?? 0);
	};

	return (
		<Card className="relative w-full max-w-full h-40 hover:bg-slate-50">
			<div className="absolute top-2 right-2 flex space-x-2">
				<Button
					variant="ghost"
					size="icon"
					className="items-center"
					onClick={handleDelete}
					data-testid="trash-button">
					<Trash className="cursor-pointer hover:text-red-600 z-20 hover:bg-transparent" />
				</Button>
			</div>
			<CardHeader className="flex justify-start items-start">
				<CardTitle>{props.title}</CardTitle>
			</CardHeader>
			<CardContent className="relative">
				<CardDescription>{props.description}</CardDescription>
			</CardContent>
			<Link to={props.link}
				data-testid="arrow-right-icon"
				className="after:absolute after:inset-0 after:hover:cursor-pointer after:focus-visible::outline after:focus-visible::outline-2">
				<ArrowRight className='bottom-4 right-4 absolute' />
			</Link>
		</Card>
	);
};

export default StlCard;
