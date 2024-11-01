import React from 'react';
import {Link, useLocation} from 'react-router-dom';

import cn from 'classnames';

export const Header = ({routes}: {routes: {link: string; name: string}[]}) => {
	const location = useLocation();

	return (
		<header className="bg-gray-800 text-white p-4">
			<nav>
				<ul className="flex space-x-4">
					{routes.map((route) => (
						<li key={route.link}>
							<Link
								to={route.link}
								className={cn('hover:underline', {
									'text-green-400': location.pathname === route.link,
								})}
							>
								{route.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
};
