import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,

  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Spending by Quarter',
      font: {
        size: 20
      }
    },
  },
};

const labels = ['Q1', 'Q2', 'Q3', 'Q4'];


export function QuarterlyBarChart({data}) {
  const { q1, q2, q3, q4} = data

  const display = {
    labels,
    datasets: [
      {
        label: 'Total Spending',
        data: data ? [q1.obligations, q2.obligations, q3.obligations, q4.obligations] : [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total Allocation',
        data: data ? [q1.allocations, q2.allocations, q3.allocations, q4.allocations] : [],
        backgroundColor: 'rgba(81, 122, 235, 0.5)',
      },
    ],
  };
  return (
  <>
  {data ?
    <Bar
    options={options}
    data={display}
    />
  :
  <p>Loading...</p>
  }
  </>
  )
}