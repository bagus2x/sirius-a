import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import store from './redux/store';
import LandingPage from './pages/Landing';
import RegistrationPage from './pages/Registration';
import LoginPage from './pages/Login';
import HelperPage from './pages/Helper';
import UserPage from './pages/UserPages';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './utils/theme';
import { Provider } from 'react-redux';
import ExamEditor from './pages/ExamEditor';

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
			<Route path="/" exact>
				<LandingPage />
			</Route>
			<Route path="/help">
				<HelperPage />
			</Route>
			<Route path="/exam-editor">
				<ExamEditor />
			</Route>
			<Route path="/u">
				<UserPage />
			</Route>
			<Route path="/register/:role?">
				<RegistrationPage />
			</Route>
			<Route path="/login/:role?">
				<LoginPage />
			</Route>
		</>
	);
}

export default App;
