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

export const LoanDataTable = ({ handleDelete, total }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateModalData, setUpdateModalData] = useState(null);

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

  const handleRemove = (id) => {
    setLoading(true);
    handleDelete(id);
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
        // updateModalData={updateModalData}
      />
      <Table dataSource={loanDummyData} columns={columns} />
    </>
  );
};
