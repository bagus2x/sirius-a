import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart(props) {
    let data = {
        labels: ['Correct', 'Incorrect', 'Blank'],
        datasets: [{
            label: '# of Votes',
            data: props.data,
            backgroundColor: [
                'rgba(54, 162, 235, .5)',
                'rgba(255, 99, 132, .5)',
                'rgba(255, 206, 86, .5)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    }
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
    };

    return <Doughnut options={options} data={data} />
}

export default DoughnutChart;