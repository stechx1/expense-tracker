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
import { LoanDataTable } from '../../components/LoanDataTable';
import { Button, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import withAuth from '@/app/HOC/withAuth';
import { StatCard } from '@/app/components/StatCard';
import { useState } from 'react';
import { AddLoanModal } from '@/app/components/AddLoanModal';
import getLoandata from '@/app/customeHooks/getLoandata';
const Loan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {loanData,givenLoan,takenLoan} = getLoandata()

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



  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <main className='container mx-auto overflow-x-hidden '>
      <div className='grid grid-cols-4 my-10 gap-6'>
        <StatCard name={'You need to repay'} stat={takenLoan} />
        <StatCard name={'You need to get'} stat={givenLoan} />
      </div>

      <div className='mb-8'>
        <Button onClick={showModal} icon={<PlusOutlined />} type='primary'>
          Add Loan
        </Button>

        <AddLoanModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>

      <div className='my-8'>
        <LoanDataTable
           loanData={loanData}
          
        />
      </div>
    </main>
  );
};

export default withAuth(Loan);
