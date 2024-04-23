'use client';
import { useEffect, useState } from 'react';
import { Button, Pagination } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { StatCard } from '../components/StatCard';
import { AddExpenseModal } from '../components/AddExpenseModal';
import { DataTable } from '../components/DataTable';
import withAuth from '../HOC/withAuth';
import { collection, query, where, onSnapshot, doc, deleteDoc, limit, startAfter, orderBy, getDoc, getDocs, startAt, endAt } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import getTotalExpenses from '../customeHooks/getTotalExpenses';
import getCurrentYearTotal from '../customeHooks/getCurrentYearTotal';
import getCurrentMonthTotal from '../customeHooks/getCurrentMonthTotal';
import getCurrentWeekTotal from '../customeHooks/getCurrentWeekTotal';
import getCurrentDayTotal from '../customeHooks/getCurrentDayTotal';

import getMostFrquestCategory from '../customeHooks/getMostFrquestCategory';
import getMostSpentDay from '../customeHooks/getMostSpentDay';
import getLeastDaySpent from '../customeHooks/getLeastDaySpent';
import useUpdateDoc from '../customeHooks/useUpdateDoc';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {totalSpent} = getTotalExpenses()
  const {currentYearTotal}=getCurrentYearTotal()
  const {currentMonthTotal} = getCurrentMonthTotal()
  const {currentWeekTotal} = getCurrentWeekTotal()
  const {currentDayTotal} = getCurrentDayTotal()
  const {categorizedData} = getMostFrquestCategory()
  const {mostSpentDay} =getMostSpentDay()
  const {leastDaySpent} = getLeastDaySpent()
 
  
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
        const expensesRef = collection(db, 'users', currentUser.uid, 'expenses');
        
        
        let q = query(expensesRef,orderBy('createdAt','desc'));

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
        console.error('User not authenticated.');
      }
    };

    fetchExpenses();
  }, [page]);

  console.log("expenses => ",expenses)



  const handleDelete = async (expenseId) => {
    try {
      if (currentUser) {
        const expenseRef = doc(db, 'users', currentUser.uid, 'expenses', expenseId);
        await deleteDoc(expenseRef);
        setExpenses(expenses.filter((expense) => expense.id !== expenseId));
      } else {
        console.error('User not authenticated.');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };


  return (
    <main className='container mx-auto '>
      <div className='grid grid-cols-4 my-10 gap-6'>
        <StatCard name={'Overall Spent'} stat={totalSpent} />
        <StatCard name={'This Year'} stat={currentYearTotal} />
        <StatCard name={'This Month'} stat={currentMonthTotal} />
        <StatCard name={'This Week'} stat={currentWeekTotal} />
        <StatCard name={'Today'} stat={currentDayTotal} />
        <StatCard textBased name={'Most Spent on'} stat={categorizedData} />
        <StatCard name={'Most Spent day'} stat={mostSpentDay} textBased />
        <StatCard name={'Least Spent Day'} stat={leastDaySpent} textBased />
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

      <DataTable expenses = {expenses} total = {total} handleDelete ={handleDelete}   />
    </main>
  );
}

export default withAuth(Home)
