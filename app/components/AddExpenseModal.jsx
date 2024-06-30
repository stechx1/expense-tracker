import { Alert, Modal } from 'antd';
import { Button, Form, Select, Input, InputNumber, DatePicker } from 'antd';
import { useState } from 'react';
import { categories, currencyArr } from '../data/categories';
import { collection, addDoc,Timestamp, doc, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase/firebase';
import { useDispatch } from 'react-redux';

export const AddExpenseModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const { TextArea } = Input;
  const [loading, setLoading] = useState();
  const auth = getAuth(app);
  const [form] = Form.useForm()
  const [expenseError, setExpenseError] = useState(null)
  const [btnType, setBtnType] = useState(89)
  const errorJson ={

          Food:200,
          Car:2000,
          Entertainment:100,
          clothing:300,
          Travel:400,
          Shopping:500,
          "Personal Care" : 500,
          Investment:1000,
          Gifts:600,
          Donations:300,
          "Bills & Utilities":900

  }


  const handleSubmit = async (values) => {

    setBtnType()
    setLoading(true)
   
    const date = values['date'];
    const expense = values['expense'];
    const category = values['category'];
    const comments = values['comments'];
    const currency = values['currency']
  
   
         if( expense > errorJson[category]){
             setExpenseError(`The value for ${category.toLowerCase()} should increase ${errorJson[category]}`)
             setLoading(false)
             return
         }
      
     
    try {
      // Assuming user is already authenticated and available
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const expensesRef = collection(db, 'users', currentUser.uid, 'expenses');
  
        const docRef = await addDoc(expensesRef, {
          date:date.toISOString(),
          expense,
          category,
          comments,
          currency,
          createdAt:new Date()
        });
     
        form.resetFields()
        setExpenseError(null)
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

  const onClose =()=>{
       setExpenseError(null)
  }
  return (
    <Modal
      title='Add Expense'
      open={isModalOpen}
      footer={null}
      // okText='Submit'
      // onOk={handleOk}
      onCancel={handleCancel}
      styles={{content:{backgroundColor:'rgb(245,245,240)'},header:{backgroundColor:'transparent'}}}
    >
     {expenseError && <Alert
      message={expenseError}
      type="warning"
      closable
      onClose={onClose}
    />}
      <Form
        size='large'
        form={form}
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
          name='expense'
          rules={[
           
            {
              required :true,
              pattern:/^(?!0(\.0+)?$)(\d+(\.\d+)?)$/,
              message:'Expense must be greater than zero',
            }
          ]}
        >
          <InputNumber type='number'   placeholder='Expense' />
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
          <Select placeholder='Currency' options={currencyArr} />
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
            
            span: 50,
          }}
        >
          <div className='flex justify-end' >
            <div className='flex gap-x-1'>
              <Button style={{backgroundColor:"red",color:'white'}} onClick={handleCancel} className='bg-red-600'>Cancel</Button>
              <Button loading={loading} type='primary' htmlType='submit'>
              Submit
            </Button>
            </div>
             
          </div>
         
        </Form.Item>
      </Form>
    </Modal>
  );
};
