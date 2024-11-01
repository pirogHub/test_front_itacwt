import {data as Pages} from './fake-data/data-pages';
import {data as PricePlans} from './fake-data/data-price-plans';
import {data as Products} from './fake-data/data-products';

const availableStruts = ['Products', 'PricePlans', 'Pages'];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const availableData: Record<(typeof availableStruts)[number], any> = {
	Products,
	PricePlans,
	Pages,
};
export const fakeFetch = async <T>(route: string, defaultData?: T): Promise<{type: string; data: T | null}> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const data = defaultData ?? (availableData?.[route] as T);

			resolve({
				type: route,
				data,
			});
		}, 100);
	});
};

export const fetcher = {
	fetchAvailableStruts: async () => fakeFetch<string[]>('availableStruts', availableStruts),
	fakeFetch,
};
