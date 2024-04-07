'use client';
import React from 'react';
import { MonthCalendar } from '../components/MonthCalendar';
import { StatCard } from '../components/StatCard';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

const Monthly = () => {
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Expense',
        data: [0, 0, 500, 0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: [200, 400, 100, 500],
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  return (
    <div className='flex justify-between'>
      <div className='w-[30%] h-screen'>
        {/* Left side */}
        <div className='flex flex-col gap-6'>
          <MonthCalendar />
          <StatCard name='Total Money Spent' stat={190} />
          <div>Each Category</div>
        </div>
      </div>

      <div className='w-[70%]'>
        {/* Right Side */}
        <Line options={options} data={data} />
        <div className='w-[40%]'>
          <Doughnut options={options} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Monthly;
