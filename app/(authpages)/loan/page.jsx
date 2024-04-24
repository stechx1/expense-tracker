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
const Loan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <main className='container mx-auto '>
      <div className='grid grid-cols-4 my-10 gap-6'>
        <StatCard name={'You need to repay'} stat={'0'} />
        <StatCard name={'You need to get'} stat={'200'} />
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
          // expenses={expenses}
          // total={total}
          handleDelete={() => ''}
        />
      </div>
    </main>
  );
};

export default withAuth(Loan);
