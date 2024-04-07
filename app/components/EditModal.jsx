import { Modal } from 'antd';
import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { useState } from 'react';
import { categories } from '../data/categories';

export const EditModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const { TextArea } = Input;
  const [loading, setLoading] = useState();
  const handleSubmit = () => {
    console.log('Submitted');
  };
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <Modal
      title='Edit Expense'
      open={isModalOpen}
      okText={'Update'}
      onOk={handleOk}
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

        {/* <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={loading} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};
