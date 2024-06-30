'use client'
import React from 'react';
import { Table, Typography, Card } from 'antd';

const { Title } = Typography;

const TAX_RATE = 0.07;

const rows = [
  { key: 1, desc: 'Paperclips (Box)', qty: 100, unit: 1.15, price: 115.00 },
  { key: 2, desc: 'Paper (Case)', qty: 10, unit: 45.99, price: 459.90 },
  { key: 3, desc: 'Waste Basket', qty: 2, unit: 17.99, price: 35.98 },
];

const invoiceSubtotal = rows.reduce((sum, { price }) => sum + price, 0);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const columns = [
  {
    title: 'Description',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: 'Quantity',
    dataIndex: 'qty',
    key: 'qty',
    align: 'right',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unit',
    key: 'unit',
    align: 'right',
    render: (text) => `$${text.toFixed(2)}`,
  },
  {
    title: 'Sum',
    dataIndex: 'price',
    key: 'price',
    align: 'right',
    render: (text) => `$${text.toFixed(2)}`,
  },
];

export default function Invoice() {
  return (
    <Card title={<Title level={3}>Invoice</Title>} style={{ maxWidth: 700, margin: 'auto' }}>
      <Table
        dataSource={rows}
        columns={columns}
        pagination={false}
        summary={() => (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3}>Subtotal</Table.Summary.Cell>
              <Table.Summary.Cell align="right">{`$${invoiceSubtotal.toFixed(2)}`}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell>Tax</Table.Summary.Cell>
              <Table.Summary.Cell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={2} align="right">{`$${invoiceTaxes.toFixed(2)}`}</Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={3}>Total</Table.Summary.Cell>
              <Table.Summary.Cell align="right">{`$${invoiceTotal.toFixed(2)}`}</Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        )}
      />
    </Card>
  );
}
