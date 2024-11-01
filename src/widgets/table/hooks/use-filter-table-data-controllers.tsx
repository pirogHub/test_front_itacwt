import React, {useMemo, useState} from 'react';

import {SearchInput} from '../../../components/search-input';
import {ShowActiveController} from '../show-active-controller';
import {TableCellType, TablePageDataType} from '../types';

export const useFilterTableDataControllers = <TArrData extends TablePageDataType<TableCellType[]>>({
	tableData,
	fieldsNotToShow,
	isDisabled,
	controlsConfig,
	headerKeys,
}: {
	tableData: TArrData | undefined;
	fieldsNotToShow?: string[];
	isDisabled?: boolean;
	headerKeys: string[] | undefined;
	controlsConfig: {
		enableShowActiveFilter?: boolean;
		enableSearchTerm?: boolean;
	};
}) => {
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
	const [isShowActiveFilter, setIsShowActiveFilter] = useState<boolean | null>(null);

	const filteredHeaderKeys = useMemo(() => {
		if (!headerKeys) return [];
		return fieldsNotToShow ? headerKeys.filter((key) => !fieldsNotToShow.includes(key)) : headerKeys;
	}, [headerKeys, fieldsNotToShow]);

	const {enableShowActiveFilter, enableSearchTerm} = controlsConfig;

	const filteredData = useMemo(() => {
		return tableData
			? tableData.filter((item) => {
					let isMatchedActive = true;
					if (enableShowActiveFilter === true && isShowActiveFilter !== null) {
						isMatchedActive = isShowActiveFilter === Boolean(item?.active);
						if (!isMatchedActive) return false;
					}
					let isMatchedSearchedTerm = true;
					if (enableSearchTerm === true && debouncedSearchTerm) {
						isMatchedSearchedTerm = filteredHeaderKeys.some((column) => {
							const value = item?.[column];

							return (
								typeof value === 'string' &&
								value?.toLowerCase()?.includes(debouncedSearchTerm?.toLowerCase())
							);
						});
						if (!isMatchedSearchedTerm) return false;
					}
					return true;
				})
			: [];
	}, [
		tableData,
		enableShowActiveFilter,
		enableSearchTerm,
		debouncedSearchTerm,
		isShowActiveFilter,
		filteredHeaderKeys,
	]);

	return {
		filteredHeaderKeys,
		filteredData,
		filterControllers: (
			<>
				<SearchInput isDisabled={isDisabled} setDebouncedSearchTerm={setDebouncedSearchTerm} />
				<ShowActiveController
					isDisabled={isDisabled}
					isShowActiveFilter={isShowActiveFilter}
					setIsShowActiveFilter={setIsShowActiveFilter}
				/>
			</>
		),
	};
};
