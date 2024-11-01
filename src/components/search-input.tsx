import React, {SetStateAction, useCallback, useEffect, useState} from 'react';

export const SearchInput = ({
	setDebouncedSearchTerm,
	isDisabled,
}: {
	isDisabled?: boolean;
	setDebouncedSearchTerm: React.Dispatch<SetStateAction<string>>;
}) => {
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [searchTerm, setDebouncedSearchTerm]);
	const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value), []);
	return (
		<input
			disabled={isDisabled}
			type="text"
			placeholder="Фильтр"
			value={searchTerm}
			onChange={handleChange}
			className="mb-4 border border-gray-300 rounded p-2"
		/>
	);
};
