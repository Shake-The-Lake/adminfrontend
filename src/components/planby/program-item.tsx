/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import {ProgramBox, ProgramContent, ProgramFlex, ProgramStack, ProgramText, ProgramTitle, useProgram} from 'planby';
import {Link} from 'react-router-dom';
import {toSwissLocaleTimeString} from '../../lib/date-time.utils';
import {useTranslation} from 'react-i18next';

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

	const {t} = useTranslation();

	const {data} = props.program;
	const {title, since, till, color, disable} = data;

	const sinceTime = toSwissLocaleTimeString(new Date(since));
	const tillTime = toSwissLocaleTimeString(new Date(till));

	return (
		<ProgramBox
			width={styles.width}
			style={styles.position}
			className={'relative'}>
			<ProgramContent
				width={styles.width}
				isLive={isLive}
				className={disable ? '!cursor-default' : 'cursor-pointer'}
				style={{background: color}}>
				<ProgramFlex>
					<ProgramStack className={'w-full'}>
						{!disable && (
							<Link
								to={`${data.id}`}
								className="after:absolute after:inset-0"
							/>
						)}
						<ProgramTitle>{title}</ProgramTitle>
						<div className="flex justify-between w-full">
							<ProgramText>
								{sinceTime} - {tillTime}
							</ProgramText>
							<ProgramText>{` R: ${data.availableRiderSeats} / V: ${data.availableViewerSeats}`}</ProgramText>
						</div>
					</ProgramStack>
				</ProgramFlex>
			</ProgramContent>
		</ProgramBox>
	);
};
