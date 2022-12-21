import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';


//get data from API, set variables and fill into appropriate datafields


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const AnnualPieChart = ({ data }) => {
  const { q1, q2, q3, q4 } = data;
  const totalUnspent = q1.delta + q2.delta + q3.delta + q4.delta
  const totalSpent = q1.obligations + q2.obligations + q3.obligations + q4.obligations

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Total Annual Spending: $${totalSpent}`,
      },
    },
  };

  const display = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Unspent Allocations'],
    datasets: [
      {
        label: 'Total',
        data: [q1.obligations, q2.obligations, q3.obligations, q4.obligations, totalUnspent],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
    return(
        <Pie data={display} options={options}/>
    )
}


export default AnnualPieChart