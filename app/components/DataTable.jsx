"use client";
import { Table, Button, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { EditModal } from "./EditModal";


export const DataTable = ({ expenses, handleDelete,total}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateModalData,setUpdateModalData] = useState(null)
  

  const showModal = (data) => {
    console.log("data => ", data);
    setIsModalOpen(true);
    setUpdateModalData(data)
  };
  const handleOk = () => {
    setIsModalOpen(false);
    console.log("asdfasdf")
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

  return (
    <>
      <EditModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        updateModalData={updateModalData}
      />
      <Table
        dataSource={expenses}
        columns={columns}
       
      />
    </>
  );
};
