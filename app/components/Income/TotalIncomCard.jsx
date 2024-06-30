'use client'
import getIncome from '@/app/customeHooks/getIncome'
import React from 'react'

const TotalIncomCard = () => {

  const {totalIncome} = getIncome()
  return (
    <div className='shadow-md px-3 py-4 rounded-lg w-[300px] bg-[rgb(250,250,250)]'>
        <div className='flex flex-col gap-y-2'>
            <h2 className='text-[24px] font-bold'>Total Income</h2>
            <h2 className='text-[24px] font-bold'>{totalIncome == 0  ? '-' : `$${totalIncome}`}</h2>
        </div>
           
    </div>
  )
}

export default TotalIncomCard