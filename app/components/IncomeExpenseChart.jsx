"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  scales,
} from "chart.js";
import getYearlyTotal from "../customeHooks/getYearlyTotal";
import getYearlyIncome from "../customeHooks/getYearlyIncome";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);
const IncomeExpenseChart = () => {
  const { allIncome, monthCategory: incomeCat } = getYearlyIncome(new Date());
  const { allExpenses, monthCategory: expCat } = getYearlyTotal(new Date());

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Augest",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Income",
        data: allIncome,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Expense",
        data: allExpenses,
        fill: true,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
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
    <div className='border-t-[1px] border-gray-100 py-4' >
      
      <Line data={data} width={'500px'}  />
      <div className="flex gap-x-2 my-2 items-center justify-center" >
          <div className="p-1 bg-[#4BC0C0] ">Income</div>
          <div className="p-1 bg-[#9966FF] ">Expense</div>
      </div>
    </div>
  );
};

export default IncomeExpenseChart;
