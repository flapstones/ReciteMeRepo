import React from 'react';
import {AppProvider} from './context/AppProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from "./components/Main";
import { Route, Routes } from 'react-router-dom';
import ItemView from "./components/ItemView";

export default function App() {
	return (
		<AppProvider>
			<Routes>
				<Route path="/" element={<Main itemType={'rockets'} />} />
				<Route path="/:id" element={<ItemView />} />
			</Routes>
		</AppProvider>
	);
}
