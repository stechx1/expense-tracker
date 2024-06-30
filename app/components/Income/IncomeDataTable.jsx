'use client'
import getIncome from '@/app/customeHooks/getIncome'
import { app, db } from '@/app/firebase/firebase'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Table } from 'antd'
import { getAuth } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import EditIncomeModal from './EditIncomeModal'

const IncomeDataTable = () => {

  const {allIncome} = getIncome()
  const auth =  getAuth(app)
  const currentUser = auth.currentUser
  const [loading,setLoading] = useState()
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [modalData,setModalData] = useState(null)
  const handleRemove = async(id) => {
    setLoading(true);
    try {
      if (currentUser) {
        const incomeRef = doc(db, 'users', currentUser.uid, 'income', id);
        await deleteDoc(incomeRef);
       // setExpenses(expenses.filter((expense) => expense.id !== expenseId));
      } else {
        console.error('User not authenticated.');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleEditModal = (data) =>{

         setIsModalOpen(true)
         setModalData(data)
         console.log("modal data => ",data)
  }
    const columns = [
        {
          title: 'Income Date',
          dataIndex: 'date',
          key: 'date',
          render: (text) => <p>{new Date(text).toDateString()}</p>,
        },
        {
          title: 'Income Amount',
          dataIndex: 'income',
          key: 'income',
        },
        {
          title: 'Source of Income',
          dataIndex: 'source',
          key: 'source',
        },
        {
          title :'Extra Payment',
          dataIndex:'extraPayment',
          key:'extraPayment',
          render : (text)=>(<p>{!text ? '-' :text}</p>)
        },
        {
          title :'Recurring Payment',
          dataIndex:'recurring',
          key:'recurring',
          render : (text)=>(<p>{!text ? '-' :text}</p>)
        },
        {
          title: 'Edit',
          key: 'Edit',
          render: (_, record) => (
            
              <Button color='blue' onClick={()=>handleEditModal(record)}  shape='circle' icon={<EditOutlined />} />
           
          ),
        },
        {
          title: 'Delete',
          key: 'delete',
          render: (_, record) => (
            <Popconfirm
              title={`Delete the expense`}
              description={`Are you sure you want to delete the expense`}
              onConfirm={() => handleRemove(record?.id)}
              okText='Yes'
              cancelText='No'
            >
              <Button danger shape='circle' icon={<DeleteOutlined />} />
            </Popconfirm>
          ),
        },
    ]
  return (
     <div>
        <Table columns={columns} dataSource={allIncome}/>
        <EditIncomeModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
     </div>  
  )
}

export default IncomeDataTable