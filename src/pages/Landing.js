import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ReactComponent as Logo } from '../assets/icons/logo.svg';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { ReactComponent as MainBG } from '../assets/images/main-bg.svg';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		overflow: 'hidden',
	},
	brand: {
		marginRight: theme.spacing(2),
	},
	toolBar: {
		justifyContent: 'space-between',
		padding: `${theme.spacing(3)}px ${theme.spacing(12)}px`,
	},
	backgroundWrapper: {
		padding: `0 ${theme.spacing(12)}px`,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'relative',
		zIndex: 0,
	},
	blue: {
		alignSelf: 'flex-end',
		background: theme.palette.primary.main,
		width: '50%',
		zIndex: -1,
		height: '100%',
		position: 'absolute',
		borderRadius: theme.spacing(2),
	},
	message: {
		bottom: 50,
		textAlign: 'center',
		width: '100%',
		padding: `0 ${theme.spacing(2)}px`,
	},
	[theme.breakpoints.down('sm')]: {
		toolBar: {
			padding: `${theme.spacing(0)}px ${theme.spacing(6)}px`,
		},
		backgroundWrapper: {
			padding: `0 ${theme.spacing(6)}px`,
		},
	},
	[theme.breakpoints.down('xs')]: {
		toolBar: {
			padding: `${theme.spacing(0)}px ${theme.spacing(2)}px`,
		},
		backgroundWrapper: {
			padding: `0 ${theme.spacing(2)}px`,
		},
		background: {
			transform: 'scale(.6)',
		},
	},
}));

function LandingPage() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar elevation={0} color="transparent" position="static">
				<Toolbar className={classes.toolBar}>
					<Box display="flex" gridGap={2} alignItems="center">
						<Logo />
						<Hidden xsDown>
							<Typography variant="h6">SIRIUS</Typography>
						</Hidden>
					</Box>
					<Box>
						<Button component={Link} to="/login" color="default" variant="text">
							Login
						</Button>
						<Button component={Link} to="/register" color="primary" variant="text">
							Register
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Box className={classes.backgroundWrapper}>
				<div className={classes.blue} />
				<MainBG className={classes.background} />
			</Box>
			<Box position="absolute" className={classes.message}>
				<Typography variant="h5">Success doesn't come to you, you go to it.</Typography>
			</Box>
		</div>
	);
}

export default LandingPage;
