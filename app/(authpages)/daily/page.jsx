/* eslint-disable @next/next/no-img-element */
'use client';
import { Button, DatePicker } from 'antd';
import { DataTable } from '../../components/DataTable';
import { StatCardWithIcon } from '../../components/StatCardWithIcon';
import { CategoryCard } from '../../components/CategoryCard';
import { useEffect, useRef, useState } from 'react';
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
import ExportAsExcel from '@/app/components/ExportAsExcel';
import { PrinterOutlined } from '@ant-design/icons';
import { printDiv } from '@/app/utils/printData';
import useResponsive from '@/app/customeHooks/useResponsive';

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
  const tableRef = useRef()
  const {width} = useResponsive()
   
  
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
    <main className='container mx-auto ' id='divToPrint'>
      <div className='flex flex-col lg:flex-row md:justify-between  p-1 gap-1'>
        <div className='w-[100%] lg:w-[30%]  border-[1px] px-3 '>
          {/* Left side */}
          <div className='flex flex-col gap-6 my-4 w-full'>
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
        <div className='max-w-[768px] w-[100%] mx-auto'>
          <div className='border-[1px]  my-2 w-[100%] flex items-center justify-center'>
           {chartData?.length>0 ?<DoughnutChart chartData={chartData } chartKey={chartKey} />:
           <div className='h-[300px] max-w-[768px] w-[100%] flex items-center justify-center'><h3>No Data available yet</h3></div>
           }
          </div>
          <div className="flex items-center justify-end gap-x-2 my-2">
          <Button
            icon={<PrinterOutlined />}
            style={{ backgroundColor: "#FF5733", color: "white" }}
            onClick={()=>printDiv("divToPrint")}
          >
            {width > 768 && <span>Print</span>}
          </Button>
           <ExportAsExcel tableRef={tableRef} />
        </div>
          <div className='my-8' ref={tableRef}>
            <DataTable expenses={dayData} handleDelete={handleDelete} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(Daily);
