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
import getYearlyTotal from '@/app/customeHooks/getYearlyTotal';
import getTotalExpenses from '@/app/customeHooks/getTotalExpenses';
import getMonthlyTotal from '@/app/customeHooks/getMonthlyTotal';
import getCurrentMonthTotal from '@/app/customeHooks/getCurrentMonthTotal';
import getCurrentWeekTotal from '@/app/customeHooks/getCurrentWeekTotal';
import getCurrentDayTotal from '@/app/customeHooks/getCurrentDayTotal';
import getMostFrquestCategory from '@/app/customeHooks/getMostFrquestCategory';
import getMostSpentDay from '@/app/customeHooks/getMostSpentDay';
import getLeastDaySpent from '@/app/customeHooks/getLeastDaySpent';

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

  const [monthWiseData, setMonthWiseData] = useState(null);
  const [yearData , setYearlyData] = useState([])
  const [isDateChanged,setIsDateChanged] = useState(false)
  const [yearlyWiseData,setYearlyWiseData] = useState()
  
  const {allExpenses,monthCategory,yearlySpent,frequentCategory,yearlyLessSpent,yearlyMostSpent} = getYearlyTotal(monthWiseData || new Date(),isDateChanged)
  const {totalSpent} = getTotalExpenses()
  const {allExpenses:currentMonthExp} =  getCurrentMonthTotal()
  const {currentWeekTotal} = getCurrentWeekTotal()
  const {currentDayTotal} = getCurrentDayTotal()
  
  
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  

  const handleSubmit = () => {
    console.log('Submitted');
  };


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
        
        <BarChartAllMonths chartData ={allExpenses} setDate ={setMonthWiseData} setIsDateChanged={setIsDateChanged} />
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 my-10 gap-6'>
        <StatCard name={'Overall Spent'} stat={totalSpent} />
        <StatCard name={'This Year'} stat={yearlySpent} />
        <StatCard name={'This Month'} stat={currentMonthExp} />
        <StatCard name={'This Week'} stat={currentWeekTotal} />
        <StatCard name={'Today'} stat={currentDayTotal} />
        <StatCard textBased name={'Most Spent on'} stat={frequentCategory} />
        <StatCard name={'Most Spent day'} stat={yearlyMostSpent} textBased />
        <StatCard name={'Least Spent Day'} stat={yearlyLessSpent} textBased />
      </div>

      <div>
        <div className='grid grid-cols-4 gap-16 shadow-xl my-2 px-4 py-8'>
          
         {Object?.keys(monthCategory)?.map(item=>(
          <CategoryProgress
           
            text={item}
            stat={monthCategory[item]}
          />
         )) }
          
          
        </div>
      </div>
    </main>
  );
};

export default withAuth(Stats);
