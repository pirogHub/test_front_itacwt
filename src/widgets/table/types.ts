export type TableCellType = {
	[key: string | number]: string | number | boolean | TableCellType | TableCellType[];
};

export type TablePageDataType<T extends TableCellType[]> = (T[0] & {changeHash?: string; id: number})[];
