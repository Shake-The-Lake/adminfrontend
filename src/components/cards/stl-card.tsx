import React from 'react';
import {ArrowRight, Trash} from 'lucide-react';
import {Link} from 'react-router-dom';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card';
import {Button} from '../ui/button';
import {type UseMutationResult} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';

export type StlCardProps = {
	id?: number;
	title?: string;
	description?: string;
	link: string;
	deleteMutation: UseMutationResult<any, Error, number>; // First any is return type, second is input
	maxDescriptionLength?: number; // Add this optional prop for max description length
};

const StlCard: React.FC<StlCardProps> = (props) => {
	const {t} = useTranslation();

	const handleDelete = async () => {
		props.deleteMutation.mutate(props.id ?? 0);
	};

	// Truncate the description if it exceeds the maxDescriptionLength
	const truncateDescription = (
		description: string,
		maxLength: number,
	): string => {
		if (description.length > maxLength) {
			return description.slice(0, maxLength) + '...';
		}
		return description;
	};

	return (
		<Card className="relative w-full max-w-full h-40 hover:bg-slate-50 overflow-hidden">
			<div className="absolute top-2 right-2 flex space-x-2">
				<Button
					variant="ghost"
					size="icon"
					className="items-center"
					onClick={handleDelete}
					title={t('delete')}
					aria-label={t('delete')}
					data-testid="trash-button">
					<Trash className="cursor-pointer hover:text-red-600 z-20 hover:bg-transparent" />
				</Button>
			</div>
			<CardHeader className="flex justify-start items-start">
				<CardTitle>{props.title}</CardTitle>
			</CardHeader>
			<CardContent className="relative">
				<CardDescription>
					{props.description
						? truncateDescription(
								props.description,
								props.maxDescriptionLength || 200,
							)
						: ''}
				</CardDescription>
			</CardContent>
			<Link
				to={props.link}
				data-testid="arrow-right-icon"
				className="after:absolute after:inset-0 after:hover:cursor-pointer after:focus-visible::outline after:focus-visible::outline-2">
				<ArrowRight className="bottom-4 right-4 absolute" />
			</Link>
		</Card>
	);
};

export default StlCard;
