import React from 'react';

export const TableHeader = ({headerKeys}: {headerKeys: string[]}) => {
	return (
		<div className="custom-table bg-gray-200 font-bold text-left">
			{headerKeys.map((column) => (
				<div key={column} className="custom-cell  border-b border-gray-300">
					{column}
				</div>
			))}
			<div key="edit" className="custom-cell" style={{maxWidth: 'fit-content'}}>
				Edit
			</div>
		</div>
	);
};
