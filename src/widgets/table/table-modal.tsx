import React, {useCallback, useEffect, useState} from 'react';

import {Button} from '../../components/button';
import {TableCellType} from './types';

interface TableModalProps<T extends TableCellType> {
	isOpen: boolean;
	onClose: () => void;
	selectedItem: T | null;
	onSave: (updatedData: T) => void;
	customColumnsToHide: (columnName: string, cellData: T) => boolean;
}

export const TableModal = <T extends TableCellType>({
	isOpen,
	onClose: _onClose,
	customColumnsToHide,
	selectedItem,
	onSave,
}: TableModalProps<T>) => {
	const [formData, setFormData] = useState<T | null>(selectedItem);

	useEffect(() => {
		if (isOpen) {
			setFormData(selectedItem);
		}
	}, [selectedItem, isOpen]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setFormData((prev) => (prev ? {...prev, [name]: value} : null));
	};

	const onClose = useCallback(() => {
		setFormData(null);
		_onClose();
	}, [_onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData) onSave(formData);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div
				style={{
					zIndex: '1',
				}}
				className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
			>
				<h2 className="text-lg font-bold mb-4">Edit Data</h2>
				<form onSubmit={handleSubmit}>
					{formData &&
						Object.entries(formData).map(([key, value]) => {
							const isDisable = customColumnsToHide(key, value as T);
							const isString = typeof value === 'string';
							if (isDisable || !isString) return null;
							return (
								<div key={key} className="mb-4">
									<label htmlFor={key} className="block text-sm font-medium text-gray-700">
										{key}
									</label>
									<input
										name={key}
										value={value}
										onChange={handleChange}
										className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
									/>
								</div>
							);
						})}
					<div className="flex justify-between">
						<Button onClick={handleSubmit} btnType="primary">
							Save
						</Button>
						<Button onClick={onClose} btnType="secondary">
							Cansel
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};
