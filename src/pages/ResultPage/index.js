import React, { useState, useEffect, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoughnutChart from './DoughnutChart';
import StackChart from './StackChart';
import AlerttDialog from '../../components/AlertDialog';
import Axios from 'axios';
import parse from 'html-react-parser';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		padding: `${theme.spacing(5)}px ${theme.spacing(15)}px`,
		overflowX: 'hidden',
	},
	bar: {
		height: 40,
		background: theme.palette.grey[800],
		marginBottom: 40,
		color: '#fff',
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
		borderRadius: theme.spacing(0.5),
	},
	solution: {
		background: theme.palette.grey[50],
		textAlign: 'justify',
		padding: theme.spacing(2),
		borderRadius: `0 ${theme.spacing(2)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`,
		marginBottom: theme.spacing(2),
	},
	[theme.breakpoints.down('md')]: {
		root: {
			padding: `${theme.spacing(5)}px ${theme.spacing(5)}px`,
		},
	},
	[theme.breakpoints.down('xs')]: {
		root: {
			padding: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
		},
	},
}));

function ResultPage() {
	const classes = useStyles();
	const match = useRouteMatch();
	const [dataResult, setDataResult] = useState({});
	const [dataDoughnut, setDataDoughnut] = useState([]);
	const [dataStack, setDataStack] = useState({ labels: [], correct: [], incorrect: [], blank: [] });
	const [open, setOpen] = useState(false);
	const [errorWithAlert, setErrorWithAlert] = useState({ message: '', title: '' });
	const handleClose = useCallback(() => setOpen(false), []);
	const urlParams = new URLSearchParams(window.location.search);
	const resid = urlParams.get('resid');
	useEffect(() => {
		const getExamResult = async () => {
			try {
				let res = await Axios.get(`https://sirius-b.herokuapp.com/api/exam-result/${match.params.id}?resid=${resid}`);
				setDataResult(res.data.result);
			} catch (err) {
				if (err.response) {
					setErrorWithAlert({ title: err.response.statusText, message: err.response.data.message });
				} else {
					setErrorWithAlert({ message: err.toString() });
				}
				setOpen(true);
			}
		};
		getExamResult();
	}, [match.params.id, resid]);
	useEffect(() => {
		if (Object.keys(dataResult).length === 0) return;
		let dough = [dataResult.result.overall.correct, dataResult.result.overall.incorrect, dataResult.result.overall.blank];
		let stack = {
			labels: dataResult.result.categories.map((v) => v.label),
			correct: dataResult.result.categories.map((v) => v.correct),
			incorrect: dataResult.result.categories.map((v) => v.incorrect),
			blank: dataResult.result.categories.map((v) => v.blank),
		};
		setDataDoughnut(dough);
		setDataStack(stack);
	}, [dataResult]);
	return Object.keys(dataResult).length !== 0 ? (
		<div className={classes.root}>
			<Box mb={5} display="flex">
				<Typography variant="h4">Analisis Hasil</Typography>
			</Box>
			<Typography variant="caption">Nama: {localStorage.getItem('username')}</Typography>
			<Grid spacing={4} container>
				<Grid item xs={12} md={6}>
					<Box className={classes.bar}>
						<Typography variant="h6">KESELURUHAN</Typography>
					</Box>
					<DoughnutChart data={dataDoughnut} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Box className={classes.bar}>
						<Typography variant="h6">BERDASAR KATEGORI</Typography>
					</Box>
					<StackChart data={dataStack} />
				</Grid>
				<Grid item xs={12}>
					<Box mt={2} className={classes.bar}>
						<Typography variant="h6">PEMBAHASAN</Typography>
					</Box>
					<Box>
						{dataResult.questions?.map((v, i) => (
							<Box key={i} mt={2} mb={2}>
								<FormControl key={i} error={v.selected !== v.key && v.selected !== ''} component="fieldset">
									<Box fontSize="1rem" component="legend">
										{i + 1}. {parse(v.question)}
									</Box>
									<RadioGroup value={v.selected}>
										{v.options.map((v2, i2) => (
											<FormControlLabel
												style={{ marginBottom: 10 }}
												key={i2}
												value={v2.optID}
												control={<Radio color="primary" />}
												label={v2.option}
											/>
										))}
									</RadioGroup>
									{v.selected !== v.key || v.selected === '' ? (
										<FormHelperText>Jawaban yang benar adalah {v.key}</FormHelperText>
									) : (
										''
									)}
								</FormControl>
								{v.solution && (
									<Box className={classes.solution}>
										{parse(v.solution)}
									</Box>
								)}
								<Divider />
							</Box>
						))}
					</Box>
				</Grid>
			</Grid>
			<AlerttDialog open={open} handleClose={handleClose} btnYes="Tutup" message={errorWithAlert?.message} title={errorWithAlert?.title} />
		</div>
	) : (
		<Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
			<CircularProgress color="primary" />
		</Box>
	);
}

export default ResultPage;
