import React, { useState } from 'react';
import {
	Grid,
	makeStyles,
	Typography,
	Box,
	Divider,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	FormLabel,
	FormHelperText,
} from '@material-ui/core';
import DoughnutChart from './DoughnutChart';
import StackChart from './StackChart';
import { useRouteMatch } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		padding: `${theme.spacing(5)}px ${theme.spacing(15)}px`,
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
	const urlParams = new URLSearchParams(window.location.search);
	const resid = urlParams.get('resid');
	useEffect(() => {
		const getExamResult = async () => {
			try {
				let res = await Axios.get(`http://localhost:8080/api/exam-result/${match.params.id}?resid=${resid}`);
				setDataResult(res.data.result);
			} catch (err) {
				console.log(err);
			}
		};
		getExamResult();
	}, [match.params.id, resid]);
	useEffect(() => {
		console.log(dataResult.questions);
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
	return (
		<div className={classes.root}>
			<Box mb={5} display="flex">
				<Typography variant="h4">Analisis Hasil</Typography>
			</Box>
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
						<Box>
							{dataResult.questions?.map((v, i) => (
								<Box mt={2} mb={2}>
									<FormControl key={i} error={v.selected !== v.key && v.selected !== ''} component="fieldset">
										<Typography component="legend">{i + 1}. {v.question}</Typography>
										<RadioGroup value={v.selected}>
											{v.options.map((v2, i2) => (
												<FormControlLabel key={i2} value={v2.optID} control={<Radio color="primary" />} label={v2.option} />
											))}
										</RadioGroup>
										{v.selected !== v.key && v.selected !== '' && (
											<FormHelperText>Jawaban yang benar adalah {v.key}</FormHelperText>
										)}
									</FormControl>
								</Box>
							))}
						</Box>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
}

export default ResultPage;