import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRouteMatch, useHistory } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import LobbyPage from './Lobby';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

function RegistrationPage() {
	const classes = useStyles();
	const role = useRouteMatch().params.role || '';
	const history = useHistory();

	return !role ? (
		<LobbyPage
			path="register"
			helper={{ message: 'Already have an account ? Login', link: '/login' }}
			headerMessage="Register as"
		/>
	) : (
		<Slide direction="right" in={true}>
			<Container component="main" maxWidth="xs">
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>
					<form className={classes.form} noValidate>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="username"
									label="Username"
									name="email"
									autoComplete="username"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="fullname"
									label="Full Name"
									name="fullname"
									autoComplete="fullname"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={<Checkbox value="allowExtraEmails" color="primary" />}
									label="I agree terms and conditions"
								/>
							</Grid>
						</Grid>
						<Button
							onClick={(e) => {
								e.preventDefault();
								history.push('/u')
							}}
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Register
						</Button>
					</form>
				</div>
			</Container>
		</Slide>
	);
}

export default RegistrationPage;
