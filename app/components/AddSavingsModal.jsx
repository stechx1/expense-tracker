import { Modal } from 'antd';
import {
  Button,
  Form,
  Radio,
  Input,
  InputNumber,
  DatePicker,
  ColorPicker,
} from 'antd';
import { useState } from 'react';
import { categories } from '../data/categories';
import { collection, addDoc, Timestamp, doc, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase/firebase';
import { useDispatch } from 'react-redux';

export const AddSavingsModal = ({ isModalOpen, handleOk, handleCancel }) => {
  const [value, setValue] = useState(1);

  const { TextArea } = Input;
  const [loading, setLoading] = useState();
  const auth = getAuth(app);
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setLoading(true);
    const date = values['date'];
    const color = values['color'].toHexString();
    const goalAmount = values['goalAmount'];
    const savingAmount = values['savingAmount'];
    const savingFor = values['savingFor'];
    const comments = values['comments'];
    const goalAchieved = values["goalAchieved"]


    try {
      // Assuming user is already authenticated and available
      const currentUser = auth.currentUser;

      if (currentUser) {
        const savingRef = collection(
          db,
          'users',
          currentUser.uid,
          'savings'
        );

        const docRef = await addDoc(savingRef, {
          date: date.toISOString(),
          color,
          goalAmount,
          savingAmount,
          savingFor,
          comments,
          goalAchieved,
          createdAt: new Date(),
        });

        setLoading(false);
        handleOk();
      }
    } catch (err) {
      console.log(err);
    }
    finally{
        setLoading(false)
    }
  };

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
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
          style={{
            maxWidth: '100%',
          }}
          name='color'
          rules={[
            {
              required: true,
              message: 'Please input your color!',
            },
          ]}
        >
          <ColorPicker defaultValue={'#023454'} showText />
        </Form.Item>

        <Form.Item
          name='goalAmount'
          rules={[
            {
              required: true,
              message: 'Please input goal amount!',
            },
            {
              validator: (_, value) => {
                if (!/^\d+$/.test(value)) {
                  return Promise.reject('Please enter a valid number.');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input type='number' placeholder='Goal Amount' />
        </Form.Item>

        <Form.Item
          name='savingAmount'
          rules={[
            {
              required: true,
              message: 'Please input saving amount!',
            },
            {
              validator: (_, value) => {
                if (!/^\d+$/.test(value)) {
                  return Promise.reject('Please enter a valid number.');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input type='type' placeholder='Saving Amount' />
        </Form.Item>

        <Form.Item
          name='savingFor'
          rules={[
            {
              required: true,
              message: 'Please input category!',
            },
          ]}
        >
          <Input type='text' placeholder='Saving For' />
        </Form.Item>

        <Form.Item name='comments'>
          <TextArea placeholder='Add your comment' />
        </Form.Item>

        <Form.Item name='goalAchieved'>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Achieved</Radio>
            <Radio value={2}>Not Yet</Radio>
          </Radio.Group>
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
                Submit
              </Button>
            </div>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
