"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Pagination } from "antd";
import {
  FileExcelOutlined,
  PlusOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { StatCard } from "../components/StatCard";
import { AddExpenseModal } from "../components/AddExpenseModal";
import { DataTable } from "../components/DataTable";
import withAuth from "../HOC/withAuth";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  limit,
  startAfter,
  orderBy,
  getDoc,
  getDocs,
  startAt,
  endAt,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app, db } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import getTotalExpenses from "../customeHooks/getTotalExpenses";
import getCurrentYearTotal from "../customeHooks/getCurrentYearTotal";
import getCurrentMonthTotal from "../customeHooks/getCurrentMonthTotal";
import getCurrentWeekTotal from "../customeHooks/getCurrentWeekTotal";
import getCurrentDayTotal from "../customeHooks/getCurrentDayTotal";

import getMostFrquestCategory from "../customeHooks/getMostFrquestCategory";
import getMostSpentDay from "../customeHooks/getMostSpentDay";
import getLeastDaySpent from "../customeHooks/getLeastDaySpent";
import useUpdateDoc from "../customeHooks/useUpdateDoc";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { printDiv } from "../utils/printData";
import ExportAsExcel from "../components/ExportAsExcel";
import useResponsive from "../customeHooks/useResponsive";
import getIncome from "../customeHooks/getIncome";
import AddIncome from "../components/Income/AddIncome";
import IncomeDataTable from "../components/Income/IncomeDataTable";
import TotalIncomCard from "../components/Income/TotalIncomCard";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { totalSpent,totalIncome:getTotalIncome } = getTotalExpenses();
  const { currentYearTotal } = getCurrentYearTotal();
  const { allExpenses } = getCurrentMonthTotal();
  const { currentWeekTotal } = getCurrentWeekTotal();
  const { currentDayTotal } = getCurrentDayTotal();
  const { categorizedData } = getMostFrquestCategory();
  const { mostSpentDay } = getMostSpentDay();
  const { leastDaySpent } = getLeastDaySpent();
  const [tableTab,setTableTab] = useState(1)
  const tableRef = useRef(null);
  const {width} = useResponsive()
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const [expenses, setExpenses] = useState([]);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const limitPerPage = 2;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      if (currentUser) {
        const expensesRef = collection(
          db,
          "users",
          currentUser.uid,
          "expenses"
        );

        let q = query(expensesRef, orderBy("createdAt", "desc"));

        // if (lastVisible) {
        //   q = query(expensesRef, orderBy('date'), start(lastVisible), limit(limitPerPage));
        // }

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const expenseData = [];
          snapshot.forEach((doc) => {
            expenseData.push({ id: doc.id, ...doc.data() });
          });
          setExpenses(expenseData);
        });

        return () => unsubscribe(); // Clean up the snapshot listener
      } else {
        console.error("User not authenticated.");
      }
    };

    fetchExpenses();
  }, [page]);

  console.log("expenses => ", expenses);

  const handleDelete = async (expenseId) => {
    try {
      if (currentUser) {
        const expenseRef = doc(
          db,
          "users",
          currentUser.uid,
          "expenses",
          expenseId
        );
        await deleteDoc(expenseRef);
        setExpenses(expenses.filter((expense) => expense.id !== expenseId));
      } else {
        console.error("User not authenticated.");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const {totalIncome} = getIncome()
 
  return (
    <main className="container mx-auto overflow-x-hidden  " id="divToPrint">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 my-10 gap-6">
                 <StatCard name={'Over all Spent'} stat={totalIncome - totalSpent} />
                 <StatCard name={'Over all Income'} stat={totalIncome} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 my-10 gap-6">
        <StatCard name={"Overall Expense"} stat={ totalSpent} />
        <StatCard name={"This Year"} stat={currentYearTotal} />
        <StatCard name={"This Month"} stat={allExpenses} />
        <StatCard name={"This Week"} stat={currentWeekTotal} />
        <StatCard name={"Today"} stat={currentDayTotal} />
        <StatCard textBased name={"Most Spent on"} stat={categorizedData} />
        <StatCard name={"Most Spent day"} stat={mostSpentDay} textBased />
        <StatCard name={"Least Spent Day"} stat={leastDaySpent} textBased />
      </div>

      <div className="mb-8 flex items-center justify-between mx-1">
        <div className="flex items-center gap-x-2">
          <Button onClick={showModal} icon={<PlusOutlined />} type="primary">
          {width > 768 && <span>Add Expense</span> }
        </Button>
        <AddIncome />
        </div>
        
        <div className="flex items-center gap-x-2">
          <Button
            icon={<PrinterOutlined />}
            style={{ backgroundColor: "#FF5733", color: "white" }}
            onClick={()=>printDiv("divToPrint")}
          >
            {width > 768 && <span className="hidden sm:block" >print</span>}
          </Button>
           <ExportAsExcel tableRef={tableRef} />
        </div>
      </div>

      <AddExpenseModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
     {<div ref={tableRef} className="mt-4">
        <div className="flex items-center gap-x-2 my-2">
              <Button  style={{backgroundColor:tableTab == 1 ? '#7CB9E8' :'#F0F8FF',color:'black'}} onClick={()=>setTableTab(1)}>Expense</Button>
              <Button style={{backgroundColor:tableTab == 2 ? '#7CB9E8' :'#F0F8FF',color:'black'}} onClick={()=>setTableTab(2)}>Income</Button>
        </div>
       {tableTab == 1 && <DataTable
          
          expenses={expenses}
          total={total}
          handleDelete={handleDelete}
        />}
        {
           tableTab == 2 && <IncomeDataTable />
        }
      </div>}
    </main>
  );
}

export default withAuth(Home);
