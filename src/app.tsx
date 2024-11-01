import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {Header} from './components/header';
import {fetcher} from './fetch/fake-fetch';
import {TablePage} from './pages/table-page';

export const App: React.FC = () => {
	const [routes, setRoutes] = useState<{name: string; link: string}[]>([]);
	useEffect(() => {
		fetcher
			.fetchAvailableStruts()
			.then((data) => {
				if (data.data !== null) {
					setRoutes(
						data.data.map((route) => {
							return {
								name: route,
								link: `/table/${route.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`,
							};
						}),
					);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<BrowserRouter>
			<Header routes={routes} />

			<main className="p-4">
				<Routes>
					<Route path="/" element={<div>Choose page</div>} />
					<Route path="/table/:productName" element={<TablePage />} />
					<Route path="*" element={<div>NotFound</div>} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};
