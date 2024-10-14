import * as React from 'react';

import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import ShakeTheLakeIcon from '../icons/shake-the-lake-icon';
type HeaderLogoProps = {
	hasLink?: boolean;
};
const HeaderLogo: React.FC<HeaderLogoProps> = ({hasLink = true}) => {
	const {t} = useTranslation();

	return (
		<div className="flex h-14 items-center px-4 lg:h-[var(--header-height)] lg:px-6">
			<Link
				to="/"
				style={hasLink ? undefined : {pointerEvents: 'none'}}
				className="flex items-center gap-2 font-semibold">
				<ShakeTheLakeIcon className="mr-2 h-10 w-10 text-primary" />
				<span className="heading-s-upper text-primary">
					{t('shakeTheLake')}
				</span>
			</Link>
		</div>
	);
};

export default HeaderLogo;
