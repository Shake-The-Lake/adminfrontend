export const cleanEmptyParams = <T extends Record<string, unknown>>(
	search: T,
) => {
	const newSearch = {...search};
	Object.keys(newSearch).forEach((key) => {
		const value = newSearch[key];
		if (
			value === undefined ||
			value === '' ||
			(typeof value === 'number' && isNaN(value))
		)
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete newSearch[key];
	});

	return newSearch;
};
