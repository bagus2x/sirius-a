import React, { useState } from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Add from '@material-ui/icons/AddRounded';
import SaveIcon from '@material-ui/icons/SaveRounded';
import UploadIcon from '@material-ui/icons/CloudUploadRounded';
import More from '@material-ui/icons/MoreVertRounded';
import ExpandIcon from '@material-ui/icons/ExpandMoreRounded';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		height: window.innerHeight,
		background: theme.palette.primary.light,
		overflowY: 'scroll',
		overflowX: 'hidden',
	},
	editorPage: {
		margin: '0 auto',
		width: '100%',
		maxWidth: 960,
		background: '#fff',
		minHeight: '100%',
		padding: `${theme.spacing(4)}px`,
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(0.5),
		},
		position: 'relative',
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		background: blue[50],
		padding: `${theme.spacing(0.5)}px ${theme.spacing(0.5)}px ${theme.spacing(0.5)}px ${theme.spacing(2.25)}px`,
		borderRadius: theme.spacing(1),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		color: theme.palette.primary.dark,
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	accordSum: {
		width: '100%',
	},
}));

function sinceEpoch(date) {
	return new Date(date).getTime();
}

function ExamEditor() {
	const classes = useStyles();
	const matches = useMediaQuery('(max-width:960px)');
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [detail, setDetail] = useState({
		title: '',
		subject: '',
		description: '',
		startFrom: 0,
		endAt: 0,
	}); // Title, description, subject
	const handleDetailChange = (e) => setDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	const hanldeStartFrom = (date) => setDetail((prev) => ({ ...prev, startFrom: sinceEpoch(date._d) }));
	const handleEndAt = (date) => setDetail((prev) => ({ ...prev, endAt: sinceEpoch(date._d) }));
	const handleSave = async () => {
		setLoading(true);
		try {
			await Axios.post('http://localhost:8080/api/papers', { ...detail, questions });
		} catch (e) {
			alert('failed to add paper');
		}
		setLoading(false);
	};
	return (
		<div className={classes.root}>
			{loading && <LinearProgress style={{ position: 'fixed', width: '100vw', zIndex: 999 }} color="secondary" />}
			<div className={classes.editorPage}>
				<Box mb={2}>
					<IconButton disabled={loading} onClick={handleSave}>
						<SaveIcon />
					</IconButton>
					<IconButton>
						<UploadIcon />
					</IconButton>
				</Box>
				<div className={classes.header}>
					<Typography variant="body1">Detail</Typography>
					<IconButton color="primary">
						<More />
					</IconButton>
				</div>
				<Box p={2.25}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField onBlur={handleDetailChange} name="title" label="Title" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField onBlur={handleDetailChange} name="subject" label="Subject" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField onBlur={handleDetailChange} name="description" multiline label="Description" fullWidth />
						</Grid>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid item xs={6}>
								<DateTimePicker
									margin="normal"
									id="date-time-picker"
									label="Start from"
									value={detail.startFrom}
									onChange={hanldeStartFrom}
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<DateTimePicker
									margin="normal"
									id="date2-time-picker"
									label="End at"
									value={detail.endAt}
									onChange={handleEndAt}
									fullWidth
								/>
							</Grid>
						</MuiPickersUtilsProvider>
					</Grid>
				</Box>
				<div className={classes.header}>
					<Typography variant="body1">Question</Typography>
					<IconButton color="primary" onClick={() => setOpen(true)}>
						<Add />
					</IconButton>
				</div>
				<Dialog
					open={open}
					TransitionComponent={Slide}
					disableBackdropClick
					onClose={() => setOpen(false)}
					aria-labelledby="alert-dialog-slide-title"
					aria-describedby="alert-dialog-slide-description"
					maxWidth="md"
					fullWidth
					fullScreen={matches}
				>
					<EditorDialog setOpen={setOpen} setQuestions={setQuestions} questions={questions} />
				</Dialog>
				{questions.map((question, i) => (
					<Accordion key={i}>
						<AccordionSummary aria-controls="panel2d-content" expandIcon={<ExpandIcon />}>
							<Typography>Number {i + 1}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Table>
								<TableBody>
									<>
										{['question', 'category', 'key'].map((v, i) => (
											<TableRow key={i}>
												<TableCell>{v.toUpperCase()}</TableCell>
												<TableCell>{question[v]}</TableCell>
											</TableRow>
										))}
										{question.options.map((e, i) => (
											<TableRow key={i}>
												<TableCell>{e.optID.toUpperCase()}</TableCell>
												<TableCell>{e.option}</TableCell>
											</TableRow>
										))}
									</>
								</TableBody>
							</Table>
						</AccordionDetails>
					</Accordion>
				))}
			</div>
		</div>
	);
}

function EditorDialog({ setOpen, setQuestions, questions }) {
	const [question, setQuestion] = useState({
		key: '',
		category: '',
		a: '',
		b: '',
		c: '',
		d: '',
		e: '',
		question: '',
	});
	const [alert, setAlert] = useState(false);
	const questionHandlerChange = (e) => {
		setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handlerAdd = () => {
		for (let k in question) {
			if (!question[k]) return;
		}
		let cooked = {
			question: question.question,
			category: question.category,
			key: question.key,
			options: [
				{ optID: 'a', option: question.a },
				{ optID: 'b', option: question.b },
				{ optID: 'c', option: question.c },
				{ optID: 'd', option: question.d },
				{ optID: 'e', option: question.e },
			],
		};
		setQuestions([...questions, cooked]);
		setOpen(false);
	};
	const handlerDiscard = () => {
		for (let k in question) {
			if (question[k]) return setAlert(true);
		}
		setOpen(false);
	};
	const alertHandler = (dec) => {
		if (dec) {
			setQuestion({});
			setOpen(false);
		}
		setAlert(false);
	};
	const AlertDialog = () => {
		return (
			<Dialog
				open={alert}
				onClose={() => setAlert(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				keepMounted
			>
				<DialogTitle id="alert-dialog-title">Keluar?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">Apa anda yakin tidak akan menyimpan yang anda tulis?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => alertHandler(false)} color="primary">
						No
					</Button>
					<Button onClick={() => alertHandler(true)} color="primary" autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		);
	};

	return (
		<>
			<DialogContent>
				<FormControl fullWidth>
					<Box mt={2}>
						<TextField onBlur={questionHandlerChange} name="question" multiline fullWidth label="Question"></TextField>
					</Box>
					<Box mt={2}>
						<TextField onBlur={questionHandlerChange} name="category" fullWidth label="Category/Sub bab"></TextField>
					</Box>
					<RadioGroup name="key" onChange={questionHandlerChange} value={question.key}>
						{['a', 'b', 'c', 'd', 'e'].map((v, i) => (
							<Box key={i} mt={2} display="flex">
								<Radio value={v} />
								<TextField onBlur={questionHandlerChange} name={v} label={v.toUpperCase()} fullWidth />
							</Box>
						))}
					</RadioGroup>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={handlerDiscard} color="primary">
					Discard
				</Button>
				<Button onClick={handlerAdd} color="primary">
					Add
				</Button>
			</DialogActions>
			<AlertDialog />
		</>
	);
}

export default ExamEditor;
