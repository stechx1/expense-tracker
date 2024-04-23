/* eslint-disable @next/next/no-img-element */
'use client';
import { DatePicker } from 'antd';
import { DataTable } from '../../components/DataTable';
import { StatCardWithIcon } from '../../components/StatCardWithIcon';
import { CategoryCard } from '../../components/CategoryCard';
import { MonthCalendar } from '@/app/components/MonthCalendar';
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
  const [monthWiseData, setMonthWiseData] = useState();
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  console.log('current user ', currentUser);
  const currentDate = new Date();
  console.log('month wise data ', monthWiseData);

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className='flex justify-between max-w-[1542px] mx-auto p-1'>
      <div className='w-[30%] h-screen'>
        {/* Left side */}
        <div className='flex flex-col gap-6 my-4'>
            <DatePicker onChange={onDateChange} />

          {/* Stat Card New */}

          <StatCardWithIcon
            iconSrc={'/money-bag.svg'}
            text={'Total Money Spent'}
            stat={150}
          />

          <CategoryCard />
        </div>
      </div>
      <div className='w-[70%]'>
        <div className='shadow-xl my-2'>
          <DoughnutChart />
        </div>

        <div className='my-8'>
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Daily);
