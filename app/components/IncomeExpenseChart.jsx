'use client'
import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, scales } from 'chart.js';
import getYearlyTotal from '../customeHooks/getYearlyTotal';
import getYearlyIncome from '../customeHooks/getYearlyIncome';

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);
const IncomeExpenseChart = () => {

    const {allIncome,monthCategory:incomeCat} = getYearlyIncome(new Date())
    const {allExpenses,monthCategory:expCat} = getYearlyTotal(new Date)

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Augest','September','October','November','December'],
        datasets: [
          {
            label: 'Income',
            data: allIncome,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
          {
            label: 'Expense',
            data: allExpenses,
            fill: true,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.1,
          },
        ],
      };
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
  return (

          <div>
               <div className='flex flex-col gap-y-2 items-center justify-center'>
               <div>Income: <span className='h-[5px] w-[20px] bg-[rgb(75, 192, 192)]'></span></div>
                  <div>Expense: <span className='h-3 w-5 bg-[rgb(153, 102, 255)]'></span></div>
               </div>
               <Line data={data} width={'500px'}  />
          </div>
  )
}

export default IncomeExpenseChart