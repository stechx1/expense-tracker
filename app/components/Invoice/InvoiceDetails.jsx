"use client";
import React from "react";
import { Card, Row, Col, Typography, Divider, Modal, Table } from "antd";
import { printDiv } from "@/app/utils/printData";

const { Title, Text } = Typography;

const columns = [
  {
    title: "Item",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Desc",
    dataIndex: "description",
    key: "description",
  },

  {
    title: "Price",
    dataIndex: "amount",
    key: "amount",
    align: "right",
    render: (text) => `$${text.toFixed(2)}`,
  },
];

export default function Invoice({ open, setOpen, invoiceData }) {
  const invoiceSubtotal = invoiceData?.items?.reduce((acc, start) => {
    acc = acc + start?.amount;
    return acc;
  }, 0);

  const handlePrint = () => {
    printDiv("invoice-print");
    //setOpen(false)
  };
  return (
    <Modal
      open={open}
      onOk={handlePrint}
      okText={"Print"}
      styles={{ header: { backgroundColor: "blue" } }}
      onCancel={()=>setOpen(false)}
      closeIcon={false}
      
    >
      <div id="invoice-print">
        <Row gutter={[16, 16]}>
          <div className="flex justify-between w-full" span={24}>
            <div >
              NotBroke
            </div>
            <div>
               Invoice
            </div>
          </div>
          <Col span={24}>
            <Divider />
          </Col>
          <Col span={12}>
            <Text className="font-bold ">Bill To:</Text>
            <br />
            <Text className=" mt-2">{invoiceData?.customerName},</Text>
            <br />
            <Text className="">{invoiceData?.address},</Text>
            <br />
            <Text className="">{invoiceData?.contactNo}</Text>
            <br />
          </Col>
          <Col span={12}>
            <Text strong>Invoice #:</Text>
            <br />
            <Text>{invoiceData?.id?.slice()}</Text>
            <br />
            <Text strong>Due Date:</Text>
            <br />
            <Text>{new Date(invoiceData?.dueDate).toDateString()}</Text>
          </Col>
          <Col span={24}>
            <Divider />
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={invoiceData?.items}
              pagination={false}
              bordered
            />
          </Col>
          <Col span={24}>
            <Divider />
          </Col>

          <Col span={12}>
            <Text strong>Total:</Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Title level={4}>${invoiceSubtotal?.toFixed(2)}</Title>
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
