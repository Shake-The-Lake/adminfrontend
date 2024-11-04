import React, { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import { ch, de, en } from '../../constants';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useTranslation } from 'react-i18next';

const SelectedLanguageStorageKey = 'selectedLanguage';

const LanguageSelector: React.FC = () => {
	const { i18n, t } = useTranslation();

	const [language, setLanguage] = useState(
		() => localStorage.getItem(SelectedLanguageStorageKey) ?? en,
	);

	useEffect(() => {
		const changeLanguage = async () => i18n.changeLanguage(language);
		changeLanguage().catch(console.error);
	}, [language, i18n]);

	const handleLanguageChange = async (lang: string) => {
		setLanguage(lang);
		localStorage.setItem(SelectedLanguageStorageKey, lang);
		await i18n.changeLanguage(lang);
	};

	return (
		<ToggleGroup
			type="single"
			value={language}
			aria-label={t('langSwitcher.ariaLabel')}
			onValueChange={handleLanguageChange}
			size={'sm'}
			className="text-white flex items-center space-x-1 text-sm">
			<ToggleGroupItem
				value={de}
				aria-label={t('langSwitcher.toggleGerman')}
				aria-pressed={language === de ? 'true' : 'false'}>
				<div className="uppercase">de</div>
			</ToggleGroupItem>
			<Separator orientation="vertical" className="h-5" />
			<ToggleGroupItem
				value={en}
				aria-label={t('langSwitcher.toggleEnglish')}
				aria-pressed={language === en ? 'true' : 'false'}>
				<div className="uppercase">en</div>
			</ToggleGroupItem>
			<Separator orientation="vertical" className="h-5" />
			<ToggleGroupItem
				value={ch}
				aria-label={t('langSwitcher.toggleSwissGerman')}
				aria-pressed={language === ch ? 'true' : 'false'}>
				<div className="uppercase">ch</div>
			</ToggleGroupItem>
		</ToggleGroup>
	);
};

export default LanguageSelector;