import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as Teacher } from '../assets/images/teacher2.svg';
import { ReactComponent as Student } from '../assets/images/student.svg';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import HelpRounded from '@material-ui/icons/HelpRounded';

const useStyles = makeStyles((theme) => ({
	root: {
		...theme.custom.centerElement,
		background: 'white',
		flexDirection: 'column',
		width: '100%',
		height: window.innerHeight,
	},
	boxRole: {
		...theme.custom.centerElement,
		margin: theme.spacing(2),
		width: 200,
		height: 200,
		borderRadius: theme.spacing(4),
		cursor: 'pointer',
		[theme.breakpoints.down('xs')]: {
			width: 120,
			height: 120,
		},
	},
	contentWrapper: {
		...theme.custom.centerElement,
	},
	teacher: {
		background: theme.palette.grey[700],
	},
	student: {
		background: theme.palette.primary.main,
	},
	link: {
		color: theme.palette.primary.main,
	},
	icon: {
		position: 'absolute',
		top: theme.spacing(1),
		left: theme.spacing(1)
	}
}));

function LobbyPage(props) {
	const classes = useStyles();
	const history = useHistory();
	const { helper, path, headerMessage } = props;
	const setRoleHandler = (e, role) => {
		e.preventDefault();
		if (!['student', 'teacher'].includes(role)) return;
		history.push(`/${path}/${role}`);
	};

	return (
		<Slide in={true} direction="right">
			<Box className={classes.root}>
				<IconButton component={Link} to="help" className={classes.icon}>
					<HelpRounded />
				</IconButton>
				<Typography variant="h4">{headerMessage}</Typography>
				<Box mb={8} mt={4} className={classes.contentWrapper}>
					<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
						<Box
							onClick={(e) => setRoleHandler(e, 'teacher')}
							className={`${classes.boxRole} ${classes.teacher}`}
						>
							<Teacher />
						</Box>
						<Typography variant="h5">Teacher</Typography>
					</Box>
					<Box display="flex" flexDirection="column" alignItems="center">
						<Box
							onClick={(e) => setRoleHandler(e, 'student')}
							className={`${classes.boxRole} ${classes.student}`}
						>
							<Student />
						</Box>
						<Typography variant="h5">Student</Typography>
					</Box>
				</Box>
				<Link className={classes.link} to={helper?.link}>
					{helper?.message}
				</Link>
			</Box>
		</Slide>
	);
}

export default LobbyPage;
