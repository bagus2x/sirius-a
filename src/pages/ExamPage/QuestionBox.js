import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import green from '@material-ui/core/colors/green';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	questionBox: {
		height: window.innerHeight - 120,
		width: '80vw',
		background: '#fff',
		position: 'absolute',
		top: 70,
		borderRadius: theme.spacing(3),
		padding: `${theme.spacing(2)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`,
		boxSizing: 'border-box',
		overflowY: 'hidden',
		zIndex: 999,
	},
	number: {
		margin: '0 5px',
		background: theme.palette.primary.main,
		width: 25,
		textAlign: 'center',
		color: '#fff',
		borderRadius: theme.spacing(0.5),
	},
	toolBar: {
		justifyContent: 'space-between',
		padding: 0,
	},
	questionWrapper: {
		width: '100%',
		borderBottom: `1px solid ${theme.palette.grey[400]}`,
		paddingBottom: theme.spacing(2.5),
		boxSizing: 'border-box',
		height: '80%',
		overflowY: 'auto',
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
			height: window.innerHeight - 70,
			padding: `${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(4)}px`,
			borderRadius: `${theme.spacing(2)}px ${theme.spacing(2)}px 0 0`,
		},
	},
}));

const QuestionBox = ({ dum, paperID }) => {
	const classes = useStyles();
	const [drawer, setDrawer] = useState(false);
	const [number, setNumber] = useState(0);
	const [answer, setAnswer] = useState([]);
	const history = useHistory();
	const matches = useMediaQuery('(max-width:600px)');
	const handleChoices = (e) => {
		let raw = { qstID: number, option: e.target.value, doubt: Boolean(answer[number].doubt) };
		if (answer[number].qstID === number) {
			answer[number] = raw;
			setAnswer([...answer]);
		}
		// setAnswer((prev) => prev.map((ans) => (ans.qstID === number + 1 ? raw : ans)));
	};
	const handleDoubtButton = () => {
		answer[number].doubt = !answer[number].doubt;
		setAnswer([...answer]);
	};
	const handleRemoveValue = () => {
		answer[number].option = '';
		setAnswer([...answer]);
	};
	const handleSubmit = async () => {
		try {
			console.log(answer);
			let res = await Axios.put(`http://localhost:8080/api/exam-result/${paperID}`, { selected: answer });
			localStorage.removeItem(`paper${paperID}`);
			history.push(`/result/${paperID}?resid=${res.data.result_id}`);
		} catch (err) {
			alert(err);
			console.log(err);
		}
	};
	useEffect(() => {
		for (let i = 0; i < dum.length; i++) setAnswer((prev) => [...prev, { qstID: i, option: '', doubt: false }]);
	}, [dum.length]);
	const handleNext = () => number < dum.length - 1 && setNumber(number + 1);
	const handlePrev = () => number > 0 && setNumber(number - 1);
	// window.onbeforeunload = function () {return false;}

	return (
		<>
			<Paper elevation={8} className={classes.questionBox}>
				<AppBar color="transparent" position="static" elevation={0}>
					<Toolbar className={classes.toolBar}>
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
					</Toolbar>
				</AppBar>
				<Box mt={2} className={classes.questionWrapper}>
					<Typography variant="body1">{dum[number].question}</Typography>
					{dum[number].image && (
						<Box mt={2} mb={2}>
							<img width={`${matches ? '100%' : '50%'}`} src={dum[number].image} alt={`imagenumber${number}`} />
						</Box>
					)}
					<Box mt={2}>
						<FormControl component="fieldset">
							<RadioGroup value={answer[number]?.option || ''} onFocus={handleChoices} aria-label="gender" name="gender1">
								{dum[number].options.map((option, i) =>
									option.image ? (
										<Box display="flex" alignItems="center" marginTop={2} key={i}>
											<Radio disableRipple color="primary" value={option.optID} />
											<img width={`${matches ? '100%' : '50%'}`} src={option.image} alt={option.image} />
										</Box>
									) : (
										<FormControlLabel
											style={{ marginLeft: 0 }}
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
							Reset
						</Typography>
					</Box>
				</Box>
				<Box mt={2} display="flex" justifyContent="space-between">
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
						<Button disableElevation onClick={handleSubmit} color="secondary" endIcon={<SendRounded />}>
							<Hidden mdDown>Kumpulkan</Hidden>
						</Button>
					) : (
						<Button disableElevation onClick={handleNext} color="primary" endIcon={<ArrowForwardIosRounded />}>
							<Hidden mdDown>Selanjutnya</Hidden>
						</Button>
					)}
				</Box>
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
