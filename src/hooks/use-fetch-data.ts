import {useEffect, useMemo, useState} from 'react';

import {fetcher} from '../fetch/fake-fetch';
import {AvailableDataStructSchema, AvailableDataStructType} from './types';

export const useFetchData = (dataName: string | undefined) => {
	const [fetchedDataType, setFetchedDataType] = useState<AvailableDataStructType['type']>();
	const [fetchedData, setFetchedData] = useState<AvailableDataStructType['data']>();
	const [isLoading, setIsLoading] = useState(true);
	const [fetchedDataTypeItemKeys, setFetchedDataTypeItemKeys] =
		useState<(keyof AvailableDataStructType['data'][0])[]>();

	useEffect(() => {
		setIsLoading(true);
		if (!dataName) {
			setFetchedData([]);
			setFetchedDataType(undefined);
			setIsLoading(false);
			return;
		}
		const formattedDataName = dataName.replace(/(?:^|-)(\w)/g, (_, char: string) => char.toUpperCase());
		fetcher
			.fakeFetch(formattedDataName)
			.then((data) => {
				if (data.data !== null) {
					const isValid = AvailableDataStructSchema?.safeParse({
						type: formattedDataName,
						data: data.data,
					});

					if (isValid.success) {
						setFetchedData(isValid.data.data);
						setFetchedDataType(isValid.data.type);
						setFetchedDataTypeItemKeys(
							Object.keys(isValid.data.data[0]) as (keyof AvailableDataStructType['data'][0])[],
						);
					} else {
						console.error('invalid data');
					}
				} else {
					console.error('empty data');
				}
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [dataName]);

	return useMemo(
		() => ({
			fetchedData,
			fetchedDataType,
			isLoading,
			setFetchedData,
			fetchedDataTypeItemKeys,
		}),
		[fetchedData, fetchedDataType, isLoading, setFetchedData, fetchedDataTypeItemKeys],
	);
};
