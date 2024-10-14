/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {
	ProgramBox,
	ProgramContent,
	ProgramFlex,
	ProgramStack,
	ProgramTitle,
	ProgramText,
	useProgram,
} from 'planby';
import {Link} from 'react-router-dom';
import {toSwissLocaleTimeString} from '../../lib/date-time.utils';

export type PlanByProgramItemProps = {
	program: any;
	isRTL?: boolean;
	isBaseTimeFormat?: boolean;
	minWidth?: number;
};

export const ProgramItem: React.FC<PlanByProgramItemProps> = (props) => {
	const {styles, isLive} = useProgram({
		...props,
		isBaseTimeFormat: props.isBaseTimeFormat ?? true,
	});

	const {data} = props.program;
	const {title, description, since, till, color} = data;

	const sinceTime = toSwissLocaleTimeString(new Date(since));
	const tillTime = toSwissLocaleTimeString(new Date(till));

	return (
		<ProgramBox
			width={styles.width}
			style={styles.position}
			className="relative">
			<ProgramContent
				width={styles.width}
				isLive={isLive}
				style={{background: color}}>
				<ProgramFlex>
					<ProgramStack className="w-full">
						<Link
							to={`${data.id}`}
							className="after:absolute after:inset-0"></Link>
						<ProgramTitle>{title}</ProgramTitle>
						<div className="flex justify-between w-full">
							<ProgramText>
								{sinceTime} - {tillTime}
							</ProgramText>
							<ProgramText>{description}</ProgramText>
						</div>
					</ProgramStack>
				</ProgramFlex>
			</ProgramContent>
		</ProgramBox>
	);
};
