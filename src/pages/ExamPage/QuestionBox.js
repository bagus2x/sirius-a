import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import AppsRounded from '@material-ui/icons/AppsRounded';
import ArrowBackIosRounded from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRounded from '@material-ui/icons/ArrowForwardIosRounded';
import CheckBoxOutlineBlankRounded from '@material-ui/icons/CheckBoxOutlineBlankRounded';
import SendRounded from '@material-ui/icons/SendRounded';
import CheckBoxRounded from '@material-ui/icons/CheckBoxRounded';
import CloseRounded from '@material-ui/icons/CloseRounded';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import AlertDialog from '../../components/AlertDialog';
import { CircularProgress } from '@material-ui/core';
import parse from 'html-react-parser';

const useStyles = makeStyles((theme) => ({
	questionBox: {
		maxHeight: window.innerHeight - 120,
		width: '80vw',
		position: 'absolute',
		top: 70,
		borderRadius: theme.spacing(2),
		padding: theme.spacing(2),
		boxSizing: 'border-box',
		overflowY: 'hidden',
		zIndex: 999,
		display: 'grid',
		gridTemplateRows: 'auto 1fr auto',
		gap: theme.spacing(2),
	},
	number: {
		margin: '0 5px',
		background: theme.palette.primary.main,
		width: 25,
		textAlign: 'center',
		color: '#fff',
		borderRadius: theme.spacing(0.5),
	},
	doubtButton: {
		color: theme.palette.warning.main,
		'&:hover': {
			color: theme.palette.warning.dark,
		},
	},
	drawer: {
		zIndex: 9999,
	},
	drawerGrid: {
		padding: theme.spacing(2),
		display: 'grid',
		gridTemplateColumns: 'repeat( 5, minmax(40px, 1fr) )',
		gap: theme.spacing(0.5) + 'px',
		gridAutoRows: 40,
		maxWidth: 380,
	},
	numberItem: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: theme.spacing(1),
		minWidth: 0,
		position: 'relative',
	},
	numberItemActived: {
		background: blue[50],
		cursor: 'default',
		color: theme.palette.primary.dark,
		'&:hover': {
			background: blue[200],
		},
	},
	numberItemAnswered: {
		background: green[100],
		color: green[900],
		'&:hover': {
			background: green[300],
		},
	},
	numberItemDoubted: {
		background: yellow[100],
		color: yellow[900],
		'&:hover': {
			background: yellow[300],
		},
	},
	[theme.breakpoints.down('sm')]: {
		questionBox: {
			width: '95vw',
		},
	},
	[theme.breakpoints.down('xs')]: {
		questionBox: {
			width: '100vw',
			minHeight: window.innerHeight - 70,
			borderRadius: `${theme.spacing(1)}px ${theme.spacing(1)}px 0 0`,
		},
	},
}));

