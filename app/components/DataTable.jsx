"use client"
import { Switch, Table, Button, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const DataTable = () => {
  const demoDataSource = [
    {
      id: 1,
      date: '2024-04-05',
      expense: 25.99,
      category: 'Groceries',
      comments: 'Weekly shopping',
      video: 'https://example.com/grocery-shopping-video', // Valid video link
    },
    {
      id: 2,
      date: '2024-03-30',
      expense: 49.95,
      category: 'Bills',
      comments: 'Electricity bill',
      video: null, // No video link for this item
    },
    {
      id: 3,
      date: '2024-04-02',
      expense: 12.50,
      category: 'Dining Out',
      comments: 'Lunch with friends',
      video: '', // Empty video link is valid
    },
  ];
  const [dataSource, setDataSource] = useState([demoDataSource]);

  console.log(dataSource);

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Expense',
      dataIndex: 'expense',
      key: 'expense',
      render: (text) => `£ ${text}`,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (videoLink) => (
        <Button icon={<EditOutlined />}>Edit</Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_, record) => (
        <Popconfirm
          title={`Delete the expense`}
          description={`Are you sure you want to delete the expense`}
          onConfirm={() => handleDelete(record)}
          okText='Yes'
          cancelText='No'
        >
          <Button danger shape='circle' icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return <Table dataSource={demoDataSource} columns={columns} />;
};
