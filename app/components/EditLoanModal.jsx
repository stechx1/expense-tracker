import { Modal } from 'antd';
import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { useState } from 'react';
import { categories } from '../data/categories';
import { collection, addDoc, Timestamp, doc, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase/firebase';
import { useDispatch } from 'react-redux';
import useUpdateLoanData from '../customeHooks/useUpdateLoanData';

export const EditLoanModal = ({ isModalOpen, handleOk, handleCancel,updateModalData }) => {
  const { TextArea } = Input;
  const [loading, setLoading] = useState();
  const auth = getAuth(app);
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const {updateDocHandler} = useUpdateLoanData()

  const handleSubmit = async (values) => {
    setLoading(true);
    const date = values['date'];
    const amount = values['amount'];
    const loanType = values['loanType'];
    const person = values['person'];
    const status = values['status'];
    const reason = values['reason'];
      
    try {
      // Assuming user is already authenticated and available
      const currentUser = auth.currentUser;

      if (currentUser) {
         updateDocHandler(updateModalData?.id,{date:date.toISOString(),amount,loanType,person,status,reason})
        setLoading(false);
        handleOk();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <Modal
      title='Edit Expense'
      open={isModalOpen}
      footer={null}
      // okText='Submit'
      // onOk={handleOk}
      onCancel={handleCancel}
      styles={{
        content: { backgroundColor: 'rgb(245,245,240)' },
        header: { backgroundColor: 'transparent' },
      }}
    >
      <Form
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
          name='date'
          rules={[
            {
              required: true,
              message: 'Please input your date!',
            },
          ]}
        >
          <DatePicker onChange={onDateChange} />
        </Form.Item>

        <Form.Item
          name='amount'
          rules={[
            {
              required: true,
              message: 'Please input amount!',
            },
          ]}
        >
          <InputNumber placeholder='Amount' />
        </Form.Item>

        <Form.Item
          name='loanType'
          rules={[
            {
              required: true,
              message: 'Please input loan type!',
            },
          ]}
        >
          <Select
            placeholder='Loan Type'
            options={[
              {
                label: 'Given',
                value: 'Given',
              },
              { label: 'Taken', value: 'Taken' },
            ]}
          />
        </Form.Item>

        <Form.Item name='person'>
          <Input type='text' placeholder='Person' />
        </Form.Item>

        <Form.Item
          name='status'
          rules={[
            {
              required: true,
              message: 'Please input status!',
            },
          ]}
        >
          <Select
            placeholder='Status'
            options={[
              {
                label: 'Pending',
                value: 'Pending',
              },
              {
                label: 'Settled',
                value: 'Settled',
              },
            ]}
          />
        </Form.Item>

        <Form.Item name='reason'>
          <TextArea placeholder='Add your Reason' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
          
            span: 50,
          }}
        >
          <div className='flex justify-end'>
            <div className='flex gap-x-1'>
              <Button
                style={{ backgroundColor: 'red', color: 'white' }}
                onClick={handleCancel}
                className='bg-red-600'
              >
                Cancel
              </Button>
              <Button loading={loading} type='primary' htmlType='submit'>
                Update
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
