import React from 'react';
import {useParams} from 'react-router-dom';

import {useFetchData} from '../hooks/use-fetch-data';
import {Redirect} from '../widgets/redirect/redirect';
import {useEditTableDataContent} from '../widgets/table/hooks/use-edit-table-data-content';
import {useFilterTableDataControllers} from '../widgets/table/hooks/use-filter-table-data-controllers';
import {Table} from '../widgets/table/table';
import {TableModal} from '../widgets/table/table-modal';

const FIELDS_NOT_TO_SHOW = ['id', 'changeHash'];
const FIELDS_TIME_STAMPTS = ['updatedAt', 'publishedAt', 'createdAt', 'removedAt'];
const FIELDS_NOT_TO_EDIT = FIELDS_TIME_STAMPTS;

const customColumnsToHide: React.ComponentProps<typeof TableModal>['customColumnsToHide'] = (columnName, data) => {
	return (
		typeof data !== 'string' || FIELDS_NOT_TO_EDIT.includes(columnName) || FIELDS_NOT_TO_SHOW.includes(columnName)
	);
};

const customFormatCellData: React.ComponentProps<typeof Table>['customFormatCellData'] = (
	columnName,
	cellData,
	defaultFormatCellData,
) => {
	if (columnName === 'active') {
		return Boolean(cellData) ? 'Active' : 'Inactive';
	}
	if (FIELDS_TIME_STAMPTS.includes(columnName) && typeof cellData === 'string') {
		return new Date(cellData).toLocaleString();
	}
	return defaultFormatCellData(cellData);
};
export const TablePage: React.FC = () => {
	const {productName} = useParams<{productName: string}>();

	const {isLoading, fetchedData, fetchedDataType, setFetchedData, fetchedDataTypeItemKeys} =
		useFetchData(productName);

	const {editableTableData, isModalOpen, selectedItem, handleEdit, handleSave, closeTableModal} =
		useEditTableDataContent({
			tableData: fetchedData,
			isClearFlag: isLoading,
			setEditableTableData: setFetchedData,
		});

	const {filteredHeaderKeys, filteredData, filterControllers} = useFilterTableDataControllers({
		tableData: editableTableData,
		fieldsNotToShow: FIELDS_NOT_TO_SHOW,
		isDisabled: isLoading,
		headerKeys: fetchedDataTypeItemKeys,
		controlsConfig: {
			enableSearchTerm: true,
			enableShowActiveFilter: true,
		},
	});

	if (productName === undefined) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			{filterControllers}
			{isLoading ? (
				<div>Loading...</div>
			) : !fetchedData || fetchedData.length === 0 ? (
				<>No Data for {productName}</>
			) : (
				<>
					<h1>{fetchedDataType}</h1>
					<Table
						headerKeys={filteredHeaderKeys}
						data={filteredData}
						onEdit={handleEdit}
						customFormatCellData={customFormatCellData}
					/>
				</>
			)}
			<TableModal
				isOpen={isModalOpen}
				onClose={closeTableModal}
				selectedItem={selectedItem}
				onSave={handleSave}
				customColumnsToHide={customColumnsToHide}
			/>
		</div>
	);
};
