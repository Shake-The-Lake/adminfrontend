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

export const ProgramItem = ({program, ...rest}) => {
	const {styles, formatTime, set12HoursTimeFormat, isLive} = useProgram({
		program,
		...rest,
	});

	const {data} = program;
	const {title, since, till, color} = data;

	const sinceTime = formatTime(since, set12HoursTimeFormat()).toLowerCase();
	const tillTime = formatTime(till, set12HoursTimeFormat()).toLowerCase();

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
					<ProgramStack>
						<Link
							to={`${data.id}`}
							className="after:absolute after:inset-0"></Link>
						<ProgramTitle>{title}</ProgramTitle>
						<ProgramText>
							{sinceTime} - {tillTime}
						</ProgramText>
					</ProgramStack>
				</ProgramFlex>
			</ProgramContent>
		</ProgramBox>
	);
};
