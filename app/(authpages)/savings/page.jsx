'use client';
import { useState } from 'react';
import { SavingCard } from '@/app/components/SavingCard';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import withAuth from '../../HOC/withAuth';
import { AddSavingsModal } from '@/app/components/AddSavingsModal';

function Savings() {
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
    <main className='container mx-auto '>
      <div className='my-6'>
        <Button onClick={showModal} icon={<PlusOutlined />} type='primary'>
          Add Savings
        </Button>

        <AddSavingsModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>
      <div className='grid grid-cols-4 gap-6 my-6'>
        <SavingCard />
        <SavingCard />
        <SavingCard />
        <SavingCard />
      </div>
    </main>
  );
}

export default withAuth(Savings);
