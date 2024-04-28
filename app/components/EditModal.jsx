import { Modal } from 'antd';
import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { useState } from 'react';
import { categories, currencyArr } from '../data/categories';
import useUpdateDoc from '../customeHooks/useUpdateDoc';

export const EditModal = ({ isModalOpen, handleOk, handleCancel,updateModalData }) => {
  const { TextArea } = Input;
  const [loading, setLoading] = useState();
  const {updateDocHandler} = useUpdateDoc()

  const handleSubmit =async (values) => {
    
    const date = values['date']
    const expense = values['expense']
    const category = values['category']
    const comments = values['comments']
    const currency = values['currency']
    console.log("date => ",date)
      updateDocHandler(updateModalData?.id,{date:date.toISOString(),expense,category,comments})
      handleOk()
  };
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <Modal
      title='Edit Expense'
      open={isModalOpen}
      // okText={'Update'}
      // onOk={handleOk}
      okButtonProps={{style:{display:'none'}}}
      cancelButtonProps={{style:{display:'none'}}}
      onCancel={handleCancel}
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
          <DatePicker  onChange={onDateChange} />
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
          <InputNumber  placeholder='Expense' />
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
          <Select placeholder='category' options={categories} />
        </Form.Item>
        <Form.Item
          name='currency'
          rules={[
            {
              required: true,
              message: 'Please input currency!',
            },
          ]}
        >
          <Select placeholder='currency' options={currencyArr} />
        </Form.Item>

        <Form.Item name='comments'>
          <TextArea  placeholder='Add your comment' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
          
            span: 50,
          }}
        >
          <div className='flex justify-end' >
            <div className='flex gap-x-1'>
              <Button style={{backgroundColor:"red",color:'white'}} onClick={handleCancel} className='bg-red-600'>Cancel</Button>
              <Button loading={loading} type='primary' htmlType='submit'>
               Update
            </Button>
            </div>
             
          </div>
        </Form.Item>

        {/* <button onClick={()=>updateDocHandler(updateModalData?.id)}>update</button> */}
      </Form>
    </Modal>
  );
};
