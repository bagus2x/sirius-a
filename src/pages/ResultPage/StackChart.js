import React from 'react';
import { Bar } from 'react-chartjs-2';

let options = {
	tooltips: {
		mode: 'point',
		intersect: false,
	},
	responsive: true,
	legend: {
		position: 'bottom',
	},
	maintainAspectRatio: true,
	scales: {
		xAxes: [
			{
				stacked: true,
			},
		],
		yAxes: [
			{
				ticks: {
					beginAtZero: true,
					userCallback: function (label, index, labels) {
						// when the floored value is the same as the value we have a whole number
						if (Math.floor(label) === label) {
							return label;
						}
					},
				},
				stacked: false,
			},
		],
	},
};

function StackChart(props) {
	const arbitraryStackKey = 'stack1';
	const data = {
		labels: props.data.labels,
		datasets: [
			{
				stack: arbitraryStackKey,
				label: 'Correct',
				data: props.data.correct,
				backgroundColor: 'rgba(54, 162, 235, .5)',
			},
			{
				stack: arbitraryStackKey,
				label: 'Incorrect',
				data: props.data.incorrect,
				backgroundColor: 'rgba(255, 99, 132, .5)',
			},
			{
				stack: arbitraryStackKey,
				label: 'Blank',
				data: props.data.blank,
				backgroundColor: 'rgba(255, 206, 86, .5)',
			},
		],
	};
	return <Bar data={data} options={options} />;
}

export default StackChart;
