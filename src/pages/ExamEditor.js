import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
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
import Alarm from '@material-ui/icons/AlarmAddRounded';
import More from '@material-ui/icons/MoreVertRounded';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
	DialogTitle,
	DialogContentText,
	RadioGroup,
	FormControl,
	Paper,
	TableContainer,
	TableHead,
	TableRow,
	Table,
	TableCell,
	TableBody,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		height: window.innerHeight,
		background: theme.palette.primary.light,
	},
	editorPage: {
		margin: '0 auto',
		width: '100%',
		maxWidth: 960,
		background: '#fff',
		height: '100%',
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
	editor: {},
	headerEditor: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

function ExamEditor() {
	const classes = useStyles();
	const matches = useMediaQuery('(max-width:960px)');
	const [open, setOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
	const [questions, setQuestions] = useState([]);
	const handleDateChange = (date) => {
		setSelectedDate(date);
	};

	useEffect(() => {
		console.log(questions);
	}, [questions]);

	return (
		<div className={classes.root}>
			<div className={classes.editorPage}>
				<div className={classes.header}>
					<Typography variant="body1">Detail</Typography>
					<IconButton color="primary">
						<More />
					</IconButton>
				</div>
				<Box p={2.25}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField label="Title" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField label="Subject" fullWidth />
						</Grid>
						<Grid item xs={12}>
							<TextField multiline label="Description" fullWidth />
						</Grid>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid item xs={12} sm={4}>
								<KeyboardDatePicker
									margin="normal"
									id="date-picker-dialog"
									label="Date"
									format="MM/dd/yyyy"
									value={selectedDate}
									onChange={handleDateChange}
									fullWidth
									KeyboardButtonProps={{
										'aria-label': 'choose date',
									}}
								/>
							</Grid>
							<Grid item xs={6} sm={4}>
								<KeyboardTimePicker
									margin="normal"
									id="time-picker"
									label="Start from"
									value={selectedDate}
									onChange={handleDateChange}
									fullWidth
									KeyboardButtonProps={{
										'aria-label': 'choose start time',
									}}
									keyboardIcon={<Alarm />}
								/>
							</Grid>
							<Grid item xs={6} sm={4}>
								<KeyboardTimePicker
									margin="normal"
									id="time-picker"
									label="End at"
									value={selectedDate}
									onChange={handleDateChange}
									fullWidth
									KeyboardButtonProps={{
										'aria-label': 'choose end time',
									}}
									keyboardIcon={<Alarm />}
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
					TransitionComponent={Transition}
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
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Question</TableCell>
								<TableCell align="left">Category</TableCell>
								<TableCell align="left">Option A</TableCell>
								<TableCell align="left">Option B</TableCell>
								<TableCell align="left">Option C</TableCell>
								<TableCell align="left">Option D</TableCell>
								<TableCell align="left">Option E</TableCell>
								<TableCell align="left">Key</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{questions.map((row, i) => (
								<TableRow key={i}>
									<TableCell component="th" scope="row">
										{row.question}
									</TableCell>
									<TableCell align="left">{row.category}</TableCell>
									<TableCell align="left">{row.optionA}</TableCell>
									<TableCell align="left">{row.optionB}</TableCell>
									<TableCell align="left">{row.optionC}</TableCell>
									<TableCell align="left">{row.optionD}</TableCell>
									<TableCell align="left">{row.optionE}</TableCell>
									<TableCell align="left">{row.key}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				{/* {questions.map((question, i) => (

				))} */}
			</div>
		</div>
	);
}

function EditorDialog({ setOpen, setQuestions, questions }) {
	const [question, setQuestion] = useState({ key: '' });
	const [alert, setAlert] = useState(false);
	const questionHandlerChange = (e) => {
		console.log(e.target.value)
		setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	const handlerAdd = () => {
		for (let k in question) {
			if (!question[k]) return
		}
		setQuestions([...questions, question]);
		setOpen(false);
		console.log(question);
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
				<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Let Google help apps determine location. This means sending anonymous location data to Google,
						even when no apps are running.
					</DialogContentText>
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
				<Box mt={2}>
					<TextField
						onBlur={questionHandlerChange}
						name="question"
						multiline
						fullWidth
						label="Question"
					></TextField>
				</Box>
				<Box mt={2}>
					<TextField
						onBlur={questionHandlerChange}
						name="category"
						fullWidth
						label="Category/Sub bab"
					></TextField>
				</Box>
				<FormControl fullWidth>
					<RadioGroup name="key" onChange={questionHandlerChange} value={question.key}>
						<Box mt={2} display="flex">
							<Radio value="optionA" />
							<TextField onBlur={questionHandlerChange} name="optionA" label="A" fullWidth />
						</Box>
						<Box mt={2} display="flex">
							<Radio value="optionB" />
							<TextField onBlur={questionHandlerChange} name="optionB" label="B" fullWidth />
						</Box>
						<Box mt={2} display="flex">
							<Radio value="optionC" />
							<TextField onBlur={questionHandlerChange} name="optionC" label="C" fullWidth />
						</Box>
						<Box mt={2} display="flex">
							<Radio value="optionD" />
							<TextField onBlur={questionHandlerChange} name="optionD" label="D" fullWidth />
						</Box>
						<Box mt={2} display="flex">
							<Radio value="optionE" />
							<TextField onBlur={questionHandlerChange} name="optionE" label="E" fullWidth />
						</Box>
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
