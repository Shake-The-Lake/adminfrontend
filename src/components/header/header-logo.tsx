import * as React from 'react';

import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {cn} from '../../lib/utils';
import {iconPaths} from '../../constants';

const HeaderLogo: React.FC = (hasBorderBottom = false) => {
	const {t} = useTranslation();

	return (
		<div
			className={cn(
				'flex h-14 items-center px-4 lg:h-[var(--header-height)] lg:px-6',
				hasBorderBottom ? 'border-b' : '',
			)}>
			<Link to="/" className="flex items-center gap-2 font-semibold">
				<img
					src={iconPaths.shakeTheLake}
					alt={t('shakeTheLake')}
					className="mr-2 h-10 w-10 text-primary"
				/>
				<span className="heading-xs text-primary">{t('shakeTheLake')}</span>
			</Link>
		</div>
	);
};

export default HeaderLogo;
