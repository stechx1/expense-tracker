'use client';
import { useState } from 'react';
import { Button } from 'antd';
import { StatCard } from './components/StatCard';
import { DataTable } from './components/DataTable';
import { PlusOutlined } from '@ant-design/icons';
import { AddExpenseModal } from './components/AddExpenseModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <main className='container mx-auto'>
      <div className='grid grid-cols-4 my-10 gap-6'>
        <StatCard name={'Overall Spent'} stat={200} />
        <StatCard name={'This Year'} stat={120} />
        <StatCard name={'This Month'} stat={45} />
        <StatCard name={'This Week'} stat={45} />
        <StatCard name={'Today'} stat={45} />
        <StatCard textBased name={'Most Spent on'} stat={'Investment'} />
        <StatCard name={'Most Spent day'} stat={'Saturday'} textBased />
        <StatCard name={'Least Spent Day'} stat={'Friday'} textBased />
      </div>

      <div className='mb-8'>
        <Button onClick={showModal} icon={<PlusOutlined />} type='primary'>
          Add Expense
        </Button>

        <AddExpenseModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>

      <DataTable />
    </main>
  );
}
