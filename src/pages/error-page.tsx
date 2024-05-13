import React from 'react';
import {useTranslation} from 'react-i18next';
// import {ExampleIcon} from '/src/assets/icons/shake-the-lake-icon.svg';
import {iconPaths} from '../constants';
import {Link} from 'react-router-dom';

const ErrorPage: React.FC = () => {
	const {t} = useTranslation();

	return (
		<>
			<div className="h-full flex flex-col justify-center items-center gap-4 text-center">
				<h1 className="mb-4 text-6xl font-semibold text-primary-blue">404</h1>
				<p className="mb-4 text-lg text-gray-600">
					<h4>{t('page404Oops')}</h4>
					<h4>{t('pageNotFound')}</h4>
				</p>
				<div className="animate-bounce">
					{/* <ExampleIcon className="mx-auto h-16 w-16 text-primary-blue" /> */}
					<img
						src={iconPaths.shakeTheLake}
						className="mx-auto h-16 w-16 text-primary-blue"
					/>
				</div>
				<p className="mt-4 text-gray-600">
					{t('page404NavigateHome')}{' '}
					<Link
						to="/"
						className="text-primary-blue underline-offset-4 hover:underline">
						{t('home')}
					</Link>
					.
				</p>
			</div>
		</>
	);
};

export default ErrorPage;
