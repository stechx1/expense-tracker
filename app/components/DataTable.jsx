"use client";
import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { EditModal } from "./EditModal";
import { render } from "react-dom";

export const DataTable = ({ expenses, handleDelete,total}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const showModal = (data) => {
    console.log("data => ", data);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
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
  const demoDataSource = [
    {
      id: 1,
      date: "2024-04-05",
      expense: 25.99,
      category: "Groceries",
      comments: "Weekly shopping",
    },
    {
      id: 2,
      date: "2024-03-30",
      expense: 49.95,
      category: "Bills",
      comments: "Electricity bill",
    },
    {
      id: 3,
      date: "2024-04-02",
      expense: 12.5,
      category: "Dining Out",
      comments: "Lunch with friends",
    },
    {
      id: 4,
      date: "2024-04-04",
      expense: 55,
      category: "Travel",
      comments: "This is travel day",
    },
  ];
  const [dataSource, setDataSource] = useState([demoDataSource]);

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (value, item, index) => 1 + index,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (data, item) => (
        <p className="whitespace-nowrap">{new Date(data).toDateString()}</p>
      ),
    },
    {
      title: "Expense",
      dataIndex: "expense",
      key: "expense",
      render: (text) => <p className="whitespace-nowrap">£{text}</p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (data, item) => <p className="whitespace-nowrap">{data}</p>,
    },
    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
      render: (data, item) => <p className="whitespace-nowrap">{data}</p>,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (videoLink, item, index) => (
        <Button onClick={() => showModal(item)} icon={<EditOutlined />}>
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Popconfirm
          title={`Delete the expense`}
          description={`Are you sure you want to delete the expense`}
          onConfirm={() => handleRemove(record?.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const handleNext=(current)=>{
   
     next(current)
     setCurrentPage(current+1)
          
  }

  const handlePrevios =(current)=>{
         previous()
         setCurrentPage(current-1)
  }
  return (
    <>
      <EditModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <Table
        dataSource={expenses}
        columns={columns}
       
      />
    </>
  );
};
