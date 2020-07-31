import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/icons/ListAltRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import Axios from 'axios';
import { TableContainer, Table, TableBody, TableRow, Paper, TableCell, LinearProgress } from '@material-ui/core';
import AlerttDialog from '../components/AlertDialog';
import { useCallback } from 'react';

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
	table: {
		maxWidth: 600,
		minWidth: 320,
	},
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		background: theme.palette.primary.light,
		padding: theme.spacing(2),
		minHeight: '100vh',
	},
}));

function Preparation() {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [inputForm, setInputForm] = useState({ username: '', userID: '', paperID: '' });
	const [paper, setPaper] = useState({});
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [errorWithAlert, setErrorWithAlert] = useState({message:'', title: '' });
	const handleInputForm = (e) => {
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	};
	const handleSearchPaper = async (e) => {
		e.preventDefault();
		if (!inputForm.paperID || !inputForm.username || !inputForm.userID) return;
		setLoading(true);
		try {
			let res = await Axios.get(`http://localhost:8080/api/papers/${inputForm.paperID}`);
			setPaper(res.data.paper);
			setLoading(false);
		} catch (err) {
			setOpen(true);
			setLoading(false);
			if(err.response) {
				setErrorWithAlert({title: err.response.statusText, message: err.response.data.message })
			}else {
				setErrorWithAlert({ message: err.toString()})
			}
		}
	};
	const handleStart = (e) => {
		e.preventDefault();
		let jsonPaper = JSON.stringify(paper);
		localStorage.setItem('username', inputForm.username);
		localStorage.setItem('userID', inputForm.serID);
		localStorage.setItem('paper' + inputForm.paperID, jsonPaper);
		history.push('/exam/' + inputForm.paperID);
	};
	const handleClose = useCallback(() => setOpen(false), []);
	return (
		<>
			{loading && <LinearProgress style={{ position: 'absolute', width: '100%', top: 0 }} />}
			{Object.keys(paper).length === 0 ? (
				<Container component="main" maxWidth="xs">
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<List />
						</Avatar>
						<Typography component="h1" variant="h5">
							Lobi Ujian
						</Typography>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										onChange={handleInputForm}
										variant="outlined"
										required
										fullWidth
										id="username"
										label="Nama Peserta"
										name="username"
										autoComplete="username"
										value={inputForm.username}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										onChange={handleInputForm}
										variant="outlined"
										required
										fullWidth
										id="userID"
										label="ID Peserta"
										name="userID"
										autoComplete="userID"
										value={inputForm.userID}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										onChange={handleInputForm}
										required
										fullWidth
										id="paperID"
										label="Kode Soal"
										name="paperID"
										value={inputForm.paperID}
									/>
								</Grid>
							</Grid>
							<Button
								disabled={loading}
								onClick={handleSearchPaper}
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								Cari Soal
							</Button>
						</form>
					</div>
				</Container>
			) : (
				<div className={classes.root}>
					<Slide in={true}>
						<TableContainer className={classes.table} component={Paper}>
							<Table aria-label="simple table">
								<TableBody>
									<TableRow>
										<TableCell>Judul Ujian</TableCell>
										<TableCell>{paper.detail.title}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Subjek</TableCell>
										<TableCell>{paper.detail.subject}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Deskripsi</TableCell>
										<TableCell>{paper.detail.description}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell />
										<TableCell align="right">
											<Button onClick={handleStart} variant="contained" color="primary">
												Mulai Ujian
											</Button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Slide>
				</div>
			)}
			<AlerttDialog
				open={open}
				handleClose={handleClose}
				btnYes="Tutup"
				message={errorWithAlert?.message}
				title={errorWithAlert?.title}
			/>
		</>
	);
}

export default Preparation;
