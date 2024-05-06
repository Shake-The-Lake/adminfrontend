import {type ReportHandler} from 'web-vitals';

const reportWebVitals = async (onPerfEntry?: ReportHandler) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		// eslint-disable-next-line promise/always-return
		await import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
			getCLS(onPerfEntry);
			getFID(onPerfEntry);
			getFCP(onPerfEntry);
			getLCP(onPerfEntry);
			getTTFB(onPerfEntry);
		});
	}
};

export default reportWebVitals;
