import * as React from 'react';

import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {cn} from '../../lib/utils';
import ShakeTheLakeIcon from '../icons/shake-the-lake-icon';

const HeaderLogo: React.FC = (hasBorderBottom = false) => {
	const {t} = useTranslation();

	return (
		<div
			className={cn(
				'flex h-14 items-center px-4 lg:h-[var(--header-height)] lg:px-6',
				hasBorderBottom ? 'border-b' : '',
			)}>
			<Link to="/" className="flex items-center gap-2 font-semibold">
				<ShakeTheLakeIcon className="mr-2 h-10 w-10 text-primary" />
				<span className="heading-s-upper text-primary">
					{t('shakeTheLake')}
				</span>
			</Link>
		</div>
	);
};

export default HeaderLogo;
