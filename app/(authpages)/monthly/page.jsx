/* eslint-disable @next/next/no-img-element */
"use client";
import { Flex, Progress } from "antd";

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
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { DataTable } from "../../components/DataTable";
import { StatCardWithIcon } from "../../components/StatCardWithIcon";
import { CategoryCard } from "../../components/CategoryCard";
import { MonthCalendar } from "@/app/components/MonthCalendar";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { ref } from "firebase/storage";
import { app, db } from "../../firebase/firebase";
import { getAuth } from "firebase/auth";
import withAuth from "@/app/HOC/withAuth";
import getMonthlyTotal from "@/app/customeHooks/getMonthlyTotal";

const Monthly = () => {
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
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
 

  const [monthWiseData, setMonthWiseData] = useState();
  
  const [isDateChanged,setIsDateChanged] = useState(false)
  const [monthlyData , setMonthlyData] = useState([])
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const currentDate = new Date();
  const {monthCategory,totalSpent,allExpenses} = getMonthlyTotal(monthWiseData || new Date(),isDateChanged)

  useEffect(() => {
    const currentYear =monthWiseData ? new Date(monthWiseData).getFullYear():currentDate.getFullYear();
    const currentMonth = monthWiseData ?new Date(monthWiseData).getMonth() : currentDate.getMonth();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    // Convert dates to ISO 8601 format
    const currentMonthStart = firstDayOfMonth.toISOString();
    const currentMonthEnd = lastDayOfMonth.toISOString();

    const q = query(
      collection(db, "users", currentUser?.uid, "expenses"),
      where("date", ">=", currentMonthStart),
      where("date", "<=", currentMonthEnd)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expenseData =[]
      snapshot.forEach(doc=>{
        expenseData.push({ id: doc.id, ...doc.data() });
      })

      setMonthlyData(expenseData)
    
    });

    return ()=>unsubscribe()

  }, [monthWiseData,isDateChanged]);

  console.log("monthly data state ",monthlyData)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","126","27","28","29","30"];

  const data = {
    labels,
    datasets: [
      {
        label: "Expense",
        data: allExpenses,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      // {
      //   label: 'Dataset 2',
      //   data: [200, 400, 100, 500],
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  const handleDelete = async (expenseId) => {
    try {
      if (currentUser) {
        const expenseRef = doc(db, 'users', currentUser.uid, 'expenses', expenseId);
        await deleteDoc(expenseRef);
        setMonthlyData(monthlyData?.filter((expense) => expense.id !== expenseId));
      } else {
        console.error('User not authenticated.');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="flex justify-between max-w-[1542px] mx-auto p-1 overflow-x-hidden">
      <div className="w-[30%] h-screen">
        {/* Left side */}
        <div className="flex flex-col gap-6">
          <MonthCalendar setMonthWiseData ={setMonthWiseData} setIsDateChanged ={setIsDateChanged} />

          {/* Stat Card New */}

          <StatCardWithIcon
            iconSrc={"/money-bag.svg"}
            text={"Total Money Spent"}
            stat={totalSpent}
          />

          <CategoryCard cat ={monthCategory} />
        </div>
      </div>
      <div className="w-[70%]">
        <div className="shadow-xl my-2">
          <Line options={options} data={data} />
        </div>

        <div className="my-8">
          <DataTable expenses={monthlyData} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Monthly);
