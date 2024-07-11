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
import { DoughnutChart } from '@/app/components/DoughnutChart';
import getYearlyIncome from '@/app/customeHooks/getYearlyIncome';
import { Button } from 'antd';

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
 

  const [monthWiseData, setMonthWiseData] = useState(null);
  const [isDateChanged,setIsDateChanged] = useState(false)
  
  const {allExpenses,monthCategory,yearlySpent,frequentCategory,yearlyLessSpent,yearlyMostSpent,chartData,chartKey,incomeChart,incomeKey} = getYearlyTotal(monthWiseData || new Date(),isDateChanged)
  const { allIncome, } = getYearlyIncome(monthWiseData || new Date(),isDateChanged);
  const {totalSpent} = getTotalExpenses()
  const {allExpenses:currentMonthExp} =  getCurrentMonthTotal()
  const {currentWeekTotal} = getCurrentWeekTotal()
  const {currentDayTotal} = getCurrentDayTotal()
  const [tableTab,setTableTab] = useState(1)
  
  
  console.log("month categoyr for stats ==>",monthCategory)
  
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
    'Augest',
    'september',
    'October',
    'November',
    'December'
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
      <div className='flex flex-col-reverse lg:flex-row justify-between items-center'>
      <div className='flex flex-col gap-y-3'>
      <div className="flex items-center gap-x-2 my-2">
              <Button  style={{backgroundColor:tableTab == 1 ? '#7CB9E8' :'#F0F8FF',color:'black'}} onClick={()=>setTableTab(1)}>Expense</Button>
              <Button style={{backgroundColor:tableTab == 2 ? '#7CB9E8' :'#F0F8FF',color:'black'}} onClick={()=>setTableTab(2)}>Income</Button>
        </div>
        <div className='max-w-[450px] w-[100%]'><DoughnutChart chartData={tableTab == 1 ? chartData : incomeChart} chartKey={tableTab ==1 ? chartKey : incomeKey} /></div> 
        </div>
        <div className='w-[100%] ' >
          {<BarChartAllMonths chartData ={allExpenses} allIncome={allIncome} setDate ={setMonthWiseData} setIsDateChanged={setIsDateChanged} />}
        </div>
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
