'use client';
import React from 'react';
import { MonthCalendar } from '../components/MonthCalendar';
import { StatCard } from '../components/StatCard';
{
}

const Monthly = () => {
  return (
    <div className='flex justify-between'>
      <div className='w-[30%] h-screen'>
        {/* Left side */}
        <div className='flex flex-col gap-6'>
          <MonthCalendar />
          <StatCard name='Total Money Spent' stat={190} />
          <div>Each Category</div>
        </div>
      </div>

      <div className='w-[70%]'>{/* Right Side */}</div>
    </div>
  );
};

export default Monthly;
