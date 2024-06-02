import React from 'react';
import LanguageSelector from './language-selector';
import {iconPaths} from '../../constants';

const Footer: React.FC = () => (
	<div className="w-full bg-primary flex items-center justify-between px-6 py-1 md:py-2 h-10 md:h-12 lg:h-14 pt text-white">
		<img src={iconPaths.tiAndM} alt="ti&m Logo" className="mr-2 p-1 h-full" />
		<LanguageSelector />
	</div>
);

export default Footer;
