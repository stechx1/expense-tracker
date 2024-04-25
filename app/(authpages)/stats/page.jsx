/* eslint-disable @next/next/no-img-element */
'use client';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { app, db } from '../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import withAuth from '@/app/HOC/withAuth';
import { StatCard } from '@/app/components/StatCard';
import { CategoryProgress } from '@/app/components/CategoryProgress';
import { DoughnutChartCategory } from '@/app/components/Statistics/DoughnutChartCategory';
import { BarChartAllMonths } from '@/app/components/Statistics/BarChartAllMonths';

const Stats = () => {
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Tooltip,
    Legend
  );
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  const [monthWiseData, setMonthWiseData] = useState();
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  console.log('current user ', currentUser);
  const currentDate = new Date();
  console.log('month wise data ', monthWiseData);

  const handleSubmit = () => {
    console.log('Submitted');
  };

  useEffect(() => {
    const currentYear = monthWiseData
      ? new Date(monthWiseData).getFullYear()
      : currentDate.getFullYear();
    const currentMonth = monthWiseData
      ? new Date(monthWiseData).getFullYear()
      : currentDate.getMonth();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Convert dates to ISO 8601 format
    const currentMonthStart = firstDayOfMonth.toISOString();
    const currentMonthEnd = lastDayOfMonth.toISOString();

    const q = query(
      collection(db, 'users', currentUser?.uid, 'expenses'),
      where('date', '>=', currentMonthStart),
      where('date', '<=', currentMonthEnd)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((item) => {
        const data = item.data();
        console.log('data => ', data);
      });
    });

    return () => unsubscribe();
  }, [monthWiseData]);

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
    ],
  };

  return (
    <main className='container mx-auto '>
      <div className='flex justify-between'>
        <DoughnutChartCategory />
        <BarChartAllMonths />
      </div>

      <div className='grid grid-cols-4 my-10 gap-6'>
        <StatCard name={'Overall Spent'} stat={'23'} />
        <StatCard name={'This Year'} stat={'23'} />
        <StatCard name={'This Month'} stat={'234'} />
        <StatCard name={'This Week'} stat={'34'} />
        <StatCard name={'Today'} stat={'234'} />
        <StatCard textBased name={'Most Spent on'} stat={'234'} />
        <StatCard name={'Most Spent day'} stat={'3423'} textBased />
        <StatCard name={'Least Spent Day'} stat={'wer'} textBased />
      </div>

      <div>
        <div className='grid grid-cols-4 gap-16 shadow-xl my-2 px-4 py-8'>
          <CategoryProgress iconSrc={'/food.svg'} text={'Food'} stat={150} />
          <CategoryProgress
            iconSrc={'/clothes.svg'}
            text={'Clothing'}
            stat={20}
          />
          <CategoryProgress
            iconSrc={'/clothes.svg'}
            text={'Clothing'}
            stat={20}
          />
          <CategoryProgress
            iconSrc={'/clothes.svg'}
            text={'Clothing'}
            stat={20}
          />
        </div>
      </div>
    </main>
  );
};

export default withAuth(Stats);
