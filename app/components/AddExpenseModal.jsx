import { Modal } from 'antd';
import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { useState } from 'react';
import { categories } from '../data/categories';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase/firebase';

export const AddExpenseModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const { TextArea } = Input;
  const [loading, setLoading] = useState();
  const auth = getAuth(app);
  const user = auth.currentUser;

  const handleSubmit = async (values) => {
    setLoading(true)
    const date = values['date'];
    const expense = values['expense'];
    const category = values['category'];
    const comments = values['comments'];

    try {
      const usersRef = await addDoc(
        collection(db, 'users'),
        {
          username: user.displayName,
          email: user.email,
        },
        { merge: true }
      );

      const expensesRef = collection(usersRef.doc(user.uid), 'expenses');

      const docRef = await addDoc(expensesRef, {
        date,
        expense,
        category,
        comments,
      });
      setLoading(false)
      console.log('Expense added with ID:', docRef.id);
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
    handleOk()
  };
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <Modal
      title='Add Expense'
      open={isModalOpen}
      footer={null}
      // okText='Submit'
      // onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        size='large'
        name='basic'
        wrapperCol={{
          span: 20,
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
          name='expense'
          rules={[
            {
              required: true,
              message: 'Please input expense!',
            },
          ]}
        >
          <InputNumber placeholder='Expense' />
        </Form.Item>

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

        <Form.Item name='comments'>
          <TextArea placeholder='Add your comment' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={loading} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
