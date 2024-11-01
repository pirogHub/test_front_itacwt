import React, {useCallback} from 'react';

import {Button} from '../../components/button';

export const ShowActiveController: React.FC<{
	isDisabled?: boolean;
	isShowActiveFilter: boolean | null;
	setIsShowActiveFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
}> = ({isDisabled, isShowActiveFilter, setIsShowActiveFilter}) => {
	const onClick = useCallback(() => {
		setIsShowActiveFilter((prev) => {
			return prev === null ? true : prev === true ? false : null;
		});
	}, [setIsShowActiveFilter]);

	const getButtonText = (): string => {
		if (isShowActiveFilter === null) return 'Show: All';
		return isShowActiveFilter ? 'Show: Only Active' : 'Show: Only Inactive';
	};

	const getButtonType = () => {
		if (isShowActiveFilter === null) return 'simple';
		return isShowActiveFilter ? 'primary' : 'secondary';
	};

	return (
		<Button disabled={isDisabled} btnType={getButtonType()} onClick={onClick}>
			{getButtonText()}
		</Button>
	);
};
