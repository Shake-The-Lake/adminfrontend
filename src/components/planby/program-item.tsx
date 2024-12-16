import React from 'react';
import {
	ProgramBox,
	ProgramContent,
	ProgramFlex,
	ProgramStack,
	ProgramText,
	ProgramTitle,
	useProgram,
} from 'planby';
import { Link } from 'react-router-dom';
import { toSwissLocaleTimeString } from '../../lib/date-time.utils';
import { useTranslation } from 'react-i18next';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '../ui/hover-card';


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
			className="relative">
			<HoverCard>
				<HoverCardTrigger asChild>
					<ProgramContent
						width={styles.width}
						isLive={isLive}
						className={disable ? '!cursor-default' : 'cursor-pointer'}
						style={{background: color}}>
						<ProgramFlex>
							<ProgramStack className="w-full">
								{disable ? null : (
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
									<ProgramText>{` R: ${data.seatsRider} / V: ${data.seatsViewer}`}</ProgramText>
								</div>
							</ProgramStack>
						</ProgramFlex>
					</ProgramContent>
				</HoverCardTrigger>
				<HoverCardContent className="p-4 bg-white shadow-md rounded-md">
					<h4 className="font-semibold mb-2">{title}</h4>
					<p>
						{t('from')}: {sinceTime} <br />
						{t('to')}: {tillTime}
					</p>
					<p>
						{t('riderSeats')}: {data.seatsRider} <br />
						{t('viewerSeats')}: {data.seatsViewer}
					</p>
				</HoverCardContent>
			</HoverCard>
		</ProgramBox>
	);
};
