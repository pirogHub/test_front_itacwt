import React, {useMemo} from 'react';

import cn from 'classnames';

type ButtonType = 'primary' | 'secondary' | 'simple';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	btnType?: ButtonType;
	btnSize?: 'small' | 'medium';
}

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
	btnType = 'primary',
	btnSize = 'medium',
	children,
	disabled,
	...props
}) => {
	const classNames = useMemo(
		() =>
			cn('font-bold rounded', {
				'py-2 px-4': btnSize === 'medium',
				'px-2': btnSize === 'small',
				...(disabled
					? {}
					: {
							'hover:bg-blue-600': btnType === 'primary',
							'hover:bg-gray-600': btnType === 'secondary' || btnType === 'simple',
						}),
				'text-white bg-blue-500': btnType === 'primary',
				'text-white bg-gray-500': btnType === 'secondary',
				'text-black border': btnType === 'simple',
			}),
		[btnType, btnSize, disabled],
	);

	return (
		<button type="button" className={classNames} {...props}>
			{children}
		</button>
	);
};
