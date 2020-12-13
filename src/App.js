import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './redux/store';
import LandingPage from './pages/Landing';
import HelperPage from './pages/Helper';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './utils/theme';
import { Provider } from 'react-redux';
import Error from './pages/Error';
import ExamPage from './pages/ExamPage';
import ResultPage from './pages/ResultPage';
import Preparation from './pages/Preparation';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<BrowserRouter>
				<Provider store={store}>
					<Routes />
				</Provider>
			</BrowserRouter>
		</ThemeProvider>
	);
}

function Routes() {
	return (
		<>
			<Switch>
				<Route path="/" exact>
					<LandingPage />
				</Route>
				<Route path="/help">
					<HelperPage />
				</Route>
				<Route path="/exam/:id?">
					<ExamPage />
				</Route>
				<Route path="/preparation">
					<Preparation />
				</Route>
				<Route path="/result/:id">
					<ResultPage />
				</Route>
				<Route path="*">
					<Error nav />
				</Route>
			</Switch>
		</>
	);
}

export default App;
