import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SideNav from '../../components/SideNav';
import { Route, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	content: {
		padding: theme.spacing(4),
		height: '100vh',
		boxSizing: 'border-box',
		overflowY: 'auto',
		width: '100%'
	},
}));

function UserPage() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<SideNav />
			<div className={classes.content}>
				<Route path="/u" exact>
					home
				</Route>
				<Route path="/u/analytics" exact>
					anal
				</Route>
				<Route path="/u/task">
					<Link to="/exam-editor">Exam Editor</Link>
				</Route>
			</div>
		</div>
	);
}

export default UserPage;
