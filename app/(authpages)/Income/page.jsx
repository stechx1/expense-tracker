import AddIncome from '@/app/components/Income/AddIncome'
import IncomeDataTable from '@/app/components/Income/IncomeDataTable'
import TotalIncomCard from '@/app/components/Income/TotalIncomCard'
import React from 'react'

const Income = () => {




  return (
    <div className='container mx-auto overflow-x-hidden py-3 flex flex-col gap-y-5'>
         <TotalIncomCard/>
         <AddIncome/>
         <IncomeDataTable/>
    </div>
  )
}

export default Income