import React from 'react';

import {Button} from '../../components/button';
import {TableHeader} from './table-header';
import {TableCellType, TablePageDataType} from './types';

type TableProps<T extends TableCellType, TArrData extends TablePageDataType<TableCellType[]>> = {
	data: TArrData;
	onEdit: (item: T) => void;
	headerKeys: string[];
	customFormatCellData?: (
		columnName: string,
		cellData: TableCellType,
		defaultFormatCellData: (_cellData: TableCellType) => string,
	) => string;
};

const toBool = (b: boolean) => (b ? 'Yes' : 'No');

const defaultFormatCellData = (cellData: TableCellType) => {
	if (cellData == null) return '';
	if (typeof cellData === 'boolean') return toBool(cellData);
	return typeof cellData === 'object' ? JSON.stringify(cellData) : cellData;
};

export const Table = <T extends TableCellType, TArrData extends TablePageDataType<TableCellType[]>>({
	data,
	onEdit,
	customFormatCellData,
	headerKeys,
}: TableProps<T, TArrData>) => {
	return (
		<div className="overflow-x-auto">
			<div className="grid grid-cols-1 border border-gray-300">
				<TableHeader headerKeys={headerKeys} />

				{data.map((row) => (
					<div key={row.changeHash || row.id} className="custom-table hover:bg-gray-100">
						{headerKeys.map((column) => (
							<div className="custom-cell" key={column}>
								{customFormatCellData
									? customFormatCellData(
											column,
											row?.[column] as TableCellType,
											defaultFormatCellData,
										)
									: defaultFormatCellData(row?.[column] as TableCellType)}
							</div>
						))}
						<div key="edit" className="custom-cell" style={{maxWidth: 'fit-content'}}>
							<Button onClick={() => onEdit(row as unknown as T)} btnSize="small">
								Edit
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