const QuestionBox = ({ dum, paperID }) => {
	const classes = useStyles();
	const [drawer, setDrawer] = useState(false);
	const [number, setNumber] = useState(0);
	const [open, setOpen] = useState(false);
	const [openErrorAlert, setOpenErrorAlert] = useState(false);
	const [answer, setAnswer] = useState([]);
	const [submit, setSubmit] = useState(false);
	const [errorWithAlert, setErrorWithAlert] = useState({ message: '', title: '' });
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const handleChoices = useCallback(
		(e) => {
			let raw = { qstID: number, option: e.target.value, doubt: Boolean(answer[number].doubt) };
			if (answer[number].qstID === number) {
				answer[number] = raw;
				setAnswer([...answer]);
			}
			// setAnswer((prev) => prev.map((ans) => (ans.qstID === number + 1 ? raw : ans)));
		},
		[answer, number]
	);
	const handleDoubtButton = () => {
		answer[number].doubt = !answer[number].doubt;
		setAnswer([...answer]);
	};
	const handleRemoveValue = () => {
		answer[number].option = '';
		setAnswer([...answer]);
	};
	const handleErrorAlert = useCallback(() => {
		setOpenErrorAlert(false);
	}, []);
	const handelSubmit = () => {
		setOpen(true);
	};
	const handleSubmitDialogNext = useCallback((v) => {
		setOpen(false);
		if (v) setSubmit(true);
		setOpen(false);
	}, []);
	const onSubmitting = useCallback(async () => {
		setLoading(true);
		try {
			let res = await Axios.put(`https://sirius-b.herokuapp.com/api/exam-result/${paperID}`, { selected: answer });
			localStorage.removeItem(`paper${paperID}`);
			localStorage.removeItem('paperID');
			history.push(`/result/${paperID}?resid=${res.data.result_id}`);
		} catch (err) {
			if (err.response) {
				setErrorWithAlert({ title: err.response.statusText, message: err.response.data.message });
			} else {
				setErrorWithAlert({ message: err.toString() });
			}
			setOpenErrorAlert(true);
			setLoading(false);
		}
	}, [answer, history, paperID]);
	useEffect(() => {
		for (let i = 0; i < dum.length; i++) setAnswer((prev) => [...prev, { qstID: i, option: '', doubt: false }]);
	}, [dum.length]);
	useEffect(() => {
		if (submit) onSubmitting();
	}, [onSubmitting, submit]);
	const handleNext = () => number < dum.length - 1 && setNumber(number + 1);
	const handlePrev = () => number > 0 && setNumber(number - 1);
	window.onbeforeunload = function () {
		return false;
	};

	return (
		<>
			<Box
				justifyContent="center"
				alignItems="center"
				zIndex={99999}
				display={loading ? 'flex' : 'none'}
				position="absolute"
				top={0}
				left={0}
				width="100vw"
				height="100vh"
			>
				<CircularProgress />
			</Box>
			<AlertDialog
				title={errorWithAlert.title}
				open={openErrorAlert}
				handleClose={handleErrorAlert}
				btnYes="Kembali"
				message={errorWithAlert.message}
			/>
			<AlertDialog
				title="Kirim hasil pekerjaan?"
				open={open}
				handleClose={handleSubmitDialogNext}
				btnYes="Kirim"
				btnNo="Batal"
				message="Apa anda yakin akan mengirim jawaban?..."
			/>
			<Paper elevation={8} className={classes.questionBox}>
				<Box display="flex" justifyContent="space-between">
					<Box display="flex" alignItems="center">
						<Hidden mdDown>
							<Typography variant="body2">SOAL NO</Typography>
						</Hidden>
						<Typography className={classes.number} variant="body1">
							{number + 1}
						</Typography>
					</Box>
					{/* <Typography variant="h6">38:02:15</Typography> */}
					<Hidden lgUp>
						<IconButton onClick={() => setDrawer(!drawer)} color="primary">
							<AppsRounded />
						</IconButton>
					</Hidden>
					<Hidden mdDown>
						<Tooltip className={classes.tooltip} enterDelay={500} disableFocusListener title="Tampilkan seluruh daftar soal">
							<Button onClick={() => setDrawer(!drawer)} color="primary" disableElevation startIcon={<AppsRounded />}>
								Daftar Soal
							</Button>
						</Tooltip>
					</Hidden>
				</Box>
				<Box fontSize="1rem" style={{ overflowY: 'auto' }}>
					{parse(dum[number].question)}
					<Box marginTop={2}>
						<FormControl component="fieldset">
							<RadioGroup value={answer[number]?.option || ''} onFocus={handleChoices} aria-label="gender" name="gender1">
								{dum[number].options?.map((option, i) =>
									option.image.url ? (
										<Box display="flex" alignItems="center" marginTop={2} key={i}>
											<Radio disableRipple color="primary" value={option.optID} />
											<img width={dum[number].image.size} src={option.image} alt={option.image} />
										</Box>
									) : (
										<FormControlLabel
											style={{ marginLeft: 0, marginBottom: 10 }}
											value={option.optID}
											control={<Radio disableRipple color="primary" />}
											label={option.option}
											key={i}
										/>
									)
								)}
							</RadioGroup>
						</FormControl>
					</Box>
					<Box mt={2} mb={2} style={{ cursor: 'pointer' }} onClick={handleRemoveValue} display="inline-flex">
						<Typography color="error" variant="caption">
							Kosongkan
						</Typography>
					</Box>
				</Box>
				<div>
					<Box display="flex" justifyContent="space-between">
						<Button disableElevation onClick={handlePrev} color="primary" startIcon={<ArrowBackIosRounded />}>
							<Hidden mdDown>Sebelumnya</Hidden>
						</Button>
						<Button
							className={classes.doubtButton}
							onClick={handleDoubtButton}
							disableElevation
							color="primary"
							startIcon={answer[number]?.doubt ? <CheckBoxRounded /> : <CheckBoxOutlineBlankRounded />}
						>
							Ragu-Ragu
						</Button>
						{number === dum.length - 1 ? (
							<Button disableElevation onClick={handelSubmit} color="secondary" endIcon={<SendRounded />}>
								<Hidden mdDown>Kumpulkan</Hidden>
							</Button>
						) : (
							<Button disableElevation onClick={handleNext} color="primary" endIcon={<ArrowForwardIosRounded />}>
								<Hidden mdDown>Selanjutnya</Hidden>
							</Button>
						)}
					</Box>
				</div>
			</Paper>
			<Drawer keepMounted className={classes.drawer} anchor="right" onClose={() => setDrawer(false)} open={drawer}>
				<Box p={2} display="flex" alignItems="center" justifyContent="space-between">
					<Typography variant="subtitle1">Daftar Soal</Typography>
					<IconButton onClick={() => setDrawer(false)} color="primary">
						<CloseRounded />
					</IconButton>
				</Box>
				<Divider />
				<Box className={classes.drawerGrid}>
					{dum.map((e, i) => (
						<Button
							onClick={() => setNumber(e.qstID)}
							color="primary"
							key={i}
							className={`
								${classes.numberItem} ${number === i && classes.numberItemActived} 
								${answer[i]?.option && classes.numberItemAnswered} 
								${answer[i]?.doubt && classes.numberItemDoubted}
							`}
						>
							{e.qstID + 1}
							{answer[e.qstID]?.option}
						</Button>
					))}
				</Box>
			</Drawer>
		</>
	);
};

export default QuestionBox;
