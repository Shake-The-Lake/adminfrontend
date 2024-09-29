import React, {useEffect, useState} from 'react';
import {Separator} from '../ui/separator';
import {ch, de, en} from '../../constants';
import {ToggleGroup, ToggleGroupItem} from '../ui/toggle-group';
import {useTranslation} from 'react-i18next';

const LanguageSelector: React.FC = () => {
	const {i18n, t} = useTranslation();

	const [language, setLanguage] = useState(
		() => localStorage.getItem('selectedLanguage') ?? en,
	);

	useEffect(() => {
		const changeLanguage = async () => i18n.changeLanguage(language);
		changeLanguage().catch(console.error);
	}, [language, i18n]);

	const handleLanguageChange = async (lang: string) => {
		setLanguage(lang);
		localStorage.setItem('selectedLanguage', lang);
		await i18n.changeLanguage(lang);
	};

	return (
		<ToggleGroup
			type="single"
			value={language}
			onValueChange={handleLanguageChange}
			size={'sm'}
			className="text-white flex items-center space-x-1 text-sm">
			<ToggleGroupItem value={de} aria-label={t('langSwitcher.toggleGerman')}>
				<div className="uppercase">de</div>
			</ToggleGroupItem>
			<Separator orientation="vertical" className="h-5" />
			<ToggleGroupItem value={en} aria-label={t('langSwitcher.toggleEnglish')}>
				<div className="uppercase">en</div>
			</ToggleGroupItem>
			<Separator orientation="vertical" className="h-5" />
			<ToggleGroupItem
				value={ch}
				aria-label={t('langSwitcher.toggleSwissGerman')}>
				<div className="uppercase">ch</div>
			</ToggleGroupItem>
		</ToggleGroup>
	);
};

export default LanguageSelector;
