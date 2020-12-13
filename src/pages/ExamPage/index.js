import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import QuestionBox from './QuestionBox';
import BG from '../../assets/images/pattern.svg';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
	examPage: {
		display: 'flex',
		justifyContent: 'center',
		height: window.innerHeight,
		background: `url(${BG})`,
		userSelect: 'none',
		boxSizing: 'border-box'
	},
	appBar: {
		height: 120,
		zIndex: 1,
	},
	toolbar: {
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		paddingTop: theme.spacing(2),
		[theme.breakpoints.down('xs')]: {
			padding: `${theme.spacing(1)}px`,
		},
	},
}));

const ExamPage = () => {
	const classes = useStyles();
	const match = useRouteMatch();
	const history = useHistory();
	const [paperID, setPaperID] = useState('');
	const [paper, setPaper] = useState({});
	// Get paper id from param
	useEffect(() => {
		setPaperID(match.params.id);
	}, [match.params.id]);

	useEffect(() => {
		let raw = localStorage.getItem('paper' + paperID);
		if (raw) return setPaper(JSON.parse(raw));
		if (paperID && !raw) history.push('/preparation');
	}, [history, paperID]);

	window.history.pushState(null, '', window.location.href);
	window.onpopstate = function () {
		window.history.pushState(null, '', window.location.href);
	};

	return (
		<div className={classes.examPage}>
			<AppBar className={classes.appBar} elevation={0} position="fixed" color="primary">
				<Toolbar className={classes.toolbar}>
					<Box alignItems="center" display="flex">
						<Hidden xsDown>
							<Typography style={{ marginLeft: 8 }} variant="body1">
								SIRIUS CBT
							</Typography>
						</Hidden>
					</Box>
					<Box display="flex">
						<Hidden mdDown>
							<Box mr={1} display="flex" flexDirection="column" alignItems="flex-end">
								<Typography>{localStorage.getItem('username')}</Typography>
							</Box>
						</Hidden>
						<Avatar>T</Avatar>
					</Box>
				</Toolbar>
			</AppBar>
			{Object.keys(paper).length !== 0 ? <QuestionBox paperID={paper._id} dum={paper.questions} /> : ''}
		</div>
	);
};

export default ExamPage;
