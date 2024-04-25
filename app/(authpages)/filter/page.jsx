/* eslint-disable @next/next/no-img-element */
'use client';
import { DatePicker, InputNumber, Select } from 'antd';
import { DataTable } from '../../components/DataTable';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { app, db } from '../../firebase/firebase';
import { categories } from '../../data/categories';

import { getAuth } from 'firebase/auth';
import withAuth from '@/app/HOC/withAuth';
import { DoughnutChart } from '@/app/components/DoughnutChart';
const { RangePicker } = DatePicker;

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const Filter = () => {
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const [monthWiseData, setMonthWiseData] = useState();
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  console.log('current user ', currentUser);
  const currentDate = new Date();
  console.log('month wise data ', monthWiseData);

  const onStartDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onEndDateChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleSubmit = () => {
    console.log('Submitted');
  };

  return (
    <main className='container mx-auto '>
    <div className='flex justify-between max-w-[1542px] mx-auto p-1'>
      <div className='w-[40%] h-screen mr-10'>
        {/* Left side */}
        <div className='flex flex-col gap-6 my-4'>
          {/* FILTERS */}
          <Form
            layout='vertical'
            size='large'
            name='basic'
            wrapperCol={{
              span: 50,
            }}
            style={{
              paddingTop: '20px',
              maxWidth: 800,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            onFinishFailed={() => ''}
            autoComplete='off'
          >
            <Form.Item
              style={{
                maxWidth: '100%',
              }}
              name='startDate'
              rules={[
                {
                  required: true,
                  message: 'Please input your start date!',
                },
              ]}
            >
              <RangePicker />
            </Form.Item>

            <div className='flex justify-between'>
              <Form.Item
                label='From Expense'
                style={{
                  maxWidth: '100%',
                }}
                name='expenseStart'
                rules={[
                  {
                    required: true,
                    message: 'Please input expense!',
                  },
                ]}
              >
                <InputNumber placeholder='0' style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label='To Expense'
                name='expenseEnd'
                rules={[
                  {
                    required: true,
                    message: 'Please input your end date!',
                  },
                ]}
              >
                <InputNumber placeholder='100000' style={{ width: '100%' }} />
              </Form.Item>
            </div>

            <Form.Item
              name='category'
              rules={[
                {
                  required: true,
                  message: 'Please input category!',
                },
              ]}
            >
              <Select placeholder='Categories' options={categories} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 50,
              }}
              style={{ width: '100%' }}
            >
              <Button
                loading={loading}
                type='primary'
                className='w-[100%]'
                htmlType='submit'
              >
                Filter
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className='w-[60%]'>

        <div className='my-8'>
          <DataTable />
        </div>
      </div>
    </div>
    </main>
  );
};

export default withAuth(Filter);
