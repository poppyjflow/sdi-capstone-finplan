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
    },
  },
  // maintainAspectRatio: false
};

const labels = ['Q1', 'Q2', 'Q3', 'Q4'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total Spending',
      data: [750, 3000, 1500, 5000],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Total Allocation',
      data: [1000, 4000, 2000, 5000],
      backgroundColor: 'rgba(81, 122, 235, 0.5)',
    },
  ],
};

export function QuarterlyBarChart() {
  return <Bar
  options={options}
  data={data}
  // height={"100%"}
  // width={'400%'}
  />;
}