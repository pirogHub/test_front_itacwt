import React, {useCallback, useEffect, useState} from 'react';

import {TableCellType, TablePageDataType} from '../types';

export const useEditTableDataContent = <TArrData extends TablePageDataType<TableCellType[]>>({
	tableData,
	isClearFlag,
}: {
	tableData: TArrData | undefined;
	isClearFlag: boolean;
	setEditableTableData: React.Dispatch<React.SetStateAction<TArrData | undefined>>;
}) => {
	const [editableTableData, setEditableTableData] = useState<TablePageDataType<TArrData> | undefined>(tableData);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<TArrData[0] | null>(null);

	useEffect(() => {
		if (isClearFlag) {
			setEditableTableData(undefined);
		} else {
			setEditableTableData(tableData);
		}
	}, [isClearFlag, tableData]);

	const handleEdit = useCallback(
		(item: TArrData[0]) => {
			setSelectedItem(item);
			setIsModalOpen(true);
		},
		[setSelectedItem, setIsModalOpen],
	);

	const handleSave = useCallback(
		(updatedData: TArrData[0]) => {
			setEditableTableData((prev) =>
				!prev
					? prev
					: (prev.map((item) =>
							item.id === updatedData.id ? {...updatedData, changeHash: Math.random().toString()} : item,
						) as TArrData),
			);
		},
		[setEditableTableData],
	);

	const closeTableModal = useCallback(() => {
		setIsModalOpen(false);
		setSelectedItem(null);
	}, [setIsModalOpen, setSelectedItem]);

	return {
		editableTableData,
		isModalOpen,
		selectedItem,
		setEditableTableData,
		handleEdit,
		handleSave,
		closeTableModal,
	};
};
