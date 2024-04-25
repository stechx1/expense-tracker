/* eslint-disable @next/next/no-img-element */
'use client';
import { DatePicker } from 'antd';
import { DataTable } from '../../components/DataTable';
import { StatCardWithIcon } from '../../components/StatCardWithIcon';
import { CategoryCard } from '../../components/CategoryCard';
import { useEffect, useState } from 'react';
import { app, db } from '../../firebase/firebase';
import { getAuth } from 'firebase/auth';
import withAuth from '@/app/HOC/withAuth';
import { DoughnutChart } from '@/app/components/DoughnutChart';
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
import getDayWiseTotal from '@/app/customeHooks/getDayWiseTotal';
import { deleteDoc, doc } from 'firebase/firestore';

const Daily = () => {
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
  const [dayWiseDate, setDayWiseDate] = useState(null);
  const [isDayChanged,setIsDayChanged] = useState(false)
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const currentDate = new Date().toISOString();
  const getDate = (dayWiseDate == '' || !dayWiseDate) ? currentDate:new Date(dayWiseDate).toISOString()
   const {currentDayTotal,dayData,categoryPrice,chartData,chartKey} =getDayWiseTotal(getDate,isDayChanged)
   const zerosArray = Array(1).fill(0);
   
  
  const onDateChange = (date, dateString) => {
    console.log(new Date(date).toISOString);
    setDayWiseDate(date)
    setIsDayChanged(pre=>!pre)
  };

  const handleDelete = async (expenseId) => {
    
    try {
      if (currentUser && expenseId) {
        const expenseRef = doc(db, 'users', currentUser.uid, 'expenses', expenseId);
        await deleteDoc(expenseRef);
        //setMonthlyData(monthlyData?.filter((expense) => expense.id !== expenseId));
      } else {
        console.error('User not authenticated.');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <main className='container mx-auto '>
      <div className='flex justify-between  p-1'>
        <div className='w-[30%]  shadow-xl px-3 '>
          {/* Left side */}
          <div className='flex flex-col gap-6 my-4'>
            <DatePicker  onChange={onDateChange} />

            {/* Stat Card New */}

            <StatCardWithIcon
              iconSrc={'/money-bag.svg'}
              text={'Total Money Spent'}
              stat={currentDayTotal}
            />

            <CategoryCard cat={categoryPrice}  />
          </div>
        </div>
        <div className='max-w-[768px] w-[100%] h-[300px] mx-auto'>
          <div className='shadow-xl my-2 w-[100%] flex items-center justify-center'>
           {chartData?.length>0 ?<DoughnutChart chartData={chartData } chartKey={chartKey} />:
           <div className='h-[300px] max-w-[768px] w-[100%] flex items-center justify-center'><h3>No Data available yet</h3></div>
           }
          </div>

          <div className='my-8'>
            <DataTable expenses={dayData} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(Daily);