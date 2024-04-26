'use client';
import { Table, Button, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { EditModal } from './EditModal';
import { loanDummyData } from '../data/loan';
import { EditLoanModal } from './EditLoanModal';
import { deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase/firebase';

export const LoanDataTable = ({ loanData }) => {
  console.log("load data => ",loanData)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);
  const auth = getAuth(app)
  const currentUser = auth.currentUser

  const showModal = (data) => {
    console.log('data => ', data);
    setIsModalOpen(true);
    setUpdateModalData(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    console.log('asdfasdf');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRemove = async(id) => {
    setLoading(true);
    try {
      if (currentUser) {
        const loanRef = doc(db, 'users', currentUser.uid, 'loans', id);
        await deleteDoc(loanRef);
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

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      render: (value, item, index) => 1 + index,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (data, item) => (
        <p className='whitespace-nowrap'>{new Date(data).toDateString()}</p>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => <p className='whitespace-nowrap'>£{text}</p>,
    },
    {
      title: 'Loan Type',
      dataIndex: 'loanType',
      key: 'loanType',
      render: (data, item) => <p className='whitespace-nowrap'>{data}</p>,
    },
    {
      title: 'Person',
      dataIndex: 'person',
      key: 'person',
      render: (data, item) => <p className='whitespace-nowrap'>{data}</p>,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (data, item) => <p className='whitespace-nowrap'>{data}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data, item) => <p className='whitespace-nowrap'>{data}</p>,
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (videoLink, item, index) => (
        <Button onClick={() => showModal(item)} icon={<EditOutlined />}>
          Edit
        </Button>
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
  ];

  return (
    <>
      <EditLoanModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        updateModalData={updateModalData}
      />
      <Table dataSource={loanData} columns={columns} />
    </>
  );
};
