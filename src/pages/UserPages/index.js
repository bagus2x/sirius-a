import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from '../../components/SideNav';
import { Route, Link, Switch } from 'react-router-dom';
import Error from '../Error';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: window.innerHeight,
		background: theme.palette.grey[50],
	},
	content: {
		padding: theme.spacing(4),
		height: '100vh',
		boxSizing: 'border-box',
		overflowY: 'auto',
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(0.5),
		},
	},
}));

function UserPage() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<SideNav />
			<div className={classes.content}>
				<Switch>
					<Route path="/u" exact>
						home
					</Route>
					<Route path="/u/analytics" exact>
						anal
					</Route>
					<Route path="/u/task">
						<Link to="/exam-editor">Exam Editor</Link>
					</Route>
					<Route path="/u/*">
						<Error />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default UserPage;
