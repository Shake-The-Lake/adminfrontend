import React from 'react';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import ShakeTheLakeIcon from '../components/icons/shake-the-lake-icon';

const ErrorPage: React.FC = () => {
	const { t } = useTranslation();
	const error = useRouteError();

	const errorStatus = isRouteErrorResponse(error) ? error.status : 0;
	const customErrorLabel = getErrorTranslationLabelFromStatus(errorStatus);

	return (
		<>
			<div className="h-full flex flex-col justify-center items-center gap-4 text-center">
				<h1 className="mb-4 text-6xl font-semibold text-primary-blue">
					{errorStatus === 0 ? '???' : errorStatus}
				</h1>
				<div className="mb-4 text-lg text-gray-600">
					<p>{t('pageErrorOops')}</p>
					<p>{t(customErrorLabel)}</p>
				</div>
				<div className="animate-bounce">
					<Link to="/">
						<ShakeTheLakeIcon className="mx-auto h-16 w-16 text-primary-blue" />
					</Link>
				</div>
				{errorStatus === 404 && (
					<p className="mt-4 text-gray-600">
						{t('page404NavigateHome')}{' '}
						<Link
							to="/"
							className="text-primary-blue underline-offset-4 hover:underline">
							{t('home')}
						</Link>
						.
					</p>
				)}
			</div>
		</>
	);
};

export default ErrorPage;

function getErrorTranslationLabelFromStatus(errorStatus?: number) {
	switch (errorStatus) {
		case 404:
			return 'pageErrorNotFound';
		case 401:
			return 'pageErrorNotAuthorized';
		case 503:
			return 'pageErrorApiDown';
		case 418:
			return 'pageErrorTeapot';
		default:
			return '';
	}
}
