// Fire Blogs

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; 

// Styles
import './styles/index.scss';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';

import { BrowserRouter } from 'react-router-dom';

import { FireContextProvider } from './app-fire-blogs/fire-context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<BrowserRouter>
		<FireContextProvider>
			<App />
		</FireContextProvider>
	</BrowserRouter>,
);